import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../config';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: number;
}

export interface Review {
  username: string;
  rating: number;
  comment: string;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = `${API_BASE_URL}/products`;
  private http = inject(HttpClient);

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  addProduct(product: Product) {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(product: Product) {
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }

  deleteProduct(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  getCategories(): Observable<{ id: number; name: string }[]> {
    return this.http.get<{ id: number; name: string }[]>(`${API_BASE_URL}/categories`);
  }
}
