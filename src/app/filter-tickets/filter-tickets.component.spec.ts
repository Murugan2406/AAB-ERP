import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTicketsComponent } from './filter-tickets.component';

describe('FilterTicketsComponent', () => {
  let component: FilterTicketsComponent;
  let fixture: ComponentFixture<FilterTicketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterTicketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTicketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
