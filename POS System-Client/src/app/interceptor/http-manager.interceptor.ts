import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {LoadingStatusService} from '../services/loading-status.service';
import {inject} from '@angular/core';
import {catchError, finalize, throwError} from 'rxjs';
import {CookieManagerService} from '../services/cookie-manager.service';

export const httpManagerInterceptor: HttpInterceptorFn = (req, next) => {

  let statusService:LoadingStatusService = inject(LoadingStatusService);
  const cookieManager = inject(CookieManagerService);
  const token = cookieManager.getToken('token');
  statusService.beginRequest();

  let authReq = req;
  if (token && /^[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(token)) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // catch errors
      return throwError(() => error);
    }),
    finalize(() => {
      statusService.endRequest();
    })
  );
};
