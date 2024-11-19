// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    NgbCarouselModule,
  ],
  providers: []
})
export class AppModule {}
