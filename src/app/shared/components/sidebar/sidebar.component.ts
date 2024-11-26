// sidebar.component.ts
import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar/sidebar.service';
import { HttpService } from '../../services/HTTP/http.service';
import { environment } from '../../../environments/enviroments';
import { ResponseMenu } from '../../interfaces/ResponseMenu';
import { ResponseUser} from '../../interfaces/ResponseUser';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  routes: any[] = [];
  info: ResponseUser['data'] | null = null;
  isOpen = false;

  constructor(
    private readonly sidebarService: SidebarService,
    private readonly httpService: HttpService,
    private readonly storageService: StorageService,
    private readonly router: Router
  ) {}

  async ngOnInit() {
    const url = environment.apiUrl;
    const getMenu = url + 'menu';
    const getUser = url + 'user';

    const menu = await this.httpService.request<ResponseMenu>(getMenu, 'GET');
    if(menu.status){
      this.routes = menu.data;
    }
    console.log(menu);

    const user = await this.httpService.request<ResponseUser>(getUser, 'GET');
    console.log(user);
    if(user.status){
      this.info = user.data;
    }


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
    this.storageService.remove('access_token');
    this.router.navigate(['auth/login']);
  }
}
