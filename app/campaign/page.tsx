import { ApolloError } from '@apollo/client';
import { JSX } from 'react';
import { BannerComponent } from '../../components/banner/banner.component';
import { CampaignPageQuery } from '../../lib/graphql/models/types';
import campaignPageQuery from '../../lib/graphql/queries/campaign-page.query.graphql';
import { generatePageMetadata } from '../../lib/helpers/metadata.helper';
import { apolloService } from '../../lib/services/apollo.service';
import NotFound from '../not-found';

export default async function CampaignPage(): Promise<JSX.Element> {
    try {
        const data = await fetchCampaignData();
        const banner = data.dancingGoatCampaignPage?.banner?.items[0];

        if (!banner) {
            return <></>;
        }

        return <BannerComponent item={banner} />;
    } catch (error) {
        if (error instanceof ApolloError) {
            throw error;
        }

        console.error('Unexpected error fetching campaign page:', error);
        return <NotFound />;
    }
}

async function fetchCampaignData(): Promise<CampaignPageQuery> {
    const { data } = await apolloService.query<CampaignPageQuery>({ query: campaignPageQuery });
    return data;
}

export const generateMetadata = () => generatePageMetadata({ title: 'Campaign Page' });
