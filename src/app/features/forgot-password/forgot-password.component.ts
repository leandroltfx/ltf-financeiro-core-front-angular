import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ltf-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm!: FormGroup;
  patterEmail: RegExp = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.buildForgotPasswordForm();
  }

  buildForgotPasswordForm(): FormGroup {
    return this.formBuilder.group(
      {
        userMail: [null, [Validators.required, Validators.pattern(this.patterEmail)]]
      }
    );
  }

  sendMail(): void { 
    if (this.forgotPasswordForm.valid) { }
  }

}
