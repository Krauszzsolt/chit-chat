import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ChatroomService } from 'src/app/shared/client';

@Injectable({
  providedIn: 'root',
})
export class ChatroomManagementService {
  constructor(private chatroomService: ChatroomService) {}

  private roomIdSubject = new ReplaySubject<string>(1);

  public getChatRooms() {
    return this.chatroomService.apiChatroomGet().pipe(
      tap((ChatroomDto) => {
        this.roomIdSubject.next(ChatroomDto[0].id);
      })
    );
  }

  public getSelectedChatRooms() {
    return this.roomIdSubject.asObservable();
  }

  public setChatRoom(id: string) {
    this.roomIdSubject.next(id);
  }
}
