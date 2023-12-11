import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ICategory,
  IRecipe,
  Itag,
} from 'src/app/admin/categories/models/recipe';
import { RecipeService } from 'src/app/admin/categories/services/recipe.service';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-add-edit-recipe',
  templateUrl: './add-edit-recipe.component.html',
  styleUrls: ['./add-edit-recipe.component.scss'],
})
export class AddEditRecipeComponent implements OnInit {
  imgSrc: any;
  [x: string]: any;
  tags: Itag[] = [];
  categories: ICategory[] = [];
  recipeId: any;
  isUpdatePage: boolean = false;
  recipeData: any;
  recipeForm = new FormGroup({
    name: new FormControl(null),
    description: new FormControl(null),
    price: new FormControl(null),
    tagId: new FormControl(null),
    categoriesIds: new FormControl(null),
  });
  constructor(
    private router: Router,
    private _HelperService: HelperService,
    private _RecipeService: RecipeService,
    private _ActivatedRoute: ActivatedRoute
  ) {
    console.log(_ActivatedRoute.snapshot.params['id']);
    this.recipeId = _ActivatedRoute.snapshot.params['id'];
    if (this.recipeId) {
      this.isUpdatePage = true;
      this.getRecipesById(this.recipeId);
    } else {
      this.isUpdatePage = false;
    }
  }

  ngOnInit() {
    this.getAllTags();
    this.getAllCategories();
  }

  getRecipesById(id: number) {
    this._RecipeService.getRecipesById(id).subscribe({
      next: (res) => {
        console.log(res);
        this.recipeData = res;
      },
      error: (err) => {},
      complete: () => {
        (this.imgSrc =
          'https://upskilling-egypt.com/' + this.recipeData.imagaPath),
          this.recipeForm.patchValue({
            name: this.recipeData?.name,
            price: this.recipeData?.price,
            description: this.recipeData?.description,
            tagId: this.recipeData?.tag.id,
            categoriesIds: this.recipeData?.category[0].id,
          });
      },
    });
  }

  onSubmit(data: FormGroup) {
    console.log(data.value);
    let myData = new FormData();
    myData.append('name', data.value.name);
    myData.append('price', data.value.price);
    myData.append('description', data.value.description);
    myData.append('tagId', data.value.tagId);
    myData.append('categoriesIds', data.value.categoriesIds);
    myData.append('recipeImage', this.imgSrc, this.imgSrc.name);


    if(this.recipeId){
      this._RecipeService.editRecipes(this.recipeId,myData).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {},
        complete: () => {
          this.router.navigate(['/dashboard/admin/recipes']);
        },
      });
    }else{
      this._RecipeService.addRecipes(myData).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {},
        complete: () => {
          this.router.navigate(['/dashboard/admin/recipes']);
        },
      });
    }
    }
   

  getAllTags() {
    this._HelperService.getTags().subscribe({
      next: (res) => {
        console.log(res);
        this.tags = res;
      },
    });
  }

  getAllCategories() {
    this._HelperService.getCategories().subscribe({
      next: (res) => {
        this.categories = res.data;
        console.log(res);
      },
    });
  }

  files: File[] = [];

  onSelect(event: any) {
    console.log(event);
    this.imgSrc = event.addedFiles[0];
    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
