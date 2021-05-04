import { AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ChatroomDto, ChatroomService, MessageListDto, MessageService } from 'src/app/shared/client';
import { SignalRService } from '../signal-r.service';
// import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs/observable/of';
import { switchMap, take } from 'rxjs/operators';
import { MessageManagementService } from '../message-management.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent implements OnInit, AfterViewInit {
  public $chatrooms: Observable<ChatroomDto[]>;
  public $messages: Observable<MessageListDto>;
  public messageInput = '';
  constructor(private changeDetectorRef: ChangeDetectorRef, private messageManagementService: MessageManagementService) {}


  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  
  ngOnInit() {
    this.$chatrooms = this.messageManagementService.getChatRooms();
    this.$messages = this.messageManagementService.getMessage();
  }

  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }

  selectChatroom(id: string) {
    this.messageManagementService.setChatRoom(id);
  }

  sendMessage() {
    this.messageManagementService.sendMessage(this.messageInput).subscribe();
    this.messageInput = '';
  }
}
