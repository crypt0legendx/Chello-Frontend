import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubMenuRoutingModule } from './sub-menu-routing.module';
import { SubMenuComponent } from './components/sub-menu.component';


@NgModule({
  declarations: [
    SubMenuComponent
  ],
  imports: [
    CommonModule,
    SubMenuRoutingModule
  ],
  exports: [
    SubMenuComponent
  ]
})
export class SubMenuModule { }
