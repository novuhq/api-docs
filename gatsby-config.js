// Gatsby has dotenv by default
// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();

module.exports = {
  flags: { DEV_SSR: process.env.GATSBY_DEV_SSR || false },
  pathPrefix: '/api',
  assetPrefix: process.env.GATSBY_DEFAULT_SITE_URL,
  trailingSlash: 'always',
  siteMetadata: {
    siteTitle: 'Novu API Reference',
    siteDescription:
      'Novu is an open-source notification infrastructure built for the engineering teams to help them build rich product notification experiences without constantly re-inventing the wheel.',
    siteImage: '/api/images/social-preview.jpg',
    siteLanguage: 'en',
    siteUrl: process.env.GATSBY_DEFAULT_SITE_URL || 'http://localhost:8000',
    authorName: 'Pixel Point',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content`,
      },
    },
    'gatsby-plugin-image',
    'gatsby-transformer-sharp',
    'gatsby-transformer-remark',
    {
      resolve: 'gatsby-plugin-sharp',
      options: {
        defaults: {
          quality: 85,
          placeholder: 'none',
        },
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png',
      },
    },
    {
      resolve: 'gatsby-plugin-svgr-svgo',
      options: {
        inlineSvgOptions: [
          {
            test: /\.inline.svg$/,
            svgoConfig: {
              plugins: [
                {
                  name: 'preset-default',
                  params: {
                    overrides: {
                      removeViewBox: false,
                    },
                  },
                },
                'prefixIds',
                'removeDimensions',
              ],
            },
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-gatsby-cloud',
      options: {
        headers: {
          '/*': ['Access-Control-Allow-Origin: *'],
          '/api/fonts/*': ['Cache-Control: public, max-age=31536000, immutable'],
        },
      },
    },
    {
      resolve: 'gatsby-plugin-netlify',
      options: {
        headers: {
          '/*': ['Access-Control-Allow-Origin: *'],
          '/api/fonts/*': ['Cache-Control: public, max-age=31536000, immutable'],
        },
      },
    },
    'gatsby-alias-imports',
    'gatsby-plugin-postcss',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        resolveSiteUrl: () => 'https://docs.novu.co/',
        output: '/',
      },
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: 'https://docs.novu.co',
      },
    },
  ],
};
