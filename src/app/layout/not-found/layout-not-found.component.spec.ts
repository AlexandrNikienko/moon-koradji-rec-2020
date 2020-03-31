import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LayoutNotFoundComponent} from './layout-not-found.component';

describe('LayoutNotFoundComponent', () => {
    let component: LayoutNotFoundComponent;
    let fixture: ComponentFixture<LayoutNotFoundComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                LayoutNotFoundComponent,
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LayoutNotFoundComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});
