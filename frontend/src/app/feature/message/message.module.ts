import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { MessageListComponent } from './message-list/message-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MessageSearchComponent } from './message-search/message-search.component';
import { ChatroomListComponent } from './chatroom-list/chatroom-list.component';
import { MessageContainerComponent } from './message.container.component';
import { ProfileModule } from '../profile/profile.module';
import { AddChatroomDialogComponent } from './add-chatroom-dialog/add-chatroom-dialog.component';

@NgModule({
  declarations: [MessageListComponent, MessageSearchComponent, ChatroomListComponent, MessageContainerComponent, AddChatroomDialogComponent],
  imports: [CommonModule, MessageRoutingModule, SharedModule, ProfileModule],
  entryComponents: [AddChatroomDialogComponent],
})
export class MessageModule {}
