import { Injectable } from '@angular/core';
import { debounceTime, filter, map } from 'rxjs/operators';
import { ChatroomDto, MessageES, MessageService } from 'src/app/shared/client';
import { ChatroomManagementService } from './chatroom-management.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private currenRoom: ChatroomDto;
  constructor(private messageService: MessageService, private chartroomService: ChatroomManagementService) {
    this.chartroomService.getSelectedChatRooms().subscribe((chatroom) => {
      this.currenRoom = chatroom;
    });
  }

  public search(searchTerm: string, isGlobal?: boolean) {
    return this.messageService.apiMessageSearchGet(searchTerm, 100, isGlobal ? undefined : this.currenRoom.id || '').pipe(
      debounceTime(500),
      filter((x) => searchTerm.length > 3),
      map((result) => result.slice(0, 15))
    );
  }

  public getSearchResult(messageId: string, chatroomId: string, pageSize: number) {
    return this.messageService.apiMessageSearchResultGet(messageId, chatroomId, pageSize);
  }
}
