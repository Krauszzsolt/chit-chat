import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-mat-dialog-wrapper',
  templateUrl: './mat-dialog-wrapper.component.html',
  styleUrls: ['./mat-dialog-wrapper.component.scss'],
})
export class MatDialogWrapperComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<MatDialogWrapperComponent>) {}

  @Input()
  public title: string;

  ngOnInit() {}

  add() {}

  close() {
    this.dialogRef.close('');
  }
}
