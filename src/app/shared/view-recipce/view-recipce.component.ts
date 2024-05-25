import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddEditCategoryComponent } from 'src/app/admin/categories/compontents/add-edit-category/add-edit-category.component';

@Component({
  selector: 'app-view-recipce',
  templateUrl: './view-recipce.component.html',
  styleUrls: ['./view-recipce.component.css']
})
export class ViewRecipceComponent  {

  imgUrl:string='https://upskilling-egypt.com:3006/'
  emptyImage:string='./assets/img/no-recipce.jpg'


  constructor(
    public dialogRef: MatDialogRef<AddEditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}


  onNoClick(): void {
    this.dialogRef.close();
  }

}
