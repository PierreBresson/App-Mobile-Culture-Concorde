import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';



@Component({
  selector: 'page-share-modal',
  templateUrl: 'share-modal.html'
})
export class ShareModalPage {

  public backgroudcolor: string;
  public textcolor: string;

  public track: any;


  constructor(public params: NavParams, public viewCtrl: ViewController){
    this.params = params;
    this.textcolor = this.params.get('colors').vibrant
    this.backgroudcolor = this.params.get('colors').darkvibrant
    this.track = this.params.get('track');
  }

  close(){
    this.viewCtrl.dismiss();
  }

}
