import { Component, forwardRef, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ControlValueAccessorDirective } from '../control-value-accessor.directive';

@Component({
  selector: 'app-cascade-select',
  templateUrl: './cascade-select.component.html',
  styleUrls: ['./cascade-select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CascadeSelectComponent),
      multi: true,
    },
  ],
})
export class CascadeSelectComponent<T> extends ControlValueAccessorDirective<T> implements OnInit {
  countries: any[] = []; // Cambiado a `any[]` para coincidir con PrimeNG
  selectedCity: any = null;

  override ngOnInit(): void {
    this.countries = this.getCountriesData();
  }

  private getCountriesData(): any[] {
    return [
      {
        label: 'Australia',
        value: 'AU',
        children: [
          {
            label: 'New South Wales',
            value: 'NSW',
            children: [
              { label: 'Sydney', value: 'SYD' },
              { label: 'Newcastle', value: 'NEW' },
              { label: 'Wollongong', value: 'WOL' },
            ],
          },
          {
            label: 'Queensland',
            value: 'QLD',
            children: [
              { label: 'Brisbane', value: 'BRI' },
              { label: 'Townsville', value: 'TOW' },
            ],
          },
        ],
      },
      {
        label: 'Canada',
        value: 'CA',
        children: [
          {
            label: 'Quebec',
            value: 'QUE',
            children: [
              { label: 'Montreal', value: 'MON' },
              { label: 'Quebec City', value: 'QUEC' },
            ],
          },
          {
            label: 'Ontario',
            value: 'ONT',
            children: [
              { label: 'Ottawa', value: 'OTT' },
              { label: 'Toronto', value: 'TOR' },
            ],
          },
        ],
      },
      {
        label: 'United States',
        value: 'US',
        children: [
          {
            label: 'California',
            value: 'CAL',
            children: [
              { label: 'Los Angeles', value: 'LA' },
              { label: 'San Diego', value: 'SD' },
              { label: 'San Francisco', value: 'SF' },
            ],
          },
          {
            label: 'Florida',
            value: 'FL',
            children: [
              { label: 'Jacksonville', value: 'JAC' },
              { label: 'Miami', value: 'MIA' },
              { label: 'Tampa', value: 'TAM' },
            ],
          },
        ],
      },
    ];
  }
}
