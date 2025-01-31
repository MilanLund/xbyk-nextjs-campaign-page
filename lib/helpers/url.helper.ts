import { SITE_URL, XBYK_HOST } from '../environment';

export function toAbsoluteUrl(path: string, type?: 'graphql' | 'site'): string {
    const host = type === 'graphql' ? XBYK_HOST : SITE_URL;
    return `${host}/${unifyUrlPath(path)}`;
}

export function removeTrailingSlash(path: string | undefined | null): string {
    if (!path) {
        return '';
    }
    return path.endsWith('/') && path.length ? path.slice(0, -1) : path;
}

function unifyUrlPath(path: string): string {
    let pathToUse: string = path;

    if (pathToUse.startsWith('/')) {
        pathToUse = pathToUse.slice(1);
    }

    pathToUse = removeTrailingSlash(pathToUse);

    return pathToUse;
}
