import { Component } from '@angular/core';
import { FooterComponent } from "../../shared/components/footer/footer/footer.component";
import { HeaderComponent } from "../../shared/components/header/navheader/navheader.component";

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
removeFromCart(arg0: any) {
throw new Error('Method not implemented.');
}

}
