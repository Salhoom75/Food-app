import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  {path:'', component:AdminComponent},
  {path:'recipes', loadChildren: () => import('./reciepes/reciepes.module').then(m => m.ReciepesModule)},
  {path:'categories', loadChildren: () => import('./categories/categories.module').then(m => m.CategoriesModule)},
  {path:'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},

];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [AdminComponent]
})
export class AdminModule { }
