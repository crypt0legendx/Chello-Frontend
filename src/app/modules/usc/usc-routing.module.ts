import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UscComponent} from './components/usc.component'
const routes: Routes = [
  {
    path: '',
    component: UscComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UscRoutingModule { }
