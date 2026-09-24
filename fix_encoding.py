import os, glob

replacements = {
    'ÃƒÂ¢Ã¢â€šÂ¬Ã¢â‚¬Â ': '—',
    'ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢': '→',
    'Ã¢â‚¬â€ ': '—',
    'Ã¢â‚¬â€œ': '–',
    'Ã‚Â©': '©',
    'Ã¢â‚¬Â¢': '•',
    'Ã¯Â¿Â½': '—',
    'Ã¢â€¢Â Ã¢â€¢Â Ã¢â€¢Â ': '═══',
    'Ã¢â‚¬â„¢': '’'
}

for filepath in glob.glob('f:/Smartfusion/September/Travel& Tourism5/*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    for broken, fixed in replacements.items():
        content = content.replace(broken, fixed)
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
