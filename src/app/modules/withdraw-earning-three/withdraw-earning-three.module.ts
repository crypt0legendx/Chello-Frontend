import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WithdrawEarningThreeRoutingModule } from './withdraw-earning-three-routing.module';
import { WithdrawEarningThreeComponent } from './components/withdraw-earning-three.component';
import { FooterModule} from '../layout/footer/footer.module'
import {HeaderNewModule} from '../layout/header-new/header-new.module'
import {SidebarModule} from '../layout/sidebar/sidebar.module'

@NgModule({
  declarations: [
    WithdrawEarningThreeComponent
  ],
  imports: [
    CommonModule,
    WithdrawEarningThreeRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule,
  ]
})
export class WithdrawEarningThreeModule { }
