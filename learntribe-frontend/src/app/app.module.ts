import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LecturesModule} from './feature/lectures/lectures.module';
import {SharedModule} from './shared/shared.module';
import {HomeModule} from './feature/home/home.module';
import {ContactModule} from './feature/contact/contact.module';
import {HeaderComponent} from './shared/components/header/header.component';


@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent
    ],
    imports: [
      BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      HomeModule,
      LecturesModule,
      ContactModule,
      SharedModule
    ],
    exports: [
        HeaderComponent
    ],
    providers: [
    ]
})
export class AppModule { }
