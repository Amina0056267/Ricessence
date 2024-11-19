import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage/homepage.component';
import { ProductListComponent } from './product/product-list/product-list/product-list.component';
import { ProductDetailsComponent } from './product/product-details/product-details/product-details.component';
import { CartComponent } from './cart/cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist/wishlist.component';
import { CheckoutComponent } from './checkout/checkout/checkout.component';
import { MatIconModule } from '@angular/material/icon';


const routes: Routes = [
  { path: '', component: HomepageComponent }, // Default route
  { path: 'products', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'checkout', component: CheckoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
