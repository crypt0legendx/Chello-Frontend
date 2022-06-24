import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { routers } from '../../../utils/router-navigate';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-sign-up',
  templateUrl: '../pages/sign-up.component.html',
  styleUrls: ['../pages/sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  registerForm!: FormGroup;
  otpForm!: FormGroup;
  submitted: any;
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
  userRole: any = "creator";

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public routernavigate: routers,
    private router: Router,
    private route: ActivatedRoute,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
  ) {
    this.show = false;
    this.showRe = false;
  }

  ngOnInit(): void {
    let retrievedObject: any = localStorage.getItem('userData');
    if (retrievedObject) {
      this.userJsonData = JSON.parse(retrievedObject);
      console.log(this.userJsonData);
      this.router.navigate([this.routernavigate.home]);
    }

    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      cPassword: ['', Validators.required]
    });
  }

  get f() { return this.registerForm.controls; }

  async register() {
    let token = localStorage.getItem('token');
    if (token) {
    } else {
      token = "";
    }

    this.signUpType = "email";

    var registerValue = {
      "fullName": this.f.fullName.value,
      "email": this.f.email.value,
      "userName": this.f.userName.value,
      "password": this.f.password.value,
      "role": this.userRole,
      "socialId": this.socialId,
      "signUpType": this.signUpType,
    }

    console.log(registerValue);

    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    else {
      if (this.f.password.value === this.f.cPassword.value) {
        this.spinner.show();
        this.authService.registerUser(registerValue).subscribe((data: any) => {
          console.log(data);
          if (data['statusCode'] === 200) {
            console.log(data);
            localStorage.setItem('accessToken', data['data'].accessToken);
            localStorage.setItem('userData', JSON.stringify(data['data'].user));

            this.router.navigate([this.routernavigate.userSelection]);
          }
          else {
            this.spinner.hide();
            this.submitted = false;
            this.toastr.error(data['message']);
          }
        }, (error) => {
          this.spinner.hide();
          this.submitted = false;
          this.toastr.error(error['error']['message']);
        });
      }
      else {
        this.spinner.hide();
        this.submitted = false;
        console.log("wrong");
        this.toastr.error("Your passwords do not match. Please type carefully.");
      }
    }
  }

  // Sign in with Google
  GoogleAuth() {
    this.signUpType = "google";
    return this.AuthLogin(new auth.GoogleAuthProvider())
  }

  // Sign in with Facebook
  FacebookAuth() {
    this.signUpType = "facebook";
    return this.AuthLogin(new auth.FacebookAuthProvider())
  }

  // Sign in with Twitter
  TwitterAuth() {
    this.signUpType = "twitter";
    return this.AuthLogin(new auth.TwitterAuthProvider())
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    let password = this.generatePassword();
    this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result.user);

        var registerValue = {
          "fullName": result.user?.providerData[0]?.displayName,
          "email": result.user?.providerData[0]?.email,
          "username": "",
          "password": password,
          "role": "normal",
          "social_id": result.user?.providerData[0]?.uid,
          "signUpType": this.signUpType,
        }

        this.spinner.show();
        this.authService.registerUser(registerValue).subscribe((data: any) => {
          console.log(data);
          if (data['status'] === 201) {

            // localStorage.setItem('accessToken', data['data'].access_token);
            // console.log(localStorage.getItem('accessToken'));
            // localStorage.setItem('userData', JSON.stringify(data['data']['user']));
            // var retrievedObject = localStorage.getItem('userData');

          }
          else {
            this.spinner.hide();
            this.submitted = false;
            this.toastr.error(data['message']);
          }
        }, (error) => {
          this.spinner.hide();
          this.submitted = false;
          this.toastr.error(error['message']);
        });
      })
      .catch((error) => {
        //console.log(error);
      });
  }

  showPassword() {
    console.log("first time: " + this.show);
    this.show = !this.show;
    console.log("second time: " + this.show);
  }

  showRePassword() {
    console.log("Re Pass");
    this.showRe = !this.showRe;
  }

  roleSection(type: any) {
    if (type === 'creator') {
      this.userRole = "creator";
      document.getElementById("roleCreator")!.classList.add('active');
      document.getElementById("roleFan")!.classList.remove('active');
    } else {
      this.userRole = "fan";
      document.getElementById("roleFan")!.classList.add('active');
      document.getElementById("roleCreator")!.classList.remove('active');
    }
  }

  generatePassword() {
    var length = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }
}
