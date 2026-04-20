import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { Carrinho } from './carrinho';
import { LojaCarrinhoCard } from './components/loja-carrinho-card/loja-carrinho-card';
import { ListaCartoes } from '../../core/services/lista-cartoes/lista-cartoes';
import { CarrinhoState } from '../../core/services/carrinho-state/carrinho-state';

const routes: Routes = [
  {
    path: ':id',
    component: Carrinho,
  },
  {
    path: '',
    component: Carrinho,
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [Carrinho],
  imports: [CommonModule, HttpClientModule, RouterModule.forChild(routes), LojaCarrinhoCard],
  providers: [ListaCartoes, CarrinhoState],
})
export class CarrinhoModule {}
