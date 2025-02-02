import { Injectable } from '@angular/core';
import { AngularFireDatabase, QueryFn } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { Category } from './models/app-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories(): Observable<Category[]> {
    const queryFn: QueryFn = ref => ref.orderByChild('name');
    return this.db.list<Category>('/categories', queryFn)
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(c => ({
            $key: c.payload.key || '', // Convert null to empty string
            name: c.payload.val()?.name || '' // Safely access name
          }))
        )
      );
  }
}
