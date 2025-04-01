import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private readonly toastSrv: ToastrService) {}

  show(info: IToast) {
    switch (info.severity) {
      case 'success':
        this.toastSrv.success(info.detail, info.sumary);
        break;
      case 'error':
        this.toastSrv.error(info.detail, info.sumary);
        break;
      case 'warn':
        this.toastSrv.warning(info.detail, info.sumary);
        break;
      case 'warning':
        this.toastSrv.warning(info.detail, info.sumary);
        break;
      default:
        this.toastSrv.show(info.detail, info.sumary);
        break;
    }
  }
}
