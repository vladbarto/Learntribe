import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { NotFoundComponent} from './components/not-found/not-found.component';
import {FormsModule} from "@angular/forms";
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormField} from '@angular/material/form-field';

@NgModule({
  declarations: [
    HeaderComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormField
  ],
  exports: [
    HeaderComponent, // Export it so other modules can use it
    NotFoundComponent
  ]
})
export class SharedModule { }
