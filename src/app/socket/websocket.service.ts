import { Injectable } from "@angular/core";
import * as Rx from "rxjs/Rx";

@Injectable()

export class WebsocketService {

  constructor() { }

  private subject: Rx.Subject<MessageEvent> | undefined;

  public connect(url: any): Rx.Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(url);
      console.log("Successfully connected: " + url);
      console.log(this.subject);
    }
    return this.subject;
  }

  private create(url: any): Rx.Subject<MessageEvent> {
    let token = localStorage.getItem('accessToken');

    let ws = new WebSocket(url);
    
    let observable = Rx.Observable.create((obs: Rx.Observer<MessageEvent>) => {
      ws.onmessage = obs.next.bind(obs);
      ws.onerror = obs.error.bind(obs);
      ws.onclose = obs.complete.bind(obs);
      return ws.close.bind(ws);
    });
    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          console.log(JSON.stringify(data));
          ws.send(JSON.stringify(data));
        }
      }
    };
    return Rx.Subject.create(observer, observable);
  }
}
