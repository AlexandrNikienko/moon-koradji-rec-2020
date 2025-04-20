import { Artist } from './artist.model';
import { Paragraph } from './paragraph.model';

export interface Release {
	isHero: boolean;
	hidden?: boolean;
	isNew?: boolean;
	isFree?: boolean;
	releaseNumber: string;
	releaseYear: string;
	releaseDate: string;
	releaseTitle: string;
	releaseSubTitle: string;
	releaseCover: ReleaseCover;
	releaseDescription?: Paragraph[];
	releaseRoute?: string;
	paragraph?: string;
	compiledBy?: string;
	cdAuthor?: string;
	masteredBy?: string;
	artworkBy?: string;
	beatspaceLink?: string;
	bandcampLink?: string;
	bandcamp24Link?: string;
	videoLink?: string;
	embedVideo?: string;
	tracklist?: Array<object>;
	embedAudio?: string;
	artists: Array<string>;
	hub?: string;
	involved?: Artist[];
}

interface ReleaseCover {
	default: string,
	default2x?: string,
	webp?: string,
	webp2x?: string
}
