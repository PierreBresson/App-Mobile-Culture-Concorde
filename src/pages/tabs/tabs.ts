import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { ChillPage } from '../chill/chill';
import { HousePage } from '../house/house';
import { DeepPage } from '../deep/deep';
import { MixtapesPage } from '../mixtapes/mixtapes';

import { AboutPage } from '../about/about';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = ChillPage;
  tab2Root: any = HousePage;
  tab3Root: any = DeepPage;
  tab4Root: any = MixtapesPage;
  tab5Root: any = AboutPage;

	public playlistChillwave: any[];
  public playlistFunkyHouse: any[];
  public playlistDeepAndTech: any[];
  public playlistMixtapes: any[];

  constructor(public param: NavParams) {
    this.playlistChillwave = param.data[0];
    this.playlistFunkyHouse = param.data[1];
    this.playlistDeepAndTech = param.data[2];
    this.playlistMixtapes = param.data[3];
  }
}
