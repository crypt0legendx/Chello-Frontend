import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
import { PostListComponent } from '../../layout/post-list/components/post-list.component';

declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-profile',
  templateUrl: '../pages/profile.component.html',
  styleUrls: ['../pages/profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild(PostListComponent) postListCamponent: PostListComponent | undefined;
  @ViewChild(PostListComponent) child: any = PostListComponent;

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

  postType: any = "all";

  isMyProfile: boolean = false;
  isLoggedUser: boolean = false;

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
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    let retrievedObject: any = localStorage.getItem('userData');
    if (retrievedObject) {
      this.userJsonData = JSON.parse(retrievedObject);
      console.log(this.userJsonData);
      if (this.route.snapshot.paramMap.get('username') != this.userJsonData['userName']) {
        this.isLoggedUser = true;
        this.isMyProfile = true;
        this.userName = this.userJsonData['userName'];
        this.profilePicture = this.userJsonData['profileImage'];
        this.isUserVerify = this.userJsonData['profileStatus'];
        this.userFullName = this.userJsonData['fullName'];
        this.userCoverPicture = this.userJsonData['coverImage'];
        if (this.userJsonData['coverImage']) {
          this.isUserCoverPicture = true;
        } else {
          this.isUserCoverPicture = false;
        }
      } else {
        this.isMyProfile = false;
      }
    } else {
      this.isLoggedUser = false;
      this.isMyProfile = false;
    }

    this.feedForm = this.formBuilder.group({
      postTxt: ['', Validators.required]
    });

    console.log("Username: " + this.route.snapshot.paramMap.get('username'));
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

  getUserPost(type: any) {
    this.postType = type;
    this.postListCamponent?.getUserFeeds();
    this.child.show = (-1);
    this.cdr.detectChanges();
  }



}