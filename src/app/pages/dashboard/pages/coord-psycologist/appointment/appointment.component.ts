import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { ResponseAppointments } from '../../../../../shared/interfaces/ResponseAppointment';
import { HttpService } from '../../../../../shared/services/HTTP/http.service';
import { environment } from '../../../../../environments/enviroments';
import { IAppointment } from '../../../../../interfaces/IAppointments';
import { IAllAppointment } from '../../../../../interfaces/IAllAppointments';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit {
  appointments: IAllAppointment[] = [];
  loading: boolean = true;
  searchValue: string = '';
  appointmentsToShow: {
    name: string;
    dni: string;
    date: string;
    hour: string;
    status: string;
  }[] = [];

  constructor(private readonly httpService: HttpService) {}

  async ngOnInit() {
    const Url = environment.apiUrl;
    const getAppointments = Url + 'appointment/history/all';

    this.appointments = (
      await this.httpService.request<IAllAppointment[]>(getAppointments, 'GET')
    ).data;
    console.log(
      '🚀  ~ AppointmentComponent ~ ngOnInit ~ appointments:',
      this.appointments
    );
    this.appointmentsToShow = this.appointments.map((appointment) => ({
      name: `${appointment.user.name} ${appointment?.user?.last_name || ''}`,
      dni: appointment.user.code,
      date: new Date(appointment.date).toISOString(),
      hour: appointment.schedule.start_time.toString(),
      status: appointment.status.name,
    }));
    console.log(
      '🚀  ~ AppointmentComponent ~ filters ~ filters:',
      this.appointmentsToShow
    );
    this.loading = false;
  }

  clearFilters(table: Table) {
    table.clear();
  }

  applyGlobalFilter(event: Event, table: Table) {
    const input = event.target as HTMLInputElement;
    if (input && input.value !== null) {
      table.filterGlobal(input.value, 'contains');
    }
  }
}
