import { Injectable } from '@angular/core';
import { Product } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart: Product[] = [];

  getCart(): Product[] {
    return this.cart;
  }

  addToCart(product: Product): void {
    this.cart.push(product);
  }

  removeFromCart(id: number): void {
    this.cart = this.cart.filter(p => p.id !== id);
  }

  clearCart(): void {
    this.cart = [];
  }
}
