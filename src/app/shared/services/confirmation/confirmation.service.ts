import { Injectable } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

interface IConfirm {
  message : string;
  header : string;
  icon? : string;
  accept : Function;
  data? : any;
}
@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  confirm(payload: IConfirm): void {
    this.confirmationService.confirm({
      message: payload.message,
      header: payload.header,
      icon: payload?.icon || '',
      accept: () => {
        payload.accept(payload.data);
      },
      reject: () => {
        
      }
    });
  }
}
