import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface iMeta {
	title: string,
	description: string,
	ogTitle: string,
	ogImage: string,
	ogUrl: string,
	ogDescription: string
}

@Injectable({
	providedIn: 'root'
})
export class MetaDataService {
	constructor(
		private meta: Meta,
		private title: Title) {
	}

	setMetaData(meta: iMeta): void {
		if (!meta) {
			return;
		}
		
		this.title.setTitle(meta.title);
		this.meta.updateTag({name: 'description', content: meta.description});
		this.meta.updateTag({property: 'og:title', content: meta.ogTitle});
		this.meta.updateTag({property: 'og:image', content: meta.ogImage});
		this.meta.updateTag({property: 'og:url', content: meta.ogUrl});
		this.meta.updateTag({property: 'og:description', content: meta.ogDescription});
	}
}