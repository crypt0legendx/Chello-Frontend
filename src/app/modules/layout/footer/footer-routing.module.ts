import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {FooterComponent} from './components/footer.component'
const routes: Routes = [
  {
    path: '',
    component: FooterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FooterRoutingModule { }
