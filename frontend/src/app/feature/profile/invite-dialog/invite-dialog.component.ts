import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { InviteDto } from '@src/app/shared/model/invite.model';

@Component({
  selector: 'app-invite-dialog',
  templateUrl: './invite-dialog.component.html',
  styleUrls: ['./invite-dialog.component.scss'],
})
export class InviteDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<InviteDialogComponent>) {}

  ngOnInit(): void {}

  private inviteDto: InviteDto;
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  nameFormControl = new FormControl('', [Validators.required]);

  public invite() {
    if (this.emailFormControl.valid && this.nameFormControl.valid) {
      this.inviteDto = { email: this.emailFormControl.value, name: this.nameFormControl.value };
      this.dialogRef.close(this.inviteDto);
    }
  }
}
