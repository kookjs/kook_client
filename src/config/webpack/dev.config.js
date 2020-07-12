var path = require("path");
var webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

const env = process.env.NODE_ENV || "development";
const BUILD_DIR = env == "development" ? "dist" : "build";
const ROOT_DIR = path.resolve(__dirname, "../../..");

const prod = env == "production";
console.log(env);
let APP_CONFIG = require("../../config/module/dev.js");
let mode = env;
// if (prod) {
// 	APP_CONFIG = require("../../config/module/prod.js");
// }
switch (env) {
	case "production":
		APP_CONFIG = require("../../config/module/prod.js");
		mode = "production";
		break;
	case "staging":
		APP_CONFIG = require("../../config/module/staging.js");
		mode = "development";
		break;
	default:
	// code
}

console.log(APP_CONFIG);
// return;

const recaptchaSiteKey = JSON.parse(APP_CONFIG.recaptchaSiteKey);

var config = {
	mode: mode,
	// Enable sourcemaps for debugging webpack's output.
	devtool: "source-map",

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".ts", ".tsx", ".js"],
	},

	entry: {
		main: path.resolve(__dirname, "../../index.tsx"),
	},
	output: {
		path: `${ROOT_DIR}/public/${BUILD_DIR}`,
		publicPath: "/",
		filename: "[name].js",
	},

	optimization: {
		runtimeChunk: false,
		minimize: env == "production",
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: path.resolve(__dirname, "../../../node_modules/"),
					chunks: "initial",
					name: "vendor",
					priority: -10,
					enforce: true,
					reuseExistingChunk: true,
				},
			},
		},
	},

	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: "ts-loader",
						options: {
							onlyCompileBundledFiles: true,
							// transpileOnly: true,
						},
					},
				],
			},
			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{
				enforce: "pre",
				test: /\.js$/,
				loader: "source-map-loader",
			},

			{
				test: /\.(js)$/,
				exclude: /node_modules/, // add this line

				use: [
					{
						loader: "babel-loader",
						options: {
							presets: [
								[
									"@babel/preset-env",
									{
										modules: "umd",
									},
								],
								"@babel/preset-react",
							],
							plugins: [
								// Stage 0
								require("babel-plugin-add-module-exports"),
								"@babel/plugin-transform-runtime",
								"@babel/plugin-proposal-function-bind",
								["@babel/plugin-proposal-decorators", { legacy: true }],
								["@babel/plugin-proposal-class-properties", { loose: true }],
								"@babel/plugin-syntax-dynamic-import",
								require("babel-plugin-transform-do-expressions"),

								// DISABLE CODE SPLITTING https://gist.github.com/jcenturion/892c718abce234243a156255f8f52468
								...(prod ? [] : ["dynamic-import-webpack", "remove-webpack"]),
							],
						},
					},
				],
			},

			{
				test: /\.(jpg|jpeg|png|gif)$/,
				use: "url-loader?limit=1000",
			},

			{
				test: /\.(woff|woff2|eot|otf|ttf|svg)$/,
				use: "file-loader",
			},

			{
				test: /\.(scss|css)$/,
				use: [
					MiniCssExtractPlugin.loader,
					// 'style-loader',
					{
						loader: "css-loader",
						options: {
							importLoaders: 1,
							//  minimize: false || {
							//     discardComments: {
							//         removeAll: true,
							//     },
							// }
						},
					},

					{
						loader: "postcss-loader",
						options: {
							config: {
								path: path.resolve(__dirname, "postcss.config.js"),
							},
							sourceMap: true,
							// plugins: [
							//   require('cssnano')(),
							// ]
						},
					},

					"sass-loader",
				],
			},
		],
	},

	// resolve: {
	// 	// alias: {
	// 	// 	components: path.resolve(__dirname, "../../../components"),
	// 	// 	packages: path.resolve(__dirname, "../../packages"),
	// 	// 	module: path.resolve(__dirname, "../../module"),
	// 	// },
	// },

	plugins: [
		new CopyPlugin({
			patterns: [
				{
					from: `${ROOT_DIR}/public/assets`,
					to: `${ROOT_DIR}/public/${BUILD_DIR}/assets`,
				},
				{
					from: `${ROOT_DIR}/public/images`,
					to: `${ROOT_DIR}/public/${BUILD_DIR}/images`,
				},
				// {
				// 	from: `${ROOT_DIR}/public/index.html`,
				// 	to: `${ROOT_DIR}/public/${BUILD_DIR}/index.html`
				// }
			],
		}),

		// new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /en/),

		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[name].css",
		}),

		new webpack.DefinePlugin({
			// __isBrowser__: "true"
			APP_CONFIG,
		}),

		new HtmlWebpackPlugin({
			minify: prod
				? {
						collapseWhitespace: true,
						removeComments: true,
						removeRedundantAttributes: true,
						removeScriptTypeAttributes: true,
						removeStyleLinkTypeAttributes: true,
						useShortDoctype: true,
				  }
				: false,
			title: JSON.parse(APP_CONFIG.siteTitle),
			// Load a custom template (lodash by default)
			template: "index.html",
			meta: {
				viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
				description: "",
			},

			logoUrl: JSON.parse(APP_CONFIG.domain) + JSON.parse(APP_CONFIG.logoUrl),

			styles: ["https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i,700&display=swap", "/assets/css/toastr.min.css"],

			scripts: [
				"/assets/js/jquery.min.js",
				"/assets/js/toastr.min.js",
				"/assets/js/popper.min.js",
				"/assets/js/bootstrap.min.js",
				recaptchaSiteKey ? `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}` : "",
			],
		}),
	],
};

module.exports = [config];
