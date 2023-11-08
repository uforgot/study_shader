module.exports = {
	root: false,
	parser: "@typescript-eslint/parser",
	plugins: ["@typescript-eslint", "prettier"],
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"prettier"
	],
	env: {
		browser: true,
		es6: true,
		node: true
	},
	rules: {
		"@typescript-eslint/*": "off",
		"@typescript-eslint/no-empty-interface": 0,
		// 빈 interface 선언
		"@typescript-eslint/no-unused-vars": 1,
		// 사용되지 않는 변수
		"@typescript-eslint/no-explicit-any": 2
		// any 타입 정의
	},
	overrides: [
		{
			files: ["*.ts", "*.tsx"],
			parser: "@typescript-eslint/parser",
			plugins: ["@typescript-eslint"],
			extends: [
				"plugin:@typescript-eslint/recommended",
				"plugin:prettier/recommended"
			]
		}
	]
};
