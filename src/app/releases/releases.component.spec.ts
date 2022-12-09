import { DataService } from './../core/services/data.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasesComponent } from './releases.component';
import { HttpClientModule } from '@angular/common/http';

describe('ReleasesComponent', () => {
	let component: ReleasesComponent;
	let fixture: ComponentFixture<ReleasesComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientModule],
			declarations: [ReleasesComponent],
			providers: [DataService]
		})
		.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ReleasesComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
