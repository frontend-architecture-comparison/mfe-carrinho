import { Component, input, output } from '@angular/core';

import { LojaCarrinho } from '../../carrinho.model';
import { QuantitySelectorComponent } from '@shared/components/quantity-selector/quantity-selector';

@Component({
    selector: 'app-loja-carrinho-card',
    imports: [QuantitySelectorComponent],
    templateUrl: './loja-carrinho-card.html',
    styleUrls: ['./loja-carrinho-card.scss']
})
export class LojaCarrinhoCard {
  loja = input.required<LojaCarrinho>();
  lojaIndex = input(0);

  quantidadeAlterada = output<{ lojaIndex: number; novaQuantidade: number }>();
  itemRemovido = output<number>();

  formatarMoeda(valor: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(valor);
  }

  onQuantidadeAlterada(novaQuantidade: number): void {
    this.quantidadeAlterada.emit({
      lojaIndex: this.lojaIndex(),
      novaQuantidade,
    });
  }

  removerItem(): void {
    this.itemRemovido.emit(this.lojaIndex());
  }
}