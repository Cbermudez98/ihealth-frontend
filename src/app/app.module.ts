import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ControlValueAccessorDirective } from './shared/components/control-value-accessor.directive';
@NgModule({
  declarations: [AppComponent, ControlValueAccessorDirective],
  imports: [SharedModule, CoreModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
