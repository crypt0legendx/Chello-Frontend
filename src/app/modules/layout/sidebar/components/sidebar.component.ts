import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routers } from '../../../../utils/router-navigate';
import { UserService } from '../../../../services/user.service';

declare var $: any;
@Component({
  selector: 'app-sidebar',
  templateUrl: '../pages/sidebar.component.html',
  styleUrls: ['../pages/sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  userJsonData: any;
  userName: any;
  profilePicture: any;
  isUserVerify: any;
  userFullName: any;
  userCoverPicture: any;
  isUserCoverPicture: boolean = false;

  constructor(
    private router: Router,
    public routernavigate: routers,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    let retrievedObject: any = localStorage.getItem('userData');
    if (retrievedObject) {
      this.userJsonData = JSON.parse(retrievedObject);
      console.log(this.userJsonData);
      this.userName = this.userJsonData['userName'];
      this.profilePicture = this.userJsonData['profileImage'];
      this.isUserVerify = this.userJsonData['profileStatus'];
      this.userFullName = this.userJsonData['fullName'];
      this.userCoverPicture = this.userJsonData['coverImage'];
      if (this.userJsonData['coverImage']) {
        this.isUserCoverPicture = true;
      } else {
        this.isUserCoverPicture = false;
      }
    }
  }

  getCurrentUser() {
    this.userService.currentUser().subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
      }
      else {
        $("#authExpiredModel").modal('show');
      }
    }, (error) => {
      console.error(error);
      $("#authExpiredModel").modal('show');
    });
  }

  authExpired() {
    $("#authExpiredModel").modal('hide');
    localStorage.clear();
    this.router.navigate([this.routernavigate.login]);
  }

  logout() {
    $("#logoutConfirmModel").modal('hide');
    localStorage.clear();
    this.router.navigate([this.routernavigate.login]);
  }

}
