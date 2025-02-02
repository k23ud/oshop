// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  loginWithGoogle() {
    this.auth.loginWithGoogle();
    // .subscribe({
    //   next: () => {
    //     this.router.navigate(['/']);
    //   },
    //   error: (error) => {
    //     console.error('Login error:', error);
    //   }
    // })
  }

}
