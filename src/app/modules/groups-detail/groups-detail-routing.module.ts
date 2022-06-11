import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupsDetailComponent } from './components/groups-detail.component';
const routes: Routes = [
  {
    path: '',
    component: GroupsDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupsDetailRoutingModule { }
