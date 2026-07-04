import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ProductService, Product } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  filteredProducts: Product[] = [];
  categoryName: string = '';
  categoryId: number | null = null;

  private route = inject(ActivatedRoute);
  private categoryService = inject(CategoryService);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private toastService = inject(ToastService);

  ngOnInit() {
    this.route.paramMap.subscribe(paramsMap => {
      const categoryIdParam = paramsMap.get('id');
      
      this.categoryService.getCategories().subscribe(categories => {
        if (categoryIdParam) {
          const catId = Number(categoryIdParam);
          this.categoryId = catId;
          const category = categories.find(c => c.id === catId);
          if (category) {
            this.categoryName = category.name;
          }
        } else {
          this.categoryId = null;
          this.categoryName = 'All Formulations';
        }
      });

      this.productService.getProducts().subscribe(products => {
        if (categoryIdParam) {
          const catId = Number(categoryIdParam);
          this.filteredProducts = products.filter(p => p.categoryId === catId);
        } else {
          this.filteredProducts = products;
        }
      });
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.toastService.success(`${product.name} has been added to your ritual cart.`);
  }
}

