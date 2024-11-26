// dashboard.component.ts
import { Component } from '@angular/core';
import { SidebarService } from '../../../shared/services/sidebar/sidebar.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html', 
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {
  constructor(private sidebarService: SidebarService) {}

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}