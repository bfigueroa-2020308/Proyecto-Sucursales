import { TestBed } from '@angular/core/testing';

import { ProductoEmpresaRestService } from './producto-empresa-rest.service';

describe('ProductoEmpresaRestService', () => {
  let service: ProductoEmpresaRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoEmpresaRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
