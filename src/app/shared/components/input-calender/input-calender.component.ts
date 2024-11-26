import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessorDirective } from '../control-value-accessor.directive';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-calender',
  templateUrl: './input-calender.component.html',
  styleUrl: './input-calender.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputCalenderComponent),
      multi: true,
    }
  ]
})
export class InputCalenderComponent <T>extends ControlValueAccessorDirective<T> implements OnInit{
  @Input() label: string = '';
    date: Date | undefined;
    age: number | null = null;
  @Input() minDate = new Date(1980, 0, 0);

  @Output() ageCalculated = new EventEmitter<number>();
  @Output() dateSelected = new EventEmitter<Date>();

  override  ngOnInit() {
    this.date = new Date();
  }

  onDateChange() {
    if (this.date) {
      const age = this.calculateAge(this.date);
      this.ageCalculated.emit(age);
    }
  }

  calculateAge(birthDate: Date): number {
    this.dateSelected.emit(birthDate);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}
