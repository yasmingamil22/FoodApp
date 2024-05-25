import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-have-code',
  templateUrl: './have-code.component.html',
  styleUrls: ['./have-code.component.css']
})
export class HaveCodeComponent  {

  constructor(
    public dialogRef: MatDialogRef<HaveCodeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}


  onNoClick(): void {
    this.dialogRef.close();
  }

  

}
