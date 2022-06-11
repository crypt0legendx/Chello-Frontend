import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePhotoComponent } from './components/profile-photo.component';
const routes: Routes = [
  {
    path: '',
    component: ProfilePhotoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfilePhotoRoutingModule { }
