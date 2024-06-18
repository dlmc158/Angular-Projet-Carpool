import { CanActivateFn } from '@angular/router';

export const administrateurGuard: CanActivateFn = (route, state) => {
  return true;
};
