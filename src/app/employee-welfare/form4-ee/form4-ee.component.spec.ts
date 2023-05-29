/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Form4EEComponent } from './form4-ee.component';

describe('Form4EEComponent', () => {
  let component: Form4EEComponent;
  let fixture: ComponentFixture<Form4EEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Form4EEComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Form4EEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
