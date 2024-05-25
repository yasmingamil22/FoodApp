import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { IChangePassword } from 'src/app/auth/models/ILogin';
import { ProfileService } from '../services/profile.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{


  userName:string='';
  imagePath:string=''
  noImage:string='./assets/img/no-profile-image.webp'
  baseUrl:string='https://upskilling-egypt.com:3006/'

  constructor(private _AuthService:AuthService,
    private _ProfileService:ProfileService,
    private _Router:Router,
    private dialog: MatDialog,
    ){}

  ngOnInit(): void {
    
    this.getProfile()
    this.changeInUserName()
    this.changeInUserImg()

    
   }


   logOut():void{
    this._AuthService.logOut()
   }

   getProfile():void{
    this._ProfileService.getCurrentUser().subscribe({
      next:(res)=>{
    console.log(res.imagePath)
    this.imagePath=res.imagePath;
    this.userName=res.userName
      },error:(err)=>{
        console.log(err)

      }
    })
   }

   changeInUserName(){
    this._ProfileService.userName.subscribe({
      next:(val)=>{
        this.userName=val
      },
      error:(err)=>{
        console.log(err)
      }
    })
   }

   changeInUserImg(){
    this._ProfileService.userimg.subscribe({
      next:(val)=>{6
        this.imagePath=val
      },
      error:(err)=>{
        console.log(err)
      }
    })
   }


   goToProfile():void{
   this._Router.navigate(['/dashboard/edit-profile'])
   }


userN:string=''
dataChangePas!:IChangePassword
  openDialog(): void {
    const dialogRef = this.dialog.open(ChangePasswordComponent, {
      data: { 
        nane:this.userN},
      width: '50%' //  width here,

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log( result);
      if(result){
     //   this.addCategory(result)
        
      }
    });
  }




}
