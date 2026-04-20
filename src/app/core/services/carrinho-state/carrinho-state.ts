import { Injectable } from '@angular/core';
import { Cartao } from '@core/models/cartao.model';

const CARRINHO_STORAGE_KEY = 'carrinho:itens';
const CARRINHO_ATUALIZADO_EVENT = 'carrinho:atualizado';

@Injectable({
  providedIn: 'root',
})
export class CarrinhoState {
  private itensValue: Record<string, number> = this.carregarItens();

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

    this.persistirItens();
  }

  removerItem(cartaoId: Cartao['id']): void {
    const id = String(cartaoId);
    const novoItens = { ...this.itensValue };
    delete novoItens[id];
    this.itensValue = novoItens;

    this.persistirItens();
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

      this.persistirItens();
    }
  }

  private carregarItens(): Record<string, number> {
    if (typeof window === 'undefined') {
      return {};
    }

    const conteudo = window.localStorage.getItem(CARRINHO_STORAGE_KEY);

    if (!conteudo) {
      return {};
    }

    try {
      const itens = JSON.parse(conteudo) as Record<string, number>;

      return Object.entries(itens).reduce((acumulado, [id, quantidade]) => {
        if (Number.isFinite(quantidade) && quantidade > 0) {
          acumulado[id] = quantidade;
        }

        return acumulado;
      }, {} as Record<string, number>);
    } catch {
      return {};
    }
  }

  private persistirItens(): void {
    if (typeof window === 'undefined') {
      return;
    }

    window.localStorage.setItem(CARRINHO_STORAGE_KEY, JSON.stringify(this.itensValue));
    window.dispatchEvent(
      new CustomEvent(CARRINHO_ATUALIZADO_EVENT, {
        detail: {
          quantidade: this.quantidade(),
        },
      }),
    );
  }
}
