import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-chatroom-dialog',
  templateUrl: './add-chatroom-dialog.component.html',
  styleUrls: ['./add-chatroom-dialog.component.scss'],
})
export class AddChatroomDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<AddChatroomDialogComponent>) {}

  ngOnInit(): void {}
}
