import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';
import { AddEditRecipesComponent } from './compontents/add-edit-recipes/add-edit-recipes.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    RecipesComponent,AddEditRecipesComponent
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,SharedModule
  ]
})
export class RecipesModule { }
