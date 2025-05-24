import { NgModule } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';

import { PsychoRoutingModule } from './psycho-routing.module';
import { PsychoComponent } from './psycho.component';
import { SharedModule } from '../../../../../shared/shared.module';

@NgModule({
  declarations: [PsychoComponent],
  imports: [
    CommonModule,
    PsychoRoutingModule,
    SharedModule,
    JsonPipe
  ]
})
export class CoordPsycologistModule {}
