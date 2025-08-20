import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CategoryService } from '../../services/category.service';
import { ProductService, Product } from '../../services/product.service';

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

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const categoryIdParam = this.route.snapshot.paramMap.get('id');

    this.categoryService.getCategories().subscribe(categories => {
      if (categoryIdParam) {
        const categoryId = Number(categoryIdParam);
        const category = categories.find(c => c.id === categoryId);
        if (category) {
          this.categoryName = category.name;
        }
      } else {
        this.categoryName = 'All';
      }
    });

    this.productService.getProducts().subscribe(products => {
      if (categoryIdParam) {
        const categoryId = Number(categoryIdParam);
        this.filteredProducts = products.filter(p => p.categoryId === categoryId);
      } else {
        this.filteredProducts = products;
      }
    });
  }
}
