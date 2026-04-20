import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-quantity-selector',
  standalone: true,
  templateUrl: './quantity-selector.html',
  styleUrls: ['./quantity-selector.scss'],
})
export class QuantitySelectorComponent {
  @Input() quantity = 1;
  @Input() minQuantity = 1;

  @Output() incremented = new EventEmitter<number>();
  @Output() decremented = new EventEmitter<number>();

  increment(): void {
    this.incremented.emit(this.quantity + 1);
  }

  decrement(): void {
    const novaQuantidade = this.quantity - 1;
    if (novaQuantidade >= this.minQuantity) {
      this.decremented.emit(novaQuantidade);
    }
  }
}
