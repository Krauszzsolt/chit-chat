import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddChatroomDialogComponent } from './add-chatroom-dialog.component';

describe('AddChatroomDialogComponent', () => {
  let component: AddChatroomDialogComponent;
  let fixture: ComponentFixture<AddChatroomDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddChatroomDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddChatroomDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
