import { Component, HostListener } from '@angular/core';
import {
	trigger, state, style, animate, transition
} from '@angular/animations';

@Component({
	selector: 'app-scroll-to-top',
	templateUrl: './scroll-to-top.component.html',
	styleUrls: ['./scroll-to-top.component.scss'],
	animations: [
		trigger('go', [
			state('from', style({
				bottom: '80px',
				opacity: 1
			})),
			state('to', style({
				bottom: '100%',
				opacity: 0.25
			})),
			transition('from => to', [
				animate('.5s ease-in')
			]),
			transition('to => from', [
				animate(0)
			])
		])
	]
})
export class ScrollToTopComponent {
	showScrollBtn: boolean;
	goToTop: boolean;

	scrollToTop(): void {
		window.scrollTo({ top: 0, behavior: 'smooth' });
		this.goToTop = true;
		setTimeout(() => this.goToTop = false, 1000);
	}

	@HostListener('document:scroll')
	onScroll(): void {
		this.showScrollBtn = window.pageYOffset > 100;
	}
}
