import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { AddEditCategoryComponent } from '../categories/compontents/add-edit-category/add-edit-category.component';
import { ICategoryData } from '../categories/interfaces/ICategoryData';
import { CategoriesService } from '../categories/services/categories.service';
import { UserService } from './services/user.service';
import { IUser, UserData } from './interfaces/IUser';
import { ViewUserComponent } from './components/viewUser/viewUser.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit{

  noDataFound:boolean=false;

  pageSize:number=10
 
   pageIndex = 0;
   pageSizeOptions = [5, 10, 25];
 
   hidePageSize = false;
   showPageSizeOptions = true;
   showFirstLastButtons = true;
   disabled = false;
 
   pageEvent!: PageEvent;

   imgUrl:string='https://upskilling-egypt.com:3006/'

   roleIds:number[]=[]
   searchType:string=''


  searchValue:string=''
  allUserData!:IUser;
  constructor(private _UserService:UserService,private dialog: MatDialog,private toastr: ToastrService){
  }

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers():void{

    console.log(this.searchType+"  "+this.searchValue)
    console.log('jjjjjj')


    let ParamData={
      [this.searchType]:this.searchValue,
      groups:this.roleIds,
      pageSize:this.pageSize,
      pageNumber:this.pageIndex+1
    }


    this._UserService.getAllUsers(ParamData).subscribe({
      next:(res)=>{
        console.log(res)
        this.allUserData=res
        if(this.allUserData.totalNumberOfRecords==0){ this.noDataFound=true
          console.log('empty')
        } else  this.noDataFound=false;
      },error:(err)=>{
        console.log(err)
      }
    })
  }


  reset():void{
    this.searchValue=''
    this.getAllUsers()
  }



  
  openViewUserDialog(userView:UserData): void {
    const dialogRef = this.dialog.open(ViewUserComponent, {
      data: userView,
      width: '50%' //  width here

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log( result);
      if(result){
       
        this.openDeleteDialog(result.id)
      }
    });
  }

  


  showSuccess() {
    this.toastr.success( 'Added successfully');
  }





 

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
   // this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.getAllUsers()
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }



  openDeleteDialog(id:number): void {
    console.log(id)
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {itemId:id},

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log( result);
      if(result){
        this.deleteUser(result)

      }
    });
  }

  deleteUser(id:number):void{

    this._UserService.onDeleteUser(id).subscribe({
      next:(res)=>{
        console.log(res)
       

      },error:(err)=>{
        console.log(err)
      },complete:()=>{
       this.getAllUsers()
      }
    })

  }


}
