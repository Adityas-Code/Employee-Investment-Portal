import { CanActivateFn } from '@angular/router';

export const authGuardGuard: CanActivateFn = (route, state) => {
  if (localStorage.getItem('username') != null) {
    return true;
  }
  else {
    route.paramMap.get('/[UserLogin]');

    return false;
  }
};
