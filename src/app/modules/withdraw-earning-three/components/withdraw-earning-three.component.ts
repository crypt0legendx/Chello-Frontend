import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/profile.service';
import { UploadService } from '../../../services/upload.service';
import { Router, ActivatedRoute } from '@angular/router';
import { routers } from '../../../utils/router-navigate';
import { UserService } from '../../../services/user.service';
import { NgxSpinnerService } from "ngx-spinner";
import { baseurl } from '../../../utils/base-url';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-withdraw-earning-three',
  templateUrl: '../pages/withdraw-earning-three.component.html',
  styleUrls: ['../pages/withdraw-earning-three.component.scss']
})
export class WithdrawEarningThreeComponent implements OnInit {

  userJsonData: any;
  bankDetail: any = {};
  bankDetailForm!: FormGroup;

  displayName: any;
  username: any;
  totalPosts: any;
  termCondition: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    // private uploadService: UploadService,
    private userService: UserService,
    public baseurl: baseurl,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public routernavigate: routers,
    private router: Router,
  ) { }

  ngOnInit(): void {

    let retrievedObject: any = localStorage.getItem('userData');
    if (retrievedObject) {
      this.userJsonData = JSON.parse(retrievedObject);
    } else {
      this.router.navigate([this.routernavigate.login]);
    }
    this.getUser();
    this.displayName = this.userJsonData['fullName'];
    this.username = this.userJsonData['userName'];

    this.bankDetailForm = this.formBuilder.group({
      routingNumber: ['', Validators.required],
      accountNumber: ['', Validators.required],
      bankType: ['', Validators.required],
      country: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      businessName: [''],
      email: ['', Validators.required],
      termCondition: ['', Validators.required] 
    });

  }

  getUser(){
    this.userService.currentUser().subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        this.totalPosts = data['data']['user']['posts'].length;
      }
      else {
        this.spinner.hide();
        this.toastr.error(data['message']);
      }
    }, (error) => {
      this.spinner.hide();
      this.toastr.error(error['error']['message']);
    });
  }

  add_Bank() {
    if(this.bankDetailForm.invalid) {
      return;
    }
    else {
      this.bankDetail.routing_number = this.bankDetailForm.controls.routingNumber.value;
      this.bankDetail.account_number = this.bankDetailForm.controls.accountNumber.value;
      this.bankDetail.type_of_bank_account = this.bankDetailForm.controls.bankType.value;
      this.bankDetail.country = this.bankDetailForm.controls.country.value;
      this.bankDetail.first_name = this.bankDetailForm.controls.firstName.value;
      this.bankDetail.last_name = this.bankDetailForm.controls.lastName.value;
      this.bankDetail.business_name = this.bankDetailForm.controls.businessName.value;
      this.bankDetail.email = this.bankDetailForm.controls.email.value;
    }

    console.log("BankDetail", this.bankDetail)
    this.profileService.addBank(this.bankDetail).subscribe((data: any) => {
      this.toastr.success("successfully added");
    }, (error) => {
      this.toastr.error(error['error']['message']);
    });
    console.log(this.getBankDetail());  
  }

  getBankDetail(){
    this.profileService.getBankDetail().subscribe((data: any)=>{
      console.log("BankDetailssss", data);
    }, (error)=>{
      this.toastr.error(error['error']['message']);
    })
  }

}
