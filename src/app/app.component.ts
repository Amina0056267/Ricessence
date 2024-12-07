import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { NavbarComponent } from "./pages/global/navbar/navbar.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, HomepageComponent, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ricessence';
}
