(function (root) {
  if (!String.prototype.normalize) String.prototype.normalize = function () {
    return String(this);
  };
  var LET = "A-Za-z\\u00C0-\\u024F\\u0300-\\u036F\\u1E00-\\u1EFF";
  var LETRE = /[A-Za-z\u00C0-\u024F\u0300-\u036F\u1E00-\u1EFF]+/g;
  var isLetter = function isLetter(c) {
    return !!c && /[A-Za-z\u00C0-\u024F\u0300-\u036F\u1E00-\u1EFF]/.test(c);
  };
  var isLow = function isLow(c) {
    return c === c.toLowerCase() && c !== c.toUpperCase();
  };
  var isUp = function isUp(c) {
    return c === c.toUpperCase() && c !== c.toLowerCase();
  };
  var TR = {
    a: 'aàáảãạ',
    ă: 'ăằắẳẵặ',
    â: 'âầấẩẫậ',
    e: 'eèéẻẽẹ',
    ê: 'êềếểễệ',
    i: 'iìíỉĩị',
    o: 'oòóỏõọ',
    ô: 'ôồốổỗộ',
    ơ: 'ơờớởỡợ',
    u: 'uùúủũụ',
    ư: 'ưừứửữự',
    y: 'yỳýỷỹỵ'
  };
  var MAP = {};
  for (var b in TR) {
    var a = TR[b].split('');
    for (var t = 0; t < a.length; t++) MAP[a[t]] = [b, t];
  }
  var CONS = 'bcdđghklmnpqrstvx',
    VOW = 'aăâeêioôơuưy',
    MOD = 'ăâêôơư';
  var NUC = {
    a: '- c ch m n ng nh p t',
    'ă': 'c m n ng p t',
    'â': 'c m n ng p t',
    e: '- c m n ng p t',
    'ê': '- ch m n nh p t',
    i: '- ch m n nh p t',
    o: '- c m n ng p t',
    'ô': '- c m n ng p t',
    'ơ': '- m n p t',
    u: '- c m n ng p t',
    'ư': '- c m n ng t',
    y: '-',
    ai: '-',
    ao: '-',
    au: '-',
    ay: '-',
    'âu': '-',
    'ây': '-',
    eo: '-',
    'êu': '-',
    iu: '-',
    oi: '-',
    'ôi': '-',
    'ơi': '-',
    ui: '-',
    'ưi': '-',
    'ưu': '-',
    ia: '-',
    ua: '-',
    'ưa': '-',
    'iê': 'c m n ng p t',
    'yê': 'm n ng t',
    'uô': 'c m n ng t',
    'ươ': 'c m n ng p t',
    oa: '- c ch m n ng nh p t',
    'oă': 'c m n ng t',
    oe: '- n t',
    'uâ': 'n ng t',
    'uê': '- ch nh',
    uy: '- ch n nh p t',
    'uyê': 'n t',
    'uơ': '-',
    'iêu': '-',
    'yêu': '-',
    oai: '-',
    oao: '-',
    oay: '-',
    oeo: '-',
    'uây': '-',
    'uôi': '-',
    uya: '-',
    uyu: '-',
    'ươi': '-',
    'ươu': '-'
  };
  var FAM = {
    a: 'aăâ',
    'ă': 'aăâ',
    'â': 'aăâ',
    e: 'eê',
    'ê': 'eê',
    o: 'oôơ',
    'ô': 'oôơ',
    'ơ': 'oôơ',
    u: 'uư',
    'ư': 'uư',
    i: 'iy',
    y: 'iy',
    d: 'dđ',
    'đ': 'dđ'
  };
  var D = function D() {
    return Object.create(null);
  };
  var mk = function mk(str) {
    var o = D(),
      a = str.split(' ');
    for (var i = 0; i < a.length; i++) o[a[i]] = 1;
    return o;
  };
  var ends = function ends(s, x) {
    return s.length >= x.length && s.slice(s.length - x.length) === x;
  };
  var starts = function starts(s, x) {
    return s.lastIndexOf(x, 0) === 0;
  };
  var REP = mk('từ dần đều xa ngày năm lâu nhau rất càng');
  var C_DEC = D(),
    C_PARTS = D(),
    C_CANON = D(),
    C_ALT = D(),
    C_SOLE = D(),
    C_CW = D();
  function decompose(w) {
    var r = C_DEC[w];
    if (r === undefined) {
      r = decompose0(w);
      C_DEC[w] = r;
    }
    return r;
  }
  function decompose0(w) {
    var b = '',
      t = 0,
      n = 0;
    for (var i = 0; i < w.length; i++) {
      var c = w[i];
      if (MAP[c]) {
        var x = MAP[c][0],
          y = MAP[c][1];
        b += x;
        if (y) {
          t = y;
          n++;
        }
      } else if (CONS.indexOf(c) >= 0) b += c;else return null;
    }
    return {
      b: b,
      t: t,
      n: n
    };
  }
  function parts(b) {
    var r = C_PARTS[b];
    if (r === undefined) {
      r = parts0(b);
      C_PARTS[b] = r;
    }
    return r;
  }
  function parts0(b) {
    var on = /^(ngh|ng|nh|ch|gh|gi|kh|ph|qu|th|tr|[bcdđghklmnpqrstvx])?/.exec(b)[0];
    var rest = b.slice(on.length),
      gc = false;
    if (on === 'gi' && (!rest || VOW.indexOf(rest[0]) < 0 || rest[0] === 'ê')) {
      on = 'g';
      rest = 'i' + rest;
      gc = true;
    }
    var r = /^([aăâeêioôơuưy]+)(ch|ng|nh|[cmnpt])?$/.exec(rest);
    return r ? {
      on: on,
      nu: r[1],
      co: r[2] || '',
      gc: gc,
      at: on.length
    } : null;
  }
  function okStruct(p, t) {
    var on = p.on,
      nu = p.nu,
      co = p.co;
    if (on === 'q') return false;
    var nk = nu;
    if (on === 'qu') {
      if (/^[ou]/.test(nu)) return false;
      if (nu[0] === 'y') nk = 'u' + nu;
    }
    if (on === 'gi' && /^[iy]/.test(nu)) return false;
    if (/^y[êu]/.test(nu) && nu.length > 1 && on && on !== 'qu') return false;
    if (/^iê/.test(nu) && !on) return false;
    var f = nk[0];
    if (on === 'k' && 'iyeê'.indexOf(f) < 0) return false;
    if (on === 'c' && 'iyeê'.indexOf(f) >= 0) return false;
    if (!p.gc) {
      if ((on === 'gh' || on === 'ngh') && 'ieê'.indexOf(f) < 0) return false;
      if ((on === 'g' || on === 'ng') && 'iyeê'.indexOf(f) >= 0) return false;
    }
    var a = NUC[nk];
    if (!a || (' ' + a + ' ').indexOf(' ' + (co || '-') + ' ') < 0) return false;
    if ((co === 'c' || co === 'ch' || co === 'p' || co === 't') && t !== 2 && t !== 5) return false;
    return true;
  }
  function tonePos(p) {
    var nu = p.nu,
      at = p.at,
      co = p.co;
    var mod = [];
    for (var i = 0; i < nu.length; i++) if (MOD.indexOf(nu[i]) >= 0) mod.push(i);
    if (mod.length) return [at + mod[mod.length - 1]];
    var L = nu.length;
    if (L === 1) return [at];
    if (L === 2) return co ? [at + 1] : nu === 'oa' || nu === 'oe' || nu === 'uy' ? [at, at + 1] : [at];
    return [at + 1];
  }
  var applyTone = function applyTone(b, i, t) {
    return b.slice(0, i) + TR[b[i]][t] + b.slice(i + 1);
  };
  var restore = function restore(src, out) {
    return src.length > 1 && src === src.toUpperCase() ? out.toUpperCase() : src[0] !== src[0].toLowerCase() ? out[0].toUpperCase() + out.slice(1) : out;
  };
  var LEX = null,
    PAIRS = D(),
    EXT = D(),
    USER = D(),
    USERF = D(),
    FOREIGN = D();
  var CID = D(),
    CUNI = D(),
    CKEY = null,
    CVAL = null;
  var C_PC = D(),
    C_VAR = D(),
    C_SENS = D();
  var resetCaches = function resetCaches() {
    C_PC = D();
    C_VAR = D();
    C_SENS = D();
  };
  var dist = function dist(a, b) {
    var d = Math.abs(a.length - b.length);
    var m = Math.min(a.length, b.length);
    for (var i = 0; i < m; i++) if (a[i] !== b[i]) d++;
    return d;
  };
  function canon0(lw) {
    var d = decompose(lw);
    if (!d || d.n !== 1) return lw;
    var p = parts(d.b);
    return p ? applyTone(d.b, tonePos(p)[0], d.t) : lw;
  }
  function canon(lw) {
    var r = C_CANON[lw];
    if (r === undefined) {
      r = canon0(lw);
      C_CANON[lw] = r;
    }
    return r;
  }
  function setLex(l) {
    LEX = l;
    PAIRS = D();
    EXT = mk((l.ext || []).join(' '));
    var addP = function addP(arr, wgt) {
      for (var j = 0; j < arr.length; j++) {
        var s = arr[j].split(' ');
        for (var i = 0; i < s.length - 1; i++) {
          var k = s[i] + ' ' + s[i + 1];
          PAIRS[k] = (PAIRS[k] || 0) + wgt;
        }
      }
    };
    addP(l.dom || [], 8);
    addP(l.cmp, 1);
    resetCaches();
  }
  function soleNuc(w) {
    var r = C_SOLE[w];
    if (r === undefined) {
      r = soleNuc0(w) || 0;
      C_SOLE[w] = r;
    }
    return r || null;
  }
  function soleNuc0(w) {
    var d = decompose(w);
    if (!d || d.n > 1) return null;
    var p = parts(d.b);
    return p && !p.co && !p.gc && p.on !== 'qu' && p.on !== 'gi' && (p.nu === 'i' || p.nu === 'y') ? {
      d: d,
      p: p
    } : null;
  }
  function alt(w) {
    var r = C_ALT[w];
    if (r === undefined) {
      r = alt0(w);
      C_ALT[w] = r;
    }
    return r;
  }
  function alt0(w) {
    var r = soleNuc(w);
    if (!r) return w;
    var d = r.d,
      p = r.p,
      nb = d.b.slice(0, p.at) + (p.nu === 'i' ? 'y' : 'i');
    var q = parts(nb);
    if (!q || !okStruct(q, d.t)) return w;
    return d.t ? applyTone(nb, p.at, d.t) : nb;
  }
  var eqA = function eqA(x, y) {
    return x === y || alt(x) === y;
  };
  var styleAs = function styleAs(a, orig) {
    var so = soleNuc(orig),
      sa = soleNuc(a);
    return so && sa && so.p.nu !== sa.p.nu ? alt(a) : a;
  };
  function cpair(k) {
    if (!CKEY) return 0;
    var i = k.indexOf(' '),
      a = CID[k.slice(0, i)],
      b = CID[k.slice(i + 1)];
    if (a === undefined || b === undefined) return 0;
    var key = a * 8281 + b;
    var lo = 0,
      hi = CKEY.length - 1;
    while (lo <= hi) {
      var m = lo + hi >> 1,
        v = CKEY[m];
      if (v === key) return CVAL[m];
      if (v < key) lo = m + 1;else hi = m - 1;
    }
    return 0;
  }
  var pr = function pr(k) {
    return (PAIRS[k] || 0) + (USER[k] || 0) + cpair(k);
  };
  function pc(a, b) {
    var key = a + ' ' + b;
    var r = C_PC[key];
    if (r === undefined) {
      var x = alt(a),
        y = alt(b);
      r = Math.max(pr(key), pr(x + ' ' + b), pr(a + ' ' + y), pr(x + ' ' + y));
      C_PC[key] = r;
    }
    return r;
  }
  function setCorpus(c) {
    CID = D();
    CUNI = D();
    FOREIGN = mk(c.foreign || '');
    var names = c.syl.split(' '),
      U = c.uni;
    for (var i = 0; i < names.length; i++) {
      CID[names[i]] = i;
      CUNI[names[i]] = U.charCodeAt(i) - 35;
    }
    var P = c.pairs,
      n = Math.floor(P.length / 5);
    CKEY = new Int32Array(n);
    CVAL = new Uint8Array(n);
    for (var _i = 0, j = 0; j < n; _i += 5, j++) {
      CKEY[j] = ((P.charCodeAt(_i) - 35) * 91 + (P.charCodeAt(_i + 1) - 35)) * 8281 + ((P.charCodeAt(_i + 2) - 35) * 91 + (P.charCodeAt(_i + 3) - 35));
      CVAL[j] = P.charCodeAt(_i + 4) - 35;
    }
    resetCaches();
  }
  function setUser(lines) {
    for (var k in USER) if (USER[k] === 8) delete USER[k];
    for (var q = 0; q < lines.length; q++) {
      var s = (lines[q].normalize('NFC').toLowerCase().match(LETRE) || []).map(canon);
      for (var i = 0; i < s.length - 1; i++) USER[s[i] + ' ' + s[i + 1]] = 8;
    }
    resetCaches();
  }
  var freq = function freq(w) {
    return (LEX ? LEX.syl[w] || LEX.syl[alt(w)] || 0 : 0) + (USERF[w] || 0) + (CUNI[w] || CUNI[alt(w)] || 0);
  };
  var SW = [['c', 't'], ['t', 'c'], ['n', 'ng'], ['ng', 'n'], ['ch', 'nh'], ['nh', 'ch'], ['n', 'nh'], ['nh', 'n'], ['c', 'ch'], ['ch', 'c'], ['t', 'ch'], ['ng', 'nh'], ['nh', 'ng']];
  var PT = [['uo', 'ươ'], ['uo', 'uô'], ['ie', 'iê'], ['ye', 'yê'], ['uoi', 'ươi'], ['uou', 'ươu']];
  function cands(b) {
    var list = [b],
      seen = D();
    seen[b] = 1;
    var add = function add(s) {
      if (!seen[s]) {
        seen[s] = 1;
        list.push(s);
      }
    };
    for (var k = 0; k < 2; k++) {
      var snap = list.slice();
      for (var q = 0; q < snap.length; q++) {
        var s = snap[q];
        for (var i = 0; i < s.length; i++) {
          var f = FAM[s[i]];
          if (f) for (var j = 0; j < f.length; j++) add(s.slice(0, i) + f[j] + s.slice(i + 1));
        }
        for (var _j = 0; _j < SW.length; _j++) if (ends(s, SW[_j][0])) add(s.slice(0, s.length - SW[_j][0].length) + SW[_j][1]);
        for (var _j2 = 0; _j2 < PT.length; _j2++) if (s.indexOf(PT[_j2][0]) >= 0) add(s.replace(PT[_j2][0], PT[_j2][1]));
      }
    }
    return list;
  }
  function rank(b, t0, src, prev, next, lim) {
    var own = canon(src.normalize('NFC').toLowerCase()),
      res = D(),
      keys = [];
    var cl = cands(b);
    for (var ci = 0; ci < cl.length; ci++) {
      var c = cl[ci],
        p = parts(c);
      if (!p) continue;
      for (var _t = 0; _t < 6; _t++) {
        if (!okStruct(p, _t)) continue;
        var w = _t ? applyTone(c, tonePos(p)[0], _t) : c;
        w = styleAs(w, own);
        if (eqA(w, own)) continue;
        var f = LEX ? freq(w) : 1;
        if (!f) continue;
        var sc = Math.log2(f + 1) - 1.3 * dist(b, c) - (_t === t0 ? 0 : 0.7),
          ctx = false;
        if (LEX) {
          var sp = prev ? pc(prev, w) : 0,
            sn = next ? pc(w, next) : 0;
          sc += 1.2 * (sp + sn);
          ctx = sp + sn > 0;
        }
        if (!res[w]) {
          res[w] = {
            w: w,
            sc: sc,
            ctx: ctx,
            f: f
          };
          keys.push(w);
        } else if (res[w].sc < sc) res[w] = {
          w: w,
          sc: sc,
          ctx: ctx,
          f: f
        };
      }
    }
    var arr = keys.map(function (k) {
      return res[k];
    });
    arr.sort(function (x, y) {
      return y.sc - x.sc;
    });
    return arr.slice(0, lim || 8).map(function (x) {
      return {
        w: restore(src, x.w),
        sc: x.sc,
        ctx: x.ctx,
        f: x.f
      };
    });
  }
  var ONS = [['s', 'x'], ['x', 's'], ['ch', 'tr'], ['tr', 'ch'], ['d', 'gi'], ['gi', 'd'], ['d', 'r'], ['r', 'd'], ['gi', 'r'], ['r', 'gi'], ['l', 'n'], ['n', 'l']];
  var ONS2 = [['th', 'r'], ['r', 'th'], ['th', 't'], ['t', 'th'], ['kh', 'k'], ['k', 'kh'], ['n', 'nh'], ['nh', 'n'], ['ng', 'n'], ['n', 'ng'], ['b', 'v'], ['v', 'b'], ['d', 'đ'], ['đ', 'd'], ['g', 'gh'], ['c', 'k'], ['k', 'c'], ['ph', 'p'], ['qu', 'c'], ['c', 'qu']];
  var CODA2 = [['c', 't'], ['t', 'c'], ['n', 'ng'], ['ng', 'n'], ['ch', 'nh'], ['nh', 'ch'], ['n', 'nh'], ['nh', 'n'], ['c', 'ch'], ['ch', 'c'], ['t', 'ch'], ['m', 'n'], ['n', 'm'], ['p', 'm'], ['m', 'p'], ['i', 'y'], ['u', 'o'], ['o', 'u']];
  function variants(b, wide) {
    var key = b + (wide ? '+' : '');
    var r = C_VAR[key];
    if (!r) {
      r = variants0(b, wide);
      C_VAR[key] = r;
    }
    return r;
  }
  function variants0(b, wide) {
    var base = [b],
      seen = D();
    seen[b] = 1;
    var add = function add(s) {
      if (!seen[s]) {
        seen[s] = 1;
        base.push(s);
      }
    };
    if (wide) {
      var s = b;
      for (var j = 0; j < ONS2.length; j++) if (starts(s, ONS2[j][0])) add(ONS2[j][1] + s.slice(ONS2[j][0].length));
      for (var _j3 = 0; _j3 < CODA2.length; _j3++) if (ends(s, CODA2[_j3][0])) add(s.slice(0, s.length - CODA2[_j3][0].length) + CODA2[_j3][1]);
    }
    for (var i = 0; i < b.length; i++) {
      var f = FAM[b[i]];
      if (f) for (var _j4 = 0; _j4 < f.length; _j4++) add(b.slice(0, i) + f[_j4] + b.slice(i + 1));
    }
    var snap = base.slice();
    for (var q = 0; q < snap.length; q++) for (var _j5 = 0; _j5 < ONS.length; _j5++) if (starts(snap[q], ONS[_j5][0])) add(ONS[_j5][1] + snap[q].slice(ONS[_j5][0].length));
    var out = [],
      so = D();
    for (var ci = 0; ci < base.length; ci++) {
      var c = base[ci],
        p = parts(c);
      if (!p) continue;
      for (var _t2 = 0; _t2 < 6; _t2++) {
        if (!okStruct(p, _t2)) continue;
        var w = _t2 ? applyTone(c, tonePos(p)[0], _t2) : c;
        if (!so[w] && freq(w)) {
          so[w] = 1;
          out.push(w);
        }
      }
    }
    return out;
  }
  var ABBR = mk('tp tt tr vd ts ths gs pgs bs cn ks ctr sđt đc stt ql đt tx nxb st kp tdp vv tb ub hđ qđ nđ');
  var cap = function cap(w) {
    return w[0].toUpperCase() + w.slice(1);
  };
  function grammar(text) {
    var out = [],
      L = '[' + LET + ']';
    var push = function push(idx, w, msg, sug) {
      return out.push({
        w: w,
        start: idx,
        type: 'gram',
        msg: msg,
        sug: Array.isArray(sug) ? sug : [sug]
      });
    };
    var m, re;
    re = /(\S)( {2,})(\S)/g;
    while (m = re.exec(text)) {
      push(m.index, m[0], 'Thừa dấu cách', m[1] + ' ' + m[3]);
      re.lastIndex = m.index + 1;
    }
    re = /(\S) +([,.;:!?])(?=\s|$)/g;
    while (m = re.exec(text)) if (!/^\.+$/.test(m[1])) push(m.index, m[0], 'Thừa dấu cách trước dấu câu', m[1] + m[2]);
    re = new RegExp('(\\S) +([,.;:])(' + L + ')', 'g');
    while (m = re.exec(text)) push(m.index, m[0], 'Dấu câu đặt sai chỗ', m[1] + m[2] + ' ' + m[3]);
    re = new RegExp('(' + L + '),(' + L + ')', 'g');
    while (m = re.exec(text)) {
      push(m.index, m[0], 'Thiếu dấu cách sau dấu phẩy', m[1] + ', ' + m[2]);
      re.lastIndex = m.index + 1;
    }
    re = new RegExp('(' + L + '{2,})([;:])(' + L + ')', 'g');
    while (m = re.exec(text)) {
      push(m.index, m[0], 'Thiếu dấu cách sau dấu câu', m[1] + m[2] + ' ' + m[3]);
      re.lastIndex = m.index + 1;
    }
    re = new RegExp('(' + L + '{2,})\\.(' + L + ')', 'g');
    while (m = re.exec(text)) {
      if (m[1] === m[1].toLowerCase() && isUp(m[2])) push(m.index, m[0], 'Thiếu dấu cách sau dấu chấm', m[1] + '. ' + m[2]);
      re.lastIndex = m.index + 1;
    }
    re = /([,;:!?])\1+/g;
    while (m = re.exec(text)) push(m.index, m[0], 'Lặp dấu câu', m[0][0]);
    re = /(^|[^.])(\.\.)(?!\.)/g;
    while (m = re.exec(text)) push(m.index + m[1].length, '..', 'Lặp dấu câu', '.');
    re = /\( +(\S)/g;
    while (m = re.exec(text)) push(m.index, m[0], 'Thừa dấu cách sau "("', '(' + m[1]);
    re = /(\S) +\)/g;
    while (m = re.exec(text)) push(m.index, m[0], 'Thừa dấu cách trước ")"', m[1] + ')');
    re = new RegExp('(' + L + '{2,})([.!?])(\\s+)(' + L + '+)', 'g');
    while (m = re.exec(text)) {
      var g = m[1];
      if (isLow(m[4][0]) && !ABBR[g.toLowerCase()] && g !== g.toUpperCase() && !/\d/.test(text.slice(Math.max(0, m.index - 1), m.index))) push(m.index + g.length, m[2] + m[3] + m[4], 'Đầu câu nên viết hoa', m[2] + m[3] + cap(m[4]));
      re.lastIndex = m.index + g.length + 1;
    }
    var PH = [['đã sẽ', ['đã', 'sẽ']], ['sẽ đã', ['sẽ', 'đã']], ['đang sẽ', ['đang', 'sẽ']], ['sẽ đang', ['sẽ', 'đang']], ['các những', ['các', 'những']], ['những các', ['những', 'các']], ['đã đang', ['đã', 'đang']]];
    PH.forEach(function (pr) {
      re = new RegExp('(^|[^' + LET + '])(' + pr[0] + ')(?![' + LET + '])', 'gi');
      while (m = re.exec(text)) {
        push(m.index + m[1].length, m[2], 'Dùng hai từ chỉ thời/số mâu thuẫn', pr[1]);
        re.lastIndex = m.index + m[1].length + 1;
      }
    });
    var cnt = function cnt(c) {
      return text.split(c).length - 1;
    };
    if (cnt('(') !== cnt(')') || cnt('“') !== cnt('”') || cnt('"') % 2) out.push({
      w: text.slice(0, 40) + (text.length > 40 ? '…' : ''),
      start: 0,
      type: 'gram',
      para: true,
      msg: 'Dấu ngoặc/ngoặc kép không cân đối trong đoạn',
      sug: []
    });
    return out;
  }
  function checkWord(tok) {
    var r = C_CW[tok];
    if (r === undefined) {
      r = checkWord0(tok);
      C_CW[tok] = r === null ? 0 : r;
    }
    return r || null;
  }
  function checkWord0(tok) {
    var lw = tok.normalize('NFC').toLowerCase();
    var d = decompose(lw);
    if (!d) return null;
    if (!/[aăâeêioôơuưy]/.test(d.b)) return tok === tok.toUpperCase() || tok.length < 2 ? null : {
      msg: 'Thiếu nguyên âm',
      sug: []
    };
    if (d.n > 1) return {
      msg: 'Có hơn một dấu thanh',
      sug: []
    };
    var p = parts(d.b);
    if (!p || !okStruct(p, d.t)) return {
      msg: 'Không phải âm tiết tiếng Việt',
      sug: null,
      b: d.b,
      t: d.t
    };
    if (d.t) {
      var idx = -1;
      for (var i = 0; i < lw.length; i++) {
        var e = MAP[lw[i]];
        if (e && e[1]) {
          idx = i;
          break;
        }
      }
      var ok = tonePos(p);
      if (ok.indexOf(idx) < 0) return {
        msg: 'Sai vị trí dấu thanh',
        sug: [restore(tok, applyTone(d.b, ok[0], d.t))]
      };
    }
    return null;
  }
  var toObj = function toObj(a) {
    var r = D();
    if (a && a.forEach) a.forEach(function (x) {
      r[x] = 1;
    });
    return r;
  };
  function scan(text, o) {
    o = o || {};
    var toks = [],
      re = new RegExp(LETRE.source, 'g');
    var m;
    while (m = re.exec(text)) toks.push({
      w: m[0],
      s: m.index,
      end: m.index + m[0].length,
      lw: m[0].normalize('NFC').toLowerCase()
    });
    for (var i = 0; i < toks.length; i++) toks[i].i = i;
    var adjN = [];
    for (var _i2 = 0; _i2 + 1 < toks.length; _i2++) adjN[_i2] = /^\s+$/.test(text.slice(toks[_i2].end, toks[_i2 + 1].s));
    var adj = function adj(a, b) {
      return !!(a && b && b.i === a.i + 1 && adjN[a.i]);
    };
    var ig = o.ignore ? o._ig || (o._ig = toObj(o.ignore)) : null;
    var isName = function isName(t) {
      if (t.nm === undefined) {
        t.nm = false;
        if (o.skipNames && t.w[0] !== t.w[0].toLowerCase() && t.w.slice(1) === t.w.slice(1).toLowerCase()) {
          var before = text.slice(0, t.s);
          t.nm = !!before.trim() && !/[.!?:;]\s*$/.test(before);
        }
      }
      return t.nm;
    };
    var out = [];
    toks.forEach(function (t, i) {
      var pv = toks[i - 1],
        nx = toks[i + 1],
        w = t.w;
      var prevC = adj(pv, t) ? canon(pv.lw) : null,
        nextC = adj(t, nx) ? canon(nx.lw) : null;
      if (pv && pv.lw === t.lw && t.lw.length > 1 && !REP[t.lw] && adj(pv, t) && decompose(t.lw)) out.push({
        w: pv.w + text.slice(pv.end, t.s) + w,
        start: pv.s,
        type: 'dup',
        msg: 'Lặp từ',
        sug: [pv.w]
      });
      if (w.length > 7 || /^[A-Z]{2,4}$/.test(w) || ig && ig[t.lw]) return;
      if (isName(t)) return;
      if (EXT[canon(t.lw)] || FOREIGN[t.lw]) {
        t.skip = true;
        return;
      }
      var r = checkWord(w);
      if (r) {
        t.skip = true;
        out.push({
          w: w,
          start: t.s,
          type: 'typo',
          msg: r.msg,
          sug: r.sug || rank(r.b, r.t, w, prevC, nextC).map(function (x) {
            return x.w;
          })
        });
        return;
      }
      if (!LEX) return;
      var d = decompose(t.lw);
      if (!d || !/[aăâeêioôơuưy]/.test(d.b)) return;
      var c = canon(t.lw),
        f = freq(c);
      if (!f) {
        t.skip = true;
        out.push({
          w: w,
          start: t.s,
          type: 'unk',
          msg: 'Không có trong từ điển',
          sug: rank(d.b, d.t, w, prevC, nextC).map(function (x) {
            return x.w;
          })
        });
        return;
      }
      var known = prevC && pc(prevC, c) || nextC && pc(c, nextC);
      if (f <= 3 && !known && (prevC || nextC)) {
        var best = rank(d.b, d.t, w, prevC, nextC, 5).filter(function (x) {
          return x.ctx && x.f >= 5 * f + 5;
        });
        if (best.length) t.skip = true;
        if (best.length) out.push({
          w: w,
          start: t.s,
          type: 'ctx',
          msg: 'Có thể sai theo ngữ cảnh',
          sug: best.map(function (x) {
            return x.w;
          })
        });
      }
    });
    if (LEX) {
      var okTok = function okTok(t) {
        return t && !t.skip && t.w.length <= 7 && !/^[A-Z]{2,4}$/.test(t.w) && !(ig && ig[t.lw]) && !isName(t);
      };
      for (var _i3 = 0; _i3 < toks.length - 1; _i3++) {
        var A = toks[_i3],
          B = toks[_i3 + 1];
        if (!adj(A, B) || !okTok(A) || !okTok(B)) continue;
        var da = decompose(A.lw),
          db = decompose(B.lw);
        if (!da || !db || !/[aăâeêioôơuưy]/.test(da.b) || !/[aăâeêioôơuưy]/.test(db.b)) continue;
        var ca = canon(A.lw),
          cb = canon(B.lw),
          c0 = pc(ca, cb);
        if (c0 >= 4) continue;
        var P = toks[_i3 - 1],
          N = toks[_i3 + 2];
        if (P && adj(P, A) && pc(canon(P.lw), ca) >= 2 || N && adj(B, N) && pc(cb, canon(N.lw)) >= 2) continue;
        var best = null;
        var va = variants(da.b),
          vb = variants(db.b);
        for (var x = 0; x < va.length; x++) for (var y = 0; y < vb.length; y++) {
          var _a = va[x],
            _b = vb[y];
          var ea = eqA(_a, ca),
            eb = eqA(_b, cb);
          if (ea && eb) continue;
          var c = pc(_a, _b),
            ch = !ea + !eb;
          if (c >= 3 && c >= 4 * (c0 + 1) && (!best || c - ch * 0.5 > best.sc)) best = {
            a: ea ? ca : _a,
            b: eb ? cb : _b,
            sc: c - ch * 0.5,
            ch: ch
          };
        }
        if (!best) continue;
        var sep = text.slice(A.end, B.s);
        if (best.a !== ca && best.b !== cb) out.push({
          w: A.w + sep + B.w,
          start: A.s,
          type: 'ctx',
          msg: 'Có thể sai theo ngữ cảnh',
          sug: [restore(A.w, styleAs(best.a, ca)) + sep + restore(B.w, styleAs(best.b, cb))]
        });else if (best.a !== ca) out.push({
          w: A.w,
          start: A.s,
          type: 'ctx',
          msg: 'Có thể sai theo ngữ cảnh',
          sug: [restore(A.w, styleAs(best.a, ca))]
        });else out.push({
          w: B.w,
          start: B.s,
          type: 'ctx',
          msg: 'Có thể sai theo ngữ cảnh',
          sug: [restore(B.w, styleAs(best.b, cb))]
        });
        A.skip = B.skip = true;
      }
    }
    if (LEX && o.sens) {
      var lvl = o.sens;
      var okTok2 = function okTok2(t) {
        return t && !t.skip && t.w.length <= 7 && !/^[A-Z]{2,4}$/.test(t.w) && !(ig && ig[t.lw]) && !isName(t);
      };
      toks.forEach(function (t, i) {
        if (!okTok2(t)) return;
        var d = decompose(t.lw);
        if (!d || !/[aăâeêioôơuưy]/.test(d.b)) return;
        var pv = toks[i - 1],
          nx = toks[i + 1];
        var pC = adj(pv, t) ? canon(pv.lw) : null,
          nC = adj(t, nx) ? canon(nx.lw) : null;
        if (!pC && !nC) return;
        var ct = canon(t.lw),
          f = freq(ct);
        var sup = function sup(w) {
          return (pC ? pc(pC, w) : 0) + (nC ? pc(w, nC) : 0);
        };
        var S0 = sup(ct);
        if (S0 >= (o.skipS || 9)) return;
        var ck = pC + '|' + ct + '|' + nC;
        var best = C_SENS[ck];
        if (best === undefined) {
          best = null;
          var nv = variants(d.b, false),
            narrow = D();
          for (var _x = 0; _x < nv.length; _x++) narrow[nv[_x]] = 1;
          var wv = variants(d.b, true);
          for (var _x2 = 0; _x2 < wv.length; _x2++) {
            var v = wv[_x2];
            if (eqA(v, ct)) continue;
            var Sv = sup(v);
            if (!Sv) continue;
            if (!narrow[v] && Sv < 3) continue;
            var sc = Sv * 2 + Math.log2(freq(v) + 1) * 0.3 - dist(v, ct) * 0.4;
            if (!best || sc > best.sc) best = {
              v: v,
              Sv: Sv,
              sc: sc
            };
          }
          C_SENS[ck] = best || 0;
        }
        if (best === 0) best = null;
        var flag = false;
        if (best) {
          var need = lvl === 1 ? o.need1 || 6 : o.need2 || 5;
          flag = f <= 30 || lvl === 2 ? best.Sv >= S0 + need : best.Sv >= S0 + need + 3;
        }
        if (flag) {
          var sg = [restore(t.w, styleAs(best.v, ct))];
          rank(d.b, d.t, t.w, pC, nC, 4).forEach(function (x) {
            if (sg.indexOf(x.w) < 0 && x.ctx) sg.push(x.w);
          });
          out.push({
            w: t.w,
            start: t.s,
            type: 'ctx',
            msg: 'Có thể sai theo ngữ cảnh',
            sug: sg
          });
        } else if (lvl === 2 && f <= 3 && S0 === 0) {
          var r = rank(d.b, d.t, t.w, pC, nC, 6).map(function (x) {
            return x.w;
          });
          if (r.length) out.push({
            w: t.w,
            start: t.s,
            type: 'unk',
            msg: 'Từ hiếm gặp, nên kiểm tra lại',
            sug: r
          });
        }
      });
    }
    if (o.grammar !== false) {
      var g = grammar(text);
      for (var _i4 = 0; _i4 < g.length; _i4++) out.push(g[_i4]);
    }
    return out;
  }
  var tokens = function tokens(str) {
    return str.normalize('NFC').toLowerCase().match(LETRE) || [];
  };
  function learn(text) {
    var ts = [],
      re = new RegExp(LETRE.source, 'g');
    var m;
    while (m = re.exec(text)) ts.push({
      s: m.index,
      end: m.index + m[0].length,
      c: canon(m[0].normalize('NFC').toLowerCase()),
      ok: !!decompose(m[0].normalize('NFC').toLowerCase())
    });
    ts.forEach(function (t, i) {
      if (!t.ok) return;
      USERF[t.c] = (USERF[t.c] || 0) + 1;
      var n = ts[i + 1];
      if (n && n.ok && /^\s+$/.test(text.slice(t.end, n.s))) {
        var k = t.c + ' ' + n.c;
        USER[k] = Math.min((USER[k] || 0) + 4, 40);
      }
    });
    resetCaches();
    return ts.length;
  }
  function resetLearn() {
    for (var k in USERF) delete USERF[k];
    resetCaches();
  }
  function sylOf(tok) {
    var lw = tok.normalize('NFC').toLowerCase(),
      d = decompose(lw);
    if (!d || d.n > 1) return null;
    var p = parts(d.b);
    return p && okStruct(p, d.t) ? canon(lw) : null;
  }
  var api = {
    scan: scan,
    checkWord: checkWord,
    setLex: setLex,
    setCorpus: setCorpus,
    setUser: setUser,
    learn: learn,
    resetLearn: resetLearn,
    canon: canon,
    tokens: tokens,
    isLetter: isLetter,
    sylOf: sylOf
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;else root.Speller = api;
})(this);
