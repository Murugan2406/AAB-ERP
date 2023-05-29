import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateOldComponent } from './update-old.component';

describe('UpdateOldComponent', () => {
  let component: UpdateOldComponent;
  let fixture: ComponentFixture<UpdateOldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateOldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateOldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
