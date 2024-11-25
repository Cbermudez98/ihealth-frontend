// sidebar.component.ts
import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar/sidebar.service';
import { HttpService } from '../../services/HTTP/http.service';
import { environment } from '../../../environments/enviroments';
import { ResponseMenu } from '../../interfaces/ResponseMenu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  routes: any[] = [];
  isOpen = false;

  constructor(
    private readonly sidebarService: SidebarService,
    private readonly httpService: HttpService
  ) {}

  async ngOnInit() {
    const url = environment.apiUrl + 'menu';
    const menu = await this.httpService.request<ResponseMenu>(url, 'GET');
    if(menu.status){
      this.routes = menu.data;
    }
    console.log(menu);

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
}
