import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
  imports: [
    CommonModule, HttpClientModule, ReactiveFormsModule,ToastrModule,MatDialogModule, FormsModule
  ],
  exports:[
     CommonModule, HttpClientModule, ReactiveFormsModule,ToastrModule,MatDialogModule, FormsModule

  ],
  declarations: [SharedComponent]
})
export class SharedModule { }
