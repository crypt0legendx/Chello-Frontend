import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PollAskPostComponent } from './components/poll-ask-post.component';
const routes: Routes = [
  {
    path:'',
    component: PollAskPostComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PollAskPostRoutingModule { }
