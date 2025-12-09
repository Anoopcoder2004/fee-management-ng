import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';
  showPassword: boolean = false; // toggle state

  constructor(private router: Router) {}

  login() {
    const adminUser = 'admin';
    const adminPass = 'admin123';

    if (this.username === adminUser && this.password === adminPass) {
      localStorage.setItem('adminLoggedIn', 'true');
      this.router.navigate(['/dashboard']);
    } else {
      this.error = 'Invalid username or password';
    }
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}

