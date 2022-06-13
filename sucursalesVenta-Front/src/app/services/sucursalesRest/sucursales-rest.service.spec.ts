import { TestBed } from '@angular/core/testing';

import { SucursalesRestService } from './sucursales-rest.service';

describe('SucursalesRestService', () => {
  let service: SucursalesRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SucursalesRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
