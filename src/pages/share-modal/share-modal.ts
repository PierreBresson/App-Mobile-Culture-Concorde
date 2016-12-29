import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { SocialSharing } from 'ionic-native';



@Component({
  selector: 'page-share-modal',
  templateUrl: 'share-modal.html'
})
export class ShareModalPage {

  public backgroudcolor: string;
  public textcolor: string;

  public track: any;
  public purchase: boolean;

  private shareMessageTwitter: string;
  private shareMessageFacebook: string;

  constructor(public params: NavParams, public viewCtrl: ViewController){
    this.params = params;
    this.textcolor = this.params.get('colors').vibrant
    this.backgroudcolor = this.params.get('colors').darkvibrant
    this.track = this.params.get('track');
    if (this.track.purchase_url) {
      console.log(this.track.purchase_url);
      this.purchase = true;
    } else {
      this.purchase = false;
    }
    this.shareMessageTwitter = "Playing " + this.track.title + " by " + this.track.artist + " with @CultureConcorde";
    this.shareMessageFacebook = "Playing " + this.track.title + " by " + this.track.artist + " with http://cultureconcorde.com";
  }

  close(){
    this.viewCtrl.dismiss();
  }

  facebook(){
    SocialSharing.shareViaFacebook(this.shareMessageFacebook,this.track.artwork_url,this.track.permalink_url)
    .then(()=>{
        console.log("Success");
      },
      ()=>{
        console.log("failed")
      });
  }

  twitter(){
    SocialSharing.shareViaTwitter(this.shareMessageTwitter,this.track.artwork_url,"http://cultureconcorde.com")
    .then(()=>{
        console.log("Success");
      },
      ()=>{
        console.log("failed")
      });
  }

}
