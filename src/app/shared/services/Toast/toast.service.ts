import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

const apiStatus = {
  Success: {
    severity: 'success',
    code: 201,
    message: 'Operation completed successfully.',
  },
  NotAuthorized: {
    severity: 'error',
    code: 401,
    message: 'You are not authorized',
  },
  Forbidden: { severity: 'error', code: 403, message: 'Access is forbidden.' },
  BadRequest: {
    severity: 'error',
    code: 400,
    message: 'Invalid request data.',
  },
  InternalError: {
    severity: 'error',
    code: 500,
    message: 'An internal server error occurred.',
  },
};

type Severity = 'error' | 'success' | 'warning' | 'warn';

export interface IToast {
  severity: Severity;
  sumary: string;
  detail: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}

  show(info: IToast) {
    console.log('🚀  ~ ToastService ~ show ~ info:', info);
    this.messageService.add({
      severity: info.severity,
      summary: info.sumary,
      detail: info.detail,
    });
  }
}
