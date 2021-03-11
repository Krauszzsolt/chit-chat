import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChatroomListComponent } from './chatroom-list/chatroom-list.component';

const routes: Routes = [
  {
    path: "",
    component: ChatroomListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatroomRoutingModule { }
