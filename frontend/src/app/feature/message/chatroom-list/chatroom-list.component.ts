import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatroomDto } from 'src/app/shared/client';

@Component({
  selector: 'app-chatroom-list',
  templateUrl: './chatroom-list.component.html',
  styleUrls: ['./chatroom-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatroomListComponent implements OnInit {
  constructor() {}

  @Input()
  public chatrooms: ChatroomDto[];

  @Input()
  public SelectedChatroom: ChatroomDto;

  @Output()
  public selectedChatroomEmit: EventEmitter<ChatroomDto> = new EventEmitter();

  ngOnInit() {}

  public selectChatroom(chatroomId) {
    this.selectedChatroomEmit.emit(chatroomId);
  }
}
