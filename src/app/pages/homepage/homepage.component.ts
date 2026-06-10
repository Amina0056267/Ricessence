
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // ✅ Addimport { RouterModule } from '@angular/router'; // ✅ Add this

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ Include RouterModule
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {
  images = [
    'https://picsum.photos/800/400?random=1',
    'https://picsum.photos/800/400?random=2',
    'https://picsum.photos/800/400?random=3'
  ];
}