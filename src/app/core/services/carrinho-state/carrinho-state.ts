import { Injectable } from '@angular/core';
import { Cartao } from '@core/models/cartao.model';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoState {
  private itensValue: Record<string, number> = {};

  itens(): Record<string, number> {
    return this.itensValue;
  }

  quantidade(): number {
    return Object.values(this.itensValue).reduce(
      (total: number, quantidadeItem: number) => total + quantidadeItem,
      0,
    );
  }

  adicionarItem(cartaoId: Cartao['id']): void {
    const id = String(cartaoId);
    const itensAtuais = this.itensValue;

    this.itensValue = {
      ...itensAtuais,
      [id]: (itensAtuais[id] ?? 0) + 1,
    };
  }

  removerItem(cartaoId: Cartao['id']): void {
    const id = String(cartaoId);
    const novoItens = { ...this.itensValue };
    delete novoItens[id];
    this.itensValue = novoItens;
  }

  atualizarQuantidade(cartaoId: Cartao['id'], quantidade: number): void {
    const id = String(cartaoId);

    if (quantidade <= 0) {
      this.removerItem(cartaoId);
    } else {
      this.itensValue = {
        ...this.itensValue,
        [id]: quantidade,
      };
    }
  }
}
