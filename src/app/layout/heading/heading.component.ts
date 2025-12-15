
import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    imports: [RouterModule],
    selector: 'mk-heading',
    templateUrl: './heading.component.html',
    styleUrls: ['./heading.component.scss']
})
export class HeadingComponent {	
	title = input<string>();
	subTitle = input<string>();
	route = input<string>();
}
