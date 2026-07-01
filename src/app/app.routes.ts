
import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AdminDashboardComponent } from './admin/admin-dashboard.component';
import { AdminFormComponent } from './admin/admin-form.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { CartComponent } from './pages/cart/cart.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { AdminOrdersComponent } from './admin/admin-orders.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent, pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },

  { path: 'category', component: CategoryComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'product', component: ProductComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'login', component: LoginComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard] },
  { path: 'admin/new', component: AdminFormComponent, canActivate: [authGuard] },
  { path: 'admin/edit/:id', component: AdminFormComponent, canActivate: [authGuard] },
  { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [authGuard] },
  { path: 'checkout', component: CheckoutComponent },

  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
