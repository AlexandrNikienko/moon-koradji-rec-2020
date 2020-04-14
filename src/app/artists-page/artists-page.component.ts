import {Component, QueryList, ViewChildren, AfterViewInit} from '@angular/core';

import {ArtistsService} from '../core/services/artists.service';
import {DjsService} from '../core/services/djs.service';

@Component({
    selector: 'app-artists-page',
    templateUrl: './artists-page.component.html'
})
export class ArtistsPageComponent implements AfterViewInit {
    @ViewChildren('artistCell') artistCell: QueryList<any>;
    public artists$ = this.artistsService.ARTISTS$;
    public djs$ = this.djsService.DJS$;

    constructor(private artistsService: ArtistsService,
                private djsService: DjsService) {}

    ngAfterViewInit() {
        this.artistCell.changes.subscribe(t => {
            this.setAlphabeticalMarks();
        });
    }

    setAlphabeticalMarks() {
        let startLetter = '',
            firstLetter = '';
        const artistName = document.querySelectorAll('.js-artist-name');

        // [].forEach.call(artistName, (el, i) => {
        //     firstLetter = el.textContent.charAt(0);
        //     if (firstLetter > startLetter) {
        //         el.insertAdjacentHTML('afterend', `<div class="s-letter-separator">${firstLetter }</div>`);
        //         startLetter = firstLetter;
        //     }
        // });
        for(let i = 0; i <  artistName.length; i++) {
            firstLetter = artistName[i].textContent.charAt(0);
            if (firstLetter > startLetter) {
                artistName[i].insertAdjacentHTML('afterend', `<div class="s-letter-separator">${firstLetter }</div>`);
                startLetter = firstLetter;
            }
        }
    }
}
