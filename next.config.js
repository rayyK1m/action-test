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
        KAKAO_MAP_APP_KEY: process.env.KAKAO_MAP_APP_KEY,
        MAIN_HOST: process.env.NEXT_PUBLIC_MAIN_HOST,
        SWCAMP_CONTENTS_CHANNEL: process.env.SWCAMP_CONTENTS_CHANNEL,
    },
};

module.exports = nextConfig;
