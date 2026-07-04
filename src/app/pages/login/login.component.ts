import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';

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
      margin: 6rem auto;
      padding: 3rem 2.5rem;
      border: 1px solid var(--color-border-thin);
      border-radius: 4px;
      background: #FFFFFF;
      box-shadow: 0 10px 25px rgba(60, 42, 33, 0.03);
    }
    h2 {
      font-family: var(--font-serif);
      font-size: 2.2rem;
      margin-bottom: 2rem;
      text-align: center;
      color: var(--color-brand-brown);
    }
    .form-group {
      margin-bottom: 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    label {
      font-family: var(--font-sans);
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--color-brand-brown);
    }
    input {
      width: 100%;
      padding: 0.75rem 1rem;
      box-sizing: border-box;
      border: 1px solid var(--color-border-thin);
      border-radius: 4px;
      font-family: var(--font-sans);
      font-size: 0.9rem;
      outline: none;
      transition: border-color 0.2s ease;
    }
    input:focus {
      border-color: var(--color-brand-sand);
    }
    button {
      width: 100%;
      padding: 0.85rem;
      background: var(--color-brand-brown);
      color: #FFF;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-family: var(--font-sans);
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      transition: background-color 0.2s ease;
    }
    button:hover {
      background: var(--color-brand-orange);
    }
    .error-msg {
      color: var(--color-brand-burgundy);
      margin-top: 1.25rem;
      text-align: center;
      font-size: 0.9rem;
      font-weight: 500;
    }
  `]
})
export class LoginComponent {
  password = '';
  errorMessage = '';
  private authService = inject(AuthService);
  private router = inject(Router);
  private toastService = inject(ToastService);

  onSubmit() {
    if (!this.password) return;
    this.authService.login(this.password).subscribe({
      next: () => {
        this.toastService.success('Admin login successful.');
        this.router.navigate(['/admin']);
      },
      error: () => {
        this.errorMessage = 'Invalid password';
        this.toastService.error('Invalid password.');
      }
    });
  }
}
