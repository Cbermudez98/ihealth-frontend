// sidebar.component.ts
import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar/sidebar.service';
import { HttpService } from '../../services/HTTP/http.service';
import { environment } from '../../../environments/enviroments';
import { IRoute } from '../../interfaces/ResponseMenu';
import { IUser } from '../../interfaces/ResponseUser';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';
import { KEYS } from '../../../core/constants.enum';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  routes: IRoute[] = [];
  info: IUser | null = null;
  isOpen = false;

  constructor(
    private readonly sidebarService: SidebarService,
    private readonly httpService: HttpService,
    private readonly storageService: StorageService,
    private readonly router: Router,
  ) {}

  async ngOnInit() {
    const url = environment.apiUrl;
    const getMenu = url + 'menu';
    const getUser = url + 'user';

    const menu = (await this.httpService.request<IRoute[]>(getMenu, 'GET'))
      .data;
    this.routes = menu;

    console.log(menu);

    const user = (await this.httpService.request<IUser>(getUser, 'GET'))
      .data;
    console.log(user);
    this.info = user;
    this.storageService.set(KEYS.USER, {
      id: user.id,
      name: user.name,
      last_name: user.last_name,
      role: user.role.name
    });

    this.sidebarService.sidebarOpen$.subscribe((isOpen) => {
      this.isOpen = isOpen;
      const content = document.querySelector('.dashboard-content');
      if (content) {
        content.classList.toggle('blur', this.isOpen);
      }
    });
  }

  toggleSidebar(): void {
    this.sidebarService.toggleSidebar();
  }

  logout() {
    this.storageService.clear();
    this.router.navigate(['auth/login']);
  }
}
