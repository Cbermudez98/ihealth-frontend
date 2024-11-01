import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from '../pages/login/login.component';
import { RegisterComponent } from '../pages/register/register.component';

import { InputComponent } from './components/input/input.component';
import { ButtonComponent } from './components/button/button.component';
import { CheckboxComponent } from './components/checkbox/checkbox.component';

import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';


const COMPONENTS = [LoginComponent,RegisterComponent, InputComponent, ButtonComponent, CheckboxComponent];
const IMPORTS = [CommonModule, FloatLabelModule, InputTextModule, ButtonModule, CheckboxModule]

@NgModule({
  declarations: [...COMPONENTS,],
  imports: [...IMPORTS],
  exports: [...COMPONENTS],
})
export class SharedModule {}
