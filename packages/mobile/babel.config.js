module.exports = {
	presets: [
		['@babel/preset-env', {targets: {node: 'current'}, loose: true}],
		'@babel/preset-typescript',
		'module:metro-react-native-babel-preset',
	],
	plugins: [
		[
			'transform-remove-console',
			'babel-plugin-root-import',
			{
				rootPathSuffix: './src',
				rootPathPrefix: '~/',
			},
		],
	],
};
