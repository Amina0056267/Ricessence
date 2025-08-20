import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Product } from '../../services/product.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart: Product[] = [];
  total = 0;

  constructor(private cartService: CartService) {
    this.cart = this.cartService.getCart();
    this.updateTotal();
  }

  removeFromCart(id: number) {
    this.cartService.removeFromCart(id);
    this.cart = this.cartService.getCart();
    this.updateTotal();
  }

  updateTotal() {
    this.total = this.cart.reduce((sum, item) => sum + item.price, 0);
  }
}
