import { Component, OnInit } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { ToastrService } from 'ngx-toastr';
import { HaveCodeComponent } from 'src/app/auth/components/have-code/have-code.component';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProfileService } from '../services/profile.service';
import { IRegister, ProfileData } from 'src/app/auth/models/ILogin';
import { UserData } from 'src/app/admin/users/interfaces/IUser';
import { Router } from '@angular/router';
import { ConfirmPasswordComponent } from '../confirm-password/confirm-password.component';





@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent  {

  constructor(private _AuthService:AuthService,
    private _ProfileService:ProfileService,
    private dialog: MatDialog,
    private toastr: ToastrService,
    private _Router:Router   
  ){}


  isError:boolean=false;

  hide:boolean=true;
  hideConfirmPass:boolean=true;

  imageUploaded: boolean = false;
  imageUrl: string = '';
  uploadedFile!: File ; // Property to store the uploaded file
  lastEmailRegister:string=''
  code:string=''
  imgNeededToEdit:string=''


  profileForm:FormGroup=new FormGroup({
    userName:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9]{3,7}[0-9]$/)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    country:new FormControl('',[Validators.required]),
    phoneNumber:new FormControl('',[Validators.required]),// ,Validators.pattern(/^01[0125][1-9]{8}$/)] accept only Egyption number
    profileImage:new FormControl(''),

  })

  userName:any;
  imagePath:string=''
  noImage:string='./assets/img/no-profile-image.webp'
  profileData!:UserData
  imgBaseUrl:string='https://upskilling-egypt.com:3006/'


  ngOnInit(): void {
    
    this.getProfileData()
   }

   getProfileData():void{
    this._ProfileService.getCurrentUser().subscribe({
      next:(res)=>{
    console.log(res.imagePath)

    this.profileData=res
      },error:(err)=>{
        console.log(err)
      },complete:()=>{
         this.profileForm.patchValue({
           
          userName:this.profileData.userName,
          email:this.profileData.email,
          country:this.profileData.country,
          phoneNumber:this.profileData.phoneNumber,
          profileImage:this.profileData.imagePath,
         })
   
         if(this.profileData.imagePath){
           this.imgNeededToEdit=this.imgBaseUrl+this.profileData.imagePath
    } }


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
 


 
 editProfileUser(): void {
  if (this.uploadedFile !== null) {
    let myData = new FormData();
    myData.append('userName', this.profileForm.value.userName);
    myData.append('email', this.profileForm.value.email);
    myData.append('country', this.profileForm.value.country);
    myData.append('phoneNumber', this.profileForm.value.phoneNumber);
    myData.append('confirmPassword', this.confirmPassword);

    if (this.uploadedFile && this.uploadedFile.name) {
      console.log("uploaded");
      myData.append('profileImage', this.uploadedFile, this.uploadedFile.name);
      this.editFromApi(myData)

    } else if(this.profileData.imagePath){
      console.log("no file uploaded");

      // Convert the image URL to a Blob
      this.convertImageUrlToBlob( this.imgBaseUrl+ this.profileData.imagePath)
        .then(blob => {
          myData.append('profileImage', blob, 'image.jpg');

          // Call your service method here
          this.editFromApi(myData)
       
        })
        .catch(error => {
          console.error("Error converting image URL to Blob:", error);
        });
    }else{
      this.editFromApi(myData)

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
  this._ProfileService.editProfile(myData).subscribe({
    next: (res) => {
      console.log(res);

      this._ProfileService.userName.next(res.userName)
      this._ProfileService.userimg.next(res.imagePath)


    },
    error: (err) => {
      console.log(err);
      this.isError=true

this.showError('Invalid password')

    },
    complete: () => {



      this._Router.navigate(['/dashboard']);
      this.showSuccess("updated Successfully");
    }
  });
}
 
 
 
 
   
 
 
   passwordFromDialog:string=''
   confirmPassword:string=''
   openDialog(): void {

    if(this.profileForm.valid){
     const dialogRef = this.dialog.open(ConfirmPasswordComponent, {
       data: this.passwordFromDialog,
       width: '50%' //  width here
 
     });
 
     dialogRef.afterClosed().subscribe(result => {
       console.log('The dialog was closed');
       console.log( result);
      if(result){
         this.confirmPassword=result;
         console.log("open meth")

         this.editProfileUser()
         console.log("close")
       }
     });

    }
   }
 
   showSuccess(msg:string) {
     this.toastr.success( msg);
   }

   showError(msg:string) {
    this.toastr.error( msg);
  }
 
   
 
 
 






}
