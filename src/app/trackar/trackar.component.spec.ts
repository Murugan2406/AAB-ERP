import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackarComponent } from './trackar.component';

describe('TrackarComponent', () => {
  let component: TrackarComponent;
  let fixture: ComponentFixture<TrackarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
