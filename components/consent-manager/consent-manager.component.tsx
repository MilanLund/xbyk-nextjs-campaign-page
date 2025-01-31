'use client';

import { useEffect, useState } from 'react';
import { createContact, getConsentText, getContactConsent } from '../../lib/server-actions/consent-api.server-action';
import { consentManagementService } from '../../lib/services/consent-management.service';
import styles from './consent-manager.module.scss';

export function ConsentManagerComponent() {
    const [consentText, setConsentText] = useState<string>('');
    const [showBanner, setShowBanner] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            await checkConsentStatus();
        })();
    }, []);

    async function checkConsentStatus() {
        try {
            const storedState = consentManagementService.getStoredState();

            if (!storedState) {
                const text = await getConsentText();
                setConsentText(text.shortText);
                setShowBanner(true);
                return;
            }

            if (!storedState.contactGuid) {
                setShowBanner(false);
                return;
            }

            const status = await getContactConsent(storedState.contactGuid);
            consentManagementService.storeState({
                contactGuid: storedState.contactGuid,
                hasConsent: status.agreed
            });
            setShowBanner(false);
        } catch (error) {
            console.error('Error in consent flow:', error);
        } finally {
            setIsLoading(false);
        }
    }

    // Use error boundaries instead of try-catch where possible
    const handleAccept = async () => {
        try {
            const contact = await createContact();
            consentManagementService.storeState({
                contactGuid: contact.contact,
                hasConsent: true
            });
            setShowBanner(false);
            // Here you would initialize your tracking
        } catch (error) {
            console.error('Error accepting consent:', error);
        }
    };

    const handleDecline = () => {
        consentManagementService.setDeclined();
        setShowBanner(false);
    };

    // Early return pattern for loading and hidden states
    if (isLoading || !showBanner) {
        return null;
    }

    return (
        <div className={styles.consentBanner}>
            <div className={styles.content}>
                <div dangerouslySetInnerHTML={{ __html: consentText }} />
                <div className={styles.actions}>
                    <button onClick={handleAccept}>Accept</button>
                    <button onClick={handleDecline}>Decline</button>
                </div>
            </div>
        </div>
    );
}
