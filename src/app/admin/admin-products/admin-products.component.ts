import { Component } from '@angular/core';
import { ProductService } from '../../product.service';
import { Observable } from 'rxjs';
import { Products } from '../../models/app-products';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.scss'
})

export class AdminProductsComponent {
  products$: Observable<Products[]>;

  constructor(private productService: ProductService) {
    this.products$ = this.productService.getAll()
  }

}
