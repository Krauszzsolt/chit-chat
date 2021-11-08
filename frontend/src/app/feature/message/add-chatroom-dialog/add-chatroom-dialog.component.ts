import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ChatroomDto } from '@src/app/shared/client';

@Component({
  selector: 'app-add-chatroom-dialog',
  templateUrl: './add-chatroom-dialog.component.html',
  styleUrls: ['./add-chatroom-dialog.component.scss'],
})
export class AddChatroomDialogComponent implements OnInit {
  private chatroomDto: ChatroomDto;
  constructor(public dialogRef: MatDialogRef<AddChatroomDialogComponent>) {}

  nameFormControl = new FormControl('', [Validators.required]);
  detailsFormControl = new FormControl('', [Validators.required]);

  ngOnInit(): void {}

  addChatroom() {
    if (this.detailsFormControl.valid && this.nameFormControl.valid) {
      this.chatroomDto = { name: this.nameFormControl.value, details: this.detailsFormControl.value };
      this.dialogRef.close(this.chatroomDto);
    }
  }
}
