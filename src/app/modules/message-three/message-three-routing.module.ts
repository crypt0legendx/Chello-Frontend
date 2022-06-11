import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageThreeComponent } from './components/message-three.component';
const routes: Routes = [
  {
    path: '',
    component: MessageThreeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageThreeRoutingModule { }
