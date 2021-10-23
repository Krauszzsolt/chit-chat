import { Injectable } from '@angular/core';
import { InviteService } from '@src/app/shared/client';

@Injectable({
  providedIn: 'root',
})
export class InviteManagementService {
  constructor(private inviteService: InviteService) {}

  public invite(emailAdress: string, name: string) {
    return this.inviteService.apiInvitePost(emailAdress, name);
  }
}
