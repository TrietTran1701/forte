import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  // The dev server is opened from its network host (127.0.2.2), which Next
  // treats as cross-origin and then refuses the client bundles. Without those
  // scripts the header never hydrates, so the hamburger click does nothing.
  allowedDevOrigins: ['127.0.0.1', '127.0.2.2'],
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default nextConfig
