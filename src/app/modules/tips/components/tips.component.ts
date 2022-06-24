import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tips',
  templateUrl: '../pages/tips.component.html',
  styleUrls: ['../pages/tips.component.scss']
})
export class TipsComponent implements OnInit {

  
  isDarkMode: any;
  isLightMode: any;

  groupMembersList: any;
  groupMembersListLength: any;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  searchUser(q: any) {
    var searchData = {
      "search": q
    }

    console.log(searchData);
    this.userService.searchUser(searchData).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        if (q != "") {
          this.groupMembersList = data['userData'];
          this.groupMembersListLength = data['userData'].length;
        } else {
          this.groupMembersList = data['userData'].slice(0, 30);
          this.groupMembersListLength = data['userData'].length;
        }
        console.log(this.groupMembersList);
      }
      else {
      }
    }, (error) => {
    });
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
