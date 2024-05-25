import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { ICategoryData } from 'src/app/admin/categories/interfaces/ICategoryData';
import { CategoriesService } from 'src/app/admin/categories/services/categories.service';
import { IRecipes, Tag, RecipesData, IAllFav } from 'src/app/admin/recipes/interfaces/IRecipes';
import { RecipesService } from 'src/app/admin/recipes/services/Recipes.service';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { ViewRecipceComponent } from 'src/app/shared/view-recipce/view-recipce.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {



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
   emptyImage:string='./assets/img/no-recipce.jpg'

   searchValue :string= '';
   tagId:number=0
   categoryId:number=0;  


  allRecipes!:IAllFav
  recipecData!:RecipesData
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
   
    
   
  }

  getRecipesData():void{


    this._RecipesService.getAllFav().subscribe({
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


  


  openViewRecipceDialog(recipceView:RecipesData,id:number): void {
    const dialogRef = this.dialog.open(ViewRecipceComponent, {
      data: {recipce:recipceView,isUser:true,fromFavPage:true},
      width: '50%' 

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log( result);
      if(result){
        //remove to fav
        this.removeFromFav(id)
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


  showSuccess(msg:string) {
    this.toastr.success( msg);
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


  removeFromFav(id:number):void{
    this._RecipesService.removeFromFav(id).subscribe({
      next:(res)=>{
        console.log(res)
       

      },error:(err)=>{
        console.log(err)
      },complete:()=>{
        this.getRecipesData()

        this.showSuccess("removed")


      }
    })
  }

}
