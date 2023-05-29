import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsSelectComponent } from './items-select.component';

describe('ItemsSelectComponent', () => {
  let component: ItemsSelectComponent;
  let fixture: ComponentFixture<ItemsSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
