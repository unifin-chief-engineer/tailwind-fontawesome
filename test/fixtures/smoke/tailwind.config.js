module.exports = {
    content: ['./content.html'],
    theme: {
        extend: {}
    },
    plugins: [
        require('../../../src/index.js')({
            version: 6,
            custom: [{ name: 'custom-logo', code: 'e001' }]
        })
    ]
};
