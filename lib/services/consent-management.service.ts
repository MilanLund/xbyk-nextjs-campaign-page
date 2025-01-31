interface ConsentState {
    contactGuid?: string;
    hasConsent?: boolean;
}

interface StoreStateParams {
    contactGuid: string | null;
    hasConsent: boolean;
}

const CONSENT_STORAGE_KEY = 'kentico_consent_state';

class ConsentManagementService {
    private isServer(): boolean {
        return typeof window === 'undefined';
    }

    private safelyParseJSON(json: string | null): ConsentState | undefined {
        if (!json) {
            return undefined;
        }
        try {
            return JSON.parse(json);
        } catch (e) {
            console.error('Error parsing consent state:', e);
            return undefined;
        }
    }

    public getStoredState(): ConsentState {
        if (this.isServer()) {
            return {};
        }

        const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
        return this.safelyParseJSON(stored) ?? {};
    }

    public storeState({ contactGuid, hasConsent }: StoreStateParams): void {
        if (this.isServer()) {
            return;
        }

        try {
            localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify({ contactGuid, hasConsent }));
        } catch (e) {
            console.error('Error storing consent state:', e);
        }
    }

    public clearState(): void {
        if (this.isServer()) {
            return;
        }

        try {
            localStorage.removeItem(CONSENT_STORAGE_KEY);
        } catch (e) {
            console.error('Error clearing consent state:', e);
        }
    }

    public setDeclined(): void {
        this.storeState({ contactGuid: null, hasConsent: false });
    }
}

export const consentManagementService = new ConsentManagementService();
