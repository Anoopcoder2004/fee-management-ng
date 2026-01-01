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
  email: string = '';
  password: string = '';
  showPassword: boolean = false;
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = '';
  }
  togglePassword() {
    this.showPassword = !this.showPassword;
  }
  login() {
    this.error = ''; // clear old error

    this.authService.login(this.email, this.password).subscribe({
      next: (res: any) => {
        console.log('Login response:', res); // 🔹 debug backend response

        // If backend sends a success field or status
        if (res?.message === 'Login successful' || res?.success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.error = 'Invalid email or password';
        }
      },
      error: (err) => {
        console.error('Login error:', err); // 🔹 debug error
        this.error = 'Invalid email or password';
      }
    });
  }

  register() {
    this.authService.register(this.email, this.password).subscribe({
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
