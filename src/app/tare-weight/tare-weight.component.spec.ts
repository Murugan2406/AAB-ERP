import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareWeightComponent } from './tare-weight.component';

describe('TareWeightComponent', () => {
  let component: TareWeightComponent;
  let fixture: ComponentFixture<TareWeightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TareWeightComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TareWeightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
