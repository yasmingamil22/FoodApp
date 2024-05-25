import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  constructor(private _AuthService:AuthService,private _Router:Router,private toastr:ToastrService){}

  hide:boolean=true;

  loginForm:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)]) // the password contains at least 1 digit, 1 lowercase letter, 1 uppercase letter, 1 special character, and is at least 8 characters long.
  })



  login(data:FormGroup):void{

    if(data.valid ==true){
      let token:string=''
    this._AuthService.login(data.value).subscribe({
      next:(response)=>{

       if(response.token){
        token=response.token
      }
      },
      error:(err)=>{
        
        this.showError(err.error.message)
      },
      complete:()=>{


        localStorage.setItem('token',token)
        this._AuthService.getProfile();

        this._Router.navigate(['/dashboard'])

      }
    })
  }
  }


  showError(mes:string) {
    this.toastr.error( mes);
  }
}
