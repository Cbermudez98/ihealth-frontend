import { Component } from '@angular/core';
import { StorageService } from '../../../../shared/services/storage/storage.service';
import { KEYS } from '../../../../core/constants.enum';
import { IUserStorage } from '../../../../interfaces/IUser';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss',
})
export class DashboardHomeComponent {
  name: string = '';
  message: string = '';
  constructor(private readonly storageService: StorageService) {
    const userStorage: IUserStorage = this.storageService.get(KEYS.USER);
    this.name = `${userStorage.name} ${userStorage.last_name}`;

    const newDate = new Date();
    const hour = newDate.getHours();
    if (hour <= 12) {
      this.message = 'Buenos dias';
    } else if (hour > 12 && hour <= 18) {
      this.message = 'Buenas tardes';
    } else {
      this.message = 'Buenas noches';
    }
  }
}
