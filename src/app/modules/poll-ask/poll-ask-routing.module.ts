import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PollAskComponent } from './components/poll-ask.component';
const routes: Routes = [
  {
    path: '',
    component: PollAskComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PollAskRoutingModule { }
