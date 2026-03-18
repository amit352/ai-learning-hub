#!/usr/bin/env node
// Inlines dist/app.css into src/index.html
// app.js is kept as an external deferred script for better browser parse performance
// Output: index.html

const fs = require('fs');
const path = require('path');

const sourceRoot = path.resolve(__dirname, '..');
const docsRoot   = path.resolve(__dirname, '../../docs');

let html = fs.readFileSync(path.join(sourceRoot, 'src/index.html'), 'utf8');

const css = fs.readFileSync(path.join(docsRoot, 'dist/app.css'), 'utf8');

// Use a function replacer to avoid $ special characters in replacement strings
const r = (str, search, replacement) => str.replace(search, () => replacement);

html = r(html, '<link rel="stylesheet" href="dist/app.css">', `<style>${css}</style>`);

fs.mkdirSync(docsRoot, { recursive: true });
fs.writeFileSync(path.join(docsRoot, 'index.html'), html);

const kb = Math.round(fs.statSync(path.join(docsRoot, 'index.html')).size / 1024);
console.log(`✓ index.html inlined — ${kb} KB`);
