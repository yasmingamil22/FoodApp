import { Component } from '@angular/core';
import { CategoriesService } from './services/categories.service';
import { ICategory, ICategoryData } from './interfaces/ICategoryData';
import { AddEditCategoryComponent } from './compontents/add-edit-category/add-edit-category.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { PageEvent } from '@angular/material/paginator';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { ViewCategoryComponent } from './compontents/ViewCategory/ViewCategory.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {

  noDataFound:boolean=false;

  pageSize:number=10
 // pageNumber:number=1

 //  length = 50;
   pageIndex = 0;
   pageSizeOptions = [5, 10, 25];
 
   hidePageSize = false;
   showPageSizeOptions = true;
   showFirstLastButtons = true;
   disabled = false;
 
   pageEvent!: PageEvent;



   searchValue:string=''
  categoryData!:ICategoryData

  categoryItemName:string=''


  constructor(private _CategoriesService:CategoriesService,private dialog: MatDialog,private toastr: ToastrService){

    this.getCategoryData()

  }

  getCategoryData():void{

    let ParamData={
      name:this.searchValue,
      pageSize:this.pageSize,
      pageNumber:this.pageIndex+1
    }


    this._CategoriesService.getAllCategories(ParamData).subscribe({
      next:(res)=>{
        console.log(res)
        this.categoryData=res
        if(this.categoryData.totalNumberOfRecords==0){ this.noDataFound=true
          console.log('empty')
        } else  this.noDataFound=false;
      },error:(err)=>{
        console.log(err)
      }
    })
  }


  reset():void{
    this.searchValue=''
    this.getCategoryData()
  }

  openDialog(item?:ICategory): void {
    if(item){
      console.log('edittt')

      const dialogRef = this.dialog.open(AddEditCategoryComponent, {
        data: {name:item.name, edit:true},
        width: '25%' //  width here
  
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log( result);
        if(result){
          this.editCategory(result,item.id)
          
        }
      });}else{
      console.log('addedd')
     
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      data: {name:this.categoryItemName, edit:false},
      width: '25%' //  width here

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log( result);
      if(result){
        this.addCategory(result)
        
      }
    });}

  }

  addCategory(categoryName:string):void{
    this._CategoriesService.addCategory(categoryName).subscribe({
      next:(res)=>{
        console.log(res)
      },error:(err)=>{
        console.log(err)
      },complete:()=>{
        this.getCategoryData()
        this.showSuccess("Added")
      }
    })
  }

  editCategory(categoryName:string,id:number):void{
    this._CategoriesService.editCategory(categoryName,id).subscribe({
      next:(res)=>{
        console.log(res)
      },error:(err)=>{
        console.log(err)
      },complete:()=>{
        this.getCategoryData()
        this.showSuccess("Updated")
      }
    })
  }


  showSuccess(msg:string) {
    this.toastr.success( `${msg} successfully`);
  }





 

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
   // this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.getCategoryData()
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }



  openViewCategoryDialog(categoryView:ICategory): void {
    const dialogRef = this.dialog.open(ViewCategoryComponent, {
      data: categoryView,
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




  openDeleteDialog(id:number): void {
    console.log(id)
    const dialogRef = this.dialog.open(DeleteComponent, {
      data: {itemId:id},

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log( result);
      if(result){
        this.deleteItem(result)

      }
    });
  }

  deleteItem(id:number):void{

    this._CategoriesService.deleteCategory(id).subscribe({
      next:(res)=>{
        console.log(res)
       

      },error:(err)=>{
        console.log(err)
      },complete:()=>{
       this.getCategoryData()
      }
    })

  }




 
}


