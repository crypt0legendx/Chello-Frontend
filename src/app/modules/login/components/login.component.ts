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
  selector: 'app-login',
  templateUrl: '../pages/login.component.html',
  styleUrls: ['../pages/login.component.scss',
]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  otpForm!: FormGroup;
  submitted: any;
  submittedOTP: any;
  countryCode: any;
  getCountryCode: any;
  phoneNumber: any;
  countryDailCode: any;
  lastPageName: any;
  socialId: any;
  accountType: any = "1";
  signUpType: any;
  show: boolean = false;
  showRe: boolean = false;
  userJsonData: any;

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
    if(retrievedObject){
      this.userJsonData = JSON.parse(retrievedObject);
      console.log(this.userJsonData);
      this.router.navigate([this.routernavigate.home]);
    }

    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get f() { return this.loginForm.controls; }

  async login() {
    let token = localStorage.getItem('token');
    if (token) {
    } else {
      token = "";
    }
    

    this.signUpType = "email";

    var loginValue = {
      "email": this.f.email.value,
      "password": this.f.password.value
    }

    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    else {
      this.spinner.show();
    
      this.authService.loginUser(loginValue).subscribe((data: any) => {
        console.log(data);
        if (data['statusCode'] === 200) {
          console.log(data);
          localStorage.setItem('accessToken', data['data'].accessToken);
          localStorage.setItem('userData', JSON.stringify(data['data'].user));

          this.router.navigate([this.routernavigate.home]);
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
  }

  // Sign in with Google
  GoogleAuth() {
    this.signUpType = "google";
    this.AuthLogin(new auth.GoogleAuthProvider())
  }

  // Sign in with Facebook
  FacebookAuth() {
    this.signUpType = "facebook";
    this.AuthLogin(new auth.FacebookAuthProvider())
  }

  // Sign in with Twitter
  TwitterAuth() {
    this.signUpType = "twitter";
    this.AuthLogin(new auth.TwitterAuthProvider())
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    this.afAuth
      .signInWithPopup(provider)
      .then((result) => {
        console.log(result.user);

        var loginValue = {
          "fullName": result.user?.providerData[0]?.displayName,
          "email": result.user?.providerData[0]?.email,
          "username": "",
          "password": "",
          "role": "normal",
          "social_id": result.user?.providerData[0]?.uid,
          "signUpType": this.signUpType,
        }

        this.spinner.show();
        this.authService.registerUser(loginValue).subscribe((data: any) => {
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
          this.toastr.error(error['error']['message']);
        });
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  showPassword() {
    this.show = !this.show;
  }

}
