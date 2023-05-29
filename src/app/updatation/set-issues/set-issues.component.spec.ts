import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetIssuesComponent } from './set-issues.component';

describe('SetIssuesComponent', () => {
  let component: SetIssuesComponent;
  let fixture: ComponentFixture<SetIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetIssuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
