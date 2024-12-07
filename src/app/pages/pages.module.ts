import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './global/navbar/navbar.component';
import { PagesRoutingModule } from './pages-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NavbarComponent
  ]
})
export class PagesModule { }
