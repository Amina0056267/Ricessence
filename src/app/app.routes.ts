import { Routes } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductComponent } from './pages/product/product.component';
import { CartComponent } from './pages/cart/cart.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';

export const routes: Routes = [
  { path: '', component: HomepageComponent }, 
  { path: 'category', component: CategoryComponent}, 
  { path: 'product', component: ProductComponent},
  { path: 'cart', component: CartComponent},
  { path: 'wishlist', component: WishlistComponent}
];
