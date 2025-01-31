'use client';

import { useEffect, useState } from 'react';
import { createContact } from '../../lib/server-actions/consent-api.server-action';
import { consentManagementService } from '../../lib/services/consent-management.service';
import styles from './consent.module.scss';

export function ConsentManagerComponent() {
    const [hasConsent, setHasConsent] = useState<boolean | undefined>();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedState = consentManagementService.getStoredState();
        if (storedState) {
            setHasConsent(storedState.hasConsent);
        }
        setIsLoading(false);
    }, []);

    const handleConsentChange = async (newConsentValue: boolean) => {
        try {
            const storedState = consentManagementService.getStoredState();
            let contactGuid = storedState?.contactGuid;

            if (!contactGuid) {
                const contact = await createContact();
                contactGuid = contact.contact;
            }

            consentManagementService.storeState({
                contactGuid,
                hasConsent: newConsentValue
            });

            setHasConsent(newConsentValue);
        } catch (error) {
            console.error('Error updating consent:', error);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <p>Current consent status: {hasConsent === undefined ? 'Not set' : hasConsent ? 'Accepted' : 'Declined'}</p>
            <div className={styles.actions}>
                {hasConsent === true && (
                    <button className={`${styles.button} ${styles.declineButton}`} onClick={() => handleConsentChange(false)}>
                        Revoke Consent
                    </button>
                )}
                {hasConsent === false && (
                    <button className={`${styles.button} ${styles.acceptButton}`} onClick={() => handleConsentChange(true)}>
                        Give Consent
                    </button>
                )}
                {hasConsent === undefined && (
                    <>
                        <button className={`${styles.button} ${styles.acceptButton}`} onClick={() => handleConsentChange(true)}>
                            Accept
                        </button>
                        <button className={`${styles.button} ${styles.declineButton}`} onClick={() => handleConsentChange(false)}>
                            Decline
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
