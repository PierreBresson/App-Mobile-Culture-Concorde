import { Injectable } from '@angular/core';


export interface Track {
	id: number;
	title: string;
	artwork_url: string;
	permalink_url: string;
	artist: string;
}

@Injectable()
export class SoundcloudPlayer {

	constructor() {}

	shuffle(playlist: Track[]) {
		for (let i = playlist.length; i; i--) {
			let j = Math.floor(Math.random() * i);
			[playlist[i - 1], playlist[j]] = [playlist[j], playlist[i - 1]];
		}
		return playlist;
	}


}
