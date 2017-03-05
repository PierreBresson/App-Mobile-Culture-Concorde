import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { MusicControls } from 'ionic-native';

import { ShareModalPage } from '../share-modal/share-modal';

import { soundManager } from 'soundmanager2';

import { Track, SoundcloudPlayer } from '../../providers/soundcloud-player';
import { Vibrant } from '../../providers/vibrant';



@Component({
  selector: 'page-deep',
  templateUrl: 'deep.html',
  providers: [SoundcloudPlayer, Vibrant]
})
export class DeepPage {
  public header: string = "Deep & Tech playlist";
  private name: string = "Deep & Tech playlist";

  public track: Track;
  private tracks: Track[];
  private colors: any;
  public trackColor: string;
  public width: number;

  private canChange: boolean = true;
	private playTrack: number = 0;
  public currentIconState: string = "play";
  public currentTime:number = 0;

	private streamUrl: string = "http://api.soundcloud.com/";
	private soundcloudEND: string = "?client_id=HERE";

  constructor(public nav: NavController, 
  public param: NavParams, 
  public modalCtrl: ModalController, 
  private soundcloudplayer: SoundcloudPlayer, 
  public vibrant: Vibrant,
  public platform: Platform) {
    this.tracks = param.data;
    console.log('Width: ' + platform.width());
    console.log('Height: ' + platform.height());
    if( platform.height()/platform.width() < 1.9){
      let h = platform.height();
      this.width = (h - 280)*0.80;
      console.log(this.width);
    } else {
      let h = platform.height();
      this.width = (h - 280)*0.90;
      console.log(this.width);
    }
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
			id: 0, title: 'Fetching tracks...', artwork_url: 'assets/data/artwork.png',
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
    //this.createMusicControls(this.track.title, this.track.artist, this.track.artwork_url);
  }

  ionViewWillLeave() {
    soundManager.pause("sound");
    soundManager.unload("sound");
    soundManager.destroySound("sound");
    this.header = this.name;
  }

  createMusicControls(track: string, artist: string, cover: string){
    if (this.platform.is('cordova')) {
      MusicControls.create({
        track       : track,        // optional, default : ''
        artist      : artist,                       // optional, default : ''
        cover       : cover,      // optional, default : nothing
        // cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app)
        //           or a remote url ('http://...', 'https://...', 'ftp://...')
        isPlaying   : true,                         // optional, default : true
        dismissable : false,                         // optional, default : false

        // hide previous/next/close buttons:
        hasPrev   : true,      // show previous button, optional, default: true
        hasNext   : true,      // show next button, optional, default: true
        hasClose  : true,       // show close button, optional, default: false

        // Android only, optional
        // text displayed in the status bar when the notification (and the ticker) are updated
        ticker    : 'Now playing "'+track+'"'
      });
      MusicControls.subscribe().subscribe(action => {
        switch(action) {
            case 'music-controls-next':
                this.next();
                break;
            case 'music-controls-previous':
                this.prev();
                break;
            case 'music-controls-pause':
                this.pause();
                break;
            case 'music-controls-play':
                this.play();
                break;
            case 'music-controls-destroy':
                soundManager.pause("sound");
                soundManager.unload("sound");
                soundManager.destroySound("sound");
                break;

            // Headset events (Android only)
            case 'music-controls-media-button' :
                // Do something
                break;
            case 'music-controls-headset-unplugged':
                this.pause();
                break;
            case 'music-controls-headset-plugged':
                this.play();
                break;
            default:
                break;
        }

      });
      MusicControls.listen(); // activates the observable above
      MusicControls.updateIsPlaying(true);
    }
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
    var _this = this;
    soundManager.createSound({ id: "sound", url: url,whileplaying: function() {
      _this.currentTime = Math.floor((this.position/this.duration) * 100);
      this.currentTime = _this.currentTime;
    }});
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

  openShare(){
    if(this.colors){
      let profileModal = this.modalCtrl.create(ShareModalPage, {
        track: this.track,
        colors: this.colors
      });
      profileModal.present();
    }
  }

}