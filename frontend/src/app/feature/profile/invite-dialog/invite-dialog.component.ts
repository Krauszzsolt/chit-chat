import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-invite-dialog',
  templateUrl: './invite-dialog.component.html',
  styleUrls: ['./invite-dialog.component.scss'],
})
export class InviteDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<InviteDialogComponent>) {}

  ngOnInit(): void {}

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
}
