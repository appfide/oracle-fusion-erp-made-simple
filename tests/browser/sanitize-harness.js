import { sanitize, h } from '../../assets/js/dom.js';

// Attack strings a broken or careless lesson could contain.
const PAYLOADS = [
  '<img src=x onerror="window.__xss=1">',
  '<script>window.__xss=1</script>',
  '<svg onload="window.__xss=1"></svg>',
  '<iframe src="https://example.com"></iframe>',
  '<a href="javascript:window.__xss=1">click</a>',
  '<a href="http://insecure.example">plain http</a>',
  '<a href="https://ok.example" onclick="window.__xss=1" style="color:red">ok</a>',
  '<span class="hl" onmouseover="window.__xss=1">highlight</span>',
  '<span class="evil">other class</span>',
  '<p><strong>nested <em><img src=x onerror="window.__xss=1"></em></strong></p>',
  '<style>body{display:none}</style>',
  '<form action="https://evil.example"><input name=x></form>',
  '<!-- comment --><b>bold</b>',
  '<math><mtext><table><mglyph><style><img src=x onerror="window.__xss=1">',
  '<noscript><p title="</noscript><img src=x onerror=window.__xss=1>">',
];

/** What actually ended up in the DOM: element names and their attributes. */
function inspect(box) {
  const els = [...box.querySelectorAll('*')];
  return {
    tags: els.map((e) => e.tagName),
    attrs: els.flatMap((e) => [...e.attributes].map((a) => `${e.tagName}[${a.name}=${a.value}]`)),
  };
}

const results = PAYLOADS.map((input) => {
  const box = document.createElement('div');
  box.append(sanitize(input));
  document.body.append(box); // attach so any handler or load would really fire
  return { input, output: box.innerHTML, ...inspect(box) };
});

// h() must treat strings as text, never markup.
const textBox = h('div', {}, '<img src=x onerror="window.__xss=1">');
document.body.append(textBox);
results.push({ input: 'h() text child', output: textBox.innerHTML, ...inspect(textBox) });

setTimeout(() => { window.__results = { results, xss: window.__xss === 1 }; }, 300);
