import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule } from '@angular/material/dialog';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { AddEditRecipeComponent } from '../admin/reciepes/components/add-edit-recipe/add-edit-recipe.component';
@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule,
    MatDialogModule,
    FormsModule,
    RouterModule,
    MatPaginatorModule,
    NgxDropzoneModule,
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule,
    MatDialogModule,
    FormsModule,
    NavbarComponent,
    SidebarComponent,
    RouterModule,
    HomeComponent,
    MatPaginatorModule,
    NgxDropzoneModule,
  ],
  declarations: [
    SharedComponent,
    NavbarComponent,
    SidebarComponent,
    HomeComponent,
    DeleteDialogComponent,
    AddEditRecipeComponent,
  ],
})
export class SharedModule {}
