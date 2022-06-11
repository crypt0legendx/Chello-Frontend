import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PollComponent } from './components/poll.component';
const routes: Routes = [
  {
    path: '',
    component: PollComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PollRoutingModule { }
