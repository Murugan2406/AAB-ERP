import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedDCNoteComponent } from './updated-dcnote.component';

describe('UpdatedDCNoteComponent', () => {
  let component: UpdatedDCNoteComponent;
  let fixture: ComponentFixture<UpdatedDCNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatedDCNoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedDCNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
