import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './navheader.component.html',
  styleUrl: './navheader.component.css'
})
export class HeaderComponent {

}
