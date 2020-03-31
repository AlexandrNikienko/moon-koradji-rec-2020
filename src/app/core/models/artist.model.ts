import { Paragraph } from './paragraph.model';

export interface Artist {
    id: string;
    artistRoute: string;
    artistName: string;
    artistRealName: string;
    artistCountry: string;
    artistAvatar: string;
    artistDescription: Paragraph[];
    artistFacebook: string;
    artistSoundcloud: string;
    artistOfficial: string;
    artistMixcloud: string;
    mixes: boolean;
    releases: boolean;
    embedCode: string;
    flag: string;
}
