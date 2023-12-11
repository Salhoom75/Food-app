import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import {
  IRecipeTable,
  IRecipe,
  Itag,
} from 'src/app/admin/categories/models/recipe';
import { RecipeService } from 'src/app/admin/categories/services/recipe.service';
import { HelperService } from 'src/app/services/helper.service';
import { RecipeDetailsComponent } from '../recipe-details/recipe-details.component';
import { FavoritesService } from '../../favorites/services/favorites.service';

@Component({
  selector: 'app-user-recipes',
  templateUrl: './user-recipes.component.html',
  styleUrls: ['./user-recipes.component.css'],
})
export class UserRecipesComponent implements OnInit {
  searchValue: string = '';
  pageSize: number = 25;
  pageNumber: number = 1;
  tableResponse: IRecipeTable | undefined;
  tableData: IRecipe[] = [];
  recipeData: any;
  tags: Itag[] = [];
  tagId: any;
  constructor(
    private _ToastrService: ToastrService,
    private _RecipeService: RecipeService,
    private _HelperService: HelperService,
    public dialog: MatDialog,
    private _FavoritesService:FavoritesService,
  ) {}

  ngOnInit() {
    this.getAllTags();
    this.getTableData();
  }

  openDialog(recipeItem: IRecipe) {
    const dialogRef = this.dialog.open(RecipeDetailsComponent, {
      data: recipeItem,
      width: '40%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      if (result) {
        console.log(result);
        this.addToFav(result)
      }

    });
  }
 addToFav(id:number){
this._FavoritesService.onAddToFav(id).subscribe({
  next:(res)=>{
console.log(res);

  },
  error:(err)=>{
console.log(err);

  },
  complete:()=>{
this._ToastrService.success('Added to your Favorites', 'Success')
  }
})
 }
  getTableData() {
    let params = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      name: this.searchValue,
      tagId: this.tagId,
    };

    this._RecipeService.getRecipes(params).subscribe({
      next: (res: IRecipeTable) => {
        this.tableResponse = res;
        this.tableData = this.tableResponse?.data;
        console.log(this.tableData);
      },
    });
  }

  getAllTags() {
    this._HelperService.getTags().subscribe({
      next: (res) => {
        console.log(res);
        this.tags = res;
      },
    });
  }
}
