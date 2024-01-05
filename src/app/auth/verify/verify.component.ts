import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css'],
})
export class VerifyComponent implements OnInit {
  verifyForm: FormGroup = new FormGroup({});
  constructor(
    public dialogRef: MatDialogRef<VerifyComponent>,
    private _AuthService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  email: string = '';

  ngOnInit() {
    this.verifyForm = this.fb.group({
      email: new FormControl(null, [Validators.required, Validators.email]),
      code: new FormControl(null, [Validators.required]),
    });
  }
  onClose() {
    this.dialogRef.close();
  }

  onSubmit(data: FormGroup) {
    console.log(data.value);
    this._AuthService.onVerifyAccount(data.value).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log();
      },
      complete: () => {
        this.onClose();
        this.router.navigate(['/auth/login']);
      },
    });
  }
}
