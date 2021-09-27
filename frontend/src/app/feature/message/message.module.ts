import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { MessageListComponent } from './message-list/message-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [MessageListComponent],
  imports: [CommonModule, MessageRoutingModule, SharedModule],
})
export class MessageModule {}
