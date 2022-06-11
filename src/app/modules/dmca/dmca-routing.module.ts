import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DmcaComponent } from './components/dmca.component';
const routes: Routes = [
  {
    path: '',
    component: DmcaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DmcaRoutingModule { }
