import type { NextConfig } from 'next';

/**
 * Static export only — see requirements.md R-INF-1.
 *
 * There is no server, no database and no API route in this project by design.
 * The ecosystem runs under a hard ~$7/month ceiling and the Hetzner box is
 * already saturated, so this page must cost nothing to run. Every dynamic
 * behaviour (the Concierge router, the Constellation, the counters) is
 * client-side, and every contact route is a deep link.
 */
const nextConfig: NextConfig = {
  output: 'export',

  // Cloudflare Pages serves static files; Next's optimizer needs a server.
  images: { unoptimized: true },

  // Emit /path/index.html rather than /path.html so Pages resolves cleanly.
  trailingSlash: true,

  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
