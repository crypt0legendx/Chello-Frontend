import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
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
  selector: 'app-forgot-password',
  templateUrl: '../pages/forgot-password.component.html',
  styleUrls: ['../pages/forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgetForm!: FormGroup;
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
  ) { }

  ngOnInit(): void {
    this.forgetForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

  get f() { return this.forgetForm.controls; }

  async forgetPasswordClick() {
    
    var forgetValue = {
      "email": this.f.email.value
    }

    this.submitted = true;
    if (this.forgetForm.invalid) {
      return;
    }
    else {
      this.spinner.show();
      this.authService.forgetPassword(forgetValue).subscribe((data: any) => {
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
    }
  }

  
}
