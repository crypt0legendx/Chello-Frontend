import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventPlayComponent } from './components/event-play.component';
const routes: Routes = [
  {
    path: '',
    component: EventPlayComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventPlayRoutingModule { }
