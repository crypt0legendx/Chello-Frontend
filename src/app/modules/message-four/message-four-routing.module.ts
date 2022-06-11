import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageFourComponent } from './components/message-four.component';
const routes: Routes = [
  {
    path: '',
    component: MessageFourComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageFourRoutingModule { }
