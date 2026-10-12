let issues = [], cur = -1;
const $ = id => document.getElementById(id);
const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const norm = s => s.normalize('NFC').toLowerCase();
const getDict = () => { try { return localStorage.getItem('dict') || ''; } catch (e) { return ''; } };
const setDict = t => { try { localStorage.setItem('dict', t); } catch (e) {} };
const dictSet = () => new Set(norm($('dict').value).match(/[\p{L}\p{M}]+/gu) || []);
const btn = (t, f, c) => { const b = document.createElement('button'); b.textContent = t; if (c) b.className = c; b.onclick = e => { e.stopPropagation(); f(); }; return b; };

Office.onReady(() => {
  if (window.VNLEX) Speller.setLex(window.VNLEX);
  $('dict').value = getDict();
  $('dict').onchange = () => setDict($('dict').value);
  $('scan').onclick = run; $('next').onclick = () => step(cur + 1);
  $('mark').onclick = () => mark(true); $('unmark').onclick = () => mark(false);
  run();
});

async function mark(on) {
  if (!issues.length) return;
  try {
    await Word.run(issues[0].rg, async ctx => {
      issues.forEach(it => { if (!it.f.para) it.rg.font.highlightColor = on ? (it.f.type === 'typo' || it.f.type === 'unk' ? 'Yellow' : 'Turquoise') : null; });
      await ctx.sync();
    });
  } catch (e) { $('st').textContent = 'Lỗi: ' + e.message; }
}

function step(i) {
  if (!issues.length) return;
  cur = (i + issues.length) % issues.length;
  const kids = $('list').children;
  [...kids].forEach((k, n) => k.classList.toggle('cur', n === cur));
  if (kids[cur]) kids[cur].scrollIntoView({ block: 'nearest' });
  const it = issues[cur];
  Word.run(it.rg, async ctx => { it.rg.select(); await ctx.sync(); }).catch(() => {});
}

async function run() {
  $('st').textContent = 'Đang quét...'; $('list').innerHTML = ''; issues = [];
  setDict($('dict').value);
  Speller.setUser($('dict').value.split(/\r?\n/));
  try {
    await Word.run(async ctx => {
      const scope = $('sel').checked ? ctx.document.getSelection() : ctx.document.body;
      const ps = scope.paragraphs; ps.load('items/text'); await ctx.sync();
      const o = { ignore: dictSet(), skipNames: $('names').checked, grammar: $('gram').checked };
      const per = ps.items.map(p => ({ p, found: Speller.scan(p.text, o).sort((a, b) => a.start - b.start) }));
      if ($('rep').checked) {
        const cnt = {};
        per.forEach(x => x.found.forEach(f => { if (f.type === 'unk') cnt[norm(f.w)] = (cnt[norm(f.w)] || 0) + 1; }));
        per.forEach(x => { x.found = x.found.filter(f => !(f.type === 'unk' && cnt[norm(f.w)] >= 3)); });
      }
      const jobs = [];
      per.forEach(({ p, found }) => {
        const seen = new Set();
        found.forEach(f => {
          if (f.para) { jobs.push({ p, f, para: true }); return; }
          if (seen.has(f.w)) return; seen.add(f.w);
          const r = p.search(f.w, { matchCase: true, matchWholeWord: f.type !== 'gram' }); r.load('items'); jobs.push({ r, f });
        });
      });
      await ctx.sync();
      jobs.forEach(j => (j.para ? [j.p] : j.r.items).forEach(rg => { if (issues.length < 500) { rg.track(); issues.push({ rg, f: j.f }); } }));
      await ctx.sync();
    });
  } catch (e) { $('st').textContent = 'Lỗi: ' + e.message; return; }
  render(); step(0);
}

function render() {
  const L = $('list'); L.innerHTML = '';
  $('st').textContent = issues.length ? `Có ${issues.length} mục cần xem (bấm vào mục để tới vị trí)` : 'Không phát hiện lỗi.';
  issues.forEach(it => {
    const d = document.createElement('div'); d.className = 'it ' + it.f.type;
    d.innerHTML = `<div class="w">${esc(it.f.w)}</div><div class="m">${esc(it.f.msg)}</div>`;
    it.f.sug.forEach(s => d.append(btn(s, () => fix(it, s), 'pri')));
    d.append(btn('Bỏ qua', () => drop(it)));
    if (['typo', 'unk', 'ctx'].includes(it.f.type)) d.append(btn('Thêm vào từ điển', () => {
      const k = norm(it.f.w); $('dict').value = ($('dict').value.trim() + '\n' + it.f.w).trim(); setDict($('dict').value);
      issues = issues.filter(x => !(['typo', 'unk', 'ctx'].includes(x.f.type) && norm(x.f.w) === k)); render(); step(cur);
    }));
    d.onclick = () => step(issues.indexOf(it));
    L.append(d);
  });
}

function drop(it) { const i = issues.indexOf(it); issues = issues.filter(x => x !== it); render(); step(Math.min(i, issues.length - 1)); }

async function fix(it, s) {
  try { await Word.run(it.rg, async ctx => { it.rg.insertText(s, 'Replace'); await ctx.sync(); }); } catch (e) { $('st').textContent = 'Không sửa được: ' + e.message; return; }
  drop(it);
}
