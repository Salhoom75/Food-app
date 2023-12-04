import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  resetForm= new FormGroup({
    email: new FormControl(null, [Validators.required , Validators.email]),
    password: new FormControl(null, [Validators.required , Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$')]),
    confirmPassword: new FormControl(null , [Validators.required , Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$')]),
    seed: new FormControl(null,[ Validators.required])
 })
  
 constructor(private _AuthService: AuthService, private toastr: ToastrService,) { }
  ngOnInit() {
  }

  onSubmit(data:FormGroup){
    console.log(data);
    this._AuthService.onResetPassword(data.value).subscribe({
      next:(res: any)=>{
        console.log(res)
      },
      error: (err: any)=>{
      console.log();
      this.toastr.error('Error', 'Incorrect');
        
      },
      complete:()=>{
        this.toastr.success('Hello world!', 'Toastr fun!');
      }
    })
  }

}
