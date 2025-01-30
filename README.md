# Xperience by Kentico - Next.js Campaign page demo project

A Next.js project with TypeScript, GraphQL, and Apollo Client integration fetching data from Xperience by Kentico and rendering it in a campaign page.

## Prerequisites

-   Node.js >= 20.0.0
-   npm

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```
SITE_URL=your_site_url
XBYK_GRAPHQL_ENDPOINT_HOST=your_graphql_host
XBYK_GRAPHQL_ENDPOINT_PATH=your_graphql_path
XBYK_GRAPHQL_API_KEY=your_api_key
```

## Running the project

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:3000` to see the app.

## Project Structure

-   `/app`: Next.js 13+ app directory containing page components
-   `/components`: Reusable React components
-   `/lib`: Utility functions, services, and GraphQL related code
-   `/styles`: Global styles and CSS modules

## Xperience by Kentico setup

To be able to run this project, you need to have a Xperience by Kentico instance with the Dancing Goat site installed and a Headless channel created according to these articles:

1. [CMS setup](https://www.milanlund.com/knowledge-base/xperience-by-kentico-headless-channel-next-js-cms-setup-part-2)
2. [GraphQL API setup](https://www.milanlund.com/knowledge-base/xperience-by-kentico-headless-channel-next-js-graphql-api-part-3)
