import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { catchError, of } from 'rxjs';
@Component({
  selector: 'app-me-health-login',
  standalone: true,
  imports: [ButtonModule,PasswordModule,ReactiveFormsModule],
  templateUrl: './me-health-login.component.html',
  styleUrl: './me-health-login.component.scss'
})

export class MeHealthLoginComponent {
  private formBuilder = inject(FormBuilder);
  private http = inject(HttpClient);
  loginForm!: FormGroup;
  emailValidator = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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
    if (this.loginForm.valid) {

      this.http.post("https://api.weightgurus.com/v3/account/login", this.loginForm.value)
        .pipe(
          catchError((error: HttpErrorResponse) => {
            console.error('Login failed', error);
            alert('Login failed: ' + error.message);
            return of(null);
          })
        )
        .subscribe((res: any) => {
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
