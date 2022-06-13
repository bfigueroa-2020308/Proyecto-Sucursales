import { TestBed } from '@angular/core/testing';

import { ProductoSucursalRestService } from './producto-sucursal-rest.service';

describe('ProductoSucursalRestService', () => {
  let service: ProductoSucursalRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductoSucursalRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
