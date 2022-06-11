import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReferralComponent } from './components/referral.component';
const routes: Routes = [
  {
    path: '',
    component: ReferralComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReferralRoutingModule { }
