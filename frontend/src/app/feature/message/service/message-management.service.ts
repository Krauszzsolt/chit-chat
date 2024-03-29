import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ChatroomDto, MessageListDto, MessageService } from 'src/app/shared/client';
import { ChatroomManagementService } from './chatroom-management.service';

@Injectable({
  providedIn: 'root',
})
export class MessageManagementService {
  private currenRoom: ChatroomDto;

  constructor(private messageService: MessageService, private chatroomService: ChatroomManagementService) {
    chatroomService.getSelectedChatRooms().subscribe((chatroom) => {
      this.currenRoom = chatroom;
    });
  }

  public getMessage(chatroomId: string, pageNumber?: number): Observable<MessageListDto> {
    return this.messageService.apiMessageChatroomIdGet(chatroomId, pageNumber, 10).pipe(
      catchError((error) => {
        console.log('error:', error);
        return of({});
      })
    );
  }

  public sendMessage(messageInput: string) {
    return this.messageService.apiMessagePost({ content: messageInput, chatroomId: this.currenRoom.id });
  }
}
