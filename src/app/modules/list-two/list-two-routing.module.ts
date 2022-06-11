import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListTwoComponent } from './components/list-two.component';
const routes: Routes = [
  {
    path: '',
    component : ListTwoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListTwoRoutingModule { }
