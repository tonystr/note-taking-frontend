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
    },
    async rewrites() {
        return [
            {
                source: '/api/:query',
                destination: 'http://localhost:8080/:query'
            }, {
                source: '/api/:query/:query2',
                destination: 'http://localhost:8080/:query/:query2'
            }, {
                source: '/api/:query/:query2/:query3',
                destination: 'http://localhost:8080/:query/:query2/:query3'
            }
        ]
    }
}
