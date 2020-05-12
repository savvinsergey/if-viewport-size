import {InjectionToken} from "@angular/core";

export const CONFIG_TOKEN = new InjectionToken<string>('config');

export const CONFIG = {
  screen: {
    medium: 700,
    large: 1200
  }
};
