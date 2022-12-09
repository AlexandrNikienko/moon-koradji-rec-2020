import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ScrollToTopComponent } from './scroll-to-top.component';

describe('ScrollToTopComponent', () => {
	let component: ScrollToTopComponent;
	let fixture: ComponentFixture<ScrollToTopComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [BrowserAnimationsModule],
			declarations: [ScrollToTopComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ScrollToTopComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should scroll window to top', () => {
		window.scrollTo( 200, 100 );
		fixture.detectChanges();
		component.scrollToTop();
		fixture.detectChanges();
		const result = window.pageYOffset;
		expect(result).toBe(0);
	})
});
