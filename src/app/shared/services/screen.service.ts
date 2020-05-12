import {Inject, Injectable, OnDestroy} from '@angular/core';
import {fromEvent} from "rxjs/internal/observable/fromEvent";
import {debounceTime} from "rxjs/operators";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {Subscription} from "rxjs/internal/Subscription";
import {CONFIG, CONFIG_TOKEN} from "../../app.config";

@Injectable()
export class ScreenService implements OnDestroy {
  private _screenMode$ = new BehaviorSubject<string>(null);
  private _subscription: Subscription = null;

  set screenMode(value: string) {
    this._screenMode$.next(value)
  }

  get screenMode(): string {
    return this._screenMode$.value;
  }

  get screenMode$() {
    return this._screenMode$.asObservable()
  }

  constructor(@Inject(CONFIG_TOKEN) private _config: any) {
    this._subscription = fromEvent(window, 'resize')
      .pipe(
        debounceTime(500)
      )
      .subscribe(() => {
        const newScreenMode = this._determineScreenMode(window.innerWidth);
        if (newScreenMode !== this.screenMode) {
          this.screenMode = newScreenMode
        }
      });

    this.screenMode = this._determineScreenMode(window.innerWidth);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  private _determineScreenMode(screenWidth: number): string {
    if (screenWidth < this._config.screen.medium) {
      return Modes.SMALL;
    }

    if (this._config.screen.medium <= screenWidth &&
      screenWidth < this._config.screen.large) {
      return Modes.MEDIUM;
    }

    if (this._config.screen.large <= screenWidth ) {
      return Modes.LARGE;
    }
  }
}

export enum Modes {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}
