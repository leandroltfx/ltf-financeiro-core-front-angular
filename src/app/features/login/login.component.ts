import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

import { LoginService } from './login.service';

@Component({
  selector: 'ltf-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  passwordVisible: boolean = false;
  loginForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private nzMessageService: NzMessageService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.buildLoginForm();
  }

  buildLoginForm(): FormGroup {
    return this.formBuilder.group(
      {
        userMail: [null, [Validators.required]],
        userPassword: [null, [Validators.required]]
      }
    );
  }

  login(): void { 
    if (this.loginForm.valid) {
      this.loginService.login(
        this.loginForm.controls.userMail.value,
        this.loginForm.controls.userPassword.value
      ).subscribe(
        dataResult => {
          this.nzMessageService.success(dataResult.message);
          this.router.navigate(['/home']);
        },
        dataError => {
          this.nzMessageService.error(dataError.error.message);
        }
      );
    }
  }

}
