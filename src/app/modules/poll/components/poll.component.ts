import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/profile.service';
import { PostService } from '../../../services/post.service';
import { GroupService } from '../../../services/group.service';
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
  selector: 'app-poll',
  templateUrl: '../pages/poll.component.html',
  styleUrls: ['../pages/poll.component.scss']
})
export class PollComponent implements OnInit {

  pollForm!: FormGroup;
  submitted: any;

  userJsonData: any;
  pollDuration: any = 7;

  optionCounter: any = 2;
  isGroupPollPost: any;

  constructor(
    private formBuilder: FormBuilder,
    private profileService: ProfileService,
    private postService: PostService,
    private groupService: GroupService,
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
      console.log(localStorage.getItem('accessToken'));
    } else {
      this.router.navigate([this.routernavigate.login]);
    }

    this.route.queryParams.subscribe(params => {
      this.isGroupPollPost = params['type'];
    });

    this.pollForm = this.formBuilder.group({
      pollTitle: ['', Validators.required],
      pollOption: this.formBuilder.array([this.newPollOption(), this.newPollOption()]),
    });
  }

  pollOption(): FormArray {
    return this.pollForm.get("pollOption") as FormArray
  }

  newPollOption(): FormGroup {
    return this.formBuilder.group({
      options: ['', Validators.required] 
    })
  }

  addPollOption() {
    this.optionCounter = this.optionCounter + 1;
    this.pollOption().push(this.newPollOption());
  }

  removePollOption(i: number) {
    this.optionCounter = this.optionCounter - 1;
    this.pollOption().removeAt(i);
  }

  get f() { return this.pollForm.controls; }

  changePollDuration(data: any) {
    this.pollDuration = data;
  }

  addOption(data: any) {

  }

  async createPoll() {
    this.submitted = true;
    if (this.pollForm.invalid) {
      return;
    }
    else {
      this.spinner.show();

      let optionArr = [];
      for (let i = 0; i < this.f.pollOption.value.length; i++) {
        optionArr.push({"text": this.f.pollOption.value[i]['options']});
      }

      if(!this.isGroupPollPost){

        var jsonData = {
          "title": this.f.pollTitle.value,
          "duration": this.pollDuration,
          "pollData": optionArr,
          "type": "poll"
        }
  
        console.log(jsonData);

        this.postService.createPoll(jsonData).subscribe((data: any) => {
          console.log(data);
          if (data['statusCode'] === 200) {
            console.log(data);
            this.spinner.hide();
            this.toastr.success(data['message']);
            this.router.navigate([this.routernavigate.home]);
          }
          else {
            this.spinner.hide();
            this.submitted = false;
            this.toastr.error(data['message']);
          }
        }, (error) => {
          console.log(error);
          this.spinner.hide();
          this.submitted = false;
          this.toastr.error(error['error']['message']);
        });
      } else{
        var retrievedGroupDetails: any = localStorage.getItem('groupDetails');
        retrievedGroupDetails = JSON.parse(retrievedGroupDetails);

        var jsonDatas = {
          "group_id": retrievedGroupDetails['_id'],
          "title": this.f.pollTitle.value,
          "duration": this.pollDuration,
          "pollData": optionArr,
          "type": "poll"
        }
  
        console.log(jsonDatas);

        this.groupService.createGroupPost(jsonDatas).subscribe((data: any) => {
          console.log(data);
          if (data['statusCode'] === 200) {
            console.log(data);
            this.spinner.hide();
            this.toastr.success(data['message']);
            this.router.navigate([this.routernavigate.groupDetailNew]);
          }
          else {
            this.spinner.hide();
            this.submitted = false;
            this.toastr.error(data['message']);
          }
        }, (error) => {
          console.log(error);
          this.spinner.hide();
          this.submitted = false;
          this.toastr.error(error['error']['message']);
        });
      }
    }
  }

}
