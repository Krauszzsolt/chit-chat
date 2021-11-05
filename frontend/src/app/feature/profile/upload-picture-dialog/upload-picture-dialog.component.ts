import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { openSnackBar } from '@src/app/shared/utils/snack';
import { ProfileManagementService } from '../service/profile-management.service';

@Component({
  selector: 'app-upload-picture-dialog',
  templateUrl: './upload-picture-dialog.component.html',
  styleUrls: ['./upload-picture-dialog.component.scss'],
})
export class UploadPictureDialogComponent implements OnInit {
  public picture: FormGroup;
  public loading = false;
  public url: string | ArrayBuffer = '';
  public succes = false;

  constructor(
    public dialogRef: MatDialogRef<UploadPictureDialogComponent>,
    private formBuilder: FormBuilder,
    private profileManagementService: ProfileManagementService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.picture = this.formBuilder.group({
      img: '',
    });
  }

  get f() {
    return this.picture.controls;
  }

  onFileChange(event) {
    this.succes = false;
    if (event.target.files && event.target.files.length > 0 && event.target.files[0]) {
      const file = event.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        this.url = (event.currentTarget as any).result;
      };
      this.picture.patchValue({
        img: file,
      });
    }
  }

  upload(): void {
    if (this.picture.invalid) {
      return;
    }

    this.loading = true;
    this.profileManagementService.uploadPicture(this.f.img.value).subscribe(() => {
      openSnackBar('Succesful upload', this.snackBar);
      this.dialogRef.close();
    });
  }
}
