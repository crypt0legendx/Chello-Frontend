import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComplaintsPolicyComponent } from './components/complaints-policy.component';

const routes: Routes = [
  {
    path: '',
    component: ComplaintsPolicyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplaintsPolicyRoutingModule { }
