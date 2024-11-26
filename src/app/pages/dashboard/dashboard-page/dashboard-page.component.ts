// dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../../shared/services/sidebar/sidebar.service';


@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit {
  constructor(
    private sidebarService: SidebarService
  ) {}

  async ngOnInit() {}

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}
