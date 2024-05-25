import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

export const adminGuard: CanActivateFn = (route, state) => {

  const _Router=inject(Router)
  const _AuthService=inject(AuthService)
  
  const role =_AuthService.role

  if(localStorage.getItem('token') !=null&&role=='SuperAdmin'){
    return true;
  }else{
   _Router.navigate(['/auth'])
    return false;
  }

};
