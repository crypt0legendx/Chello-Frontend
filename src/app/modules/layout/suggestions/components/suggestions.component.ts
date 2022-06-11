import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../../services/profile.service';
import { PostService } from '../../../../services/post.service';
import { UserService } from '../../../../services/user.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { routers } from '../../../../utils/router-navigate';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { DomSanitizer } from '@angular/platform-browser';

declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-suggestions',
  templateUrl: '../pages/suggestions.component.html',
  styleUrls: ['../pages/suggestions.component.scss']
})
export class SuggestionsComponent implements OnInit {

  userName: any;
  profilePicture: any;
  isUserVerify: any;
  userFullName: any;
  userCoverPicture: any;
  isUserCoverPicture: boolean = false;
  userJsonData: any;
  userId: any;
  groupMembersList: any;
  groupMembersListLength: any;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private postService: PostService,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public routernavigate: routers,
    private router: Router,
    private route: ActivatedRoute,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private sanitized: DomSanitizer,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    let retrievedObject: any = localStorage.getItem('userData');
    if (retrievedObject) {
      this.userJsonData = JSON.parse(retrievedObject);
      console.log(this.userJsonData);
      console.log(localStorage.getItem('accessToken'));
      this.userName = this.userJsonData['userName'];
      this.userId = this.userJsonData['_id'];
      this.profilePicture = this.userJsonData['profileImage'];
      this.isUserVerify = this.userJsonData['profileStatus'];
      this.userFullName = this.userJsonData['fullName'];
      this.userCoverPicture = this.userJsonData['coverImage'];
      if (this.userJsonData['coverImage']) {
        this.isUserCoverPicture = true;
      } else {
        this.isUserCoverPicture = false;
      }
    }

    this.searchUser("");
  }

  searchUser(q: any) {
    var searchData = {
      "search": q
    }

    //console.log(searchData);
    this.userService.searchUser(searchData).subscribe((data: any) => {
      //console.log(data);
      if (data['statusCode'] === 200) {
        if (q != "") {
          this.groupMembersList = data['userData'];
          this.groupMembersListLength = data['userData'].length;
        } else {
          let shuffled = data['userData'].sort(() => 0.5 - Math.random());
          this.groupMembersList = shuffled.slice(0, 3);
          this.groupMembersListLength = shuffled.length;
        }
      }
      else {
      }
    }, (error) => {
    });
  }

  viewProfile(Id: any){

  }

}
