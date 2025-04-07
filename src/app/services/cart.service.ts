import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = this.getCartFromLocalStorage(); // ✅ تحميل البيانات فورًا
  private cartSubject = new BehaviorSubject<any[]>(this.cartItems); // ✅ تأكد إن `cartSubject` فيه البيانات من الأول

  cart$ = this.cartSubject.asObservable();

  constructor() {}

  // ✅ استرجاع البيانات من LocalStorage عند تحميل التطبيق
  private getCartFromLocalStorage(): any[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  // ✅ حفظ البيانات في LocalStorage
  private saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  // ✅ إضافة منتج للسلة
  addToCart(product: any) {
    const existingProduct = this.cartItems.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      this.cartItems.push({ ...product, quantity: 1 });
    }
    this.updateCart();
  }

  // ✅ إزالة منتج من السلة
  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter((item) => item.id !== productId);
    this.updateCart();
  }

  // ✅ تحديث الكمية
  updateQuantity(productId: number, quantity: number) {
    this.cartItems = this.cartItems.map((item) => {
      if (item.id === productId) {
        return { ...item, quantity: quantity > 0 ? quantity : 1 };
      }
      return item;
    });
    this.updateCart();
  }

  // ✅ حساب الإجمالي
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // ✅ تحديث الـ Subject وLocalStorage
  private updateCart() {
    this.cartSubject.next([...this.cartItems]); // ✅ نشر نسخة جديدة للسلة
    this.saveCartToLocalStorage(); // ✅ تخزين البيانات محليًا
  }
}
