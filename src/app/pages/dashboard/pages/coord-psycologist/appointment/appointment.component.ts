import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { IAllAppointment } from '../../../../../interfaces/IAllAppointments';
import { HttpService } from '../../../../../shared/services/HTTP/http.service';
import { environment } from '../../../../../environments/enviroments';
import { LoginService } from '../../../../../shared/services/auth/login.service';

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

  constructor(
    private readonly httpService: HttpService,
    private readonly authService: LoginService
  ) {}

  async ngOnInit() {
    const Url = environment.apiUrl;

    const roles = this.authService.getUserRoles();
    const role = roles[0];

    let getAppointments = '';


    switch (role) {
      case 'admin':
      case 'psicologo':
        getAppointments = Url + 'appointment/history/all';
        break;
      case 'user':
        getAppointments = Url + 'appointment/history/user';
        break;
      default:
        console.warn('Rol no reconocido:', role);
        this.loading = false;
        return;
    }

    try {

      this.appointments = (
        await this.httpService.request<IAllAppointment[]>(getAppointments, 'GET')
      ).data;

      this.appointmentsToShow = this.appointments.map((appointment) => ({
        name: `${appointment.user.name} ${appointment?.user?.last_name || ''}`,
        dni: appointment.user.code,
        date: new Date(appointment.date).toISOString(),
        hour: appointment.schedule.start_time.toString(),
        status: appointment.status.name,
      }));
    } catch (error) {
      console.error('Error al cargar citas:', error);
    }

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
