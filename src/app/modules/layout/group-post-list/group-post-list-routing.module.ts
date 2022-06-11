import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GroupPostListComponent} from './components/group-post-list.component'
const routes: Routes = [
  {
    path: '',
    component: GroupPostListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupPostListRoutingModule { }
