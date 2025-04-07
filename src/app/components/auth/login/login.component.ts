import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.loginForm.valid) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      if (
        user.email === this.loginForm.value.email &&
        user.password === this.loginForm.value.password
      ) {
        localStorage.setItem('isLoggedIn', 'true');
        this.router.navigate(['/product-list']);
      } else {
        alert('Invalid email or password');
      }
    }
  }
}
