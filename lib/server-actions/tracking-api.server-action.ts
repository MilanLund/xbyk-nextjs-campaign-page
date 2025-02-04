'use server';

import { trackingApiService, TrackingClick, TrackingPageVisit } from '../services/tracking-api.service';

export async function trackPageVisit(data: TrackingPageVisit) {
    await trackingApiService.trackPageVisit(data);
}

export async function trackClick(data: TrackingClick) {
    await trackingApiService.trackClick(data);
}
