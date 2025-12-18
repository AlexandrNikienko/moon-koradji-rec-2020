import { Component, DestroyRef, inject, signal } from '@angular/core';
import {
	trigger, state, style, animate, transition
} from '@angular/animations';
import { Utils } from 'src/app/core/utils';
import { fromEvent } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
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
	showScrollBtn = signal(false);
	goToTop = signal(false);
	destroyRef = inject(DestroyRef);

	constructor() {
		fromEvent(window, 'scroll')
			.pipe(
				throttleTime(200),
				takeUntilDestroyed(this.destroyRef)
			)
			.subscribe(() => {
				this.showScrollBtn.set(window.scrollY > 100);
			});
		}

	scrollToTop(): void {
		Utils.scrollToTop();
		this.goToTop.set(true);
		setTimeout(() => this.goToTop.set(false), 1000);
	}
}
