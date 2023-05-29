import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntentItemsComponent } from './intent-items.component';

describe('IntentItemsComponent', () => {
  let component: IntentItemsComponent;
  let fixture: ComponentFixture<IntentItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntentItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntentItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
