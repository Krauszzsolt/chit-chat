import { Component, NgZone, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ChatroomDto, ChatroomService, MessageListDto, MessageService } from 'src/app/shared/client';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent implements OnInit, OnChanges {
  public chatrooms: Observable<ChatroomDto[]>;
  public messages: Observable<MessageListDto>;

  constructor(private chatroomService: ChatroomService, private messageService: MessageService, private route: ActivatedRoute, private router: Router, private zone: NgZone) {}

  ngOnInit() {
    this.route.queryParams.subscribe((queryParams) => {
      // do something with the query params
    });
    this.route.params.subscribe((routeParams) => {
      const roomId = this.route.snapshot.paramMap.get('id');
      this.chatrooms = this.chatroomService.apiChatroomGet();
      this.messages = this.messageService.apiMessageChatroomIdGet(roomId);
    });

    const roomId = this.route.snapshot.paramMap.get('id');
    this.chatrooms = this.chatroomService.apiChatroomGet();
    this.messages = this.messageService.apiMessageChatroomIdGet(roomId);
  }

  ngOnChanges() {
    console.log('onchange');
    const roomId = this.route.snapshot.paramMap.get('id');
    this.chatrooms = this.chatroomService.apiChatroomGet();
    this.messages = this.messageService.apiMessageChatroomIdGet(roomId);
  }

  selectChatroom(id: string) {
    this.zone.run(() => {
      this.router.navigate(['chatroom/', id]);
    });
  }
}
