const fs = require('node:fs');
const path = require('node:path');

const outputPath = path.join(__dirname, 'output.css');
const output = fs.readFileSync(outputPath, 'utf8');

const checks = [
    ['icon-before selector', '.icon-before'],
    ['icon-after selector', '.icon-after'],
    ['icon spacing utility', '.icon-space-sm'],
    ['icon weight utility', '.icon-solid'],
    ['font awesome 6 free family', 'Font Awesome 6 Free'],
    ['font awesome brands family', 'Font Awesome 6 Brands'],
    ['user icon content', '\\f007'],
    ['paper plane icon content', '\\f1d8'],
    ['custom icon content', '\\e001']
];

const failures = checks.filter(([, snippet]) => !output.includes(snippet));

if (failures.length > 0) {
    for (const [name, snippet] of failures) {
        console.error(`Missing ${name}: ${snippet}`);
    }

    process.exit(1);
}

console.log('Tailwind 4 smoke test passed.');
