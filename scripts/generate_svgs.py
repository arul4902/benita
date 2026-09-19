import os

os.makedirs(r'e:\benita\assets\highlights', exist_ok=True)

highlights = [
    {
        'name': 'christian',
        'title': 'Christian',
        'icon': '<path d="M50,22 L50,78 M32,40 L68,40" fill="none" stroke="url(#hGold)" stroke-width="4.5" stroke-linecap="round"/>'
    },
    {
        'name': 'product',
        'title': 'Product',
        'icon': '<rect x="35" y="38" width="30" height="40" rx="4" fill="none" stroke="url(#hGold)" stroke-width="3.5"/><path d="M44,22 L56,22 L56,38 L44,38 Z" fill="url(#hGold)"/><line x1="42" y1="55" x2="58" y2="55" stroke="url(#hGold)" stroke-width="2"/>'
    },
    {
        'name': 'certification',
        'title': 'Certification',
        'icon': '<circle cx="50" cy="46" r="20" fill="none" stroke="url(#hGold)" stroke-width="3.5"/><polygon points="50,34 53,42 61,42 55,47 57,55 50,50 43,55 45,47 39,42 47,42" fill="url(#hGold)"/><path d="M42,62 L36,80 L50,72 L64,80 L58,62" fill="url(#hGold)" opacity="0.8"/>'
    },
    {
        'name': 'seminar',
        'title': 'Seminar',
        'icon': '<circle cx="50" cy="35" r="12" fill="none" stroke="url(#hGold)" stroke-width="3.5"/><path d="M24,76 C24,58 36,54 50,54 C64,54 76,58 76,76" fill="none" stroke="url(#hGold)" stroke-width="3.5" stroke-linecap="round"/><circle cx="24" cy="42" r="7" fill="url(#hGold)" opacity="0.6"/><circle cx="76" cy="42" r="7" fill="url(#hGold)" opacity="0.6"/>'
    },
    {
        'name': 'hairstyle',
        'title': 'Hairstyle Class',
        'icon': '<path d="M50,22 C34,22 28,36 32,54 C34,64 42,70 50,78 C58,70 66,64 68,54 C72,36 66,22 50,22 Z" fill="none" stroke="url(#hGold)" stroke-width="3.5"/><path d="M42,42 C46,46 54,46 58,42" fill="none" stroke="url(#hGold)" stroke-width="2.5" stroke-linecap="round"/>'
    },
    {
        'name': 'portfolio',
        'title': 'Portfolio',
        'icon': '<rect x="25" y="28" width="50" height="44" rx="5" fill="none" stroke="url(#hGold)" stroke-width="3.5"/><circle cx="42" cy="44" r="6" fill="url(#hGold)"/><path d="M28,64 L42,50 L52,60 L62,48 L72,62" fill="none" stroke="url(#hGold)" stroke-width="3" stroke-linecap="round"/>'
    },
    {
        'name': 'nnsm',
        'title': 'NNSM',
        'icon': '<polygon points="50,18 60,38 82,41 66,56 70,78 50,67 30,78 34,56 18,41 40,38" fill="none" stroke="url(#hGold)" stroke-width="3.5"/><circle cx="50" cy="48" r="10" fill="url(#hGold)"/>'
    }
]

for h in highlights:
    svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">
  <defs>
    <linearGradient id="hGold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F2DFB3"/>
      <stop offset="50%" stop-color="#C8A66A"/>
      <stop offset="100%" stop-color="#9E7A3E"/>
    </linearGradient>
    <linearGradient id="hBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#084A4D"/>
      <stop offset="100%" stop-color="#04282B"/>
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="48" fill="url(#hBg)" stroke="url(#hGold)" stroke-width="2.5"/>
  <circle cx="50" cy="50" r="44" fill="none" stroke="url(#hGold)" stroke-width="0.8" stroke-dasharray="2,2" opacity="0.7"/>
  {h['icon']}
</svg>'''
    with open(f'e:/benita/assets/highlights/{h["name"]}.svg', 'w', encoding='utf-8') as f:
        f.write(svg_content)

print('Generated all highlight SVGs successfully.')
