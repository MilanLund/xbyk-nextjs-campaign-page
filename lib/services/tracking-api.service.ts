import { XBYK_HOST, XBYK_TRACKING_API_KEY, XBYK_TRACKING_CHANNEL_GUID } from '../environment';
import { toAbsoluteUrl } from '../helpers/url.helper';

export interface TrackingPageVisit {
    readonly title: string;
    readonly url: string;
    readonly contactGuid: string;
}

export interface TrackingClick {
    readonly url: string;
    readonly contactGuid: string;
    readonly title: string;
}

interface TrackingBody {
    readonly channel: string;
    readonly contact: string;
    readonly activities: readonly (PageVisitActivity | ClickActivity)[];
}

interface BaseActivity {
    readonly type: string;
    readonly url: string;
    readonly value: string;
}

interface PageVisitActivity extends BaseActivity {
    readonly type: 'pagevisit';
}

interface ClickActivity extends BaseActivity {
    readonly type: 'click';
}

class TrackingApiService {
    private readonly API_ENDPOINT: string;
    private readonly DEFAULT_HEADERS: HeadersInit;
    private readonly DEFAULT_BODY: Readonly<{ channel: string }>;

    constructor() {
        this.API_ENDPOINT = `${XBYK_HOST}/Kentico.Tracking/activities`;
        this.DEFAULT_HEADERS = {
            'Authorization': `Bearer ${XBYK_TRACKING_API_KEY}`,
            'Content-Type': 'application/json'
        };
        this.DEFAULT_BODY = Object.freeze({
            channel: XBYK_TRACKING_CHANNEL_GUID
        });
    }

    async trackPageVisit(data: TrackingPageVisit): Promise<void> {
        const body = this.createActivityBody(data, 'pagevisit');
        await this.fetchApi(body, 'page visit');
    }

    async trackClick(data: TrackingClick): Promise<void> {
        const body = this.createActivityBody(data, 'click');
        await this.fetchApi(body, 'click');
    }

    private async fetchApi(body: TrackingBody, activityType: string): Promise<void> {
        const response = await fetch(this.API_ENDPOINT, {
            method: 'POST',
            headers: this.DEFAULT_HEADERS,
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            throw new Error(`Failed to track ${activityType}: ${response.statusText}`);
        }
    }

    private createActivityBody(data: TrackingPageVisit | TrackingClick, type: 'pagevisit' | 'click'): TrackingBody {
        return {
            ...this.DEFAULT_BODY,
            contact: data.contactGuid,
            activities: [
                {
                    type,
                    url: toAbsoluteUrl(data.url),
                    value: data.title
                }
            ]
        };
    }
}

export const trackingApiService = new TrackingApiService();
