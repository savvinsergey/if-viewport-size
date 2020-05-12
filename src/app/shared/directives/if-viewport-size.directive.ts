import {Directive, Input, ViewContainerRef, TemplateRef, OnDestroy} from '@angular/core';

import {ScreenService} from "../services/screen.service";
import {Subscription} from "rxjs/internal/Subscription";

@Directive({
  selector: '[ifViewportSize]',
})
export class ifViewportSizeDirective implements OnDestroy {

  @Input('ifViewportSize')
  set ifViewportSize(screenMode: string) {
    this._subscriptions.push(
      this._screenService.screenMode$
        .subscribe((currentMode: string) => {
          if (screenMode === currentMode) {
            this._viewContainerRef.createEmbeddedView(this._templateRef);
          } else {
            this._viewContainerRef.clear();
          }
        })
    )
  }

  private _subscriptions: Subscription[] = [];

  constructor(private _templateRef: TemplateRef<any>,
              private _viewContainerRef: ViewContainerRef,
              private _screenService: ScreenService) {
  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }

}
