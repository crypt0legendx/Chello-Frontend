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
  selector: 'app-withdraw-earning-two',
  templateUrl: '../pages/withdraw-earning-two.component.html',
  styleUrls: ['../pages/withdraw-earning-two.component.scss']
})
export class WithdrawEarningTwoComponent implements OnInit {
  userJsonData: any;
  cardDetail: any = {};
  cardDetailForm!: FormGroup;

  displayName: any;
  username: any;
  totalPosts: any;
  termCondition: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
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

    this.cardDetailForm = this.formBuilder.group({
      cardName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      exploration_m: ['', Validators.required],
      exploration_y: ['', Validators.required],
      cvc: ['', Validators.required],
      country: ['', Validators.required],
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

  add_Card() {
    if(this.cardDetailForm.invalid) {
      return;
    }
    else {
      this.cardDetail.name_on_card = this.cardDetailForm.controls.cardName.value;
      this.cardDetail.card_number = this.cardDetailForm.controls.cardNumber.value;
      this.cardDetail.expire_date = this.setExpireDate();
      this.cardDetail.country = this.cardDetailForm.controls.country.value;
      this.cardDetail.cvc = this.cardDetailForm.controls.cvc.value;
      // this.cardDetail.email = this.cardDetailForm.controls.email.value;
    }

    console.log("cardDetail", this.cardDetail)
    this.profileService.addCard(this.cardDetail).subscribe((data: any) => {
      this.toastr.success("successfully added");
    }, (error) => {
      this.toastr.error(error['error']['message']);
    });
    console.log(this.getCardDetail());  
  }

  getCardDetail(){
    this.profileService.getCardDetail().subscribe((data: any)=>{
      console.log("cardDetailssss", data);
    }, (error)=>{
      this.toastr.error(error['error']['message']);
    })
  }

  setExpireDate() {
    let year = this.cardDetailForm.controls.exploration_y.value;
    let month = this.cardDetailForm.controls.exploration_m.value;
    if(month > 12) {
      return;
    }
    if (month!=2) {
      var day = "27";
    } else {
      var day = "30";
    }

    var string = month + "/" + day + "/" + year;
    const date = new Date(string);
    return date.toISOString();
  }
  

}
