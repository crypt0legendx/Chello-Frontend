import { Injectable, NgZone  } from '@angular/core';
import { baseurl } from '../utils/base-url';
import { routers } from '../utils/router-navigate';
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  userData: any;
  base_url: any;

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
  
  public addList(addListData: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token});
    const requestOptions = {headers: header};
    return this.http.post<any[]>(this.base_url + 'List/addList', {title:addListData}, requestOptions);
  }

  public updateList(user_id: any, title: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token}); 
  
    const requestOptions = {headers: header};
     return this.http.post<any[]>(this.base_url + 'List/updateList',{list_id : user_id, title : title}, requestOptions);
  }

  public removeList(user_id: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token}); 
    let data = {
      _id : user_id
    }
    const requestOptions = {headers: header, body: data};
    requestOptions.body=data;
     return this.http.delete<any[]>(this.base_url + 'List/deleteList', requestOptions);
  }
  
  public getList() {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token});
    const requestOptions = {headers: header};
    return this.http.post<any[]>(this.base_url + 'List/usersList', '', requestOptions);
  }

  public addMember(list_id: any, member_id: any): Observable<any[]> {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token});
    const requestOptions = {headers: header};
    return this.http.post<any[]>(this.base_url + 'List/addListMember', { list_id : list_id, member_id : [member_id] },  requestOptions);
  }

  public removeListMember(removeListMemberData: any): Observable<any[]> {
    console.log('Deleting List Member id', removeListMemberData);
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token});
    const requestOptions = {headers: header};
    return this.http.post<any[]>(this.base_url + 'List/removeListMember', {member_id : removeListMemberData}, requestOptions);
  }

  public getListMember(list_id: any) {
    let token: any = localStorage.getItem('accessToken');
    let header = new HttpHeaders({ "Authorization": "Bearer " + token});
    const requestOptions = {headers: header};
    return this.http.post<any[]>(this.base_url + 'List/usersListMember', {list_id : list_id}, requestOptions);
  }
}
