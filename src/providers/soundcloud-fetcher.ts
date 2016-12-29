import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';


export interface Track {
	id: number;
	title: string;
	artwork_url: string;
	permalink_url: string;
	artist: string;
}

@Injectable()
export class SoundcloudFetcher {

	private playlistChillwave: Track[];
    private playlistFunkyHouse: Track[];
    private playlistDeepAndTech: Track[];
    private playlistMixtapes: Track[];

	private JSONdata: any[];

	private streamUrl: string = "http://api.soundcloud.com/";
	private soundcloudEND: string = "?client_id=HERE";

	constructor(private platform: Platform, private http: Http) {}

	grabDataUser(userID: Number){
		if (this.JSONdata) {
			return Observable.of(this.JSONdata);
		} else {
			let url = this.streamUrl + "users/" + String(userID) + "/playlists" + this.soundcloudEND
			return this.http.get(url)
			.map((res: Response) => res.json())
			.do((data) => { this.JSONdata = data })
			.catch((error: any) => Observable.throw(error.json().error || 'Server error'));
		}
	}

	getChillPlaylist(userID: Number,data: any) {
		console.log("getChillPlaylist");
		if (this.playlistChillwave) {
			return Observable.of(this.playlistChillwave);
		} else {
			try {
				for (let i = 0; i < data.length; i++) {
					if ("Chillwave" == data[i]["title"]) {
						if (data[i]["tracks"]) {
							let dataPlaylist: any[] = [];
							this.playlistChillwave = [];
							dataPlaylist = data[i]["tracks"];
							for (let j = 0; j < dataPlaylist.length; j++) {
								if (dataPlaylist[j]["streamable"]) {
									try {
										let track = {
											id: dataPlaylist[j]["id"],
											title: dataPlaylist[j]["title"],
											artwork_url: dataPlaylist[j]["artwork_url"].replace("large.jpg", "t500x500.jpg"),
											permalink_url: dataPlaylist[j]["permalink_url"],
											purchase_url : dataPlaylist[j]["purchase_url"],
											artist: dataPlaylist[j]["user"]["username"]
										};
										this.playlistChillwave.push(track);
									} catch (error) {
										 Observable.throw(error || 'data processing error');
									}
								} else {
									console.log(dataPlaylist[j]["permalink_url"]);
								}
							}
						}
					}
				}

				return Observable.of(this.playlistChillwave);
				
			} catch (error) {
				Observable.throw(error || 'data processing error');
			}
		}
	}



	getHousePlaylist(userID: Number,data: any) {
		console.log("getHousePlaylist");
		if (this.playlistFunkyHouse) {
			return Observable.of(this.playlistFunkyHouse);
		} else {
			try {

				for (let i = 0; i < data.length; i++) {
					if ("Funky House" == data[i]["title"]) {
						if (data[i]["tracks"]) {
							let dataPlaylist: any[] = [];
							this.playlistFunkyHouse = [];
							dataPlaylist = data[i]["tracks"];
							for (let j = 0; j < dataPlaylist.length; j++) {
								if (dataPlaylist[j]["streamable"]) {
									try {
										let track = {
											id: dataPlaylist[j]["id"],
											title: dataPlaylist[j]["title"],
											artwork_url: dataPlaylist[j]["artwork_url"].replace("large.jpg", "t500x500.jpg"),
											permalink_url: dataPlaylist[j]["permalink_url"],
											purchase_url : dataPlaylist[j]["purchase_url"],
											artist: dataPlaylist[j]["user"]["username"]
										};
										this.playlistFunkyHouse.push(track);
									} catch (error) {
										 Observable.throw(error || 'data processing error');
									}
								} else {
									console.log(dataPlaylist[j]["permalink_url"]);
								}
							}
						}
					}
				}

				return Observable.of(this.playlistFunkyHouse);

			} catch (error) {
				Observable.throw(error || 'data processing error');
			}
		}
	}

	getDeepPlaylist(userID: Number,data: any) {
		console.log("getDeepPlaylist");
		if (this.playlistDeepAndTech) {
			return Observable.of(this.playlistDeepAndTech);
		} else {
			try {

				for (let i = 0; i < data.length; i++) {
					if ("Deep & Tech" == data[i]["title"]) {
						if (data[i]["tracks"]) {
							let dataPlaylist: any[] = [];
							this.playlistDeepAndTech = [];
							dataPlaylist = data[i]["tracks"];
							for (let j = 0; j < dataPlaylist.length; j++) {
								if (dataPlaylist[j]["streamable"]) {
									try {
										let track = {
											id: dataPlaylist[j]["id"],
											title: dataPlaylist[j]["title"],
											artwork_url: dataPlaylist[j]["artwork_url"].replace("large.jpg", "t500x500.jpg"),
											permalink_url: dataPlaylist[j]["permalink_url"],
											purchase_url : dataPlaylist[j]["purchase_url"],
											artist: dataPlaylist[j]["user"]["username"]
										};
										this.playlistDeepAndTech.push(track);
									} catch (error) {
										 Observable.throw(error || 'data processing error');
									}
								} else {
									console.log(dataPlaylist[j]["permalink_url"]);
								}
							}
						}
					}
				}

				return Observable.of(this.playlistDeepAndTech);
				
			} catch (error) {
				Observable.throw(error || 'data processing error');
			}
		}
	}

	getMixtapePlaylist(userID: Number,data: any) {
		console.log("getMixtapePlaylist");
		if (this.playlistMixtapes) {
			return Observable.of(this.playlistMixtapes);
		} else {
			try {

				for (let i = 0; i < data.length; i++) {
					if ("Mixtapes" == data[i]["title"]) {
						if (data[i]["tracks"]) {
							let dataPlaylist: any[] = [];
							this.playlistMixtapes = [];
							dataPlaylist = data[i]["tracks"];
							for (let j = 0; j < dataPlaylist.length; j++) {
								if (dataPlaylist[j]["streamable"]) {
									try {
										let track = {
											id: dataPlaylist[j]["id"],
											title: dataPlaylist[j]["title"],
											artwork_url: dataPlaylist[j]["artwork_url"].replace("large.jpg", "t500x500.jpg"),
											permalink_url: dataPlaylist[j]["permalink_url"],
											purchase_url : dataPlaylist[j]["purchase_url"],
											artist: dataPlaylist[j]["user"]["username"]
										};
										this.playlistMixtapes.push(track);
									} catch (error) {
										 Observable.throw(error || 'data processing error');
									}
								} else {
									console.log(dataPlaylist[j]["permalink_url"]);
								}
							}
						}
					}
				}

				return Observable.of(this.playlistMixtapes);
				
			} catch (error) {
				Observable.throw(error || 'data processing error');
			}
		}
	}

	getAllPlaylist(userID: Number,data: any) {
		return Observable.forkJoin( 
			this.getChillPlaylist(userID,data), 
			this.getHousePlaylist(userID,data),
			this.getDeepPlaylist(userID,data),
			this.getMixtapePlaylist(userID,data)
		);
	}

}
