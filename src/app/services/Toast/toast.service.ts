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

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private messageService: MessageService) {}
  
  show(statusKey: keyof typeof apiStatus) {
    const status = apiStatus[statusKey];

    if (status) {
      this.messageService.add({
        severity: status.severity,
        summary: `HTTP ${status.code}`,
        detail: status.message,
      });
    } else {
      console.error(`Status key "${statusKey}" not found in apiStatus.`);
    }
  }
}