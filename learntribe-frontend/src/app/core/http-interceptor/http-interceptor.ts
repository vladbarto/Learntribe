import {HttpHeaders, HttpInterceptorFn} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {inject} from '@angular/core';
import {environment} from '../../../environments/environment.development';

export const requestInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Request intercepted:', req.url); // 👈 this should now show up

  const modifiedReq = req.clone({
    url: getUrl(req.url),
    // headers: getHeaders(req.url),
    // withCredentials: true
  });
  console.warn('New request: {}', modifiedReq);
  return next(modifiedReq);
};

const getUrl = (url: string): string => {
  return environment.backendUrl + url;
};

const getHeaders = (url: string): HttpHeaders => {
  const cookieService = inject(CookieService);
  const jwtToken = cookieService.get('jwt-token');

  return url.includes('auth') || jwtToken === ''
    ? new HttpHeaders()
    : new HttpHeaders({ 'Authorization': `Bearer ${jwtToken}` });
};
