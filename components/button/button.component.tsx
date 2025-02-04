'use client';

import { usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { trackClick } from '../../lib/server-actions/tracking-api.server-action';
import { consentManagementService } from '../../lib/services/consent-management.service';
import { TrackingClick } from '../../lib/services/tracking-api.service';
import styles from './button.module.scss';

interface ButtonComponentProps {
    children: string;
}

export function ButtonComponent({ children }: ButtonComponentProps) {
    const storedState = consentManagementService.getStoredState();
    const pathname = usePathname();

    const getTrackingData = useCallback((): TrackingClick | undefined => {
        if (!storedState?.hasConsent || !storedState?.contactGuid) {
            return undefined;
        }

        return {
            url: pathname,
            contactGuid: storedState.contactGuid,
            title: children
        };
    }, [pathname, children, storedState]);

    const handleClick = useCallback(async () => {
        const trackingData = getTrackingData();
        if (trackingData) {
            try {
                await trackClick(trackingData);
            } catch (error) {
                console.error('Failed to track click:', error);
            }
        }
    }, [getTrackingData]);

    return (
        <button className={styles.button} onClick={handleClick}>
            {children}
        </button>
    );
}
