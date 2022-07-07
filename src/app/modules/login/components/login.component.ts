import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { routers } from '../../../utils/router-navigate';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public routernavigate: routers,
    private router: Router,
    private route: ActivatedRoute,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service,
  ) {
    this.show = false;
    this.showRe = false;
  }

  ngOnInit(): void {

    let retrievedObject: any = localStorage.getItem('userData');
    if(retrievedObject){
      this.userJsonData = JSON.parse(retrievedObject);
      console.log(this.userJsonData);

      if(this.userJsonData['isPhoneNumberVerified'] === 0 || this.userJsonData['isPhoneNumberVerified'] === '0'){
        this.router.navigate([this.routernavigate.userSelection]);
      } else if(!this.userJsonData['country']){
        this.router.navigate([this.routernavigate.verifyId]);
      } else{
        this.router.navigate([this.routernavigate.home]);
      }
    }

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$/)]],
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
          localStorage.setItem('accessToken', data['accessToken']);

          this.getUser();
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
    console.log(provider);
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
        this.userService.findUserByEmailId({"email": result.user?.providerData[0]?.email}).subscribe((data: any) => {
          console.log(data);
          if (data['status'] === 201) {

            localStorage.setItem('accessToken', data['data'].access_token);
            this.getUser();

          }
          else {
            this.spinner.hide();
            this.submitted = false;
            this.toastr.error("Please sign up");
          }
        }, (error) => {
          this.spinner.hide();
          this.submitted = false;
          this.toastr.error(error['error']['message']);
        });
      })
      .catch((error) => {
        //console.log(error);
      });
  }

  getUser(){
    this.userService.currentUser().subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        console.log(data);
        localStorage.setItem('userData', JSON.stringify(data['data'].user));
        if(data['data']['user']['isPhoneNumberVerified'] === 0 || data['data']['user']['isPhoneNumberVerified'] === '0'){
          this.router.navigate([this.routernavigate.userSelection]);
        } else if(!data['data']['user']['country']){
          this.router.navigate([this.routernavigate.verifyId]);
        } else{
          localStorage.setItem('userData', JSON.stringify(data['data'].user));

        this.checkOnFirebase(
          data['data']['user']['email'],
          data['data']['user']['_id'],
          data['data']['user']['userName'],
          data['data']['user']['fullName'],
          data['data']['user']['profileImage']
        );

          this.router.navigate([this.routernavigate.home]);
        }
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

  async checkOnFirebase(emailId: any, userId: any, username: any, fullName: any, profileImage: any) {

    let token = localStorage.getItem('token');
    if (token) {
    } else {
      token = "";
    }
    // this.afs.collection('users', ref => ref.where('email', '==', emailId)).snapshotChanges().subscribe(data=> {
    let sub = this.afs.collection('users', ref => ref.where('user_id', '==', userId)).valueChanges().subscribe(data => {
      if (data.length > 0) {
        console.log(data);
        console.log("Match found.");
        this.afs
          .collection("users")
          .doc("" + userId + "").update({
            "device_token": token,
            "email": emailId,
            "user_id": userId,
            "username": username,
            "fullName": fullName,
            "profileImage": profileImage
          })
          .then(res => {
            return true;
          });
      }
      else {
        console.log("Does not exist.");
        //this.afs.collection("messages").doc(userId).valueChanges();
        this.afs
          .collection("users")
          .doc("" + userId + "").set({
            "device_token": token,
            "email": emailId,
            "user_id": userId,
            "username": username,
            "fullName": fullName,
            "profileImage": profileImage
          })
          .then(res => {
            return true;
          });
      }

      sub.unsubscribe();
    });
  }

  showPassword() {
    this.show = !this.show;
  }

}
