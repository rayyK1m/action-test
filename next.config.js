/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '*.amazonaws.com',
            },
            {
                protocol: 'https',
                hostname: 'statics.goorm.io',
            },
        ],
    },
    env: {
        MAIN_HOST: process.env.NEXT_PUBLIC_MAIN_HOST,
    },
};

module.exports = nextConfig;
