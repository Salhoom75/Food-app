import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', component: UserComponent },
  {
    path: 'recipes',
    canActivate: [],
    loadChildren: () =>
      import('./modules/user-recipes/user-recipes.module').then(
        (m) => m.UserRecipesModule
      ),
  },
  {
    path: 'favorites',
    canActivate: [],
    loadChildren: () =>
      import('./modules/favorites/favorites.module').then(
        (m) => m.FavoritesModule
      ),
  },
];
@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
  declarations: [UserComponent],
})
export class UserModule {}
