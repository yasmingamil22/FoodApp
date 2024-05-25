import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent  {

 
  constructor(private _AuthService:AuthService,private _Router:Router,private toastr: ToastrService){}

  msg:string='';
  ok:boolean=false;
  hide:boolean=true;
  hideConfirmPass:boolean=true;

  changePassForm:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    otp:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)]) ,// the password contains at least 1 digit, 1 lowercase letter, 1 uppercase letter, 1 special character, and is at least 8 characters long.
    confirmPassword:new FormControl(''),

  },{validators:[this.confirmPassword]} as FormControlOptions)

  confirmPassword(group:FormGroup):void{
    let password=group.get('password')
    let rePassword=group.get('confirmPassword')

    if(rePassword?.value==''){
    rePassword.setErrors({required:true})
    }else if(rePassword?.value!=password?.value){
      rePassword?.setErrors({mismatch:true})
    }

  }



  resetPassword(data:FormGroup):void{

    if(data.valid ==true){
    this._AuthService.forgetPassword(data.value).subscribe({
      next:(response)=>{

       console.log(response)
       if(response){

        this.msg=response.message
        this.ok=true

        this._Router.navigate(['/auth'])
      }
      },
      error:(err)=>{
 
        this.showError(err.error.message)

      },
      complete:()=>{
        this.showSuccess(this.msg)

      }
    })
  }
  }

  showSuccess(mes:string) {
    this.toastr.success( mes);
  }
  showError(mes:string) {
    this.toastr.error( mes);
  }

}
