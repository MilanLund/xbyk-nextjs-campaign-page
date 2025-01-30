import { SITE_URL } from '../environment';

interface IMetadata {
    metadataBase: URL;
    title: string;
    openGraph: {
        title: string;
    };
}

interface IPageMetadata {
    title: string;
}

export function generatePageMetadata(data: IPageMetadata): IMetadata {
    return {
        metadataBase: new URL(SITE_URL),
        title: data.title,
        openGraph: {
            title: data.title
        }
    };
}
