import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosEmpresaComponent } from './productos-empresa.component';

describe('ProductosEmpresaComponent', () => {
  let component: ProductosEmpresaComponent;
  let fixture: ComponentFixture<ProductosEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosEmpresaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
