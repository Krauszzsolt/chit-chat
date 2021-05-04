import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, from, merge, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ChatroomService, MessageService } from 'src/app/shared/client';
import { SignalRService } from './signal-r.service';

@Injectable({
  providedIn: 'root',
})
export class MessageManagementService {
  private roomId = new BehaviorSubject<string>('');
  private newMessage = new BehaviorSubject<string>('');

  constructor(private signalRService: SignalRService, private chatroomService: ChatroomService, private messageService: MessageService) {
    this.signalRService.startConnection();
    this.signalRService.hubConnection.on('SendMessage', () => {
      this.newMessage.next('');
    });
  }

  public getMessage() {
    return merge(this.newMessage, this.roomId).pipe(
      switchMap(() => {
        return this.roomId.value !== '' ? this.messageService.apiMessageChatroomIdGet(this.roomId.value) : of({});
      })
    );
  }

  public getChatRooms() {
    return this.chatroomService.apiChatroomGet().pipe(
      tap((ChatroomDto) => {
        this.roomId.value === '' ? this.roomId.next(ChatroomDto[0].id) : {};
      })
    );
  }

  public setChatRoom(id: string) {
    this.roomId.next(id);
  }

  public sendMessage(messageInput: string) {
    return this.messageService.apiMessagePost({ content: messageInput, chatroomId: this.roomId.value });
  }

  public search(searchTerm: string) {
    if(searchTerm.length > 3)
    return this.messageService.apiMessageSearchGet(searchTerm).pipe(map(result => (result.slice(0,10))));
  }
}
