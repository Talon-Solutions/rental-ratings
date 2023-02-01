/** @type {import('next').NextConfig} */
module.exports = {
  experimental: {
    appDir: true,
  },
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(js|jsx)$/
    })
    return config
  },
}
