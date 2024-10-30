import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

const COMPONENTS = [InputComponent, ButtonComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, FloatLabelModule, InputTextModule, ButtonModule],
  exports: [...COMPONENTS],
})
export class SharedModule {}
