import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, Product } from '../services/product.service';

@Component({
  selector: 'app-admin-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="admin-form">
      <h2>{{ editing ? 'Edit Product' : 'Add Product' }}</h2>

      <form *ngIf="!editing || productLoaded" (ngSubmit)="save()">
        <input [(ngModel)]="product.name" name="name" placeholder="Name" required />
        <textarea [(ngModel)]="product.description" name="description" placeholder="Description"></textarea>
        <input [(ngModel)]="product.price" name="price" type="number" placeholder="Price" />
        <input [(ngModel)]="product.image" name="image" placeholder="Image URL" />

        <select [(ngModel)]="product.categoryId" name="categoryId" required>
          <option value="">Select a category</option>
          <option *ngFor="let cat of categories" [value]="cat.id">
            {{ cat.name }}
          </option>
        </select>

        <button type="submit">{{ editing ? 'Update' : 'Create' }}</button>
      </form>

      <p *ngIf="editing && !productLoaded">Loading product...</p>
    </section>
  `
})
export class AdminFormComponent implements OnInit {
  product: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    image: '',
    categoryId: 0
  };

  categories: { id: number; name: string }[] = [];

  editing = false;
  productLoaded = false;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productService.getCategories().subscribe(data => {
      this.categories = data;
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.editing = true;
      this.productService.getProductById(id).subscribe(p => {
        this.product = p;
        this.productLoaded = true;
      });
    }
  }

  save() {
    if (this.editing) {
      this.productService.updateProduct(this.product).subscribe(() => {
        this.router.navigate(['/admin']);
      });
    } else {
      this.productService.addProduct(this.product).subscribe(() => {
        this.router.navigate(['/admin']);
      });
    }
  }
}
