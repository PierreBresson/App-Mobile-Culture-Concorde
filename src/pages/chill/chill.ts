import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { ShareModalPage } from '../share-modal/share-modal';

import { soundManager } from 'soundmanager2';

import { Track, SoundcloudPlayer } from '../../providers/soundcloud-player';
import { Vibrant } from '../../providers/vibrant';



@Component({
  selector: 'page-chill',
  templateUrl: 'chill.html',
  providers: [SoundcloudPlayer, Vibrant]
})
export class ChillPage {
  public header: string = "Chillwave playlist";
  private name: string = "Chillwave playlist";

  public track: Track;
  private tracks: Track[];
  private colors: any;
  public trackColor: string;

  private canChange: boolean = true;
	private playTrack: number = 0;
  public currentIconState: string = "play";

	private streamUrl: string = "http://api.soundcloud.com/";
	private soundcloudEND: string = "?client_id=HERE";

  constructor(public nav: NavController, public param: NavParams, public modalCtrl: ModalController, private soundcloudplayer: SoundcloudPlayer, public vibrant: Vibrant) {
    this.tracks = param.data;
		var _this = this;
		soundManager.setup({ preferFlash: false, debugMode: false, useHTML5Audio: true,
			onready: function() {},
			defaultOptions: {
				onfailure: function() { _this.next(); },
				onfinish: function() { _this.next(); },
        onload: function() {
          _this.header = _this.name;
        },
        onplay: function() {
          _this.header = "Loading...";
        }
			}
		});
		this.track = {
			id: 0, title: 'Fetching tracks...', artwork_url: 'assets/data/artwork.jpg',
      permalink_url: '', artist:'Please wait a little :)'
		};
  }

  ionViewWillEnter() {
    this.trackColor = "#000";
    this.tracks = this.soundcloudplayer.shuffle(this.tracks);
    this.track = this.tracks[0];
    this.load(this.track.id);
    this.giveMeColors(this.track.artwork_url);
    this.currentIconState = "play";
  }

  ionViewWillLeave() {
    soundManager.pause("sound");
    soundManager.unload("sound");
    soundManager.destroySound("sound");
  }

  giveMeColors(url: string){
    this.vibrant.getVibrant(url).then((data) => {
      this.colors = data;
      console.log(this.colors);
      if(this.colors.vibrant){
        this.trackColor = this.colors.vibrant;
      }
    }).catch((error) => {
      this.colors = error;
      console.log(this.colors);
    });
  }

  load(trackID: number){
    let url = this.streamUrl + "tracks/" + trackID + "/stream" + this.soundcloudEND;
    soundManager.createSound({ id: "sound", url: url });
    this.canChange=true;
  }

  play(){
		soundManager.play("sound");
    this.currentIconState = "pause";
  }

  pause(){
		soundManager.pause("sound");
    this.currentIconState = "play";
  }

  next(){
		soundManager.pause("sound");
		soundManager.unload("sound");
		soundManager.destroySound("sound");
    if (this.playTrack == this.tracks.length-1){
      this.playTrack = 0;
    } else {
      this.playTrack++;
    }
    this.track = this.tracks[this.playTrack];
    this.load(this.track.id);
    this.play();
    this.trackColor="#000";
    this.giveMeColors(this.track.artwork_url);
    this.currentIconState = "pause";
  }

  prev(){
		soundManager.pause("sound");
		soundManager.unload("sound");
		soundManager.destroySound("sound");
    if (this.playTrack == 0){
      this.playTrack = this.tracks.length-1;
    } else {
      this.playTrack--;
    }
    this.track = this.tracks[this.playTrack];
    this.load(this.track.id);
    this.play();
    this.trackColor="#000";
    this.giveMeColors(this.track.artwork_url);
    this.currentIconState = "pause";
  }


  action(event){
    if (this.canChange) {
      this.canChange=false;
      switch (event.action) {
        case "play":
          this.play();
          break;
        case "pause":
          this.pause();
          break;
        case "next":
          this.next();
          break;
        case "prev":
          this.prev();
          break;
        default:
          console.log("error action event");
          break;
      }
      this.canChange=true;
    }
  }

  openMinimalPlayer(){
    if(this.colors){
      let profileModal = this.modalCtrl.create(ShareModalPage, {
        track: this.track,
        colors: this.colors
      });
      profileModal.present();
    }
  }

}
