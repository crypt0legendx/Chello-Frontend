import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WithdrawEarningOneComponent } from './components/withdraw-earning-one.component';
const routes: Routes = [
  {
    path: '',
    component: WithdrawEarningOneComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WithdrawEarningOneRoutingModule { }
