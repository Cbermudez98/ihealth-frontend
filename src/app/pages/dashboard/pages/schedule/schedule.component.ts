import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../../shared/services/HTTP/http.service';
import { environment } from '../../../../environments/enviroments';
import { StorageService } from '../../../../shared/services/storage/storage.service';
import { IUserStorage } from '../../../../interfaces/IUser';
import { KEYS } from '../../../../core/constants.enum';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss',
})
export class ScheduleComponent implements OnInit {
  constructor(
    private readonly httpService: HttpService,
    private storageService: StorageService
  ) {}
  visible: boolean = false;
  public user: IUserStorage | null = null;

  async ngOnInit() {
    this.user = this.storageService.get(KEYS.USER);
  }

  showDialog() {
    this.visible = true;
  }
}
