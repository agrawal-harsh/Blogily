import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (!localStorage.getItem('token')) {
    console.warn('Access denied - Token not found');
    return false;
  }
  console.log('Access granted - Token found');
  return true;
};
