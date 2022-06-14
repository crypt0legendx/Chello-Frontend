import { FormGroup } from '@angular/forms';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tips',
  templateUrl: '../pages/tips.component.html',
  styleUrls: ['../pages/tips.component.scss']
})
export class TipsComponent implements OnInit {

  groupForm!: FormGroup;
  
  isDarkMode: any;
  isLightMode: any;

  groupMembersList: any;
  groupMembersListLength: any;

  onFocus: boolean = false;
  receptionist: any;

  //information for payment.
  /**
   * Paxum API
   * URL: https://secure.paxum.com/payment/api/paymentAPI.php 
   * requestMethod: POST
   * Params: method=transferFunds&fromEmail=payer%40domain.com&toEmail=payee%40domain.com&amount=20.00&currency=USD&firstName=fistName&lastName=lastName&businessName=businessName&note=transaction+note&key=1816aa07ce3b2fba46f794ab95b9699a
   */

  /**
   * Skrill API
   * URL: https://www.skrill.com/app/pay.pl
   * Transfer Prepare Request: 
   * Params: method=transferFunds&fromEmail=payer%40domain.com&toEmail=payee%40domain.com&amount=20.00&currency=USD&firstName=fistName&lastName=lastName&businessName=businessName&note=transaction+note&key=1816aa07ce3b2fba46f794ab95b9699a
   */

  serviceFees = 0.06; // 6% of serviceFees will be transfered to Chello Account!
  paymentMethod = "transferFunds";
  transferAmout = 0;
  currency = "USD";
  fromEmail = "";
  toEmail = "";
  key = "";


  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  setReceptionist(recep: any){
    console.log("dfdsfasdf");
    this.receptionist = recep;
    console.log(this.receptionist);
  }

  setFocus(state: boolean){
    setTimeout(()=>{this.onFocus = state}, 500);
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
