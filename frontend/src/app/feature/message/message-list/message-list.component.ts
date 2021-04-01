import { AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ChatroomDto, ChatroomService, MessageListDto, MessageService } from 'src/app/shared/client';
import { SignalRService } from '../signal-r.service';
// import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs/observable/of';
import { switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent implements OnInit, OnChanges, AfterViewInit {
  public chatrooms: Observable<ChatroomDto[]>;
  public subject = new BehaviorSubject<string>('');
  public $messages: Observable<MessageListDto>;
  public messageInput = '';
  public roomId;
  constructor(private changeDetectorRef: ChangeDetectorRef,private signalRService: SignalRService, private chatroomService: ChatroomService, private messageService: MessageService) {}

  ngOnInit() {
    this.chatrooms = this.chatroomService.apiChatroomGet();
    this.chatrooms.subscribe((repsonse) => {
      this.roomId = repsonse[0].id;
      this.subject.next(repsonse[0].id);

      this.$messages = this.subject.pipe(
        switchMap(
          (id): Observable<MessageListDto> => {
            return this.messageService.apiMessageChatroomIdGet(id);
          }
        )
      );
    });

    this.signalRService.startConnection();

    this.signalRService.hubConnection.on('SendMessage', () => {
      this.subject.next(this.roomId);
    });
  }

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  
}
  ngOnChanges() {}

  selectChatroom(id: string) {
    this.roomId = id;
    this.$messages = this.messageService.apiMessageChatroomIdGet(id);
  }

  sendMessage() {
    this.messageService.apiMessagePost({ content: this.messageInput, chatroomId: this.roomId }).subscribe();
    this.messageInput = '';
  }
}
