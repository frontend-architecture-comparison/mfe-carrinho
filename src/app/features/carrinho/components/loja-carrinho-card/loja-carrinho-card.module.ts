import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LojaCarrinhoCard } from './loja-carrinho-card';

@NgModule({
  imports: [CommonModule, LojaCarrinhoCard],
  exports: [LojaCarrinhoCard],
})
export class LojaCarrinhoCardModule {}