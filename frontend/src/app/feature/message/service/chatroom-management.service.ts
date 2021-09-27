import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ChatroomService } from 'src/app/shared/client';

@Injectable({
  providedIn: 'root',
})
export class ChatroomManagementService {
  constructor(private chatroomService: ChatroomService) {}

  private roomId = new BehaviorSubject<string>('');

  public getChatRooms() {
    return this.chatroomService.apiChatroomGet().pipe(
      tap((ChatroomDto) => {
        this.roomId.value === '' ? this.roomId.next(ChatroomDto[0].id) : {};
      })
    );
  }

  public getSelectedChatRooms() {
    return this.roomId.asObservable();
  }

  public setChatRoom(id: string) {
    this.roomId.next(id);
  }
}
