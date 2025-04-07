import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatButtonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private router: Router, private cartService: CartService, private authService: AuthService) {}

  ngOnInit(): void {
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
    });
  }

  isLoggedIn() {
    // return this.authService.isLoggedIn();
    return !!localStorage.getItem('user');
  }

  logout() {
    // this.authService.logout();
    localStorage.removeItem('user'); // حذف بيانات المستخدم
    this.router.navigate(['/login']);
  }
}