import { Injectable } from '@angular/core';
import { debounceTime, filter, map, tap } from 'rxjs/operators';
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
    if (searchTerm !== '')
      return this.messageService.apiMessageSearchGet(searchTerm, 100, isGlobal ? undefined : this.currenRoom.id || '').pipe(
        map(
          (result) => result.slice(0, 15),
          tap((x) => console.log(x))
        )
      );
  }

  public getSearchResult(messageId: string, chatroomId: string, pageSize: number) {
    return this.messageService.apiMessageSearchResultGet(messageId, chatroomId, pageSize);
  }
}
