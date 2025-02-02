import { Injectable } from '@angular/core';
import { User } from '@angular/fire/auth';
import { Database, ref, get, set } from '@angular/fire/database';
import { Observable, from, map, of } from 'rxjs';
import { AppUser } from '../models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private db: Database) { }

  async save(user: User) {
    const userRef = ref(this.db, `/users/${user.uid}`);
    const snapshot = await get(userRef);
    let isAdmin = false;

    if (snapshot.exists()) {
      const existingUser = snapshot.val() as AppUser;
      isAdmin = existingUser.isAdmin;
    }

    return from(set(userRef, {
      name: user.displayName,
      email: user.email,
      isAdmin: isAdmin
    }));
  }

  get(uid: string | undefined): Observable<AppUser> {
    if (!uid) {
      return of({ name: '', email: '', isAdmin: false });
    }

    const userRef = ref(this.db, `/users/${uid}`);
    return from(get(userRef)).pipe(
      map(snapshot => {
        if (snapshot.exists()) {
          return snapshot.val() as AppUser;
        }
        return { name: '', email: '', isAdmin: false };
      })
    );
  }
}
