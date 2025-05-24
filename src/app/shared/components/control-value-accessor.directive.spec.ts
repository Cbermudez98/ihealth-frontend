import { ControlValueAccessorDirective } from './control-value-accessor.directive';
import { Injector } from '@angular/core';

describe('ControlValueAccessorDirective', () => {
  it('should create an instance', () => {
    const mockInjector = {} as Injector; 
    const directive = new ControlValueAccessorDirective(mockInjector);
    expect(directive).toBeTruthy();
  });
});
