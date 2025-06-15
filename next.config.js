/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const dotenv = require('dotenv');
dotenv.config({ path: '.env.ping.local' });
dotenv.config({ path: '.env.nav.local' });

module.exports = nextConfig;
