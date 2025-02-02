// auth.service.ts
import { Injectable } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { Observable, of, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { browserPopupRedirectResolver, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { AppUser } from '../models/app-user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null>;

  constructor(
    private userService: UserService,
    private auth: Auth,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.user$ = new Observable((subscriber) => {
      return this.auth.onAuthStateChanged(subscriber);
    });
  }

  async loginWithGoogle() {
      let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
      localStorage.setItem('returnUrl', returnUrl);
      return await signInWithPopup(this.auth, new GoogleAuthProvider(), browserPopupRedirectResolver);
  }

  async logout() { // async => this function always returns a promise all right
      await this.auth.signOut(); // wait for the signOut function to be parsed or excuted
  }

  get appUser(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap(user => {
        if (!user) {
          this.router.navigate(['/login']);
          return of({ name: '', email: '', isAdmin: false });
        }
        return this.userService.get(user.uid);
      }));
  }
}
