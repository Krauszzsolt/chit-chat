import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MessageES, MessageService } from 'src/app/shared/client';
import { ChatroomManagementService } from './chatroom-management.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private currenRoomId = '';
  constructor(private messageService: MessageService, private chartroomService: ChatroomManagementService) {
    this.chartroomService.getSelectedChatRooms().subscribe((id) => {
      this.currenRoomId = id;
    });
  }

  public search(searchTerm: string, isGlobal?: boolean) {
    if (searchTerm.length > 1) return this.messageService.apiMessageSearchGet(searchTerm, 100, isGlobal ? undefined : this.currenRoomId).pipe(map((result) => result.slice(0, 15)));
  }

  public getSearchResult(messageId: string, chatroomId: string, pageSize: number) {
    this.chartroomService.setChatRoom(chatroomId);
    return this.messageService.apiMessageSearchResultGet(messageId, chatroomId, pageSize);
  }
}
