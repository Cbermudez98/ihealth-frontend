import { Component, EventEmitter, forwardRef, Input, Output} from '@angular/core';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorDirective } from '../control-value-accessor.directive';

type InputType = 'text' | 'number' | 'email' | 'password';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    }
  ]
})
export class InputComponent <T> extends ControlValueAccessorDirective <T> {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: InputType = 'text';
  @Input() togleMask: boolean = false;
  @Output() input = new EventEmitter<any>();

  onInput(event: Event) {
    this.input.emit(event);
  }
}
