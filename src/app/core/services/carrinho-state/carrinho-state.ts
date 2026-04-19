import { computed, Injectable, signal } from '@angular/core';
import { Cartao } from '@core/models/cartao.model';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoState {
  readonly itens = signal<Record<string, number>>({});
  readonly quantidade = computed(() =>
    Object.values(this.itens()).reduce((total, quantidadeItem) => total + quantidadeItem, 0),
  );

  adicionarItem(cartaoId: Cartao['id']): void {
    const id = String(cartaoId);

    this.itens.update((itensAtuais) => ({
      ...itensAtuais,
      [id]: (itensAtuais[id] ?? 0) + 1,
    }));
  }

  removerItem(cartaoId: Cartao['id']): void {
    const id = String(cartaoId);

    this.itens.update((itensAtuais) => {
      const novoItens = { ...itensAtuais };
      delete novoItens[id];
      return novoItens;
    });
  }

  atualizarQuantidade(cartaoId: Cartao['id'], quantidade: number): void {
    const id = String(cartaoId);

    if (quantidade <= 0) {
      this.removerItem(cartaoId);
    } else {
      this.itens.update((itensAtuais) => ({
        ...itensAtuais,
        [id]: quantidade,
      }));
    }
  }
}
