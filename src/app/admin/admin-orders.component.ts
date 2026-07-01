import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { API_BASE_URL } from '../config';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <section class="admin-orders">
      <h2>All Orders</h2>

      <div *ngIf="orders.length > 0; else empty">
        <div *ngFor="let order of orders" class="order-card">
          <h3>🧾 Order #{{ order.id }}</h3>
          <p><strong>Name:</strong> {{ order.name }}</p>
          <p><strong>Email:</strong> {{ order.email }}</p>
          <p *ngIf="order.phone"><strong>Phone:</strong> {{ order.phone }}</p>
          <p>
            <strong>Address:</strong>
            <span *ngIf="order.addressLine1; else fallbackAddress">
              {{ order.addressLine1 }}<span *ngIf="order.addressLine2">, {{ order.addressLine2 }}</span>, 
              {{ order.townOrCity }}<span *ngIf="order.county">, {{ order.county }}</span>, 
              {{ order.postcode }}, {{ order.country || 'United Kingdom' }}
            </span>
            <ng-template #fallbackAddress>{{ order.address }}</ng-template>
          </p>
          <p><strong>Status:</strong> {{ order.status || 'pending' }}</p>
          <p><strong>Total:</strong> £{{ order.total.toFixed(2) }}</p>
          <p><strong>Date:</strong> {{ order.createdAt | date:'medium' }}</p>
          <h4>Items:</h4>
          <ul>
            <li *ngFor="let item of order.items">
              {{ item.name }} - £{{ item.price }}
            </li>
          </ul>
        </div>
      </div>

      <ng-template #empty>
        <p>No orders placed yet.</p>
      </ng-template>
    </section>
  `,
  styles: [`
    .admin-orders {
      padding: 2rem;
    }
    .order-card {
      border: 1px solid #ccc;
      padding: 1rem;
      margin-bottom: 1.5rem;
      border-radius: 8px;
      background: #fdfdfd;
    }
  `]
})
export class AdminOrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return;
    }
    const token = localStorage.getItem('ricessence_token');

    this.http.get<any[]>(`${API_BASE_URL}/orders`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe(data => {
      this.orders = data
        .map(order => ({
          ...order,
          items: JSON.parse(order.items)
        }))
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    });
  }
}
