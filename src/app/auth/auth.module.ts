import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { ResetComponent } from './reset-pass/reset.component';
import { RequestResetPasswordComponent } from './request-reset-password/request-reset-password.component';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes: Routes = [
  {path:'', redirectTo:'login' , pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'resetPassword',component:ResetComponent},
  {path:'register',component:RegisterComponent},
  {path:'change-password',component:ChangePasswordComponent},



];

@NgModule({
  imports:[
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports:[
   CommonModule],
  declarations:[AuthComponent,LoginComponent,ResetComponent,RequestResetPasswordComponent,RegisterComponent,VerifyComponent]
})
export class AuthModule { }
