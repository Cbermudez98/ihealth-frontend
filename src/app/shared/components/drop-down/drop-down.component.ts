import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessorDirective } from '../control-value-accessor.directive';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropDownComponent),
      multi: true,
    }
  ]
})
export class DropDownComponent <T> extends ControlValueAccessorDirective <T> implements OnInit{
    @Input() options: any[] = [];
    @Input() placeholder: string = 'select an option';
    @Input() optionLabel: string = '';
    @Input() optionValue: string = '';


    //override ngOnInit() {
    //    this.gender = [
    //        { name: 'Mujer', code: 'M' },
    //        { name: 'Hombre', code: 'H' },
    //    ];
    //}
}
