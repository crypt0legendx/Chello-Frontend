import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyIdTwoComponent } from './components/verify-id-two.component';
const routes: Routes = [
  {
    path: '',
    component: VerifyIdTwoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifyIdTwoRoutingModule { }
