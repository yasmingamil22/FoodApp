import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IChangePassword, IForgetPassword, ILogin, IVerifyAccount } from '../models/ILogin';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  role:any;

constructor(private _HttpClient:HttpClient,private _Router:Router) {

  if(localStorage.getItem('token')!=null){
    this.getProfile()

  }
 }

login(data:ILogin):Observable<any>{
  return this._HttpClient.post('Users/Login',data);
}

register(data:FormData):Observable<any>{
  return this._HttpClient.post('Users/Register',data);
}


getProfile():void{

  const encodeToken=localStorage.getItem('token');
  if(encodeToken !=null){

    const decode:any=jwtDecode(encodeToken);
   this.role=decode;
   console.log(decode)

   localStorage.setItem('role',decode.userGroup)
   localStorage.setItem('userName',decode.userName)
   this.getRole()
  }

}

getRole(){
  if(localStorage.getItem('token') !=null&&localStorage.getItem('role') !=null){

    this.role=localStorage.getItem('role')

  }
}

logOut():void{
  localStorage.clear()

  this._Router.navigate(['/auth'])
}

verifyAccount(data:IVerifyAccount):Observable<any>{
return this._HttpClient.put('Users/verify',{email:data.email,code:data.code})
}


resetRequest(email:string):Observable<any>{
  return this._HttpClient.post('Users/Reset/Request',{email:email})
  }


  forgetPassword(data:IForgetPassword):Observable<any>{
    return this._HttpClient.post('Users/Reset',{
      email:data.email,
      password:data.password,
      confirmPassword:data.confirmPassword,
      seed:data.otp
    })
    }

    changePassword(data:IChangePassword):Observable<any>{
      return this._HttpClient.put('Users/ChangePassword',{
        oldPassword:data.oldPassword,
        newPassword:data.newPassword,
        confirmNewPassword:data.confirmNewPassword,
      })
      }

}
