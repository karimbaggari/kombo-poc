import type { NextConfig } from "next";
import type webpack from 'webpack';

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = 'web'
    }
    return config
  },
  webpackDevMiddleware: (config: webpack.Configuration) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    }
    return config
  }
};

export default nextConfig;
