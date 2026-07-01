import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartSubject = new BehaviorSubject<Product[]>([]);
  cart$: Observable<Product[]> = this.cartSubject.asObservable();

  constructor() {
    const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    const storedCart = isBrowser ? localStorage.getItem('cart') : null;
    const initialCart = storedCart ? JSON.parse(storedCart) : [];
    this.cartSubject.next(initialCart);
  }

  private saveCart(cart: Product[]) {
    const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    if (isBrowser) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
    this.cartSubject.next(cart);
  }

  getCart(): Product[] {
    return this.cartSubject.getValue();
  }

  addToCart(product: Product, quantity: number = 1): void {
    const current = [...this.getCart()];
    for (let i = 0; i < quantity; i++) {
      current.push(product);
    }
    this.saveCart(current);
  }

  removeFromCart(id: number): void {
    const current = this.getCart().filter(p => p.id !== id);
    this.saveCart(current);
  }

  updateQuantity(id: number, quantity: number): void {
    const current = this.getCart();
    const otherProducts = current.filter(p => p.id !== id);
    
    if (quantity <= 0) {
      this.saveCart(otherProducts);
      return;
    }

    const targetProduct = current.find(p => p.id === id);
    if (targetProduct) {
      const added: Product[] = [];
      for (let i = 0; i < quantity; i++) {
        added.push(targetProduct);
      }
      this.saveCart([...otherProducts, ...added]);
    }
  }

  clearCart(): void {
    const isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
    if (isBrowser) {
      localStorage.removeItem('cart');
    }
    this.cartSubject.next([]);
  }
}

