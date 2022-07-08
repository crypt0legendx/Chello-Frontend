import { Component, ChangeDetectorRef, OnInit, Input } from '@angular/core';
import { ListService } from '../../../services/list.service';
import { NgxSpinnerService } from "ngx-spinner";
import { ToastrService } from 'ngx-toastr';
import { PostService } from '../../../services/post.service';
import { UserService } from '../../../services/user.service';
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
  listDatas: any;

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
  listMemberData: any;
  groupMembersList: any;
  groupMembersListLength: any;
  
  receptionist: any = '';
  onFocus: boolean = false;
  current_id: any;
  current_list: any;
  current_members: any;
  current_listindex: any = 0;
  user_selected: boolean = false;


  constructor (
    private listService : ListService,
    private postService: PostService,
    private groupService: GroupService,
    private userService: UserService,
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
      this.listDatas=data.ListData;
    }, (error) => {
      this.toastr.error(error['error']['message']);
    })
    this.getList();
    console.log("List Data : ", this.listDatas)
  }

  updateList(head: any) {
    this.closeEditListModal();
    let user_id=$('#list_id').val();
    let title=head;
    this.listService.updateList(user_id, title).subscribe((data: any) => {
      this.toastr.success("successfully Edited");
      // this.getList();
    }, (error) => {
      this.toastr.error(error['error']['message']);
    })
    this.getList();
  }

  removeList() {
    this.closeDeleteListModal();    
    let user_id = $('#delete_id').val()
    this.listService.removeList(user_id).subscribe((data: any) => {
      this.toastr.success("successfully deleted");
      this.getList();
    }, (error) => {
      this.toastr.error(error['error']['message']);
    })
    this.getList();
  }

  getList(isCallbackFunc :boolean= false) {
    this.spinner.show();
    this.listService.getList().subscribe((data: any) => {
      console.log("Lists : ", data);
      this.listDatas=data.ListData;
      this.spinner.hide();
      if(isCallbackFunc)
      setTimeout(() => {
        this.getListMember(this.current_list);   
      }, 100);
        
    }, (error) => {
      this.spinner.hide();
      this.toastr.error(error['error']['message']);
    })

  }

  getCurrentList() {
    return this.listDatas;
  }

  addMember() {
    this.closeAddMemberModal();
    let user_id = this.current_id;
    let list_id = this.current_list;
    console.log("list_id", list_id, "user_id", user_id);
    this.getListMember(list_id);
    for(let i=0; i<this.listMemberData.length; i++) {
      console.log("current_id", this.current_id, "ListMemberid", this.listMemberData[i].member_id)
      if(this.listMemberData[i].member_id == this.current_id)
      {
        this.toastr.warning("already exist in this list");
        return;
      }
    }
    this.listService.addMember(list_id, user_id).subscribe((data: any) => {
      this.toastr.success("successfully added");
      this.getList(true);
         }, (error) => {
      this.toastr.error(error['error']['message']);
    })
    
    // document.getElementsByClassName("tabcontent")[this.current_listindex].className += " active"
}

  removeListMember(member_id: any) {
    this.listService.removeListMember(member_id).subscribe((data: any) => {
      console.log("ListMembers : ", data);
      this.toastr.success("successfully deleted");
    }, (error) => {
      this.toastr.error(error['error']['message']);
    })

  }

  getListMember(list_id: any) {
    this.spinner.show();
    this.listService.getListMember(list_id).subscribe((data: any) => {
      console.log("ListMembers : ", data);
      this.listMemberData = data.listMemberData;
      this.spinner.hide();
    }, (error) => {
      this.toastr.error(error['error']['message']);
      this.spinner.hide();
    })
    var x = document.getElementsByClassName("tablinks")[this.current_listindex] as HTMLElement;
    console.log("selected : ", this.current_listindex)
    x.click();
  }

  getCurrListMembers(){
    return this.listMemberData;
  }

  setReceptionist(recep: any, listMember_id: any){
    this.receptionist = recep;
    this.current_id = listMember_id;
    this.user_selected = true;
  }

  isSelected() {
    return this.user_selected;
   }

  setFocus(state: boolean){
    setTimeout(()=>{this.onFocus = state}, 500);
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
        console.log("MembersData : ",this.groupMembersList);
      }
      else {
      }
    }, (error) => {
    });
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

  openAddMemberModal() {
    $('#AddMemberModal').modal('show');
  }

  closeAddMemberModal() {
    $('#AddMemberModal').modal('hide');
    this.user_selected = false;
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

  openTabTS(evt:any, index:number, list_id: any) {
    console.log("executed", index)
    this.current_list = list_id;
    this.current_listindex = index;
    this.getListMember(list_id);

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
      console.log('last', tablinks[i].className)
    }
    var city = document.getElementById(cityName) as HTMLElement;
      city.style.display = "block";
      evt.currentTarget.className += " active";
  }


}