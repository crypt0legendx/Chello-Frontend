import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sub-menu',
  templateUrl: '../pages/sub-menu.component.html',
  styleUrls: ['../pages/sub-menu.component.scss']
})
export class SubMenuComponent implements OnInit {

 
  isDarkMode: any;
  isLightMode: any;

  constructor() { }

  ngOnInit(): void {
    var darkMode = localStorage.getItem('darkMode');
    console.log(darkMode);
    if (darkMode) {
      if (darkMode === "yes") {
        this.isDarkMode = true;
        this.isLightMode = false;
        document.body.classList.add('dark-theme');
      } else {
        this.isDarkMode = false;
        this.isLightMode = true;
        document.body.classList.remove('dark-theme');
      }
    } else {
      this.isDarkMode = false;
      this.isLightMode = true;
      document.body.classList.remove('dark-theme');
    }
  }

  toggleDarkTheme(): void {
    localStorage.setItem('darkMode', "yes");
    document.body.classList.add('dark-theme');
  }

  toggleLightTheme(): void {
    localStorage.setItem('darkMode', "no");
    document.body.classList.remove('dark-theme');
  }
}
