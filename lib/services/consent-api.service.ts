import { XBYK_HOST, XBYK_TRACKING_API_KEY } from '../environment';

export interface Contact {
    contact: string;
}

export interface ConsentStatusGet {
    isAgreed: boolean;
}

export interface ConsentStatusPost {
    agree: boolean;
}

export interface ConsentState {
    contactGuid?: string;
    hasConsent?: boolean;
}

export interface ConsentText {
    shortText: string;
    fullText: string;
}

class ConsentApiService {
    private readonly API_BASE: string;
    private readonly DEFAULT_HEADERS: HeadersInit;
    private readonly CONSENT_NAME = 'HeadlessChannel';

    constructor() {
        this.API_BASE = `${XBYK_HOST}/Kentico.Tracking`;
        this.DEFAULT_HEADERS = {
            'Authorization': `Bearer ${XBYK_TRACKING_API_KEY}`,
            'Content-Type': 'application/json'
        };
    }

    async getConsentText(languageName: string = 'en'): Promise<ConsentText> {
        return await this.fetchApi<ConsentText>(`/consents/${this.CONSENT_NAME}?languageName=${encodeURIComponent(languageName)}`, {
            cache: 'force-cache'
        });
    }

    async createContact(): Promise<Contact> {
        return await this.fetchApi<Contact>('/contacts', {
            method: 'POST'
        });
    }

    async getContactConsent(contactGuid: string): Promise<ConsentStatusGet> {
        if (!contactGuid) {
            throw new Error('Contact GUID is required');
        }

        return await this.fetchApi<ConsentStatusGet>(`/contacts/${encodeURIComponent(contactGuid)}/consents/${this.CONSENT_NAME}`);
    }

    async updateContactConsent(contactGuid: string, consentStatus: ConsentStatusPost): Promise<void> {
        if (!contactGuid) {
            throw new Error('Contact GUID is required');
        }

        if (!consentStatus) {
            throw new Error('Consent status is required');
        }

        await this.fetchApi<undefined>(`/contacts/${encodeURIComponent(contactGuid)}/consents/${this.CONSENT_NAME}`, {
            method: 'POST',
            body: JSON.stringify(consentStatus)
        });
    }

    private async fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
        const response = await fetch(`${this.API_BASE}${endpoint}`, {
            headers: this.DEFAULT_HEADERS,
            ...options
        });

        if (!response.ok) {
            const error = await response.text();
            throw new Error(`API Error (${response.status}): ${error}`);
        }

        if (response.headers.get('content-length') === '0') {
            return undefined as T;
        }

        const data: T = await response.json();
        return data;
    }
}

export const consentApiService = new ConsentApiService();
