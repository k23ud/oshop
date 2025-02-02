import { Injectable } from '@angular/core';
import { AngularFireDatabase, QueryFn } from '@angular/fire/compat/database';
import { map, Observable } from 'rxjs';
import { Products } from './models/app-products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: any) {
    return this.db.list('/products').push(product);
  }

  getAll(): Observable<Products[]> {
    return this.db.list<Products>('/products')
      .snapshotChanges()
      .pipe(
        map(changes =>
          changes.map(p => ({
            $key: p.payload.key || '',
            title: p.payload.val()?.title || '',
            price: p.payload.val()?.price || 0,  // Changed to 0 as default for number
            category: p.payload.val()?.category || '',
            imageUrl: p.payload.val()?.imageUrl || ''
          }))
        )
      );
  }

  // product.service.ts
  get(productId: string): Observable<Products> {
    return this.db.object<Products>('/products/' + productId)
      .snapshotChanges()
      .pipe(
        map(p => {
          const val = p.payload.val();
          return {
            $key: p.payload.key || '',
            title: val?.title || '',
            price: val?.price || 0,
            category: val?.category || '',
            imageUrl: val?.imageUrl || ''
          };
        })
      );
  }
}
