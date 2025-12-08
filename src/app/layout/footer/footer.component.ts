import { RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    imports: [RouterModule],
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['footer.scss']
})
export class FooterComponent implements OnInit {
	public year: number;

	ngOnInit() {
		this.getCurrentYear();
	}

	getCurrentYear(): number {
		return this.year = (new Date()).getFullYear();
	}
}
