import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProfileManagementService } from '@src/app/feature/profile/service/profile-management.service';
import { InviteDto } from '@src/app/shared/model/invite.model';
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
  constructor(private authService: AuthService, public dialog: MatDialog, private profileManagementService: ProfileManagementService) {}
  public user: Observable<ApplicationUserDto> = new Observable();
  public showFiller = false;
  public search = '';
  ngOnInit() {
    this.user = this.authService.getUser();
  }

  public invite() {
    const dialogRef = this.dialog.open(InviteDialogComponent);

    dialogRef.afterClosed().subscribe((result: InviteDto) => {
      console.log(`Dialog result: ${result}`);
      this.profileManagementService.invite(result.email, result.name).subscribe();
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
