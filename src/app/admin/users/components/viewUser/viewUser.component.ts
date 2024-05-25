import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEditCategoryComponent } from 'src/app/admin/categories/compontents/add-edit-category/add-edit-category.component';

@Component({
  selector: 'app-viewUser',
  templateUrl: './viewUser.component.html',
  styleUrls: ['./viewUser.component.css']
})
export class ViewUserComponent  {

  imgUrl:string='https://upskilling-egypt.com:3006/'


  constructor(
    public dialogRef: MatDialogRef<AddEditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}


  onNoClick(): void {
    this.dialogRef.close();
  }

}
