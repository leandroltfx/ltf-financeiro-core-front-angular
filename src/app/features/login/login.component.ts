import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router
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
      this.router.navigate(['/home']);
    }
  }

}
