import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { DataService } from './data.service';

describe('Testing DataService', ()=> {
	let service: DataService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientModule],
			providers: [DataService]
		})

		service = TestBed.inject(DataService);
	})

	it('should create DataService', () => {
		expect(service).toBeTruthy()
	})

	it('should have requestToData function', () => {
        expect(service.requestToData).toBeTruthy();
	});

	it('DataService request should return some data', () => {
		expect(service.requestToData('news')).toBeTruthy();
	})
})
