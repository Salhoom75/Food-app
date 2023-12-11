import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserRecipesComponent } from './user-recipes/user-recipes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';

const routes: Routes = [
  {path:'', component:UserRecipesComponent}
]

@NgModule({
  declarations: [UserRecipesComponent,RecipeDetailsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class UserRecipesModule { }
