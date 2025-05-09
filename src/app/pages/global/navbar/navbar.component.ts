import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  searchTerm: string = '';

  constructor(private router: Router) {}

  onSearch(event: Event) {
    event.preventDefault();
    if (this.searchTerm.trim()) {
      this.router.navigate(['/product'], { queryParams: { search: this.searchTerm } });
    }
  }
}
