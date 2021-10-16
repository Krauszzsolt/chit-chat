import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { MessageListDto } from 'src/app/shared/client';
import { MessageListModel } from '../model/message-list.model';
import { ScrollState } from '../model/scroll-state.model';
import { ChatroomManagementService } from './chatroom-management.service';
import { MessageManagementService } from './message-management.service';
import { SignalRService } from './signal-r.service';

@Injectable({
  providedIn: 'root',
})
export class MessagePagingService {
  private currentPages: number[];
  private messagesListModelSubject: BehaviorSubject<MessageListModel>;
  private scrollStateSubject: BehaviorSubject<ScrollState> = new BehaviorSubject(ScrollState.init);
  private currenRoomId = '';
  private maxPage = 1;
  private newMessage = new BehaviorSubject<string>('');

  constructor(private signalRService: SignalRService, private messageManagementService: MessageManagementService, private chatroomManagementService: ChatroomManagementService) {
    this.signalRService.startConnection();
    this.signalRService.hubConnection.on('SendMessage', (chatroomId) => {
      if (chatroomId == this.currenRoomId && this.currentPages.includes(this.maxPage)) {
        this.scrollStateSubject.next(ScrollState.down);
        this.newMessage.next('');
      }
    });

    chatroomManagementService.getSelectedChatRooms().subscribe((roomId) => {
      this.currenRoomId = roomId;
    });
  }

  private getMessagesInit() {
    combineLatest(this.newMessage, this.chatroomManagementService.getSelectedChatRooms(), this.scrollStateSubject).pipe(
      switchMap(([message, roomid, scrollState]): Observable<unknown> => {
        switch (scrollState) {
          case ScrollState.init: {
            return this.messageManagementService.getMessage(roomid).pipe(
              map((newMessages) => {
                return this.mappingMessages(newMessages, scrollState);
              })
            );
          }
          case ScrollState.down: {
            return this.messageManagementService.getMessage(roomid, Math.min(...this.currentPages) - 1).pipe(
              map((newMessages) => {
                return this.mappingMessages(newMessages, scrollState);
              })
            );
          }
          case ScrollState.up: {
            return this.messageManagementService.getMessage(roomid, Math.max(...this.currentPages) + 1).pipe(
              map((newMessages) => {
                return this.mappingMessages(newMessages, scrollState);
              })
            );
          }
        }
      })
    );
  }

  private mappingMessages(newMessages: MessageListDto, scrollState: ScrollState) {
    const oldMessageList = this.messagesListModelSubject.value;
    this.maxPage = newMessages.messages.pagingInfo.totalPages;
    switch (scrollState) {
      case ScrollState.init: {
        this.currentPages = [newMessages.messages.pagingInfo.pageNumber];
        this.messagesListModelSubject.next({ chatRoom: newMessages.chatRoom, messages: newMessages.messages.results });
        this.scrollStateSubject.next(ScrollState.up);
      }
      case ScrollState.down: {
        this.currentPages.push(newMessages.messages.pagingInfo.pageNumber);
        this.messagesListModelSubject.next({ chatRoom: newMessages.chatRoom, messages: oldMessageList.messages.concat(newMessages.messages.results) });
      }
      case ScrollState.up: {
        this.currentPages.push(newMessages.messages.pagingInfo.pageNumber);
        this.messagesListModelSubject.next({ chatRoom: newMessages.chatRoom, messages: newMessages.messages.results.concat(oldMessageList.messages) });
      }
    }
  }

  public setScrollState(scrollState: ScrollState) {
    this.scrollStateSubject.next(scrollState);
  }
}
