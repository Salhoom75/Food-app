import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponent } from './shared.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule, HttpClientModule, ReactiveFormsModule,
  ],
  exports:[
     CommonModule, HttpClientModule, ReactiveFormsModule,

  ],
  declarations: [SharedComponent]
})
export class SharedModule { }
