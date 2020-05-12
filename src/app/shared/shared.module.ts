import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import {ifViewportSizeDirective} from "./directives/if-viewport-size.directive";
import {ScreenService} from "./services/screen.service";


@NgModule({
  declarations: [
    ifViewportSizeDirective
  ],
  exports: [
    ifViewportSizeDirective
  ],
  imports: [
    CommonModule
  ],
  providers: [
    ScreenService
  ],
})
export class SharedModule { }
