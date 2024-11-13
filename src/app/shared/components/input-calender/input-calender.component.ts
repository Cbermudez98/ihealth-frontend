import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input-calender',
  templateUrl: './input-calender.component.html',
  styleUrl: './input-calender.component.scss'
})
export class InputCalenderComponent {
    date: Date | undefined;
    age: number | null = null;
    
  @Output() ageCalculated = new EventEmitter<number>();

  onDateChange() {
    if (this.date) {
      const age = this.calculateAge(this.date);
      this.ageCalculated.emit(age);
    }
  }

  calculateAge(birthDate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
