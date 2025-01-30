import { MetadataRoute } from 'next';
import { SITE_URL } from '../lib/environment';

export default function robots(): MetadataRoute.Robots {
    const body: MetadataRoute.Robots = {
        rules: {
            userAgent: '*',
            allow: '/'
        },
        sitemap: [`${SITE_URL}/sitemap.xml`],
        host: SITE_URL
    };

    return body;
}
