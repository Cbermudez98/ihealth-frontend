import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-icon',
  templateUrl: './button-icon.component.html',
  styleUrl: './button-icon.component.scss'
})
export class ButtonIconComponent {
  @Input() gender: string ='';
  @Input() label: string = '';
  @Input() url: string = '';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() severity: string = 'primary';
  @Input() disabled: boolean = false;
}
