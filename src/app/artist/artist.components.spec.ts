import { DataService } from './../core/services/data.service';
import { RouterTestingModule } from '@angular/router/testing';
import { provideHttpClientTesting } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtistComponent } from './artist.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ArtistComponent', () => {
	let component: ArtistComponent;
	let fixture: ComponentFixture<ArtistComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
    declarations: [ArtistComponent],
    imports: [RouterTestingModule],
    providers: [DataService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ArtistComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
})
