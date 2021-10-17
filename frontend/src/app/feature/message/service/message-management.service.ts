import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { MessageListDto, MessageService } from 'src/app/shared/client';
import { ChatroomManagementService } from './chatroom-management.service';
import { SignalRService } from './signal-r.service';

@Injectable({
  providedIn: 'root',
})
export class MessageManagementService {
  private newMessage = new BehaviorSubject<string>('');
  private pageNumber = new BehaviorSubject<number>(3); // MEMO: Valahogy tudni kell a pagenumber
  private currenRoomId = '';

  constructor(private chatroomManagementService: ChatroomManagementService, private messageService: MessageService) {}

  public getMessage(chatroomId: string, pageNumber?: number): Observable<MessageListDto> {
    return this.messageService.apiMessageChatroomIdGet(chatroomId, pageNumber, 10).pipe(
      catchError((error) => {
        return of({});
      })
    );
  }

  public sendMessage(messageInput: string) {
    return this.messageService.apiMessagePost({ content: messageInput, chatroomId: this.currenRoomId });
  }
}
