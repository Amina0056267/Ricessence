import { Injectable } from '@angular/core';
import { Product } from './product.service';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  private wishlistKey = 'ricessence_wishlist';

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  getWishlist(): Product[] {
    if (!this.isBrowser()) return [];
    const data = localStorage.getItem(this.wishlistKey);
    return data ? JSON.parse(data) : [];
  }

  addToWishlist(product: Product): void {
    if (!this.isBrowser()) return;
    const wishlist = this.getWishlist();
    if (!wishlist.find(p => p.id === product.id)) {
      wishlist.push(product);
      localStorage.setItem(this.wishlistKey, JSON.stringify(wishlist));
    }
  }

  removeFromWishlist(id: number): void {
    if (!this.isBrowser()) return;
    const updated = this.getWishlist().filter(p => p.id !== id);
    localStorage.setItem(this.wishlistKey, JSON.stringify(updated));
  }

  clearWishlist(): void {
    if (!this.isBrowser()) return;
    localStorage.removeItem(this.wishlistKey);
  }
}

