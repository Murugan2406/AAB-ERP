/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ESIFormsComponent } from './esiforms.component';

describe('ESIFormsComponent', () => {
  let component: ESIFormsComponent;
  let fixture: ComponentFixture<ESIFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ESIFormsComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ESIFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
