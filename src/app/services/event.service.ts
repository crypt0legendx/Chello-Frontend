import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { routers } from './../utils/router-navigate';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable, NgZone } from '@angular/core';
import { baseurl } from '../utils/base-url';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  base_url: any;
  event:any = null;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    public baseurl: baseurl,
    public routernavigate: routers,
    private http: HttpClient
  ) {
    this.base_url = this.baseurl.url;
  }

  public getEventFeed(data: any){
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token});
    const requestOptions = {  headers: header, body: data};  

	  return this.http.post(this.base_url + 'privateEvent/events' , data, requestOptions)
  }

  public getSearchEventFeed(data: any){
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token});
    const requestOptions = {  headers: header, body: data};  

	  return this.http.post(this.base_url + 'privateEvent/searchby' , data, requestOptions)
  }

  public getMyEventFeed(data: any){
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token});
    const requestOptions = {  headers: header, body: data};  

	  return this.http.post(this.base_url + 'privateEvent/myevents' , data, requestOptions)
  }

  public getEventSuggestion(data: any){
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token});
    const requestOptions = {  headers: header, body: data};  

	  return this.http.post(this.base_url + 'privateEvent/suggestsevents' , data, requestOptions)
  }

  public createEvent(data: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token});
    const requestOptions = {headers: header};

    return this.http.post<any[]>(this.base_url + 'privateEvent/create', data, requestOptions);
  }

  public editEvent(data: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token});
    const requestOptions = {headers: header};
    return this.http.post<any[]>(this.base_url + 'privateEvent/editPrivateEvent', data, requestOptions);
  }

  public deleteEvent(data: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token});
    const requestOptions = {headers: header, body: data};
    return this.http.delete<any[]>(this.base_url + 'privateEvent/delete', requestOptions);
  }

  public setCurrentEvent(data:any){
    this.event = data;
    console.log(this.event);
  }

  public getCurrentEvent(){
    return this.event;
  }

}
