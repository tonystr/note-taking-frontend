module.exports = {
    poweredByHeader: false,
    eslint: {
        // Warning: This allows production builds to successfully complete even if the project has ESLint errors.
        ignoreDuringBuilds: true
    },
    webpack(config) {
        config.module.rules.push({
          test: /\.svg$/,
          use: ["@svgr/webpack"]
        });

        return config;
    }
}
