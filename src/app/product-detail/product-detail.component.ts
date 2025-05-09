import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService, Product } from '../services/product.service';


@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section *ngIf="product" class="product-detail">
      <img [src]="product.image" alt="{{ product.name }}" />
      <div class="details">
        <h1>{{ product.name }}</h1>
        <p>{{ product.description }}</p>
        <strong>£{{ product.price }}</strong>
      </div>
    </section>
    <p *ngIf="!product">Loading...</p>
  `,
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProducts().subscribe(products => {
      this.product = products.find(p => p.id === id);
    });
  }
}
