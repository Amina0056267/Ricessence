import { Component } from '@angular/core';
import { FooterComponent } from "../../../shared/components/footer/footer/footer.component";
import { HeaderComponent } from "../../../shared/components/header/navheader/navheader.component";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
addToCart(arg0: any) {
throw new Error('Method not implemented.');
}
product: any;

}
