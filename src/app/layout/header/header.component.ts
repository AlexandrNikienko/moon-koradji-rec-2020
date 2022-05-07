import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit { 
	showSupportUkraine: boolean;
	localStorage: string | null;
	expiredIn = 30; // days
	showAgain: boolean;

	ngOnInit(): void {
		const now = new Date().getTime();
		this.localStorage = localStorage.getItem('supportUkraine');
		this.showAgain = this.localStorage &&
							now - JSON.parse(this.localStorage).hiddenTime > this.expiredIn*24*60*60*1000;

		if (this.showAgain) localStorage.clear();

		this.showSupportUkraine =  !this.localStorage;
	}
	
	closeSupportBanner(): void {
		this.showSupportUkraine = false;
		localStorage.setItem('supportUkraine', JSON.stringify({
			hiddenTime: new Date().getTime()
		}));
	}
}
