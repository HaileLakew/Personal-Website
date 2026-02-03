/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    forceSwcTransforms: true,
  },
  webpack: ( config ) => {
    config.resolve.fallback = { 
      fs: false,
      module: false,
     };

    config.module.rules.push( {
      test: /\.(glsl|vs|fs|vert|frag)$/,
      type: 'asset/source',
      generator:
      {
          filename: 'assets/images/[hash][ext]'
      }
    },
    {
      test: /\.(js|jsx)$/, 
      exclude: /node_modules/,
      use: ["babel-loader"]
    })

    return config
  }
}
export default nextConfig;