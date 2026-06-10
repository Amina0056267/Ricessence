
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { Router } from '@angular/router';

bootstrapApplication(AppComponent, appConfig)
   .then(appRef => {
    const router = appRef.injector.get(Router);
    if (window.location.pathname === '/' || window.location.pathname === '') {
      router.navigateByUrl('/home'); // ✅ Force homepage load
    }
  })
