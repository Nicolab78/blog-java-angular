import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService, RegisterRequest } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class RegisterComponent {
  userData: RegisterRequest = {
    username: '',
    email: '',
    password: ''
  };
  
  confirmPassword = '';
  error: string | null = null;
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.userData.username || !this.userData.email || !this.userData.password) {
      this.error = 'Veuillez remplir tous les champs';
      return;
    }

    if (this.userData.password !== this.confirmPassword) {
      this.error = 'Les mots de passe ne correspondent pas';
      return;
    }

    this.loading = true;
    this.error = null;

    this.authService.register(this.userData).subscribe({
      next: (response) => {
        console.log('Success:', response);
        this.loading = false;
        this.router.navigate(['/posts']);
      },
      error: (error) => {
        this.loading = false;
        this.error = 'Erreur lors de l\'inscription';
      }
    });
  }
}