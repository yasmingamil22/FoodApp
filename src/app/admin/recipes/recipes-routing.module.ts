import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from './recipes.component';
import { AddEditRecipesComponent } from './compontents/add-edit-recipes/add-edit-recipes.component';

const routes: Routes = [
  { path: '', component: RecipesComponent },
  {path:'add' , component:AddEditRecipesComponent},
  {path:'edit/:id' , component:AddEditRecipesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule { }
