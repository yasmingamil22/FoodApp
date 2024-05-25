import { ICategory } from './../../../categories/interfaces/ICategoryData';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormControlOptions } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesData, Tag } from '../../interfaces/IRecipes';
import { ICategoryData } from 'src/app/admin/categories/interfaces/ICategoryData';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from 'src/app/admin/categories/services/categories.service';
import { DeleteComponent } from 'src/app/shared/delete/delete.component';
import { ViewRecipceComponent } from 'src/app/shared/view-recipce/view-recipce.component';
import { RecipesService } from '../../services/Recipes.service';
import { NgxFileDropEntry } from 'ngx-file-drop';

@Component({
  selector: 'app-add-edit-recipes',
  templateUrl: './add-edit-recipes.component.html',
  styleUrls: ['./add-edit-recipes.component.css']
})
export class AddEditRecipesComponent implements OnInit {


 allTags!:Tag[]
 allCategories!:ICategoryData;
 imgBaseUrl:string='https://upskilling-egypt.com:3006/'
 imgNeededToEdit:string=''
 emptyImage:string='./assets/img/no-recipce.jpg'

// tagId:number=0
// categoryId:number=0;  

recipecId:number=0;

recipecNeedEdit!:RecipesData;

imageUploaded: boolean = false;
imageUrl: string = '';
uploadedFile!: File ; // Property to store the uploaded file



 categoriesIsEmpty:boolean=false

  constructor(
    private _Router:Router ,  
    private _RecipesService:RecipesService,
    private _CategoriesService:CategoriesService,
    private toastr: ToastrService, 
    private _ActivatedRoute:ActivatedRoute)  { }

  addRecipceForm: FormGroup=new FormGroup({
    name:new FormControl('',[Validators.required]),
    description:new FormControl('',[Validators.required]),
    price:new FormControl('',[Validators.required]),
    tagId:new FormControl('',[Validators.required]),
    categoriesIds:new FormControl('',[Validators.required]),  

    recipeImage:new FormControl(''),

  })

  ngOnInit(): void {
    this.getTags()
    this.getCategories()
  
   this.recipecId= this._ActivatedRoute.snapshot.params['id']

   if(this.recipecId){
    //edit
    this.getRecipeById(this.recipecId)

   }

  }


  goToRecipes():void{
     this._Router.navigate(['/dashboard/admin/recipes'])
 
  }

  msgError:string=''



  sendData(data:FormGroup):void{

    if(this.recipecId){

      this.editRecipe(data)
     }else{
      console.log('add')
       
      this.addRecipe(data);

    }

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
    else{
      this.categoriesIsEmpty=false
    } 

     },error:(err)=>{
       console.log(err)
     }
   })
 }


getRecipeById(id :number){
  this._RecipesService.getRecipeById(id).subscribe({
    next:(res)=>{
    console.log(res)
    this.recipecNeedEdit=res;
    },
    error:(err)=>{
     console.log(err)
    },complete:()=>{

     let categoryIds:number[]=[];
      for(let i=0;i<this.recipecNeedEdit.category.length;i++){
        categoryIds.push(this.recipecNeedEdit.category[i].id)
      }

      this.addRecipceForm.patchValue({   
    name:this.recipecNeedEdit.name,
    description:this.recipecNeedEdit.description,
    price:this.recipecNeedEdit.price,
    tagId:this.recipecNeedEdit.tag.id,
    categoriesIds:categoryIds,  

   // recipeImage:this.recipecNeedEdit.imagePath,
      })

      if(this.recipecNeedEdit.imagePath){
        this.imgNeededToEdit=this.imgBaseUrl+this.recipecNeedEdit.imagePath

      }

    }
  })
}





 //ngx file drop
 public files: NgxFileDropEntry[] = [];

 public dropped(files: NgxFileDropEntry[]) {

   const droppedFile = files[0]; // Access the first dropped file
   if (droppedFile.fileEntry.isFile) {
     const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
     fileEntry.file((file: File) => {
       // Here you can access the dropped file
       console.log('Dropped file:', file);
       // Assuming imageUrl is the URL to display the uploaded image
       this.imageUrl = URL.createObjectURL(file);

       this.uploadedFile = file;

       this.imageUploaded = true;
     });
   }



   }
 

 public fileOver(event:any){
   console.log(event);
 }

 public fileLeave(event:any){
   console.log(event);
 }





 editRecipe(data: FormGroup): void {
  if (this.uploadedFile !== null && this.addRecipceForm.valid) {
    let myData = new FormData();
    myData.append('name', data.value.name);
    myData.append('description', data.value.description);
    myData.append('price', data.value.price);
    myData.append('tagId', data.value.tagId);
    myData.append('categoriesIds', data.value.categoriesIds);
    myData.append('phoneNumber', data.value.phoneNumber);

    if (this.uploadedFile && this.uploadedFile.name) {
      console.log("uploaded");
      myData.append('recipeImage', this.uploadedFile, this.uploadedFile.name);
      this.editFromApi(myData)

    } else {
      console.log("no file uploaded");

      // Convert the image URL to a Blob
      this.convertImageUrlToBlob( this.imgBaseUrl+ this.recipecNeedEdit.imagePath)
        .then(blob => {
          myData.append('recipeImage', blob, 'image.jpg');

          // Call your service method here
          this.editFromApi(myData)
       
        })
        .catch(error => {
          console.error("Error converting image URL to Blob:", error);
        });
    }
  }
}

// Function to convert image URL to Blob
async convertImageUrlToBlob(url: string): Promise<Blob> {
  const response = await fetch(url);
  const blob = await response.blob();
  return blob;
}


editFromApi(myData:FormData):void{
  this._RecipesService.editRecipes(myData, this.recipecId).subscribe({
    next: (res) => {
      console.log(res);
    },
    error: (err) => {
      console.log(err);
    },
    complete: () => {
      this._Router.navigate(['/dashboard/admin/recipes']);
      this.showSuccess("Edited Successfully");
    }
  });
}









 msg:string=''
 addRecipe(data:FormGroup):void{
 
   if (this.uploadedFile !== null &&this.addRecipceForm.valid) {
 
     let myData=new FormData()
     
     myData.append('name',data.value.name)
     myData.append('description',data.value.description)
     myData.append('price',data.value.price)
     myData.append('tagId',data.value.tagId)
     myData.append('categoriesIds',data.value.categoriesIds)
     myData.append('phoneNumber',data.value.phoneNumber)
      
   if(this.uploadedFile && this.uploadedFile.name){
     myData.append('recipeImage', this.uploadedFile, this.uploadedFile.name);
   }

   this._RecipesService.addRecipes(myData).subscribe({
    next:(res)=>{
      console.log(res)
      this.msg=res.message
    },
      error:(err)=>{
       console.log(err)
      },complete:()=>{
        this._Router.navigate(['/dashboard/admin/recipes'])
        this.showSuccess(this.msg)

      }

   })


  }
 
 }
 



 showSuccess(msg:string) {
   this.toastr.success( msg);
 }



}
