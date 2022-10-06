module.exports = {
	devServer: {
		disableHostCheck: true,
		allowedHosts: [
			'tetto.com',
			'*.tetto.com'
		],
		host: 'art.tetto.com',
		"port": 80,
		"open": true,
		proxy: {
			'/api': {
				target: 'http://api.tetto.com:88',
				changeOrigin: true,
			},
			'/static': {
				target: 'http://static.tetto.com:90',
				changeOrigin: true,
				pathRewrite: {
					'^/static': ''
				}
			}
		}
	},
}
