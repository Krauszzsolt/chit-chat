import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ChatroomDto, ChatroomService } from 'src/app/shared/client';

@Injectable({
  providedIn: 'root',
})
export class ChatroomManagementService {
  constructor(private chatroomService: ChatroomService) {}

  private roomIdSubject = new ReplaySubject<ChatroomDto>(1);

  public getChatRooms() {
    return this.chatroomService.apiChatroomGet().pipe(
      tap((ChatroomDto) => {
        this.roomIdSubject.next(ChatroomDto[0]);
      })
    );
  }

  public getSelectedChatRooms() {
    return this.roomIdSubject.asObservable();
  }

  public setChatRoom(chatroom: ChatroomDto) {
    this.roomIdSubject.next(chatroom);
  }

  public addChatroom(chatroom: ChatroomDto) {
    return this.chatroomService.apiChatroomPost(chatroom);
  }
}
