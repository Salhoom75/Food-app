import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
SharedModule
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
