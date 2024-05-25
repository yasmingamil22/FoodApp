import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { AddEditCategoryComponent } from './compontents/add-edit-category/add-edit-category.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ViewCategoryComponent } from './compontents/ViewCategory/ViewCategory.component';


@NgModule({
  declarations: [
    CategoriesComponent,
    AddEditCategoryComponent,
    ViewCategoryComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule
  ]
})
export class CategoriesModule { }
