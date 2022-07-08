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

declare var swal: any;
declare var $: any;

@Component({
  selector: 'app-create-group',
  templateUrl: '../pages/create-group.component.html',
  styleUrls: ['../pages/create-group.component.scss']
})
export class CreateGroupComponent implements OnInit {

  groupForm!: FormGroup;
  submitted: any;
  userJsonData: any;
  groupProfilePicture: any = "";
  groupCoverPicture: any = "";
  selectedFiles: any = '';
  imageSrc: string = '';
  userCoverPicture: any = "https://www.oberlo.com/media/1618562694-quote8.png";

  groupMembersList: any;
  groupMembersListLength: any;
  inviteMemberArr: any = [];

  isGroupMode: any = "create";
  retrievedGroupDetails: any;
  userId: any;

  isGroupProfilePicture: boolean = false;
  isGroupCoverPicture: boolean = false;

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

    if (this.router.url === "/create-group") {
      this.groupForm = this.formBuilder.group({
        groupName: ['', Validators.required],
        groupDesc: ['', Validators.required],
        groupRules: this.formBuilder.array([this.newRule()]),
      });
      this.isGroupMode = "create";
    } else {
      this.groupForm = this.formBuilder.group({
        groupName: ['', Validators.required],
        groupDesc: ['', Validators.required],
        groupRules: this.formBuilder.array([]),
      });
      this.isGroupMode = "edit";
      this.getGroupDetails();
    }

    this.searchUser("");
  }

  groupRule(): FormArray {
    return this.groupForm.get("groupRules") as FormArray
  }

  newRule(): FormGroup {
    return this.formBuilder.group({
      rule: ''
    })
  }

  addRule() {
    this.groupRule().push(this.newRule());
  }

  removeRule(i: number) {
    this.groupRule().removeAt(i);
  }

  get f() { return this.groupForm.controls; }

  async createGroup() {
    let ruleArr = [];
    for (let i = 0; i < this.f.groupRules.value.length; i++) {
      ruleArr.push(this.f.groupRules.value[i]['rule']);
    }

    var groupData = {
      "title": this.f.groupName.value,
      "description": this.f.groupDesc.value,
      "cover_photo": this.groupCoverPicture,
      "profile_pic": this.groupProfilePicture,
      "rules": ruleArr
    }

    console.log(groupData);

    this.submitted = true;
    if (this.groupForm.invalid) {
      return;
    }
    else {
      this.spinner.show();

      this.groupService.creatGroup(groupData).subscribe((data: any) => {
        console.log(data);
        if (data['statusCode'] === 200) {
          console.log(data['data']['groupData']);
          this.sendInvitation(data['data']['groupData']._id);
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

  async openFileSelector(selectorType: any) {
    if (selectorType === "cover") {
      $("#fileCover").trigger("click");
    } else if (selectorType === "profile") {
      $("#file").trigger("click");
    }
  }

  selectProfileFile(event: any, fileType: any) {
    this.spinner.show();
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      console.log(file.name);
      let filePath = Math.random() * 10000000000000000 + '_' + file.name;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
      }
      this.selectedFiles = file;
      if (fileType === "profileImage") {
        this.uploadImage(filePath, "profileImage");
      } else if (fileType === "coverImage") {
        this.uploadImage(filePath, "coverImage");
      }
    }
  }

  async uploadImage(filePath: any, jsonKey: any) {
    const file = this.selectedFiles;
    let res: any = await this.uploadService.uploadFile(file, filePath);
    console.log(res);

    if (jsonKey === "profileImage") {
      this.groupProfilePicture = res['Location'];
      this.isGroupProfilePicture = true;
    } else if (jsonKey === "coverImage") {
      this.groupCoverPicture = res['Location'];
      this.isGroupProfilePicture = true;
      console.log(this.groupCoverPicture);
    }

    this.spinner.hide();
  }

  searchUser(q: any) {
    var searchData = {
      "search": q
    }

    console.log(searchData);
    this.userService.searchUser(searchData).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        if (q != "") {
          this.groupMembersList = data['userData'];
          this.groupMembersListLength = data['userData'].length;
        } else {
          this.groupMembersList = data['userData'].slice(0, 30);
          this.groupMembersListLength = data['userData'].length;
        }
        console.log(this.groupMembersList);
      }
      else {
      }
    }, (error) => {
    });
  }

  styleObject(Id: any): Object {
    if(Id === this.userId){
      return { display: 'none' }
    } else{
      if (this.inviteMemberArr.includes(Id) === true) {
        return { backgroundColor: '#F1F1FF' }
      }
      return {}
    }
    return {}
  }

  inviteMember(Id: any) {
    if (this.inviteMemberArr.includes(Id) === false) {
      this.inviteMemberArr.push(Id);
      let divMemberId = document.getElementById(Id)!;
      divMemberId.style.backgroundColor! = '#F1F1FF';
    } else {
      const index: number = this.inviteMemberArr.indexOf(Id);
      if (index !== -1) {
        this.inviteMemberArr.splice(index, 1);
      }
      let divMemberId = document.getElementById(Id)!;
      divMemberId.style.backgroundColor! = '';
    }
    console.log(this.inviteMemberArr);
  }

  getGroupDetails() {
    this.retrievedGroupDetails = localStorage.getItem('groupDetails');
    this.retrievedGroupDetails = JSON.parse(this.retrievedGroupDetails);
    console.log(this.retrievedGroupDetails);

    this.groupForm.controls.groupName.setValue(this.retrievedGroupDetails['title']);
    this.groupForm.controls.groupDesc.setValue(this.retrievedGroupDetails['description']);

    for (let i: number = 0; i < this.retrievedGroupDetails['rules'].length; i++) {
      this.groupRule().push(this.formBuilder.group({
        rule: this.retrievedGroupDetails['rules'][i]
      }));
    }

    this.inviteMemberArr = this.retrievedGroupDetails['memberData'];
    this.groupCoverPicture = this.retrievedGroupDetails['cover_photo'];
    this.groupProfilePicture = this.retrievedGroupDetails['profile_pic'];
  }

  async editGroup() {
    let ruleArr = [];
    for (let i = 0; i < this.f.groupRules.value.length; i++) {
      ruleArr.push(this.f.groupRules.value[i]['rule']);
    }

    var groupData = {
      "title": this.f.groupName.value,
      "description": this.f.groupDesc.value,
      "cover_photo": this.groupCoverPicture,
      "profile_pic": this.groupProfilePicture,
      "rules": ruleArr,
      "groupId": this.retrievedGroupDetails['_id']
    }

    console.log(groupData);

    this.submitted = true;
    if (this.groupForm.invalid) {
      return;
    }
    else {
      this.spinner.show();

      this.groupService.editGroup(groupData).subscribe((data: any) => {
        console.log(data);
        if (data['statusCode'] === 200) {
          console.log(data);
          this.sendInvitation(this.retrievedGroupDetails['_id']);
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

  sendInvitation(groupId: any) {
    let inviteData = {
      "invitee_id": this.userJsonData['_id'],
      "group_id": groupId,
      "member_id": this.inviteMemberArr,
      "action": "invited"
    }

    console.log(inviteData);

    this.groupService.sendInviteGroupMember(inviteData).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        console.log(data);
        this.spinner.hide();
        this.router.navigate([this.routernavigate.groupNew]);
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
