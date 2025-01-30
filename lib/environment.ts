import { getEnvironmentRequiredValue } from './helpers/environment.helper';
import { removeTrailingSlash } from './helpers/url.helper';

export const SITE_URL: string = removeTrailingSlash(getEnvironmentRequiredValue('SITE_URL'));
export const XBYK_GRAPHQL_ENDPOINT_HOST: string = getEnvironmentRequiredValue('XBYK_GRAPHQL_ENDPOINT_HOST');
export const XBYK_GRAPHQL_ENDPOINT_PATH: string = getEnvironmentRequiredValue('XBYK_GRAPHQL_ENDPOINT_PATH');
export const XBYK_GRAPHQL_API_KEY: string = getEnvironmentRequiredValue('XBYK_GRAPHQL_API_KEY');
