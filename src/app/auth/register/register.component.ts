import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';
import { RequestResetPasswordComponent } from '../request-reset-password/request-reset-password.component';
import { VerifyComponent } from '../verify/verify.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({});
  constructor(
    private _AuthService: AuthService,
    private toastr: ToastrService,
    public dialog: MatDialog,
    private route: Router,
    private fp: FormBuilder
  ) {}

  ngOnInit() {
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.registerForm = this.fp.group(
      {
        userName: new FormControl(null, [Validators.required]),
        email: new FormControl(null, [Validators.required, Validators.email]),
        country: new FormControl(null, [Validators.required]),
        phoneNumber: new FormControl(null, [Validators.required]),
        profileImage: new FormControl(null),
        password: new FormControl(null, [
          Validators.required,
          Validators.pattern(
            '^(?=.[a-z])(?=.[A-Z])(?=.d)(?=.[@$!%?&])[A-Za-zd@$!%?&]{8,16}$'
          ),
        ]),
        confirmPassword: new FormControl(null, [
          Validators.required,
          Validators.pattern(
            '^(?=.[a-z])(?=.[A-Z])(?=.d)(?=.[@$!%?&])[A-Za-zd@$!%?&]{8,16}$'
          ),
        ]),
      },
      { validators: this.matchPasswords }
    );
  }

  imgSrc: any;
  Message: string = '';
  // registerForm = new FormGroup()

  matchPasswords(form: any) {
    let pass = form.get('password');
    let confirmPass = form.get('confirmPassword');
    if (pass.vale == confirmPass.value) {
      return null;
    } else {
      confirmPass.setErrors({
        invalid: 'password and repass not matching',
      });
      return { invalid: 'Error' };
    }
  }

  onSubmit(data: FormGroup) {
    let myData = new FormData();
    //     console.log(data.value);
    //     let myMap = new Map(Object.entries(data.value));

    // for (const [key,val] of myMap) {
    //   console.log(key,val);
    //   myData.append(key,data.value[key]);

    // }

    myData.append('userName', data.value.userName);
    myData.append('email', data.value.email);
    myData.append('phoneNumber', data.value.phoneNumber);
    myData.append('country', data.value.country);
    myData.append('password', data.value.password);
    myData.append('confirmPassword', data.value.confirmPassword);
    myData.append('profileImage', this.imgSrc, this.imgSrc.name);

    this._AuthService.onRegister(myData).subscribe({
      next: (res: any) => {
        console.log(res);
      },
      error: (err: any) => {
        console.log(err);
        this.toastr.error('Error', 'Incorrect');
      },
      complete: () => {
        this.openDialog();
        this.toastr.success('Hello world!', 'Toastr fun!');
      },
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(VerifyComponent, {
      data: {},
      width: '40%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log(result);
      if (result) {
        // this.onReuestResetPassword(result);
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

  files: File[] = [];

  onSelect(event: any) {
    console.log(event);
    this.imgSrc = event.addedFiles[0];
    console.log(this.imgSrc);

    this.files.push(...event.addedFiles);
  }

  onRemove(event: any) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }
}
