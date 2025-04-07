import { Routes, provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SuccessComponent } from './components/success/success.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: ProductListComponent, canActivate: [AuthGuard] }, // الصفحة الرئيسية
  { path: 'product/:id', component: ProductDetailsComponent, canActivate: [AuthGuard] }, // صفحة تفاصيل المنتج
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'success', component: SuccessComponent }
];

export const appRouting = [
  provideRouter(routes),
];
