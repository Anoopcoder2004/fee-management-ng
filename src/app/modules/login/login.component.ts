import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth-service.service';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  isLoginMode: boolean = true; // toggle between login/register
  username: string = '';
  password: string = '';
  showPassword: boolean = false;
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = '';
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: () => this.router.navigate(['/dashboard']),
      error: () => (this.error = 'Invalid username or password')
    });
  }

  register() {
    this.authService.register(this.username, this.password).subscribe({
      next: () => {
        alert('Registration successful!');
        this.toggleMode(); // switch to login mode after registration
      },
      error: (err) => {
        this.error = err?.error?.message || 'Registration failed';
      }
    });
  }
}
