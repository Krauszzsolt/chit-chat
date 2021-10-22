import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InviteDialogComponent } from './invite-dialog/invite-dialog.component';
import { UploadPictureDialogComponent } from './upload-picture-dialog/upload-picture-dialog.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [InviteDialogComponent, UploadPictureDialogComponent],
  imports: [CommonModule, SharedModule],
  entryComponents: [InviteDialogComponent, UploadPictureDialogComponent],
})
export class ProfileModule {}
