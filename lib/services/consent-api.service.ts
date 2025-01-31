import { XBYK_HOST, XBYK_TRACKING_API_KEY } from '../environment';

export interface Contact {
    contact: string;
}

export interface ConsentStatus {
    agreed: boolean;
}

export interface ConsentState {
    contactGuid?: string;
    hasConsent?: boolean;
}

interface ConsentText {
    shortText: string;
    fullText: string;
}

interface ApiResponse<T> {
    data: T;
    error?: string;
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
        return this.fetchApi<ConsentText>(`/consents/${this.CONSENT_NAME}?languageName=${encodeURIComponent(languageName)}`, {
            cache: 'force-cache'
        });
    }

    async createContact(): Promise<Contact> {
        return this.fetchApi<Contact>('/contacts', {
            method: 'POST'
        });
    }

    async getContactConsent(contactGuid: string): Promise<ConsentStatus> {
        if (!contactGuid) {
            throw new Error('Contact GUID is required');
        }

        return this.fetchApi<ConsentStatus>(`/contacts/${encodeURIComponent(contactGuid)}/consents/${this.CONSENT_NAME}`);
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

        return response.json();
    }
}

export const consentApiService = new ConsentApiService();
