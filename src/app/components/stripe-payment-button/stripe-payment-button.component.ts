import { Component } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-stripe-payment-button',
  standalone: true,
  imports: [],
  templateUrl: './stripe-payment-button.component.html',
  styleUrl: './stripe-payment-button.component.css'
})
export class StripePaymentButtonComponent {
  stripe: any;

  constructor() {}

  async checkout() {
    this.stripe = await loadStripe('pk_test_51R81vQFqsxJWIXhZrFamqiudony3DGOM7KCANyxJy4VeIz8R7DGXwAdCLy005XZl5L1VVwkqsGKsjXHDc8QceYfo00LweW0aAl'); // ضع مفتاحك هنا

    const { error } = await this.stripe.redirectToCheckout({
      lineItems: [
        {
          price: 'price_1R86pnFqsxJWIXhZxngfB6T7', // ID المنتج من Stripe
          quantity: 1,
        },
      ],
      mode: 'payment',
      successUrl: 'http://localhost:4200/success',
      cancelUrl: 'http://localhost:4200/cancel',
    });

    if (error) {
      console.error('خطأ أثناء الدفع:', error);
    }
  }
}
