'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import { trackPageVisit } from '../../lib/server-actions/tracking-api.server-action';
import { consentManagementService } from '../../lib/services/consent-management.service';

export function PageVisitTrackingComponent() {
    const pathname = usePathname();

    const handlePageVisit = useCallback(async () => {
        const storedState = consentManagementService.getStoredState();

        if (!storedState?.hasConsent || !storedState?.contactGuid) {
            return;
        }

        try {
            await trackPageVisit({
                url: pathname,
                contactGuid: storedState.contactGuid,
                title: document.title
            });
        } catch (error) {
            console.error('Failed to track page visit:', error);
        }
    }, [pathname]);

    useEffect(() => {
        handlePageVisit();
    }, [handlePageVisit]);

    return null;
}
