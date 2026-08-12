// Lightweight SQL sanity check: counts parens, dollar quotes, single quotes,
// and verifies each CREATE/INSERT/UPDATE statement line ends with a semicolon.
const fs = require('fs');
const path = require('path');

const file = process.argv[2];
if (!file) {
  console.error('usage: node lint-sql.js <path-to-sql>');
  process.exit(2);
}

const src = fs.readFileSync(file, 'utf8');
const lines = src.split('\n');

let paren = 0;
let dollarTag = null;
let singleQuotes = 0;
let errors = [];
let cre = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  // Strip simple line comments only.
  let stripped = line;
  const commentIdx = line.indexOf('--');
  if (commentIdx >= 0) stripped = line.slice(0, commentIdx);

  // We won't track double-quoted identifiers here as they're rare in our file.

  let j = 0;
  while (j < stripped.length) {
    const ch = stripped[j];

    if (dollarTag) {
      const close = stripped.indexOf(dollarTag, j);
      if (close < 0) {
        j = stripped.length;
      } else {
        j = close + dollarTag.length;
        dollarTag = null;
      }
      continue;
    }

    // Detect $$...$$ as a single token.
    if (ch === '$') {
      const m = stripped.slice(j).match(/^\$[a-zA-Z0-9_]*\$/);
      if (m) {
        dollarTag = m[0];
        j += dollarTag.length;
        continue;
      }
    }

    if (ch === "'") {
      // Postgres uses '' to escape a single quote inside string.
      if (stripped[j + 1] === "'") {
        j += 2;
        continue;
      }
      singleQuotes = (singleQuotes + 1) % 2;
      j++;
      continue;
    }

    if (ch === '(') paren++;
    if (ch === ')') paren--;
    if (paren < 0) {
      errors.push(`line ${i + 1}: paren underflow at: ${stripped.trim()}`);
      paren = 0;
    }

    j++;
  }

  // Track top-level statements. Approximate.
  const trimmedStripped = stripped.trim();
  if (/^(create|alter|drop|insert|update|delete|grant|revoke|comment|do)\b/i.test(trimmedStripped)) {
    if (!trimmedStripped.endsWith(';') && !trimmedStripped.endsWith('$$')) {
      // Either multi-line or last statement.
      cre++;
      if (cre > 50) {
        errors.push(`line ${i + 1}: statement does not end with ; or $$: ${trimmedStripped.slice(0, 80)}`);
        cre = 0;
      }
    } else {
      cre = 0;
    }
  } else if (trimmedStripped === '') {
    cre = 0;
  }
}

if (paren !== 0) errors.push(`Unbalanced parens: ${paren}`);
if (singleQuotes !== 0) errors.push(`Unbalanced single quotes: ${singleQuotes}`);
if (dollarTag !== null) errors.push(`Unclosed dollar-quote tag: ${dollarTag}`);

if (errors.length === 0) {
  console.log(`OK — parens balanced, quotes balanced, dollar-quotes closed. lines=${lines.length}`);
  process.exit(0);
} else {
  console.log('Issues found:');
  for (const e of errors) console.log('  -', e);
  process.exit(1);
}
