import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { DeleteComponent } from './delete/delete.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {MatSelectModule} from '@angular/material/select';
import { HomeComponent } from './Home/Home.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { ViewRecipceComponent } from './view-recipce/view-recipce.component';
import { ConfirmPasswordComponent } from './confirm-password/confirm-password.component';




@NgModule({
  declarations: [
    SharedComponent, 
    SidebarComponent, 
    NavbarComponent,
    DeleteComponent,
    ChangePasswordComponent,
    HomeComponent,
    EditProfileComponent,
    ViewRecipceComponent,
    ConfirmPasswordComponent
    ],
  imports: [
    CommonModule,
    ReactiveFormsModule,

    NgxFileDropModule,RouterModule,FormsModule,
    MatMenuModule,MatIconModule,MatButtonModule,MatDialogModule,MatInputModule,MatFormFieldModule,
    MatPaginatorModule,MatSelectModule
  ],
  exports:[NgxFileDropModule,ReactiveFormsModule,
    SidebarComponent,NavbarComponent,FormsModule, 
    MatMenuModule,MatIconModule,MatButtonModule,MatDialogModule,MatInputModule,MatFormFieldModule,
    MatPaginatorModule,MatSelectModule
  
  ]
})
export class SharedModule { }
