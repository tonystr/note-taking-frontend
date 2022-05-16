const base_url = process.env.NODE_ENV === "production" ? 'https://atcampus-api.pederfosse.no' : "http://localhost:8080";

console.log("node env:", process.env.NODE_ENV)

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
                destination: `${base_url}/:query`
            }, {
                source: '/api/:query/:query2',
                destination: `${base_url}/:query/:query2`
            }, {
                source: '/api/:query/:query2/:query3',
                destination: `${base_url}/:query/:query2/:query3`
            }
        ]
    }
}
