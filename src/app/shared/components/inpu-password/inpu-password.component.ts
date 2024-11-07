import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorDirective } from '../control-value-accessor.directive';

@Component({
  selector: 'app-inpu-password',
  templateUrl: './inpu-password.component.html',
  styleUrl: './inpu-password.component.scss',
  providers:  [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => InpuPasswordComponent),
    multi: true,
  }],
})
export class InpuPasswordComponent <T> extends ControlValueAccessorDirective <T> {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() togleMask: boolean = false;
}
