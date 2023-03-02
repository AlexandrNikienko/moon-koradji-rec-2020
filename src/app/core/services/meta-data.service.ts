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
		this.meta.removeTag('property="og:title"');
		this.meta.removeTag('property="og:image"');
		this.meta.removeTag('property="og:url"');
		this.meta.removeTag('property="og:description"');
		this.meta.removeTag('name="description"');

		this.title.setTitle(meta.title);

		this.meta.addTags([
			{
				property: 'og:title',
				content: meta.ogTitle
			},
			{
				property: 'og:image',
				content: meta.ogImage
			},
			{
				property: 'og:url',
				content: meta.ogUrl
			},
			{
				property: 'og:description',
				content: meta.ogDescription
			},
			{
				name: 'description',
				content: meta.description
			}
		]);
	}
}