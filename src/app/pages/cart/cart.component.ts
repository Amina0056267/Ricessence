import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { Product } from '../../services/product.service';
import { Subscription } from 'rxjs';

export interface GroupedCartItem {
  product: Product;
  quantity: number;
  subtotal: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnDestroy {
  groupedCart: GroupedCartItem[] = [];
  total = 0;
  
  private cartService = inject(CartService);
  private cartSub!: Subscription;

  ngOnInit() {
    this.cartSub = this.cartService.cart$.subscribe(items => {
      this.groupCartItems(items);
    });
  }

  ngOnDestroy() {
    if (this.cartSub) {
      this.cartSub.unsubscribe();
    }
  }

  groupCartItems(items: Product[]) {
    const map = new Map<number, GroupedCartItem>();
    items.forEach(product => {
      if (map.has(product.id)) {
        const item = map.get(product.id)!;
        item.quantity++;
        item.subtotal = item.product.price * item.quantity;
      } else {
        map.set(product.id, {
          product,
          quantity: 1,
          subtotal: product.price
        });
      }
    });
    this.groupedCart = Array.from(map.values());
    this.total = items.reduce((sum, item) => sum + item.price, 0);
  }

  updateQuantity(productId: number, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }
}

