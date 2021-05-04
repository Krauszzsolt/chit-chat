import { AfterViewInit, ChangeDetectorRef, Component, OnChanges, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ChatroomDto, ChatroomService, MessageES, MessageListDto, MessageService } from 'src/app/shared/client';
import { SignalRService } from '../signal-r.service';
// import 'rxjs/add/operator/switchMap';
import { of } from 'rxjs/observable/of';
import { switchMap, take } from 'rxjs/operators';
import { MessageManagementService } from '../message-management.service';
import { MatListOption, MatSelectionList } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent implements OnInit, AfterViewInit {
  public $chatrooms: Observable<ChatroomDto[]>;
  public $messages: Observable<MessageListDto>;
  public $searchResult: Observable<MessageES[]>;
  public messageInput = '';
  public searchTerm = '';
  constructor(private changeDetectorRef: ChangeDetectorRef, private messageManagementService: MessageManagementService) {}

  @ViewChild(MatSelectionList)
  private selectionList: MatSelectionList;
  
  // typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  
  ngOnInit() {
    this.selectionList.selectedOptions = new SelectionModel<MatListOption>(false);
    this.$chatrooms = this.messageManagementService.getChatRooms();
    this.$messages = this.messageManagementService.getMessage();
    this.$searchResult = this.messageManagementService.search(this.searchTerm)
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

  search() {
    this.$searchResult = this.messageManagementService.search(this.searchTerm)
  }
}
