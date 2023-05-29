import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetReturnRequestComponent } from './set-return-request.component';

describe('SetReturnRequestComponent', () => {
  let component: SetReturnRequestComponent;
  let fixture: ComponentFixture<SetReturnRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetReturnRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetReturnRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
