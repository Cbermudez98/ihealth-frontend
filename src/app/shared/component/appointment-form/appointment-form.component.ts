import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpService } from '../../services/HTTP/http.service';
import { environment } from '../../../environments/enviroments';
import { IUser } from '../../interfaces/ResponseUser';
import { IReason } from '../../../interfaces/IReason';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastService } from '../../services/Toast/toast.service';
import { ISchedule } from '../../../interfaces/ISchedule';
import { StorageService } from '../../services/storage/storage.service';
import { KEYS } from '../../../core/constants.enum';
import { LoaderService } from '../../services/loader/loader.service';
import { IUserStorage } from '../../../interfaces/IUser';

const SUNDAY = 0;
const STATUS_ACTIVE = 1;
const DAYS = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado',
];

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrl: './appointment-form.component.scss',
})
export class AppointmentFormComponent implements OnInit {
  userStorage!: IUserStorage;
  visible: boolean = false;
  psychologists: IUser[] = [];
  students: IUser[] = [];
  reasons: IReason[] = [];
  causes: IReason[] = [];
  schedules: ISchedule[] = [];
  schedulesToShow: { id: number; name: string }[] = [];
  studentsToShow: { id: number; name: string }[] = [];

  psychologist!: FormControl;
  reason!: FormControl;
  cause!: FormControl;
  schedule!: FormControl;
  date!: FormControl;
  description!: FormControl;
  user!: FormControl;
  appointmentForm!: FormGroup;

  today = new Date();
  @Output() onHide = new EventEmitter<boolean>();

  constructor(
    private readonly httpService: HttpService,
    private readonly toastService: ToastService,
    private readonly storageService: StorageService,
    private readonly loaderService: LoaderService
  ) {
    this.initForm();
    this.userStorage = this.storageService.get(KEYS.USER);
  }
  async ngOnInit() {
    const userStorage = this.storageService.get(KEYS.USER);
    if (
      this.userStorage.role !== 'admin' &&
      this.userStorage.role !== 'coordinator'
    ) {
      this.user.setValue(userStorage.id);
    } else {
      this.students = (
        await this.httpService.request<IUser[]>(
          `${environment.apiUrl}user/all`,
          'GET'
        )
      ).data;
      this.studentsToShow = this.students.map((stu) => ({
        id: stu.id,
        name: `${stu.name} ${stu.last_name}`,
      }));
    }
    console.log(
      '🚀  ~ AppointmentFormComponent ~ ngOnInit ~ resp:',
      this.students
    );
    console.log(
      '🚀  ~ AppointmentFormComponent ~ ngOnInit ~ userStorage:',
      userStorage
    );
    this.psychologists = (
      await this.httpService.request<IUser[]>(
        `${environment.apiUrl}user/psychologist`,
        'GET'
      )
    ).data;
    this.psychologists = this.psychologists.map((psyco) => ({
      ...psyco,
      name: `${psyco.name} ${psyco.last_name}`,
    }));
    this.reasons = (
      await this.httpService.request<IReason[]>(
        `${environment.apiUrl}reason`,
        'GET'
      )
    ).data;
    console.log(
      '🚀  ~ AppointmentFormComponent ~ ngOnInit ~ reason:',
      this.reasons
    );
  }
  toggleVisible() {
    this.visible = !this.visible;
  }

  public resetForm() {
    this.onHide.emit(true);
  }

  print(event: any) {
    console.log('🚀  ~ AppointmentFormComponent ~ print ~ event:', event);
  }

  public async filterCauses(event: IReason) {
    this.reason.setValue(event.id);
    this.causes = (
      await this.httpService.request<IReason[]>(
        `${environment.apiUrl}cause/${event.id}`,
        'GET'
      )
    ).data;
    console.log(
      '🚀  ~ AppointmentFormComponent ~ filterCauses ~ causes:',
      this.causes
    );
  }

  public async createAppointment() {
    try {
      this.loaderService.show();
      await this.httpService.request(
        `${environment.apiUrl}appointment`,
        'POST',
        { ...this.appointmentForm.value, status: STATUS_ACTIVE }
      );
      this.appointmentForm.reset();
      this.schedulesToShow = [];
      this.reasons = [];
      this.causes = [];
      this.psychologists = [];
      this.students = [];
      this.studentsToShow = [];
      this.schedulesToShow = [];
      this.ngOnInit();
      setTimeout(() => {
        this.toastService.show({
          severity: 'success',
          detail: 'Appointment saved',
          sumary: 'Success',
        });
        this.loaderService.hide();
        this.visible = false;
      }, 5000);
    } catch (error) {
      this.loaderService.hide();
      this.toastService.show({
        severity: 'error',
        sumary: 'Error',
        detail: 'Could not save the appointment',
      });
    }
  }

  public async filterSchedule(event: Date) {
    console.log(
      '🚀  ~ AppointmentFormComponent ~ filterSchedule ~ event:',
      event.getDay()
    );
    if (event.getDay() === SUNDAY) {
      return this.toastService.show({
        severity: 'error',
        sumary: 'The date is invalid',
        detail: 'Cannot set sunday',
      });
    }
    const date = `${event.getFullYear()}-${event.getMonth() + 1}-${
      event.getDate() < 10 ? '0' + event.getDate() : event.getDate()
    }`;
    console.log(new Date().toISOString());
    console.log('Day', DAYS[event.getDay()], date);
    this.date.setValue(event.toISOString());
    this.schedules = (
      await this.httpService.request<ISchedule[]>(
        `${environment.apiUrl}schedule?day=${
          DAYS[event.getDay()]
        }&date=${date}`,
        'GET'
      )
    ).data;
    this.schedulesToShow = this.schedules.map((sche) => ({
      id: sche.id,
      name: `${sche.day} ${sche.start_time} - ${sche.end_time}`,
    }));
    console.log(
      '🚀  ~ AppointmentFormComponent ~ filterSchedule ~ schedules:',
      this.schedules
    );
  }

  private initForm() {
    this.psychologist = new FormControl('', [Validators.required]);
    this.reason = new FormControl('', [Validators.required]);
    this.cause = new FormControl('', [Validators.required]);
    this.schedule = new FormControl('', [Validators.required]);
    this.description = new FormControl('', [Validators.required]);
    this.user = new FormControl('', [Validators.required]);
    this.date = new FormControl('', [Validators.required]);

    this.appointmentForm = new FormGroup({
      psychologist: this.psychologist,
      reason: this.reason,
      cause: this.cause,
      schedule: this.schedule,
      description: this.description,
      date: this.date,
      user: this.user,
    });
  }
}
