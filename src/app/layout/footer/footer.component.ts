import { RouterModule } from '@angular/router';
import { Component, signal } from '@angular/core';

@Component({
    imports: [RouterModule],
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['footer.scss']
})
export class FooterComponent {
	year = signal<number>(0);

	constructor() {
		this.year.set(this.getCurrentYear());
	}

	getCurrentYear(): number {
		return new Date().getFullYear()
	}
}
