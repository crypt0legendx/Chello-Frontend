import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/profile.service';
import { GroupService } from '../../../services/group.service';
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

declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-group-new',
  templateUrl: '../pages/group-new.component.html',
  styleUrls: ['../pages/group-new.component.scss']
})
export class GroupNewComponent implements OnInit {

  isShown: boolean = false; // hidden by default
  totalGroup: any;
  groupList: any;

  userName: any;
  profilePicture: any;
  isUserVerify: any;
  userFullName: any;
  userCoverPicture: any;
  isUserCoverPicture: boolean = false;
  userJsonData: any;
  userId: any;

  lastPostCommentId: any;
  postComment: any;
  isPostComment: boolean = false;
  pageNumber: number = 0;

  myGroups: any = [];
  joinGroups: any = [];
  pendingGroups: any = [];
  globalGroups: any = [];
  totalJoinGroups: any = 0;
  totalMyGroups: any = 0;
  totalGlobalGroups: any = 0;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private groupService: GroupService,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public routernavigate: routers,
    private router: Router,
    private route: ActivatedRoute,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private sanitized: DomSanitizer
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
    //this.getGroup();
    this.getGroupJoinRequest();
    this.getMyGroupAndJoined();
    this.getGlobalGroup();
  }

  getGroupJoinRequest() {
    this.spinner.show();

    this.groupService.getGroupJoinRequest().subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {

        this.totalJoinGroups = data['groupJoinData'].length;
        this.joinGroups = data['groupJoinData'];

        this.spinner.hide();
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

  getMyGroupAndJoined() {
    this.spinner.show();

    this.groupService.getMyGroupAndJoined().subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {

        this.myGroups = [...data['myGroupData'], ...data['groupDataJoined']];
        this.totalMyGroups = this.myGroups.length;
        console.log(this.myGroups);

        this.spinner.hide();
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

  getGlobalGroup() {
    this.spinner.show();

    this.groupService.getGlobalGroup().subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {

        this.totalGlobalGroups = data['groupData'].length;
        this.globalGroups = data['groupData'];

        this.spinner.hide();
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

  joinGroup(groupData: any, status: any) {
    console.log(groupData);
    this.spinner.show();
    let inviteData = {
      "invitee_id": this.userId,
      "group_id": groupData['_id'],
      "member_id": [
        this.userId
      ],
      "action": status
    }

    this.groupService.inviteActionByMember(inviteData).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        this.getGroupJoinRequest();
        this.getMyGroupAndJoined();
        this.getGlobalGroup();
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

  requestToJoinGroup(groupData: any, status: any){
    this.spinner.show();
    let inviteData = {
      "invitee_id": this.userId,
      "group_id": groupData['_id'],
      "member_id": [
        this.userId
      ],
      "action": status
    }

    console.log(inviteData);

    this.groupService.sendInviteGroupMember(inviteData).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        this.getGroupJoinRequest();
        this.getMyGroupAndJoined();
        this.getGlobalGroup();
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

  visitGroup(groupData: any) {
    localStorage.setItem('groupDetails', JSON.stringify(groupData));
    this.router.navigate([this.routernavigate.groupDetailNew]);
  }

  styleObject(memberArr: any): Object {
    let userId = this.userId;
    console.log(memberArr.some(function (el: any) { return el.invitee_id === userId }));

    if (memberArr.some(function (el: any) { return el.member_id === userId }) === true) {
      if (memberArr.some(function (el: any) { return el.status === "accepted" }) === true) {
        return {}
      } else {
        return { display: 'none' }
      }
    } else {
      return { display: 'none' }
    }
  }

}
