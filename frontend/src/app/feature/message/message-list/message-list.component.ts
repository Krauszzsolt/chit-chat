import { Component, OnChanges, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatroomDto, ChatroomService, MessageListDto, MessageService } from 'src/app/shared/client';
import { SignalRService } from '../signal-r.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent implements OnInit, OnChanges {
  public chatrooms: Observable<ChatroomDto[]>;
  public messages: Observable<MessageListDto>;
  public messageInput = '';
  public roomId;
  constructor(private signalRService: SignalRService, private chatroomService: ChatroomService, private messageService: MessageService) {}

  ngOnInit() {
    this.chatrooms = this.chatroomService.apiChatroomGet();

    this.chatrooms.subscribe((repsonse) => {
      this.roomId = repsonse[0].id;
      this.messages = this.messageService.apiMessageChatroomIdGet(this.roomId);
    });

    this.signalRService.startConnection();

    this.signalRService.hubConnection.on('SendMessage', () => {
      this.messages = this.messageService.apiMessageChatroomIdGet(this.roomId);
    });
  }

  ngOnChanges() {}

  selectChatroom(id: string) {
    this.roomId = id;
    this.messages = this.messageService.apiMessageChatroomIdGet(id);
  }

  sendMessage() {
    this.messageService.apiMessagePost({ content: this.messageInput, chatroomId: this.roomId }).subscribe();
    this.messageInput = '';
  }
}
