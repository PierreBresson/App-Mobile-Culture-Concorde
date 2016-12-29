import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { IntroPage } from '../pages/intro/intro';
import { BackgroundMode } from 'ionic-native';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = IntroPage;

  constructor(platform: Platform) {
    platform.ready().then(() => { 
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      BackgroundMode.enable();
      Splashscreen.hide();
      StatusBar.styleDefault()
    });
  }
}
