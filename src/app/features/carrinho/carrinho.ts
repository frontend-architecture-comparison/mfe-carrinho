import { Component, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, catchError, map, of, switchMap, takeUntil } from 'rxjs';
import { Cartao } from '@core/models/cartao.model';
import { ListaCartoes } from '@core/services/lista-cartoes/lista-cartoes';
import { CarrinhoState } from '@core/services/carrinho-state/carrinho-state';
import { LojaCarrinho } from './carrinho.model';

@Component({
    selector: 'app-carrinho',
    templateUrl: './carrinho.html',
    styleUrls: ['./carrinho.scss']
})
export class Carrinho implements OnDestroy {
  private readonly route = inject(ActivatedRoute);
  private readonly listaCartoes = inject(ListaCartoes);
  private readonly carrinhoState = inject(CarrinhoState);
  private readonly destroy$ = new Subject<void>();
  private ultimoIdProcessado: string | null = null;

  private loadingValue = true;
  private erroValue = false;
  private cartoesSelecionadosValue: Cartao[] = [];

  loading(): boolean {
    return this.loadingValue;
  }

  erro(): boolean {
    return this.erroValue;
  }

  cartoesSelecionados(): Cartao[] {
    return this.cartoesSelecionadosValue;
  }

  lojas(): LojaCarrinho[] {
    const cartoes = this.cartoesSelecionadosValue;
    const itensCarrinho = this.carrinhoState.itens();
    const idsSelecionados = Object.keys(itensCarrinho);

    if (cartoes.length === 0 || idsSelecionados.length === 0) {
      return [];
    }

    return cartoes
      .filter((cartao) => idsSelecionados.includes(String(cartao.id)))
      .map((cartao: Cartao) => {
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
  }

  totalSelecionado(): number {
    return this.lojas().reduce(
      (total: number, loja: LojaCarrinho) =>
        total + loja.itens.reduce((soma: number, item) => soma + item.anuidade * item.quantidade * 12, 0),
      0,
    );
  }

  itensSelecionados(): number {
    return this.lojas().reduce(
      (total: number, loja: LojaCarrinho) =>
        total + loja.itens.reduce((soma: number, item) => soma + item.quantidade, 0),
      0,
    );
  }

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
            this.erroValue = false;
            this.loadingValue = false;
            this.cartoesSelecionadosValue = [];
            return of([] as Cartao[]);
          }

          this.loadingValue = true;
          this.erroValue = false;

          return this.listaCartoes.getlistaCartoes().pipe(
            map((cartoes) =>
              cartoes.filter((cartao) =>
                idsSelecionados.includes(String(cartao.id)),
              ),
            ),
            catchError((error) => {
              console.error('Erro ao carregar cartao selecionado:', error);
              this.erroValue = true;
              return of([] as Cartao[]);
            }),
          );
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((cartoes) => {
        this.cartoesSelecionadosValue = cartoes;
        this.loadingValue = false;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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

  trackByNomeLoja(index: number, loja: LojaCarrinho): string {
    return `${loja.nome}-${index}`;
  }
}
