import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  messages = [
    {
      severity: 'info',
      name: 'Rawad Muñoz',
      detail: 'Este es un mensaje de información.',
      timestamp: new Date(new Date().getTime() - 60000), // Hace 1 minuto
    },
    {
      severity: 'success',
      name: 'Rawad Muñoz',
      detail: 'La operación fue exitosa.',
      timestamp: new Date(new Date().getTime() - 3600000), // Hace 1 hora
    },
    {
      severity: 'error',
      name: 'Rawad Muñoz',
      detail: 'Ha agendado una cita',
    },
  ];

}
