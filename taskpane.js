function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i.return) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
var issues = [],
  cur = -1;
var $ = function $(id) {
  return document.getElementById(id);
};
var esc = function esc(s) {
  return s.replace(/[&<>"]/g, function (c) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;'
    }[c];
  });
};
var norm = function norm(s) {
  return s.normalize('NFC').toLowerCase();
};
var getDict = function getDict() {
  try {
    return localStorage.getItem('dict') || '';
  } catch (e) {
    return '';
  }
};
var setDict = function setDict(t) {
  try {
    localStorage.setItem('dict', t);
  } catch (e) {}
};
var dictSet = function dictSet() {
  return new Set(Speller.tokens($('dict').value));
};
var btn = function btn(t, f, c) {
  var b = document.createElement('button');
  b.textContent = t;
  if (c) b.className = c;
  b.onclick = function (e) {
    e.stopPropagation();
    f();
  };
  return b;
};
var say = function say(t) {
  $('st').textContent = t;
};
var searchOpts = function searchOpts(f) {
  return {
    matchCase: true,
    matchWholeWord: f.type !== 'gram'
  };
};
function occ(text, w, start, whole) {
  var k = 0,
    i = -1;
  while ((i = text.indexOf(w, i + 1)) >= 0 && i < start) {
    if (!whole || !Speller.isLetter(text[i - 1]) && !Speller.isLetter(text[i + w.length])) k++;
  }
  return k;
}
Office.onReady(function () {
  if (window.VNLEX) Speller.setLex(window.VNLEX);
  $('dict').value = getDict();
  $('dict').onchange = function () {
    return setDict($('dict').value);
  };
  $('scan').onclick = run;
  $('next').onclick = function () {
    return step(cur + 1);
  };
  $('mark').onclick = function () {
    return mark(true);
  };
  $('unmark').onclick = function () {
    return mark(false);
  };
  run();
});
function locate(_x, _x2) {
  return _locate.apply(this, arguments);
}
function _locate() {
  _locate = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(ctx, it) {
    var ps, p, r;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          ps = ctx.document.body.paragraphs;
          ps.load('items');
          _context.n = 1;
          return ctx.sync();
        case 1:
          p = ps.items[it.pi];
          if (p) {
            _context.n = 2;
            break;
          }
          return _context.a(2, null);
        case 2:
          if (!it.f.para) {
            _context.n = 3;
            break;
          }
          return _context.a(2, p);
        case 3:
          r = p.search(it.f.w, searchOpts(it.f));
          r.load('items');
          _context.n = 4;
          return ctx.sync();
        case 4:
          return _context.a(2, r.items.length ? r.items[Math.min(it.k, r.items.length - 1)] : null);
      }
    }, _callee);
  }));
  return _locate.apply(this, arguments);
}
function step(_x3) {
  return _step.apply(this, arguments);
}
function _step() {
  _step = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(i) {
    var kids, it, _t;
    return _regenerator().w(function (_context3) {
      while (1) switch (_context3.p = _context3.n) {
        case 0:
          if (issues.length) {
            _context3.n = 1;
            break;
          }
          return _context3.a(2);
        case 1:
          cur = (i + issues.length) % issues.length;
          kids = $('list').children;
          Array.prototype.forEach.call(kids, function (k, n) {
            return k.classList.toggle('cur', n === cur);
          });
          if (kids[cur]) kids[cur].scrollIntoView(false);
          it = issues[cur];
          _context3.p = 2;
          _context3.n = 3;
          return Word.run(/*#__PURE__*/function () {
            var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(ctx) {
              var rg;
              return _regenerator().w(function (_context2) {
                while (1) switch (_context2.n) {
                  case 0:
                    _context2.n = 1;
                    return locate(ctx, it);
                  case 1:
                    rg = _context2.v;
                    if (!rg) {
                      _context2.n = 3;
                      break;
                    }
                    rg.select();
                    _context2.n = 2;
                    return ctx.sync();
                  case 2:
                    _context2.n = 4;
                    break;
                  case 3:
                    say('Không tìm thấy vị trí, hãy bấm "Kiểm tra lại".');
                  case 4:
                    return _context2.a(2);
                }
              }, _callee2);
            }));
            return function (_x7) {
              return _ref.apply(this, arguments);
            };
          }());
        case 3:
          _context3.n = 5;
          break;
        case 4:
          _context3.p = 4;
          _t = _context3.v;
        case 5:
          return _context3.a(2);
      }
    }, _callee3, null, [[2, 4]]);
  }));
  return _step.apply(this, arguments);
}
function mark(_x4) {
  return _mark.apply(this, arguments);
}
function _mark() {
  _mark = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5(on) {
    var _t2;
    return _regenerator().w(function (_context5) {
      while (1) switch (_context5.p = _context5.n) {
        case 0:
          if (issues.length) {
            _context5.n = 1;
            break;
          }
          return _context5.a(2);
        case 1:
          _context5.p = 1;
          _context5.n = 2;
          return Word.run(/*#__PURE__*/function () {
            var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(ctx) {
              var ps, jobs;
              return _regenerator().w(function (_context4) {
                while (1) switch (_context4.n) {
                  case 0:
                    ps = ctx.document.body.paragraphs;
                    ps.load('items');
                    _context4.n = 1;
                    return ctx.sync();
                  case 1:
                    jobs = [];
                    issues.forEach(function (it) {
                      if (it.f.para || !ps.items[it.pi]) return;
                      var r = ps.items[it.pi].search(it.f.w, searchOpts(it.f));
                      r.load('items');
                      jobs.push({
                        r: r,
                        it: it
                      });
                    });
                    _context4.n = 2;
                    return ctx.sync();
                  case 2:
                    jobs.forEach(function (j) {
                      var rg = j.r.items[Math.min(j.it.k, j.r.items.length - 1)];
                      if (rg) rg.font.highlightColor = on ? j.it.f.type === 'typo' || j.it.f.type === 'unk' ? 'Yellow' : 'Turquoise' : null;
                    });
                    _context4.n = 3;
                    return ctx.sync();
                  case 3:
                    return _context4.a(2);
                }
              }, _callee4);
            }));
            return function (_x8) {
              return _ref2.apply(this, arguments);
            };
          }());
        case 2:
          _context5.n = 4;
          break;
        case 3:
          _context5.p = 3;
          _t2 = _context5.v;
          say('Lỗi: ' + _t2.message);
        case 4:
          return _context5.a(2);
      }
    }, _callee5, null, [[1, 3]]);
  }));
  return _mark.apply(this, arguments);
}
function run() {
  return _run.apply(this, arguments);
}
function _run() {
  _run = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7() {
    var _t3;
    return _regenerator().w(function (_context7) {
      while (1) switch (_context7.p = _context7.n) {
        case 0:
          say('Đang quét...');
          $('list').innerHTML = '';
          issues = [];
          setDict($('dict').value);
          Speller.setUser($('dict').value.split(/\r?\n/));
          _context7.p = 1;
          _context7.n = 2;
          return Word.run(/*#__PURE__*/function () {
            var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(ctx) {
              var ps, o, per, cnt;
              return _regenerator().w(function (_context6) {
                while (1) switch (_context6.n) {
                  case 0:
                    ps = ctx.document.body.paragraphs;
                    ps.load('items/text');
                    _context6.n = 1;
                    return ctx.sync();
                  case 1:
                    o = {
                      ignore: dictSet(),
                      skipNames: $('names').checked,
                      grammar: $('gram').checked
                    };
                    per = ps.items.map(function (p, i) {
                      return {
                        i: i,
                        text: p.text,
                        found: Speller.scan(p.text, o).sort(function (a, b) {
                          return a.start - b.start;
                        })
                      };
                    });
                    if ($('rep').checked) {
                      cnt = {};
                      per.forEach(function (x) {
                        return x.found.forEach(function (f) {
                          if (f.type === 'unk') cnt[norm(f.w)] = (cnt[norm(f.w)] || 0) + 1;
                        });
                      });
                      per.forEach(function (x) {
                        x.found = x.found.filter(function (f) {
                          return !(f.type === 'unk' && cnt[norm(f.w)] >= 3);
                        });
                      });
                    }
                    per.forEach(function (x) {
                      return x.found.forEach(function (f) {
                        if (issues.length < 500) issues.push({
                          pi: x.i,
                          f: f,
                          k: f.para ? 0 : occ(x.text, f.w, f.start, f.type !== 'gram')
                        });
                      });
                    });
                  case 2:
                    return _context6.a(2);
                }
              }, _callee6);
            }));
            return function (_x9) {
              return _ref3.apply(this, arguments);
            };
          }());
        case 2:
          _context7.n = 4;
          break;
        case 3:
          _context7.p = 3;
          _t3 = _context7.v;
          say('Lỗi: ' + _t3.message);
          return _context7.a(2);
        case 4:
          render();
          step(0);
        case 5:
          return _context7.a(2);
      }
    }, _callee7, null, [[1, 3]]);
  }));
  return _run.apply(this, arguments);
}
function render() {
  var L = $('list');
  L.innerHTML = '';
  say(issues.length ? 'Có ' + issues.length + ' mục cần xem (bấm vào mục để tới vị trí)' : 'Không phát hiện lỗi.');
  issues.forEach(function (it) {
    var d = document.createElement('div');
    d.className = 'it ' + it.f.type;
    d.innerHTML = '<div class="w">' + esc(it.f.w) + '</div><div class="m">' + esc(it.f.msg) + '</div>';
    it.f.sug.forEach(function (s) {
      return d.appendChild(btn(s, function () {
        return fix(it, s);
      }, 'pri'));
    });
    d.appendChild(btn('Bỏ qua', function () {
      return drop(it);
    }));
    if (['typo', 'unk', 'ctx'].indexOf(it.f.type) >= 0) d.appendChild(btn('Thêm vào từ điển', function () {
      var k = norm(it.f.w);
      $('dict').value = ($('dict').value.trim() + '\n' + it.f.w).trim();
      setDict($('dict').value);
      issues = issues.filter(function (x) {
        return !(['typo', 'unk', 'ctx'].indexOf(x.f.type) >= 0 && norm(x.f.w) === k);
      });
      render();
      step(cur);
    }));
    d.onclick = function () {
      return step(issues.indexOf(it));
    };
    L.appendChild(d);
  });
}
function drop(it) {
  var i = issues.indexOf(it);
  issues = issues.filter(function (x) {
    return x !== it;
  });
  render();
  step(Math.min(i, issues.length - 1));
}
function fix(_x5, _x6) {
  return _fix.apply(this, arguments);
}
function _fix() {
  _fix = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(it, s) {
    var ok, _t4;
    return _regenerator().w(function (_context9) {
      while (1) switch (_context9.p = _context9.n) {
        case 0:
          ok = false;
          _context9.p = 1;
          _context9.n = 2;
          return Word.run(/*#__PURE__*/function () {
            var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(ctx) {
              var rg;
              return _regenerator().w(function (_context8) {
                while (1) switch (_context8.n) {
                  case 0:
                    _context8.n = 1;
                    return locate(ctx, it);
                  case 1:
                    rg = _context8.v;
                    if (!rg) {
                      _context8.n = 3;
                      break;
                    }
                    rg.insertText(s, 'Replace');
                    _context8.n = 2;
                    return ctx.sync();
                  case 2:
                    ok = true;
                  case 3:
                    return _context8.a(2);
                }
              }, _callee8);
            }));
            return function (_x0) {
              return _ref4.apply(this, arguments);
            };
          }());
        case 2:
          _context9.n = 4;
          break;
        case 3:
          _context9.p = 3;
          _t4 = _context9.v;
          say('Không sửa được: ' + _t4.message);
          return _context9.a(2);
        case 4:
          if (ok) {
            _context9.n = 5;
            break;
          }
          say('Không tìm thấy vị trí, hãy bấm "Kiểm tra lại".');
          return _context9.a(2);
        case 5:
          issues.forEach(function (x) {
            if (x !== it && x.pi === it.pi && x.f.w === it.f.w && x.k > it.k) x.k--;
          });
          drop(it);
        case 6:
          return _context9.a(2);
      }
    }, _callee9, null, [[1, 3]]);
  }));
  return _fix.apply(this, arguments);
}
