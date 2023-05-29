/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalToUserComponent } from './terminal-to-user.component';

describe('TerminalToUserComponent', () => {
  let component: TerminalToUserComponent;
  let fixture: ComponentFixture<TerminalToUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TerminalToUserComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalToUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
