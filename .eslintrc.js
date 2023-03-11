module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'airbnb',
        'plugin:import/errors',
        'plugin:import/warnings',
    ],
    settings: {
        'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    },
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        indent: ['error', 4],
        semi: [2, 'always'],
        'consistent-return': 'off',
        'no-plusplus': 'off',
        'no-param-reassign': 'off',
        'import/no-cycle': 'off',
        'import/prefer-default-export': 'off',
        'import/extensions': 'off',
        'class-methods-use-this': 'off',
        'guard-for-in': 'off',
        'no-restricted-syntax': 'off',
        'no-undef': 'off',
    },
    "eslintConfig": {
        "globals": {
            // remove error of undef handlebars
            "Handlebars": true
        }
    }
};
