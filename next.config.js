const path = require('path');

module.exports = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            include: [path.resolve(__dirname, 'assets/svgs')],
            use: ['@svgr/webpack'],
        });

        return config;
    },
};
