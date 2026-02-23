import dotenv from 'dotenv';
import withSerwistInit from '@serwist/next';

dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
    turbopack: {}
};

const withSerwist = withSerwistInit({
    // Ovdje se definira gdje stoji tvoj Service worker kod
    swSrc: "src/app/sw.ts",
    // Gdje će ga Serwist iskompajlirati
    swDest: "public/sw.js",
    // Gasi service worker u dev modu da ti ne smeta dok kucaš kod
    disable: process.env.NODE_ENV === "development",
});

export default withSerwist(nextConfig);