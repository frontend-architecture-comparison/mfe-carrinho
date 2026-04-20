import { TestBed } from '@angular/core/testing';

import { ListaCartoes } from './lista-cartoes';

describe('ListaCartoes', () => {
  let service: ListaCartoes;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaCartoes);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
