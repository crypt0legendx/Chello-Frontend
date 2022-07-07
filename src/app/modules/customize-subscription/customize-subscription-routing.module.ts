import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomizeSubscriptionComponent } from './components/customize-subscription.component';
const routes: Routes = [
  {
    path: '',
    component: CustomizeSubscriptionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomizeSubscriptionRoutingModule { }
