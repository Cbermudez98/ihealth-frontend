import { Component, ViewChild} from '@angular/core';
import { Sidebar } from 'primeng/sidebar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  @ViewChild('sidebarRef') sidebar!: Sidebar;

  sidebarVisible = false; // Controla la visibilidad del sidebar

  closeCallback(event: Event) {
    this.sidebar.hide(); // Cierra el sidebar
  }
  
}
