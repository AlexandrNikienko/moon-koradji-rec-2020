import { Paragraph } from './paragraph.model';
import { Release } from './release.model';

export type Role = 'artist' | 'dj';
export interface Artist {
    id: string;
    artistRoute: string;
    artistName: string;
    artistRealName: string;
    artistCountry: string;
    artistAvatar: string;
    artistDescription?: Paragraph[];
    artistFacebook?: string;
    artistSoundcloud?: string;
    artistOfficial?: string;
    artistMixcloud?: string;
    mixes?: any[]; // TODO
    releases?: any[]; // TODO
    embedCode?: string;
    flag?: string;
	featured?: boolean;
	inactive?: boolean;
	role?: Role;
}
