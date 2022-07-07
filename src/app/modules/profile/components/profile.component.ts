import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/profile.service';
import { UserService } from '../../../services/user.service';
import { PostService } from '../../../services/post.service';
import { ListService } from '../../../services/list.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { routers } from '../../../utils/router-navigate';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import {PostListComponent} from '../../layout/post-list/components/post-list.component';
import {ListTwoComponent} from '../../../modules/list-two/components/list-two.component';
import { SharedState } from 'src/app/sharedState/sharedState';

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

  list_name = '';
  lists: any;
  listMemberData: any;
  added_user: any;
  isCheckedState: any = [{}];


  username$ = this.route.paramMap.pipe(
    map((params: ParamMap) => {
      console.log("username: " + params.get('username'));
    })
  );

  postType: any = "all";

  isMyProfile: boolean = false;
  isLoggedUser: boolean = false;
  public postOption: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private userService: UserService,
    private postService: PostService,
    private listService: ListService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    public routernavigate: routers,
    private router: Router,
    private route: ActivatedRoute,
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    private cdr: ChangeDetectorRef,
    private sharedState:  SharedState
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.getList();
    let retrievedObject: any = localStorage.getItem('userData');
    if (retrievedObject) {
      this.userJsonData = JSON.parse(retrievedObject);
      console.log(this.userJsonData);

      if (this.route.snapshot.paramMap.get('username')) {
        if (this.route.snapshot.paramMap.get('username') === this.userJsonData['userName']) {
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
          this.getUserData();
        }
      } else {
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
      }

    } else {
      this.isLoggedUser = false;
      this.isMyProfile = false;
      //this.router.navigate([this.routernavigate.login]);
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

  getUserPost(type: any){
    this.postType = type=='all'?'':type;    
    this.sharedState.typeOfPost = this.postType;
    this.postListCamponent?.getUserFeeds(this.postType);
    this.child.show=(-1);
    this.cdr.detectChanges();
  }

  getUserData() {
    this.userService.findUserByUsername({ "search": this.route.snapshot.paramMap.get('username') }).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        this.userName = data['userData']['userName'];
        this.profilePicture = data['userData']['profileImage'];
        this.isUserVerify = data['userData']['profileStatus'];
        this.userFullName = data['userData']['fullName'];
        this.userCoverPicture = data['userData']['coverImage'];
        if (data['userData']['coverImage']) {
          this.isUserCoverPicture = true;
        } else {
          this.isUserCoverPicture = false;
        }
        this.totalPosts = data['userData']['posts'].length;
      }
      else {

      }
    }, (error) => {
      console.error(error);
    });
  }

  addList(user_name: any) {
    this.closeCreateListModal();
    this.listService.addList(user_name).subscribe((data: any) => {
      // console.log("List added", data)
      this.userPosts=data.ListData;
    }, (error) => {
      this.toastr.error(error['error']['message']);
    })
    this.getList();
    // console.log("User Json Data : ",this.userPosts)
  }

  getCurrentList(){
	
    return this.lists;
  }

  getList() {
      this.listService.getList().subscribe((data: any) => {
      // console.log("Lists : ", data);        
      const draftData:any = data.ListData;
      for(let i = 0; i<data.ListData.length; i++) {
        const memberDetailsData = data.ListData[i].memberDetails;        
        for(let j=0; j<memberDetailsData.length; j++) {
          if(memberDetailsData[j].member_id==this.userJsonData._id) {
            // this.isCheckedState.push({'list_id': memberDetailsData._id, 'checkState': true});
            // memberDetailsData.checkState = true;
            draftData[i].checkState = true;
            break;
          }
          draftData[i].checkState = false;
        }        
      }
      // console.log('this.list get list', draftData);
      this.lists = draftData;      
    }, (error) => {
      this.toastr.error(error['error']['message']);
    })
  }
  
  isChecked(list: any, user_id: any): Boolean {
    this.getListMember(list.memberDetails._id);
    console.log("checked function", this.listMemberData);
    for(let i=0; i<this.listMemberData.length; i++)
    {
      if(this.listMemberData[i].member_id==user_id)
        return true;
    }
    return false;
}

  // getCurrList(list_id) {
  //   this.current_list=this.getListMember(list_id);
  // }

  check_status(index: any, user_id: any) {
    let list_id = $('#check_'+index).val();
    // console.log($('#check_'+index).prop);
    if ($('#check_'+index).prop('checked')) {
      // console.log('add');
      
      this.addListMember(list_id, user_id);
      this.getListMember(user_id);
      this.getList();
      

    } else {
      console.log('remove');
      this.removeListMember(user_id);
      this.getListMember(user_id);
      this.getList();
    }
  
  }

  addListMember(list_id: any, user_id: any) {
    this.listService.addMember(list_id, user_id).subscribe((data: any) => {
      this.toastr.success("successfully added");
    }, (error) => {
      this.toastr.error(error['error']['message']);
    })
    this.getListMember(list_id);
  }

  removeListMember(list_id: any) {
    this.listService.removeListMember(list_id).subscribe((data: any) => {
      // console.log("ListMembers : ", data);
      this.toastr.success("successfully deleted");
    }, (error) => {
      this.toastr.error(error['error']['message']);
    })
    this.getListMember(list_id);
  }

  getListMember(user_id: any) {
    this.listService.getListMember(user_id).subscribe((data: any) => {
      // console.log("ListMembers : ", data);
      this.listMemberData = data.listMemberData;
    }, (error) => {
      this.toastr.error(error['error']['message']);
    })
  }

  openListsModal() {
    $('#listsModal').modal('show');
  }

  closeListsModal() {
    $('#listsModal').modal('hide');
  }

  openCreateListModal() {
    $('#listsModal').modal('hide');
    $('#CreateNewList').modal('show');
  }

  closeCreateListModal() {
    $('#CreateNewList').modal('hide');
  }

}
