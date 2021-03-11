import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatroomDto, ChatroomService } from 'src/app/shared/client';

@Component({
  selector: 'app-chatroom-list',
  templateUrl: './chatroom-list.component.html',
  styleUrls: ['./chatroom-list.component.scss'],
})
export class ChatroomListComponent implements OnInit {
  constructor(private chatroomService: ChatroomService) {}
  public chatrooms :  Observable<ChatroomDto[]>;
  ngOnInit() {

    this.chatrooms = this.chatroomService.apiChatroomGet();
  }
}
