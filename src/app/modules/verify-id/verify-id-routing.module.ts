import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyIdComponent } from './components/verify-id.component';
const routes: Routes = [
  {
    path: '',
    component: VerifyIdComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifyIdRoutingModule { }
