import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IntroPage } from '../pages/intro/intro';
import { ChillPage } from '../pages/chill/chill';
import { HousePage } from '../pages/house/house';
import { DeepPage } from '../pages/deep/deep';
import { MixtapesPage } from '../pages/mixtapes/mixtapes';
import { AboutPage } from '../pages/about/about';
import { ShareModalPage } from '../pages/share-modal/share-modal';
import { TabsPage } from '../pages/tabs/tabs';

import { PlayerComponent } from '../components/player/player';
import { SongDetailsComponent } from '../components/song-details/song-details';

import { TruncatePipe } from '../pipes/truncate';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ChillPage,
    HousePage,
    DeepPage,
    MixtapesPage,
    ShareModalPage,
    TabsPage,
    PlayerComponent,
    SongDetailsComponent,
    IntroPage,
    TruncatePipe
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ChillPage,
    HousePage,
    DeepPage,
    MixtapesPage,
    ShareModalPage,
    TabsPage,
    PlayerComponent,
    SongDetailsComponent,
    IntroPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
