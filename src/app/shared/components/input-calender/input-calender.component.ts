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
    
  @Output() ageCalculated = new EventEmitter<number>();

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
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }
}