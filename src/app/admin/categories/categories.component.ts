import { Component, OnInit } from '@angular/core';
import { CategoryService } from './services/category.service';
import { iCategory, iCategoryTable } from './models/category';
import { PageEvent } from '@angular/material/paginator';
import { AddEditCategoryComponent } from './components/add-edit-category/add-edit-category.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  searchValue: string = '';
  pageSize: number = 5;
  pageNumber: number = 1;
  tableResponse: iCategoryTable | undefined;
  tableData: iCategory[] | undefined = [];
  constructor(private _CategoryService: CategoryService, private dialog:MatDialog, private _ToastrService:ToastrService) {}

  ngOnInit() {
    this.getTableData();
  }

  search(term:string){
    console.log(term);
    this.searchValue=term
    this.getTableData()
    
  }
  getTableData() {
    let params = {
      pageSize: this.pageSize,
      pageNumber: this.pageNumber,
      name: this.searchValue,
    };

    this._CategoryService.getCategories(params).subscribe({
      next: (res) => {
        // console.log(res);
        this.tableResponse = res;
        this.tableData = this.tableResponse?.data;
      },
    });
  }
  handlePageEvent(e: PageEvent) {
    console.log(e);
    // this.tableResponse?.totalNumberOfRecords= e.length;
    this.pageNumber = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getTableData();
    // this.pageEvent = e;
    // this.length = e.length;
    // this.pageSize = e.pageSize;
    // this.pageIndex = e.pageIndex;
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      data: {},
      width: '40%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.onAddNewCategory(result);
      }
    });
  }

  openDeleteDialog(categoryData:any): void {
    console.log(categoryData);
    
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: categoryData,
      width: '40%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        console.log(result.id);
        this.onDeleteCategory(result.id)
        
      }
    });
  }
  onAddNewCategory(data:string){
    this._CategoryService.addCategory(data).subscribe({
      next:(res)=>{
        console.log(res);
        
      }, error:(err)=>{
        console.log(err);
        
      }, complete:()=>{
       this._ToastrService.success('Category Added Successfully','ok');
       this.getTableData();
      }

    })
  }

  onDeleteCategory(id:number){
    this._CategoryService.deleteCategory(id).subscribe({
      next:(res)=>{
        console.log(res);
        
      }, error:(err)=>{
        console.log(err);
        
      }, complete:()=>{
       this._ToastrService.success('Category deleted Successfully','ok');
       this.getTableData();
      }

    })
  }
}
