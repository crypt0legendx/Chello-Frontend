import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubscriptionsRoutingModule } from './subscriptions-routing.module';
import { SubscriptionsComponent } from './components/subscriptions.component';
import { FooterModule} from '../layout/footer/footer.module'
import {HeaderNewModule} from '../layout/header-new/header-new.module'
import {SidebarModule} from '../layout/sidebar/sidebar.module'
import {SuggestionsModule} from '../layout/suggestions/suggestions.module'
@NgModule({
  declarations: [
    SubscriptionsComponent
  ],
  imports: [
    CommonModule,
    SubscriptionsRoutingModule,
    FooterModule,
    HeaderNewModule,
    SidebarModule,
    SuggestionsModule
  ]
})
export class SubscriptionsModule { }
