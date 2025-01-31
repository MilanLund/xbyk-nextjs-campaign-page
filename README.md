# Xperience by Kentico - Next.js Campaign page demo project

A Next.js project with TypeScript, GraphQL, and Apollo Client integration fetching data from Xperience by Kentico and rendering it in a campaign page.

## Prerequisites

-   Node.js >= 20.0.0
-   npm

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
SITE_URL=your_site_url
XBYK_HOST=your_graphql_host
XBYK_GRAPHQL_ENDPOINT_PATH=your_graphql_path
XBYK_GRAPHQL_API_KEY=your_api_key
```

## Generate types

Create a `codegen.yml` file in the root directory with the following content, placeholder values are the ones from the `.env.local` file:

```
schema:
    - '<XBYK_GRAPHQL_ENDPOINT_HOST><XBYK_GRAPHQL_ENDPOINT_PATH>': # Replace with your GraphQL endpoint
          headers:
              Authorization: 'Bearer <XBYK_GRAPHQL_API_KEY>' # Authentication is needed
documents: 'lib/graphql/queries/**/*.graphql' # Path to your GraphQL operations
generates:
    lib/graphql/models/types.ts:
        plugins:
            - 'typescript'
            - 'typescript-operations'
```

Run the codegen script:

```bash
npm run codegen
```

## Running the project

1. Install dependencies:

```bash
npm install
```

2. Run the application:
2a. Development mode:

```bash
npm run dev
```

2b. Production mode:

```bash
npm run build
npm run start
```

3. Open your browser and navigate to `http://localhost:3000` to see the app.

## Project Structure

-   `/app`: Next.js 13+ app directory containing page components
-   `/components`: Reusable React components
-   `/lib`: Utility functions, services, and GraphQL related code
-   `/styles`: Global styles and CSS modules
-   `/public`: Static assets

## Xperience by Kentico setup

To be able to run this project, you need to have a Xperience by Kentico instance with the Dancing Goat site installed and a Headless channel created according to these articles:

1. [CMS setup](https://www.milanlund.com/knowledge-base/xperience-by-kentico-headless-channel-next-js-cms-setup-part-2)
2. [GraphQL API setup](https://www.milanlund.com/knowledge-base/xperience-by-kentico-headless-channel-next-js-graphql-api-part-3)
