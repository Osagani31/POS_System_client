import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CookieManagerService } from '../../services/cookie-manager.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  hidePassword = true;
  hideConfirmPassword = true;
  isLoading = false;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private cookieManager: CookieManagerService
  ) {
    this.form = this.formBuilder.group({
      fullName: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[A-Za-z][A-Za-z\s]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)]],
      confirmPassword: ['', [Validators.required, this.passwordMatchValidator]],
      acceptTerms: [false, [Validators.requiredTrue]]
    });

    this.form.controls['password'].valueChanges.subscribe(() => {
      this.form.controls['confirmPassword'].updateValueAndValidity({ onlySelf: true });
    });
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.parent?.get('password')?.value;
    if (!control.value || !password || control.value === password) {
      return null;
    }

    return { passwordMismatch: true };
  }

  signup(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.cookieManager.setToken('token', btoa(JSON.stringify(this.form.value)));
    this.router.navigateByUrl('/dashboard/customers').finally(() => {
      this.isLoading = false;
    });
  }
}