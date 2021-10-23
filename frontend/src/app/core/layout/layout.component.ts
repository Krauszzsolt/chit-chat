import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { InviteDialogComponent } from 'src/app/feature/profile/invite-dialog/invite-dialog.component';
import { UploadPictureDialogComponent } from 'src/app/feature/profile/upload-picture-dialog/upload-picture-dialog.component';
import { ApplicationUserDto } from 'src/app/shared/client';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(private authService: AuthService, public dialog: MatDialog) {}
  public user: Observable<ApplicationUserDto> = new Observable();
  public showFiller = false;
  public search = '';
  ngOnInit() {
    this.user = this.authService.getUser();
  }

  public invite() {
    const dialogRef = this.dialog.open(InviteDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
  public logout() {
    this.authService.logout();
  }

  public uploadPicture() {
    const dialogRef = this.dialog.open(UploadPictureDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
