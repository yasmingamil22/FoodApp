import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetRequestComponent } from './components/reset-request/reset-request-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
  { path: '', component: AuthComponent },
  {path:'register',component:RegisterComponent},
  {path:'resetRequest',component:ResetRequestComponent},
  {path:'resetPassword',component:ResetPasswordComponent},

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
