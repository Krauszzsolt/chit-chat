import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatroomDto, ChatroomService } from 'src/app/shared/client';

@Component({
  selector: 'app-chatroom-list',
  templateUrl: './chatroom-list.component.html',
  styleUrls: ['./chatroom-list.component.scss'],
})
export class ChatroomListComponent implements OnInit {

  public chatrooms: Observable<ChatroomDto[]>;

  constructor(private chatroomService: ChatroomService, private router: Router) {}

  ngOnInit() {
    this.chatrooms = this.chatroomService.apiChatroomGet();
  }

  selectChatroom(id: string) {
    this.router.navigate(['chatroom/',id])
  }
}
