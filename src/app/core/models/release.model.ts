import { Paragraph } from './paragraph.model';

export interface Release {
    hidden?: boolean;
    isNew?: boolean;
    isFree?: boolean;
    releaseNumber: string;
    releaseNote: string;
    releaseDate: string;
    releaseTitle: string;
    releaseSubTitle: string;
    releaseCover: string;
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
    embedVideo?: any;
    tracklist?: Array<object>;
    embedAudio?: string;
    artists: Array<string>;
}
