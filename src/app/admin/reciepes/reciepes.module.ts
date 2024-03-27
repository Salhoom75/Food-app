import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReciepesComponent } from './reciepes.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditRecipeComponent } from './components/add-edit-recipe/add-edit-recipe.component';
const routes: Routes = [
  { path: '', component: ReciepesComponent },
  { path: 'add', component: AddEditRecipeComponent },
  { path: 'edit/:id', component: AddEditRecipeComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [ReciepesComponent],
})
export class ReciepesModule {}
