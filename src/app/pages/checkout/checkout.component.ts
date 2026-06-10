import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from '../../services/cart.service';
import { Product } from '../../services/product.service';
import { API_BASE_URL } from '../../config';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
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
    private http: HttpClient
  ) {
    this.cart = cartService.getCart();
    this.total = this.cart.reduce((sum, item) => sum + item.price, 0);
  }

  isCartEmpty(): boolean {
    return this.cart.length === 0;
  }

  placeOrder(form: NgForm) {
    if (form.invalid || this.isCartEmpty()) {
      alert('Please fill out all fields and ensure your cart is not empty.');
      return;
    }

    const order = {
      name: this.name,
      email: this.email,
      address: this.address,
      items: this.cart,
      total: this.total
    };

    this.http.post(`${API_BASE_URL}/orders`, order).subscribe({
      next: () => {
        alert('✅ Order placed successfully!');
        this.cartService.clearCart();
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('❌ Failed to place order:', err);
      }
    });
  }
}
