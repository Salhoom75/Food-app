import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IRecipe } from 'src/app/admin/categories/models/recipe';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RecipeDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: IRecipe,) {}

  ngOnInit() {
    console.log(this.data);
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }


}
