import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-picture-dialog',
  templateUrl: './upload-picture-dialog.component.html',
  styleUrls: ['./upload-picture-dialog.component.scss'],
})
export class UploadPictureDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<UploadPictureDialogComponent>) {}

  ngOnInit(): void {}
}
