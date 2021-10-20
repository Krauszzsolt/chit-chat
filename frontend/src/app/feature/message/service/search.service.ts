import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { MessageES, MessageService } from 'src/app/shared/client';
import { ChatroomManagementService } from './chatroom-management.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private messageService: MessageService, private chartroomService: ChatroomManagementService) {}

  public search(searchTerm: string) {
    if (searchTerm.length > 1) return this.messageService.apiMessageSearchGet(searchTerm).pipe(map((result) => result.slice(0, 10)));
  }

  public getSearchResult(messageId: string, chatroomId: string, pageSize: number) {
    this.chartroomService.setChatRoom(chatroomId);
    return this.messageService.apiMessageSearchResultGet(messageId, chatroomId, pageSize);
  }
}
