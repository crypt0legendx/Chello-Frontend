import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-new',
  templateUrl: '../pages/header-new.component.html',
  styleUrls: ['../pages/header-new.component.scss']
})
export class HeaderNewComponent implements OnInit {

  isHomePage: boolean = false;
  isShowDivIf = false;  

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    if("/home" === this.router.url){
      this.isHomePage = true;
    }
  }
  
  toggleDisplayDivIf() {  
    this.isShowDivIf = !this.isShowDivIf;  
  }  
}
