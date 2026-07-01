
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  featuredProducts: Product[] = [];
  private productService = inject(ProductService);
  private cartService = inject(CartService);

  ngOnInit() {
    this.productService.getProducts().subscribe(products => {
      // Pull first 3 products dynamically to display as featured
      this.featuredProducts = products.slice(0, 3);
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    alert(`✨ ${product.name} has been added to your ritual cart.`);
  }
}