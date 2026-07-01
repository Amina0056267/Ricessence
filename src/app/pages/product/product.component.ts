import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [];
  
  selectedCategoryId: number | null = null;
  sortBy: string = 'default';
  searchQuery: string = '';

  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private route = inject(ActivatedRoute);

  ngOnInit() {
    // Fetch categories
    this.productService.getCategories().subscribe(cats => {
      this.categories = cats;
    });

    // Fetch products
    this.productService.getProducts().subscribe(data => {
      this.products = data;
      
      // Monitor search query params
      this.route.queryParams.subscribe(params => {
        this.searchQuery = params['search'] || '';
        this.applyFilters();
      });
    });
  }

  selectCategory(categoryId: number | null) {
    this.selectedCategoryId = categoryId;
    this.applyFilters();
  }

  onSortChange() {
    this.applyFilters();
  }

  onSearchChange() {
    this.applyFilters();
  }

  applyFilters() {
    let result = [...this.products];

    // Filter by search query
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.description.toLowerCase().includes(q)
      );
    }

    // Filter by Category
    if (this.selectedCategoryId !== null) {
      result = result.filter(p => p.categoryId === this.selectedCategoryId);
    }

    // Apply Sorting
    if (this.sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (this.sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (this.sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    this.filteredProducts = result;
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    alert(`✨ ${product.name} has been added to your ritual cart.`);
  }
}

