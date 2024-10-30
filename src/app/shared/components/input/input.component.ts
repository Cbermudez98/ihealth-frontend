import { Component, Input, input } from '@angular/core';
import { FormControl } from '@angular/forms';

type InputType = 'text' | 'number' | 'email' | 'password';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: InputType = 'text';
  @Input() control: FormControl = new FormControl();

  public setValue(event: any): void {
    this.control.setValue(event.target.value);
  }
}
