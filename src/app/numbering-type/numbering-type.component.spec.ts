import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NumberingTypeComponent } from './numbering-type.component';

describe('NumberingTypeComponent', () => {
  let component: NumberingTypeComponent;
  let fixture: ComponentFixture<NumberingTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NumberingTypeComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumberingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
