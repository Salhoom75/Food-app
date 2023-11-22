import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SharedModule } from '../shared/shared.module';
import { ResetComponent } from './reset-pass/reset.component';
import { RequestResetPasswordComponent } from './request-reset-password/request-reset-password.component';

const routes: Routes = [
  {path:'', redirectTo:'login' , pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'resetPassword',component:ResetComponent},


];

@NgModule({
  imports:[
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports:[
   CommonModule],
  declarations:[AuthComponent,LoginComponent,ResetComponent,RequestResetPasswordComponent]
})
export class AuthModule { }
