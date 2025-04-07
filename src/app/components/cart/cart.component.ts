import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StripePaymentButtonComponent } from '../stripe-payment-button/stripe-payment-button.component';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, StripePaymentButtonComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  cartItems: any[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cart$.subscribe((items) => {
      this.cartItems = items;
      this.total = this.cartService.getTotalPrice();
    });
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id);
  }

  updateQuantity(id: number, event: any) {
    const quantity = +event.target.value || 1; // ضمان عدم السماح بالقيم الفارغة أو الصفر
    this.cartService.updateQuantity(id, quantity);
  }

  increaseQuantity(id: number, quantity: number) {
    this.cartService.updateQuantity(id, quantity + 1);
  }

  decreaseQuantity(id: number, quantity: number) {
    if (quantity > 1) {
      this.cartService.updateQuantity(id, quantity - 1);
    }
  }

}
