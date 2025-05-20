import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/HTTP/http.service';
import { environment } from '../../../environments/enviroments';
import { IAppointment } from '../../../interfaces/IAppointments';
import { StorageService } from '../../services/storage/storage.service';


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  dates: Date[] = [];
  userStorage: any;

  constructor(
    private readonly httpService: HttpService,
    private readonly storageService: StorageService,
  ) {}

  async ngOnInit() {
  
    const role = this.userStorage.role;

    const endpoint =
      role === 'admin' ? 'appointment/history/all' : 'appointment/history';

    const response = await this.httpService.request<IAppointment[]>(
      `${environment.apiUrl}${endpoint}`,
      'GET'
    );

    this.dates = response.data.map(appo => new Date(appo.date));
  }
}
