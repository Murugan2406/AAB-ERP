/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionBarcodeComponent } from './production-barcode.component';

describe('ProductionBarcodeComponent', () => {
  let component: ProductionBarcodeComponent;
  let fixture: ComponentFixture<ProductionBarcodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductionBarcodeComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionBarcodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
