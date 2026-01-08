// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default [
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		rules: {
			'@typescript-eslint/no-require-imports': 'off',
			'no-undef': 'off'
		},
		languageOptions: {
			ecmaVersion: 2020,
			sourceType: 'module',
			globals: globals.browser
		}
	}
];
