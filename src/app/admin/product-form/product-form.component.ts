import { Observable, take } from 'rxjs';
import { CategoryService } from './../../category.service';
import { Component } from '@angular/core';
import { ProductService } from '../../product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../models/app-category';
import { Products } from '../../models/app-products';



@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {
  categories$: Observable<Category[]>;
  product: Products = {
    title: '',
    price: 0,
    category: '',
    imageUrl: '',
    $key: ''
  };


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {

    this.categories$ = categoryService.getCategories();

    let id = this.route.snapshot.paramMap.get('id');
    if(id) {
      this.productService.get(id)
        .pipe(take(1))  // Use pipe for take operator
        .subscribe(p => this.product = p);
    }
  }

  save(product: any) {
    if (product.category) {
      this.productService.create(product);
      this.router.navigate(['/admin/products']);
    }
  }
}

