import { Component } from '@angular/core';
import { FooterComponent } from "../../../shared/components/footer/footer/footer.component";
import { HeaderComponent } from "../../../shared/components/header/navheader/navheader.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [FooterComponent, HeaderComponent],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css'
})
export class ProductListComponent {
viewProduct(arg0: any) {
throw new Error('Method not implemented.');
}

}
