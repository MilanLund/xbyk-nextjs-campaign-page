'use server';

import { consentApiService } from '../services/consent-api.service';

export async function getConsentText(languageName: string = 'en') {
    return consentApiService.getConsentText(languageName);
}

export async function createContact() {
    return consentApiService.createContact();
}

export async function getContactConsent(contactGuid: string) {
    return consentApiService.getContactConsent(contactGuid);
}
