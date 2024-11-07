import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { ControlValueAccessorDirective } from './shared/components/control-value-accessor.directive';
import { ToastModule } from 'primeng/toast';
@NgModule({
  declarations: [AppComponent, ControlValueAccessorDirective],
  imports: [SharedModule, CoreModule, AppRoutingModule, HttpClientModule, ToastModule,BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
