import { MetadataRoute } from 'next';
import { toAbsoluteUrl } from '../lib/helpers/url.helper';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const sitemapItemsStatic: MetadataRoute.Sitemap = [
        {
            url: toAbsoluteUrl('/'),
            lastModified: new Date()
        }
    ];

    return [...sitemapItemsStatic];
}
