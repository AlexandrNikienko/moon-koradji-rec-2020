import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class JsonLDService {
	private scriptType = 'application/json+ld';

	orgSchema() {
		return {
            '@context': 'https://schema.org',
            '@type': 'Organization',
            'name': 'Moon Koradji Records',
            'url': 'https://www.moonkoradji.com',
            'sameAs': [
				'https://www.facebook.com/MoonKoradjiRecords',
				'https://soundcloud.com/moon-koradji-records',
				'https://www.youtube.com/user/MoonKoradji',
				'https://moonkoradjirecords.bandcamp.com/'
			],
            'logo': 'https://www.moonkoradji.com/assets/images/mk_square.jpg',
            'image': 'https://www.moonkoradji.com/assets/images/mk_square.jpg',
            'description': 'Ukrainian psytrance label founded in 2007 by Alexandr Nikienko a.k.a. DJ Omsun.',
			'email': 'info@moonkoradji.com',
			'member': [
				{
					'@type': 'OrganizationRole',
					'member': {
						'@type': 'Person',
						'name': 'Omsun',
						'givenName': 'Alexandr Nikienko',
						'sameAs': [
							'https://moonkoradji.com/artists/dj-omsun',
							'https://www.facebook.com/omsunkoradji',
							'https://soundcloud.com/moonkoradji',
							'https://www.instagram.com/omsunkoradji'
						]
					},
					'roleName': [
						'Founder', 'DJ'
					]
				}
			]
		}
	}

	constructor(@Inject(DOCUMENT) private _document: Document) {}

	removeStructuredData(): void {
		const els = [];
		[ 'structured-data', 'structured-data-org' ].forEach(c => {
			els.push(...Array.from(this._document.head.getElementsByClassName(c)));
		});
		els.forEach(el => this._document.head.removeChild(el));
	}

	insertSchema(schema: Record<string, any>, className = 'structured-data'): void {
		console.log(this.orgSchema())
		let script;
		let shouldAppend = false;
		if (this._document.head.getElementsByClassName(className).length) {
			script = this._document.head.getElementsByClassName(className)[0];
		} else {
			script = this._document.createElement('script');
			shouldAppend = true;
		}
		script.setAttribute('class', className);
		script.type = this.scriptType;
		script.text = JSON.stringify(schema.call(this));
		if (shouldAppend) {
			this._document.head.appendChild(script);
		}
	}
}
