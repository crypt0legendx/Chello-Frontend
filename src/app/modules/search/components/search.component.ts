import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/profile.service';
import { PostService } from '../../../services/post.service';
import { UserService } from '../../../services/user.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { routers } from '../../../utils/router-navigate';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-search',
  templateUrl: '../pages/search.component.html',
  styleUrls: ['../pages/search.component.scss']
})
export class SearchComponent implements OnInit {

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

  searchQuery: any = "";

  searchTxt: any = "";
  searchForm!: FormGroup;
  submitted: any;

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

    this.searchForm = this.formBuilder.group({
      search: ['']
    });

    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'];
      this.searchForm.controls.search.setValue(this.searchQuery);
      this.searchUser(this.searchQuery);
    });
  }

  get f() { return this.searchForm.controls; }

  search(){
    if(this.f.search.value){
      this.searchUser(this.f.search.value);
    }
  }

  searchUser(q: any) {
    this.spinner.show();
    var searchData = {
      "search": q
    }

    //console.log(searchData);
    this.userService.searchUser(searchData).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        this.groupMembersList = data['userData'];
        this.groupMembersListLength = data['userData'].length;
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.toastr.error(data['message']);
      }
    }, (error) => {
      console.log(error);
      this.spinner.hide();
      this.toastr.error(error['error']['message']);
    });
  }

  viewProfile(userName: any){
    this.router.navigate([userName]);
  }
}
