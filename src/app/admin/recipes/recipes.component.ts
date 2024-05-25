import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { IRecipes, RecipesData, Tag } from './interfaces/IRecipes';
import { RecipesService } from './services/Recipes.service';
import { CategoriesService } from '../categories/services/categories.service';
import { ICategoryData } from '../categories/interfaces/ICategoryData';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { ViewRecipceComponent } from 'src/app/shared/view-recipce/view-recipce.component';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent implements OnInit{


  
  noDataFound:boolean=false;
  pageSize:number=10
 // pageNumber:number=1

   length = 50;
   pageIndex = 0;
   pageSizeOptions = [5, 10, 25];
 
   hidePageSize = false;
   showPageSizeOptions = true;
   showFirstLastButtons = true;
   disabled = false;
 
   pageEvent!: PageEvent;


   imgUrl:string='https://upskilling-egypt.com:3006/'
   emptyImage:string='./assets/img/no-recipce.jpg'

   searchValue :string= '';
   tagId:number=0
   categoryId:number=0;  


  allRecipes!:IRecipes
  allTags!:Tag[]
  allCategories!:ICategoryData;

  constructor(
    private _RecipesService:RecipesService,
    private _CategoriesService:CategoriesService,
    private dialog: MatDialog,private toastr: ToastrService){
  }

  categoriesIsEmpty:boolean=false
  ngOnInit(): void {
    this.getRecipesData()
    this.getTags()
    this.getCategories()
    
   
  }

  getRecipesData():void{

    let ParamData={
      name:this.searchValue,
      tagId:this.tagId,
      categoryId:this.categoryId,
      pageSize:this.pageSize,
      pageNumber:this.pageIndex+1
    }

    this._RecipesService.getAllRecipes(ParamData).subscribe({
      next:(res)=>{
        console.log(res)
        this.allRecipes=res
        if(this.allRecipes.totalNumberOfRecords==0){ this.noDataFound=true
          console.log('empty')
        } else  this.noDataFound=false;
        
      },error:(err)=>{
        console.log(err)
      }
    })
  }


  getTags():void{

    this._RecipesService.getAllTags().subscribe({
      next:(res)=>{
        console.log(res)
       
        this.allTags=res;

      },error:(err)=>{
        console.log(err)
      }
    })
  }

  getCategories():void{
    let ParamData={
      name:'',
      pageSize:10000,
      pageNumber:1
    }

    this._CategoriesService.getAllCategories(ParamData).subscribe({
      next:(res)=>{
        console.log(res)
       
        this.allCategories=res;

        if(this.allCategories.totalNumberOfRecords==0) this.categoriesIsEmpty=true
        else this.categoriesIsEmpty=false

      },error:(err)=>{
        console.log(err)
      }
    })
  }

  reset():void{
    this.searchValue=''
    this.getRecipesData()
  }


  openViewRecipceDialog(recipceView:RecipesData): void {
    const dialogRef = this.dialog.open(ViewRecipceComponent, {
      data: {recipce:recipceView,isUser:false,fromFavPage:false},
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

    this._RecipesService.deleteRecipe(id).subscribe({
      next:(res)=>{
        console.log(res)
       

      },error:(err)=>{
        console.log(err)
      },complete:()=>{
       this.getRecipesData()
      }
    })

  }




/*
  addCategory(categoryName:string):void{
    this._CategoriesService.addCategory(categoryName).subscribe({
      next:(res)=>{
        console.log(res)
      },error:(err)=>{
        console.log(err)
      },complete:()=>{
        this.getRecipesData()
        this.showSuccess()
      }
    })
  }

*/
  showSuccess() {
    this.toastr.success( 'Added successfully');
  }





 

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
   // this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.getRecipesData()
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }



}
