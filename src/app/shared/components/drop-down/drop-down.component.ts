import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ControlValueAccessorDirective } from '../control-value-accessor.directive';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropDownComponent),
      multi: true,
    },
  ],
})
export class DropDownComponent<T>
  extends ControlValueAccessorDirective<T>
  implements OnInit
{
  @Input() options: any[] = [];
  @Input() placeholder: string = 'Selecciona una opcion';
  @Input() optionLabel: string = '';
  @Input() optionValue: string = '';
  @Input() multiple: boolean = false;
  @Output() emitData = new EventEmitter<any>();
  @Input() set selected(value: any[]) {
    this.selectedItems = value.map((v) => v.id);
  }
  public selectedItems: number[] = [];

  public setData(event: any) {
    this.emitData.emit(event.value);
  }
}
