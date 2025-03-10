import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent {
  credentials = {
    email: '',
    password: ''
  };

  // Predefined credentials
  correctEmail = 'doctor@clinic.com';
  correctPassword = '12345678';

  // Validation message
  errorMessage = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.credentials.email === 'doctor@clinic.com' && this.credentials.password === '12345678') {
      // Redirect to the doctor dashboard upon successful login
      this.router.navigate(['./dashboard']);
    } else {
      this.errorMessage = 'Invalid email or password.';
    }
  }
}
