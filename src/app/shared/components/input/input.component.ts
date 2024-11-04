import { Component, Input} from '@angular/core';
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
}
