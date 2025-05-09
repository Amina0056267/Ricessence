import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ProductService, Product } from '../services/product.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <button routerLink="/admin/new">+ Add New Product</button>

      <ul *ngIf="products.length > 0; else empty">
        <li *ngFor="let product of products">
          <strong>{{ product.name }}</strong>
          <button (click)="edit(product.id)">Edit</button>
          <button (click)="delete(product.id)">Delete</button>
        </li>
      </ul>

      <ng-template #empty>
        <p>No products available.</p>
      </ng-template>
    </section>
  `,
})
export class AdminDashboardComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  edit(id: number) {
    this.router.navigate(['/admin/edit', id]);
  }

  delete(id: number) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }
}
