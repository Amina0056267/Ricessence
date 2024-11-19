import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/components/header/navheader/navheader.component";
import { FooterComponent } from "../../shared/components/footer/footer/footer.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, HomepageComponent],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {

}
