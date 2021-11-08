import { Injectable } from '@angular/core';
import { AuthService } from '@src/app/core/service/auth.service';
import { ProfileService } from '@src/app/shared/client';
import { switchMap, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProfileManagementService {
  constructor(private profileService: ProfileService, private authService: AuthService) {}

  public invite(emailAdress: string, name: string) {
    return this.profileService.apiProfileInvitePost(emailAdress, name);
  }

  public uploadPicture(file: Blob) {
    return this.profileService.apiProfileUploadPost(file).pipe(
      switchMap(() =>
        this.profileService.apiProfileUserGet().pipe(
          tap((user) => {
            this.authService.setUser(user);
          })
        )
      )
    );
  }
}
