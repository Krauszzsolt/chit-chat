import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ApplicationUserDto, ChatroomDto, MessageES, MessageListDto } from 'src/app/shared/client';
import { AddChatroomDialogComponent } from './add-chatroom-dialog/add-chatroom-dialog.component';
import { MessageListModel } from '../../shared/model/message-list.model';
import { ScrollState } from '../../shared/model/scroll-state.model';
import { searchtermEmit } from '../../shared/model/search.model';
import { ChatroomManagementService } from './service/chatroom-management.service';
import { MessageManagementService } from './service/message-management.service';
import { MessagePagingService } from './service/message-paging.service';
import { SearchService } from './service/search.service';
import { AuthService } from '@src/app/core/service/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { openSnackBar } from '@src/app/shared/utils/snack';

@Component({
  selector: 'app-message.container',
  templateUrl: './message.container.component.html',
  styleUrls: ['./message.container.component.scss'],
})
export class MessageContainerComponent implements OnInit, AfterViewInit {
  public $chatrooms: Observable<ChatroomDto[]>;
  public $selectedChatroom: Observable<ChatroomDto>;
  public $messages: Observable<MessageListModel>;
  public $searchResult: Observable<MessageES[]>;
  public $user: Observable<ApplicationUserDto>;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private messagePagingService: MessagePagingService,
    private messageManagementService: MessageManagementService,
    private chatroomManagementService: ChatroomManagementService,
    private searchService: SearchService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.$chatrooms = this.messagePagingService.getChatRooms();
    this.$messages = this.messagePagingService.getMessages();
    this.$searchResult = this.searchService.search('');
    this.$selectedChatroom = this.chatroomManagementService.getSelectedChatRooms();
    this.$user = this.authService.getUser();
  }
  ngAfterViewInit() {
    this.changeDetectorRef.detectChanges();
  }
  public selectChatroom(chatroom: ChatroomDto) {
    this.chatroomManagementService.setChatRoom(chatroom);
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

    dialogRef.afterClosed().subscribe((chatroom: ChatroomDto) => {
      this.chatroomManagementService.addChatroom(chatroom).subscribe(() => {
        openSnackBar('Succesful create', this.snackBar);
        this.$chatrooms = this.messagePagingService.getChatRooms();
      });
    });
  }

  public deleteChatroom(id: string) {
    this.chatroomManagementService.deleteChatroom(id).subscribe(() => {
      openSnackBar('Succesful delete', this.snackBar);
      this.$chatrooms = this.messagePagingService.getChatRooms();
    });
  }
}
