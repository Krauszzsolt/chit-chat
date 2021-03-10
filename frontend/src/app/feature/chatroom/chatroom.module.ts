import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatroomRoutingModule } from './chatroom-routing.module';
import { ChatroomListComponent } from './chatroom-list/chatroom-list.component';

@NgModule({
  declarations: [ChatroomListComponent],
  imports: [
    CommonModule,
    ChatroomRoutingModule
  ]
})
export class ChatroomModule { }
