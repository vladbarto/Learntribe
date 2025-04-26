import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LecturesModule} from './feature/lectures/lectures.module';
import {SharedModule} from './shared/shared.module';
import {HomeModule} from './feature/home/home.module';
import {ContactModule} from './feature/contact/contact.module';
import {HeaderComponent} from './shared/components/header/header.component';
import { GeolocationComponent } from './feature/geolocation/geolocation.component';
import {requestInterceptor} from './core/http-interceptor/http-interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {EnrollmentsModule} from './feature/enrollments/enrollments.module';
import {CalendarModule, CalendarUtils, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        GeolocationComponent,
    ],
    imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      HomeModule,
      LecturesModule,
      ContactModule,
      SharedModule,
      EnrollmentsModule,
      CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
    ],
    exports: [
        HeaderComponent,
    ],
    providers: [
      provideHttpClient(withInterceptors([requestInterceptor])),
      provideAnimationsAsync(),
      {
        provide: CalendarUtils,
        useClass: CalendarUtils, // <- THIS LINE
      },
    ]
})
export class AppModule { }
