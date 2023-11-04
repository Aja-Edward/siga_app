/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },

  // Extend the configuration for audio domains
  webpack(config, options) {
    config.module.rules.push({
      test: /\.(ogg|mp3|wav|mpe?g)$/i,
      use: [
        {
          loader: 'file-loader',
          options: {
            publicPath: '_next',
            outputPath: 'static/audio/',
            name: '[name].[next]',
          },
        },
      ],
    })
    return config
  },
}

module.exports = nextConfig
