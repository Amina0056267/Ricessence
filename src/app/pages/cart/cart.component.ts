import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Product } from '../../services/product.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <section class="cart">
      <h2>Your Cart</h2>

      <div *ngIf="cart.length > 0; else empty">
        <div *ngFor="let item of cart" class="cart-item">
          <img [src]="item.image" alt="{{ item.name }}" width="100" />
          <div class="details">
            <h3>{{ item.name }}</h3>
            <p>{{ item.description }}</p>
            <strong>£{{ item.price }}</strong>
            <button (click)="removeFromCart(item.id)">Remove</button>
          </div>
        </div>

        <p class="total">Total: <strong>£{{ total }}</strong></p>
        <a routerLink="/checkout" class="checkout-link">Proceed to Checkout</a>
      </div>

      <ng-template #empty>
        <p>Your cart is empty.</p>
      </ng-template>
    </section>
  `,
  styles: [`
    .cart { padding: 2rem; }
    .cart-item { display: flex; gap: 1rem; margin-bottom: 1.5rem; }
    .details { display: flex; flex-direction: column; gap: 0.5rem; }
    .total { font-size: 1.2rem; margin-top: 2rem; }
    .checkout-link { display: inline-block; margin-top: 1rem; font-weight: bold; }
  `]
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
