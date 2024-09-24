import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject, OnInit, Signal, computed, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
export interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string >;
}
@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule],
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent implements OnInit {
  emailValidator = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  private http = inject(HttpClient);
  private formBuilder = inject(FormBuilder);
  loginForm!: FormGroup;

    isSubmitting = signal(false);
  ngOnInit(): void {
    this.loginForm = this.initializeForm();
  }
  private initializeForm() {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email,Validators.pattern(this.emailValidator)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  onSubmit() {
    if (this.loginForm.valid && !this.isSubmitting()) {
      this.isSubmitting.set(true);

      this.http.post("https://api.weightgurus.com/v3/account/login", this.loginForm.value)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.error('Login failed', error);
            alert('Login failed: ' + error.message);
            this.isSubmitting.set(false);

            return of(null);
          })
        )
        .subscribe((res: any) => {
          this.isSubmitting.set(false);
          if (res) {
            alert('Login success');
          } else {
            alert('Invalid credentials or login failed.');
          }
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  get emailControl() {
    return this.loginForm.get('email') as FormControl;
  }
  get passwordControl() {
    return this.loginForm.get('password') as FormControl;
  }
}










