import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RmsalesportionComponent } from './rmsalesportion.component';

describe('RmsalesportionComponent', () => {
  let component: RmsalesportionComponent;
  let fixture: ComponentFixture<RmsalesportionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RmsalesportionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RmsalesportionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
