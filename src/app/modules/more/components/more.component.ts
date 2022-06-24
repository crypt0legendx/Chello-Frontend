import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-more',
  templateUrl: '../pages/more.component.html',
  styleUrls: ['../pages/more.component.scss']
})
export class MoreComponent implements OnInit {

  isDarkMode: any;
  isLightMode: any;
  myInfo: any;

  constructor(
    private userService: UserService
  ) { }

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

    this.userService.currentUser().subscribe(
      (success:any)=>{
        console.log(success.data.user);
        this.myInfo = success.data.user;
      }
    );
    

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
