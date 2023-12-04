import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RequestResetPasswordComponent } from 'src/app/auth/request-reset-password/request-reset-password.component';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.scss']
})
export class AddEditCategoryComponent {
  categoryName:string='';
  constructor(public dialogRef:MatDialogRef<AddEditCategoryComponent>) { }

  ngOnInit() {
  }
  onClose(){
    this.dialogRef.close();
  }
}
