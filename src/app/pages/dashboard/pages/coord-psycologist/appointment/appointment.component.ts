import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../../shared/services/HTTP/http.service';
import { environment } from '../../../../../environments/enviroments';
import { IAllAppointment } from '../../../../../interfaces/IAllAppointments';
import { IHeaders } from '../../../../../shared/interfaces/ITable'; 

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit {
  appointments: IAllAppointment[] = [];
  loading = true;
  headers!: IHeaders;

  constructor(private readonly httpService: HttpService) {}

  async ngOnInit() {
    const url = environment.apiUrl + 'appointment/history/all';

    this.appointments = (
      await this.httpService.request<IAllAppointment[]>(url, 'GET')
    ).data;

    const appointmentsToShow = this.appointments.map((appointment) => ({
      name: `${appointment.user.name} ${appointment?.user?.last_name || ''}`,
      dni: appointment.user.code,
      date: appointment.date,
      hour: appointment.schedule.start_time,
      status: appointment.status.name,
    }));

    this.headers = {
      columns: [
        { field: 'name', header: 'Nombre', type: 'Text' },
        { field: 'dni', header: 'Documento de Identidad', type: 'Text' },
        { field: 'date', header: 'Fecha', type: 'Date' },
        { field: 'hour', header: 'Hora', type: 'Text' },
        { field: 'status', header: 'Estado', type: 'Text' },
      ],
      data: appointmentsToShow,
      actions: {
        sort: true,
        filter: true,
      },
    };

    this.loading = false;
  }
}
