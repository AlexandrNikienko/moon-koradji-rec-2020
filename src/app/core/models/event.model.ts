import { Artist } from './artist.model';

export interface Event {
	date: string;
	month: string;
	year: string;
	country: string;
	title: string;
	info: string;
	link: string;
	artists: string[];
	hidden: boolean;
	id: string;
	endDate: string;
}
