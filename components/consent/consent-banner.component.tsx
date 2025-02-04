'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createContact, getConsentText, updateContactConsent } from '../../lib/server-actions/consent-api.server-action';
import { trackPageVisit } from '../../lib/server-actions/tracking-api.server-action';
import { consentManagementService } from '../../lib/services/consent-management.service';
import styles from './consent.module.scss';

export function ConsentBannerComponent() {
    const [consentText, setConsentText] = useState<string>('');
    const [showBanner, setShowBanner] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const pathname = usePathname();

    useEffect(() => {
        (async () => {
            await checkConsentStatus();
        })();
    }, []);

    function shouldShowBanner() {
        if (pathname.endsWith('privacy-policy')) {
            return false;
        }
        return true;
    }

    async function checkConsentStatus() {
        try {
            const storedState = consentManagementService.getStoredState();

            if (!storedState) {
                const text = await getConsentText();
                setConsentText(text.shortText);
                setShowBanner(true);
                return;
            }

            if (storedState.hasConsent && storedState.contactGuid) {
                return;
            }
        } catch (error) {
            console.error('Error in consent flow:', error);
        } finally {
            setIsLoading(false);
        }
    }

    async function handleAccept() {
        try {
            const contact = await createContact();
            await updateContactConsent(contact.contact, { agree: true });
            consentManagementService.storeState({
                contactGuid: contact.contact,
                hasConsent: true
            });
            setShowBanner(false);
            await trackPageVisit({
                url: pathname,
                contactGuid: contact.contact,
                title: document.title
            });
        } catch (error) {
            console.error('Error accepting consent:', error);
        }
    }

    function handleDecline() {
        consentManagementService.setDeclined();
        setShowBanner(false);
    }

    function handleClose() {
        setShowBanner(false);
    }

    if (isLoading || !showBanner || !shouldShowBanner()) {
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
                    <Link className={styles.link} href="/privacy-policy">
                        Privacy Policy
                    </Link>
                </div>
            </div>
            <button onClick={handleClose} className={`${styles.button} ${styles.closeButton}`}>
                &times;<span className="sr-only">Close</span>
            </button>
        </div>
    );
}
