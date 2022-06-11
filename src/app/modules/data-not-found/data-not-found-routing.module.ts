import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataNotFoundComponent } from './components/data-not-found.component';
const routes: Routes = [
  {
    path: '',
    component: DataNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataNotFoundRoutingModule { }
