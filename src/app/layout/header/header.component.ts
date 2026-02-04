import { RouterModule } from '@angular/router';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    imports: [RouterModule, MatTooltipModule, MatButtonModule],
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['header.scss']
})
export class HeaderComponent { 
	showSupportUkraine = signal(false);
	localStorage = signal<string | null>(null);
	expiredIn = 30; // days
	showAgain = signal(false);

	constructor() {
		const now = new Date().getTime();
		this.localStorage.set(localStorage.getItem('supportUkraine'));
		this.showAgain.set(this.localStorage() &&
							now - JSON.parse(this.localStorage()).hiddenTime > this.expiredIn*24*60*60*1000);

		if (this.showAgain) localStorage.clear();

		this.showSupportUkraine.set(!this.localStorage());
	}
	
	closeSupportBanner(): void {
		this.showSupportUkraine.set(false);
		localStorage.setItem('supportUkraine', JSON.stringify({
			hiddenTime: new Date().getTime()
		}));
	}

	closeMenu(): void {
		const navbarToggler = document.querySelector<HTMLButtonElement>('.navbar-toggler');
		const navbarCollapse = document.querySelector<HTMLElement>('#navbarToggler');
		
		if (navbarCollapse && navbarToggler) {
			const isOpen = navbarCollapse.classList.contains('show');
			if (isOpen) {
				navbarToggler.click();
			}
		}
	}
}
