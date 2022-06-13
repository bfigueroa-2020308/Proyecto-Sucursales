import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoSucursalComponent } from './producto-sucursal.component';

describe('ProductoSucursalComponent', () => {
  let component: ProductoSucursalComponent;
  let fixture: ComponentFixture<ProductoSucursalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductoSucursalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductoSucursalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
