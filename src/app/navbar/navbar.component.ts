import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { AppUser } from '../models/app-user';
import { Subscription } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit, OnDestroy {
  appUser: AppUser | null = null;
  isMenuCollapsed = true;
  private subscription: Subscription | undefined;

  constructor(
    public auth: AuthService,  // Changed to public for template access
    private router: Router
  ) {}

  ngOnInit() {
    this.subscription = this.auth.appUser.subscribe(user => {
      this.appUser = user;
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  async logout() {
    try {
      await this.auth.logout();
      await this.router.navigate(['/']);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}
