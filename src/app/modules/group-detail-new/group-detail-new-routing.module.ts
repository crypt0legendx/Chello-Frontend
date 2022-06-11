import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupDetailNewComponent } from './components/group-detail-new.component';
const routes: Routes = [
  {
    path: '',
    component: GroupDetailNewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupDetailNewRoutingModule { }
