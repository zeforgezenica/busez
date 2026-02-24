import dotenv from "dotenv";
import withSerwistInit from "@serwist/next";

dotenv.config();

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
};

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  disable: process.env.NODE_ENV === "development",
});

export default withSerwist(nextConfig);
