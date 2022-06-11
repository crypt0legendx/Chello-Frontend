import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupNewComponent } from './components/group-new.component';

const routes: Routes = [
  {
    path:'',
    component: GroupNewComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupNewRoutingModule { }
