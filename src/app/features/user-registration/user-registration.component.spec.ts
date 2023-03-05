import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { UserRegistrationComponent } from './user-registration.component';

describe('UserRegistrationComponent', () => {
  let component: UserRegistrationComponent;
  let fixture: ComponentFixture<UserRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserRegistrationComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,

        NzCardModule,
        NzFormModule,
        NzInputModule,
        NzButtonModule,
        NzIconModule,
        NzTypographyModule,
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve criar o formulário de registro de usuário', () => {

    component.userRegistrationForm = component.buildUserRegistrationForm();

    expect(component.userRegistrationForm.controls.userName).toBeTruthy();
    expect(component.userRegistrationForm.controls.userMail).toBeTruthy();
    expect(component.userRegistrationForm.controls.userPassword).toBeTruthy();
    expect(component.userRegistrationForm.controls.confirmUserPassword).toBeTruthy();
  });

  it('deve gerar erro de "maxlength" no campo userName se ultrapassar o limite', () => {

    component.userRegistrationForm = component.buildUserRegistrationForm();

    component.userRegistrationForm.controls.userName.setValue(
      'userName userName userName userName userName userName userName userName userName userName userName '
    );

    expect(component.userRegistrationForm.controls.userName.errors?.maxlength).toBeTruthy();
    expect(component.userRegistrationForm.controls.userName.errors?.required).toBeFalsy();
  });

  it('não deve gerar erros se o campo userName for preenchido sem ultrapassar o limite', () => {

    component.userRegistrationForm = component.buildUserRegistrationForm();

    component.userRegistrationForm.controls.userName.setValue('userName');

    expect(component.userRegistrationForm.controls.userName.errors?.maxlength).toBeFalsy();
    expect(component.userRegistrationForm.controls.userName.errors?.required).toBeFalsy();
  });

  it('deve gerar erro de "required" se o campo userName não for preenchido', () => {

    component.userRegistrationForm = component.buildUserRegistrationForm();

    component.userRegistrationForm.controls.userName.setValue('');

    expect(component.userRegistrationForm.controls.userName.errors?.maxlength).toBeFalsy();
    expect(component.userRegistrationForm.controls.userName.errors?.required).toBeTruthy();
  });

  it('deve gerar erro de "pattern" no campo userMail se não estiver no padrão', () => {

    component.userRegistrationForm = component.buildUserRegistrationForm();

    component.userRegistrationForm.controls.userMail.setValue('userMail@email');

    expect(component.userRegistrationForm.controls.userMail.errors?.pattern).toBeTruthy();
    expect(component.userRegistrationForm.controls.userMail.errors?.required).toBeFalsy();
  });

  it('deve gerar erro de "required" no campo userMail se não estiver preenchido', () => {

    component.userRegistrationForm = component.buildUserRegistrationForm();

    component.userRegistrationForm.controls.userMail.setValue('');

    expect(component.userRegistrationForm.controls.userMail.errors?.pattern).toBeFalsy();
    expect(component.userRegistrationForm.controls.userMail.errors?.required).toBeTruthy();
  });

  it('não deve gerar erro de "pattern" se o campo userMail estiver preenchido no padrão', () => {

    component.userRegistrationForm = component.buildUserRegistrationForm();

    component.userRegistrationForm.controls.userMail.setValue('userMail@email.com');

    expect(component.userRegistrationForm.controls.userMail.errors?.pattern).toBeFalsy();
    expect(component.userRegistrationForm.controls.userMail.errors?.required).toBeFalsy();
  });

  it('deve gerar erro de "required" se o campo userPassword não estiver preenchido', () => {

    component.userRegistrationForm = component.buildUserRegistrationForm();

    component.userRegistrationForm.controls.userPassword.setValue('');

    expect(component.userRegistrationForm.controls.userPassword.errors?.required).toBeTruthy();
  });

  it('não deve gerar erro de "required" se o campo userPassword estiver preenchido', () => {

    component.userRegistrationForm = component.buildUserRegistrationForm();

    component.userRegistrationForm.controls.userPassword.setValue('asd123');

    expect(component.userRegistrationForm.controls.userPassword.errors?.required).toBeFalsy();
  });

  it('deve gerar erro de "confirm" se o campo confirmUserPassword não estiver igual ao userPassword', () => {

    component.userRegistrationForm = component.buildUserRegistrationForm();

    component.userRegistrationForm.controls.userPassword.setValue('asd123');
    component.userRegistrationForm.controls.confirmUserPassword.setValue('abc');

    expect(component.userRegistrationForm.controls.confirmUserPassword.errors?.confirm).toBeTruthy();
  });

  it('não deve gerar erro de "confirm" se o campo confirmUserPassword estiver igual ao userPassword', () => {

    component.userRegistrationForm = component.buildUserRegistrationForm();

    component.userRegistrationForm.controls.userPassword.setValue('asd123');
    component.userRegistrationForm.controls.confirmUserPassword.setValue('asd123');

    expect(component.userRegistrationForm.controls.confirmUserPassword.errors?.confirm).toBeFalsy();
  });
});
