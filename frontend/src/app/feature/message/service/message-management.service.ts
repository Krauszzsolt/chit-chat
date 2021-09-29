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

  constructor(private signalRService: SignalRService, private chatroomManagementService: ChatroomManagementService, private messageService: MessageService) {
    this.signalRService.startConnection();
    this.signalRService.hubConnection.on('SendMessage', () => {
      this.newMessage.next('');
    });

    chatroomManagementService.getSelectedChatRooms().subscribe((roomId) => {
      this.currenRoomId = roomId;
    });
  }

  public getMessage(): Observable<MessageListDto> {
    return combineLatest(this.newMessage, this.chatroomManagementService.getSelectedChatRooms()).pipe(
      switchMap(([message, roomid]) => {
        return roomid !== ''
          ? this.messageService.apiMessageChatroomIdGet(roomid, 3, 10).pipe(
              catchError((error) => {
                return of({});
              })
            )
          : of({});
      })
    );
  }

  public sendMessage(messageInput: string) {
    return this.messageService.apiMessagePost({ content: messageInput, chatroomId: this.currenRoomId });
  }
}
