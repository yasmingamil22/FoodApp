import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private _Router:Router,private _ProfileService:ProfileService) { }

  isAdmin:boolean=false;
  userName:string='';
 


  ngOnInit(): void {
    
    this.getProfile()
    this.adminOrUser()

   }


   getProfile():void{
    this._ProfileService.getCurrentUser().subscribe({
      next:(res)=>{
    console.log(res.imagePath)
    this.userName=res.userName
      },error:(err)=>{
        console.log(err)

      }
    })
   }



  goToRecipes():void{
    if(this.isAdmin) this._Router.navigate(['/dashboard/admin/recipes'])
    else   this._Router.navigate(['/dashboard/user/recipes'])
 
  }


  adminOrUser():void{

    if(localStorage.getItem('token') !=null&&localStorage.getItem('role')=='SystemUser'){
      this.isAdmin=false;
    }else if (localStorage.getItem('token') !=null&&localStorage.getItem('role')=='SuperAdmin'){
      this.isAdmin=true;
    }
  }
  

}
