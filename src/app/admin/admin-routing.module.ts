import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { HomeComponent } from '../shared/Home/Home.component';

const routes: Routes = [
//{ path: '', component: AdminComponent },
 { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) },
 { path: 'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule) },
{ path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule) },
{path:'home', component:HomeComponent},

{path:'', redirectTo:'home',pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
