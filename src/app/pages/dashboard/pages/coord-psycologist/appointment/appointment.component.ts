import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { ResponseAppointments } from '../../../../../shared/interfaces/ResponseAppointment';
import { HttpService } from '../../../../../shared/services/HTTP/http.service';
import { environment } from '../../../../../environments/enviroments';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
})
export class AppointmentComponent implements OnInit {
  appointments: any[] = [];
  loading: boolean = true;
  searchValue: string = '';

  constructor(private readonly httpService: HttpService) {}

  async ngOnInit() {
    const Url = environment.apiUrl;
    const getAppointments = Url + 'appointment/history/all';

    const appointments = (
      await this.httpService.request<ResponseAppointments>(
        getAppointments,
        'GET'
      )
    ).data;
    if (appointments.status) {
      this.appointments = appointments.data;
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
