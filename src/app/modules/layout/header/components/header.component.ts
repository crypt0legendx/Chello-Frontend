import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routers } from '../../../../utils/router-navigate';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: '../pages/header.component.html',
  styleUrls: ['../pages/header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public routernavigate: routers,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  checkAuth() {
    //this.location.back();
    let retrievedObject: any = localStorage.getItem('userData');
    if (retrievedObject) {
      this.router.navigate([this.routernavigate.home]);
    } else {
      this.router.navigate([this.routernavigate.login]);
    }
  }
}
