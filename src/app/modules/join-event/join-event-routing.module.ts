import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinEventComponent } from './components/join-event.component';
const routes: Routes = [
  {
    path: '',
    component: JoinEventComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JoinEventRoutingModule { }
