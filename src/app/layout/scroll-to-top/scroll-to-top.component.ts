import { Component, HostListener } from '@angular/core';
import {
	trigger, state, style, animate, transition
} from '@angular/animations';
import { Utils } from 'src/app/core/utils';

@Component({
	standalone: true,
	selector: 'app-scroll-to-top',
	templateUrl: './scroll-to-top.component.html',
	styleUrls: ['./scroll-to-top.component.scss'],
	animations: [
		trigger('animate', [
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
		Utils.scrollToTop();
		this.goToTop = true;
		setTimeout(() => this.goToTop = false, 1000);
	}

	@HostListener('document:scroll')
	onScroll(): void {
		this.showScrollBtn = window.scrollY > 100;
	}
}
