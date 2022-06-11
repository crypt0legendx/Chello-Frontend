import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileDeleteComponent } from './components/profile-delete.component';
const routes: Routes = [
  {
    path: '',
    component: ProfileDeleteComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileDeleteRoutingModule { }
