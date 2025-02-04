'use server';

import { consentApiService, ConsentStatusPost } from '../services/consent-api.service';

export async function getConsentText(languageName: string = 'en') {
    return await consentApiService.getConsentText(languageName);
}

export async function createContact() {
    return await consentApiService.createContact();
}

export async function getContactConsent(contactGuid: string) {
    return await consentApiService.getContactConsent(contactGuid);
}

export async function updateContactConsent(contactGuid: string, consentStatus: ConsentStatusPost) {
    await consentApiService.updateContactConsent(contactGuid, consentStatus);
}
