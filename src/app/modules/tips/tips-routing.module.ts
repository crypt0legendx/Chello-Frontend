
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TipsComponent } from './components/tips.component';

const routes: Routes = [
  {
    path: '',
    component: TipsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipsRoutingModule { }
