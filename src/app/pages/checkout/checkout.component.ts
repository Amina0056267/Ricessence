import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../services/cart.service';
import { Product } from '../../services/product.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <section class="checkout-form">
      <h2>Checkout</h2>

      <form (ngSubmit)="placeOrder()">
        <input [(ngModel)]="name" name="name" placeholder="Full Name" required />
        <input [(ngModel)]="email" name="email" type="email" placeholder="Email" required />
        <textarea [(ngModel)]="address" name="address" placeholder="Shipping Address" required></textarea>

        <h3>Order Summary</h3>
        <ul>
          <li *ngFor="let item of cart">
            {{ item.name }} - £{{ item.price }}
          </li>
        </ul>
        <p><strong>Total: £{{ total }}</strong></p>

        <button type="submit">Place Order</button>
      </form>
    </section>
  `
})
export class CheckoutComponent {
  name = '';
  email = '';
  address = '';
  cart: Product[] = [];
  total = 0;

  constructor(
    private cartService: CartService,
    private router: Router,
    private http: HttpClient // ✅ Needed for the POST
  ) {
    this.cart = cartService.getCart();
    this.total = this.cart.reduce((sum, item) => sum + item.price, 0);
  }

  placeOrder() {
    const order = {
      name: this.name,
      email: this.email,
      address: this.address,
      items: this.cart,
      total: this.total
    };

    console.log('📤 Sending order:', order); // ✅ Log to confirm

    this.http.post('http://localhost:4000/orders', order).subscribe({
      next: () => {
        alert('Order placed successfully!');
        this.cartService.clearCart();
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('❌ Failed to place order:', err);
      }
    });
  }
}
