import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/HTTP/http.service';
import { environment } from '../../../environments/enviroments';
import { IAppointment } from '../../../interfaces/IAppointments';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss',
})
export class CalendarComponent implements OnInit {
  dates: Date[] = [];
  constructor(private readonly httpService: HttpService) {}

  async ngOnInit() {
    const appointments = (
      await this.httpService.request<IAppointment[]>(
        `${environment.apiUrl}appointment/history/all`,
        'GET'
      )
    ).data;
    this.dates = appointments.map((appo) => {
      return new Date(appo.date);
    });
    console.log(
      '🚀  ~ CalendarComponent ~ this.dates=appointments.map ~ this.dates:',
      this.dates
    );
  }
}
