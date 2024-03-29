import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { catchError, filter, map, switchMap, tap } from 'rxjs/operators';
import { MessageES, MessageListDto } from 'src/app/shared/client';
import { MessageListModel } from '../../../shared/model/message-list.model';
import { ScrollState } from '../../../shared/model/scroll-state.model';
import { ChatroomManagementService } from './chatroom-management.service';
import { MessageManagementService } from './message-management.service';
import { SearchService } from './search.service';
import { SignalRService } from './signal-r.service';

@Injectable({
  providedIn: 'root',
})
export class MessagePagingService {
  private currentPages: number[];
  private messagesListModelSubject: BehaviorSubject<MessageListModel> = new BehaviorSubject(new MessageListModel());
  private scrollStateSubject: BehaviorSubject<ScrollState> = new BehaviorSubject(ScrollState.init);
  private currenRoomId = '';
  private maxPage: number;

  constructor(
    private signalRService: SignalRService,
    private messageManagementService: MessageManagementService,
    private chatroomManagementService: ChatroomManagementService,
    private searchService: SearchService
  ) {
    this.signalRService.startConnection();
    this.signalRService.hubConnection.on('SendMessage', (chatroomId) => {
      if (chatroomId == this.currenRoomId && this.currentPages.includes(this.maxPage)) {
        this.scrollStateSubject.next(ScrollState.down);
      }
    });

    chatroomManagementService.getSelectedChatRooms().subscribe((chatroom) => {
      if (chatroom.id) this.currenRoomId = chatroom.id;
    });

    this.getMessagesInit().subscribe();
  }

  public setScrollState(scrollState: ScrollState) {
    switch (scrollState) {
      case ScrollState.init: {
        this.scrollStateSubject.next(scrollState);
        break;
      }
      case ScrollState.down: {
        if (!this.currentPages.includes(this.maxPage)) {
          this.scrollStateSubject.next(scrollState);
        }
        break;
      }
      case ScrollState.up: {
        if (!this.currentPages.includes(1)) {
          this.scrollStateSubject.next(scrollState);
        }
        break;
      }
    }
  }

  public getSearchResult(selectedMessage: MessageES) {
    this.searchService.getSearchResult(selectedMessage.id, selectedMessage.chatRoomId, 10).subscribe((newMessages) => {
      this.chatroomManagementService.setChatRoom(newMessages.chatRoom);
      this.maxPage = newMessages.messages.pagingInfo.totalPages;
      this.currentPages = [newMessages.messages.pagingInfo.pageNumber];
      this.messagesListModelSubject.next({ chatRoom: newMessages.chatRoom, messages: newMessages.messages.results });
      if (this.maxPage === newMessages.messages.pagingInfo.pageNumber) {
        this.scrollStateSubject.next(ScrollState.up);
      }
    });
  }

  public getMessages() {
    return this.messagesListModelSubject.asObservable();
  }

  private getMessagesInit() {
    return this.scrollStateSubject.pipe(
      filter(() => this.currenRoomId !== ''),
      switchMap((scrollState): Observable<unknown> => {
        switch (scrollState) {
          case ScrollState.init: {
            return this.messageManagementService.getMessage(this.currenRoomId).pipe(
              map((newMessages) => {
                return this.mappingMessages(newMessages, scrollState);
              })
            );
          }
          case ScrollState.down: {
            return this.messageManagementService.getMessage(this.currenRoomId, Math.max(...this.currentPages) + 1).pipe(
              map((newMessages) => {
                return this.mappingMessages(newMessages, scrollState);
              })
            );
          }
          case ScrollState.up: {
            return this.messageManagementService.getMessage(this.currenRoomId, Math.min(...this.currentPages) - 1).pipe(
              map((newMessages) => {
                return this.mappingMessages(newMessages, scrollState);
              })
            );
          }
        }
      }),
      catchError((error) => {
        console.log('error:', error);
        return of({});
      })
    );
  }

  private mappingMessages(newMessages: MessageListDto, scrollState: ScrollState) {
    if (newMessages.messages) {
      const oldMessageList = this.messagesListModelSubject.value;
      if (!oldMessageList.messages) oldMessageList.messages = [];
      this.maxPage = newMessages.messages.pagingInfo.totalPages;
      switch (scrollState) {
        case ScrollState.init: {
          this.currentPages = [newMessages.messages.pagingInfo.pageNumber];
          this.messagesListModelSubject.next({ chatRoom: newMessages.chatRoom, messages: newMessages.messages.results });
          this.scrollStateSubject.next(ScrollState.up);
          break;
        }
        case ScrollState.down: {
          this.currentPages.push(newMessages.messages.pagingInfo.pageNumber);
          this.messagesListModelSubject.next({
            chatRoom: newMessages.chatRoom,
            messages: oldMessageList.messages.concat(newMessages.messages.results).filter((message, index, self) => index === self.findIndex((m) => m.id === message.id)),
          });
          break;
        }
        case ScrollState.up: {
          this.currentPages.push(newMessages.messages.pagingInfo.pageNumber);
          this.messagesListModelSubject.next({ chatRoom: newMessages.chatRoom, messages: newMessages.messages.results.concat(oldMessageList.messages) });
          break;
        }
      }
    } else if (this.messagesListModelSubject.value.chatRoom && this.messagesListModelSubject.value.chatRoom.id !== this.currenRoomId) {
      this.messagesListModelSubject.next(new MessageListModel());
    }
  }

  public getChatRooms() {
    return this.chatroomManagementService.getChatRooms().pipe(tap(() => this.scrollStateSubject.next(ScrollState.init)));
  }
}
