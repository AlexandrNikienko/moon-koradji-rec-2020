import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureComponent } from './picture.component';

describe('PictureComponent', () => {
	let component: PictureComponent;
	let fixture: ComponentFixture<PictureComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [PictureComponent]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(PictureComponent);
		component = fixture.componentInstance;
		component.cover = {
			default: '',
			default2x: '',
			webp: '',
			webp2x: ''
		};
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
