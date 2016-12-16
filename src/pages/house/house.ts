import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { ShareModalPage } from '../share-modal/share-modal';

import { soundManager } from 'soundmanager2';

import { Track, SoundcloudPlayer } from '../../providers/soundcloud-player';
import { Vibrant } from '../../providers/vibrant';



@Component({
  selector: 'page-house',
  templateUrl: 'house.html',
  providers: [SoundcloudPlayer, Vibrant]
})
export class HousePage {

    public track: Track;
    private tracks: Track[];
    private colors: any;
    public trackColor: string;

    private isPlaying: boolean;
    private canChange: boolean = true;
  	private playTrack: number = 0;

  	private streamUrl: string = "http://api.soundcloud.com/";
  	private soundcloudEND: string = "?client_id=HERE";

    constructor(public nav: NavController, public param: NavParams, public modalCtrl: ModalController, private soundcloudplayer: SoundcloudPlayer, public vibrant: Vibrant) {
      this.tracks= param.data;
      this.isPlaying = false;
  		var _this = this;
  		soundManager.setup({ preferFlash: false, debugMode: false, useHTML5Audio: true,
  			onready: function() {},
  			defaultOptions: {
  				onfailure: function() { _this.next(); },
  				onfinish: function() { _this.next(); }
  			}
  		});
  		this.track = {
  			id: 0, title: 'Fetching tracks...', artwork_url: 'assets/data/artwork.jpg',
        permalink_url: '', artist:'Please wait a little :)'
  		};
      this.trackColor = "#000";
    }

    ionViewWillEnter() {
      this.tracks = this.soundcloudplayer.shuffle(this.tracks);
      this.track = this.tracks[0];
      this.loadAndPlay(this.track.id);
      this.giveMeColors(this.track.artwork_url);
    }

    ionViewWillLeave() {
      this.leave();
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

    loadAndPlay(trackID: number){
      let url = this.streamUrl + "tracks/" + trackID + "/stream" + this.soundcloudEND;
      soundManager.createSound({ id: "sound", url: url });
      soundManager.play("sound");
      this.canChange=true;
    }

    leave(){
      soundManager.pause("sound");
      soundManager.unload("sound");
      soundManager.destroySound("sound");
    }

    play(){
  		soundManager.play("sound");
    }

    pause(){
  		soundManager.pause("sound");
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
      this.loadAndPlay(this.track.id);
      this.trackColor="#000";
      this.giveMeColors(this.track.artwork_url);
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
      this.loadAndPlay(this.track.id);
      this.trackColor="#000";
      this.giveMeColors(this.track.artwork_url);
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
