import { Component, ChangeDetectorRef, OnInit, Input } from '@angular/core';
import { ListService } from '../../../services/list.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { PostService } from '../../../services/post.service';
import { GroupService } from '../../../services/group.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { routers } from '../../../utils/router-navigate';
import { first, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { $$iterator } from 'rxjs/internal/symbol/iterator';


declare var $: any;

@Component({
  selector: 'app-list-two',
  templateUrl: '../pages/list-two.component.html',
  styleUrls: ['../pages/list-two.component.scss']
})

export class ListTwoComponent implements OnInit {

  totalPosts: any;
  @Input() userPosts: any;

  userJsonData: any;
  userPhotos: any;
  userVideos: any;
  userAudios: any;
  userVault: any;

  userId: any;
  userName: any;
  profilePicture: any;
  isUserVerify: any;
  userFullName: any;
  userCoverPicture: any;
  isUserCoverPicture: boolean = false;


  page: number = 0;
  user_id: string = '';
  added_user: string = '';
  edit_user: string = '';
  delete_user: string = '';
  list_id: any;
  listDetail: any = [];
  listMemberData: any;



  constructor (
    private listService : ListService,
    private postService: PostService,
    private groupService: GroupService,
    private spinner : NgxSpinnerService,
    private toastr : ToastrService,
    public routernavigate: routers,
    private router: Router,
    private route: ActivatedRoute,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.getList();
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

    console.log("Image", this.profilePicture)

    var cityName = 'tab' + Number(0);
    console.log('CityName : ', cityName);
    var i, tabcontents, tablinks;

    tabcontents = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontents.length; i++) {
      const tabcontent = tabcontents[i] as HTMLElement;
      tabcontent.style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    var city = document.getElementById(cityName) as HTMLElement;
      // city.style.display = "block";

      tabcontents = document.getElementsByClassName("tabcontent")[0];
      tabcontents.className += " active";
  }

  getAllFeeds() {
    this.spinner.show();
    var pagination = {
      "pageNumber": this.page
    }

    this.postService.getGlobalFeed(pagination).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {
        if (data['postData'].length) {
          if (this.page === 0) {
            this.totalPosts = data['postData'].length;
            this.userPosts = data['postData'];
            this.cdr.detectChanges();
            console.log(this.userPosts);
          } else {
            this.userPosts = [...this.userPosts, ...data['postData']];
            this.totalPosts = data['postData'].length;
          }
        } else {
          this.totalPosts = data['postData'].length;
        }
        this.spinner.hide();
      }
      else {
        this.spinner.hide();
        this.toastr.error(data['message']);
      }
    }, (error) => {
      this.spinner.hide();
      console.log(error['error']['message']);
      this.toastr.error(error['error']['message']);
    });
  }


  favoritePost(Id: any, postId: any, status: any) {
    console.log(Id);
    console.log(status);
    const myElement = document.getElementById(Id)!;
    console.log(myElement.className);

    this.spinner.show();
    let className = document.getElementById(Id)!.className;

    if (className === "favorite") {
      status = 1;
    }
    else {
      status = 0;
    }

    let postValue = {
      "groupid": postId,
      "status": status
    }

    console.log(postValue);

    this.groupService.postFavorite(postValue).subscribe((data: any) => {
      console.log(data);
      if (data['statusCode'] === 200) {

        if (className === "favorite") {
          document.getElementById(Id)!.classList.add('active');
        }
        else {
          document.getElementById(Id)!.classList.remove('active');
        }

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

  addList(user_name: any) {
    this.closeCreateListModal();
    this.listService.addList(user_name).subscribe((data: any) => {
      console.log("List added", data)
      this.userPosts=data.ListData;
    }, (error) => {
      this.toastr.error(error['error']['message']);
    })
    this.getList();
    console.log("User Json Data : ",this.userPosts)
  }

  updateList(head: any) {
    this.closeEditListModal();
    let user_id=$('#list_id').val();
    let title=head;
    this.listService.updateList(user_id, title).subscribe((data: any) => {
      this.toastr.success("successfully Edited")
    }, (error) => {
      this.toastr.error(error['error']['message']);
    })
    this.getList();
  }

  removeList() {
    this.closeDeleteListModal();    
    let user_id = $('#delete_id').val()
    this.listService.removeList(user_id).subscribe((data: any) => {
      this.toastr.success("successfully deleted")
    }, (error) => {
      this.toastr.error(error['error']['message']);
    })
    this.getList();
  }

  getList() {
    this.listService.getList().subscribe((data: any) => {
      console.log("Lists : ", data);
      this.userPosts=data.ListData;
    }, (error) => {
      this.toastr.error(error['error']['message']);
    })
  }

  addMember(list_id: any, user_id: any) {
    this.listService.addMember(list_id, user_id).subscribe((data: any) => {
      this.toastr.success("successfully added");
    }, (error) => {
      this.toastr.error(error['error']['message']);
    })
  }

  removeListMember(member_id: any) {
    this.listService.removeListMember(member_id).subscribe((data: any) => {
      console.log("ListMembers : ", data);
      this.toastr.success("successfully deleted");
    }, (error) => {
      this.toastr.error(error['error']['message']);
    })
  }

  getListMember(user_id: any) {
    this.listService.getListMember(user_id).subscribe((data: any) => {
      console.log("ListMembers : ", data);
      this.listMemberData = data.listMemberData;
    }, (error) => {
      this.toastr.error(error['error']['message']);
    })
  }

  calc_id(index: any) {
    return index + 8;
  }

  openCreateListModal() {
    $('#CreateNewList').modal('show');
  }

  closeCreateListModal() {
    $('#CreateNewList').modal('hide');
  }

  openEditListModal(user_id: any) {
    $('#EditListModal').modal('show');
    this.list_id=user_id;
    console.log("List_id: ", this.list_id);
  }

  closeEditListModal() {
    $('#EditListModal').modal('hide');
  }

  openDeleteListModal(user_id: any) {
    $('#DeleteListModal').modal('show');
    this.list_id=user_id;
  }

  closeDeleteListModal() {
    $('#DeleteListModal').modal('hide');
  }

  
  fomartDate(initialDate :any) {
    let current_ms = Date.now();
    var created = new Date(initialDate).toLocaleDateString();
    const day = created.split('/');

    var yy = Number(day[2]);
    var mm = Number(day[0])-1;
    var dd = Number(day[1]);

    let created_ms = Date.UTC(yy, mm, dd);
    let date = Math.ceil((current_ms - created_ms)/(1000*3600*24));
    return date;
  }

  openTabTS(evt:any, index:number, user_id: any) {
    this.getListMember(user_id);
    var cityName = 'tab' + Number(index);
    console.log('CityName : ', cityName);
    var i, tabcontents, tablinks;

    tabcontents = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontents.length; i++) {
      const tabcontent = tabcontents[i] as HTMLElement;
      tabcontent.style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    var city = document.getElementById(cityName) as HTMLElement;
      city.style.display = "block";
      evt.currentTarget.className += " active";
  }


}