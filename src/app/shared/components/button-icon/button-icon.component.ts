import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-icon',
  templateUrl: './button-icon.component.html',
  styleUrl: './button-icon.component.scss'
})
export class ButtonIconComponent {
    @Input() label: string = '';
    @Input() gender: string = '';
    @Input() url: string = '';
    @Input() isSelected: boolean = false; 
    @Output() genderSelected = new EventEmitter<string>();
  
    selectGender() {
      this.isSelected = true;
      this.genderSelected.emit(this.gender);
    }
}
