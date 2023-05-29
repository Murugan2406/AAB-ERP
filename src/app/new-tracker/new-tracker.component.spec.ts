import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTrackerComponent } from './new-tracker.component';

describe('NewTrackerComponent', () => {
  let component: NewTrackerComponent;
  let fixture: ComponentFixture<NewTrackerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewTrackerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTrackerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
