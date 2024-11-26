// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../shared/services/sidebar/sidebar.service';
import { HttpService } from '../../../shared/services/HTTP/http.service';
import { environment } from '../../../environments/enviroments';
import { IUser } from '../../../interfaces/IUser';
import { StorageService } from '../../../shared/services/storage/storage.service';
import { KEYS } from '../../../core/constants.enum';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  constructor(
    private sidebarService: SidebarService,
    private readonly httpService: HttpService,
    private readonly storageService: StorageService
  ) {}

  async ngOnInit() {
    const response = await this.httpService.request<IUser>(
      `${environment.apiUrl}user`,
      'GET'
    );
    // this.storageService.set(KEYS.USER, { id: });
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
