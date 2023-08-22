import { Cover, Image } from './image.model';

export interface Gallery {
	name: string;
	image: Image | Cover;
	route: string;
}
