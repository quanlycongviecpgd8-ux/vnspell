function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, e) { if ("object" != _typeof(t) || !t) return t; var r; if ("undefined" != typeof Symbol && void 0 !== (r = t[Symbol.toPrimitive])) { var i = r.call(t, e || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === e ? String : Number)(t); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a, u = !0; return { s: function s() { t = t.call(r); }, n: function n() { u = !0; var r = t.next(); return r.done ? { done: !0 } : { value: r.value, done: u = !1 }; }, e: function e(r) { o = !0, a = r; }, f: function f() { try { u || null == t.return || t.return(); } finally { if (o) throw a; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
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
  var _loop = function _loop(b) {
    _toConsumableArray(TR[b]).forEach(function (c, t) {
      return MAP[c] = [b, t];
    });
  };
  for (var b in TR) {
    _loop(b);
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
  var REP = new Set(['từ', 'dần', 'đều', 'xa', 'ngày', 'năm', 'lâu', 'nhau', 'rất', 'càng']);
  function decompose(w) {
    var b = '',
      t = 0,
      n = 0;
    var _iterator = _createForOfIteratorHelper(w),
      _step;
    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var c = _step.value;
        if (MAP[c]) {
          var _MAP$c = _slicedToArray(MAP[c], 2),
            x = _MAP$c[0],
            y = _MAP$c[1];
          b += x;
          if (y) {
            t = y;
            n++;
          }
        } else if (CONS.includes(c)) b += c;else return null;
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }
    return {
      b: b,
      t: t,
      n: n
    };
  }
  function parts(b) {
    var on = /^(ngh|ng|nh|ch|gh|gi|kh|ph|qu|th|tr|[bcdđghklmnpqrstvx])?/.exec(b)[0];
    var rest = b.slice(on.length),
      gc = false;
    if (on === 'gi' && (!rest || !VOW.includes(rest[0]) || rest[0] === 'ê')) {
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
    if (on === 'k' && !'iyeê'.includes(f)) return false;
    if (on === 'c' && 'iyeê'.includes(f)) return false;
    if (!p.gc) {
      if ((on === 'gh' || on === 'ngh') && !'ieê'.includes(f)) return false;
      if ((on === 'g' || on === 'ng') && 'iyeê'.includes(f)) return false;
    }
    var a = NUC[nk];
    if (!a || !a.split(' ').includes(co || '-')) return false;
    if (['c', 'ch', 'p', 't'].includes(co) && t !== 2 && t !== 5) return false;
    return true;
  }
  function tonePos(p) {
    var nu = p.nu,
      at = p.at,
      co = p.co;
    var mod = _toConsumableArray(nu).map(function (c, i) {
      return MOD.includes(c) ? i : -1;
    }).filter(function (i) {
      return i >= 0;
    });
    if (mod.length) return [at + mod[mod.length - 1]];
    var L = nu.length;
    if (L === 1) return [at];
    if (L === 2) return co ? [at + 1] : ['oa', 'oe', 'uy'].includes(nu) ? [at, at + 1] : [at];
    return [at + 1];
  }
  var applyTone = function applyTone(b, i, t) {
    return b.slice(0, i) + TR[b[i]][t] + b.slice(i + 1);
  };
  var restore = function restore(src, out) {
    return src.length > 1 && src === src.toUpperCase() ? out.toUpperCase() : src[0] !== src[0].toLowerCase() ? out[0].toUpperCase() + out.slice(1) : out;
  };
  var LEX = null,
    PAIRS = new Map(),
    EXT = new Set(),
    USER = new Map();
  var dist = function dist(a, b) {
    var d = Math.abs(a.length - b.length);
    for (var i = 0; i < Math.min(a.length, b.length); i++) if (a[i] !== b[i]) d++;
    return d;
  };
  function canon(lw) {
    var d = decompose(lw);
    if (!d || d.n !== 1) return lw;
    var p = parts(d.b);
    return p ? applyTone(d.b, tonePos(p)[0], d.t) : lw;
  }
  function setLex(l) {
    LEX = l;
    PAIRS = new Map();
    EXT = new Set(l.ext || []);
    var _iterator2 = _createForOfIteratorHelper(l.dom || []),
      _step2;
    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var w = _step2.value;
        var s = w.split(' ');
        for (var i = 0; i < s.length - 1; i++) {
          var k = s[i] + ' ' + s[i + 1];
          PAIRS.set(k, (PAIRS.get(k) || 0) + 8);
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
    var _iterator3 = _createForOfIteratorHelper(l.cmp),
      _step3;
    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
        var _w = _step3.value;
        var _s = _w.split(' ');
        for (var _i = 0; _i < _s.length - 1; _i++) {
          var _k = _s[_i] + ' ' + _s[_i + 1];
          PAIRS.set(_k, (PAIRS.get(_k) || 0) + 1);
        }
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }
  }
  function soleNuc(w) {
    var d = decompose(w);
    if (!d || d.n > 1) return null;
    var p = parts(d.b);
    return p && !p.co && !p.gc && p.on !== 'qu' && p.on !== 'gi' && (p.nu === 'i' || p.nu === 'y') ? {
      d: d,
      p: p
    } : null;
  }
  function alt(w) {
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
  var CID = new Map(),
    CPAIR = new Map(),
    CUNI = new Map();
  var cpair = function cpair(k) {
    var i = k.indexOf(' ');
    var a = CID.get(k.slice(0, i)),
      b = CID.get(k.slice(i + 1));
    return a === undefined || b === undefined ? 0 : CPAIR.get(a * 8281 + b) || 0;
  };
  var pr = function pr(k) {
    return (PAIRS.get(k) || 0) + (USER.get(k) || 0) + cpair(k);
  };
  var FOREIGN = new Set();
  function setCorpus(c) {
    CID = new Map();
    CPAIR = new Map();
    CUNI = new Map();
    FOREIGN = new Set((c.foreign || '').split(' '));
    var names = c.syl.split(' '),
      U = c.uni;
    names.forEach(function (n, i) {
      CID.set(n, i);
      CUNI.set(n, U.charCodeAt(i) - 35);
    });
    var P = c.pairs;
    for (var i = 0; i + 4 < P.length + 0; i += 5) {
      var a = P.charCodeAt(i) - 35,
        _b = P.charCodeAt(i + 1) - 35,
        x = P.charCodeAt(i + 2) - 35,
        y = P.charCodeAt(i + 3) - 35;
      CPAIR.set((a * 91 + _b) * 8281 + (x * 91 + y), P.charCodeAt(i + 4) - 35);
    }
  }
  var pc = function pc(a, b) {
    return Math.max(pr(a + ' ' + b), pr(alt(a) + ' ' + b), pr(a + ' ' + alt(b)), pr(alt(a) + ' ' + alt(b)));
  };
  function setUser(lines) {
    for (var _i2 = 0, _arr = _toConsumableArray(USER); _i2 < _arr.length; _i2++) {
      var _arr$_i = _slicedToArray(_arr[_i2], 2),
        k = _arr$_i[0],
        v = _arr$_i[1];
      if (v === 8) USER.delete(k);
    }
    var _iterator4 = _createForOfIteratorHelper(lines),
      _step4;
    try {
      for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
        var ln = _step4.value;
        var s = (ln.normalize('NFC').toLowerCase().match(LETRE) || []).map(canon);
        for (var i = 0; i < s.length - 1; i++) USER.set(s[i] + ' ' + s[i + 1], 8);
      }
    } catch (err) {
      _iterator4.e(err);
    } finally {
      _iterator4.f();
    }
  }
  var USERF = new Map();
  var freq = function freq(w) {
    return (LEX ? LEX.syl[w] || LEX.syl[alt(w)] || 0 : 0) + (USERF.get(w) || 0) + (CUNI.get(w) || CUNI.get(alt(w)) || 0);
  };
  function cands(b) {
    var c1 = new Set([b]);
    var SW = [['c', 't'], ['t', 'c'], ['n', 'ng'], ['ng', 'n'], ['ch', 'nh'], ['nh', 'ch'], ['n', 'nh'], ['nh', 'n'], ['c', 'ch'], ['ch', 'c'], ['t', 'ch'], ['ng', 'nh'], ['nh', 'ng']];
    var PT = [['uo', 'ươ'], ['uo', 'uô'], ['ie', 'iê'], ['ye', 'yê'], ['uoi', 'ươi'], ['uou', 'ươu']];
    for (var k = 0; k < 2; k++) for (var _i3 = 0, _arr2 = _toConsumableArray(c1); _i3 < _arr2.length; _i3++) {
      var s = _arr2[_i3];
      for (var i = 0; i < s.length; i++) if (FAM[s[i]]) {
        var _iterator5 = _createForOfIteratorHelper(FAM[s[i]]),
          _step5;
        try {
          for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
            var c = _step5.value;
            c1.add(s.slice(0, i) + c + s.slice(i + 1));
          }
        } catch (err) {
          _iterator5.e(err);
        } finally {
          _iterator5.f();
        }
      }
      var _iterator6 = _createForOfIteratorHelper(SW),
        _step6;
      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var _step6$value = _slicedToArray(_step6.value, 2),
            x = _step6$value[0],
            y = _step6$value[1];
          if (s.endsWith(x)) c1.add(s.slice(0, -x.length) + y);
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
      var _iterator7 = _createForOfIteratorHelper(PT),
        _step7;
      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var _step7$value = _slicedToArray(_step7.value, 2),
            _x = _step7$value[0],
            _y = _step7$value[1];
          if (s.includes(_x)) c1.add(s.replace(_x, _y));
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
    }
    return c1;
  }
  function rank(b, t0, src, prev, next, lim) {
    var own = canon(src.normalize('NFC').toLowerCase()),
      res = new Map();
    var _iterator8 = _createForOfIteratorHelper(cands(b)),
      _step8;
    try {
      for (_iterator8.s(); !(_step8 = _iterator8.n()).done;) {
        var c = _step8.value;
        var p = parts(c);
        if (!p) continue;
        for (var t = 0; t < 6; t++) {
          if (!okStruct(p, t)) continue;
          var w = t ? applyTone(c, tonePos(p)[0], t) : c;
          w = styleAs(w, own);
          if (eqA(w, own)) continue;
          var f = LEX ? freq(w) : 1;
          if (!f) continue;
          var sc = Math.log2(f + 1) - 1.3 * dist(b, c) - (t === t0 ? 0 : 0.7),
            ctx = false;
          if (LEX) {
            var sp = prev ? pc(prev, w) : 0,
              sn = next ? pc(w, next) : 0;
            sc += 1.2 * (sp + sn);
            ctx = sp + sn > 0;
          }
          if (!res.has(w) || res.get(w).sc < sc) res.set(w, {
            w: w,
            sc: sc,
            ctx: ctx,
            f: f
          });
        }
      }
    } catch (err) {
      _iterator8.e(err);
    } finally {
      _iterator8.f();
    }
    return _toConsumableArray(res.values()).sort(function (x, y) {
      return y.sc - x.sc;
    }).slice(0, lim || 8).map(function (x) {
      return _objectSpread(_objectSpread({}, x), {}, {
        w: restore(src, x.w)
      });
    });
  }
  var ONS = [['s', 'x'], ['x', 's'], ['ch', 'tr'], ['tr', 'ch'], ['d', 'gi'], ['gi', 'd'], ['d', 'r'], ['r', 'd'], ['gi', 'r'], ['r', 'gi'], ['l', 'n'], ['n', 'l']];
  var ONS2 = [['th', 'r'], ['r', 'th'], ['th', 't'], ['t', 'th'], ['kh', 'k'], ['k', 'kh'], ['n', 'nh'], ['nh', 'n'], ['ng', 'n'], ['n', 'ng'], ['b', 'v'], ['v', 'b'], ['d', 'đ'], ['đ', 'd'], ['g', 'gh'], ['c', 'k'], ['k', 'c'], ['ph', 'p'], ['qu', 'c'], ['c', 'qu']];
  var CODA2 = [['c', 't'], ['t', 'c'], ['n', 'ng'], ['ng', 'n'], ['ch', 'nh'], ['nh', 'ch'], ['n', 'nh'], ['nh', 'n'], ['c', 'ch'], ['ch', 'c'], ['t', 'ch'], ['m', 'n'], ['n', 'm'], ['p', 'm'], ['m', 'p'], ['i', 'y'], ['u', 'o'], ['o', 'u']];
  var VC = new Map();
  function variants(b, wide) {
    var key = b + (wide ? '+' : '');
    var hit = VC.get(key);
    if (hit) return hit;
    var res = variants0(b, wide);
    VC.set(key, res);
    return res;
  }
  function variants0(b, wide) {
    var base = new Set([b]);
    if (wide) {
      for (var _i4 = 0, _arr3 = _toConsumableArray(base); _i4 < _arr3.length; _i4++) {
        var s = _arr3[_i4];
        var _iterator9 = _createForOfIteratorHelper(ONS2),
          _step9;
        try {
          for (_iterator9.s(); !(_step9 = _iterator9.n()).done;) {
            var _step9$value = _slicedToArray(_step9.value, 2),
              x = _step9$value[0],
              y = _step9$value[1];
            if (s.startsWith(x)) base.add(y + s.slice(x.length));
          }
        } catch (err) {
          _iterator9.e(err);
        } finally {
          _iterator9.f();
        }
        var _iterator0 = _createForOfIteratorHelper(CODA2),
          _step0;
        try {
          for (_iterator0.s(); !(_step0 = _iterator0.n()).done;) {
            var _step0$value = _slicedToArray(_step0.value, 2),
              _x2 = _step0$value[0],
              _y2 = _step0$value[1];
            if (s.endsWith(_x2)) base.add(s.slice(0, -_x2.length) + _y2);
          }
        } catch (err) {
          _iterator0.e(err);
        } finally {
          _iterator0.f();
        }
      }
    }
    for (var i = 0; i < b.length; i++) if (FAM[b[i]]) {
      var _iterator1 = _createForOfIteratorHelper(FAM[b[i]]),
        _step1;
      try {
        for (_iterator1.s(); !(_step1 = _iterator1.n()).done;) {
          var c = _step1.value;
          base.add(b.slice(0, i) + c + b.slice(i + 1));
        }
      } catch (err) {
        _iterator1.e(err);
      } finally {
        _iterator1.f();
      }
    }
    for (var _i5 = 0, _arr4 = _toConsumableArray(base); _i5 < _arr4.length; _i5++) {
      var _s2 = _arr4[_i5];
      var _iterator10 = _createForOfIteratorHelper(ONS),
        _step10;
      try {
        for (_iterator10.s(); !(_step10 = _iterator10.n()).done;) {
          var _step10$value = _slicedToArray(_step10.value, 2),
            _x3 = _step10$value[0],
            _y3 = _step10$value[1];
          if (_s2.startsWith(_x3)) base.add(_y3 + _s2.slice(_x3.length));
        }
      } catch (err) {
        _iterator10.e(err);
      } finally {
        _iterator10.f();
      }
    }
    var out = new Set();
    var _iterator11 = _createForOfIteratorHelper(base),
      _step11;
    try {
      for (_iterator11.s(); !(_step11 = _iterator11.n()).done;) {
        var _c = _step11.value;
        var p = parts(_c);
        if (!p) continue;
        for (var t = 0; t < 6; t++) {
          if (!okStruct(p, t)) continue;
          var w = t ? applyTone(_c, tonePos(p)[0], t) : _c;
          if (freq(w)) out.add(w);
        }
      }
    } catch (err) {
      _iterator11.e(err);
    } finally {
      _iterator11.f();
    }
    return _toConsumableArray(out);
  }
  var ABBR = new Set(['tp', 'tt', 'tr', 'vd', 'ts', 'ths', 'gs', 'pgs', 'bs', 'cn', 'ks', 'ctr', 'sđt', 'đc', 'stt', 'ql', 'đt', 'tx', 'nxb', 'st', 'kp', 'tdp', 'vv', 'tb', 'ub', 'hđ', 'qđ', 'nđ', 'tt']);
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
      if (isLow(m[4][0]) && !ABBR.has(g.toLowerCase()) && g !== g.toUpperCase() && !/\d/.test(text.slice(Math.max(0, m.index - 1), m.index))) push(m.index + g.length, m[2] + m[3] + m[4], 'Đầu câu nên viết hoa', m[2] + m[3] + cap(m[4]));
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
      var idx = _toConsumableArray(lw).findIndex(function (c) {
        return MAP[c] && MAP[c][1];
      });
      var ok = tonePos(p);
      if (!ok.includes(idx)) return {
        msg: 'Sai vị trí dấu thanh',
        sug: [restore(tok, applyTone(d.b, ok[0], d.t))]
      };
    }
    return null;
  }
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
    var adj = function adj(a, b) {
      return a && b && /^\s+$/.test(text.slice(a.end, b.s));
    };
    var out = [];
    toks.forEach(function (t, i) {
      var pv = toks[i - 1],
        nx = toks[i + 1],
        w = t.w;
      var prevC = adj(pv, t) ? canon(pv.lw) : null,
        nextC = adj(t, nx) ? canon(nx.lw) : null;
      if (pv && pv.lw === t.lw && t.lw.length > 1 && !REP.has(t.lw) && adj(pv, t) && decompose(t.lw)) out.push({
        w: pv.w + text.slice(pv.end, t.s) + w,
        start: pv.s,
        type: 'dup',
        msg: 'Lặp từ',
        sug: [pv.w]
      });
      if (w.length > 7 || /^[A-Z]{2,4}$/.test(w) || o.ignore && o.ignore.has(t.lw)) return;
      if (o.skipNames && w[0] !== w[0].toLowerCase() && w.slice(1) === w.slice(1).toLowerCase()) {
        var before = text.slice(0, t.s);
        if (before.trim() && !/[.!?:;]\s*$/.test(before)) return;
      }
      if (EXT.has(canon(t.lw)) || FOREIGN.has(t.lw)) {
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
        return t && !t.skip && t.w.length <= 7 && !/^[A-Z]{2,4}$/.test(t.w) && !(o.ignore && o.ignore.has(t.lw)) && !(o.skipNames && t.w[0] !== t.w[0].toLowerCase() && t.w.slice(1) === t.w.slice(1).toLowerCase() && text.slice(0, t.s).trim() && !/[.!?:;]\s*$/.test(text.slice(0, t.s)));
      };
      for (var i = 0; i < toks.length - 1; i++) {
        var A = toks[i],
          B = toks[i + 1];
        if (!adj(A, B) || !okTok(A) || !okTok(B)) continue;
        var da = decompose(A.lw),
          db = decompose(B.lw);
        if (!da || !db || !/[aăâeêioôơuưy]/.test(da.b) || !/[aăâeêioôơuưy]/.test(db.b)) continue;
        var ca = canon(A.lw),
          cb = canon(B.lw),
          c0 = pc(ca, cb);
        if (c0 >= 4) continue;
        var P = toks[i - 1],
          N = toks[i + 2];
        if (P && adj(P, A) && pc(canon(P.lw), ca) >= 2 || N && adj(B, N) && pc(cb, canon(N.lw)) >= 2) continue;
        var best = null;
        var _iterator12 = _createForOfIteratorHelper(variants(da.b)),
          _step12;
        try {
          for (_iterator12.s(); !(_step12 = _iterator12.n()).done;) {
            var a = _step12.value;
            var _iterator13 = _createForOfIteratorHelper(variants(db.b)),
              _step13;
            try {
              for (_iterator13.s(); !(_step13 = _iterator13.n()).done;) {
                var _b2 = _step13.value;
                var ea = eqA(a, ca),
                  eb = eqA(_b2, cb);
                if (ea && eb) continue;
                var c = pc(a, _b2),
                  ch = !ea + !eb;
                if (c >= 3 && c >= 4 * (c0 + 1) && (!best || c - ch * 0.5 > best.sc)) best = {
                  a: ea ? ca : a,
                  b: eb ? cb : _b2,
                  sc: c - ch * 0.5,
                  ch: ch
                };
              }
            } catch (err) {
              _iterator13.e(err);
            } finally {
              _iterator13.f();
            }
          }
        } catch (err) {
          _iterator12.e(err);
        } finally {
          _iterator12.f();
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
        return t && !t.skip && t.w.length <= 7 && !/^[A-Z]{2,4}$/.test(t.w) && !(o.ignore && o.ignore.has(t.lw)) && !(o.skipNames && t.w[0] !== t.w[0].toLowerCase() && t.w.slice(1) === t.w.slice(1).toLowerCase() && text.slice(0, t.s).trim() && !/[.!?:;]\s*$/.test(text.slice(0, t.s)));
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
        var best = null;
        var narrow = new Set(variants(d.b, false));
        var _iterator14 = _createForOfIteratorHelper(variants(d.b, true)),
          _step14;
        try {
          for (_iterator14.s(); !(_step14 = _iterator14.n()).done;) {
            var v = _step14.value;
            if (eqA(v, ct)) continue;
            var Sv = sup(v);
            if (!Sv) continue;
            if (!narrow.has(v) && Sv < 3) continue;
            var sc = Sv * 2 + Math.log2(freq(v) + 1) * 0.3 - dist(v, ct) * 0.4;
            if (!best || sc > best.sc) best = {
              v: v,
              Sv: Sv,
              sc: sc
            };
          }
        } catch (err) {
          _iterator14.e(err);
        } finally {
          _iterator14.f();
        }
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
    if (o.grammar !== false) out.push.apply(out, _toConsumableArray(grammar(text)));
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
      USERF.set(t.c, (USERF.get(t.c) || 0) + 1);
      var n = ts[i + 1];
      if (n && n.ok && /^\s+$/.test(text.slice(t.end, n.s))) {
        var k = t.c + ' ' + n.c;
        USER.set(k, Math.min((USER.get(k) || 0) + 4, 40));
      }
    });
    return ts.length;
  }
  function resetLearn() {
    USERF.clear();
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
