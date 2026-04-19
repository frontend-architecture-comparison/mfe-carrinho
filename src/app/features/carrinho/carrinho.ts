import { computed, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, map, of, switchMap } from 'rxjs';
import { Cartao } from '@core/models/cartao.model';
import { ListaCartoes } from '@core/services/lista-cartoes/lista-cartoes';
import { CarrinhoState } from '@core/services/carrinho-state/carrinho-state';
import { LojaCarrinho } from './carrinho.model';
import { LojaCarrinhoCard } from './components/loja-carrinho-card/loja-carrinho-card';

@Component({
    selector: 'app-carrinho',
    imports: [LojaCarrinhoCard],
    templateUrl: './carrinho.html',
    styleUrls: ['./carrinho.scss']
})
export class Carrinho {
  private readonly route = inject(ActivatedRoute);
  private readonly listaCartoes = inject(ListaCartoes);
  private readonly carrinhoState = inject(CarrinhoState);
  private ultimoIdProcessado: string | null = null;

  readonly loading = signal(true);
  readonly erro = signal(false);
  readonly cartoesSelecionados = signal<Cartao[]>([]);

  readonly lojas = computed<LojaCarrinho[]>(() => {
    const cartoes = this.cartoesSelecionados();
    const itensCarrinho = this.carrinhoState.itens();
    const idsSelecionados = Object.keys(itensCarrinho);

    if (cartoes.length === 0 || idsSelecionados.length === 0) {
      return [];
    }

    return cartoes
      .filter((cartao) => idsSelecionados.includes(String(cartao.id)))
      .map((cartao) => {
      const quantidade = itensCarrinho[String(cartao.id)];

      return {
        nome: cartao.nome,
        itens: [
          {
            nome: cartao.nome,
            imagem: cartao.img,
            limiteTotal: cartao.limiteTotal,
            limitePromocional: cartao.limitePromocional,
            anuidade: cartao.anuidade,
            quantidade: quantidade ?? 0,
          },
        ],
      };
    });
  });

  readonly totalSelecionado = computed(() =>
    this.lojas().reduce(
      (total, loja) => total + loja.itens.reduce((soma, item) => soma + item.anuidade * item.quantidade * 12, 0),
      0,
    ),
  );

  readonly itensSelecionados = computed(() =>
    this.lojas().reduce(
      (total, loja) => total + loja.itens.reduce((soma, item) => soma + item.quantidade, 0),
      0,
    ),
  );

  constructor() {
    this.route.paramMap
      .pipe(
        map((params) => params.get('id')),
        switchMap((id) => {
          if (id && id !== this.ultimoIdProcessado) {
            this.ultimoIdProcessado = id;
            this.carrinhoState.adicionarItem(id);
          }

          const idsSelecionados = Object.keys(this.carrinhoState.itens());

          if (idsSelecionados.length === 0) {
            this.erro.set(false);
            this.loading.set(false);
            this.cartoesSelecionados.set([]);
            return of([] as Cartao[]);
          }

          this.loading.set(true);
          this.erro.set(false);

          return this.listaCartoes.getlistaCartoes().pipe(
            map((cartoes) =>
              cartoes.filter((cartao) =>
                idsSelecionados.includes(String(cartao.id)),
              ),
            ),
            catchError((error) => {
              console.error('Erro ao carregar cartao selecionado:', error);
              this.erro.set(true);
              return of([] as Cartao[]);
            }),
          );
        }),
        takeUntilDestroyed(),
      )
      .subscribe((cartoes) => {
        this.cartoesSelecionados.set(cartoes);
        this.loading.set(false);
      });
  }

  formatarMoeda(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valor);
  }

  atualizarQuantidade(cartaoId: string | number, novaQuantidade: number): void {
    this.carrinhoState.atualizarQuantidade(cartaoId, novaQuantidade);
  }

  onQuantidadeAlterada(evento: { lojaIndex: number; novaQuantidade: number }): void {
    const cartoes = this.cartoesSelecionados().filter((cartao) =>
      Object.keys(this.carrinhoState.itens()).includes(String(cartao.id)),
    );

    if (cartoes[evento.lojaIndex]) {
      this.carrinhoState.atualizarQuantidade(cartoes[evento.lojaIndex].id, evento.novaQuantidade);
    }
  }

  onItemRemovido(lojaIndex: number): void {
    const cartoes = this.cartoesSelecionados().filter((cartao) =>
      Object.keys(this.carrinhoState.itens()).includes(String(cartao.id)),
    );

    if (cartoes[lojaIndex]) {
      this.carrinhoState.removerItem(cartoes[lojaIndex].id);
    }
  }
}
