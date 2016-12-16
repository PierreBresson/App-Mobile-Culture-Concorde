import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { Observable } from 'rxjs/Rx';

import { SoundcloudFetcher } from '../../providers/soundcloud-fetcher';

@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
    providers: [SoundcloudFetcher]
})
export class IntroPage {

  public message: string;
  private jsonData: any;
	public display_reload_button: boolean;

  constructor(public nav: NavController, private soundcloudfetcher: SoundcloudFetcher) {
    this.display_reload_button = false;
    this.message = "App loading, make sure you have internet.";
  }

  ionViewDidLoad() {
    this.loadSoundcloudData();
  }

  loadSoundcloudData(){ 
    this.soundcloudfetcher.grabDataUser(37585068)
    .subscribe(data => {
      this.jsonData = data;
      //processAllSongs      
      Observable.forkJoin( 
          this.soundcloudfetcher.getChillPlaylist(37585068,data), 
          this.soundcloudfetcher.getHousePlaylist(37585068,data),
          this.soundcloudfetcher.getDeepPlaylist(37585068,data),
          this.soundcloudfetcher.getMixtapePlaylist(37585068,data))
      .subscribe(playlist => {
        this.nav.push(TabsPage,playlist);
      }, error => {
        this.display_reload_button = true;
        this.message = "Oups, can't handle the data.";
      });
    }, err => {
      this.display_reload_button = true;
      this.message = "Oups, can't reach Soundcloud server.";
    });
  }

}
