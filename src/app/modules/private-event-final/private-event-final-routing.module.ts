import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateEventFinalComponent } from './components/private-event-final.component';
const routes: Routes = [
  {
    path: '',
    component:PrivateEventFinalComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateEventFinalRoutingModule { }
