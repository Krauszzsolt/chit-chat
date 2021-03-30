import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnChanges, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor( private http: HttpClient,private signalRService : SignalRService ,private chatroomService: ChatroomService, private messageService: MessageService, private route: ActivatedRoute, private router: Router, private zone: NgZone) {}

  ngOnInit() {

    this.route.params.subscribe((routeParams) => {
      this.roomId = this.route.snapshot.paramMap.get('id');
      this.chatrooms = this.chatroomService.apiChatroomGet();
      this.messages = this.messageService.apiMessageChatroomIdGet(this.roomId);
    });
    this.signalRService.startConnection()
    // this.signalRService.addDataListener();
    this.signalRService.hubConnection.on('SendMessage', () => {
      this.messages = this.messageService.apiMessageChatroomIdGet(this.roomId);

    console.log('this.messages')
  });
  }

   action = (messasge, messagesetvice) => {
    console.log(this.messages)

    messasge = messagesetvice.apiMessageChatroomIdGet(this.roomId);
    console.log('this.messages')
    console.log(this.messages)

  }

  private startHttpRequest = () => {
    this.http.get('https://localhost:44364/api/MessageHub')
      .subscribe(res => {
        this.messages = null;
        console.log(res);
        this.messages = this.messageService.apiMessageChatroomIdGet(this.roomId);
      },)
  }

  ngOnChanges() {
  }

  selectChatroom(id: string) {
    this.zone.run(() => {
      this.router.navigate(['chatroom/', id]);
    });
  }

  sendMessage(){
    this.messageService.apiMessagePost({content:this.messageInput, chatroomId:this.roomId}).subscribe()
    this.messageInput = ''    
  }
}
