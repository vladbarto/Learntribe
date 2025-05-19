import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('token');

  const modifiedReq = req.clone({
    url: environment.backendUrl + req.url,
    headers: req.headers.set(
      'Authorization',
      token && !req.url.includes('/auth') ? `Bearer ${token}` : ''
    ),
  });

  return next(modifiedReq);
};
