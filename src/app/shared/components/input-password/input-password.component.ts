import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorDirective } from '../control-value-accessor.directive';

@Component({
  selector: 'app-input-password',
  templateUrl: './input-password.component.html',
  styleUrl: './input-password.component.scss',
  providers:  [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InputPasswordComponent),
    multi: true,
  }],
})
export class InputPasswordComponent <T> extends ControlValueAccessorDirective <T> {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() togleMask: boolean = false;
  @Input() showMeter: boolean = false;
}
