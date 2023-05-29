/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSwapComponent } from './item-swap.component';

describe('ItemSwapComponent', () => {
  let component: ItemSwapComponent;
  let fixture: ComponentFixture<ItemSwapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemSwapComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemSwapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
