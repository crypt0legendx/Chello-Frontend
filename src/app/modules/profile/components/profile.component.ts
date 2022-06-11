import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/profile.service';
import { PostService } from '../../../services/post.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { routers } from '../../../utils/router-navigate';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: '../pages/profile.component.html',
  styleUrls: ['../pages/profile.component.scss']
})
export class ProfileComponent implements OnInit {

  feedForm!: FormGroup;
  submitted: any;

  userJsonData: any;
  userPosts: any;
  userPhotos: any;
  userVideos: any;
  userAudios: any;
  userVault: any;

  userName: any;
  profilePicture: any;
  isUserVerify: any;
  userFullName: any;
  userCoverPicture: any;
  isUserCoverPicture: boolean = false;

  totalPosts: any;
  isPhotoPosts: any;
  isVideoPosts: any;
  isAudioPosts: any;
  isVaultPosts: any;

  pageNumber: number = 0;

  username$ = this.route.paramMap.pipe(
    map((params: ParamMap) => {
      console.log("username: " + params.get('username'));
    })
  );

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
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
      console.log(this.userJsonData);
      this.userName = this.userJsonData['userName'];
      this.profilePicture = this.userJsonData['profileImage'];
      this.isUserVerify = this.userJsonData['profileStatus'];
      this.userFullName = this.userJsonData['fullName'];
      this.userCoverPicture = this.userJsonData['coverImage'];
      if(this.userJsonData['coverImage']){
        this.isUserCoverPicture = true;
      } else {
        this.isUserCoverPicture = false;
      }
    } else {
      //this.router.navigate([this.routernavigate.login]);
    }

    this.feedForm = this.formBuilder.group({
      postTxt: ['', Validators.required]
    });

    console.log("Username: " + this.route.snapshot.paramMap.get('username'));

    this.getUserFeeds();
  }

  get f() { return this.feedForm.controls; }

  async postFeed() {
    let accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);

    var postData = {
      "title": this.f.postTxt.value,
      "type": "text",
      "fileName": "",
      "thumbnail": ""
    }

    console.log(postData);

    this.submitted = true;
    if (this.feedForm.invalid) {
      return;
    }
    else {
      this.spinner.show();
      this.postService.postFeed(postData).subscribe((data: any) => {
        console.log(data);
        if (data['message'] === "Login successfull") {

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
    }
  }

  getUserFeeds() {
    this.spinner.show();
    this.postService.getUserFeed({"pageNumber": this.pageNumber}).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        this.totalPosts = data['postData'].length;
        this.userPosts = data['postData'];

        this.userPhotos = data['postData'].filter((res: { [x: string]: string; }) => {
          return res['type'] == "image";
        });
        this.isPhotoPosts = this.userPhotos.length;

        this.userVideos = data['postData'].filter((res: { [x: string]: string; }) => {
          return res['type'] == "video";
        });
        this.isVideoPosts = this.userVideos.length;

        this.userAudios = data['postData'].filter((res: { [x: string]: string; }) => {
          return res['type'] == "audio";
        });
        this.isAudioPosts = this.userAudios.length;

        console.log(this.isVideoPosts);

        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.toastr.error(data['message']);
      }
    }, (error) => {
      this.spinner.hide();
      this.toastr.error(error['message']);
    });
  }

}
