import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Cartao } from '../../models/cartao.model';

@Injectable({
  providedIn: 'root',
})
export class ListaCartoes {

  private url_api: string = 'http://localhost:3000/cartoes';
  private readonly http = inject(HttpClient);

  getlistaCartoes() {
    return this.http.get<Cartao[]>(this.url_api);
  }

  getCartaoPorId(id: string) {
    return this.http.get<Cartao>(`${this.url_api}/${id}`);
  }
}
