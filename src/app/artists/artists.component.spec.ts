import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DataService } from '../core/services/data.service';
import { ArtistsComponent } from './artists.component';

describe('ArtistsComponent', () => {
	let component: ArtistsComponent;
	let fixture: ComponentFixture<ArtistsComponent>;
	const fakeFunc = jasmine.createSpyObj(['setAlphabeticalMarks']);

	beforeEach(async(() => {
		TestBed.configureTestingModule({
    declarations: [ArtistsComponent],
    imports: [],
    providers: [DataService, provideHttpClient(withInterceptorsFromDi())]
})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ArtistsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	xit('should call setAlphabeticalMarks function', () => {
		const result = fakeFunc.setAlphabeticalMarks;
		expect(result).toHaveBeenCalled();
	})
})