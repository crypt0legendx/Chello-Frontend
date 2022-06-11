import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageStateComponent } from './components/page-state.component';
const routes: Routes = [
  {
    path:'',
    component: PageStateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageStateRoutingModule { }
