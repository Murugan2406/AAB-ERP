/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatedGoodsIssueComponent } from './updated-goods-issue.component';

describe('UpdatedGoodsIssueComponent', () => {
  let component: UpdatedGoodsIssueComponent;
  let fixture: ComponentFixture<UpdatedGoodsIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdatedGoodsIssueComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatedGoodsIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
