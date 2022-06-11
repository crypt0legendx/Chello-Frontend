import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WithdrawEarningThreeComponent } from './components/withdraw-earning-three.component';
const routes: Routes = [
  {
    path: '',
    component: WithdrawEarningThreeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WithdrawEarningThreeRoutingModule { }
