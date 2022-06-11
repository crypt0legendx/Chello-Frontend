import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileEarningComponent } from './components/profile-earning.component';
const routes: Routes = [
  {
    path: '',
    component: ProfileEarningComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileEarningRoutingModule { }
