import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent  {

  constructor(
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

    private _AuthService:AuthService,private toastr: ToastrService
  ) {}


  onNoClick(): void {
    this.dialogRef.close();
  }




 

  msg:string='';
  hide:boolean=true;
  hideNew:boolean=true;
  hideConfirmPass:boolean=true;

  changePassForm:FormGroup=new FormGroup({
    oldPassword:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)]) ,// the password contains at least 1 digit, 1 lowercase letter, 1 uppercase letter, 1 special character, and is at least 8 characters long.
    newPassword:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)]) ,// the password contains at least 1 digit, 1 lowercase letter, 1 uppercase letter, 1 special character, and is at least 8 characters long.
    confirmNewPassword:new FormControl(''),

  },{validators:[this.confirmPassword]} as FormControlOptions)

  confirmPassword(group:FormGroup):void{
    let password=group.get('newPassword')
    let rePassword=group.get('confirmNewPassword')

    if(rePassword?.value==''){
    rePassword.setErrors({required:true})
    }else if(rePassword?.value!=password?.value){
      rePassword?.setErrors({mismatch:true})
    }

  }



  changePassword(data:FormGroup):void{

    if(data.valid ==true){
      console.log(data.value)
    this._AuthService.changePassword(data.value).subscribe({
      next:(response)=>{

       if(response){

        this.msg=response.message
      }
      },
      error:(err)=>{

        this.msg=err.error.message;
        this.showError(this.msg)

      },
      complete:()=>{
        this.onNoClick()
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
