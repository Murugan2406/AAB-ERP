import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckEntryViewComponent } from './check-entry-view.component';

describe('CheckEntryViewComponent', () => {
  let component: CheckEntryViewComponent;
  let fixture: ComponentFixture<CheckEntryViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckEntryViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckEntryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
