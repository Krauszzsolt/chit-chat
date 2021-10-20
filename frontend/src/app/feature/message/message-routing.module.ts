import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessageContainerComponent } from './message.container.component';

const routes: Routes = [
  {
    path: '',
    component: MessageContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessageRoutingModule {}
