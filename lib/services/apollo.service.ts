import { HttpLink } from '@apollo/client';
import { ApolloClient, InMemoryCache, registerApolloClient } from '@apollo/experimental-nextjs-app-support';
import { XBYK_GRAPHQL_API_KEY, XBYK_GRAPHQL_ENDPOINT_PATH } from '../environment';
import { toAbsoluteUrl } from '../helpers/url.helper';

class ApolloService {
    private readonly client: ReturnType<typeof registerApolloClient>;

    constructor() {
        this.client = registerApolloClient(() => {
            return new ApolloClient({
                cache: new InMemoryCache(),
                link: new HttpLink({
                    // this needs to be an absolute url, as relative urls cannot be used in SSR
                    uri: toAbsoluteUrl(XBYK_GRAPHQL_ENDPOINT_PATH, 'graphql'),
                    headers: {
                        authorization: `Bearer ${XBYK_GRAPHQL_API_KEY}`
                    },
                    // revalidate cache after 30 seconds
                    fetchOptions: { next: { revalidate: 30 } }
                })
            });
        });
    }

    query<T>(options: Parameters<typeof this.client.query<T>>[0]) {
        return this.client.query<T>(options);
    }
}

export const apolloService = new ApolloService();
