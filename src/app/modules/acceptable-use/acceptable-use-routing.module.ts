import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceptableUseComponent } from './components/acceptable-use.component';
const routes: Routes = [
  {
    path: '',
    component: AcceptableUseComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcceptableUseRoutingModule { }
