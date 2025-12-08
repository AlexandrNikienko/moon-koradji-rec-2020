import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    imports: [CommonModule, RouterModule],
    selector: 'mk-heading',
    templateUrl: './heading.component.html',
    styleUrls: ['./heading.component.scss']
})
export class HeadingComponent {	
	@Input()
	title: string;

	@Input()
	subTitle: string;

	@Input()
	route: string;
}
