import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FaceapicrossverifyComponent } from './faceapicrossverify.component';

describe('FaceapicrossverifyComponent', () => {
  let component: FaceapicrossverifyComponent;
  let fixture: ComponentFixture<FaceapicrossverifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FaceapicrossverifyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FaceapicrossverifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
