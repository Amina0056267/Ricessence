import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CategoryService, Category } from '../../services/category.service';
import { ProductService, Product } from '../../services/product.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="category-header">
      <h1 *ngIf="categoryName">Category: {{ categoryName }}</h1>
    </section>

    <section class="product-grid">
      <div *ngFor="let product of filteredProducts" class="product-card">
        <img [src]="product.image" alt="{{ product.name }}" />
        <h2>{{ product.name }}</h2>
        <p>{{ product.description }}</p>
        <span>£{{ product.price }}</span>
      </div>
    </section>
  `,
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  filteredProducts: Product[] = [];
  categoryName: string = '';

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const categoryIdParam = this.route.snapshot.paramMap.get('id');
  
    this.categoryService.getCategories().subscribe(categories => {
      if (categoryIdParam) {
        const categoryId = Number(categoryIdParam);
        const category = categories.find(c => c.id === categoryId);
        if (category) {
          this.categoryName = category.name;
        }
      } else {
        this.categoryName = 'All';
      }
    });
  
    this.productService.getProducts().subscribe(products => {
      if (categoryIdParam) {
        const categoryId = Number(categoryIdParam);
        this.filteredProducts = products.filter(p => p.categoryId === categoryId);
      } else {
        this.filteredProducts = products;
      }
    });
  }
  
}
