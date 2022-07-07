import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customize-subscription',
  templateUrl: '../pages/customize-subscription.component.html',
  styleUrls: ['../pages/customize-subscription.component.scss']
})
export class CustomizeSubscriptionComponent implements OnInit {

  addSubscription: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  addAnotherSubscription(){
    this.addSubscription = true;
  }

}
