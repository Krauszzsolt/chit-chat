import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ChatroomDto, ChatroomService } from 'src/app/shared/client';

@Injectable({
  providedIn: 'root',
})
export class ChatroomManagementService {
  constructor(private chatroomService: ChatroomService) {}

  private roomSubject = new BehaviorSubject<ChatroomDto>({});

  public getChatRooms() {
    return this.chatroomService.apiChatroomGet().pipe(
      tap((ChatroomDto) => {
        this.roomSubject.next({ ...ChatroomDto[0] });
      })
    );
  }

  public getSelectedChatRooms() {
    return this.roomSubject.asObservable();
  }

  public setChatRoom(chatroom: ChatroomDto) {
    this.roomSubject.next(chatroom);
  }

  public addChatroom(chatroom: ChatroomDto) {
    return this.chatroomService.apiChatroomPost(chatroom);
  }
  public deleteChatroom(chatroomId: string) {
    return this.chatroomService.apiChatroomIdDelete(chatroomId);
  }
}
