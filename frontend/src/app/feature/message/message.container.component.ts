import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatroomDto, MessageES, MessageListDto } from 'src/app/shared/client';
import { MessageListModel } from './model/message-list.model';
import { ScrollState } from './model/scroll-state.model';
import { ChatroomManagementService } from './service/chatroom-management.service';
import { MessageManagementService } from './service/message-management.service';
import { MessagePagingService } from './service/message-paging.service';
import { SearchService } from './service/search.service';

@Component({
  selector: 'app-message.container',
  templateUrl: './message.container.component.html',
  styleUrls: ['./message.container.component.scss'],
})
export class MessageContainerComponent implements OnInit, AfterViewInit {
  public $chatrooms: Observable<ChatroomDto[]>;
  public $messages: Observable<MessageListModel>;
  public $searchResult: Observable<MessageES[]>;
  public messageInput = '';

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private messagePagingService: MessagePagingService,
    private messageManagementService: MessageManagementService,
    private chatroomManagementService: ChatroomManagementService,
    private searchService: SearchService
  ) {}

  ngOnInit() {
    this.$chatrooms = this.chatroomManagementService.getChatRooms();
    this.$messages = this.messagePagingService.getMessages();
    this.$searchResult = this.searchService.search('');
  }
  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }
  public selectChatroom(id: string) {
    this.chatroomManagementService.setChatRoom(id);
  }

  public sendMessage(message: string) {
    console.log(message);
    this.messageManagementService.sendMessage(message).subscribe();
  }

  public search(searchTerm: string) {
    this.$searchResult = this.searchService.search(searchTerm);
  }

  public searchResult(selectedMessage: MessageES) {
    this.messagePagingService.getSearchResult(selectedMessage);
  }

  onScrollDown() {
    this.messagePagingService.setScrollState(ScrollState.down);
  }
  onScrollUp() {
    this.messagePagingService.setScrollState(ScrollState.up);
  }
}
