import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';

import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';


const COMPONENTS = [InputComponent, ButtonComponent, CheckboxComponent];

@NgModule({
  declarations: [...COMPONENTS,],
  imports: [CommonModule, FloatLabelModule, InputTextModule, ButtonModule, CheckboxModule],
  exports: [...COMPONENTS],
})
export class SharedModule {}
