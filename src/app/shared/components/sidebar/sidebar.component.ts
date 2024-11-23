// sidebar.component.ts
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { StorageService } from '../../services/storage/storage.service';
import { SidebarService } from '../../services/sidebar/sidebar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  routes: any[] = [];
  isOpen = false;

  constructor(
    private dashboardService: DashboardService,
    private storageService: StorageService,
    private sidebarService: SidebarService
  ) {}

  ngOnInit(): void {
    const token = this.storageService.get('token');
    this.dashboardService.getMenu(token).subscribe((response) => {
      if (response.status) {
        this.routes = response.data;
      }
    });

    this.sidebarService.sidebarOpen$.subscribe(isOpen => {
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