import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = () => {
  const router = inject(Router);
  const user = localStorage.getItem('user');

  if (user) {
    return true; // المستخدم مسجل دخول، اسمح له بالمتابعة
  } else {
    router.navigate(['/login']); // توجيه لصفحة تسجيل الدخول
    return false; // منع الدخول
  }
};
