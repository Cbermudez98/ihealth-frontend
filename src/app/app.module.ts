import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import {
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { ControlValueAccessorDirective } from './shared/components/control-value-accessor.directive';
import { ToastModule } from 'primeng/toast';
import { authInterceptor } from './shared/interceptor/auth.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [AppComponent, ControlValueAccessorDirective],
  imports: [
    SharedModule,
    CoreModule,
    AppRoutingModule,
    HttpClientModule,
    ToastModule,
    NgxSpinnerModule,
  ],
  providers: [provideHttpClient(withInterceptors([authInterceptor]))],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
