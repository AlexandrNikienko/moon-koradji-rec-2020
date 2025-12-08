import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    imports: [CommonModule, RouterModule, MatTooltipModule, MatButtonModule],
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['header.scss']
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
