'use client';

import { useEffect, useState } from 'react';
import { createContact, getConsentText, getContactConsent } from '../../lib/server-actions/consent-api.server-action';
import { consentManagementService } from '../../lib/services/consent-management.service';
import styles from './consent.module.scss';

export function ConsentBannerComponent() {
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

    const handleClose = () => {
        setShowBanner(false);
    };

    // Early return pattern for loading and hidden states
    if (isLoading || !showBanner) {
        return null;
    }

    return (
        <div className={styles.consentBanner}>
            <div className={styles.content}>
                <div className={styles.text} dangerouslySetInnerHTML={{ __html: consentText }} />
                <div className={styles.actions}>
                    <button onClick={handleAccept} className={`${styles.button} ${styles.acceptButton}`}>
                        Accept
                    </button>
                    <button onClick={handleDecline} className={`${styles.button} ${styles.declineButton}`}>
                        Decline
                    </button>
                </div>
            </div>
            <button onClick={handleClose} className={`${styles.button} ${styles.closeButton}`}>
                &times;<span className="sr-only">Close</span>
            </button>
        </div>
    );
}
