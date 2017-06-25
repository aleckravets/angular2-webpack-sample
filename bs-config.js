const historyApiFallback = require('connect-history-api-fallback');

module.exports = {
	https: true,
	files: [
		"./dist/**/*.css",
		"./dist/**/*.js"
	],
	server: {
		baseDir: "./dist"
	},
	middleware: [
		historyApiFallback()
	],
	open: false,
	plugins: ['bs-fullscreen-message']
};
