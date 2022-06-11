import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageFiveComponent } from './components/message-five.component';
const routes: Routes = [
  {
    path: '',
    component: MessageFiveComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageFiveRoutingModule { }
