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

import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponent ],
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
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('deve criar o componente', () => {
    expect(component).toBeTruthy();
  });

  it('deve gerar erro de "pattern" no campo userMail se não estiver no padrão', () => {

    component.forgotPasswordForm = component.buildForgotPasswordForm();

    component.forgotPasswordForm.controls.userMail.setValue('userMail@email');

    expect(component.forgotPasswordForm.controls.userMail.errors?.pattern).toBeTruthy();
    expect(component.forgotPasswordForm.controls.userMail.errors?.required).toBeFalsy();
  });

  it('deve gerar erro de "required" no campo userMail se não estiver preenchido', () => {

    component.forgotPasswordForm = component.buildForgotPasswordForm();

    component.forgotPasswordForm.controls.userMail.setValue('');

    expect(component.forgotPasswordForm.controls.userMail.errors?.pattern).toBeFalsy();
    expect(component.forgotPasswordForm.controls.userMail.errors?.required).toBeTruthy();
  });

  it('não deve gerar erro de "pattern" se o campo userMail estiver preenchido no padrão', () => {

    component.forgotPasswordForm = component.buildForgotPasswordForm();

    component.forgotPasswordForm.controls.userMail.setValue('userMail@email.com');

    expect(component.forgotPasswordForm.controls.userMail.errors?.pattern).toBeFalsy();
    expect(component.forgotPasswordForm.controls.userMail.errors?.required).toBeFalsy();
  });
});
