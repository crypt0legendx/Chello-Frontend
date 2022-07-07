import { ToastrService } from 'ngx-toastr';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-geo-blocking',
  templateUrl: '../pages/geo-blocking.component.html',
  styleUrls: ['../pages/geo-blocking.component.scss']
})
export class GeoBlockingComponent implements OnInit {

  isDarkMode: any;
  isLightMode: any;

  groupMembersList: any;
  groupMembersListLength: any;

  onFocus: boolean[] = [];
  blockUser: any;
  restrictUser: any;
  blockUserId: any;
  restrictUserId: any;

  blockUserList:any = [];
  restrictUserList:any = [];

  constructor(
    private userService: UserService,
    private toastrService: ToastrService
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

    this.fetchBlockUserList();
    this.fetchRestrictUserList();
  }

  setBlockUser(user: any){
    this.blockUser = user.userName;
    this.blockUserId = user._id;
    console.log(user);
  }

  setRestrictUser(user: any){
    this.restrictUser = user.userName;
    this.restrictUserId = user._id;
  }

  getBlockUserList(){
    return this.blockUserList;
  }

  getRestrictUserList(){
    return this.restrictUserList;
  }

  fetchBlockUserList(){
    this.userService.fetchBlockList({
      "pageNumber": 0
      }).subscribe((data:any)=>{
        this.blockUserList = data.blockuserlistData;        
      });
  }

  fetchRestrictUserList(){
    this.userService.fetchRestrictList({
      "pageNumber": 0
      }).subscribe((data:any)=>{
        this.restrictUserList = data.restrictuserlistData;
      });
  }

  onClickBlock(){
    this.userService.blockUser({
      "blockUserId": this.blockUserId,
      "status":"1"
      }).subscribe(
        (success:any) =>{
          this.toastrService.success("Succesfully added the user on block list.");
          this.fetchBlockUserList();
        },
        (err:any)=>{
          this.toastrService.error("Failed to add the user on block list.");
        }
    );
  }

  onClickUnBlock(_id:any){
    this.userService.blockUser({
      "blockUserId": _id,
      "status":"0"
      }).subscribe(
        (success:any) =>{
          this.toastrService.success("Succesfully removed the user on block list.");
          this.fetchBlockUserList();
        },
        (err:any)=>{
          this.toastrService.error("Failed to remove the user on block list.");
        }
      );
  }

  onClickRestrict(){
    this.userService.restrictUser({
      "restrictUserId": this.restrictUserId,
      "status":"1"
      }).subscribe(
        (success:any) =>{
          this.toastrService.success("Succesfully added the user on restrict list.");
          this.fetchRestrictUserList();
        },
        (err:any)=>{
          this.toastrService.error("Failed to add the user on restrict list.");
        }
    );
  }

  onClickUnRestrict(_id:any){
    this.userService.restrictUser({
      "restrictUserId": _id,
      "status":"0"
      }).subscribe(
        (success:any) =>{
          this.toastrService.success("Succesfully removed the user on restrict list.");
          this.fetchRestrictUserList();
        },
        (err:any)=>{
          this.toastrService.error("Failed to remove the user on restrict list.");
        }
      );
  }


  setFocus(state: boolean, idx:any){
    setTimeout(()=>{this.onFocus[idx] = state}, 500);
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
