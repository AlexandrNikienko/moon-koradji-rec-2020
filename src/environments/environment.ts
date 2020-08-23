// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false
};

export const NEWS = {
    getItems: './assets/mocks/news.json'
};

export const RELEASES = {
    getItems: './assets/mocks/releases.json'
};

export const DJS = {
    getItems: './assets/mocks/djs.json'
};

export const ARTISTS = {
    getItems: './assets/mocks/artists.json'
};

export const PODCASTS = {
    getItems: './assets/mocks/podcasts.json'
};

export const DATAFOLDER = './assets/mocks/';

export const IMAGEFOLDER = './assets/images/';
