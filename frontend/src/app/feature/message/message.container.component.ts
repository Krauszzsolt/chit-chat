import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ChatroomDto, MessageES, MessageListDto } from 'src/app/shared/client';
import { AddChatroomDialogComponent } from './add-chatroom-dialog/add-chatroom-dialog.component';
import { MessageListModel } from './model/message-list.model';
import { ScrollState } from './model/scroll-state.model';
import { searchtermEmit } from './model/search.model';
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
  public $selectedChatroom: Observable<string>;
  public $messages: Observable<MessageListModel>;
  public $searchResult: Observable<MessageES[]>;
  public messageInput = '';

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private messagePagingService: MessagePagingService,
    private messageManagementService: MessageManagementService,
    private chatroomManagementService: ChatroomManagementService,
    private searchService: SearchService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.$chatrooms = this.messagePagingService.getChatRooms();
    this.$messages = this.messagePagingService.getMessages();
    this.$searchResult = this.searchService.search('');
    this.$selectedChatroom = this.chatroomManagementService.getSelectedChatRooms();
  }
  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }
  public selectChatroom(id: string) {
    this.chatroomManagementService.setChatRoom(id);
    this.messagePagingService.setScrollState(ScrollState.init);
  }

  public sendMessage(message: string) {
    this.messageManagementService.sendMessage(message).subscribe();
  }

  public search(event: searchtermEmit) {
    this.$searchResult = this.searchService.search(event.searchterm, event.isGlobal);
  }

  public searchResult(selectedMessage: MessageES) {
    this.messagePagingService.getSearchResult(selectedMessage);
  }

  public onScrollDown() {
    this.messagePagingService.setScrollState(ScrollState.down);
  }

  public onScrollUp() {
    this.messagePagingService.setScrollState(ScrollState.up);
  }

  public addChatroom() {
    const dialogRef = this.dialog.open(AddChatroomDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
