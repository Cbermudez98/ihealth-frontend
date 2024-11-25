import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { StorageService } from '../services/storage/storage.service';
import { KEYS } from '../../core/constants.enum';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const storageService = inject(StorageService);
  const token = storageService.get(KEYS.TOKEN);
  if (token[KEYS.TOKEN]) {
    req = req.clone({
      headers: req.headers.append('Authorization', `${token[KEYS.TOKEN]}`),
    });
  }
  return next(req);
};
