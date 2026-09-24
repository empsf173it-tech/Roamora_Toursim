const fs = require('fs');
const path = require('path');

const replacements = {
    'ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â ': '—',
    'ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢': '→',
    'Ã¢â‚¬â€ ': '—',
    'Ã¢â‚¬â€œ': '–',
    'Ã‚Â©': '©',
    'Ã¢â‚¬Â¢': '•',
    'Ã¯Â¿Â½': '—',
    'Ã¢â€¢Â Ã¢â€¢Â Ã¢â€¢Â ': '═══',
    'Ã¢â‚¬â„¢': '’'
};

const dir = 'f:/Smartfusion/September/Travel& Tourism5';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

for (const file of files) {
    const fullPath = path.join(dir, file);
    let content = fs.readFileSync(fullPath, 'utf8');
    for (const [broken, fixed] of Object.entries(replacements)) {
        content = content.split(broken).join(fixed);
    }
    fs.writeFileSync(fullPath, content, 'utf8');
}
