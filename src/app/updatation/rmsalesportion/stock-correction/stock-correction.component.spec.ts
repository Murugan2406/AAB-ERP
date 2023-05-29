import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCorrectionComponent } from './stock-correction.component';

describe('StockCorrectionComponent', () => {
  let component: StockCorrectionComponent;
  let fixture: ComponentFixture<StockCorrectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockCorrectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockCorrectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
