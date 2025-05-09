import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from '../../services/product.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="wishlist">
      <h2>Your Wishlist</h2>
      <div *ngIf="wishlist.length; else empty">
        <div *ngFor="let item of wishlist" class="wishlist-item">
          <img [src]="item.image" alt="{{ item.name }}" />
          <div>
            <h3>{{ item.name }}</h3>
            <p>£{{ item.price }}</p>
            <button (click)="remove(item.id)">Remove</button>
          </div>
        </div>
      </div>
      <ng-template #empty>
        <p>No items in your wishlist.</p>
      </ng-template>
    </section>
  `,
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist: Product[] = [];

  constructor(private wishlistService: WishlistService) {}

  ngOnInit() {
    this.wishlist = this.wishlistService.getWishlist();
  }

  remove(id: number) {
    this.wishlistService.removeFromWishlist(id);
    this.wishlist = this.wishlistService.getWishlist();
  }
}
