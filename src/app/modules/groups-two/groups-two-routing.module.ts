import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsTwoComponent } from './components/groups-two.component';
const routes: Routes = [
  {
    path: '',
    component: GroupsTwoComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsTwoRoutingModule { }
