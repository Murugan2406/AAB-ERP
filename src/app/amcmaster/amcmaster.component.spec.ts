import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AMCMasterComponent } from './amcmaster.component';

describe('AMCMasterComponent', () => {
  let component: AMCMasterComponent;
  let fixture: ComponentFixture<AMCMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AMCMasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AMCMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
