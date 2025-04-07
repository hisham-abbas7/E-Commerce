import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; 
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes), 
    provideHttpClient(),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-right', // ✅ ده اللي هيظبطلك البوزيشن
      timeOut: 3000, // اختياري: المدة بالميلي ثانية
      closeButton: true, // اختياري: زرار X للإغلاق
      progressBar: true
    })
  ],
})