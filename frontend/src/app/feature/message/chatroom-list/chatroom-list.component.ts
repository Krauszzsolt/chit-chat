import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { ChatroomDto } from 'src/app/shared/client';

@Component({
  selector: 'app-chatroom-list',
  templateUrl: './chatroom-list.component.html',
  styleUrls: ['./chatroom-list.component.scss'],
})
export class ChatroomListComponent implements OnInit {
  constructor() {}

  @Input()
  public chatrooms: ChatroomDto[];

  public selectedChatroomEmit: EventEmitter<string> = new EventEmitter();

  ngOnInit() {}

  public selectChatroom(chatroomId) {
    this.selectedChatroomEmit.emit(chatroomId);
  }
}
