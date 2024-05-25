import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormControlOptions, FormGroup, Validators } from '@angular/forms';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { MatDialog } from '@angular/material/dialog';
import { HaveCodeComponent } from '../have-code/have-code.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private _AuthService:AuthService,private dialog: MatDialog,private toastr: ToastrService){}

  msg:string='';
  ok:boolean=false;

  hide:boolean=true;
  hideConfirmPass:boolean=true;

  imageUploaded: boolean = false;
  imageUrl: string = '';
  uploadedFile!: File ; // Property to store the uploaded file
  lastEmailRegister:string=''
  code:string=''
  dataSent:boolean=false;


  registerForm:FormGroup=new FormGroup({
    userName:new FormControl('',[Validators.required,Validators.pattern(/^[a-zA-Z0-9]{3,7}[0-9]$/)]),
    email:new FormControl('',[Validators.required,Validators.email]),
    password:new FormControl('',[Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/)]), // the password contains at least 1 digit, 1 lowercase letter, 1 uppercase letter, 1 special character, and is at least 8 characters long.
    confirmPassword:new FormControl(''),
    country:new FormControl('',[Validators.required]),
    phoneNumber:new FormControl('',[Validators.required]),// ,Validators.pattern(/^01[0125][1-9]{8}$/)] accept only Egyption number
    profileImage:new FormControl(''),

  },{validators:[this.confirmPassword]} as FormControlOptions)

  confirmPassword(group:FormGroup):void{
    let password=group.get('password')
    let rePassword=group.get('confirmPassword')

    if(rePassword?.value==''){
    rePassword.setErrors({required:true})
    }else if(rePassword?.value!=password?.value){
      rePassword?.setErrors({mismatch:true})
    }

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






  register(data:FormGroup):void{

    if (this.uploadedFile !== null &&this.registerForm.valid) {

    let myData=new FormData()
    
    myData.append('userName',data.value.userName)
    myData.append('email',data.value.email)
    myData.append('password',data.value.password)
    myData.append('confirmPassword',data.value.confirmPassword)
    myData.append('country',data.value.country)
    myData.append('phoneNumber',data.value.phoneNumber)
  //  myData.append('profileImage',this.imageUrl)
     
  if(this.uploadedFile && this.uploadedFile.name){
    myData.append('profileImage', this.uploadedFile, this.uploadedFile.name);

  }





    this._AuthService.register(myData).subscribe({
      next:(response)=>{
 
       this.showSuccess(response.message)

       this.lastEmailRegister=data.value.email

       // Reset the form
       this.registerForm.reset();

       // Clear FormData
       myData = new FormData();
       this.dataSent=true
       
       
      },
      error:(err)=>{
        console.log(err)


        this.showErorr(err.error.message)

      },
      
    })

 // }
  }
  }


 



  openDialog(): void {
    console.log(this.registerForm.value.email)
    const dialogRef = this.dialog.open(HaveCodeComponent, {
      data: {email:this.lastEmailRegister,code:this.code},
      width: '500px' //  width here

    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log( result);
      if(result.email !='' && result.code !=''){
        let msg:string=''
        this._AuthService.verifyAccount(result).subscribe({
          next:(res)=>{
           msg=res.message
          },
          error:(err)=>{
            this.showErorr(err.error.message)

          },
          complete:()=>{
            this.showSuccess(msg)
            
          }

        })
      }
    });
  }

  showSuccess(msg:string) {
    this.toastr.success( msg);
  }

  showErorr(msg:string) {
    this.toastr.error(msg );
  }




}
