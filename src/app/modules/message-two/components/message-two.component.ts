import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { filter } from 'rxjs-compat/operator/filter';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-message-two',
  templateUrl: '../pages/message-two.component.html',
  styleUrls: ['../pages/message-two.component.scss']
})
export class MessageTwoComponent implements OnInit {

  checkedList: any = [];
  userList: any = [];
  userId: any;

  showMessageThree: boolean = false;
  @Output() childButtonEvent = new EventEmitter();

  constructor(
    public afs: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.userList.forEach((el:any) => {
      el['checkBox'] = false
    });
    this.getUserList();
    let retrievedObject: any = localStorage.getItem('userData');
    this.userId =JSON.parse(retrievedObject)['_id'];
    
  }

  receivedMessageHandler(length: number) {
    if(!length){
      this.showMessageThree = false;
    }
  }

  messageSent() {
    this.childButtonEvent.emit();
  }

  messageThree(){
    this.showMessageThree = true;
     this.checkedList = this.userList.filter((el:any) => el.checkBox)
  }

  select(e: any){
    if(e.target.checked == true){
      this.userList.forEach((el:any) => {
        el.checkBox = true
      });
    }
    else{
      this.userList.forEach((el:any) => {
        el.checkBox = false
      });
    }
  }

  onSelect(param: any){
    this.checkedList = this.userList.forEach((el:any) => {
      if(param.user_id === el.user_id) {
        el.checkBox = !el.checkBox
      }
    });
    }

    getUserList() {
      let filteredArray: any = []
      this.afs.collection("users").get().subscribe((ss) => {
      ss.docs.forEach((doc) => {
        filteredArray.push(doc.data());
      });
      this.userList = filteredArray.filter((el: any)=> el.user_id !== this.userId )
    });
   }

}
