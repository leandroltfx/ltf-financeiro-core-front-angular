import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,

        NzCardModule,
        NzFormModule,
        NzInputModule,
        NzButtonModule,
        NzIconModule,
        NzDividerModule,
        NzTypographyModule
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve criar o formulário de login', () => {

    component.loginForm = component.buildLoginForm();

    expect(component.loginForm.controls.userMail).toBeTruthy();
    expect(component.loginForm.controls.userPassword).toBeTruthy();
  });

  it('deve realizar o roteamento para a home após o login', () => {

    const spyRouterNavigate = spyOn(router, 'navigate');

    component.loginForm = component.buildLoginForm();

    component.loginForm.controls.userMail.setValue('user@mail.com');
    component.loginForm.controls.userPassword.setValue('asd123');

    component.login();

    expect(spyRouterNavigate).toHaveBeenCalled();
  });

  it('não deve realizar o roteamento para a home após o login se o email do formulário não estiver preenchido', () => {

    const spyRouterNavigate = spyOn(router, 'navigate');

    component.loginForm = component.buildLoginForm();

    component.loginForm.controls.userMail.setValue('');
    component.loginForm.controls.userPassword.setValue('asd123');

    component.login();

    expect(spyRouterNavigate).not.toHaveBeenCalled();
  });

  it('não deve realizar o roteamento para a home após o login se a senha do formulário não estiver preenchido', () => {

    const spyRouterNavigate = spyOn(router, 'navigate');

    component.loginForm = component.buildLoginForm();

    component.loginForm.controls.userMail.setValue('user@mail.com');
    component.loginForm.controls.userPassword.setValue('');

    component.login();

    expect(spyRouterNavigate).not.toHaveBeenCalled();
  });

  it('não deve realizar o roteamento para a home após o login se o formulário não estiver preenchido', () => {

    const spyRouterNavigate = spyOn(router, 'navigate');

    component.loginForm = component.buildLoginForm();

    component.loginForm.controls.userMail.setValue('');
    component.loginForm.controls.userPassword.setValue('');

    component.login();

    expect(spyRouterNavigate).not.toHaveBeenCalled();
  });
});
