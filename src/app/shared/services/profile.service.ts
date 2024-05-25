import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  userName=new BehaviorSubject('');
  userimg=new BehaviorSubject('');



constructor(private _HttpClient:HttpClient) { }

getCurrentUser():Observable<any>{
  return this._HttpClient.get('Users/currentUser')
}

editProfile(data:FormData):Observable<any>{
  return this._HttpClient.put('Users',data)
}

}
