import { Component, OnInit, ViewChild } from '@angular/core';
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
import {GroupPostListComponent} from '../../layout/group-post-list/components/group-post-list.component';

declare var swal: any;
declare var $: any;
@Component({
  selector: 'app-group-detail-new',
  templateUrl: '../pages/group-detail-new.component.html',
  styleUrls: ['../pages/group-detail-new.component.scss']
})
export class GroupDetailNewComponent implements OnInit {
  @ViewChild(GroupPostListComponent ) groupPostListCmp: GroupPostListComponent | undefined ; 

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
  retrievedGroupDetails: any;
  totalGroupMember: any = 0;

  groupMembersList: any = [];
  groupMembersListLength: any;
  inviteMemberArr: any = [];
  invitedMemberArr: any = [];
  groupId: any;
  groupMembers: any;
  groupAdminId: any;
  groupAdminData: any = [];
  totalGroupPosts: any = 0;

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

  async ngOnInit(): Promise<void> {
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

    this.getGroupDetails();
    this.getGroupMember();
    this.findUserById();
    this.searchUser("");
  }

  getGroupDetails() {
    this.retrievedGroupDetails = localStorage.getItem('groupDetails');
    this.retrievedGroupDetails = JSON.parse(this.retrievedGroupDetails)
    this.groupId = this.retrievedGroupDetails['_id'];
    this.groupAdminId = this.retrievedGroupDetails['user'];
    this.totalGroupMember = this.retrievedGroupDetails['memberData'].length;
    for (let i = 0; i < this.retrievedGroupDetails['memberData'].length; i++) {
      this.invitedMemberArr.push(this.retrievedGroupDetails['memberData'][i]['member_id']);
    }
    console.log(this.invitedMemberArr);
    console.log(this.retrievedGroupDetails);
  }

  editGroup() {
    //{ queryParams: { status: 'false'}}
    this.router.navigate([this.routernavigate.editGroup]);
  }

  deleteGroup() {
    this.groupService.deleteGroup({ "_id": this.groupId }).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        this.spinner.hide();
        this.toastr.success(data['message']);
        this.router.navigate([this.routernavigate.groupNew]);
      }
      else {
        this.spinner.hide();
        this.toastr.error(data['message']);
      }
    }, (error) => {
      this.spinner.hide();
      console.log(error);
      this.toastr.error(error['error']['message']);
    });
  }

  searchUser(q: any) {
    var searchData = {
      "search": q
    }

    this.userService.searchUser(searchData).subscribe((data: any) => {
      console.log(data);
      this.groupMembersList = [];
      if (data['statusCode'] === 200) {
        if (q != "") {
          this.groupMembersList = data['userData'];
          this.groupMembersListLength = data['userData'].length;
        } else {
          this.groupMembersList = data['userData'].slice(0, 3);
          this.groupMembersListLength = this.groupMembersList.length;
        }
        console.log(this.groupMembersList);
      }
      else {
      }
    }, (error) => {
    });
  }

  styleObject(Id: any): Object {
    if (Id === this.userId) {
      return { display: 'none' }
    } else {
      if (this.invitedMemberArr.includes(Id) === true) {
        return { display: 'none' }
      }
      return {}
    }
    return {}
  }

  inviteMember(Id: any) {
    if (this.inviteMemberArr.includes(Id) === false) {
      this.inviteMemberArr.push(Id);
      let divMemberId = document.getElementById('gmid' + Id)!;
      divMemberId.style.backgroundColor! = '#F1F1FF';
      console.log(this.inviteMemberArr);
    } else {
      const index: number = this.inviteMemberArr.indexOf(Id);
      if (index !== -1) {
        this.inviteMemberArr.splice(index, 1);
      }
      let divMemberId = document.getElementById('gmid' + Id)!;
      divMemberId.style.backgroundColor! = '';
      console.log(this.inviteMemberArr);
    }
  }

  sendInvitation() {
    let inviteData = {
      "invitee_id": this.userJsonData['_id'],
      "group_id": this.groupId,
      "member_id": this.inviteMemberArr,
      "action": "invited"
    }

    console.log(inviteData);

    this.groupService.sendInviteGroupMember(inviteData).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        console.log(data);
        this.spinner.hide();
        this.searchUser("");
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

  getGroupMember() {
    var jsonReq = {
      "groupId": this.groupId
    }

    this.groupService.getGroupMember(jsonReq).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        this.groupMembers = data['groupMemberData'];
        console.log(this.groupMembers);
      }
      else {
      }
    }, (error) => {
    });
  }

  removeMemberFromGroup(memberId: any) {
    this.groupService.removeMemberFromGroup({
      "user_id": memberId,
      "group_id": this.groupId
    }).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        this.spinner.hide();
        this.toastr.success(data['message']);
        this.getGroupMember();
      }
      else {
        this.spinner.hide();
        this.toastr.error(data['message']);
      }
    }, (error) => {
      this.spinner.hide();
      console.log(error);
      this.toastr.error(error['error']['message']);
    });
  }

  findUserById() {
    var jsonReq = {
      "_id": this.groupAdminId
    }

    this.userService.findUserById(jsonReq).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        this.groupAdminData.push(data['userData']);
        console.log(this.groupAdminData);
      }
      else {
      }
    }, (error) => {
    });
  }

  dateFormatter(value: any) {
    if (value) {
      const seconds: any = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 29) // less than 30 seconds ago will show as 'Just now'
        return 'Just now';
      const intervals: any = {
        'year': 31536000,
        'month': 2592000,
        'week': 604800,
        'day': 86400,
        'hour': 3600,
        'minute': 60,
        'second': 1
      };
      let counter;
      for (const i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0)
          if (counter === 1) {
            return counter + ' ' + i + ' ago'; // singular (1 day ago)
          } else {
            return counter + ' ' + i + 's ago'; // plural (2 days ago)
          }
      }
    }
    return value;
  }

  numFormatter(num: any) {
    if (num > 999 && num < 1000000) {
      return (num / 1000).toFixed(1) + 'K'; // convert to K for number from > 1000 < 1 million 
    } else if (num > 1000000) {
      return (num / 1000000).toFixed(1) + 'M'; // convert to M for number from > 1 million 
    } else if (num < 900) {
      return num; // if value < 1000, nothing to do
    }
  }
}
