/** @type {import('next').NextConfig} */

const imageDomains = [];

const nextConfig = {
    trailingSlash: false,
    generateEtags: false,
    images: {
        unoptimized: true,
        domains: imageDomains
    },
    webpack(config) {
        config.module.rules.push({
            test: /\.(graphql|gql)$/,
            loader: 'graphql-tag/loader',
            exclude: /node_modules/
        });

        return config;
    }
};

module.exports = nextConfig;
