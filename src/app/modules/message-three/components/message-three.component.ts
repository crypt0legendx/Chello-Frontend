import { devOnlyGuardedExpression } from "@angular/compiler";
import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Component({
  selector: "app-message-three",
  templateUrl: "../pages/message-three.component.html",
  styleUrls: ["../pages/message-three.component.scss"],
})
export class MessageThreeComponent implements OnInit {
  @Input() selectedUsers: any = [];

  userJsonData: any;
  userId: any;
  inputMessage: any;
  chatArray: any = [];
  id: any;
  @Output() crossButtonEvent = new EventEmitter();
  @Output() childButtonEvent = new EventEmitter();

  constructor(public afs: AngularFirestore) {}

  ngOnInit(): void {
    let retrievedObject: any = localStorage.getItem("userData");
    if (retrievedObject) {
      this.userJsonData = JSON.parse(retrievedObject);
      this.userId = this.userJsonData["_id"];
    }
    this.userJsonData = JSON.parse(retrievedObject);
    }
   
  deleteUser(user_id: any) {
    this.selectedUsers = this.selectedUsers.filter(
      (element: any) => element.user_id !== user_id
    );
    this.crossButtonEvent.emit(this.selectedUsers.length);
  }

  sendChat() {
    if(this.inputMessage.trim()){
    const queryChat = this.afs.collection("chats").ref.where("users", "array-contains", this.userId);
    queryChat.get().then((data) => {
      this.chatArray = [];
      data.forEach((element) => {
      this.chatArray.push(element.data());
      });
      this.selectedUsers.forEach(async (el: any) => {
        let checkExist = false;
        let index = 0

        for (let i =0; i < this.chatArray.length; i++) {
          checkExist = this.chatArray[i].users.includes(el.user_id);
          if(checkExist){
            index = i
            break;
          }
        }
        let obj = this.chatArray[index]
        
        if(checkExist) {
          const resp = await this.afs.collection("chats").doc(obj.chatId).collection("messages").add({
            message: this.inputMessage,
            });
          await this.afs.collection("chats").doc(obj.chatId).collection("messages").doc(resp.id).update({
            messageId: resp.id,
            messageBy: {
              name: this.userJsonData.fullName,
              userId: this.userId
            },
            messageTo: {
              name: el.fullName,
              user_id: el.user_id
            }
          });
          await this.afs.collection("chats").doc(obj.chatId).update({
            lastMessage: this.inputMessage,
            lastMessageSent: new Date()
          });
        }
        else {
        const addresp = await this.afs.collection("chats").add({
          created: new Date(),
          users: [this.userId, el.user_id],
          lastMessageSent: new Date()
        });
        await this.afs.collection("chats").doc(addresp.id).update({
          chatId: addresp.id,
          lastMessage: this.inputMessage,
        });

        const resp = await this.afs.collection("chats").doc(addresp.id).collection("messages").add({
          message: this.inputMessage,
          });
        await this.afs.collection("chats").doc(addresp.id).collection("messages").doc(resp.id).update({
          messageId: resp.id,
          messageBy: {
            name: this.userJsonData.fullName,
            userId: this.userId
          },
          messageTo: {
            name: el.fullName,
            user_id: el.user_id
          }
        });
        }
      });
      // this.inputMessage = " ";
      // setTimeout(() => {
        this.childButtonEvent.emit();
      // }, 2000);
      
    });
    }
  }
}
