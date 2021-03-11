import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChatroomRoutingModule } from './chatroom-routing.module';
import { ChatroomListComponent } from './chatroom-list/chatroom-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ChatroomListComponent],
  imports: [
    CommonModule,
    ChatroomRoutingModule,
    SharedModule
  ]
})
export class ChatroomModule { }
