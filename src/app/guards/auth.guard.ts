import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router); // inject Router

  // Check if admin is logged in
  const isLoggedIn = !!localStorage.getItem('adminLoggedIn');

  if (isLoggedIn) {
    return true; // allow access
  } else {
    // redirect to login
    router.navigate(['/login']);
    return false;
  }
};
