import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
	standalone: true,
	imports: [CommonModule, RouterModule],
	selector: 'mk-heading',
	templateUrl: './heading.component.html',
	styleUrls: ['./heading.component.scss']
})
export class HeadingComponent {
	constructor(private router: Router) {}
	
	@Input()
	title: string;

	@Input()
	subTitle: string;

	@Input()
	route: string;
}
