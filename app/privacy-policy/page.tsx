import { JSX } from 'react';
import { ConsentManagerComponent } from '../../components/consent/consent-manager.component';
import { generatePageMetadata } from '../../lib/helpers/metadata.helper';
import { consentApiService } from '../../lib/services/consent-api.service';

export default async function PrivacyPolicyPage(): Promise<JSX.Element> {
    const consentText = await consentApiService.getConsentText();

    return (
        <div className="page">
            <h1>Privacy Policy</h1>
            <div dangerouslySetInnerHTML={{ __html: consentText.fullText }} />
            <h2>Your consent</h2>
            <ConsentManagerComponent />
        </div>
    );
}

export const generateMetadata = () => generatePageMetadata({ title: 'Privacy Policy' });
