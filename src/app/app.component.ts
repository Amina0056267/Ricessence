import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/components/header/navheader/navheader.component";
import { FooterComponent } from "./shared/components/footer/footer/footer.component";
import { HomepageComponent } from './homepage/homepage/homepage.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap'; // Import the carousel module

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HomepageComponent, FooterComponent, NgbCarouselModule], // Add NgbCarouselModule here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})
export class AppComponent {
  title = 'Ricessence';
}
