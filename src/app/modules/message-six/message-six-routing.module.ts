import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageSixComponent } from './components/message-six.component';
const routes: Routes = [
  {
    path: '',
    component: MessageSixComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageSixRoutingModule { }
