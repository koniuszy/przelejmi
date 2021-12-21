const isProd = process.env.DEBUG_ENV === 'production'

/**
 * @type {import('next').NextConfig}
 */
const configs = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['*'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  webpack(config) {
    // load worker files as a urls by using Asset Modules
    // https://webpack.js.org/guides/asset-modules/
    config.module.rules.unshift({
      test: /pdf\.worker\.(min\.)?js/,
      type: 'asset/resource',
      generator: {
        filename: 'static/worker/[hash][ext][query]',
      },
    })

    return config
  },
  env: {
    DEBUG_ENV: process.env.DEBUG_ENV || 'development',
    //  A long, secret value used to encrypt the session cookie
    // AUTH0_SECRET: process.env.AUTH0_SECRET,

    //  Your Auth0 application's Client ID
    // AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,

    //  Your Auth0 application's Client Secret
    // AUTH0_CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,

    // https://github.com/auth0/nextjs-auth0/issues/383#issuecomment-976864245
    // AUTH0_ISSUER_BASE_URL: 'https://YOUR_AUTH0_DOMAIN.auth0.com',
    // AUTH0_BASE_URL: isProd ? 'https://przelejmi.pl/' : 'http://localhost:3000',
    NEXT_PUBLIC_HASURA_ADMIN_TOKEN: (isProd && process.env.NEXT_PUBLIC_HASURA_ADMIN_TOKEN) || '',
  },
}

module.exports = configs
