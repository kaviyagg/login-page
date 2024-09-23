import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Add this line

@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, ReactiveFormsModule], // Add FormsModule and ReactiveFormsModule here
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.scss']
})
export class LoginpageComponent {
 emailValidator = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  loginForm: FormGroup;
  http = inject(HttpClient);


  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.createLoginForm();
  }

  createLoginForm() {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email,Validators.pattern(this.emailValidator)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.http.post("https://api.weightgurus.com/v3/account/login", this.loginForm.value).subscribe((res: any) => {
      if (res.result) {
        alert("login success");
      }
    });
  }
}
