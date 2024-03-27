import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private toastr: ToastrService,
    private route: Router
  ) {}

  ngOnInit() {}
  changePassForm = new FormGroup({
    oldPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,16}$'
      ),
    ]),
    newPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,16}$'
      ),
    ]),
    confirmNewPassword: new FormControl(null, [
      Validators.required,
      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{8,16}$'
      ),
    ]),
  });

  onChangePass(data: FormGroup) {
    console.log(data);
    this._AuthService.onChangePassword(data.value).subscribe({
      next: (res: any) => {
        console.log(res);
        localStorage.setItem('userToken', res.token);
        this._AuthService.getProfile();
      },
      error: (err: any) => {
        console.log();
        this.toastr.error('Error', 'Incorrect');
      },
      complete: () => {
        this.route.navigate(['/dashboard/home']);

        this.toastr.success('Hello world!', 'Toastr fun!');
      },
    });
  }
}
