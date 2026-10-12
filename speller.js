(function (root) {
  const TR = { a: 'aàáảãạ', ă: 'ăằắẳẵặ', â: 'âầấẩẫậ', e: 'eèéẻẽẹ', ê: 'êềếểễệ', i: 'iìíỉĩị', o: 'oòóỏõọ', ô: 'ôồốổỗộ', ơ: 'ơờớởỡợ', u: 'uùúủũụ', ư: 'ưừứửữự', y: 'yỳýỷỹỵ' };
  const MAP = {};
  for (const b in TR) [...TR[b]].forEach((c, t) => (MAP[c] = [b, t]));
  const CONS = 'bcdđghklmnpqrstvx', VOW = 'aăâeêioôơuưy', MOD = 'ăâêôơư';
  const NUC = {
    a: '- c ch m n ng nh p t', 'ă': 'c m n ng p t', 'â': 'c m n ng p t', e: '- c m n ng p t',
    'ê': '- ch m n nh p t', i: '- ch m n nh p t', o: '- c m n ng p t', 'ô': '- c m n ng p t',
    'ơ': '- m n p t', u: '- c m n ng p t', 'ư': '- c m n ng t', y: '-',
    ai: '-', ao: '-', au: '-', ay: '-', 'âu': '-', 'ây': '-', eo: '-', 'êu': '-', iu: '-', oi: '-', 'ôi': '-', 'ơi': '-', ui: '-', 'ưi': '-', 'ưu': '-', ia: '-', ua: '-', 'ưa': '-',
    'iê': 'c m n ng p t', 'yê': 'm n ng t', 'uô': 'c m n ng t', 'ươ': 'c m n ng p t',
    oa: '- c ch m n ng nh p t', 'oă': 'c m n ng t', oe: '- n t', 'uâ': 'n ng t', 'uê': '- ch nh', uy: '- ch n nh p t', 'uyê': 'n t', 'uơ': '-',
    'iêu': '-', 'yêu': '-', oai: '-', oao: '-', oay: '-', oeo: '-', 'uây': '-', 'uôi': '-', uya: '-', uyu: '-', 'ươi': '-', 'ươu': '-'
  };
  const FAM = { a: 'aăâ', 'ă': 'aăâ', 'â': 'aăâ', e: 'eê', 'ê': 'eê', o: 'oôơ', 'ô': 'oôơ', 'ơ': 'oôơ', u: 'uư', 'ư': 'uư', i: 'iy', y: 'iy', d: 'dđ', 'đ': 'dđ' };
  const REP = new Set(['từ', 'dần', 'đều', 'xa', 'ngày', 'năm', 'lâu', 'nhau', 'rất', 'càng']);

  function decompose(w) {
    let b = '', t = 0, n = 0;
    for (const c of w) {
      if (MAP[c]) { const [x, y] = MAP[c]; b += x; if (y) { t = y; n++; } }
      else if (CONS.includes(c)) b += c;
      else return null;
    }
    return { b, t, n };
  }

  function parts(b) {
    let on = /^(ngh|ng|nh|ch|gh|gi|kh|ph|qu|th|tr|[bcdđghklmnpqrstvx])?/.exec(b)[0];
    let rest = b.slice(on.length), gc = false;
    if (on === 'gi' && (!rest || !VOW.includes(rest[0]) || rest[0] === 'ê')) { on = 'g'; rest = 'i' + rest; gc = true; }
    const r = /^([aăâeêioôơuưy]+)(ch|ng|nh|[cmnpt])?$/.exec(rest);
    return r ? { on, nu: r[1], co: r[2] || '', gc, at: on.length } : null;
  }

  function okStruct(p, t) {
    const { on, nu, co } = p;
    if (on === 'q') return false;
    let nk = nu;
    if (on === 'qu') { if (/^[ou]/.test(nu)) return false; if (nu[0] === 'y') nk = 'u' + nu; }
    if (on === 'gi' && /^[iy]/.test(nu)) return false;
    if (/^y[êu]/.test(nu) && nu.length > 1 && on && on !== 'qu') return false;
    if (/^iê/.test(nu) && !on) return false;
    const f = nk[0];
    if (on === 'k' && !'iyeê'.includes(f)) return false;
    if (on === 'c' && 'iyeê'.includes(f)) return false;
    if (!p.gc) {
      if ((on === 'gh' || on === 'ngh') && !'ieê'.includes(f)) return false;
      if ((on === 'g' || on === 'ng') && 'iyeê'.includes(f)) return false;
    }
    const a = NUC[nk];
    if (!a || !a.split(' ').includes(co || '-')) return false;
    if (['c', 'ch', 'p', 't'].includes(co) && t !== 2 && t !== 5) return false;
    return true;
  }

  function tonePos(p) {
    const { nu, at, co } = p;
    const mod = [...nu].map((c, i) => (MOD.includes(c) ? i : -1)).filter(i => i >= 0);
    if (mod.length) return [at + mod[mod.length - 1]];
    const L = nu.length;
    if (L === 1) return [at];
    if (L === 2) return co ? [at + 1] : ['oa', 'oe', 'uy'].includes(nu) ? [at, at + 1] : [at];
    return [at + 1];
  }

  const applyTone = (b, i, t) => b.slice(0, i) + TR[b[i]][t] + b.slice(i + 1);
  const restore = (src, out) => src.length > 1 && src === src.toUpperCase() ? out.toUpperCase() : src[0] !== src[0].toLowerCase() ? out[0].toUpperCase() + out.slice(1) : out;

  let LEX = null, PAIRS = new Map(), EXT = new Set(), USER = new Map();
  const dist = (a, b) => { let d = Math.abs(a.length - b.length); for (let i = 0; i < Math.min(a.length, b.length); i++) if (a[i] !== b[i]) d++; return d; };
  function canon(lw) {
    const d = decompose(lw);
    if (!d || d.n !== 1) return lw;
    const p = parts(d.b);
    return p ? applyTone(d.b, tonePos(p)[0], d.t) : lw;
  }
  function setLex(l) {
    LEX = l; PAIRS = new Map(); EXT = new Set(l.ext || []);
    for (const w of (l.dom || [])) { const s = w.split(' '); for (let i = 0; i < s.length - 1; i++) { const k = s[i] + ' ' + s[i + 1]; PAIRS.set(k, (PAIRS.get(k) || 0) + 8); } }
    for (const w of l.cmp) { const s = w.split(' '); for (let i = 0; i < s.length - 1; i++) { const k = s[i] + ' ' + s[i + 1]; PAIRS.set(k, (PAIRS.get(k) || 0) + 1); } }
  }

  function soleNuc(w) {
    const d = decompose(w); if (!d || d.n > 1) return null;
    const p = parts(d.b);
    return p && !p.co && !p.gc && p.on !== 'qu' && p.on !== 'gi' && (p.nu === 'i' || p.nu === 'y') ? { d, p } : null;
  }
  function alt(w) {
    const r = soleNuc(w); if (!r) return w;
    const { d, p } = r, nb = d.b.slice(0, p.at) + (p.nu === 'i' ? 'y' : 'i');
    const q = parts(nb);
    if (!q || !okStruct(q, d.t)) return w;
    return d.t ? applyTone(nb, p.at, d.t) : nb;
  }
  const eqA = (x, y) => x === y || alt(x) === y;
  const styleAs = (a, orig) => { const so = soleNuc(orig), sa = soleNuc(a); return so && sa && so.p.nu !== sa.p.nu ? alt(a) : a; };
  const pr = k => (PAIRS.get(k) || 0) + (USER.get(k) || 0);
  const pc = (a, b) => Math.max(pr(a + ' ' + b), pr(alt(a) + ' ' + b), pr(a + ' ' + alt(b)), pr(alt(a) + ' ' + alt(b)));
  function setUser(lines) {
    USER = new Map();
    for (const ln of lines) { const s = (ln.normalize('NFC').toLowerCase().match(/[\p{L}\p{M}]+/gu) || []).map(canon); for (let i = 0; i < s.length - 1; i++) USER.set(s[i] + ' ' + s[i + 1], 8); }
  }
  const freq = w => (LEX && (LEX.syl[w] || LEX.syl[alt(w)])) || 0;

  function cands(b) {
    const c1 = new Set([b]);
    const SW = [['c', 't'], ['t', 'c'], ['n', 'ng'], ['ng', 'n'], ['ch', 'nh'], ['nh', 'ch'], ['n', 'nh'], ['nh', 'n'], ['c', 'ch'], ['ch', 'c'], ['t', 'ch'], ['ng', 'nh'], ['nh', 'ng']];
    const PT = [['uo', 'ươ'], ['uo', 'uô'], ['ie', 'iê'], ['ye', 'yê'], ['uoi', 'ươi'], ['uou', 'ươu']];
    for (let k = 0; k < 2; k++) for (const s of [...c1]) {
      for (let i = 0; i < s.length; i++) if (FAM[s[i]]) for (const c of FAM[s[i]]) c1.add(s.slice(0, i) + c + s.slice(i + 1));
      for (const [x, y] of SW) if (s.endsWith(x)) c1.add(s.slice(0, -x.length) + y);
      for (const [x, y] of PT) if (s.includes(x)) c1.add(s.replace(x, y));
    }
    return c1;
  }

  function rank(b, t0, src, prev, next, lim) {
    const own = canon(src.normalize('NFC').toLowerCase()), res = new Map();
    for (const c of cands(b)) {
      const p = parts(c); if (!p) continue;
      for (let t = 0; t < 6; t++) {
        if (!okStruct(p, t)) continue;
        let w = t ? applyTone(c, tonePos(p)[0], t) : c;
        w = styleAs(w, own);
        if (eqA(w, own)) continue;
        const f = LEX ? freq(w) : 1; if (!f) continue;
        let sc = Math.log2(f + 1) - 1.3 * dist(b, c) - (t === t0 ? 0 : 0.7), ctx = false;
        if (LEX) { if (prev && pc(prev, w)) { sc += 6; ctx = true; } if (next && pc(w, next)) { sc += 6; ctx = true; } }
        if (!res.has(w) || res.get(w).sc < sc) res.set(w, { w, sc, ctx, f });
      }
    }
    return [...res.values()].sort((x, y) => y.sc - x.sc).slice(0, lim || 8).map(x => ({ ...x, w: restore(src, x.w) }));
  }


  const ONS = [['s', 'x'], ['x', 's'], ['ch', 'tr'], ['tr', 'ch'], ['d', 'gi'], ['gi', 'd'], ['d', 'r'], ['r', 'd'], ['gi', 'r'], ['r', 'gi'], ['l', 'n'], ['n', 'l']];
  function variants(b) {
    const base = new Set([b]);
    for (let i = 0; i < b.length; i++) if (FAM[b[i]]) for (const c of FAM[b[i]]) base.add(b.slice(0, i) + c + b.slice(i + 1));
    for (const s of [...base]) for (const [x, y] of ONS) if (s.startsWith(x)) base.add(y + s.slice(x.length));
    const out = new Set();
    for (const c of base) {
      const p = parts(c); if (!p) continue;
      for (let t = 0; t < 6; t++) { if (!okStruct(p, t)) continue; const w = t ? applyTone(c, tonePos(p)[0], t) : c; if (freq(w)) out.add(w); }
    }
    return [...out];
  }

  const ABBR = new Set(['tp', 'tt', 'tr', 'vd', 'ts', 'ths', 'gs', 'pgs', 'bs', 'cn', 'ks', 'ctr', 'sđt', 'đc', 'stt', 'ql', 'đt', 'tx', 'nxb', 'st', 'kp', 'tdp', 'vv', 'tb', 'ub', 'hđ', 'qđ', 'nđ', 'tt']);
  const cap = w => w[0].toUpperCase() + w.slice(1);
  function grammar(text) {
    const out = [], L = '[\\p{L}\\p{M}]';
    const add = (m, msg, sug, w) => out.push({ w: w || m[0], start: m.index, type: 'gram', msg, sug: Array.isArray(sug) ? sug : [sug] });
    let m, re;
    re = /(\S)( {2,})(\S)/gu; while ((m = re.exec(text))) { add(m, 'Thừa dấu cách', m[1] + ' ' + m[3]); re.lastIndex = m.index + 1; }
    re = /(\S) +([,.;:!?])(?=\s|$)/gu; while ((m = re.exec(text))) if (!/^\.+$/.test(m[1])) add(m, 'Thừa dấu cách trước dấu câu', m[1] + m[2]);
    re = new RegExp('(\\S) +([,.;:])(' + L + ')', 'gu'); while ((m = re.exec(text))) add(m, 'Dấu câu đặt sai chỗ', m[1] + m[2] + ' ' + m[3]);
    re = new RegExp('(' + L + '),(' + L + ')', 'gu'); while ((m = re.exec(text))) { add(m, 'Thiếu dấu cách sau dấu phẩy', m[1] + ', ' + m[2]); re.lastIndex = m.index + 1; }
    re = new RegExp('(' + L + '{2,})([;:])(' + L + ')', 'gu'); while ((m = re.exec(text))) { add(m, 'Thiếu dấu cách sau dấu câu', m[1] + m[2] + ' ' + m[3]); re.lastIndex = m.index + 1; }
    re = /(\p{Ll}{2,})\.(\p{Lu})/gu; while ((m = re.exec(text))) { add(m, 'Thiếu dấu cách sau dấu chấm', m[1] + '. ' + m[2]); re.lastIndex = m.index + 1; }
    re = /([,;:!?])\1+|(?<!\.)\.\.(?!\.)/gu; while ((m = re.exec(text))) add(m, 'Lặp dấu câu', m[0][0]);
    re = /\( +(\S)/gu; while ((m = re.exec(text))) add(m, 'Thừa dấu cách sau "("', '(' + m[1]);
    re = /(\S) +\)/gu; while ((m = re.exec(text))) add(m, 'Thừa dấu cách trước ")"', m[1] + ')');
    re = new RegExp('(' + L + '{2,})([.!?])(\\s+)(\\p{Ll}' + L + '*)', 'gu');
    while ((m = re.exec(text))) { const g = m[1]; if (ABBR.has(g.toLowerCase()) || g === g.toUpperCase() || /\d/.test(text.slice(Math.max(0, m.index - 1), m.index))) continue; const w = m[2] + m[3] + m[4]; add(m, 'Đầu câu nên viết hoa', m[2] + m[3] + cap(m[4]), w); }
    const PH = [['đã sẽ', ['đã', 'sẽ']], ['sẽ đã', ['sẽ', 'đã']], ['đang sẽ', ['đang', 'sẽ']], ['sẽ đang', ['sẽ', 'đang']], ['các những', ['các', 'những']], ['những các', ['những', 'các']], ['đã đang', ['đã', 'đang']]];
    for (const [ph, sg] of PH) { re = new RegExp('(?<!' + L + ')' + ph + '(?!' + L + ')', 'giu'); while ((m = re.exec(text))) add(m, 'Dùng hai từ chỉ thời/số mâu thuẫn', sg); }
    const cnt = (c) => text.split(c).length - 1;
    if (cnt('(') !== cnt(')') || cnt('“') !== cnt('”') || cnt('"') % 2) out.push({ w: text.slice(0, 40) + (text.length > 40 ? '…' : ''), start: 0, type: 'gram', para: true, msg: 'Dấu ngoặc/ngoặc kép không cân đối trong đoạn', sug: [] });
    return out;
  }

  function checkWord(tok) {
    const lw = tok.normalize('NFC').toLowerCase();
    const d = decompose(lw);
    if (!d) return null;
    if (!/[aăâeêioôơuưy]/.test(d.b)) return tok === tok.toUpperCase() || tok.length < 2 ? null : { msg: 'Thiếu nguyên âm', sug: [] };
    if (d.n > 1) return { msg: 'Có hơn một dấu thanh', sug: [] };
    const p = parts(d.b);
    if (!p || !okStruct(p, d.t)) return { msg: 'Không phải âm tiết tiếng Việt', sug: null, b: d.b, t: d.t };
    if (d.t) {
      const idx = [...lw].findIndex(c => MAP[c] && MAP[c][1]);
      const ok = tonePos(p);
      if (!ok.includes(idx)) return { msg: 'Sai vị trí dấu thanh', sug: [restore(tok, applyTone(d.b, ok[0], d.t))] };
    }
    return null;
  }

  function scan(text, o) {
    o = o || {};
    const toks = [], re = /[\p{L}\p{M}]+/gu; let m;
    while ((m = re.exec(text))) toks.push({ w: m[0], s: m.index, end: m.index + m[0].length, lw: m[0].normalize('NFC').toLowerCase() });
    const adj = (a, b) => a && b && /^\s+$/.test(text.slice(a.end, b.s));
    const out = [];
    toks.forEach((t, i) => {
      const pv = toks[i - 1], nx = toks[i + 1], w = t.w;
      const prevC = adj(pv, t) ? canon(pv.lw) : null, nextC = adj(t, nx) ? canon(nx.lw) : null;
      if (pv && pv.lw === t.lw && t.lw.length > 1 && !REP.has(t.lw) && adj(pv, t) && decompose(t.lw))
        out.push({ w: pv.w + text.slice(pv.end, t.s) + w, start: pv.s, type: 'dup', msg: 'Lặp từ', sug: [pv.w] });
      if (w.length > 7 || /^[A-Z]{2,4}$/.test(w) || (o.ignore && o.ignore.has(t.lw))) return;
      if (o.skipNames && w[0] !== w[0].toLowerCase() && w.slice(1) === w.slice(1).toLowerCase()) {
        const before = text.slice(0, t.s);
        if (before.trim() && !/[.!?:;]\s*$/.test(before)) return;
      }
      if (EXT.has(canon(t.lw))) { t.skip = true; return; }
      const r = checkWord(w);
      if (r) { t.skip = true; out.push({ w, start: t.s, type: 'typo', msg: r.msg, sug: r.sug || rank(r.b, r.t, w, prevC, nextC).map(x => x.w) }); return; }
      if (!LEX) return;
      const d = decompose(t.lw);
      if (!d || !/[aăâeêioôơuưy]/.test(d.b)) return;
      const c = canon(t.lw), f = freq(c);
      if (!f) { t.skip = true; out.push({ w, start: t.s, type: 'unk', msg: 'Không có trong từ điển', sug: rank(d.b, d.t, w, prevC, nextC).map(x => x.w) }); return; }
      const known = (prevC && pc(prevC, c)) || (nextC && pc(c, nextC));
      if (f <= 3 && !known && (prevC || nextC)) {
        const best = rank(d.b, d.t, w, prevC, nextC, 5).filter(x => x.ctx && x.f >= 5 * f + 5);
        if (best.length) t.skip = true;
        if (best.length) out.push({ w, start: t.s, type: 'ctx', msg: 'Có thể sai theo ngữ cảnh', sug: best.map(x => x.w) });
      }
    });
    if (LEX) {
      const okTok = t => t && !t.skip && t.w.length <= 7 && !/^[A-Z]{2,4}$/.test(t.w) && !(o.ignore && o.ignore.has(t.lw)) && !(o.skipNames && t.w[0] !== t.w[0].toLowerCase() && t.w.slice(1) === t.w.slice(1).toLowerCase() && text.slice(0, t.s).trim() && !/[.!?:;]\s*$/.test(text.slice(0, t.s)));
      for (let i = 0; i < toks.length - 1; i++) {
        const A = toks[i], B = toks[i + 1];
        if (!adj(A, B) || !okTok(A) || !okTok(B)) continue;
        const da = decompose(A.lw), db = decompose(B.lw);
        if (!da || !db || !/[aăâeêioôơuưy]/.test(da.b) || !/[aăâeêioôơuưy]/.test(db.b)) continue;
        const ca = canon(A.lw), cb = canon(B.lw), c0 = pc(ca, cb);
        if (c0 >= 4) continue;
        const P = toks[i - 1], N = toks[i + 2];
        if ((P && adj(P, A) && pc(canon(P.lw), ca) >= 2) || (N && adj(B, N) && pc(cb, canon(N.lw)) >= 2)) continue;
        let best = null;
        for (const a of variants(da.b)) for (const b of variants(db.b)) {
          const ea = eqA(a, ca), eb = eqA(b, cb);
          if (ea && eb) continue;
          const c = pc(a, b), ch = (!ea) + (!eb);
          if (c >= 3 && c >= 4 * (c0 + 1) && (!best || c - ch * 0.5 > best.sc)) best = { a: ea ? ca : a, b: eb ? cb : b, sc: c - ch * 0.5, ch };
        }
        if (!best) continue;
        const sep = text.slice(A.end, B.s);
        if (best.a !== ca && best.b !== cb) out.push({ w: A.w + sep + B.w, start: A.s, type: 'ctx', msg: 'Có thể sai theo ngữ cảnh', sug: [restore(A.w, styleAs(best.a, ca)) + sep + restore(B.w, styleAs(best.b, cb))] });
        else if (best.a !== ca) out.push({ w: A.w, start: A.s, type: 'ctx', msg: 'Có thể sai theo ngữ cảnh', sug: [restore(A.w, styleAs(best.a, ca))] });
        else out.push({ w: B.w, start: B.s, type: 'ctx', msg: 'Có thể sai theo ngữ cảnh', sug: [restore(B.w, styleAs(best.b, cb))] });
        A.skip = B.skip = true;
      }
    }
    if (o.grammar !== false) out.push(...grammar(text));
    return out;
  }

  const api = { scan, checkWord, setLex, setUser, canon };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.Speller = api;
})(this);
