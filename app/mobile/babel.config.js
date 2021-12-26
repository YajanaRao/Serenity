module.exports = {
	presets: [
		['@babel/preset-env', { targets: { node: 'current' }, loose: true }],
		'@babel/preset-typescript',
		'module:metro-react-native-babel-preset',
	],
	plugins: [
		[
			'module-resolver',
			{
				root: ['./src'],
				extensions: [
					'.ios.ts',
					'.android.ts',
					'.ts',
					'.ios.tsx',
					'.android.tsx',
					'.tsx',
					'.jsx',
					'.js',
					'.json',
				],
			},
		],
		'react-native-reanimated/plugin',
	],
};
