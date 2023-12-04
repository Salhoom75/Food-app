import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from '../shared/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      {
        path: 'admin',
        // canActivate: [],
        loadChildren: () =>
          import('../admin/admin.module').then((m) => m.AdminModule),
      },
      {
        path: 'user',
        // canActivate: [],
        loadChildren: () =>
          import('../user/user.module').then((m) => m.UserModule),
      },
    ],
  },
];
@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(routes)],
})
export class DashboardModule {}
