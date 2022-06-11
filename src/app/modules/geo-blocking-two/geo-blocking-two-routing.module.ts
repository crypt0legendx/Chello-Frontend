import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeoBlockingTwoComponent } from './components/geo-blocking-two.component';
const routes: Routes = [
  {
    path: '',
    component: GeoBlockingTwoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GeoBlockingTwoRoutingModule { }
