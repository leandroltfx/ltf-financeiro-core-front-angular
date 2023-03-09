import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { of } from 'rxjs';

import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let router: Router;
  let loginService: LoginService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        BrowserAnimationsModule,

        NzCardModule,
        NzFormModule,
        NzInputModule,
        NzButtonModule,
        NzIconModule,
        NzDividerModule,
        NzTypographyModule,
        NzMessageModule
      ],
      providers: [
        LoginService
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    router = TestBed.inject(Router);
    loginService = TestBed.inject(LoginService);

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
    const spyLoginService = spyOn(loginService, 'login').and.returnValue(
      of(
        {
          message: 'Login efetuado com sucesso!'
        }
      )
    );

    component.loginForm = component.buildLoginForm();

    component.loginForm.controls.userMail.setValue('user@mail.com');
    component.loginForm.controls.userPassword.setValue('asd123');

    component.login();

    expect(spyRouterNavigate).toHaveBeenCalled();
    expect(spyLoginService).toHaveBeenCalled();
    expect(spyLoginService).toHaveBeenCalledWith('user@mail.com', 'asd123');
  });

  it('não deve realizar o roteamento para a home após o login se o email do formulário não estiver preenchido', () => {

    const spyRouterNavigate = spyOn(router, 'navigate');
    const spyLoginService = spyOn(loginService, 'login');

    component.loginForm = component.buildLoginForm();

    component.loginForm.controls.userMail.setValue('');
    component.loginForm.controls.userPassword.setValue('asd123');

    component.login();

    expect(spyRouterNavigate).not.toHaveBeenCalled();
    expect(spyLoginService).not.toHaveBeenCalled();
  });

  it('não deve realizar o roteamento para a home após o login se a senha do formulário não estiver preenchido', () => {

    const spyRouterNavigate = spyOn(router, 'navigate');
    const spyLoginService = spyOn(loginService, 'login');

    component.loginForm = component.buildLoginForm();

    component.loginForm.controls.userMail.setValue('user@mail.com');
    component.loginForm.controls.userPassword.setValue('');

    component.login();

    expect(spyRouterNavigate).not.toHaveBeenCalled();
    expect(spyLoginService).not.toHaveBeenCalled();
  });

  it('não deve realizar o roteamento para a home após o login se o formulário não estiver preenchido', () => {

    const spyRouterNavigate = spyOn(router, 'navigate');
    const spyLoginService = spyOn(loginService, 'login');

    component.loginForm = component.buildLoginForm();

    component.loginForm.controls.userMail.setValue('');
    component.loginForm.controls.userPassword.setValue('');

    component.login();

    expect(spyRouterNavigate).not.toHaveBeenCalled();
    expect(spyLoginService).not.toHaveBeenCalled();
  });
});
