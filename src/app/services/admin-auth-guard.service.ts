import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, map, switchMap, of } from 'rxjs';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {
  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router
  ) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser.pipe(
      map(appUser => {
        if (!appUser?.isAdmin) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      }))
  }
}
