import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-quantity-selector',
  standalone: true,
  templateUrl: './quantity-selector.html',
  styleUrls: ['./quantity-selector.scss'],
})
export class QuantitySelectorComponent {
  quantity = input(1);
  minQuantity = input(1);

  incremented = output<number>();
  decremented = output<number>();

  increment(): void {
    this.incremented.emit(this.quantity() + 1);
  }

  decrement(): void {
    const novaQuantidade = this.quantity() - 1;
    if (novaQuantidade >= this.minQuantity()) {
      this.decremented.emit(novaQuantidade);
    }
  }
}
