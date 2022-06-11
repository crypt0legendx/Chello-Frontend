import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageTwoComponent } from './components/message-two.component';
const routes: Routes = [
  {
    path: '',
    component: MessageTwoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageTwoRoutingModule { }
