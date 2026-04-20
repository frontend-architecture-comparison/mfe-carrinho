import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ItemCarrinho, LojaCarrinho } from '../../carrinho.model';
import { QuantitySelectorComponent } from '../../../../shared/components/quantity-selector/quantity-selector';

@Component({
    selector: 'app-loja-carrinho-card',
  standalone: true,
  imports: [CommonModule, QuantitySelectorComponent],
    templateUrl: './loja-carrinho-card.html',
    styleUrls: ['./loja-carrinho-card.scss']
})
export class LojaCarrinhoCard {
  @Input() loja!: LojaCarrinho;
  @Input() lojaIndex = 0;

  @Output() quantidadeAlterada = new EventEmitter<{ lojaIndex: number; novaQuantidade: number }>();
  @Output() itemRemovido = new EventEmitter<number>();

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
      lojaIndex: this.lojaIndex,
      novaQuantidade,
    });
  }

  removerItem(): void {
    this.itemRemovido.emit(this.lojaIndex);
  }

  trackByNomeItem(index: number, item: ItemCarrinho): string {
    return `${item.nome}-${index}`;
  }
}