import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-btn',
  templateUrl: './sidebar-btn.component.html',
  styleUrl: './sidebar-btn.component.scss',
})
export class SidebarBtnComponent {
  @Input() label: string = '';
  @Input() src: string = '';
  @Input() routerLink: string = '';
}
