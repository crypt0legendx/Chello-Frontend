import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../../../services/group.service';
import { PostService } from '../../../services/post.service';
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

@Component({
  selector: 'app-customize-subscription',
  templateUrl: '../pages/customize-subscription.component.html',
  styleUrls: ['../pages/customize-subscription.component.scss']
})
export class CustomizeSubscriptionComponent implements OnInit {

  addSubscription: boolean = false;
  subscriptionForm!: FormGroup;
  submitted: any;
  userJsonData: any;
  userId: any;

  subscriptionPeriod: any = "1 month";
  subscriptionTier: any = "1";

  getSubscriptionList: any = [];

  editSubscriptions: boolean = false;
  editSubscriptionId: any;

  constructor(
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private uploadService: UploadService,
    private userService: UserService,
    private postService: PostService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public routernavigate: routers,
    private router: Router,
    private route: ActivatedRoute,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
  ) { }

  ngOnInit(): void {
    let retrievedObject: any = localStorage.getItem('userData');
    if (retrievedObject) {
      this.userJsonData = JSON.parse(retrievedObject);
      this.userId = this.userJsonData['_id'];
      console.log(this.userJsonData);
    }

    this.subscriptionForm = this.formBuilder.group({
      subscriptionFee: ['', Validators.required],
      subscriptionDesc: ['', Validators.required]
    });

    this.getSubscription();
  }

  get f() { return this.subscriptionForm.controls; }

  addAnotherSubscription() {
    this.addSubscription = true;
  }

  getSubscription() {
    this.spinner.show();

    this.userService.getSubscription().subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        this.getSubscriptionList = data['Subscripton'];
        this.spinner.hide();
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

  createSubscription() {
    if(this.editSubscriptions === false) {
      var subscriptionData = {
        "title": this.f.subscriptionDesc.value,
        "period": this.subscriptionPeriod,
        "price": this.f.subscriptionFee.value,
        "description": "",
        "tier": this.subscriptionTier
      }
  
      console.log(subscriptionData);
  
      this.submitted = true;
      if (this.subscriptionForm.invalid) {
        return;
      }
      else {
        this.spinner.show();
  
        this.userService.addSubscription(subscriptionData).subscribe((data: any) => {
          console.log(data);
          if (data['statusCode'] === 200) {
            this.subscriptionForm.reset();
            this.addSubscription = false;
            this.getSubscription();
            this.spinner.hide();
            this.submitted = false;
            this.toastr.success(data['message']);
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
    } else {
      var subscriptionDatas = {
        "title": this.f.subscriptionDesc.value,
        "period": this.subscriptionPeriod,
        "price": this.f.subscriptionFee.value,
        "description": "",
        "tier": this.subscriptionTier,
        "sub_id": this.editSubscriptionId
      }
  
      console.log(subscriptionDatas);
  
      this.submitted = true;
      if (this.subscriptionForm.invalid) {
        return;
      }
      else {
        this.spinner.show();
  
        this.userService.editSubscription(subscriptionDatas).subscribe((data: any) => {
          console.log(data);
          if (data['statusCode'] === 200) {
            this.subscriptionForm.reset();
            this.addSubscription = false;
            this.editSubscriptions = false;
            this.editSubscriptionId = "";
            this.getSubscription();
            this.spinner.hide();
            this.submitted = false;
            this.toastr.success(data['message']);
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

  changeSubscriptionPeriod(val: any) {
    this.subscriptionPeriod = val;
  }

  changeSubscriptionTier(val: any) {
    this.subscriptionTier = val;
  }

  deleteSubscription(id: any) {
    this.spinner.show();
    console.log({ "_id": id });
    this.userService.deleteSubscription({ "_id": id }).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        this.getSubscription();
        this.spinner.hide();
        this.toastr.success(data['message']);
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

  editSubscription(subscriptionData: any){
    this.editSubscriptions = true;
    this.editSubscriptionId = subscriptionData['_id'];
    let fees = subscriptionData['price'];
    if(fees.charAt(0) != '$'){
      fees = '$'+fees;
    }
    this.subscriptionForm.controls.subscriptionFee.setValue(fees);
    this.subscriptionForm.controls.subscriptionDesc.setValue(subscriptionData['title']);
    this.subscriptionPeriod = subscriptionData['period'];
    this.subscriptionTier = subscriptionData['tier'];

    this.addSubscription = true;
  }

  checkUSDSymbol(fees: any){
    if(fees.charAt(0) != '$'){
      return '$'+fees;
    }

    return fees;
  }
}
