import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs/Rx";
import { WebsocketService } from "./websocket.service";
import { baseurl } from '../utils/base-url';

export interface Message {
  author: string;
  message: string;
}

export interface Comment {
  command: string;
  identifier: Object;
  data: Object;
}

export interface ConnectComment {
  command: string;
  identifier: Object;
}

export interface unsubscribeComment {
  command: string;
  identifier: Object;
}

@Injectable()

export class CommentService {

  public messages: Subject<Message> | undefined;
  public addComment: Subject<Comment> | undefined;
  public connectComment: Subject<ConnectComment> | undefined;
  public unsubscribeComment: Subject<unsubscribeComment> | undefined;

  userId: any;
  

  //Live
  //CHAT_URL: any = "ws://api.newzkast.com:3000/cable?user_id="; 
  
  //Development
  CHAT_URL: any;

  constructor(
    private wsService: WebsocketService,
    public baseurl : baseurl
    ) {
      
      this.CHAT_URL = this.baseurl.socketUrl; //"ws://api.dev.newzkast.com:3030/cable?user_id="; //"ws://3.17.3.103:3030/cable?user_id=";

    var retrievedObject = localStorage.getItem('userData');
    if(retrievedObject)
    {
      var dataUser = JSON.parse(retrievedObject);

      this.userId = dataUser['id'];
      this.CHAT_URL = this.CHAT_URL+this.userId;

      this.messages = <Subject<Message>>wsService.connect(this.CHAT_URL).map(
        (response: MessageEvent): Message => {
          let data = JSON.parse(response.data);
          //console.log(data);
          return data;
          // return {
          //   author: data.author,
          //   message: data.message
          // };
        }
      );

      this.connectComment = <Subject<ConnectComment>>wsService.connect(this.CHAT_URL).map(
        (response: MessageEvent): ConnectComment => {
          let data = JSON.parse(response.data);
          console.log(response);
          return data;
        }
      );

      this.addComment = <Subject<Comment>>wsService.connect(this.CHAT_URL).map(
        (response: MessageEvent): Comment => {
          let data = JSON.parse(response.data);
          console.log(response);
          return data;
        }
      );

      this.unsubscribeComment = <Subject<unsubscribeComment>>wsService.connect(this.CHAT_URL).map(
        (response: MessageEvent): unsubscribeComment => {
          let data = JSON.parse(response.data);
          console.log(response);
          return data;
        }
      );
    }
  }

}
