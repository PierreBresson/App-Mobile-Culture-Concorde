import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
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
  public display_ready_to_start: boolean;
  public playlist: any;

  constructor(public nav: NavController, private soundcloudfetcher: SoundcloudFetcher, public toastCtrl: ToastController) {
    this.display_reload_button = false;
    this.display_ready_to_start = false;
  }

  ionViewDidLoad() {
    let toast = this.toastCtrl.create({
      message: 'App loading, make sure you have internet.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
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
        this.playlist = playlist;
        this.display_ready_to_start = true;
        this.message = "";
      }, error => {
        this.display_reload_button = true;
        let toast = this.toastCtrl.create({
          message: "Oups, can't handle the data.",
          duration: 3000,
          position: 'top'
        });
        toast.present();
      });
    }, err => {
      this.display_reload_button = true;
      let toast1 = this.toastCtrl.create({
          message: "Oups, can't reach Soundcloud server.",
          duration: 3000,
          position: 'top'
        });
        toast1.present();
    });
  }

  startApp(){
    this.nav.setRoot(TabsPage,this.playlist);
  }

}
