import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileVaultComponent } from './components/profile-vault.component';
const routes: Routes = [
  {
    path: '',
    component: ProfileVaultComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileVaultRoutingModule { }
