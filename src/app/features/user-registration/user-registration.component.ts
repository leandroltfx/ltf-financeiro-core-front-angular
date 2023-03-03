import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ltf-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;
  userRegistrationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userRegistrationForm = this.buildUserRegistrationForm();
  }

  buildUserRegistrationForm(): FormGroup {
    return this.formBuilder.group(
      {
        userName: [null, [Validators.required]],
        userMail: [null, [Validators.required]],
        userPassword: [null, [Validators.required]],
        confirmUserPassword: [null, [Validators.required]]
      }
    );
  }

  registerUser(): void { 
    if (this.userRegistrationForm.valid) { }
  }

}
