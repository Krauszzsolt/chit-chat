import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChatroomDto, MessageES, MessageListDto } from 'src/app/shared/client';
import { ChatroomManagementService } from './service/chatroom-management.service';
import { MessageManagementService } from './service/message-management.service';
import { SearchService } from './service/search.service';

@Component({
  selector: 'app-message.container',
  templateUrl: './message.container.component.html',
  styleUrls: ['./message.container.component.scss'],
})
export class MessageContainerComponent implements OnInit {
  public $chatrooms: Observable<ChatroomDto[]>;
  public $messages: Observable<MessageListDto>;
  public $searchResult: Observable<MessageES[]>;
  public messageInput = '';

  constructor(private messageManagementService: MessageManagementService, private chatroomManagementService: ChatroomManagementService, private searchService: SearchService) {}

  ngOnInit() {
    this.$chatrooms = this.chatroomManagementService.getChatRooms();
    this.$messages = this.messageManagementService.getMessage();
    this.$searchResult = this.searchService.search('');
  }

  public selectChatroom(id: string) {
    this.chatroomManagementService.setChatRoom(id);
  }

  public sendMessage(message) {
    console.log(message);
    this.messageManagementService.sendMessage(message).subscribe();
  }

  public search(searchTerm) {
    this.$searchResult = this.searchService.search(searchTerm);
  }
}
