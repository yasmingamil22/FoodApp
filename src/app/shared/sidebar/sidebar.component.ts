import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';


interface IMenu{
text:string;
icon:string;
link:string;
isActive:boolean
}


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  @Output() isOpenedValue = new EventEmitter<boolean>();
  isOpened:boolean =true;

  constructor(private _AuthService:AuthService){}

  isAdmin():boolean{
    return this._AuthService.role=='SuperAdmin'
  }
  isUser():boolean{
    return this._AuthService.role=='SystemUser'
  }

  menu:IMenu[]=[
    {
     text:'Home',
     icon:'fa-solid fa-house',
     link:'/dashboard/home',
     isActive:this.isAdmin() || this.isUser()
    },

    {
      text:'Users',
      icon:'fa-solid fa-user-group',
      link:'admin/users',
      isActive:this.isAdmin()
     },
    
     {
      text:'Recipes',
      icon:'fa-solid fa-table-list',
      link:'admin/recipes',
      isActive:this.isAdmin() 
     },
     {
      text:'Categories',
      icon:'fa-regular fa-calendar-days',
      link:'admin/categories',
      isActive:this.isAdmin()
     },
     {
      text:'Recipes',
      icon:'fa-solid fa-table-list',
      link:'user/recipes',
      isActive: this.isUser()
     },
     {
      text:'Favorites',
      icon:'fa-regular fa-heart',
      link:'user/favorites',
      isActive:this.isUser()
     },
  ]


  onClicked() {
    this.isOpened = !this.isOpened;
    this.isOpenedValue.emit(this.isOpened);
   // console.log(this.isOpened)
  }


}
