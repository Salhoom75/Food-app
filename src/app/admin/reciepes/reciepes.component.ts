import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IRecipe, IRecipeTable, Itag } from '../categories/models/recipe';
import { RecipeService } from '../categories/services/recipe.service';
import { HelperService } from 'src/app/services/helper.service';


@Component({
  selector: 'app-reciepes',
  templateUrl: './reciepes.component.html',
  styleUrls: ['./reciepes.component.scss'],
})
export class ReciepesComponent implements OnInit {
  searchValue: string = '';
  pageSize: number = 25;
  pageNumber: number = 1;
  tableResponse: IRecipeTable | undefined;
  tableData: IRecipe[] = [];
  recipeData: any;
  tags: Itag[] = [];
  tagId:any;
  constructor(
    private dialog: MatDialog,
    private _ToastrService: ToastrService,
    private _RecipeService: RecipeService,
    private _HelperService: HelperService
  ) {}

  ngOnInit() {
    this.getAllTags();
    this.getTableData();
  }

  getTableData() {
    let params = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      name: this.searchValue,
    tagId: this.tagId,


    };

    this._RecipeService.getRecipes(params).subscribe({
      next: (res:IRecipeTable) => {
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
