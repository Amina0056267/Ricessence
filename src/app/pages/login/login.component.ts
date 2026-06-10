import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="login-container">
      <h2>Admin Login</h2>
      <form (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            [(ngModel)]="password"
            name="password"
            required
            placeholder="Enter admin password"
          />
        </div>
        <button type="submit">Log In</button>
        <p *ngIf="errorMessage" class="error-msg">{{ errorMessage }}</p>
      </form>
    </section>
  `,
  styles: [`
    .login-container {
      max-width: 400px;
      margin: 4rem auto;
      padding: 2rem;
      border: 1px solid #ddd;
      border-radius: 8px;
      background: #fafafa;
    }
    .form-group {
      margin-bottom: 1.5rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: bold;
    }
    input {
      width: 100%;
      padding: 0.5rem;
      box-sizing: border-box;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      width: 100%;
      padding: 0.75rem;
      background: #333;
      color: #fff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background: #555;
    }
    .error-msg {
      color: red;
      margin-top: 1rem;
      text-align: center;
    }
  `]
})
export class LoginComponent {
  password = '';
  errorMessage = '';
  private authService = inject(AuthService);
  private router = inject(Router);

  onSubmit() {
    if (!this.password) return;
    this.authService.login(this.password).subscribe({
      next: () => {
        this.router.navigate(['/admin']);
      },
      error: () => {
        this.errorMessage = '❌ Invalid password';
      }
    });
  }
}
