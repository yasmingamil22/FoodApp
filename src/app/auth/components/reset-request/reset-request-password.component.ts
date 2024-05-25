import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-request-password',
  templateUrl: './reset-request-password.component.html',
  styleUrls: ['./reset-request-password.component.css']
})
export class ResetRequestComponent  {

  
  constructor(private _AuthService:AuthService,private _Router:Router,private toastr: ToastrService){}


  hide:boolean=true;

  emailForm:FormGroup=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
  })



  submit(data:FormGroup):void{

    if(data.valid ==true){
      let msg:string=''
    this._AuthService.resetRequest(data.value.email).subscribe({
      next:(response)=>{

     
       if(response){

        msg=response.message
       
    
      }
      },
      error:(err)=>{
    
        this.showError(err.error.message)
      },
      complete:()=>{
        this.showSuccess(msg)

        this._Router.navigate(['/auth/resetPassword'])
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
