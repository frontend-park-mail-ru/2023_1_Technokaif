module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: 'airbnb',
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        indent: ['error', 4],
        semi: [2, 'always'],
    },
};
