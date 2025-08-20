import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // ✅ Import this
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ProductService, Product } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { WishlistService } from '../services/wishlist.service'; // ✅ Import it

interface Review {
  username: string;
  rating: number;
  comment: string;
  createdAt: string;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // ✅ Add FormsModule here
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  productId: number = 0;
  reviews: Review[] = [];
  newReview: Review = {
    username: '',
    rating: 5,
    comment: '',
    createdAt: ''
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private cartService: CartService,
    private http: HttpClient,
    private wishlistService: WishlistService // ✅ ADD THIS
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productId = id;

    if (!id) {
      this.router.navigate(['/product']);
      return;
    }

    this.productService.getProductById(id).subscribe(product => {
      this.product = product;
    });

    this.loadReviews();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    alert(`${product.name} added to cart!`);
  }

  addToWishlist() {
  if (this.product) {
    this.wishlistService.addToWishlist(this.product);
    alert(`${this.product.name} added to wishlist!`);
  }
}

  loadReviews() {
    this.http.get<Review[]>(`http://localhost:4000/reviews/${this.productId}`).subscribe(data => {
      this.reviews = data;
    });
  }

  submitReview() {
    if (!this.newReview.username || !this.newReview.comment) return;
  
    const review = {
      ...this.newReview,
      productId: this.productId,
      createdAt: new Date().toISOString()
    };
  
    this.http.post('http://localhost:4000/reviews', review).subscribe(() => {
      this.newReview = { username: '', rating: 5, comment: '', createdAt: '' };
      this.loadReviews();
      alert('✅ Review submitted!');
    });
  }
  
}
