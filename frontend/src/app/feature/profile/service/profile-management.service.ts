import { Injectable } from '@angular/core';
import { ProfileService } from '@src/app/shared/client';

@Injectable({
  providedIn: 'root',
})
export class ProfileManagementService {
  constructor(private profileService: ProfileService) {}

  public invite(emailAdress: string, name: string) {
    return this.profileService.apiProfileInvitePost(emailAdress, name);
  }

  public uploadPicture(file: Blob) {
    return this.profileService.apiProfileUploadPost(file);
  }
}
