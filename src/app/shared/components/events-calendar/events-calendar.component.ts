import { IAppointment } from './../../../interfaces/IAppointments';
import { Component, OnInit, ViewChild, forwardRef } from '@angular/core';
import {
  CalendarOptions,
  Calendar,
  EventClickArg,
  EventSourceInput,
} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, {
  DateClickArg,
  EventDragStopArg,
} from '@fullcalendar/interaction';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { ViewportScroller } from '@angular/common';
import { AppointmentFormComponent } from '../../component/appointment-form/appointment-form.component';
import { HttpService } from '../../services/HTTP/http.service';
import { environment } from '../../../environments/enviroments';
import { StorageService } from '../../services/storage/storage.service';
import { IUserStorage } from '../../../interfaces/IUser';
import { KEYS } from '../../../core/constants.enum';
@Component({
  selector: 'app-events-calendar',
  templateUrl: './events-calendar.component.html',
  styleUrl: './events-calendar.component.scss',
})
export class EventsCalendarComponent {
  constructor(private readonly httpService: HttpService, private storageService: StorageService) {}
  calendarOptions?: CalendarOptions;
  eventsModel: any;
  @ViewChild('fullcalendar') fullcalendar?: FullCalendarComponent;
  @ViewChild(AppointmentFormComponent)
  appointmentForm?: AppointmentFormComponent;
  appointments: IAppointment[] = [];
  private user!: IUserStorage;

  async ngOnInit() {
    // need for load calendar bundle first
    this.user = this.storageService.get(KEYS.USER);
    this.appointments = await this.getAppointments();
    console.log(
      '🚀  ~ EventsCalendarComponent ~ ngOnInit ~ appointments:',
      this.appointments
    );
    this.setCalendar(this.appointments);
  }

  private setCalendar(appointments: IAppointment[]) {
    const events: EventSourceInput = appointments.map((appo: any) => ({
      date: appo.date,
      title: appo?.description ? appo?.description?.substring(0, 15) + '...' : appo?.user?.name,
      id: appo.id.toString(),
    }));
    forwardRef(() => Calendar);

    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      editable: true,
      customButtons: {
        add: {
          text: 'Add appointment',
          click: () => {
            this.appointmentForm?.toggleVisible();
          },
        },
      },
      headerToolbar: {
        left: 'prev,next,add',
        center: 'title',
        right: 'dayGridMonth',
      },
      dateClick: this.handleDateClick.bind(this),
      eventClick: this.handleEventClick.bind(this),
      eventDragStop: this.handleEventDragStop.bind(this),
      events,
    };
  }

  private async getAppointments(): Promise<IAppointment[]> {
    if(this.user.role !== "admin" && this.user.role !== "coordinator") {
      return (
        await this.httpService.request<IAppointment[]>(
          `${environment.apiUrl}appointment/history`,
          'GET'
        )
      ).data;
    }
    return (
      await this.httpService.request<IAppointment[]>(
        `${environment.apiUrl}appointment/history/all`,
        'GET'
      )
    ).data;
  }

  handleDateClick(arg: DateClickArg) {
    console.log(arg);
  }

  handleEventClick(arg: EventClickArg) {
    console.log(arg);
  }

  handleEventDragStop(arg: EventDragStopArg) {
    console.log(arg);
  }

  updateHeader() {
    this.calendarOptions!.headerToolbar = {
      left: 'prev,next myCustomButton',
      center: 'title',
      right: '',
    };
  }

  updateEvents() {
    const nowDate = new Date();
    const yearMonth =
      nowDate.getUTCFullYear() + '-' + (nowDate.getUTCMonth() + 1);

    this.calendarOptions!.events = [
      {
        title: 'Updated Event',
        start: yearMonth + '-08',
        end: yearMonth + '-10',
      },
    ];
  }
}
