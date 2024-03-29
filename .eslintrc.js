module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'airbnb',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    settings: {
        'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    },
    overrides: [
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        indent: ['error', 4],
        semi: [2, 'always'],
        // TODO https://trello.com/c/p715znYE trello task
        'consistent-return': 'off',
        'no-plusplus': 'off',
        'no-param-reassign': 'off',
        'import/no-cycle': 'off',
        'import/prefer-default-export': 'off',
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'class-methods-use-this': 'off',
        'guard-for-in': 'off',
        'no-restricted-syntax': 'off',
        'no-undef': 'off',
        'require-jsdoc': ['error', {
            require: {
                FunctionDeclaration: true,
                MethodDefinition: true,
                ClassDeclaration: true,
                ArrowFunctionExpression: false,
                FunctionExpression: false,
            },
        }],
        'no-console': ['error', { allow: ['error', 'warn'] }],
    },

};
