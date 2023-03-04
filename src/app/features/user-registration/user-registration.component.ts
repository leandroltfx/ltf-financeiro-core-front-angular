import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ltf-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  userRegistrationForm!: FormGroup;
  patterEmail: RegExp = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
  maxLength: number = 80;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userRegistrationForm = this.buildUserRegistrationForm();
  }

  buildUserRegistrationForm(): FormGroup {
    return this.formBuilder.group(
      {
        userName: [null, [Validators.required, Validators.maxLength(this.maxLength)]],
        userMail: [null, [Validators.required, Validators.maxLength(this.maxLength), Validators.pattern(this.patterEmail)]],
        userPassword: [null, [Validators.required, Validators.maxLength(this.maxLength)]],
        confirmUserPassword: [null, [Validators.required, this.confirmationValidator]]
      }
    );
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.userRegistrationForm.controls.confirmUserPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.userRegistrationForm.controls.userPassword.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  registerUser(): void { 
    if (this.userRegistrationForm.valid) { }
  }

}
