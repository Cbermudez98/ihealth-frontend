import { Component } from '@angular/core';

@Component({
  selector: 'app-input-calender',
  templateUrl: './input-calender.component.html',
  styleUrl: './input-calender.component.scss'
})
export class InputCalenderComponent {
    date: Date | undefined;
}
