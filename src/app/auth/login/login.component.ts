import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { RequestResetPasswordComponent } from '../request-reset-password/request-reset-password.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  Message: string = '';
  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,16}$'
      ),
    ]),
  });

  constructor(
    private _AuthService: AuthService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private route: Router
  ) {}

  ngOnInit() {}

  onSubmit(data: FormGroup) {
    console.log(data);
    this._AuthService.onLogin(data.value).subscribe({
      next: (res:any) => {
        console.log(res);
        localStorage.setItem('userToken', res.token);
        this._AuthService.getProfile()
      },
      error: (err: any) => {
        console.log();
        this.toastr.error('Error', 'Incorrect');
      },
      complete: () => {
        this.route.navigate(['/dashboard']);

        this.toastr.success('Hello world!', 'Toastr fun!');
      },
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RequestResetPasswordComponent, {
      data: {},
      width: '40%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        this.onReuestResetPassword(result);
      }
    });
  }

  onReuestResetPassword(data: string) {
    this._AuthService.onReuestResetPassword(data).subscribe({
      next: (res: any) => {
        console.log(res);
        (this.Message = res.message), console.log(this.Message);
        localStorage.setItem('userToken', res.token);
        this._AuthService.getProfile();
      },
      error: (err) => {
        console.log(err.error.message);
        this.toastr.error(err.error.message, 'Error!');
      },
      complete: () => {
        this.toastr.success(this.Message, 'Succeess');
        this.route.navigate(['/auth/resetPassword']);
      },
    });
  }
}
