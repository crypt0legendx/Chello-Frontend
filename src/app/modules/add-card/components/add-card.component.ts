import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/profile.service';
import { UploadService } from '../../../services/upload.service';
import { UserService } from '../../../services/user.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { routers } from '../../../utils/router-navigate';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { PostService } from '../../../services/post.service';
import { baseurl } from '../../../utils/base-url';
declare var swal: any;
declare var $: any;
@Component({
  selector: 'app-add-card',
  templateUrl: '../pages/add-card.component.html',
  styleUrls: ['../pages/add-card.component.scss']
})
export class AddCardComponent implements OnInit {
  cardList: any = [];
  bankAccountList: any = [];
  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private uploadService: UploadService,
    private postService: PostService,
    private userService: UserService,
    public baseurl: baseurl,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public routernavigate: routers,
    private router: Router,
    private route: ActivatedRoute,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
  ) { }
  ngOnInit(): void {
    this.fetchCard();
    this.fetchBankAccount();
  }

  fetchCard() {
    this.userService.fetchCard().subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        this.cardList = data['card'];
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

  fetchBankAccount() {
    this.userService.fetchBankAccount().subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        this.bankAccountList = data['bank'];
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

  deleteCard(Id: any) {
    let data = { "_id": Id };
    console.log(data);
    this.spinner.show();
    this.userService.deleteCard(data).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        this.spinner.hide();
        this.toastr.success(data['message']);
        this.fetchCard();
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

  deleteBankAccount(Id: any) {
    console.log(Id);
    this.spinner.show();
    this.userService.deleteBankAccount({ "_id": Id }).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        this.spinner.hide();
        this.toastr.success(data['message']);
        this.fetchBankAccount();
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

  replaceLastChar(number: any) {
    number = number.slice(0, -4) + "****";
    number = number.match(/.{1,4}/g);
    return number.join(' ')
  }

  connectSpotify() {
    // var url = '';
    // this.userService.connectSpotify().subscribe((data: any) => {
    //   var width = 450,
    //     height = 730,
    //     left = (screen.width / 2) - (width / 2),
    //     top = (screen.height / 2) - (height / 2);

    //   window.addEventListener("message", function (event) {
    //     var hash = JSON.parse(event.data);
    //     if (hash.type == 'access_token') {
    //     }
    //   }, false);

    //   var w = window.open(data,
    //     'Spotify',
    //     'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left
    //   );
    // }, (error) => {
    //   this.spinner.hide();
    //   this.toastr.error(error['error']['message']);
    // });
  }
}
