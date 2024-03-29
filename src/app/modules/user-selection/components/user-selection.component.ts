import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/profile.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { routers } from '../../../utils/router-navigate';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import countryCode from '../../../utils/country-code.json';
import { getAuth, RecaptchaVerifier } from "firebase/auth";
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import { UserService } from '../../../services/user.service';

declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-user-selection',
  templateUrl: '../pages/user-selection.component.html',
  styleUrls: ['../pages/user-selection.component.scss']
})
export class UserSelectionComponent implements OnInit {

  registerForm!: FormGroup;
  registerForm2!: FormGroup;
  otpForm!: FormGroup;
  submitted: any;
  submitted2: any;
  submittedOTP: any;
  countryCode: any;
  getCountryCode: any;
  phoneNumber: any;
  countryDailCode: any;
  lastPageName: any;
  socialId: any = "";
  accountType: any = "1";
  signUpType: any;
  show: boolean = false;
  showRe: boolean = false;
  userJsonData: any;

  signupStep: number = 1;
  userRole: any = "creator";

  countryCodeList: any = countryCode;
  code: any = "+1";

  separateDialCode = true;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
	preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];

  interestArray: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public routernavigate: routers,
    private router: Router,
    private route: ActivatedRoute,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private userService: UserService
  ) {
    this.show = false;
    this.showRe = false;
    this.spinner.hide();
  }

  ngOnInit(): void {
    this.registerForm2 = this.formBuilder.group({
      phoneNumber: [undefined, [Validators.required]]
    });

    this.getCurrentUser();
  }

  get rf2Validation() { return this.registerForm2.controls; }

  async register() {
    this.submitted2 = true;

    console.log(this.registerForm2.controls['phoneNumber'].value);
    console.log(this.registerForm2.invalid);

    if (this.registerForm2.invalid) {
      return;
    }
    else {
      var registerValue = {
        "phoneNumber": this.rf2Validation.phoneNumber.value['e164Number'],
        "isPhoneNumberVerified": 1,
        "role": this.userRole,
        "interests": this.interestArray
      }

      console.log(registerValue);

      this.spinner.show();
      this.profileService.editProfile(registerValue).subscribe((data: any) => {
        console.log(data);
        if (data['statusCode'] === 200) {
          localStorage.setItem('userData', JSON.stringify(data['data']));
          if(this.userRole === "creator") {
            this.router.navigate([this.routernavigate.verifyId]);
          } else{
            this.router.navigate([this.routernavigate.home]);
          }
        }
        else {
          this.spinner.hide();
          this.submitted2 = false;
          this.toastr.error(data['message']);
        }
      }, (error) => {
        this.spinner.hide();
        this.submitted2 = false;
        this.toastr.error(error['error']['message']);
      });
    }
  }

  selectCountryCode(code: any) {
    console.log(code.value);
    this.code = code.value;
  }

  roleSection(type: any) {
    if (type === 'creator') {
      this.userRole = "creator";
      document.getElementById("roleCreator")!.classList.add('active');
      document.getElementById("roleFan")!.classList.remove('active');
      document.getElementById("roleUser")!.classList.remove('active');
    } else if(type === 'fan') {
      this.userRole = "fan";
      document.getElementById("roleFan")!.classList.add('active');
      document.getElementById("roleCreator")!.classList.remove('active');
      document.getElementById("roleUser")!.classList.remove('active');
    } else {
      this.userRole = "user";
      document.getElementById("roleUser")!.classList.add('active');
      document.getElementById("roleCreator")!.classList.remove('active');
      document.getElementById("roleFan")!.classList.remove('active');
    }
  }

  addInterest(interest: any){
    if(this.interestArray.includes(interest)) {
      this.interestArray.splice(this.interestArray.indexOf(interest), 1);
    } else {
      this.interestArray.push(interest);
    }

    console.log(this.interestArray);
  }

  getCurrentUser() {
    let token: any = localStorage.getItem('accessToken');
    console.log(token)
    this.userService.currentUser().subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
      }
    }, (error) => {
      console.error(error);
    });
  }

}
