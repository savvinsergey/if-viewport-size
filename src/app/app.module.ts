import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {SharedModule} from "./shared/shared.module";
import {CONFIG_TOKEN, CONFIG} from "./app.config";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    SharedModule
  ],
  providers: [
    { provide: CONFIG_TOKEN, useValue: CONFIG }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
