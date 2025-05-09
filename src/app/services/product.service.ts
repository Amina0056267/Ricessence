import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: number;
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:4000/products';

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
    return this.http.get<{ id: number; name: string }[]>('http://localhost:4000/categories');
  }
  
  
  
}
