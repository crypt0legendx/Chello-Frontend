import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotificationSettingComponent } from './components/notification-setting.component';
const routes: Routes = [
  {
    path: '',
    component: NotificationSettingComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationSettingRoutingModule { }
