function t(t) {
  return Object.keys(t).reduce((e, r) => {
    var s = t[r];
    return (
      (e[r] = Object.assign({}, s)),
      !n(s.value) ||
        (function (t) {
          return '[object Function]' === Object.prototype.toString.call(t);
        })(s.value) ||
        Array.isArray(s.value) ||
        (e[r].value = Object.assign({}, s.value)),
      Array.isArray(s.value) && (e[r].value = s.value.slice(0)),
      e
    );
  }, {});
}
function e(t) {
  if (t)
    try {
      return JSON.parse(t);
    } catch (e) {
      return t;
    }
}
function r(t, e, r) {
  if (null == r || !1 === r) return t.removeAttribute(e);
  let n = JSON.stringify(r);
  (t.__updating[e] = !0),
    'true' === n && (n = ''),
    t.setAttribute(e, n),
    Promise.resolve().then(() => delete t.__updating[e]);
}
function n(t) {
  return null != t && ('object' == typeof t || 'function' == typeof t);
}
let s;
function o(n, o) {
  const i = Object.keys(o);
  return class extends n {
    static get observedAttributes() {
      return i.map((t) => o[t].attribute);
    }
    constructor() {
      super(),
        (this.__initialized = !1),
        (this.__released = !1),
        (this.__releaseCallbacks = []),
        (this.__propertyChangedCallbacks = []),
        (this.__updating = {}),
        (this.props = {});
    }
    connectedCallback() {
      if (!this.__initialized) {
        (this.__releaseCallbacks = []),
          (this.__propertyChangedCallbacks = []),
          (this.__updating = {}),
          (this.props = (function (n, s) {
            const o = t(s);
            return (
              Object.keys(s).forEach((t) => {
                const s = o[t],
                  i = n.getAttribute(s.attribute),
                  a = n[t];
                i && (s.value = s.parse ? e(i) : i),
                  null != a && (s.value = Array.isArray(a) ? a.slice(0) : a),
                  s.reflect && r(n, s.attribute, s.value),
                  Object.defineProperty(n, t, {
                    get: () => s.value,
                    set(e) {
                      var n = s.value;
                      (s.value = e), s.reflect && r(this, s.attribute, s.value);
                      for (
                        let r = 0, s = this.__propertyChangedCallbacks.length;
                        r < s;
                        r++
                      )
                        this.__propertyChangedCallbacks[r](t, e, n);
                    },
                    enumerable: !0,
                    configurable: !0,
                  });
              }),
              o
            );
          })(this, o));
        var n = (function (t) {
            return Object.keys(t).reduce(
              (e, r) => ((e[r] = t[r].value), e),
              {}
            );
          })(this.props),
          i = this.Component,
          a = s;
        try {
          ((s = this).__initialized = !0),
            (function (t) {
              return (
                'function' == typeof t && 0 === t.toString().indexOf('class')
              );
            })(i)
              ? new i(n, { element: this })
              : i(n, { element: this });
        } finally {
          s = a;
        }
      }
    }
    async disconnectedCallback() {
      if ((await Promise.resolve(), !this.isConnected)) {
        this.__propertyChangedCallbacks.length = 0;
        for (var t = null; (t = this.__releaseCallbacks.pop()); ) t(this);
        delete this.__initialized, (this.__released = !0);
      }
    }
    attributeChangedCallback(t, r, n) {
      !this.__initialized ||
        this.__updating[t] ||
        ((t = this.lookupProp(t)) in o &&
          ((null == n && !this[t]) || (this[t] = o[t].parse ? e(n) : n)));
    }
    lookupProp(t) {
      if (o) return i.find((e) => t === e || t === o[e].attribute);
    }
    get renderRoot() {
      return this.shadowRoot || this.attachShadow({ mode: 'open' });
    }
    addReleaseCallback(t) {
      this.__releaseCallbacks.push(t);
    }
    addPropertyChangedCallback(t) {
      this.__propertyChangedCallbacks.push(t);
    }
  };
}
function i(t, e = {}, r = {}) {
  const { BaseElement: s = HTMLElement, extension: i } = r;
  return (r) => {
    if (!t) throw new Error('tag is required to register a Component');
    let a = customElements.get(t);
    return (
      a
        ? (a.prototype.Component = r)
        : (((a = o(
            s,
            (function (t) {
              return t
                ? Object.keys(t).reduce((e, r) => {
                    var s = t[r];
                    return (
                      (e[r] = n(s) && 'value' in s ? s : { value: s }),
                      e[r].attribute ||
                        (e[r].attribute = (function (t) {
                          return t
                            .replace(
                              /\.?([A-Z]+)/g,
                              (t, e) => '-' + e.toLowerCase()
                            )
                            .replace('_', '-')
                            .replace(/^-/, '');
                        })(r)),
                      (e[r].parse =
                        'parse' in e[r]
                          ? e[r].parse
                          : 'string' != typeof e[r].value),
                      e
                    );
                  }, {})
                : {};
            })(e)
          )).prototype.Component = r),
          (a.prototype.registeredTag = t),
          customElements.define(t, a, i)),
      a
    );
  };
}
const a = Symbol('solid-proxy'),
  l = Symbol('solid-track'),
  c = { equals: (t, e) => t === e };
let h = L;
const u = 1,
  p = 2,
  d = { owned: null, cleanups: null, context: null, owner: null };
var f = null;
let g = null,
  b = null,
  m = null,
  y = null,
  w = 0;
function v(t, e) {
  const r = b,
    n = f,
    s = 0 === t.length,
    o = s
      ? d
      : {
          owned: null,
          cleanups: null,
          context: null,
          owner: void 0 === e ? n : e,
        },
    i = s ? t : () => t(() => O(() => z(o)));
  (f = o), (b = null);
  try {
    return B(i, !0);
  } finally {
    (b = r), (f = n);
  }
}
function x(t, e) {
  const r = {
    value: t,
    observers: null,
    observerSlots: null,
    comparator: (e = e ? Object.assign({}, c, e) : c).equals || void 0,
  };
  return [
    E.bind(r),
    (t) => ('function' == typeof t && (t = t(r.value)), T(r, t)),
  ];
}
function k(t, e, r) {
  P(R(t, e, !1, u));
}
function _(t, e, r) {
  (h = j), ((t = R(t, e, !1, u)).user = !0), y ? y.push(t) : P(t);
}
function C(t, e, r) {
  return (
    (r = r ? Object.assign({}, c, r) : c),
    ((t = R(t, e, !0, 0)).observers = null),
    (t.observerSlots = null),
    (t.comparator = r.equals || void 0),
    P(t),
    E.bind(t)
  );
}
function O(t) {
  if (null === b) return t();
  var e = b;
  b = null;
  try {
    return t();
  } finally {
    b = e;
  }
}
function S(t) {
  _(() => O(t));
}
function A(t) {
  return (
    null !== f &&
      (null === f.cleanups ? (f.cleanups = [t]) : f.cleanups.push(t)),
    t
  );
}
function E() {
  var t;
  return (
    this.sources &&
      this.state &&
      (this.state === u
        ? P(this)
        : ((t = m), (m = null), B(() => N(this), !1), (m = t))),
    b &&
      ((t = this.observers ? this.observers.length : 0),
      b.sources
        ? (b.sources.push(this), b.sourceSlots.push(t))
        : ((b.sources = [this]), (b.sourceSlots = [t])),
      this.observers
        ? (this.observers.push(b),
          this.observerSlots.push(b.sources.length - 1))
        : ((this.observers = [b]),
          (this.observerSlots = [b.sources.length - 1]))),
    this.value
  );
}
function T(t, e, r) {
  var n = t.value;
  return (
    (t.comparator && t.comparator(n, e)) ||
      ((t.value = e),
      t.observers &&
        t.observers.length &&
        B(() => {
          for (let n = 0; n < t.observers.length; n += 1) {
            var e = t.observers[n],
              r = g && g.running;
            r && g.disposed.has(e),
              (r ? e.tState : e.state) ||
                ((e.pure ? m : y).push(e), e.observers && M(e)),
              r || (e.state = u);
          }
          if (1e6 < m.length) throw ((m = []), new Error());
        }, !1)),
    e
  );
}
function P(t) {
  var e, r, n;
  t.fn &&
    (z(t),
    (e = f),
    (r = b),
    (n = w),
    (function (t, e, r) {
      let n;
      try {
        n = t.fn(e);
      } catch (e) {
        return (
          t.pure &&
            ((t.state = u), t.owned && t.owned.forEach(z), (t.owned = null)),
          (t.updatedAt = r + 1),
          I(e)
        );
      }
      (!t.updatedAt || t.updatedAt <= r) &&
        (null != t.updatedAt && 'observers' in t ? T(t, n) : (t.value = n),
        (t.updatedAt = r));
    })((b = f = t), t.value, n),
    (b = r),
    (f = e));
}
function R(t, e, r, n = u, s) {
  return (
    (t = {
      fn: t,
      state: n,
      updatedAt: null,
      owned: null,
      sources: null,
      sourceSlots: null,
      cleanups: null,
      value: e,
      owner: f,
      context: null,
      pure: r,
    }),
    null !== f && f !== d && (f.owned ? f.owned.push(t) : (f.owned = [t])),
    t
  );
}
function $(t) {
  if (0 !== t.state) {
    if (t.state === p) return N(t);
    if (t.suspense && O(t.suspense.inFallback))
      return t.suspense.effects.push(t);
    const r = [t];
    for (; (t = t.owner) && (!t.updatedAt || t.updatedAt < w); )
      t.state && r.push(t);
    for (let n = r.length - 1; 0 <= n; n--) {
      var e;
      (t = r[n]).state === u
        ? P(t)
        : t.state === p &&
          ((e = m), (m = null), B(() => N(t, r[0]), !1), (m = e));
    }
  }
}
function B(t, e) {
  if (m) return t();
  let r = !1;
  e || (m = []), y ? (r = !0) : (y = []), w++;
  try {
    var n = t();
    return (
      (function (t) {
        if ((m && (L(m), (m = null)), !t)) {
          const t = y;
          (y = null), t.length && B(() => h(t), !1);
        }
      })(r),
      n
    );
  } catch (t) {
    r || (y = null), (m = null), I(t);
  }
}
function L(t) {
  for (let e = 0; e < t.length; e++) $(t[e]);
}
function j(t) {
  let e,
    r = 0;
  for (e = 0; e < t.length; e++) {
    var n = t[e];
    n.user ? (t[r++] = n) : $(n);
  }
  for (e = 0; e < r; e++) $(t[e]);
}
function N(t, e) {
  for (let s = (t.state = 0); s < t.sources.length; s += 1) {
    var r,
      n = t.sources[s];
    n.sources &&
      ((r = n.state) === u
        ? n !== e && (!n.updatedAt || n.updatedAt < w) && $(n)
        : r === p && N(n, e));
  }
}
function M(t) {
  for (let r = 0; r < t.observers.length; r += 1) {
    var e = t.observers[r];
    e.state || ((e.state = p), (e.pure ? m : y).push(e), e.observers && M(e));
  }
}
function z(t) {
  let e;
  if (t.sources)
    for (; t.sources.length; ) {
      var r,
        n,
        s = t.sources.pop(),
        o = t.sourceSlots.pop(),
        i = s.observers;
      i &&
        i.length &&
        ((r = i.pop()), (n = s.observerSlots.pop()), o < i.length) &&
        ((i[(r.sourceSlots[n] = o)] = r), (s.observerSlots[o] = n));
    }
  if (t.owned) {
    for (e = t.owned.length - 1; 0 <= e; e--) z(t.owned[e]);
    t.owned = null;
  }
  if (t.cleanups) {
    for (e = t.cleanups.length - 1; 0 <= e; e--) t.cleanups[e]();
    t.cleanups = null;
  }
  (t.state = 0), (t.context = null);
}
function I(t) {
  throw t;
}
const q = Symbol('fallback');
function D(t) {
  for (let e = 0; e < t.length; e++) t[e]();
}
function W(t, e) {
  return O(() => t(e || {}));
}
function H() {
  return !0;
}
const F = {
  get: (t, e, r) => (e === a ? r : t.get(e)),
  has: (t, e) => e === a || t.has(e),
  set: H,
  deleteProperty: H,
  getOwnPropertyDescriptor: (t, e) => ({
    configurable: !0,
    enumerable: !0,
    get: () => t.get(e),
    set: H,
    deleteProperty: H,
  }),
  ownKeys: (t) => t.keys(),
};
function U(t) {
  return (t = 'function' == typeof t ? t() : t) || {};
}
function G(...t) {
  let e = !1;
  for (let n = 0; n < t.length; n++) {
    var r = t[n];
    (e = e || (!!r && a in r)),
      (t[n] = 'function' == typeof r ? ((e = !0), C(r)) : r);
  }
  if (e)
    return new Proxy(
      {
        get(e) {
          for (let n = t.length - 1; 0 <= n; n--) {
            var r = U(t[n])[e];
            if (void 0 !== r) return r;
          }
        },
        has(e) {
          for (let r = t.length - 1; 0 <= r; r--) if (e in U(t[r])) return !0;
          return !1;
        },
        keys() {
          var e = [];
          for (let r = 0; r < t.length; r++) e.push(...Object.keys(U(t[r])));
          return [...new Set(e)];
        },
      },
      F
    );
  var n = {};
  for (let e = t.length - 1; 0 <= e; e--)
    if (t[e])
      for (const r in Object.getOwnPropertyDescriptors(t[e]))
        r in n ||
          Object.defineProperty(n, r, {
            enumerable: !0,
            get() {
              for (let n = t.length - 1; 0 <= n; n--) {
                var e = (t[n] || {})[r];
                if (void 0 !== e) return e;
              }
            },
          });
  return n;
}
function V(t, ...e) {
  const r = new Set(e.flat());
  var n;
  if (a in t)
    return (
      (n = e.map(
        (e) =>
          new Proxy(
            {
              get: (r) => (e.includes(r) ? t[r] : void 0),
              has: (r) => e.includes(r) && r in t,
              keys: () => e.filter((e) => e in t),
            },
            F
          )
      )).push(
        new Proxy(
          {
            get: (e) => (r.has(e) ? void 0 : t[e]),
            has: (e) => !r.has(e) && e in t,
            keys: () => Object.keys(t).filter((t) => !r.has(t)),
          },
          F
        )
      ),
      n
    );
  const s = Object.getOwnPropertyDescriptors(t);
  return (
    e.push(Object.keys(s).filter((t) => !r.has(t))),
    e.map((e) => {
      var r = {};
      for (let n = 0; n < e.length; n++) {
        const o = e[n];
        o in t &&
          Object.defineProperty(
            r,
            o,
            s[o] || { get: () => t[o], set: () => !0, enumerable: !0 }
          );
      }
      return r;
    })
  );
}
function Y(t) {
  var e = 'fallback' in t && { fallback: () => t.fallback };
  return C(
    (function (t, e, r = {}) {
      let n = [],
        s = [],
        o = [],
        i = 0,
        a = 1 < e.length ? [] : null;
      return (
        A(() => D(o)),
        () => {
          let c,
            h,
            u = t() || [];
          return (
            u[l],
            O(() => {
              let t,
                e,
                l,
                d,
                f,
                g,
                b,
                m,
                y,
                w = u.length;
              if (0 === w)
                0 !== i &&
                  (D(o), (o = []), (n = []), (s = []), (i = 0), (a = a && [])),
                  r.fallback &&
                    ((n = [q]),
                    (s[0] = v((t) => ((o[0] = t), r.fallback()))),
                    (i = 1));
              else if (0 === i) {
                for (s = new Array(w), h = 0; h < w; h++)
                  (n[h] = u[h]), (s[h] = v(p));
                i = w;
              } else {
                for (
                  l = new Array(w),
                    d = new Array(w),
                    a && (f = new Array(w)),
                    g = 0,
                    b = Math.min(i, w);
                  g < b && n[g] === u[g];
                  g++
                );
                for (
                  b = i - 1, m = w - 1;
                  b >= g && m >= g && n[b] === u[m];
                  b--, m--
                )
                  (l[m] = s[b]), (d[m] = o[b]), a && (f[m] = a[b]);
                for (t = new Map(), e = new Array(m + 1), h = m; h >= g; h--)
                  (y = u[h]),
                    (c = t.get(y)),
                    (e[h] = void 0 === c ? -1 : c),
                    t.set(y, h);
                for (c = g; c <= b; c++)
                  (y = n[c]),
                    void 0 !== (h = t.get(y)) && -1 !== h
                      ? ((l[h] = s[c]),
                        (d[h] = o[c]),
                        a && (f[h] = a[c]),
                        (h = e[h]),
                        t.set(y, h))
                      : o[c]();
                for (h = g; h < w; h++)
                  h in l
                    ? ((s[h] = l[h]),
                      (o[h] = d[h]),
                      a && ((a[h] = f[h]), a[h](h)))
                    : (s[h] = v(p));
                (s = s.slice(0, (i = w))), (n = u.slice(0));
              }
              return s;
            })
          );
          function p(t) {
            var r;
            return (
              (o[h] = t),
              a ? (([t, r] = x(h)), (a[h] = r), e(u[h], t)) : e(u[h])
            );
          }
        }
      );
    })(() => t.each, t.children, e || void 0)
  );
}
function X(t) {
  const e = t.keyed,
    r = C(() => t.when, void 0, { equals: (t, r) => (e ? t === r : !t == !r) });
  return C(
    () => {
      const n = r();
      if (n) {
        const s = t.children;
        return 'function' == typeof s && 0 < s.length
          ? O(() =>
              s(
                e
                  ? n
                  : () => {
                      if (O(r)) return t.when;
                      throw ((t) => `Stale read from <${t}>.`)('Show');
                    }
              )
            )
          : s;
      }
      return t.fallback;
    },
    void 0,
    void 0
  );
}
const J = new Set([
    'className',
    'value',
    'readOnly',
    'formNoValidate',
    'isMap',
    'noModule',
    'playsInline',
    'allowfullscreen',
    'async',
    'autofocus',
    'autoplay',
    'checked',
    'controls',
    'default',
    'disabled',
    'formnovalidate',
    'hidden',
    'indeterminate',
    'ismap',
    'loop',
    'multiple',
    'muted',
    'nomodule',
    'novalidate',
    'open',
    'playsinline',
    'readonly',
    'required',
    'reversed',
    'seamless',
    'selected',
  ]),
  K = new Set(['innerHTML', 'textContent', 'innerText', 'children']),
  Q = Object.assign(Object.create(null), {
    className: 'class',
    htmlFor: 'for',
  }),
  Z = Object.assign(Object.create(null), {
    class: 'className',
    formnovalidate: { $: 'formNoValidate', BUTTON: 1, INPUT: 1 },
    ismap: { $: 'isMap', IMG: 1 },
    nomodule: { $: 'noModule', SCRIPT: 1 },
    playsinline: { $: 'playsInline', VIDEO: 1 },
    readonly: { $: 'readOnly', INPUT: 1, TEXTAREA: 1 },
  });
const tt = new Set([
    'beforeinput',
    'click',
    'dblclick',
    'contextmenu',
    'focusin',
    'focusout',
    'input',
    'keydown',
    'keyup',
    'mousedown',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'pointerdown',
    'pointermove',
    'pointerout',
    'pointerover',
    'pointerup',
    'touchend',
    'touchmove',
    'touchstart',
  ]),
  et = {
    xlink: 'http://www.w3.org/1999/xlink',
    xml: 'http://www.w3.org/XML/1998/namespace',
  };
const rt = '_$DX_DELEGATE';
function nt(t, e, r) {
  let n;
  const s = () => {
    var e = document.createElement('template');
    return (e.innerHTML = t), (r ? e.content.firstChild : e.content).firstChild;
  };
  return ((e = e
    ? () => (n = n || s()).cloneNode(!0)
    : () => O(() => document.importNode((n = n || s()), !0))).cloneNode = e);
}
function st(t, e = window.document) {
  var r = e[rt] || (e[rt] = new Set());
  for (let s = 0, o = t.length; s < o; s++) {
    var n = t[s];
    r.has(n) || (r.add(n), e.addEventListener(n, pt));
  }
}
function ot(t, e, r) {
  null == r ? t.removeAttribute(e) : t.setAttribute(e, r);
}
function it(t, e) {
  null == e ? t.removeAttribute('class') : (t.className = e);
}
function at(t, e = {}, r, n) {
  const s = {};
  return (
    n || k(() => (s.children = dt(t, e.children, s.children))),
    k(() => e.ref && e.ref(t)),
    k(() =>
      (function (t, e, r, n, s = {}, o = !1) {
        e = e || {};
        for (const n in s)
          n in e || ('children' !== n && (s[n] = ut(t, n, null, s[n], r, o)));
        for (const a in e) {
          var i;
          'children' === a
            ? n || dt(t, e.children)
            : ((i = e[a]), (s[a] = ut(t, a, i, s[a], r, o)));
        }
      })(t, e, r, !0, s, !0)
    ),
    s
  );
}
function lt(t, e, r) {
  return O(() => t(e, r));
}
function ct(t, e, r, n) {
  if ((void 0 !== r && (n = n || []), 'function' != typeof e))
    return dt(t, e, n, r);
  k((n) => dt(t, e(), n, r), n);
}
function ht(t, e, r) {
  var n = e.trim().split(/\s+/);
  for (let e = 0, s = n.length; e < s; e++) t.classList.toggle(n[e], r);
}
function ut(t, e, r, n, s, o) {
  let i, a, l, c, h;
  var u;
  return 'style' === e
    ? (function (t, e, r) {
        if (!e) return r ? ot(t, 'style') : e;
        var n = t.style;
        if ('string' == typeof e) return (n.cssText = e);
        let s, o;
        for (o in ('string' == typeof r && (n.cssText = r = void 0),
        (e = e || {}),
        (r = r || {})))
          null == e[o] && n.removeProperty(o), delete r[o];
        for (o in e) (s = e[o]) !== r[o] && (n.setProperty(o, s), (r[o] = s));
        return r;
      })(t, r, n)
    : 'classList' === e
    ? (function (t, e, r = {}) {
        var n = Object.keys(e || {}),
          s = Object.keys(r);
        let o, i;
        for (o = 0, i = s.length; o < i; o++) {
          var a = s[o];
          a && 'undefined' !== a && !e[a] && (ht(t, a, !1), delete r[a]);
        }
        for (o = 0, i = n.length; o < i; o++) {
          var l = n[o],
            c = !!e[l];
          l &&
            'undefined' !== l &&
            r[l] !== c &&
            c &&
            (ht(t, l, !0), (r[l] = c));
        }
        return r;
      })(t, r, n)
    : r === n
    ? n
    : ('ref' === e
        ? o || r(t)
        : 'on:' === e.slice(0, 3)
        ? ((o = e.slice(3)),
          n && t.removeEventListener(o, n),
          r && t.addEventListener(o, r))
        : 'oncapture:' === e.slice(0, 10)
        ? ((o = e.slice(10)),
          n && t.removeEventListener(o, n, !0),
          r && t.addEventListener(o, r, !0))
        : 'on' === e.slice(0, 2)
        ? ((o = e.slice(2).toLowerCase()),
          !(u = tt.has(o)) &&
            n &&
            ((n = Array.isArray(n) ? n[0] : n), t.removeEventListener(o, n)),
          (u || r) &&
            ((function (t, e, r, n) {
              if (n)
                Array.isArray(r)
                  ? ((t['$$' + e] = r[0]), (t[`$$${e}Data`] = r[1]))
                  : (t['$$' + e] = r);
              else if (Array.isArray(r)) {
                const n = r[0];
                t.addEventListener(e, (r[0] = (e) => n.call(t, r[1], e)));
              } else t.addEventListener(e, r);
            })(t, o, r, u),
            u) &&
            st([o]))
        : 'attr:' === e.slice(0, 5)
        ? ot(t, e.slice(5), r)
        : (h = 'prop:' === e.slice(0, 5)) ||
          (l = K.has(e)) ||
          (!s &&
            ((c = (function (t, e) {
              return 'object' == typeof (t = Z[t]) ? (t[e] ? t.$ : void 0) : t;
            })(e, t.tagName)) ||
              (a = J.has(e)))) ||
          (i = t.nodeName.includes('-'))
        ? (h && ((e = e.slice(5)), (a = !0)),
          'class' === e || 'className' === e
            ? it(t, r)
            : !i || a || l
            ? (t[c || e] = r)
            : (t[
                (function (t) {
                  return t
                    .toLowerCase()
                    .replace(/-([a-z])/g, (t, e) => e.toUpperCase());
                })(e)
              ] = r))
        : (n = s && -1 < e.indexOf(':') && et[e.split(':')[0]])
        ? (function (t, e, r, n) {
            null == n ? t.removeAttributeNS(e, r) : t.setAttributeNS(e, r, n);
          })(t, n, e, r)
        : ot(t, Q[e] || e, r),
      r);
}
function pt(t) {
  var e = '$$' + t.type;
  let r = (t.composedPath && t.composedPath()[0]) || t.target;
  for (
    t.target !== r &&
      Object.defineProperty(t, 'target', { configurable: !0, value: r }),
      Object.defineProperty(t, 'currentTarget', {
        configurable: !0,
        get: () => r || document,
      });
    r;

  ) {
    var n = r[e];
    if (n && !r.disabled) {
      var s = r[e + 'Data'];
      if ((void 0 !== s ? n.call(r, s, t) : n.call(r, t), t.cancelBubble))
        return;
    }
    r = r._$host || r.parentNode || r.host;
  }
}
function dt(t, e, r, n, s) {
  for (; 'function' == typeof r; ) r = r();
  if (e !== r) {
    var o = typeof e,
      i = void 0 !== n;
    if (
      ((t = (i && r[0] && r[0].parentNode) || t),
      'string' == o || 'number' == o)
    )
      if (('number' == o && (e = e.toString()), i)) {
        let s = r[0];
        s && 3 === s.nodeType ? (s.data = e) : (s = document.createTextNode(e)),
          (r = bt(t, r, n, s));
      } else
        r =
          '' !== r && 'string' == typeof r
            ? (t.firstChild.data = e)
            : (t.textContent = e);
    else if (null == e || 'boolean' == o) r = bt(t, r, n);
    else {
      if ('function' == o)
        return (
          k(() => {
            let s = e();
            for (; 'function' == typeof s; ) s = s();
            r = dt(t, s, r, n);
          }),
          () => r
        );
      if (Array.isArray(e)) {
        const a = [];
        if (((o = r && Array.isArray(r)), ft(a, e, r, s)))
          return k(() => (r = dt(t, a, r, n, !0))), () => r;
        if (0 === a.length) {
          if (((r = bt(t, r, n)), i)) return r;
        } else
          o
            ? 0 === r.length
              ? gt(t, a, n)
              : (function (t, e, r) {
                  let n = r.length,
                    s = e.length,
                    o = n,
                    i = 0,
                    a = 0,
                    l = e[s - 1].nextSibling,
                    c = null;
                  for (; i < s || a < o; )
                    if (e[i] === r[a]) i++, a++;
                    else {
                      for (; e[s - 1] === r[o - 1]; ) s--, o--;
                      if (s === i)
                        for (
                          var h =
                            o < n ? (a ? r[a - 1].nextSibling : r[o - a]) : l;
                          a < o;

                        )
                          t.insertBefore(r[a++], h);
                      else if (o === a)
                        for (; i < s; )
                          (c && c.has(e[i])) || e[i].remove(), i++;
                      else if (e[i] === r[o - 1] && r[a] === e[s - 1]) {
                        var u = e[--s].nextSibling;
                        t.insertBefore(r[a++], e[i++].nextSibling),
                          t.insertBefore(r[--o], u),
                          (e[s] = r[o]);
                      } else {
                        if (!c) {
                          c = new Map();
                          let t = a;
                          for (; t < o; ) c.set(r[t], t++);
                        }
                        var p = c.get(e[i]);
                        if (null != p)
                          if (a < p && p < o) {
                            let n,
                              l = i,
                              h = 1;
                            for (
                              ;
                              ++l < s &&
                              l < o &&
                              null != (n = c.get(e[l])) &&
                              n === p + h;

                            )
                              h++;
                            if (h > p - a)
                              for (var d = e[i]; a < p; )
                                t.insertBefore(r[a++], d);
                            else t.replaceChild(r[a++], e[i++]);
                          } else i++;
                        else e[i++].remove();
                      }
                    }
                })(t, r, a)
            : (r && bt(t), gt(t, a));
        r = a;
      } else if (e instanceof Node) {
        if (Array.isArray(r)) {
          if (i) return (r = bt(t, r, n, e));
          bt(t, r, null, e);
        } else
          null != r && '' !== r && t.firstChild
            ? t.replaceChild(e, t.firstChild)
            : t.appendChild(e);
        r = e;
      } else console.warn('Unrecognized value. Skipped inserting', e);
    }
  }
  return r;
}
function ft(t, e, r, n) {
  let s = !1;
  for (let i = 0, a = e.length; i < a; i++) {
    let a = e[i],
      l = r && r[i];
    if (a instanceof Node) t.push(a);
    else if (null != a && !0 !== a && !1 !== a)
      if (Array.isArray(a)) s = ft(t, a, l) || s;
      else if ('function' == typeof a)
        if (n) {
          for (; 'function' == typeof a; ) a = a();
          s =
            ft(t, Array.isArray(a) ? a : [a], Array.isArray(l) ? l : [l]) || s;
        } else t.push(a), (s = !0);
      else {
        var o = String(a);
        l && 3 === l.nodeType
          ? ((l.data = o), t.push(l))
          : t.push(document.createTextNode(o));
      }
  }
  return s;
}
function gt(t, e, r = null) {
  for (let n = 0, s = e.length; n < s; n++) t.insertBefore(e[n], r);
}
function bt(t, e, r, n) {
  if (void 0 === r) return (t.textContent = '');
  var s = n || document.createTextNode('');
  if (e.length) {
    let n = !1;
    for (let a = e.length - 1; 0 <= a; a--) {
      var o,
        i = e[a];
      s !== i
        ? ((o = i.parentNode === t),
          n || a
            ? o && i.remove()
            : o
            ? t.replaceChild(s, i)
            : t.insertBefore(s, r))
        : (n = !0);
    }
  } else t.insertBefore(s, r);
  return [s];
}
function mt(t) {
  return (e, r) => {
    const n = r.element;
    return v(
      (s) => {
        const o = (function (t) {
          var e = Object.keys(t),
            r = {};
          for (let n = 0; n < e.length; n++) {
            const [s, o] = x(t[e[n]]);
            Object.defineProperty(r, e[n], {
              get: s,
              set(t) {
                o(() => t);
              },
            });
          }
          return r;
        })(e);
        n.addPropertyChangedCallback((t, e) => (o[t] = e)),
          n.addReleaseCallback(() => {
            (n.renderRoot.textContent = ''), s();
          });
        var i = t(o, r);
        return ct(n.renderRoot, i);
      },
      (function (t) {
        if (t.assignedSlot && t.assignedSlot._$owner)
          return t.assignedSlot._$owner;
        let e = t.parentNode;
        for (
          ;
          e && !e._$owner && (!e.assignedSlot || !e.assignedSlot._$owner);

        )
          e = e.parentNode;
        return (e && e.assignedSlot ? e.assignedSlot : t)._$owner;
      })(n)
    );
  };
}
function yt(t, e, r) {
  return 2 === arguments.length && ((r = e), (e = {})), i(t, e)(mt(r));
}
const wt = {
  chatflowid: '',
  apiHost: void 0,
  chatflowConfig: void 0,
  theme: void 0,
};
var vt =
  '/*! tailwindcss v3.3.1 | MIT License | https://tailwindcss.com*/*,:after,:before{border:0 solid #e5e7eb;box-sizing:border-box}:after,:before{--tw-content:""}html{-webkit-text-size-adjust:100%;font-feature-settings:normal;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji;font-variation-settings:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4}body{line-height:inherit;margin:0}hr{border-top-width:1px;color:inherit;height:0}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,pre,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{border-collapse:collapse;border-color:inherit;text-indent:0}button,input,optgroup,select,textarea{color:inherit;font-family:inherit;font-size:100%;font-weight:inherit;line-height:inherit;margin:0;padding:0}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dd,dl,figure,h1,h2,h3,h4,h5,h6,hr,p,pre{margin:0}fieldset{margin:0}fieldset,legend{padding:0}menu,ol,ul{margin:0;padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{color:#9ca3af;opacity:1}input::placeholder,textarea::placeholder{color:#9ca3af;opacity:1}[role=button],button{cursor:pointer}:disabled{cursor:default}audio,canvas,embed,iframe,img,object,svg,video{display:block;vertical-align:middle}img,video{height:auto;max-width:100%}[hidden]{display:none}*,:after,:before{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }::backdrop{--tw-border-spacing-x:0;--tw-border-spacing-y:0;--tw-translate-x:0;--tw-translate-y:0;--tw-rotate:0;--tw-skew-x:0;--tw-skew-y:0;--tw-scale-x:1;--tw-scale-y:1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness:proximity;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(59,130,246,.5);--tw-ring-offset-shadow:0 0 #0000;--tw-ring-shadow:0 0 #0000;--tw-shadow:0 0 #0000;--tw-shadow-colored:0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: }.pointer-events-none{pointer-events:none}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.inset-0{inset:0}.bottom-20{bottom:80px}.bottom-24{bottom:96px}.left-0{left:0}.top-0{top:0}.z-10{z-index:10}.z-50{z-index:50}.float-left{float:left}.my-2{margin-bottom:8px;margin-top:8px}.-ml-1{margin-left:-4px}.mb-1{margin-bottom:4px}.mb-2{margin-bottom:8px}.ml-1{margin-left:4px}.ml-2{margin-left:8px}.mr-1{margin-right:4px}.mr-2{margin-right:8px}.mr-3{margin-right:12px}.block{display:block}.flex{display:flex}.inline-flex{display:inline-flex}.hidden{display:none}.h-0{height:0}.h-10{height:40px}.h-12{height:48px}.h-16{height:64px}.h-2{height:8px}.h-32{height:128px}.h-5{height:20px}.h-6{height:24px}.h-7{height:28px}.h-9{height:36px}.h-full{height:100%}.max-h-\\[704px\\]{max-height:704px}.min-h-full{min-height:100%}.w-10{width:40px}.w-12{width:48px}.w-16{width:64px}.w-2{width:8px}.w-5{width:20px}.w-6{width:24px}.w-7{width:28px}.w-9{width:36px}.w-full{width:100%}.min-w-full{min-width:100%}.max-w-full{max-width:100%}.flex-1{flex:1 1 0%}.flex-shrink-0{flex-shrink:0}.-rotate-180{--tw-rotate:-180deg}.-rotate-180,.rotate-0{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.rotate-0{--tw-rotate:0deg}.scale-0{--tw-scale-x:0;--tw-scale-y:0}.scale-0,.scale-100{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.scale-100{--tw-scale-x:1;--tw-scale-y:1}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes fade-in{0%{opacity:0}to{opacity:1}}.animate-fade-in{animation:fade-in .3s ease-out}@keyframes spin{to{transform:rotate(1turn)}}.animate-spin{animation:spin 1s linear infinite}.list-none{list-style-type:none}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-end{align-items:flex-end}.items-center{align-items:center}.justify-start{justify-content:flex-start}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.overflow-hidden{overflow:hidden}.overflow-y-auto{overflow-y:auto}.overflow-y-scroll{overflow-y:scroll}.scroll-smooth{scroll-behavior:smooth}.whitespace-nowrap{white-space:nowrap}.whitespace-pre-wrap{white-space:pre-wrap}.rounded{border-radius:4px}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:8px}.border{border-width:1px}.border-t-0{border-top-width:0}.border-solid{border-style:solid}.border-slate-800{--tw-border-opacity:1;border-color:rgb(30 41 59/var(--tw-border-opacity))}.bg-black{--tw-bg-opacity:1;background-color:rgb(0 0 0/var(--tw-bg-opacity))}.bg-slate-700{--tw-bg-opacity:1;background-color:rgb(51 65 85/var(--tw-bg-opacity))}.bg-transparent{background-color:transparent}.bg-white{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity))}.bg-opacity-50{--tw-bg-opacity:0.5}.bg-cover{background-size:cover}.bg-center{background-position:50%}.fill-transparent{fill:transparent}.stroke-2{stroke-width:2}.object-cover{-o-object-fit:cover;object-fit:cover}.p-4{padding:16px}.px-2{padding-left:8px;padding-right:8px}.px-3{padding-left:12px;padding-right:12px}.px-4{padding-left:16px;padding-right:16px}.px-6{padding-left:24px;padding-right:24px}.py-1{padding-bottom:4px;padding-top:4px}.py-2{padding-bottom:8px;padding-top:8px}.py-3{padding-bottom:12px;padding-top:12px}.py-4{padding-bottom:16px;padding-top:16px}.pt-10{padding-top:40px}.text-left{text-align:left}.text-center{text-align:center}.align-middle{vertical-align:middle}.text-base{font-size:16px;line-height:24px}.text-sm{font-size:14px;line-height:20px}.text-xl{font-size:20px;line-height:28px}.font-bold{font-weight:700}.font-normal{font-weight:400}.font-semibold{font-weight:600}.uppercase{text-transform:uppercase}.text-slate-700{--tw-text-opacity:1;color:rgb(51 65 85/var(--tw-text-opacity))}.text-white{--tw-text-opacity:1;color:rgb(255 255 255/var(--tw-text-opacity))}.opacity-0{opacity:0}.opacity-100{opacity:1}.opacity-25{opacity:.25}.opacity-75{opacity:.75}.shadow{--tw-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px -1px rgba(0,0,0,.1);--tw-shadow-colored:0 1px 3px 0 var(--tw-shadow-color),0 1px 2px -1px var(--tw-shadow-color)}.shadow,.shadow-lg{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-lg{--tw-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color),0 4px 6px -4px var(--tw-shadow-color)}.shadow-md{--tw-shadow:0 4px 6px -1px rgba(0,0,0,.1),0 2px 4px -2px rgba(0,0,0,.1);--tw-shadow-colored:0 4px 6px -1px var(--tw-shadow-color),0 2px 4px -2px var(--tw-shadow-color)}.shadow-md,.shadow-xl{box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.shadow-xl{--tw-shadow:0 20px 25px -5px rgba(0,0,0,.1),0 8px 10px -6px rgba(0,0,0,.1);--tw-shadow-colored:0 20px 25px -5px var(--tw-shadow-color),0 8px 10px -6px var(--tw-shadow-color)}.outline-none{outline:2px solid transparent;outline-offset:2px}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition{transition-duration:.15s;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,-webkit-backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter;transition-property:color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-backdrop-filter;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-all{transition-duration:.15s;transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-opacity{transition-duration:.15s;transition-property:opacity;transition-timing-function:cubic-bezier(.4,0,.2,1)}.transition-transform{transition-property:transform;transition-timing-function:cubic-bezier(.4,0,.2,1)}.duration-150,.transition-transform{transition-duration:.15s}.duration-200{transition-duration:.2s}.ease-linear{transition-timing-function:linear}.ease-out{transition-timing-function:cubic-bezier(0,0,.2,1)}:host{--chatbot-container-bg-image:none;--chatbot-container-bg-color:transparent;--chatbot-container-font-family:"Open Sans";--chatbot-button-bg-color:#0042da;--chatbot-button-color:#fff;--chatbot-host-bubble-bg-color:#f7f8ff;--chatbot-host-bubble-color:#303235;--chatbot-guest-bubble-bg-color:#3b81f6;--chatbot-guest-bubble-color:#fff;--chatbot-input-bg-color:#fff;--chatbot-input-color:#303235;--chatbot-input-placeholder-color:#9095a0;--chatbot-header-bg-color:#fff;--chatbot-header-color:#303235;--chatbot-border-radius:6px;--PhoneInputCountryFlag-borderColor:transparent;--PhoneInput-color--focus:transparent}a{color:#16bed7;font-weight:500}a:hover{text-decoration:underline}pre{word-wrap:break-word;font-size:13px;margin:5px;overflow:auto;padding:5px;white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap;white-space:-o-pre-wrap;width:auto}.string{color:green}.number{color:#ff8c00}.boolean{color:blue}.null{color:#f0f}.key{color:#002b36}.scrollable-container::-webkit-scrollbar{display:none}.scrollable-container{-ms-overflow-style:none;scrollbar-width:none}.text-fade-in{transition:opacity .4s ease-in .2s}.bubble-typing{transition:width .4s ease-out,height .4s ease-out}.bubble1,.bubble2,.bubble3{background-color:var(--chatbot-host-bubble-color);opacity:.5}.bubble1,.bubble2{animation:chatBubbles 1s ease-in-out infinite}.bubble2{animation-delay:.3s}.bubble3{animation:chatBubbles 1s ease-in-out infinite;animation-delay:.5s}@keyframes chatBubbles{0%{transform:translateY(0)}50%{transform:translateY(-5px)}to{transform:translateY(0)}}button,input,textarea{font-weight:300}.slate-a{text-decoration:underline}.slate-html-container>div{min-height:24px}.slate-bold{font-weight:700}.slate-italic{font-style:oblique}.slate-underline{text-decoration:underline}.text-input::-moz-placeholder{color:#9095a0!important;opacity:1!important}.text-input::placeholder{color:#9095a0!important;opacity:1!important}.chatbot-container{background-color:var(--chatbot-container-bg-color);background-image:var(--chatbot-container-bg-image);font-family:Open Sans,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol}.table{background-color:#1b1f2d;color:#fff}.chatbot-button{background-color:#0042da;border:1px solid #0042da;border-radius:var(--chatbot-border-radius);color:var(--chatbot-button-color)}.chatbot-button.selectable{border:1px solid #0042da}.chatbot-button.selectable,.chatbot-host-bubble{background-color:#f7f8ff;color:var(--chatbot-host-bubble-color)}.chatbot-host-bubble>.table{background-color:#1b1f2d;color:#fff}.chatbot-host-bubble>.bubble-typing{background-color:#f7f8ff;border:var(--chatbot-host-bubble-border);border-radius:6px}.chatbot-host-bubble iframe,.chatbot-host-bubble img,.chatbot-host-bubble video{border-radius:var(--chatbot-border-radius)}.chatbot-guest-bubble{background-color:#3b81f6;border-radius:6px;color:var(--chatbot-guest-bubble-color)}.chatbot-input{background-color:#fff;border-radius:var(--chatbot-border-radius);box-shadow:0 2px 6px -1px rgba(0,0,0,.1);color:#303235}.chatbot-input-error-message{color:#303235}.chatbot-button>.send-icon{fill:var(--chatbot-button-color)}.chatbot-chat-view{max-width:800px}.ping span{background-color:#0042da}.rating-icon-container svg{stroke:#0042da;fill:#f7f8ff;height:42px;transition:fill .1s ease-out;width:42px}.rating-icon-container.selected svg{fill:#0042da}.rating-icon-container:hover svg{filter:brightness(.9)}.rating-icon-container:active svg{filter:brightness(.75)}.upload-progress-bar{background-color:#0042da;border-radius:var(--chatbot-border-radius)}.total-files-indicator{background-color:#0042da;color:var(--chatbot-button-color);font-size:10px}.chatbot-upload-input{transition:border-color .1s ease-out}.chatbot-upload-input.dragging-over{border-color:#0042da}.secondary-button{background-color:#f7f8ff;border-radius:var(--chatbot-border-radius);color:var(--chatbot-host-bubble-color)}.chatbot-country-select{color:#303235}.chatbot-country-select,.chatbot-date-input{background-color:#fff;border-radius:var(--chatbot-border-radius)}.chatbot-date-input{color:#303235;color-scheme:light}.chatbot-popup-blocked-toast{border-radius:var(--chatbot-border-radius)}.messagelist{border-radius:.5rem;height:100%;overflow-y:scroll;width:100%}.messagelistloading{display:flex;justify-content:center;margin-top:1rem;width:100%}.usermessage{padding:1rem 1.5rem}.usermessagewaiting-light{background:linear-gradient(270deg,#ede7f6,#e3f2fd,#ede7f6);background-position:-100% 0;background-size:200% 200%}.usermessagewaiting-dark,.usermessagewaiting-light{animation:loading-gradient 2s ease-in-out infinite;animation-direction:alternate;animation-name:loading-gradient;padding:1rem 1.5rem}.usermessagewaiting-dark{background:linear-gradient(270deg,#2e2352,#1d3d60,#2e2352);background-position:-100% 0;background-size:200% 200%;color:#ececf1}@keyframes loading-gradient{0%{background-position:-100% 0}to{background-position:100% 0}}.apimessage{animation:fadein .5s;padding:1rem 1.5rem}@keyframes fadein{0%{opacity:0}to{opacity:1}}.apimessage,.usermessage,.usermessagewaiting{display:flex}.markdownanswer{line-height:1.75}.markdownanswer a:hover{opacity:.8}.markdownanswer a{color:#16bed7;font-weight:500}.markdownanswer code{color:#15cb19;font-weight:500;white-space:pre-wrap!important}.markdownanswer ol,.markdownanswer ul{margin:1rem}.boticon,.usericon{border-radius:1rem;margin-right:1rem}.markdownanswer h1,.markdownanswer h2,.markdownanswer h3{font-size:inherit}.center{flex-direction:column;padding:10px;position:relative}.center,.cloud{align-items:center;display:flex;justify-content:center}.cloud{border-radius:.5rem;height:calc(100% - 50px);width:400px}input{background-color:transparent;border:none;font-family:Poppins,sans-serif;padding:10px}.hover\\:scale-110:hover{--tw-scale-x:1.1;--tw-scale-y:1.1;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.hover\\:shadow-lg:hover{--tw-shadow:0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.1);--tw-shadow-colored:0 10px 15px -3px var(--tw-shadow-color),0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow,0 0 #0000),var(--tw-ring-shadow,0 0 #0000),var(--tw-shadow)}.hover\\:brightness-90:hover{--tw-brightness:brightness(.9);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.active\\:scale-95:active{--tw-scale-x:.95;--tw-scale-y:.95;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.active\\:brightness-75:active{--tw-brightness:brightness(.75);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.disabled\\:opacity-50:disabled{opacity:.5}.disabled\\:brightness-100:disabled{--tw-brightness:brightness(1);filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}@media (min-width:640px){.sm\\:right-5{right:20px}.sm\\:my-8{margin-bottom:32px;margin-top:32px}.sm\\:w-6\\/12{width:50%}.sm\\:w-\\[400px\\]{width:400px}.sm\\:w-full{width:100%}.sm\\:max-w-lg{max-width:512px}.sm\\:p-0{padding:0}}@media (min-width:768px){.md\\:w-4\\/12{width:33.333333%}}';
const xt = (t) => null == t,
  kt = (t) => null != t,
  _t = async (t) => {
    try {
      var e = 'string' == typeof t ? t : t.url,
        r = await fetch(e, {
          method: 'string' == typeof t ? 'GET' : t.method,
          mode: 'cors',
          headers:
            'string' != typeof t && kt(t.body)
              ? { 'Content-Type': 'application/json' }
              : void 0,
          body:
            'string' != typeof t && kt(t.body)
              ? JSON.stringify(t.body)
              : void 0,
        });
      let s;
      var n = r.headers.get('Content-Type');
      if (
        ((s =
          n && n.includes('application/json')
            ? await r.json()
            : await r.text()),
        r.ok)
      )
        return { data: s };
      {
        let t;
        throw (t =
          'object' == typeof s && 'error' in s ? s.error : s || r.statusText);
      }
    } catch (t) {
      return console.error(t), { error: t };
    }
  },
  Ct = nt(
    '<svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z">'
  ),
  Ot = nt('<img alt="Bubble button icon">'),
  St = nt(
    '<button part="button"><svg viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M18.601 8.39897C18.269 8.06702 17.7309 8.06702 17.3989 8.39897L12 13.7979L6.60099 8.39897C6.26904 8.06702 5.73086 8.06702 5.39891 8.39897C5.06696 8.73091 5.06696 9.2691 5.39891 9.60105L11.3989 15.601C11.7309 15.933 12.269 15.933 12.601 15.601L18.601 9.60105C18.9329 9.2691 18.9329 8.73091 18.601 8.39897Z">'
  ),
  At = (t) => {
    {
      const e = St(),
        r = e.firstChild;
      return (
        (e.$$click = () => t.toggleBot()),
        e.style.setProperty('z-index', '42424242'),
        ct(
          e,
          W(X, {
            get when() {
              return xt(t.customIconSrc);
            },
            keyed: !0,
            get children() {
              const e = Ct();
              return (
                k(
                  (r) => {
                    var n = t.iconColor ?? 'white',
                      s =
                        'stroke-2 fill-transparent absolute duration-200 transition ' +
                        (t.isBotOpened
                          ? 'scale-0 opacity-0'
                          : 'scale-100 opacity-100') +
                        ('large' === t.size ? ' w-9' : ' w-7');
                    return (
                      n !== r._v$ &&
                        (null != (r._v$ = n)
                          ? e.style.setProperty('stroke', n)
                          : e.style.removeProperty('stroke')),
                      s !== r._v$2 && ot(e, 'class', (r._v$2 = s)),
                      r
                    );
                  },
                  { _v$: void 0, _v$2: void 0 }
                ),
                e
              );
            },
          }),
          r
        ),
        ct(
          e,
          W(X, {
            get when() {
              return t.customIconSrc;
            },
            get children() {
              const e = Ot();
              return (
                k(
                  (r) => {
                    var n = t.customIconSrc,
                      s =
                        'rounded-full object-cover' +
                        (t.isBotOpened
                          ? 'scale-0 opacity-0'
                          : 'scale-100 opacity-100') +
                        ('large' === t.size ? ' w-9 h-9' : ' w-7 h-7');
                    return (
                      n !== r._v$3 && ot(e, 'src', (r._v$3 = n)),
                      s !== r._v$4 && it(e, (r._v$4 = s)),
                      r
                    );
                  },
                  { _v$3: void 0, _v$4: void 0 }
                ),
                e
              );
            },
          }),
          r
        ),
        k(
          (n) => {
            var s =
                'fixed shadow-md rounded-full hover:scale-110 active:scale-95 transition-transform duration-200 flex justify-center items-center animate-fade-in' +
                ('large' === t.size ? ' w-16 h-16' : ' w-12 h-12'),
              o = t.backgroundColor ?? '#3B81F6',
              i = t.right ? t.right.toString() + 'px' : '20px',
              a = t.bottom ? t.bottom.toString() + 'px' : '20px',
              l = t.iconColor ?? 'white',
              c =
                'absolute duration-200 transition ' +
                (t.isBotOpened
                  ? 'scale-100 rotate-0 opacity-100'
                  : 'scale-0 -rotate-180 opacity-0') +
                ('large' === t.size ? ' w-9' : ' w-7');
            return (
              s !== n._v$5 && it(e, (n._v$5 = s)),
              o !== n._v$6 &&
                (null != (n._v$6 = o)
                  ? e.style.setProperty('background-color', o)
                  : e.style.removeProperty('background-color')),
              i !== n._v$7 &&
                (null != (n._v$7 = i)
                  ? e.style.setProperty('right', i)
                  : e.style.removeProperty('right')),
              a !== n._v$8 &&
                (null != (n._v$8 = a)
                  ? e.style.setProperty('bottom', a)
                  : e.style.removeProperty('bottom')),
              l !== n._v$9 &&
                (null != (n._v$9 = l)
                  ? r.style.setProperty('fill', l)
                  : r.style.removeProperty('fill')),
              c !== n._v$10 && ot(r, 'class', (n._v$10 = c)),
              n
            );
          },
          {
            _v$5: void 0,
            _v$6: void 0,
            _v$7: void 0,
            _v$8: void 0,
            _v$9: void 0,
            _v$10: void 0,
          }
        ),
        e
      );
    }
  },
  Et =
    (st(['click']),
    ({ chatflowid: t, apiHost: e = 'http://localhost:3000', body: r }) =>
      _t({ method: 'POST', url: e + '/api/v1/prediction/' + t, body: r })),
  Tt = nt(
    '<input class="focus:outline-none bg-transparent px-4 py-4 flex-1 w-full text-input" type="text">'
  ),
  Pt = (t) => {
    const [e, r] = V(t, ['ref', 'onInput']);
    return (
      ((n = Tt()).$$input = (t) => e.onInput(t.currentTarget.value)),
      'function' == typeof (s = t.ref) ? lt(s, n) : (t.ref = n),
      at(
        n,
        G(
          {
            get style() {
              return { 'font-size': t.fontSize ? t.fontSize + 'px' : '16px' };
            },
          },
          r
        ),
        !1,
        !1
      ),
      n
    );
    var n, s;
  },
  Rt =
    (st(['input']),
    nt(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="19px"><path d="M476.59 227.05l-.16-.07L49.35 49.84A23.56 23.56 0 0027.14 52 24.65 24.65 0 0016 72.59v113.29a24 24 0 0019.52 23.57l232.93 43.07a4 4 0 010 7.86L35.53 303.45A24 24 0 0016 327v113.31A23.57 23.57 0 0026.59 460a23.94 23.94 0 0013.22 4 24.55 24.55 0 009.52-1.93L476.4 285.94l.19-.09a32 32 0 000-58.8z">'
    )),
  $t = (t) => {
    return (
      at(
        (e = Rt()),
        G(
          {
            get style() {
              return { fill: t.color ?? '#3B81F6' };
            },
          },
          t
        ),
        !0,
        !0
      ),
      e
    );
    var e;
  },
  Bt = nt(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="20px"><path d="M234.7 42.7 197 56.8c-3 1.1-5 4-5 7.2s2 6.1 5 7.2l37.7 14.1 14.1 37.7c1.1 3 4 5 7.2 5s6.1-2 7.2-5l14.1-37.7L315 71.2c3-1.1 5-4 5-7.2s-2-6.1-5-7.2l-37.7-14.1L263.2 5c-1.1-3-4-5-7.2-5s-6.1 2-7.2 5l-14.1 37.7zM46.1 395.4c-18.7 18.7-18.7 49.1 0 67.9l34.6 34.6c18.7 18.7 49.1 18.7 67.9 0l381.3-381.4c18.7-18.7 18.7-49.1 0-67.9l-34.6-34.5c-18.7-18.7-49.1-18.7-67.9 0L46.1 395.4zM484.6 82.6l-105 105-23.3-23.3 105-105 23.3 23.3zM7.5 117.2C3 118.9 0 123.2 0 128s3 9.1 7.5 10.8L64 160l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L128 160l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L128 96l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L64 96 7.5 117.2zm352 256c-4.5 1.7-7.5 6-7.5 10.8s3 9.1 7.5 10.8L416 416l21.2 56.5c1.7 4.5 6 7.5 10.8 7.5s9.1-3 10.8-7.5L480 416l56.5-21.2c4.5-1.7 7.5-6 7.5-10.8s-3-9.1-7.5-10.8L480 352l-21.2-56.5c-1.7-4.5-6-7.5-10.8-7.5s-9.1 3-10.8 7.5L416 352l-56.5 21.2z">'
  ),
  Lt = (t) => {
    return (
      at(
        (e = Bt()),
        G(
          {
            get style() {
              return { fill: t.color ?? '#4285f4' };
            },
          },
          t
        ),
        !0,
        !0
      ),
      e
    );
    var e;
  },
  jt = nt('<button type="submit">'),
  Nt = nt(
    '<svg><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">'
  ),
  Mt = (t) => {
    return (
      at(
        (e = jt()),
        G(
          {
            get disabled() {
              return t.isDisabled || t.isLoading;
            },
          },
          t,
          {
            get class() {
              return (
                'py-2 px-4 justify-center font-semibold text-white focus:outline-none flex items-center disabled:opacity-50 disabled:cursor-not-allowed disabled:brightness-100 transition-all filter hover:brightness-90 active:brightness-75 chatbot-button ' +
                t.class
              );
            },
            style: { background: 'transparent', border: 'none' },
          }
        ),
        !1,
        !0
      ),
      ct(
        e,
        W(X, {
          get when() {
            return !t.isLoading;
          },
          get fallback() {
            return W(zt, { class: 'text-white' });
          },
          get children() {
            return W($t, {
              get color() {
                return t.sendButtonColor;
              },
              get class() {
                return 'send-icon flex ' + (t.disableIcon ? 'hidden' : '');
              },
            });
          },
        })
      ),
      e
    );
    var e;
  },
  zt = (t) => {
    return (
      at(
        (e = Nt()),
        G(t, {
          get class() {
            return 'animate-spin -ml-1 mr-3 h-5 w-5 ' + t.class;
          },
          xmlns: 'http://www.w3.org/2000/svg',
          fill: 'none',
          viewBox: '0 0 24 24',
          'data-testid': 'loading-spinner',
        }),
        !0,
        !0
      ),
      e
    );
    var e;
  },
  [It, qt] = x();
var Dt = 'top',
  Wt = 'bottom',
  Ht = 'right',
  Ft = 'left',
  Ut = 'auto',
  Gt = [Dt, Wt, Ht, Ft],
  Vt = 'start',
  Yt = 'end',
  Xt = 'clippingParents',
  Jt = 'viewport',
  Kt = 'popper',
  Qt = 'reference',
  Zt = Gt.reduce(function (t, e) {
    return t.concat([e + '-' + Vt, e + '-' + Yt]);
  }, []),
  te = [].concat(Gt, [Ut]).reduce(function (t, e) {
    return t.concat([e, e + '-' + Vt, e + '-' + Yt]);
  }, []),
  ee = [
    'beforeRead',
    'read',
    'afterRead',
    'beforeMain',
    'main',
    'afterMain',
    'beforeWrite',
    'write',
    'afterWrite',
  ];
function re(t) {
  return t ? (t.nodeName || '').toLowerCase() : null;
}
function ne(t) {
  var e;
  return null == t
    ? window
    : '[object Window]' !== t.toString()
    ? ((e = t.ownerDocument) && e.defaultView) || window
    : t;
}
function se(t) {
  return t instanceof ne(t).Element || t instanceof Element;
}
function oe(t) {
  return t instanceof ne(t).HTMLElement || t instanceof HTMLElement;
}
function ie(t) {
  return (
    'undefined' != typeof ShadowRoot &&
    (t instanceof ne(t).ShadowRoot || t instanceof ShadowRoot)
  );
}
var ae = {
  name: 'applyStyles',
  enabled: !0,
  phase: 'write',
  fn: function (t) {
    var e = t.state;
    Object.keys(e.elements).forEach(function (t) {
      var r = e.styles[t] || {},
        n = e.attributes[t] || {},
        s = e.elements[t];
      oe(s) &&
        re(s) &&
        (Object.assign(s.style, r),
        Object.keys(n).forEach(function (t) {
          var e = n[t];
          !1 === e
            ? s.removeAttribute(t)
            : s.setAttribute(t, !0 === e ? '' : e);
        }));
    });
  },
  effect: function (t) {
    var e = t.state,
      r = {
        popper: {
          position: e.options.strategy,
          left: '0',
          top: '0',
          margin: '0',
        },
        arrow: { position: 'absolute' },
        reference: {},
      };
    return (
      Object.assign(e.elements.popper.style, r.popper),
      (e.styles = r),
      e.elements.arrow && Object.assign(e.elements.arrow.style, r.arrow),
      function () {
        Object.keys(e.elements).forEach(function (t) {
          var n = e.elements[t],
            s = e.attributes[t] || {};
          t = Object.keys(
            (e.styles.hasOwnProperty(t) ? e.styles : r)[t]
          ).reduce(function (t, e) {
            return (t[e] = ''), t;
          }, {});
          oe(n) &&
            re(n) &&
            (Object.assign(n.style, t),
            Object.keys(s).forEach(function (t) {
              n.removeAttribute(t);
            }));
        });
      }
    );
  },
  requires: ['computeStyles'],
};
function le(t) {
  return t.split('-')[0];
}
var ce = Math.max,
  he = Math.min,
  ue = Math.round;
function pe() {
  var t = navigator.userAgentData;
  return null != t && t.brands && Array.isArray(t.brands)
    ? t.brands
        .map(function (t) {
          return t.brand + '/' + t.version;
        })
        .join(' ')
    : navigator.userAgent;
}
function de() {
  return !/^((?!chrome|android).)*safari/i.test(pe());
}
function fe(t, e, r) {
  void 0 === e && (e = !1), void 0 === r && (r = !1);
  var n = t.getBoundingClientRect(),
    s = 1,
    o = 1;
  return (
    e &&
      oe(t) &&
      ((s = (0 < t.offsetWidth && ue(n.width) / t.offsetWidth) || 1),
      (o = (0 < t.offsetHeight && ue(n.height) / t.offsetHeight) || 1)),
    (e = (se(t) ? ne(t) : window).visualViewport),
    (t = !de() && r),
    (r = (n.left + (t && e ? e.offsetLeft : 0)) / s),
    (t = (n.top + (t && e ? e.offsetTop : 0)) / o),
    {
      width: (e = n.width / s),
      height: (s = n.height / o),
      top: t,
      right: r + e,
      bottom: t + s,
      left: r,
      x: r,
      y: t,
    }
  );
}
function ge(t) {
  var e = fe(t),
    r = t.offsetWidth,
    n = t.offsetHeight;
  return (
    Math.abs(e.width - r) <= 1 && (r = e.width),
    Math.abs(e.height - n) <= 1 && (n = e.height),
    { x: t.offsetLeft, y: t.offsetTop, width: r, height: n }
  );
}
function be(t, e) {
  var r = e.getRootNode && e.getRootNode();
  if (t.contains(e)) return !0;
  if (r && ie(r)) {
    var n = e;
    do {
      if (n && t.isSameNode(n)) return !0;
    } while ((n = n.parentNode || n.host));
  }
  return !1;
}
function me(t) {
  return ne(t).getComputedStyle(t);
}
function ye(t) {
  return 0 <= ['table', 'td', 'th'].indexOf(re(t));
}
function we(t) {
  return ((se(t) ? t.ownerDocument : t.document) || window.document)
    .documentElement;
}
function ve(t) {
  return 'html' === re(t)
    ? t
    : t.assignedSlot || t.parentNode || (ie(t) ? t.host : null) || we(t);
}
function xe(t) {
  return oe(t) && 'fixed' !== me(t).position ? t.offsetParent : null;
}
function ke(t) {
  for (var e = ne(t), r = xe(t); r && ye(r) && 'static' === me(r).position; )
    r = xe(r);
  return (
    ((!r ||
      ('html' !== re(r) &&
        ('body' !== re(r) || 'static' !== me(r).position))) &&
      (r ||
        (function (t) {
          var e = /firefox/i.test(pe());
          if (/Trident/i.test(pe()) && oe(t) && 'fixed' === me(t).position)
            return null;
          var r = ve(t);
          for (
            ie(r) && (r = r.host);
            oe(r) && ['html', 'body'].indexOf(re(r)) < 0;

          ) {
            var n = me(r);
            if (
              'none' !== n.transform ||
              'none' !== n.perspective ||
              'paint' === n.contain ||
              -1 !== ['transform', 'perspective'].indexOf(n.willChange) ||
              (e && 'filter' === n.willChange) ||
              (e && n.filter && 'none' !== n.filter)
            )
              return r;
            r = r.parentNode;
          }
          return null;
        })(t))) ||
    e
  );
}
function _e(t) {
  return 0 <= ['top', 'bottom'].indexOf(t) ? 'x' : 'y';
}
function Ce(t, e, r) {
  return ce(t, he(e, r));
}
function Oe(t) {
  return Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }, t);
}
function Se(t, e) {
  return e.reduce(function (e, r) {
    return (e[r] = t), e;
  }, {});
}
var Ae = {
  name: 'arrow',
  enabled: !0,
  phase: 'main',
  fn: function (t) {
    var e,
      r,
      n,
      s,
      o = t.state,
      i = t.name,
      a = ((t = t.options), o.elements.arrow),
      l = o.modifiersData.popperOffsets,
      c = _e((h = le(o.placement))),
      h = 0 <= [Ft, Ht].indexOf(h) ? 'height' : 'width';
    a &&
      l &&
      ((t = (function (t, e) {
        return Oe(
          'number' !=
            typeof (t =
              'function' == typeof t
                ? t(Object.assign({}, e.rects, { placement: e.placement }))
                : t)
            ? t
            : Se(t, Gt)
        );
      })(t.padding, o)),
      (e = ge(a)),
      (s = 'y' === c ? Dt : Ft),
      (n = 'y' === c ? Wt : Ht),
      (r =
        o.rects.reference[h] + o.rects.reference[c] - l[c] - o.rects.popper[h]),
      (l = l[c] - o.rects.reference[c]),
      (a = (a = ke(a))
        ? 'y' === c
          ? a.clientHeight || 0
          : a.clientWidth || 0
        : 0),
      (s = t[s]),
      (t = a - e[h] - t[n]),
      (s = Ce(s, (n = a / 2 - e[h] / 2 + (r / 2 - l / 2)), t)),
      (o.modifiersData[i] = (((a = {})[c] = s), (a.centerOffset = s - n), a)));
  },
  effect: function (t) {
    var e = t.state;
    null !=
      (t = void 0 === (t = t.options.element) ? '[data-popper-arrow]' : t) &&
      ('string' != typeof t || (t = e.elements.popper.querySelector(t))) &&
      be(e.elements.popper, t) &&
      (e.elements.arrow = t);
  },
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow'],
};
function Ee(t) {
  return t.split('-')[1];
}
var Te = { top: 'auto', right: 'auto', bottom: 'auto', left: 'auto' };
function Pe(t) {
  var e,
    r,
    n = t.popper,
    s = t.popperRect,
    o = t.placement,
    i = t.variation,
    a = t.offsets,
    l = t.position,
    c = t.gpuAcceleration,
    h = t.adaptive,
    u = t.roundOffsets,
    p = ((t = t.isFixed), void 0 === (p = a.x) ? 0 : p),
    d = void 0 === (d = a.y) ? 0 : d,
    f =
      ((p = (f = 'function' == typeof u ? u({ x: p, y: d }) : { x: p, y: d })
        .x),
      (d = f.y),
      a.hasOwnProperty('x')),
    g = ((a = a.hasOwnProperty('y')), Ft),
    b = Dt,
    m = window,
    y =
      (h &&
        ((y = 'clientHeight'),
        (r = 'clientWidth'),
        (e = ke(n)) === ne(n) &&
          'static' !== me((e = we(n))).position &&
          'absolute' === l &&
          ((y = 'scrollHeight'), (r = 'scrollWidth')),
        (o !== Dt && ((o !== Ft && o !== Ht) || i !== Yt)) ||
          ((b = Wt),
          (d =
            (d -
              ((t && e === m && m.visualViewport
                ? m.visualViewport.height
                : e[y]) -
                s.height)) *
            (c ? 1 : -1))),
        (o !== Ft && ((o !== Dt && o !== Wt) || i !== Yt)) ||
          ((g = Ht),
          (p =
            (p -
              ((t && e === m && m.visualViewport
                ? m.visualViewport.width
                : e[r]) -
                s.width)) *
            (c ? 1 : -1)))),
      Object.assign({ position: l }, h && Te));
  o =
    !0 === u
      ? (function (t, e) {
          var r = t.x;
          return (
            (t = t.y),
            (e = e.devicePixelRatio || 1),
            { x: ue(r * e) / e || 0, y: ue(t * e) / e || 0 }
          );
        })({ x: p, y: d }, ne(n))
      : { x: p, y: d };
  return (
    (p = o.x),
    (d = o.y),
    c
      ? Object.assign(
          {},
          y,
          (((i = {})[b] = a ? '0' : ''),
          (i[g] = f ? '0' : ''),
          (i.transform =
            (m.devicePixelRatio || 1) <= 1
              ? 'translate(' + p + 'px, ' + d + 'px)'
              : 'translate3d(' + p + 'px, ' + d + 'px, 0)'),
          i)
        )
      : Object.assign(
          {},
          y,
          (((t = {})[b] = a ? d + 'px' : ''),
          (t[g] = f ? p + 'px' : ''),
          (t.transform = ''),
          t)
        )
  );
}
var Re = {
    name: 'computeStyles',
    enabled: !0,
    phase: 'beforeWrite',
    fn: function (t) {
      var e = t.state,
        r = void 0 === (r = (t = t.options).gpuAcceleration) || r,
        n = void 0 === (n = t.adaptive) || n;
      (t = void 0 === (t = t.roundOffsets) || t),
        (r = {
          placement: le(e.placement),
          variation: Ee(e.placement),
          popper: e.elements.popper,
          popperRect: e.rects.popper,
          gpuAcceleration: r,
          isFixed: 'fixed' === e.options.strategy,
        }),
        null != e.modifiersData.popperOffsets &&
          (e.styles.popper = Object.assign(
            {},
            e.styles.popper,
            Pe(
              Object.assign({}, r, {
                offsets: e.modifiersData.popperOffsets,
                position: e.options.strategy,
                adaptive: n,
                roundOffsets: t,
              })
            )
          )),
        null != e.modifiersData.arrow &&
          (e.styles.arrow = Object.assign(
            {},
            e.styles.arrow,
            Pe(
              Object.assign({}, r, {
                offsets: e.modifiersData.arrow,
                position: 'absolute',
                adaptive: !1,
                roundOffsets: t,
              })
            )
          )),
        (e.attributes.popper = Object.assign({}, e.attributes.popper, {
          'data-popper-placement': e.placement,
        }));
    },
    data: {},
  },
  $e = { passive: !0 };
var Be = {
    name: 'eventListeners',
    enabled: !0,
    phase: 'write',
    fn: function () {},
    effect: function (t) {
      var e,
        r = t.state,
        n = t.instance,
        s = void 0 === (e = (t = t.options).scroll) || e,
        o = void 0 === (e = t.resize) || e,
        i = ne(r.elements.popper),
        a = [].concat(r.scrollParents.reference, r.scrollParents.popper);
      return (
        s &&
          a.forEach(function (t) {
            t.addEventListener('scroll', n.update, $e);
          }),
        o && i.addEventListener('resize', n.update, $e),
        function () {
          s &&
            a.forEach(function (t) {
              t.removeEventListener('scroll', n.update, $e);
            }),
            o && i.removeEventListener('resize', n.update, $e);
        }
      );
    },
    data: {},
  },
  Le = { left: 'right', right: 'left', bottom: 'top', top: 'bottom' };
function je(t) {
  return t.replace(/left|right|bottom|top/g, function (t) {
    return Le[t];
  });
}
var Ne = { start: 'end', end: 'start' };
function Me(t) {
  return t.replace(/start|end/g, function (t) {
    return Ne[t];
  });
}
function ze(t) {
  return { scrollLeft: (t = ne(t)).pageXOffset, scrollTop: t.pageYOffset };
}
function Ie(t) {
  return fe(we(t)).left + ze(t).scrollLeft;
}
function qe(t) {
  var e = (t = me(t)).overflow,
    r = t.overflowX;
  t = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(e + t + r);
}
function De(t) {
  return 0 <= ['html', 'body', '#document'].indexOf(re(t))
    ? t.ownerDocument.body
    : oe(t) && qe(t)
    ? t
    : De(ve(t));
}
function We(t, e) {
  void 0 === e && (e = []);
  t = (n = De(t)) === (null == (t = t.ownerDocument) ? void 0 : t.body);
  var r = ne(n),
    n =
      ((r = t ? [r].concat(r.visualViewport || [], qe(n) ? n : []) : n),
      e.concat(r));
  return t ? n : n.concat(We(ve(r)));
}
function He(t) {
  return Object.assign({}, t, {
    left: t.x,
    top: t.y,
    right: t.x + t.width,
    bottom: t.y + t.height,
  });
}
function Fe(t, e, r) {
  return e === Jt
    ? He(
        (function (t, e) {
          var r,
            n = ne(t),
            s = we(t),
            o = ((n = n.visualViewport), s.clientWidth),
            i = ((s = s.clientHeight), 0),
            a = 0;
          return (
            n &&
              ((o = n.width),
              (s = n.height),
              (r = de()) || (!r && 'fixed' === e)) &&
              ((i = n.offsetLeft), (a = n.offsetTop)),
            { width: o, height: s, x: i + Ie(t), y: a }
          );
        })(t, r)
      )
    : se(e)
    ? (function (t, e) {
        return (
          ((e = fe(t, !1, 'fixed' === e)).top = e.top + t.clientTop),
          (e.left = e.left + t.clientLeft),
          (e.bottom = e.top + t.clientHeight),
          (e.right = e.left + t.clientWidth),
          (e.width = t.clientWidth),
          (e.height = t.clientHeight),
          (e.x = e.left),
          (e.y = e.top),
          e
        );
      })(e, r)
    : He(
        (function (t) {
          var e = we(t),
            r = ze(t),
            n = null == (n = t.ownerDocument) ? void 0 : n.body,
            s = ce(
              e.scrollWidth,
              e.clientWidth,
              n ? n.scrollWidth : 0,
              n ? n.clientWidth : 0
            ),
            o = ce(
              e.scrollHeight,
              e.clientHeight,
              n ? n.scrollHeight : 0,
              n ? n.clientHeight : 0
            );
          return (
            (t = -r.scrollLeft + Ie(t)),
            (r = -r.scrollTop),
            'rtl' === me(n || e).direction &&
              (t += ce(e.clientWidth, n ? n.clientWidth : 0) - s),
            { width: s, height: o, x: t, y: r }
          );
        })(we(t))
      );
}
function Ue(t, e, r, n) {
  return (
    (e =
      'clippingParents' === e
        ? (function (t) {
            var e = We(ve(t)),
              r =
                0 <= ['absolute', 'fixed'].indexOf(me(t).position) && oe(t)
                  ? ke(t)
                  : t;
            return se(r)
              ? e.filter(function (t) {
                  return se(t) && be(t, r) && 'body' !== re(t);
                })
              : [];
          })(t)
        : [].concat(e)),
    (r = (e = [].concat(e, [r]))[0]),
    (e = e.reduce(function (e, r) {
      return (
        (r = Fe(t, r, n)),
        (e.top = ce(r.top, e.top)),
        (e.right = he(r.right, e.right)),
        (e.bottom = he(r.bottom, e.bottom)),
        (e.left = ce(r.left, e.left)),
        e
      );
    }, Fe(t, r, n))),
    (e.width = e.right - e.left),
    (e.height = e.bottom - e.top),
    (e.x = e.left),
    (e.y = e.top),
    e
  );
}
function Ge(t) {
  var e,
    r = t.reference,
    n = t.element,
    s = (t = t.placement) ? le(t) : null,
    o = ((t = t ? Ee(t) : null), r.x + r.width / 2 - n.width / 2),
    i = r.y + r.height / 2 - n.height / 2;
  switch (s) {
    case Dt:
      e = { x: o, y: r.y - n.height };
      break;
    case Wt:
      e = { x: o, y: r.y + r.height };
      break;
    case Ht:
      e = { x: r.x + r.width, y: i };
      break;
    case Ft:
      e = { x: r.x - n.width, y: i };
      break;
    default:
      e = { x: r.x, y: r.y };
  }
  var a = s ? _e(s) : null;
  if (null != a) {
    var l = 'y' === a ? 'height' : 'width';
    switch (t) {
      case Vt:
        e[a] = e[a] - (r[l] / 2 - n[l] / 2);
        break;
      case Yt:
        e[a] = e[a] + (r[l] / 2 - n[l] / 2);
    }
  }
  return e;
}
function Ve(t, e) {
  var r,
    n =
      void 0 === (n = (e = e = void 0 === e ? {} : e).placement)
        ? t.placement
        : n,
    s = void 0 === (s = e.strategy) ? t.strategy : s,
    o = void 0 === (o = e.boundary) ? Xt : o,
    i = void 0 === (i = e.rootBoundary) ? Jt : i,
    a = void 0 === (a = e.elementContext) ? Kt : a,
    l = void 0 !== (l = e.altBoundary) && l,
    c =
      ((e = Oe(
        'number' != typeof (e = void 0 === (e = e.padding) ? 0 : e)
          ? e
          : Se(e, Gt)
      )),
      t.rects.popper),
    h =
      ((l = Ue(
        se((l = t.elements[l ? (a === Kt ? Qt : Kt) : a]))
          ? l
          : l.contextElement || we(t.elements.popper),
        o,
        i,
        s
      )),
      (i = Ge({
        reference: (o = fe(t.elements.reference)),
        element: c,
        strategy: 'absolute',
        placement: n,
      })),
      (s = He(Object.assign({}, c, i))),
      (c = a === Kt ? s : o),
      {
        top: l.top - c.top + e.top,
        bottom: c.bottom - l.bottom + e.bottom,
        left: l.left - c.left + e.left,
        right: c.right - l.right + e.right,
      });
  i = t.modifiersData.offset;
  return (
    a === Kt &&
      i &&
      ((r = i[n]),
      Object.keys(h).forEach(function (t) {
        var e = 0 <= [Ht, Wt].indexOf(t) ? 1 : -1,
          n = 0 <= [Dt, Wt].indexOf(t) ? 'y' : 'x';
        h[t] += r[n] * e;
      })),
    h
  );
}
var Ye = {
  name: 'flip',
  enabled: !0,
  phase: 'main',
  fn: function (t) {
    var e = t.state,
      r = t.options;
    if (((t = t.name), !e.modifiersData[t]._skip)) {
      for (
        var n,
          s = void 0 === (i = r.mainAxis) || i,
          o = void 0 === (i = r.altAxis) || i,
          i = r.fallbackPlacements,
          a = r.padding,
          l = r.boundary,
          c = r.rootBoundary,
          h = r.altBoundary,
          u = void 0 === (n = r.flipVariations) || n,
          p = r.allowedAutoPlacements,
          d =
            ((r = le((n = e.options.placement))),
            (i =
              i ||
              (r !== n && u
                ? (function (t) {
                    var e;
                    return le(t) === Ut ? [] : ((e = je(t)), [Me(t), e, Me(e)]);
                  })(n)
                : [je(n)])),
            [n].concat(i).reduce(function (t, r) {
              return t.concat(
                le(r) === Ut
                  ? (function (t, e) {
                      var r = (e = e = void 0 === e ? {} : e).placement,
                        n = e.boundary,
                        s = e.rootBoundary,
                        o = e.padding,
                        i = e.flipVariations,
                        a = void 0 === (e = e.allowedAutoPlacements) ? te : e,
                        l = Ee(r),
                        c = (r =
                          0 ===
                          (r = (e = l
                            ? i
                              ? Zt
                              : Zt.filter(function (t) {
                                  return Ee(t) === l;
                                })
                            : Gt).filter(function (t) {
                            return 0 <= a.indexOf(t);
                          })).length
                            ? e
                            : r).reduce(function (e, r) {
                          return (
                            (e[r] = Ve(t, {
                              placement: r,
                              boundary: n,
                              rootBoundary: s,
                              padding: o,
                            })[le(r)]),
                            e
                          );
                        }, {});
                      return Object.keys(c).sort(function (t, e) {
                        return c[t] - c[e];
                      });
                    })(e, {
                      placement: r,
                      boundary: l,
                      rootBoundary: c,
                      padding: a,
                      flipVariations: u,
                      allowedAutoPlacements: p,
                    })
                  : r
              );
            }, [])),
          f = e.rects.reference,
          g = e.rects.popper,
          b = new Map(),
          m = !0,
          y = d[0],
          w = 0;
        w < d.length;
        w++
      ) {
        var v = d[w],
          x = le(v),
          k = Ee(v) === Vt,
          _ = (O = 0 <= [Dt, Wt].indexOf(x)) ? 'width' : 'height',
          C = Ve(e, {
            placement: v,
            boundary: l,
            rootBoundary: c,
            altBoundary: h,
            padding: a,
          }),
          O = O ? (k ? Ht : Ft) : k ? Wt : Dt;
        (k = (f[_] > g[_] && (O = je(O)), je(O))), (_ = []);
        if (
          (s && _.push(C[x] <= 0),
          o && _.push(C[O] <= 0, C[k] <= 0),
          _.every(function (t) {
            return t;
          }))
        ) {
          (y = v), (m = !1);
          break;
        }
        b.set(v, _);
      }
      if (m)
        for (
          var S = u ? 3 : 1;
          0 < S &&
          'break' !==
            (function (t) {
              var e = d.find(function (e) {
                if ((e = b.get(e)))
                  return e.slice(0, t).every(function (t) {
                    return t;
                  });
              });
              if (e) return (y = e), 'break';
            })(S);
          S--
        );
      e.placement !== y &&
        ((e.modifiersData[t]._skip = !0), (e.placement = y), (e.reset = !0));
    }
  },
  requiresIfExists: ['offset'],
  data: { _skip: !1 },
};
function Xe(t, e, r) {
  return {
    top: t.top - e.height - (r = void 0 === r ? { x: 0, y: 0 } : r).y,
    right: t.right - e.width + r.x,
    bottom: t.bottom - e.height + r.y,
    left: t.left - e.width - r.x,
  };
}
function Je(t) {
  return [Dt, Ht, Wt, Ft].some(function (e) {
    return 0 <= t[e];
  });
}
var Ke = {
  name: 'hide',
  enabled: !0,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: function (t) {
    var e = t.state,
      r = ((t = t.name), e.rects.reference),
      n = e.rects.popper,
      s = e.modifiersData.preventOverflow,
      o = Ve(e, { elementContext: 'reference' }),
      i = Ve(e, { altBoundary: !0 });
    (o = Xe(o, r)),
      (r = Xe(i, n, s)),
      (i = Je(o)),
      (n = Je(r)),
      (e.modifiersData[t] = {
        referenceClippingOffsets: o,
        popperEscapeOffsets: r,
        isReferenceHidden: i,
        hasPopperEscaped: n,
      }),
      (e.attributes.popper = Object.assign({}, e.attributes.popper, {
        'data-popper-reference-hidden': i,
        'data-popper-escaped': n,
      }));
  },
};
var Qe = {
  name: 'offset',
  enabled: !0,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: function (t) {
    var e = t.state,
      r = t.options,
      n = ((t = t.name), void 0 === (r = r.offset) ? [0, 0] : r),
      s =
        ((r = te.reduce(function (t, r) {
          return (
            (t[r] = (function (t, e, r) {
              var n = le(t),
                s = 0 <= [Ft, Dt].indexOf(n) ? -1 : 1;
              return (
                (t =
                  (e =
                    'function' == typeof r
                      ? r(Object.assign({}, e, { placement: t }))
                      : r)[0] || 0),
                (r = (e[1] || 0) * s),
                0 <= [Ft, Ht].indexOf(n) ? { x: r, y: t } : { x: t, y: r }
              );
            })(r, e.rects, n)),
            t
          );
        }, {})),
        (o = r[e.placement]).x),
      o = o.y;
    null != e.modifiersData.popperOffsets &&
      ((e.modifiersData.popperOffsets.x += s),
      (e.modifiersData.popperOffsets.y += o)),
      (e.modifiersData[t] = r);
  },
};
var Ze = {
  name: 'popperOffsets',
  enabled: !0,
  phase: 'read',
  fn: function (t) {
    var e = t.state;
    (t = t.name),
      (e.modifiersData[t] = Ge({
        reference: e.rects.reference,
        element: e.rects.popper,
        strategy: 'absolute',
        placement: e.placement,
      }));
  },
  data: {},
};
var tr = {
  name: 'preventOverflow',
  enabled: !0,
  phase: 'main',
  fn: function (t) {
    var e,
      r,
      n,
      s,
      o,
      i,
      a,
      l,
      c,
      h = t.state,
      u = t.options,
      p = ((t = t.name), void 0 === (p = u.mainAxis) || p),
      d = void 0 !== (d = u.altAxis) && d,
      f = u.boundary,
      g = u.rootBoundary,
      b = u.altBoundary,
      m = u.padding,
      y = void 0 === (y = u.tether) || y,
      w =
        ((u = void 0 === (u = u.tetherOffset) ? 0 : u),
        (f = Ve(h, {
          boundary: f,
          rootBoundary: g,
          padding: m,
          altBoundary: b,
        })),
        (g = le(h.placement)),
        (b = !(m = Ee(h.placement))),
        _e(g)),
      v = (function (t) {
        return 'x' === t ? 'y' : 'x';
      })(w),
      x = h.modifiersData.popperOffsets,
      k = h.rects.reference,
      _ = h.rects.popper,
      C =
        ((u =
          'number' ==
          typeof (u =
            'function' == typeof u
              ? u(Object.assign({}, h.rects, { placement: h.placement }))
              : u)
            ? { mainAxis: u, altAxis: u }
            : Object.assign({ mainAxis: 0, altAxis: 0 }, u)),
        h.modifiersData.offset ? h.modifiersData.offset[h.placement] : null),
      O = { x: 0, y: 0 };
    x &&
      (p &&
        ((p = 'y' === w ? 'height' : 'width'),
        (l = (e = x[w]) + f[(s = 'y' === w ? Dt : Ft)]),
        (c = e - f[(r = 'y' === w ? Wt : Ht)]),
        (n = y ? -_[p] / 2 : 0),
        (i = (m === Vt ? k : _)[p]),
        (m = m === Vt ? -_[p] : -k[p]),
        (a = h.elements.arrow),
        (a = y && a ? ge(a) : { width: 0, height: 0 }),
        (s = (o = h.modifiersData['arrow#persistent']
          ? h.modifiersData['arrow#persistent'].padding
          : { top: 0, right: 0, bottom: 0, left: 0 })[s]),
        (o = o[r]),
        (r = Ce(0, k[p], a[p])),
        (a = b ? k[p] / 2 - n - r - s - u.mainAxis : i - r - s - u.mainAxis),
        (i = b ? -k[p] / 2 + n + r + o + u.mainAxis : m + r + o + u.mainAxis),
        (b = (s = h.elements.arrow && ke(h.elements.arrow))
          ? 'y' === w
            ? s.clientTop || 0
            : s.clientLeft || 0
          : 0),
        (m = e + i - (n = null != (p = null == C ? void 0 : C[w]) ? p : 0)),
        (r = Ce(y ? he(l, e + a - n - b) : l, e, y ? ce(c, m) : c)),
        (x[w] = r),
        (O[w] = r - e)),
      d &&
        ((o = 'y' === v ? 'height' : 'width'),
        (i = (s = x[v]) + f['x' === w ? Dt : Ft]),
        (p = s - f['x' === w ? Wt : Ht]),
        (a = -1 !== [Dt, Ft].indexOf(g)),
        (b = null != (n = null == C ? void 0 : C[v]) ? n : 0),
        (l = a ? i : s - k[o] - _[o] - b + u.altAxis),
        (m = a ? s + k[o] + _[o] - b - u.altAxis : p),
        (c =
          y && a
            ? (function (t, e, r) {
                return r < (t = Ce(t, e, r)) ? r : t;
              })(l, s, m)
            : Ce(y ? l : i, s, y ? m : p)),
        (x[v] = c),
        (O[v] = c - s)),
      (h.modifiersData[t] = O));
  },
  requiresIfExists: ['offset'],
};
function er(t) {
  return { scrollLeft: t.scrollLeft, scrollTop: t.scrollTop };
}
function rr(t, e, r) {
  void 0 === r && (r = !1);
  var n = oe(e),
    s =
      oe(e) &&
      (function (t) {
        var e = t.getBoundingClientRect(),
          r = ue(e.width) / t.offsetWidth || 1;
        return (e = ue(e.height) / t.offsetHeight || 1), 1 !== r || 1 !== e;
      })(e),
    o = we(e),
    i =
      ((t = fe(t, s, r)),
      (s = { scrollLeft: 0, scrollTop: 0 }),
      { x: 0, y: 0 });
  return (
    (!n && r) ||
      (('body' === re(e) && !qe(o)) ||
        (s = (function (t) {
          return (t !== ne(t) && oe(t) ? er : ze)(t);
        })(e)),
      oe(e)
        ? (((i = fe(e, !0)).x += e.clientLeft), (i.y += e.clientTop))
        : o && (i.x = Ie(o))),
    {
      x: t.left + s.scrollLeft - i.x,
      y: t.top + s.scrollTop - i.y,
      width: t.width,
      height: t.height,
    }
  );
}
function nr(t) {
  var e = (function (t) {
    var e = new Map(),
      r = new Set(),
      n = [];
    return (
      t.forEach(function (t) {
        e.set(t.name, t);
      }),
      t.forEach(function (t) {
        r.has(t.name) ||
          (function t(s) {
            r.add(s.name),
              []
                .concat(s.requires || [], s.requiresIfExists || [])
                .forEach(function (n) {
                  r.has(n) || ((n = e.get(n)) && t(n));
                }),
              n.push(s);
          })(t);
      }),
      n
    );
  })(t);
  return ee.reduce(function (t, r) {
    return t.concat(
      e.filter(function (t) {
        return t.phase === r;
      })
    );
  }, []);
}
function sr(t) {
  var e;
  return function () {
    return (e =
      e ||
      new Promise(function (r) {
        Promise.resolve().then(function () {
          (e = void 0), r(t());
        });
      }));
  };
}
var or = { placement: 'bottom', modifiers: [], strategy: 'absolute' };
function ir() {
  for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
    e[r] = arguments[r];
  return !e.some(function (t) {
    return !(t && 'function' == typeof t.getBoundingClientRect);
  });
}
var ar,
  lr,
  cr,
  hr,
  ur,
  pr,
  dr =
    ((ur =
      void 0 ===
      (hr = (cr = cr =
        void 0 ===
        (cr = { defaultModifiers: [Be, Ze, Re, ae, Qe, Ye, tr, Ae, Ke] })
          ? {}
          : cr).defaultModifiers)
        ? []
        : hr),
    (pr = void 0 === (hr = cr.defaultOptions) ? or : hr),
    function (t, e, r) {
      void 0 === r && (r = pr);
      var n = {
          placement: 'bottom',
          orderedModifiers: [],
          options: Object.assign({}, or, pr),
          modifiersData: {},
          elements: { reference: t, popper: e },
          attributes: {},
          styles: {},
        },
        s = [],
        o = !1,
        i = {
          state: n,
          setOptions: function (r) {
            return (
              (r = 'function' == typeof r ? r(n.options) : r),
              a(),
              (n.options = Object.assign({}, pr, n.options, r)),
              (n.scrollParents = {
                reference: se(t)
                  ? We(t)
                  : t.contextElement
                  ? We(t.contextElement)
                  : [],
                popper: We(e),
              }),
              (r = nr(
                (function (t) {
                  var e = t.reduce(function (t, e) {
                    var r = t[e.name];
                    return (
                      (t[e.name] = r
                        ? Object.assign({}, r, e, {
                            options: Object.assign({}, r.options, e.options),
                            data: Object.assign({}, r.data, e.data),
                          })
                        : e),
                      t
                    );
                  }, {});
                  return Object.keys(e).map(function (t) {
                    return e[t];
                  });
                })([].concat(ur, n.options.modifiers))
              )),
              (n.orderedModifiers = r.filter(function (t) {
                return t.enabled;
              })),
              n.orderedModifiers.forEach(function (t) {
                var e = t.name,
                  r = t.options;
                'function' == typeof (t = t.effect) &&
                  ((t = t({
                    state: n,
                    name: e,
                    instance: i,
                    options: void 0 === r ? {} : r,
                  })),
                  s.push(t || function () {}));
              }),
              i.update()
            );
          },
          forceUpdate: function () {
            if (!o) {
              var t,
                e = (t = n.elements).reference;
              if (ir(e, (t = t.popper))) {
                (n.rects = {
                  reference: rr(e, ke(t), 'fixed' === n.options.strategy),
                  popper: ge(t),
                }),
                  (n.reset = !1),
                  (n.placement = n.options.placement),
                  n.orderedModifiers.forEach(function (t) {
                    return (n.modifiersData[t.name] = Object.assign(
                      {},
                      t.data
                    ));
                  });
                for (var r, s, a, l = 0; l < n.orderedModifiers.length; l++)
                  !0 === n.reset
                    ? ((n.reset = !1), (l = -1))
                    : ((r = (a = n.orderedModifiers[l]).fn),
                      (s = a.options),
                      (a = a.name),
                      'function' == typeof r &&
                        (n =
                          r({
                            state: n,
                            options: void 0 === s ? {} : s,
                            name: a,
                            instance: i,
                          }) || n));
              }
            }
          },
          update: sr(function () {
            return new Promise(function (t) {
              i.forceUpdate(), t(n);
            });
          }),
          destroy: function () {
            a(), (o = !0);
          },
        };
      return (
        ir(t, e) &&
          i.setOptions(r).then(function (t) {
            !o && r.onFirstUpdate && r.onFirstUpdate(t);
          }),
        i
      );
      function a() {
        s.forEach(function (t) {
          return t();
        }),
          (s = []);
      }
    });
const fr = nt(
  '<div class="flex flex-wrap"><div class="w-full sm:w-6/12 md:w-4/12 px-4"><div class="relative inline-flex align-middle w-full"><button class="text-white font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 bg-slate-700 ease-linear transition-all duration-150" type="button"></button><div id="dropdown-id" style="min-width:12rem"><a class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700">Tell me about my building</a><a class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700">What can I do to get into compliance?</a><a class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-slate-700">What type of projects to you recommend I start?'
);
function gr(t) {
  let e;
  const [r, n] = x(!1);
  let s = null;
  const o = () => {
    n(!1);
  };
  {
    const i = fr(),
      a = i.firstChild.firstChild.firstChild,
      l = a.nextSibling,
      c = l.firstChild,
      h = c.nextSibling,
      u = h.nextSibling;
    (a.$$click = (t) => {
      t.preventDefault(),
        (t = t.currentTarget),
        (s = dr(t, e, { placement: 'top-end' })),
        n(!r()),
        A(() => {
          s && (s.destroy(), (s = null));
        });
    }),
      ct(a, W(Lt, {}));
    return (
      'function' == typeof e ? lt(e, l) : (e = l),
      (c.$$click = (e) => {
        t.onInput('Tell me about my building'), o();
      }),
      (h.$$click = (e) => {
        t.onInput('What can I do to get into compliance?'), o();
      }),
      (u.$$click = (e) => {
        t.onInput('What type of projects to you recommend I start?'), o();
      }),
      k(() =>
        it(
          l,
          (r() ? 'block' : 'hidden') +
            ' bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mb-1'
        )
      ),
      i
    );
  }
}
st(['click']);
const br = nt('<span>Send'),
  mr = nt(
    '<div class="flex items-end justify-between chatbot-input" data-testid="input">'
  ),
  yr = (t) => {
    const [e, r] = x(t.defaultValue ?? '');
    let n;
    const s = (t) => r(t),
      o = () => {
        '' !== e() && n?.reportValidity() && t.onSubmit(e()), r('');
      },
      i = (t) => {
        r(t), o();
      },
      a = (t) => {
        var e = t.isComposing || 229 === t.keyCode;
        'Enter' !== t.key || e || o();
      };
    S(() => {
      !It() && n && n.focus();
    });
    {
      const r = mr();
      return (
        (r.$$keydown = a),
        r.style.setProperty('border-top', '1px solid #eeeeee'),
        r.style.setProperty('position', 'absolute'),
        r.style.setProperty('left', '20px'),
        r.style.setProperty('right', '20px'),
        r.style.setProperty('bottom', '40px'),
        r.style.setProperty('margin', 'auto'),
        r.style.setProperty('z-index', '1000'),
        ct(r, W(gr, { onInput: i }), null),
        ct(
          r,
          W(Pt, {
            ref(t) {
              'function' == typeof n ? n(t) : (n = t);
            },
            onInput: s,
            get value() {
              return e();
            },
            get fontSize() {
              return t.fontSize;
            },
            get placeholder() {
              return t.placeholder ?? 'Type your question';
            },
          }),
          null
        ),
        ct(
          r,
          W(Mt, {
            get sendButtonColor() {
              return t.sendButtonColor;
            },
            type: 'button',
            get isDisabled() {
              return '' === e();
            },
            class: 'my-2 ml-2',
            'on:click': o,
            get children() {
              var t = br();
              return (
                t.style.setProperty('font-family', 'Poppins, sans-serif'), t
              );
            },
          }),
          null
        ),
        k(
          (e) => {
            var n = t.backgroundColor ?? '#ffffff',
              s = t.textColor ?? '#303235';
            return (
              n !== e._v$ &&
                (null != (e._v$ = n)
                  ? r.style.setProperty('background-color', n)
                  : r.style.removeProperty('background-color')),
              s !== e._v$2 &&
                (null != (e._v$2 = s)
                  ? r.style.setProperty('color', s)
                  : r.style.removeProperty('color')),
              e
            );
          },
          { _v$: void 0, _v$2: void 0 }
        ),
        r
      );
    }
  },
  wr =
    (st(['keydown']),
    nt(
      '<figure data-testid="default-avatar"><svg width="75" height="75" viewBox="0 0 75 75" fill="none" xmlns="http://www.w3.org/2000/svg"><mask id="mask0" x="0" y="0" mask-type="alpha"><circle cx="37.5" cy="37.5" r="37.5" fill="#0042DA"></circle></mask><g mask="url(#mask0)"><rect x="-30" y="-43" width="131" height="154" fill="#0042DA"></rect><rect x="2.50413" y="120.333" width="81.5597" height="86.4577" rx="2.5" transform="rotate(-52.6423 2.50413 120.333)" stroke="#FED23D" stroke-width="5"></rect><circle cx="76.5" cy="-1.5" r="29" stroke="#FF8E20" stroke-width="5"></circle><path d="M-49.8224 22L-15.5 -40.7879L18.8224 22H-49.8224Z" stroke="#F7F8FF" stroke-width="5">'
    )),
  vr = () => {
    {
      const t = wr(),
        e = t.firstChild;
      return (
        k(
          (r) => {
            var n =
                'flex justify-center items-center rounded-full text-white relative ' +
                (It() ? 'w-6 h-6 text-sm' : 'w-10 h-10 text-xl'),
              s =
                'absolute top-0 left-0 ' +
                (It() ? ' w-6 h-6 text-sm' : 'w-full h-full text-xl');
            return (
              n !== r._v$ && it(t, (r._v$ = n)),
              s !== r._v$2 && ot(e, 'class', (r._v$2 = s)),
              r
            );
          },
          { _v$: void 0, _v$2: void 0 }
        ),
        t
      );
    }
  },
  xr = nt(
    '<figure><img alt="Bot avatar" class="rounded-full object-cover w-full h-full">'
  ),
  kr = (t) => {
    const [e, r] = x(t.initialAvatarSrc);
    return (
      _(() => {
        e()?.startsWith('{{') &&
          t.initialAvatarSrc?.startsWith('http') &&
          r(t.initialAvatarSrc);
      }),
      W(X, {
        get when() {
          return ((t) => null != t && '' !== t)(e());
        },
        keyed: !0,
        get fallback() {
          return W(vr, {});
        },
        get children() {
          const t = xr(),
            r = t.firstChild;
          return (
            k(
              (n) => {
                var s =
                    'flex justify-center items-center rounded-full text-white relative flex-shrink-0 ' +
                    (It() ? 'w-6 h-6 text-sm' : 'w-10 h-10 text-xl'),
                  o = e();
                return (
                  s !== n._v$ && it(t, (n._v$ = s)),
                  o !== n._v$2 && ot(r, 'src', (n._v$2 = o)),
                  n
                );
              },
              { _v$: void 0, _v$2: void 0 }
            ),
            t
          );
        },
      })
    );
  };
class _r {
  source;
  flags;
  constructor(t, e = '') {
    (this.source = t.source), (this.flags = e);
  }
  setGroup(t, e) {
    let r = 'string' == typeof e ? e : e.source;
    return (
      (r = r.replace(/(^|[^\[])\^/g, '$1')),
      (this.source = this.source.replace(t, r)),
      this
    );
  }
  getRegexp() {
    return new RegExp(this.source, this.flags);
  }
}
const Cr = /[&<>"']/,
  Or = /[&<>"']/g,
  Sr = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' },
  Ar = /[<>"']|&(?!#?\w+;)/,
  Er = /[<>"']|&(?!#?\w+;)/g;
function Tr(t, e) {
  if (e) {
    if (Cr.test(t)) return t.replace(Or, (t) => Sr[t]);
  } else if (Ar.test(t)) return t.replace(Er, (t) => Sr[t]);
  return t;
}
function Pr(t) {
  return t.replace(
    /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi,
    function (t, e) {
      return 'colon' === (e = e.toLowerCase())
        ? ':'
        : '#' === e.charAt(0)
        ? 'x' === e.charAt(1)
          ? String.fromCharCode(parseInt(e.substring(2), 16))
          : String.fromCharCode(+e.substring(1))
        : '';
    }
  );
}
!(function (t) {
  (t[(t.space = 1)] = 'space'),
    (t[(t.text = 2)] = 'text'),
    (t[(t.paragraph = 3)] = 'paragraph'),
    (t[(t.heading = 4)] = 'heading'),
    (t[(t.listStart = 5)] = 'listStart'),
    (t[(t.listEnd = 6)] = 'listEnd'),
    (t[(t.looseItemStart = 7)] = 'looseItemStart'),
    (t[(t.looseItemEnd = 8)] = 'looseItemEnd'),
    (t[(t.listItemStart = 9)] = 'listItemStart'),
    (t[(t.listItemEnd = 10)] = 'listItemEnd'),
    (t[(t.blockquoteStart = 11)] = 'blockquoteStart'),
    (t[(t.blockquoteEnd = 12)] = 'blockquoteEnd'),
    (t[(t.code = 13)] = 'code'),
    (t[(t.table = 14)] = 'table'),
    (t[(t.html = 15)] = 'html'),
    (t[(t.hr = 16)] = 'hr');
})((ar = ar || {}));
class Rr {
  gfm = !0;
  tables = !0;
  breaks = !1;
  pedantic = !1;
  sanitize = !1;
  sanitizer;
  mangle = !0;
  smartLists = !1;
  silent = !1;
  highlight;
  langPrefix = 'lang-';
  smartypants = !1;
  headerPrefix = '';
  renderer;
  xhtml = !1;
  escape = Tr;
  unescape = Pr;
  isNoP;
}
class $r {
  options;
  constructor(t) {
    this.options = t || jr.options;
  }
  code(t, e, r, n) {
    this.options.highlight &&
      null != (s = this.options.highlight(t, e)) &&
      s !== t &&
      ((r = !0), (t = s));
    var s = r ? t : this.options.escape(t, !0);
    return e
      ? `\n<pre><code class="${
          this.options.langPrefix + this.options.escape(e, !0)
        }">${s}\n</code></pre>\n`
      : `\n<pre><code>${s}\n</code></pre>\n`;
  }
  blockquote(t) {
    return `<blockquote>\n${t}</blockquote>\n`;
  }
  html(t) {
    return t;
  }
  heading(t, e, r) {
    return `<h${e} id="${
      this.options.headerPrefix + r.toLowerCase().replace(/[^\w]+/g, '-')
    }">${t}</h${e}>\n`;
  }
  hr() {
    return this.options.xhtml ? '<hr/>\n' : '<hr>\n';
  }
  list(t, e) {
    return `\n<${(e = e ? 'ol' : 'ul')}>\n${t}</${e}>\n`;
  }
  listitem(t) {
    return '<li>' + t + '</li>\n';
  }
  paragraph(t) {
    return '<p>' + t + '</p>\n';
  }
  table(t, e) {
    return `\n<table>\n<thead>\n${t}</thead>\n<tbody>\n${e}</tbody>\n</table>\n`;
  }
  tablerow(t) {
    return '<tr>\n' + t + '</tr>\n';
  }
  tablecell(t, e) {
    var r = e.header ? 'th' : 'td';
    return (
      (e.align
        ? '<' + r + ' style="text-align:' + e.align + '">'
        : '<' + r + '>') +
      t +
      '</' +
      r +
      '>\n'
    );
  }
  strong(t) {
    return '<strong>' + t + '</strong>';
  }
  em(t) {
    return '<em>' + t + '</em>';
  }
  codespan(t) {
    return '<code>' + t + '</code>';
  }
  br() {
    return this.options.xhtml ? '<br/>' : '<br>';
  }
  del(t) {
    return '<del>' + t + '</del>';
  }
  link(t, e, r) {
    if (this.options.sanitize) {
      let n;
      try {
        n = decodeURIComponent(this.options.unescape(t))
          .replace(/[^\w:]/g, '')
          .toLowerCase();
      } catch (e) {
        return r;
      }
      if (
        0 === n.indexOf('javascript:') ||
        0 === n.indexOf('vbscript:') ||
        0 === n.indexOf('data:')
      )
        return r;
    }
    let n = '<a href="' + t + '"';
    return e && (n += ' title="' + e + '"'), n + '>' + r + '</a>';
  }
  image(t, e, r) {
    let n = '<img src="' + t + '" alt="' + r + '"';
    return (
      e && (n += ' title="' + e + '"'), n + (this.options.xhtml ? '/>' : '>')
    );
  }
  text(t) {
    return t;
  }
}
class Br {
  staticThis;
  links;
  options;
  static rulesBase = null;
  static rulesPedantic = null;
  static rulesGfm = null;
  static rulesBreaks = null;
  rules;
  renderer;
  inLink;
  hasRulesGfm;
  ruleCallbacks;
  constructor(t, e, r = jr.options, n) {
    if (
      ((this.staticThis = t),
      (this.links = e),
      (this.options = r),
      (this.renderer = n || this.options.renderer || new $r(this.options)),
      !this.links)
    )
      throw new Error("InlineLexer requires 'links' parameter.");
    this.setRules();
  }
  static output(t, e, r) {
    return new this(this, e, r).output(t);
  }
  static getRulesBase() {
    var t;
    return (
      this.rulesBase ||
      (((t = {
        escape: /^\\([\\`*{}\[\]()#+\-.!_>])/,
        autolink: /^<([^ <>]+(@|:\/)[^ <>]+)>/,
        tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^<'">])*?>/,
        link: /^!?\[(inside)\]\(href\)/,
        reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
        nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
        strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
        em: /^\b_((?:[^_]|__)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
        code: /^(`+)([\s\S]*?[^`])\1(?!`)/,
        br: /^ {2,}\n(?!\s*$)/,
        text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/,
        _inside: /(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/,
        _href: /\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/,
      }).link = new _r(t.link)
        .setGroup('inside', t._inside)
        .setGroup('href', t._href)
        .getRegexp()),
      (t.reflink = new _r(t.reflink).setGroup('inside', t._inside).getRegexp()),
      (this.rulesBase = t))
    );
  }
  static getRulesPedantic() {
    return (
      this.rulesPedantic ||
      (this.rulesPedantic = {
        ...this.getRulesBase(),
        strong:
          /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
        em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,
      })
    );
  }
  static getRulesGfm() {
    var t, e, r;
    return (
      this.rulesGfm ||
      ((t = this.getRulesBase()),
      (e = new _r(t.escape).setGroup('])', '~|])').getRegexp()),
      (r = new _r(t.text)
        .setGroup(']|', '~]|')
        .setGroup('|', '|https?://|')
        .getRegexp()),
      (this.rulesGfm = {
        ...t,
        escape: e,
        url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
        del: /^~~(?=\S)([\s\S]*?\S)~~/,
        text: r,
      }))
    );
  }
  static getRulesBreaks() {
    var t, e;
    return (
      this.rulesBreaks ||
      ((t = this.getRulesGfm()),
      (e = this.getRulesGfm()),
      (this.rulesBreaks = {
        ...e,
        br: new _r(t.br).setGroup('{2,}', '*').getRegexp(),
        text: new _r(e.text).setGroup('{2,}', '*').getRegexp(),
      }))
    );
  }
  setRules() {
    this.options.gfm
      ? this.options.breaks
        ? (this.rules = this.staticThis.getRulesBreaks())
        : (this.rules = this.staticThis.getRulesGfm())
      : this.options.pedantic
      ? (this.rules = this.staticThis.getRulesPedantic())
      : (this.rules = this.staticThis.getRulesBase()),
      (this.hasRulesGfm = void 0 !== this.rules.url);
  }
  output(t) {
    let e,
      r = '';
    for (; t; )
      if ((e = this.rules.escape.exec(t)))
        (t = t.substring(e[0].length)), (r += e[1]);
      else if ((e = this.rules.autolink.exec(t))) {
        let n, s;
        (t = t.substring(e[0].length)),
          (s =
            '@' === e[2]
              ? ((n = this.options.escape(
                  ':' === e[1].charAt(6)
                    ? this.mangle(e[1].substring(7))
                    : this.mangle(e[1])
                )),
                this.mangle('mailto:') + n)
              : (n = this.options.escape(e[1]))),
          (r += this.renderer.link(s, null, n));
      } else if (
        !this.inLink &&
        this.hasRulesGfm &&
        (e = this.rules.url.exec(t))
      ) {
        t = t.substring(e[0].length);
        var n = this.options.escape(e[1]);
        r += this.renderer.link(n, null, n);
      } else if ((e = this.rules.tag.exec(t)))
        !this.inLink && /^<a /i.test(e[0])
          ? (this.inLink = !0)
          : this.inLink && /^<\/a>/i.test(e[0]) && (this.inLink = !1),
          (t = t.substring(e[0].length)),
          (r += this.options.sanitize
            ? this.options.sanitizer
              ? this.options.sanitizer(e[0])
              : this.options.escape(e[0])
            : e[0]);
      else if ((e = this.rules.link.exec(t)))
        (t = t.substring(e[0].length)),
          (this.inLink = !0),
          (r += this.outputLink(e, { href: e[2], title: e[3] })),
          (this.inLink = !1);
      else if (
        (e = (e = this.rules.reflink.exec(t)) || this.rules.nolink.exec(t))
      ) {
        t = t.substring(e[0].length);
        n = (e[2] || e[1]).replace(/\s+/g, ' ');
        var s = this.links[n.toLowerCase()];
        s && s.href
          ? ((this.inLink = !0),
            (r += this.outputLink(e, s)),
            (this.inLink = !1))
          : ((r += e[0].charAt(0)), (t = e[0].substring(1) + t));
      } else if ((e = this.rules.strong.exec(t)))
        (t = t.substring(e[0].length)),
          (r += this.renderer.strong(this.output(e[2] || e[1])));
      else if ((e = this.rules.em.exec(t)))
        (t = t.substring(e[0].length)),
          (r += this.renderer.em(this.output(e[2] || e[1])));
      else if ((e = this.rules.code.exec(t)))
        (t = t.substring(e[0].length)),
          (r += this.renderer.codespan(this.options.escape(e[2].trim(), !0)));
      else if ((e = this.rules.br.exec(t)))
        (t = t.substring(e[0].length)), (r += this.renderer.br());
      else if (this.hasRulesGfm && (e = this.rules.del.exec(t)))
        (t = t.substring(e[0].length)),
          (r += this.renderer.del(this.output(e[1])));
      else if ((e = this.rules.text.exec(t)))
        (t = t.substring(e[0].length)),
          (r += this.renderer.text(
            this.options.escape(this.smartypants(e[0]))
          ));
      else if (t) throw new Error('Infinite loop on byte: ' + t.charCodeAt(0));
    return r;
  }
  outputLink(t, e) {
    var r = this.options.escape(e.href);
    e = e.title ? this.options.escape(e.title) : null;
    return '!' !== t[0].charAt(0)
      ? this.renderer.link(r, e, this.output(t[1]))
      : this.renderer.image(r, e, this.options.escape(t[1]));
  }
  smartypants(t) {
    return this.options.smartypants
      ? t
          .replace(/---/g, '—')
          .replace(/--/g, '–')
          .replace(/(^|[-\u2014/([{"\s])'/g, '$1‘')
          .replace(/'/g, '’')
          .replace(/(^|[-\u2014/([{\u2018\s])"/g, '$1“')
          .replace(/"/g, '”')
          .replace(/\.{3}/g, '…')
      : t;
  }
  mangle(t) {
    if (!this.options.mangle) return t;
    let e = '';
    var r = t.length;
    for (let n = 0; n < r; n++) {
      let r;
      0.5 < Math.random() && (r = 'x' + t.charCodeAt(n).toString(16)),
        (e += '&#' + r + ';');
    }
    return e;
  }
}
class Lr {
  simpleRenderers = [];
  tokens;
  token;
  inlineLexer;
  options;
  renderer;
  line = 0;
  constructor(t) {
    (this.tokens = []),
      (this.token = null),
      (this.options = t || jr.options),
      (this.renderer = this.options.renderer || new $r(this.options));
  }
  static parse(t, e, r) {
    return new this(r).parse(e, t);
  }
  parse(t, e) {
    (this.inlineLexer = new Br(Br, t, this.options, this.renderer)),
      (this.tokens = e.reverse());
    let r = '';
    for (; this.next(); ) r += this.tok();
    return r;
  }
  debug(t, e) {
    (this.inlineLexer = new Br(Br, t, this.options, this.renderer)),
      (this.tokens = e.reverse());
    let r = '';
    for (; this.next(); ) {
      var n = this.tok();
      (this.token.line = this.line += n.split('\n').length - 1), (r += n);
    }
    return r;
  }
  next() {
    return (this.token = this.tokens.pop());
  }
  getNextElement() {
    return this.tokens[this.tokens.length - 1];
  }
  parseText() {
    let t = this.token.text;
    for (var e; (e = this.getNextElement()) && e.type == ar.text; )
      t += '\n' + this.next().text;
    return this.inlineLexer.output(t);
  }
  tok() {
    switch (this.token.type) {
      case ar.space:
        return '';
      case ar.paragraph:
        return this.renderer.paragraph(
          this.inlineLexer.output(this.token.text)
        );
      case ar.text:
        return this.options.isNoP
          ? this.parseText()
          : this.renderer.paragraph(this.parseText());
      case ar.heading:
        return this.renderer.heading(
          this.inlineLexer.output(this.token.text),
          this.token.depth,
          this.token.text
        );
      case ar.listStart: {
        let e = '';
        for (var t = this.token.ordered; this.next().type != ar.listEnd; )
          e += this.tok();
        return this.renderer.list(e, t);
      }
      case ar.listItemStart: {
        let t = '';
        for (; this.next().type != ar.listItemEnd; )
          t += this.token.type == ar.text ? this.parseText() : this.tok();
        return this.renderer.listitem(t);
      }
      case ar.looseItemStart: {
        let t = '';
        for (; this.next().type != ar.listItemEnd; ) t += this.tok();
        return this.renderer.listitem(t);
      }
      case ar.code:
        return this.renderer.code(
          this.token.text,
          this.token.lang,
          this.token.escaped,
          this.token.meta
        );
      case ar.table: {
        t = '';
        let n,
          s = '';
        n = '';
        for (let t = 0; t < this.token.header.length; t++) {
          var e = { header: !0, align: this.token.align[t] },
            r = this.inlineLexer.output(this.token.header[t]);
          n += this.renderer.tablecell(r, e);
        }
        t += this.renderer.tablerow(n);
        for (const t of this.token.cells) {
          n = '';
          for (let e = 0; e < t.length; e++)
            n += this.renderer.tablecell(this.inlineLexer.output(t[e]), {
              header: !1,
              align: this.token.align[e],
            });
          s += this.renderer.tablerow(n);
        }
        return this.renderer.table(t, s);
      }
      case ar.blockquoteStart: {
        let t = '';
        for (; this.next().type != ar.blockquoteEnd; ) t += this.tok();
        return this.renderer.blockquote(t);
      }
      case ar.hr:
        return this.renderer.hr();
      case ar.html:
        return (
          (t =
            this.token.pre || this.options.pedantic
              ? this.token.text
              : this.inlineLexer.output(this.token.text)),
          this.renderer.html(t)
        );
      default:
        if (this.simpleRenderers.length)
          for (let t = 0; t < this.simpleRenderers.length; t++)
            if (this.token.type == 'simpleRule' + (t + 1))
              return this.simpleRenderers[t].call(
                this.renderer,
                this.token.execArr
              );
        if (
          ((t = `Token with "${this.token.type}" type was not found.`),
          !this.options.silent)
        )
          throw new Error(t);
        console.log(t);
    }
  }
}
class jr {
  static options = new Rr();
  static simpleRenderers = [];
  static setOptions(t) {
    return Object.assign(this.options, t), this;
  }
  static setBlockRule(t, e = () => '') {
    return Nr.simpleRules.push(t), this.simpleRenderers.push(e), this;
  }
  static parse(t, e) {
    try {
      e = { ...this.options, ...e };
      var { tokens: r, links: n } = this.callBlockLexer(t, e);
      return this.callParser(r, n, e);
    } catch (t) {
      return this.callMe(t);
    }
  }
  static debug(t, e = this.options) {
    var { tokens: t, links: r } = this.callBlockLexer(t, e);
    let n = t.slice();
    return (
      ((e = new Lr(e)).simpleRenderers = this.simpleRenderers),
      (e = e.debug(r, t)),
      {
        tokens: (n = n.map((t) => {
          t.type = ar[t.type] || t.type;
          var e = t.line;
          return delete t.line, e ? { line: e, ...t } : t;
        })),
        links: r,
        result: e,
      }
    );
  }
  static callBlockLexer(t = '', e) {
    if ('string' != typeof t)
      throw new Error(
        `Expected that the 'src' parameter would have a 'string' type, got '${typeof t}'`
      );
    return (
      (t = t
        .replace(/\r\n|\r/g, '\n')
        .replace(/\t/g, '    ')
        .replace(/\u00a0/g, ' ')
        .replace(/\u2424/g, '\n')
        .replace(/^ +$/gm, '')),
      Nr.lex(t, e, !0)
    );
  }
  static callParser(t, e, r) {
    var n;
    return this.simpleRenderers.length
      ? (((n = new Lr(r)).simpleRenderers = this.simpleRenderers),
        n.parse(e, t))
      : Lr.parse(t, e, r);
  }
  static callMe(t) {
    if (
      ((t.message +=
        '\nPlease report this to https://github.com/ts-stack/markdown'),
      this.options.silent)
    )
      return (
        '<p>An error occured:</p><pre>' +
        this.options.escape(t.message + '', !0) +
        '</pre>'
      );
    throw t;
  }
}
class Nr {
  staticThis;
  static simpleRules = [];
  static rulesBase = null;
  static rulesGfm = null;
  static rulesTables = null;
  rules;
  options;
  links = {};
  tokens = [];
  hasRulesGfm;
  hasRulesTables;
  constructor(t, e) {
    (this.staticThis = t), (this.options = e || jr.options), this.setRules();
  }
  static lex(t, e, r, n) {
    return new this(this, e).getTokens(t, r, n);
  }
  static getRulesBase() {
    var t, e;
    return (
      this.rulesBase ||
      (((t = {
        newline: /^\n+/,
        code: /^( {4}[^\n]+\n*)+/,
        hr: /^( *[-*_]){3,} *(?:\n+|$)/,
        heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
        lheading: /^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,
        blockquote: /^( *>[^\n]+(\n[^\n]+)*\n*)+/,
        list: /^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
        html: /^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,
        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
        paragraph:
          /^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,
        text: /^[^\n]+/,
        bullet: /(?:[*+-]|\d+\.)/,
        item: /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/,
      }).item = new _r(t.item, 'gm').setGroup(/bull/g, t.bullet).getRegexp()),
      (t.list = new _r(t.list)
        .setGroup(/bull/g, t.bullet)
        .setGroup('hr', '\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))')
        .setGroup('def', '\\n+(?=' + t.def.source + ')')
        .getRegexp()),
      (e =
        '(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b'),
      (t.html = new _r(t.html)
        .setGroup('comment', /<!--[\s\S]*?-->/)
        .setGroup('closed', /<(tag)[\s\S]+?<\/\1>/)
        .setGroup('closing', /<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)
        .setGroup(/tag/g, e)
        .getRegexp()),
      (t.paragraph = new _r(t.paragraph)
        .setGroup('hr', t.hr)
        .setGroup('heading', t.heading)
        .setGroup('lheading', t.lheading)
        .setGroup('blockquote', t.blockquote)
        .setGroup('tag', '<' + e)
        .setGroup('def', t.def)
        .getRegexp()),
      (this.rulesBase = t))
    );
  }
  static getRulesGfm() {
    var t, e, r, n;
    return (
      this.rulesGfm ||
      ((r = (e = {
        ...(t = this.getRulesBase()),
        fences:
          /^ *(`{3,}|~{3,})[ \.]*((\S+)? *[^\n]*)\n([\s\S]*?)\s*\1 *(?:\n+|$)/,
        paragraph: /^/,
        heading: /^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/,
      }).fences.source.replace('\\1', '\\2')),
      (n = t.list.source.replace('\\1', '\\3')),
      (e.paragraph = new _r(t.paragraph)
        .setGroup('(?!', `(?!${r}|${n}|`)
        .getRegexp()),
      (this.rulesGfm = e))
    );
  }
  static getRulesTable() {
    return (
      this.rulesTables ||
      (this.rulesTables = {
        ...this.getRulesGfm(),
        nptable:
          /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
        table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/,
      })
    );
  }
  setRules() {
    this.options.gfm
      ? this.options.tables
        ? (this.rules = this.staticThis.getRulesTable())
        : (this.rules = this.staticThis.getRulesGfm())
      : (this.rules = this.staticThis.getRulesBase()),
      (this.hasRulesGfm = void 0 !== this.rules.fences),
      (this.hasRulesTables = void 0 !== this.rules.table);
  }
  getTokens(t, e, r) {
    let n,
      s = t;
    t: for (; s; )
      if (
        ((n = this.rules.newline.exec(s)) &&
          ((s = s.substring(n[0].length)), 1 < n[0].length) &&
          this.tokens.push({ type: ar.space }),
        (n = this.rules.code.exec(s)))
      ) {
        s = s.substring(n[0].length);
        var o = n[0].replace(/^ {4}/gm, '');
        this.tokens.push({
          type: ar.code,
          text: this.options.pedantic ? o : o.replace(/\n+$/, ''),
        });
      } else if (this.hasRulesGfm && (n = this.rules.fences.exec(s)))
        (s = s.substring(n[0].length)),
          this.tokens.push({
            type: ar.code,
            meta: n[2],
            lang: n[3],
            text: n[4] || '',
          });
      else if ((n = this.rules.heading.exec(s)))
        (s = s.substring(n[0].length)),
          this.tokens.push({
            type: ar.heading,
            depth: n[1].length,
            text: n[2],
          });
      else if (e && this.hasRulesTables && (n = this.rules.nptable.exec(s))) {
        s = s.substring(n[0].length);
        var i = {
          type: ar.table,
          header: n[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
          align: n[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
          cells: [],
        };
        for (let t = 0; t < i.align.length; t++)
          /^ *-+: *$/.test(i.align[t])
            ? (i.align[t] = 'right')
            : /^ *:-+: *$/.test(i.align[t])
            ? (i.align[t] = 'center')
            : /^ *:-+ *$/.test(i.align[t])
            ? (i.align[t] = 'left')
            : (i.align[t] = null);
        var a = n[3].replace(/\n$/, '').split('\n');
        for (let t = 0; t < a.length; t++) i.cells[t] = a[t].split(/ *\| */);
        this.tokens.push(i);
      } else if ((n = this.rules.lheading.exec(s)))
        (s = s.substring(n[0].length)),
          this.tokens.push({
            type: ar.heading,
            depth: '=' === n[2] ? 1 : 2,
            text: n[1],
          });
      else if ((n = this.rules.hr.exec(s)))
        (s = s.substring(n[0].length)), this.tokens.push({ type: ar.hr });
      else if ((n = this.rules.blockquote.exec(s)))
        (s = s.substring(n[0].length)),
          this.tokens.push({ type: ar.blockquoteStart }),
          (o = n[0].replace(/^ *> ?/gm, '')),
          this.getTokens(o),
          this.tokens.push({ type: ar.blockquoteEnd });
      else if ((n = this.rules.list.exec(s))) {
        s = s.substring(n[0].length);
        var l,
          c = n[2],
          h =
            (this.tokens.push({ type: ar.listStart, ordered: 1 < c.length }),
            n[0].match(this.rules.item)),
          u = h.length;
        let t,
          e = !1;
        for (let n = 0; n < u; n++) {
          let o = h[n];
          (l = o.length),
            -1 !== (o = o.replace(/^ *([*+-]|\d+\.) +/, '')).indexOf('\n ') &&
              ((l -= o.length),
              (o = this.options.pedantic
                ? o.replace(/^ {1,4}/gm, '')
                : o.replace(new RegExp('^ {1,' + l + '}', 'gm'), ''))),
            !this.options.smartLists ||
              n === u - 1 ||
              c ===
                (l = this.staticThis.getRulesBase().bullet.exec(h[n + 1])[0]) ||
              (1 < c.length && 1 < l.length) ||
              ((s = h.slice(n + 1).join('\n') + s), (n = u - 1)),
            (t = e || /\n\n(?!\s*$)/.test(o)),
            n !== u - 1 &&
              ((e = '\n' === o.charAt(o.length - 1)), (t = t || e)),
            this.tokens.push({
              type: t ? ar.looseItemStart : ar.listItemStart,
            }),
            this.getTokens(o, !1, r),
            this.tokens.push({ type: ar.listItemEnd });
        }
        this.tokens.push({ type: ar.listEnd });
      } else if ((n = this.rules.html.exec(s))) {
        s = s.substring(n[0].length);
        var p = n[1];
        this.tokens.push({
          type: this.options.sanitize ? ar.paragraph : ar.html,
          pre:
            !this.options.sanitizer &&
            ('pre' === p || 'script' === p || 'style' === p),
          text: n[0],
        });
      } else if (e && (n = this.rules.def.exec(s)))
        (s = s.substring(n[0].length)),
          (this.links[n[1].toLowerCase()] = { href: n[2], title: n[3] });
      else if (e && this.hasRulesTables && (n = this.rules.table.exec(s))) {
        s = s.substring(n[0].length);
        var d = {
          type: ar.table,
          header: n[1].replace(/^ *| *\| *$/g, '').split(/ *\| */),
          align: n[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
          cells: [],
        };
        for (let t = 0; t < d.align.length; t++)
          /^ *-+: *$/.test(d.align[t])
            ? (d.align[t] = 'right')
            : /^ *:-+: *$/.test(d.align[t])
            ? (d.align[t] = 'center')
            : /^ *:-+ *$/.test(d.align[t])
            ? (d.align[t] = 'left')
            : (d.align[t] = null);
        var f = n[3].replace(/(?: *\| *)?\n$/, '').split('\n');
        for (let t = 0; t < f.length; t++)
          d.cells[t] = f[t].replace(/^ *\| *| *\| *$/g, '').split(/ *\| */);
        this.tokens.push(d);
      } else {
        if (this.staticThis.simpleRules.length) {
          var g = this.staticThis.simpleRules;
          for (let t = 0; t < g.length; t++)
            if ((n = g[t].exec(s))) {
              s = s.substring(n[0].length);
              var b = 'simpleRule' + (t + 1);
              this.tokens.push({ type: b, execArr: n });
              continue t;
            }
        }
        if (e && (n = this.rules.paragraph.exec(s)))
          (s = s.substring(n[0].length)),
            '\n' === n[1].slice(-1)
              ? this.tokens.push({
                  type: ar.paragraph,
                  text: n[1].slice(0, -1),
                })
              : this.tokens.push({
                  type: 0 < this.tokens.length ? ar.paragraph : ar.text,
                  text: n[1],
                });
        else if ((n = this.rules.text.exec(s)))
          (s = s.substring(n[0].length)),
            this.tokens.push({ type: ar.text, text: n[0] });
        else if (s)
          throw new Error(
            'Infinite loop on byte: ' +
              s.charCodeAt(0) +
              `, near text '${s.slice(0, 30)}...'`
          );
      }
    return { tokens: this.tokens, links: this.links };
  }
}
const Mr = nt(
    '<div class="flex justify-end mb-2 items-end guest-container"><span class="px-4 py-2 mr-2 whitespace-pre-wrap max-w-full chatbot-guest-bubble" data-testid="guest-bubble">'
  ),
  zr =
    (jr.setOptions({ isNoP: !0 }),
    (t) => {
      let e;
      S(() => {
        e && (e.innerHTML = jr.parse(t.message));
      });
      {
        const r = Mr(),
          n = r.firstChild;
        r.style.setProperty('margin-left', '50px');
        return (
          'function' == typeof e ? lt(e, n) : (e = n),
          n.style.setProperty('border-radius', '6px'),
          ct(
            r,
            W(X, {
              get when() {
                return t.showAvatar;
              },
              get children() {
                return W(kr, {
                  get initialAvatarSrc() {
                    return t.avatarSrc;
                  },
                });
              },
            }),
            null
          ),
          k(
            (e) => {
              var r = t.backgroundColor ?? '#3B81F6',
                s = t.textColor ?? '#ffffff';
              return (
                r !== e._v$ &&
                  (null != (e._v$ = r)
                    ? n.style.setProperty('background-color', r)
                    : n.style.removeProperty('background-color')),
                s !== e._v$2 &&
                  (null != (e._v$2 = s)
                    ? n.style.setProperty('color', s)
                    : n.style.removeProperty('color')),
                e
              );
            },
            { _v$: void 0, _v$2: void 0 }
          ),
          r
        );
      }
    }),
  Ir = nt(
    '<div class="flex justify-start mb-2 items-start host-container"><span class="px-4 py-2 ml-2 whitespace-pre-wrap max-w-full chatbot-host-bubble" data-testid="host-bubble">'
  ),
  qr =
    (jr.setOptions({ isNoP: !0 }),
    (t) => {
      let e;
      S(() => {
        e && (e.innerHTML = jr.parse(t.message));
      });
      {
        const r = Ir(),
          n = r.firstChild;
        r.style.setProperty('margin-right', '50px'),
          ct(
            r,
            W(X, {
              get when() {
                return t.showAvatar;
              },
              get children() {
                return W(kr, {
                  get initialAvatarSrc() {
                    return t.avatarSrc;
                  },
                });
              },
            }),
            n
          );
        return (
          'function' == typeof e ? lt(e, n) : (e = n),
          n.style.setProperty('border-radius', '6px'),
          k(
            (e) => {
              var r = t.backgroundColor ?? '#f7f8ff',
                s = t.textColor ?? '#303235';
              return (
                r !== e._v$ &&
                  (null != (e._v$ = r)
                    ? n.style.setProperty('background-color', r)
                    : n.style.removeProperty('background-color')),
                s !== e._v$2 &&
                  (null != (e._v$2 = s)
                    ? n.style.setProperty('color', s)
                    : n.style.removeProperty('color')),
                e
              );
            },
            { _v$: void 0, _v$2: void 0 }
          ),
          r
        );
      }
    }),
  Dr = nt(
    '<div class="flex items-center"><div class="w-2 h-2 mr-1 rounded-full bubble1"></div><div class="w-2 h-2 mr-1 rounded-full bubble2"></div><div class="w-2 h-2 rounded-full bubble3">'
  ),
  Wr = () => Dr(),
  Hr = nt(
    '<div class="flex justify-start mb-2 items-start animate-fade-in host-container"><span class="px-4 py-4 ml-2 whitespace-pre-wrap max-w-full chatbot-host-bubble" data-testid="host-bubble">'
  ),
  Fr = () => {
    return ct((t = Hr()).firstChild, W(Wr, {})), t;
    var t;
  },
  Ur = nt(
    '<div data-modal-target="defaultModal" data-modal-toggle="defaultModal" class="flex justify-start mb-2 items-start animate-fade-in host-container hover:brightness-90 active:brightness-75"><span class="px-2 py-1 ml-1 whitespace-pre-wrap max-w-full chatbot-host-bubble" data-testid="host-bubble">'
  ),
  Gr = (t) => {
    return (
      (r = (e = Ur()).firstChild),
      (e.$$click = () => t.onSourceClick?.()),
      r.style.setProperty('width', 'max-content'),
      r.style.setProperty('max-width', '80px'),
      r.style.setProperty('font-size', '13px'),
      r.style.setProperty('border-radius', '15px'),
      r.style.setProperty('cursor', 'pointer'),
      r.style.setProperty('text-overflow', 'ellipsis'),
      r.style.setProperty('overflow', 'hidden'),
      r.style.setProperty('white-space', 'nowrap'),
      ct(r, () => t.pageContent),
      e
    );
    var e, r;
  },
  Vr =
    (st(['click']),
    nt(
      '<span>Powered by<a href="https://vertbuild.ai" target="_blank" rel="noopener noreferrer" class="lite-badge" id="lite-badge"><span> VertBuild'
    )),
  Yr = '#303235',
  Xr = (t) => {
    let e, r;
    const n = (r) => {
      r.forEach((r) => {
        r.removedNodes.forEach((r) => {
          'id' in r &&
            e &&
            'lite-badge' == r.id &&
            (console.log("Sorry, you can't remove the brand 😅"),
            t.botContainer?.append(e));
        });
      });
    };
    S(() => {
      document &&
        t.botContainer &&
        (r = new MutationObserver(n)).observe(t.botContainer, {
          subtree: !1,
          childList: !0,
        });
    }),
      A(() => {
        r && r.disconnect();
      });
    {
      const r = Vr(),
        n = r.firstChild.nextSibling;
      r.style.setProperty('font-size', '13px'),
        r.style.setProperty('position', 'absolute'),
        r.style.setProperty('bottom', '0'),
        r.style.setProperty('padding', '10px'),
        r.style.setProperty('margin', 'auto'),
        r.style.setProperty('width', '100%'),
        r.style.setProperty('text-align', 'center');
      return (
        'function' == typeof e ? lt(e, n) : (e = n),
        n.style.setProperty('font-weight', 'bold'),
        k(
          (e) => {
            var s = t.poweredByTextColor ?? Yr,
              o = t.badgeBackgroundColor ?? '#ffffff',
              i = t.poweredByTextColor ?? Yr;
            return (
              s !== e._v$ &&
                (null != (e._v$ = s)
                  ? r.style.setProperty('color', s)
                  : r.style.removeProperty('color')),
              o !== e._v$2 &&
                (null != (e._v$2 = o)
                  ? r.style.setProperty('background-color', o)
                  : r.style.removeProperty('background-color')),
              i !== e._v$3 &&
                (null != (e._v$3 = i)
                  ? n.style.setProperty('color', i)
                  : n.style.removeProperty('color')),
              e
            );
          },
          { _v$: void 0, _v$2: void 0, _v$3: void 0 }
        ),
        r
      );
    }
  },
  Jr = Object.create(null),
  Kr =
    ((Jr.open = '0'),
    (Jr.close = '1'),
    (Jr.ping = '2'),
    (Jr.pong = '3'),
    (Jr.message = '4'),
    (Jr.upgrade = '5'),
    (Jr.noop = '6'),
    Object.create(null)),
  Qr =
    (Object.keys(Jr).forEach((t) => {
      Kr[Jr[t]] = t;
    }),
    { type: 'error', data: 'parser error' }),
  Zr =
    'function' == typeof Blob ||
    ('undefined' != typeof Blob &&
      '[object BlobConstructor]' === Object.prototype.toString.call(Blob)),
  tn = 'function' == typeof ArrayBuffer,
  en = (t) =>
    'function' == typeof ArrayBuffer.isView
      ? ArrayBuffer.isView(t)
      : t && t.buffer instanceof ArrayBuffer,
  rn = ({ type: t, data: e }, r, n) =>
    Zr && e instanceof Blob
      ? r
        ? n(e)
        : nn(e, n)
      : tn && (e instanceof ArrayBuffer || en(e))
      ? r
        ? n(e)
        : nn(new Blob([e]), n)
      : n(Jr[t] + (e || '')),
  nn = (t, e) => {
    const r = new FileReader();
    return (
      (r.onload = function () {
        var t = r.result.split(',')[1];
        e('b' + (t || ''));
      }),
      r.readAsDataURL(t)
    );
  };
function sn(t) {
  return t instanceof Uint8Array
    ? t
    : t instanceof ArrayBuffer
    ? new Uint8Array(t)
    : new Uint8Array(t.buffer, t.byteOffset, t.byteLength);
}
let on;
const an = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
  ln = 'undefined' == typeof Uint8Array ? [] : new Uint8Array(256);
for (let t = 0; t < 64; t++) ln[an.charCodeAt(t)] = t;
const cn = 'function' == typeof ArrayBuffer,
  hn = (t, e) => {
    var r;
    return 'string' != typeof t
      ? { type: 'message', data: pn(t, e) }
      : 'b' === (r = t.charAt(0))
      ? { type: 'message', data: un(t.substring(1), e) }
      : Kr[r]
      ? 1 < t.length
        ? { type: Kr[r], data: t.substring(1) }
        : { type: Kr[r] }
      : Qr;
  },
  un = (t, e) => {
    var r;
    return cn
      ? ((r = ((t) => {
          let e,
            r,
            n,
            s,
            o,
            i = 0.75 * t.length,
            a = t.length,
            l = 0;
          '=' === t[t.length - 1] && (i--, '=' === t[t.length - 2]) && i--;
          var c = new ArrayBuffer(i),
            h = new Uint8Array(c);
          for (e = 0; e < a; e += 4)
            (r = ln[t.charCodeAt(e)]),
              (n = ln[t.charCodeAt(e + 1)]),
              (s = ln[t.charCodeAt(e + 2)]),
              (o = ln[t.charCodeAt(e + 3)]),
              (h[l++] = (r << 2) | (n >> 4)),
              (h[l++] = ((15 & n) << 4) | (s >> 2)),
              (h[l++] = ((3 & s) << 6) | (63 & o));
          return c;
        })(t)),
        pn(r, e))
      : { base64: !0, data: t };
  },
  pn = (t, e) =>
    'blob' !== e
      ? t instanceof ArrayBuffer
        ? t
        : t.buffer
      : t instanceof Blob
      ? t
      : new Blob([t]),
  dn = String.fromCharCode(30);
function fn() {
  return new TransformStream({
    transform(t, e) {
      !(function (t, e) {
        Zr && t.data instanceof Blob
          ? t.data.arrayBuffer().then(sn).then(e)
          : tn && (t.data instanceof ArrayBuffer || en(t.data))
          ? e(sn(t.data))
          : rn(t, !1, (t) => {
              (on = on || new TextEncoder()), e(on.encode(t));
            });
      })(t, (r) => {
        var n,
          s = r.length;
        let o;
        s < 126
          ? ((o = new Uint8Array(1)), new DataView(o.buffer).setUint8(0, s))
          : s < 65536
          ? ((o = new Uint8Array(3)),
            (n = new DataView(o.buffer)).setUint8(0, 126),
            n.setUint16(1, s))
          : ((o = new Uint8Array(9)),
            (n = new DataView(o.buffer)).setUint8(0, 127),
            n.setBigUint64(1, BigInt(s))),
          t.data && 'string' != typeof t.data && (o[0] |= 128),
          e.enqueue(o),
          e.enqueue(r);
      });
    },
  });
}
let gn;
function bn(t) {
  return t.reduce((t, e) => t + e.length, 0);
}
function mn(t, e) {
  if (t[0].length === e) return t.shift();
  var r = new Uint8Array(e);
  let n = 0;
  for (let s = 0; s < e; s++)
    (r[s] = t[0][n++]), n === t[0].length && (t.shift(), (n = 0));
  return t.length && n < t[0].length && (t[0] = t[0].slice(n)), r;
}
function yn(t) {
  if (t)
    return (function (t) {
      for (var e in yn.prototype) t[e] = yn.prototype[e];
      return t;
    })(t);
}
(yn.prototype.on = yn.prototype.addEventListener =
  function (t, e) {
    return (
      (this._callbacks = this._callbacks || {}),
      (this._callbacks['$' + t] = this._callbacks['$' + t] || []).push(e),
      this
    );
  }),
  (yn.prototype.once = function (t, e) {
    function r() {
      this.off(t, r), e.apply(this, arguments);
    }
    return (r.fn = e), this.on(t, r), this;
  }),
  (yn.prototype.off =
    yn.prototype.removeListener =
    yn.prototype.removeAllListeners =
    yn.prototype.removeEventListener =
      function (t, e) {
        if (((this._callbacks = this._callbacks || {}), 0 == arguments.length))
          this._callbacks = {};
        else {
          var r = this._callbacks['$' + t];
          if (r)
            if (1 == arguments.length) delete this._callbacks['$' + t];
            else {
              for (var n, s = 0; s < r.length; s++)
                if ((n = r[s]) === e || n.fn === e) {
                  r.splice(s, 1);
                  break;
                }
              0 === r.length && delete this._callbacks['$' + t];
            }
        }
        return this;
      }),
  (yn.prototype.emit = function (t) {
    this._callbacks = this._callbacks || {};
    for (
      var e = new Array(arguments.length - 1),
        r = this._callbacks['$' + t],
        n = 1;
      n < arguments.length;
      n++
    )
      e[n - 1] = arguments[n];
    if (r) {
      n = 0;
      for (var s = (r = r.slice(0)).length; n < s; ++n) r[n].apply(this, e);
    }
    return this;
  }),
  (yn.prototype.emitReserved = yn.prototype.emit),
  (yn.prototype.listeners = function (t) {
    return (
      (this._callbacks = this._callbacks || {}), this._callbacks['$' + t] || []
    );
  }),
  (yn.prototype.hasListeners = function (t) {
    return !!this.listeners(t).length;
  });
const wn =
  'undefined' != typeof self
    ? self
    : 'undefined' != typeof window
    ? window
    : Function('return this')();
function vn(t, ...e) {
  return e.reduce((e, r) => (t.hasOwnProperty(r) && (e[r] = t[r]), e), {});
}
const xn = wn.setTimeout,
  kn = wn.clearTimeout;
function _n(t, e) {
  e.useNativeTimers
    ? ((t.setTimeoutFn = xn.bind(wn)), (t.clearTimeoutFn = kn.bind(wn)))
    : ((t.setTimeoutFn = wn.setTimeout.bind(wn)),
      (t.clearTimeoutFn = wn.clearTimeout.bind(wn)));
}
function Cn(t) {
  return 'string' == typeof t
    ? (function (t) {
        let e,
          r = 0;
        for (let n = 0, s = t.length; n < s; n++)
          (e = t.charCodeAt(n)) < 128
            ? (r += 1)
            : e < 2048
            ? (r += 2)
            : e < 55296 || 57344 <= e
            ? (r += 3)
            : (n++, (r += 4));
        return r;
      })(t)
    : Math.ceil(1.33 * (t.byteLength || t.size));
}
class On extends Error {
  constructor(t, e, r) {
    super(t),
      (this.description = e),
      (this.context = r),
      (this.type = 'TransportError');
  }
}
class Sn extends yn {
  constructor(t) {
    super(),
      (this.writable = !1),
      _n(this, t),
      (this.opts = t),
      (this.query = t.query),
      (this.socket = t.socket);
  }
  onError(t, e, r) {
    return super.emitReserved('error', new On(t, e, r)), this;
  }
  open() {
    return (this.readyState = 'opening'), this.doOpen(), this;
  }
  close() {
    return (
      ('opening' !== this.readyState && 'open' !== this.readyState) ||
        (this.doClose(), this.onClose()),
      this
    );
  }
  send(t) {
    'open' === this.readyState && this.write(t);
  }
  onOpen() {
    (this.readyState = 'open'),
      (this.writable = !0),
      super.emitReserved('open');
  }
  onData(t) {
    (t = hn(t, this.socket.binaryType)), this.onPacket(t);
  }
  onPacket(t) {
    super.emitReserved('packet', t);
  }
  onClose(t) {
    (this.readyState = 'closed'), super.emitReserved('close', t);
  }
  pause(t) {}
  createUri(t, e = {}) {
    return (
      t +
      '://' +
      this._hostname() +
      this._port() +
      this.opts.path +
      this._query(e)
    );
  }
  _hostname() {
    var t = this.opts.hostname;
    return -1 === t.indexOf(':') ? t : '[' + t + ']';
  }
  _port() {
    return this.opts.port &&
      ((this.opts.secure && Number(443 !== this.opts.port)) ||
        (!this.opts.secure && 80 !== Number(this.opts.port)))
      ? ':' + this.opts.port
      : '';
  }
  _query(t) {
    return (
      (t = (function (t) {
        let e = '';
        for (var r in t)
          t.hasOwnProperty(r) &&
            (e.length && (e += '&'),
            (e += encodeURIComponent(r) + '=' + encodeURIComponent(t[r])));
        return e;
      })(t)),
      t.length ? '?' + t : ''
    );
  }
}
const An =
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split(
      ''
    ),
  En = 64,
  Tn = {};
let Pn,
  Rn = 0,
  $n = 0;
function Bn(t) {
  let e = '';
  for (; (e = An[t % En] + e), 0 < (t = Math.floor(t / En)); );
  return e;
}
function Ln() {
  var t = Bn(+new Date());
  return t !== Pn ? ((Rn = 0), (Pn = t)) : t + '.' + Bn(Rn++);
}
for (; $n < En; $n++) Tn[An[$n]] = $n;
let jn = !1;
try {
  jn =
    'undefined' != typeof XMLHttpRequest &&
    'withCredentials' in new XMLHttpRequest();
} catch (cr) {}
const Nn = jn;
function Mn(t) {
  t = t.xdomain;
  try {
    if ('undefined' != typeof XMLHttpRequest && (!t || Nn))
      return new XMLHttpRequest();
  } catch (t) {}
  if (!t)
    try {
      return new wn[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP');
    } catch (t) {}
}
function zn() {}
const In = null != new Mn({ xdomain: !1 }).responseType;
class qn extends yn {
  constructor(t, e) {
    super(),
      _n(this, e),
      (this.opts = e),
      (this.method = e.method || 'GET'),
      (this.uri = t),
      (this.data = void 0 !== e.data ? e.data : null),
      this.create();
  }
  create() {
    var t,
      e = vn(
        this.opts,
        'agent',
        'pfx',
        'key',
        'passphrase',
        'cert',
        'ca',
        'ciphers',
        'rejectUnauthorized',
        'autoUnref'
      );
    e.xdomain = !!this.opts.xd;
    const r = (this.xhr = new Mn(e));
    try {
      r.open(this.method, this.uri, !0);
      try {
        if (this.opts.extraHeaders)
          for (var n in (r.setDisableHeaderCheck && r.setDisableHeaderCheck(!0),
          this.opts.extraHeaders))
            this.opts.extraHeaders.hasOwnProperty(n) &&
              r.setRequestHeader(n, this.opts.extraHeaders[n]);
      } catch (t) {}
      if ('POST' === this.method)
        try {
          r.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
        } catch (t) {}
      try {
        r.setRequestHeader('Accept', '*/*');
      } catch (t) {}
      null != (t = this.opts.cookieJar) && t.addCookies(r),
        'withCredentials' in r &&
          (r.withCredentials = this.opts.withCredentials),
        this.opts.requestTimeout && (r.timeout = this.opts.requestTimeout),
        (r.onreadystatechange = () => {
          var t;
          3 === r.readyState &&
            null != (t = this.opts.cookieJar) &&
            t.parseCookies(r),
            4 === r.readyState &&
              (200 === r.status || 1223 === r.status
                ? this.onLoad()
                : this.setTimeoutFn(() => {
                    this.onError('number' == typeof r.status ? r.status : 0);
                  }, 0));
        }),
        r.send(this.data);
    } catch (t) {
      return void this.setTimeoutFn(() => {
        this.onError(t);
      }, 0);
    }
    'undefined' != typeof document &&
      ((this.index = qn.requestsCount++), (qn.requests[this.index] = this));
  }
  onError(t) {
    this.emitReserved('error', t, this.xhr), this.cleanup(!0);
  }
  cleanup(t) {
    if (void 0 !== this.xhr && null !== this.xhr) {
      if (((this.xhr.onreadystatechange = zn), t))
        try {
          this.xhr.abort();
        } catch (t) {}
      'undefined' != typeof document && delete qn.requests[this.index],
        (this.xhr = null);
    }
  }
  onLoad() {
    var t = this.xhr.responseText;
    null !== t &&
      (this.emitReserved('data', t),
      this.emitReserved('success'),
      this.cleanup());
  }
  abort() {
    this.cleanup();
  }
}
if (
  ((qn.requestsCount = 0), (qn.requests = {}), 'undefined' != typeof document)
)
  if ('function' == typeof attachEvent) attachEvent('onunload', Dn);
  else if ('function' == typeof addEventListener) {
    addEventListener('onpagehide' in wn ? 'pagehide' : 'unload', Dn, !1);
  }
function Dn() {
  for (var t in qn.requests)
    qn.requests.hasOwnProperty(t) && qn.requests[t].abort();
}
const Wn =
    'function' == typeof Promise && 'function' == typeof Promise.resolve
      ? (t) => Promise.resolve().then(t)
      : (t, e) => e(t, 0),
  Hn = wn.WebSocket || wn.MozWebSocket,
  Fn =
    'undefined' != typeof navigator &&
    'string' == typeof navigator.product &&
    'reactnative' === navigator.product.toLowerCase();
const Un = {
    websocket: class extends Sn {
      constructor(t) {
        super(t), (this.supportsBinary = !t.forceBase64);
      }
      get name() {
        return 'websocket';
      }
      doOpen() {
        if (this.check()) {
          var t = this.uri(),
            e = this.opts.protocols,
            r = Fn
              ? {}
              : vn(
                  this.opts,
                  'agent',
                  'perMessageDeflate',
                  'pfx',
                  'key',
                  'passphrase',
                  'cert',
                  'ca',
                  'ciphers',
                  'rejectUnauthorized',
                  'localAddress',
                  'protocolVersion',
                  'origin',
                  'maxPayload',
                  'family',
                  'checkServerIdentity'
                );
          this.opts.extraHeaders && (r.headers = this.opts.extraHeaders);
          try {
            this.ws = Fn ? new Hn(t, e, r) : e ? new Hn(t, e) : new Hn(t);
          } catch (t) {
            return this.emitReserved('error', t);
          }
          (this.ws.binaryType = this.socket.binaryType),
            this.addEventListeners();
        }
      }
      addEventListeners() {
        (this.ws.onopen = () => {
          this.opts.autoUnref && this.ws._socket.unref(), this.onOpen();
        }),
          (this.ws.onclose = (t) =>
            this.onClose({
              description: 'websocket connection closed',
              context: t,
            })),
          (this.ws.onmessage = (t) => this.onData(t.data)),
          (this.ws.onerror = (t) => this.onError('websocket error', t));
      }
      write(t) {
        this.writable = !1;
        for (let r = 0; r < t.length; r++) {
          var e = t[r];
          const n = r === t.length - 1;
          rn(e, this.supportsBinary, (t) => {
            try {
              this.ws.send(t);
            } catch (t) {}
            n &&
              Wn(() => {
                (this.writable = !0), this.emitReserved('drain');
              }, this.setTimeoutFn);
          });
        }
      }
      doClose() {
        void 0 !== this.ws && (this.ws.close(), (this.ws = null));
      }
      uri() {
        var t = this.opts.secure ? 'wss' : 'ws',
          e = this.query || {};
        return (
          this.opts.timestampRequests && (e[this.opts.timestampParam] = Ln()),
          this.supportsBinary || (e.b64 = 1),
          this.createUri(t, e)
        );
      }
      check() {
        return !!Hn;
      }
    },
    webtransport: class extends Sn {
      get name() {
        return 'webtransport';
      }
      doOpen() {
        'function' == typeof WebTransport &&
          ((this.transport = new WebTransport(
            this.createUri('https'),
            this.opts.transportOptions[this.name]
          )),
          this.transport.closed
            .then(() => {
              this.onClose();
            })
            .catch((t) => {
              this.onError('webtransport error', t);
            }),
          this.transport.ready.then(() => {
            this.transport.createBidirectionalStream().then((t) => {
              var e = (function (t, e) {
                gn = gn || new TextDecoder();
                const r = [];
                let n = 0,
                  s = -1,
                  o = !1;
                return new TransformStream({
                  transform(i, a) {
                    for (r.push(i); ; ) {
                      if (0 === n) {
                        if (bn(r) < 1) break;
                        var l = mn(r, 1);
                        (o = 128 == (128 & l[0])),
                          (s = 127 & l[0]),
                          (n = s < 126 ? 3 : 126 === s ? 1 : 2);
                      } else if (1 === n) {
                        if (bn(r) < 2) break;
                        (l = mn(r, 2)),
                          (s = new DataView(
                            l.buffer,
                            l.byteOffset,
                            l.length
                          ).getUint16(0)),
                          (n = 3);
                      } else if (2 === n) {
                        if (bn(r) < 8) break;
                        var c = mn(r, 8),
                          h = (c = new DataView(
                            c.buffer,
                            c.byteOffset,
                            c.length
                          )).getUint32(0);
                        if (h > Math.pow(2, 21) - 1) {
                          a.enqueue(Qr);
                          break;
                        }
                        (s = h * Math.pow(2, 32) + c.getUint32(4)), (n = 3);
                      } else {
                        if (bn(r) < s) break;
                        (h = mn(r, s)),
                          a.enqueue(hn(o ? h : gn.decode(h), e)),
                          (n = 0);
                      }
                      if (0 === s || s > t) {
                        a.enqueue(Qr);
                        break;
                      }
                    }
                  },
                });
              })(Number.MAX_SAFE_INTEGER, this.socket.binaryType);
              const r = t.readable.pipeThrough(e).getReader();
              (e = fn()).readable.pipeTo(t.writable),
                (this.writer = e.writable.getWriter());
              const n = () => {
                r.read()
                  .then(({ done: t, value: e }) => {
                    t || (this.onPacket(e), n());
                  })
                  .catch((t) => {});
              };
              n(),
                (t = { type: 'open' }),
                this.query.sid && (t.data = `{"sid":"${this.query.sid}"}`),
                this.writer.write(t).then(() => this.onOpen());
            });
          }));
      }
      write(t) {
        this.writable = !1;
        for (let r = 0; r < t.length; r++) {
          var e = t[r];
          const n = r === t.length - 1;
          this.writer.write(e).then(() => {
            n &&
              Wn(() => {
                (this.writable = !0), this.emitReserved('drain');
              }, this.setTimeoutFn);
          });
        }
      }
      doClose() {
        var t;
        null != (t = this.transport) && t.close();
      }
    },
    polling: class extends Sn {
      constructor(t) {
        if ((super(t), (this.polling = !1), 'undefined' != typeof location)) {
          var e = 'https:' === location.protocol;
          let r = location.port;
          (r = r || (e ? '443' : '80')),
            (this.xd =
              ('undefined' != typeof location &&
                t.hostname !== location.hostname) ||
              r !== t.port);
        }
        (e = t && t.forceBase64),
          (this.supportsBinary = In && !e),
          this.opts.withCredentials && (this.cookieJar = void 0);
      }
      get name() {
        return 'polling';
      }
      doOpen() {
        this.poll();
      }
      pause(t) {
        this.readyState = 'pausing';
        const e = () => {
          (this.readyState = 'paused'), t();
        };
        if (this.polling || !this.writable) {
          let t = 0;
          this.polling &&
            (t++,
            this.once('pollComplete', function () {
              --t || e();
            })),
            this.writable ||
              (t++,
              this.once('drain', function () {
                --t || e();
              }));
        } else e();
      }
      poll() {
        (this.polling = !0), this.doPoll(), this.emitReserved('poll');
      }
      onData(t) {
        ((t, e) => {
          var r = t.split(dn),
            n = [];
          for (let t = 0; t < r.length; t++) {
            var s = hn(r[t], e);
            if ((n.push(s), 'error' === s.type)) break;
          }
          return n;
        })(t, this.socket.binaryType).forEach((t) => {
          if (
            ('opening' === this.readyState &&
              'open' === t.type &&
              this.onOpen(),
            'close' === t.type)
          )
            return (
              this.onClose({ description: 'transport closed by the server' }),
              !1
            );
          this.onPacket(t);
        }),
          'closed' !== this.readyState &&
            ((this.polling = !1),
            this.emitReserved('pollComplete'),
            'open' === this.readyState) &&
            this.poll();
      }
      doClose() {
        var t = () => {
          this.write([{ type: 'close' }]);
        };
        'open' === this.readyState ? t() : this.once('open', t);
      }
      write(t) {
        (this.writable = !1),
          ((t, e) => {
            const r = t.length,
              n = new Array(r);
            let s = 0;
            t.forEach((t, o) => {
              rn(t, !1, (t) => {
                (n[o] = t), ++s === r && e(n.join(dn));
              });
            });
          })(t, (t) => {
            this.doWrite(t, () => {
              (this.writable = !0), this.emitReserved('drain');
            });
          });
      }
      uri() {
        var t = this.opts.secure ? 'https' : 'http',
          e = this.query || {};
        return (
          !1 !== this.opts.timestampRequests &&
            (e[this.opts.timestampParam] = Ln()),
          this.supportsBinary || e.sid || (e.b64 = 1),
          this.createUri(t, e)
        );
      }
      request(t = {}) {
        return (
          Object.assign(
            t,
            { xd: this.xd, cookieJar: this.cookieJar },
            this.opts
          ),
          new qn(this.uri(), t)
        );
      }
      doWrite(t, e) {
        (t = this.request({ method: 'POST', data: t })).on('success', e),
          t.on('error', (t, e) => {
            this.onError('xhr post error', t, e);
          });
      }
      doPoll() {
        var t = this.request();
        t.on('data', this.onData.bind(this)),
          t.on('error', (t, e) => {
            this.onError('xhr poll error', t, e);
          }),
          (this.pollXhr = t);
      }
    },
  },
  Gn =
    /^(?:(?![^:@\/?#]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@\/?#]*)(?::([^:@\/?#]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
  Vn = [
    'source',
    'protocol',
    'authority',
    'userInfo',
    'user',
    'password',
    'host',
    'port',
    'relative',
    'path',
    'directory',
    'file',
    'query',
    'anchor',
  ];
function Yn(t) {
  var e = t,
    r = t.indexOf('['),
    n = t.indexOf(']');
  -1 != r &&
    -1 != n &&
    (t =
      t.substring(0, r) +
      t.substring(r, n).replace(/:/g, ';') +
      t.substring(n, t.length));
  let s = Gn.exec(t || ''),
    o = {},
    i = 14;
  for (; i--; ) o[Vn[i]] = s[i] || '';
  return (
    -1 != r &&
      -1 != n &&
      ((o.source = e),
      (o.host = o.host.substring(1, o.host.length - 1).replace(/;/g, ':')),
      (o.authority = o.authority
        .replace('[', '')
        .replace(']', '')
        .replace(/;/g, ':')),
      (o.ipv6uri = !0)),
    (o.pathNames = (function (t, e) {
      var r = e.replace(/\/{2,9}/g, '/').split('/');
      return (
        ('/' != e.slice(0, 1) && 0 !== e.length) || r.splice(0, 1),
        '/' == e.slice(-1) && r.splice(r.length - 1, 1),
        r
      );
    })(0, o.path)),
    (o.queryKey = (function (t, e) {
      const r = {};
      return (
        e.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, function (t, e, n) {
          e && (r[e] = n);
        }),
        r
      );
    })(0, o.query)),
    o
  );
}
let Xn = class t extends yn {
  constructor(t, e = {}) {
    super(),
      (this.binaryType = 'arraybuffer'),
      (this.writeBuffer = []),
      t && 'object' == typeof t && ((e = t), (t = null)),
      t
        ? ((t = Yn(t)),
          (e.hostname = t.host),
          (e.secure = 'https' === t.protocol || 'wss' === t.protocol),
          (e.port = t.port),
          t.query && (e.query = t.query))
        : e.host && (e.hostname = Yn(e.host).host),
      _n(this, e),
      (this.secure =
        null != e.secure
          ? e.secure
          : 'undefined' != typeof location && 'https:' === location.protocol),
      e.hostname && !e.port && (e.port = this.secure ? '443' : '80'),
      (this.hostname =
        e.hostname ||
        ('undefined' != typeof location ? location.hostname : 'localhost')),
      (this.port =
        e.port ||
        ('undefined' != typeof location && location.port
          ? location.port
          : this.secure
          ? '443'
          : '80')),
      (this.transports = e.transports || [
        'polling',
        'websocket',
        'webtransport',
      ]),
      (this.writeBuffer = []),
      (this.prevBufferLen = 0),
      (this.opts = Object.assign(
        {
          path: '/engine.io',
          agent: !1,
          withCredentials: !1,
          upgrade: !0,
          timestampParam: 't',
          rememberUpgrade: !1,
          addTrailingSlash: !0,
          rejectUnauthorized: !0,
          perMessageDeflate: { threshold: 1024 },
          transportOptions: {},
          closeOnBeforeunload: !1,
        },
        e
      )),
      (this.opts.path =
        this.opts.path.replace(/\/$/, '') +
        (this.opts.addTrailingSlash ? '/' : '')),
      'string' == typeof this.opts.query &&
        (this.opts.query = (function (t) {
          var e = {},
            r = t.split('&');
          for (let t = 0, s = r.length; t < s; t++) {
            var n = r[t].split('=');
            e[decodeURIComponent(n[0])] = decodeURIComponent(n[1]);
          }
          return e;
        })(this.opts.query)),
      (this.id = null),
      (this.upgrades = null),
      (this.pingInterval = null),
      (this.pingTimeout = null),
      (this.pingTimeoutTimer = null),
      'function' == typeof addEventListener &&
        (this.opts.closeOnBeforeunload &&
          ((this.beforeunloadEventListener = () => {
            this.transport &&
              (this.transport.removeAllListeners(), this.transport.close());
          }),
          addEventListener('beforeunload', this.beforeunloadEventListener, !1)),
        'localhost' !== this.hostname) &&
        ((this.offlineEventListener = () => {
          this.onClose('transport close', {
            description: 'network connection lost',
          });
        }),
        addEventListener('offline', this.offlineEventListener, !1)),
      this.open();
  }
  createTransport(t) {
    var e =
      (((e = Object.assign({}, this.opts.query)).EIO = 4),
      (e.transport = t),
      this.id && (e.sid = this.id),
      Object.assign(
        {},
        this.opts,
        {
          query: e,
          socket: this,
          hostname: this.hostname,
          secure: this.secure,
          port: this.port,
        },
        this.opts.transportOptions[t]
      ));
    return new Un[t](e);
  }
  open() {
    let e;
    if (
      this.opts.rememberUpgrade &&
      t.priorWebsocketSuccess &&
      -1 !== this.transports.indexOf('websocket')
    )
      e = 'websocket';
    else {
      if (0 === this.transports.length)
        return void this.setTimeoutFn(() => {
          this.emitReserved('error', 'No transports available');
        }, 0);
      e = this.transports[0];
    }
    this.readyState = 'opening';
    try {
      e = this.createTransport(e);
    } catch (e) {
      return this.transports.shift(), void this.open();
    }
    e.open(), this.setTransport(e);
  }
  setTransport(t) {
    this.transport && this.transport.removeAllListeners(),
      (this.transport = t)
        .on('drain', this.onDrain.bind(this))
        .on('packet', this.onPacket.bind(this))
        .on('error', this.onError.bind(this))
        .on('close', (t) => this.onClose('transport close', t));
  }
  probe(e) {
    let r = this.createTransport(e),
      n = !1;
    t.priorWebsocketSuccess = !1;
    const s = () => {
      n ||
        (r.send([{ type: 'ping', data: 'probe' }]),
        r.once('packet', (e) => {
          n ||
            ('pong' === e.type && 'probe' === e.data
              ? ((this.upgrading = !0),
                this.emitReserved('upgrading', r),
                r &&
                  ((t.priorWebsocketSuccess = 'websocket' === r.name),
                  this.transport.pause(() => {
                    n ||
                      ('closed' !== this.readyState &&
                        (h(),
                        this.setTransport(r),
                        r.send([{ type: 'upgrade' }]),
                        this.emitReserved('upgrade', r),
                        (r = null),
                        (this.upgrading = !1),
                        this.flush()));
                  })))
              : (((e = new Error('probe error')).transport = r.name),
                this.emitReserved('upgradeError', e)));
        }));
    };
    function o() {
      n || ((n = !0), h(), r.close(), (r = null));
    }
    const i = (t) => {
      ((t = new Error('probe error: ' + t)).transport = r.name),
        o(),
        this.emitReserved('upgradeError', t);
    };
    function a() {
      i('transport closed');
    }
    function l() {
      i('socket closed');
    }
    function c(t) {
      r && t.name !== r.name && o();
    }
    const h = () => {
      r.removeListener('open', s),
        r.removeListener('error', i),
        r.removeListener('close', a),
        this.off('close', l),
        this.off('upgrading', c);
    };
    r.once('open', s),
      r.once('error', i),
      r.once('close', a),
      this.once('close', l),
      this.once('upgrading', c),
      -1 !== this.upgrades.indexOf('webtransport') && 'webtransport' !== e
        ? this.setTimeoutFn(() => {
            n || r.open();
          }, 200)
        : r.open();
  }
  onOpen() {
    if (
      ((this.readyState = 'open'),
      (t.priorWebsocketSuccess = 'websocket' === this.transport.name),
      this.emitReserved('open'),
      this.flush(),
      'open' === this.readyState && this.opts.upgrade)
    ) {
      let t = 0;
      for (var e = this.upgrades.length; t < e; t++)
        this.probe(this.upgrades[t]);
    }
  }
  onPacket(t) {
    if (
      'opening' === this.readyState ||
      'open' === this.readyState ||
      'closing' === this.readyState
    )
      switch (
        (this.emitReserved('packet', t),
        this.emitReserved('heartbeat'),
        this.resetPingTimeout(),
        t.type)
      ) {
        case 'open':
          this.onHandshake(JSON.parse(t.data));
          break;
        case 'ping':
          this.sendPacket('pong'),
            this.emitReserved('ping'),
            this.emitReserved('pong');
          break;
        case 'error':
          var e = new Error('server error');
          (e.code = t.data), this.onError(e);
          break;
        case 'message':
          this.emitReserved('data', t.data),
            this.emitReserved('message', t.data);
      }
  }
  onHandshake(t) {
    this.emitReserved('handshake', t),
      (this.id = t.sid),
      (this.transport.query.sid = t.sid),
      (this.upgrades = this.filterUpgrades(t.upgrades)),
      (this.pingInterval = t.pingInterval),
      (this.pingTimeout = t.pingTimeout),
      (this.maxPayload = t.maxPayload),
      this.onOpen(),
      'closed' !== this.readyState && this.resetPingTimeout();
  }
  resetPingTimeout() {
    this.clearTimeoutFn(this.pingTimeoutTimer),
      (this.pingTimeoutTimer = this.setTimeoutFn(() => {
        this.onClose('ping timeout');
      }, this.pingInterval + this.pingTimeout)),
      this.opts.autoUnref && this.pingTimeoutTimer.unref();
  }
  onDrain() {
    this.writeBuffer.splice(0, this.prevBufferLen),
      (this.prevBufferLen = 0) === this.writeBuffer.length
        ? this.emitReserved('drain')
        : this.flush();
  }
  flush() {
    var t;
    'closed' !== this.readyState &&
      this.transport.writable &&
      !this.upgrading &&
      this.writeBuffer.length &&
      ((t = this.getWritablePackets()),
      this.transport.send(t),
      (this.prevBufferLen = t.length),
      this.emitReserved('flush'));
  }
  getWritablePackets() {
    if (
      this.maxPayload &&
      'polling' === this.transport.name &&
      1 < this.writeBuffer.length
    ) {
      let e = 1;
      for (let r = 0; r < this.writeBuffer.length; r++) {
        var t = this.writeBuffer[r].data;
        if ((t && (e += Cn(t)), 0 < r && e > this.maxPayload))
          return this.writeBuffer.slice(0, r);
        e += 2;
      }
    }
    return this.writeBuffer;
  }
  write(t, e, r) {
    return this.sendPacket('message', t, e, r), this;
  }
  send(t, e, r) {
    return this.sendPacket('message', t, e, r), this;
  }
  sendPacket(t, e, r, n) {
    'function' == typeof e && ((n = e), (e = void 0)),
      'function' == typeof r && ((n = r), (r = null)),
      'closing' !== this.readyState &&
        'closed' !== this.readyState &&
        (((r = r || {}).compress = !1 !== r.compress),
        this.emitReserved(
          'packetCreate',
          (t = { type: t, data: e, options: r })
        ),
        this.writeBuffer.push(t),
        n && this.once('flush', n),
        this.flush());
  }
  close() {
    const t = () => {
        this.onClose('forced close'), this.transport.close();
      },
      e = () => {
        this.off('upgrade', e), this.off('upgradeError', e), t();
      },
      r = () => {
        this.once('upgrade', e), this.once('upgradeError', e);
      };
    return (
      ('opening' !== this.readyState && 'open' !== this.readyState) ||
        ((this.readyState = 'closing'),
        this.writeBuffer.length
          ? this.once('drain', () => {
              (this.upgrading ? r : t)();
            })
          : (this.upgrading ? r : t)()),
      this
    );
  }
  onError(e) {
    (t.priorWebsocketSuccess = !1),
      this.emitReserved('error', e),
      this.onClose('transport error', e);
  }
  onClose(t, e) {
    ('opening' !== this.readyState &&
      'open' !== this.readyState &&
      'closing' !== this.readyState) ||
      (this.clearTimeoutFn(this.pingTimeoutTimer),
      this.transport.removeAllListeners('close'),
      this.transport.close(),
      this.transport.removeAllListeners(),
      'function' == typeof removeEventListener &&
        (removeEventListener(
          'beforeunload',
          this.beforeunloadEventListener,
          !1
        ),
        removeEventListener('offline', this.offlineEventListener, !1)),
      (this.readyState = 'closed'),
      (this.id = null),
      this.emitReserved('close', t, e),
      (this.writeBuffer = []),
      (this.prevBufferLen = 0));
  }
  filterUpgrades(t) {
    var e = [];
    let r = 0;
    for (var n = t.length; r < n; r++)
      ~this.transports.indexOf(t[r]) && e.push(t[r]);
    return e;
  }
};
Xn.protocol = 4;
const Jn = 'function' == typeof ArrayBuffer,
  Kn = (t) =>
    'function' == typeof ArrayBuffer.isView
      ? ArrayBuffer.isView(t)
      : t.buffer instanceof ArrayBuffer,
  Qn = Object.prototype.toString,
  Zn =
    'function' == typeof Blob ||
    ('undefined' != typeof Blob &&
      '[object BlobConstructor]' === Qn.call(Blob)),
  ts =
    'function' == typeof File ||
    ('undefined' != typeof File &&
      '[object FileConstructor]' === Qn.call(File));
function es(t) {
  return (
    (Jn && (t instanceof ArrayBuffer || Kn(t))) ||
    (Zn && t instanceof Blob) ||
    (ts && t instanceof File)
  );
}
function rs(t, e) {
  if (t && 'object' == typeof t)
    if (Array.isArray(t)) {
      for (let e = 0, r = t.length; e < r; e++) if (rs(t[e])) return !0;
    } else {
      if (es(t)) return !0;
      if (t.toJSON && 'function' == typeof t.toJSON && 1 === arguments.length)
        return rs(t.toJSON(), !0);
      for (const e in t)
        if (Object.prototype.hasOwnProperty.call(t, e) && rs(t[e])) return !0;
    }
  return !1;
}
function ns(t) {
  var e = [],
    r = t.data;
  return (
    (t.data = ss(r, e)), (t.attachments = e.length), { packet: t, buffers: e }
  );
}
function ss(t, e) {
  if (!t) return t;
  var r;
  if (es(t)) return (r = { _placeholder: !0, num: e.length }), e.push(t), r;
  if (Array.isArray(t)) {
    var n = new Array(t.length);
    for (let r = 0; r < t.length; r++) n[r] = ss(t[r], e);
    return n;
  }
  if ('object' != typeof t || t instanceof Date) return t;
  var s = {};
  for (const r in t)
    Object.prototype.hasOwnProperty.call(t, r) && (s[r] = ss(t[r], e));
  return s;
}
function os(t, e) {
  return (t.data = is(t.data, e)), delete t.attachments, t;
}
function is(t, e) {
  if (t) {
    if (t && !0 === t._placeholder) {
      if ('number' == typeof t.num && 0 <= t.num && t.num < e.length)
        return e[t.num];
      throw new Error('illegal attachments');
    }
    if (Array.isArray(t)) for (let r = 0; r < t.length; r++) t[r] = is(t[r], e);
    else if ('object' == typeof t)
      for (const r in t)
        Object.prototype.hasOwnProperty.call(t, r) && (t[r] = is(t[r], e));
  }
  return t;
}
const as = [
  'connect',
  'connect_error',
  'disconnect',
  'disconnecting',
  'newListener',
  'removeListener',
];
!(function (t) {
  (t[(t.CONNECT = 0)] = 'CONNECT'),
    (t[(t.DISCONNECT = 1)] = 'DISCONNECT'),
    (t[(t.EVENT = 2)] = 'EVENT'),
    (t[(t.ACK = 3)] = 'ACK'),
    (t[(t.CONNECT_ERROR = 4)] = 'CONNECT_ERROR'),
    (t[(t.BINARY_EVENT = 5)] = 'BINARY_EVENT'),
    (t[(t.BINARY_ACK = 6)] = 'BINARY_ACK');
})((lr = lr || {}));
function ls(t) {
  return '[object Object]' === Object.prototype.toString.call(t);
}
class cs extends yn {
  constructor(t) {
    super(), (this.reviver = t);
  }
  add(t) {
    let e;
    if ('string' == typeof t) {
      if (this.reconstructor)
        throw new Error('got plaintext data when reconstructing a packet');
      var r = (e = this.decodeString(t)).type === lr.BINARY_EVENT;
      ((!r && e.type !== lr.BINARY_ACK) ||
        ((e.type = r ? lr.EVENT : lr.ACK),
        (this.reconstructor = new hs(e)),
        0 === e.attachments)) &&
        super.emitReserved('decoded', e);
    } else {
      if (!es(t) && !t.base64) throw new Error('Unknown type: ' + t);
      if (!this.reconstructor)
        throw new Error('got binary data when not reconstructing a packet');
      (e = this.reconstructor.takeBinaryData(t)) &&
        ((this.reconstructor = null), super.emitReserved('decoded', e));
    }
  }
  decodeString(t) {
    let e = 0;
    var r = { type: Number(t.charAt(0)) };
    if (void 0 === lr[r.type]) throw new Error('unknown packet type ' + r.type);
    if (r.type === lr.BINARY_EVENT || r.type === lr.BINARY_ACK) {
      for (var n = e + 1; '-' !== t.charAt(++e) && e != t.length; );
      if ((n = t.substring(n, e)) != Number(n) || '-' !== t.charAt(e))
        throw new Error('Illegal attachments');
      r.attachments = Number(n);
    }
    if ('/' === t.charAt(e + 1)) {
      for (n = e + 1; ++e && ',' !== t.charAt(e) && e !== t.length; );
      r.nsp = t.substring(n, e);
    } else r.nsp = '/';
    if ('' !== (n = t.charAt(e + 1)) && Number(n) == n) {
      for (n = e + 1; ++e; ) {
        var s = t.charAt(e);
        if (null == s || Number(s) != s) {
          --e;
          break;
        }
        if (e === t.length) break;
      }
      r.id = Number(t.substring(n, e + 1));
    }
    if (t.charAt(++e)) {
      if (((n = this.tryParse(t.substr(e))), !cs.isPayloadValid(r.type, n)))
        throw new Error('invalid payload');
      r.data = n;
    }
    return r;
  }
  tryParse(t) {
    try {
      return JSON.parse(t, this.reviver);
    } catch (t) {
      return !1;
    }
  }
  static isPayloadValid(t, e) {
    switch (t) {
      case lr.CONNECT:
        return ls(e);
      case lr.DISCONNECT:
        return void 0 === e;
      case lr.CONNECT_ERROR:
        return 'string' == typeof e || ls(e);
      case lr.EVENT:
      case lr.BINARY_EVENT:
        return (
          Array.isArray(e) &&
          ('number' == typeof e[0] ||
            ('string' == typeof e[0] && -1 === as.indexOf(e[0])))
        );
      case lr.ACK:
      case lr.BINARY_ACK:
        return Array.isArray(e);
    }
  }
  destroy() {
    this.reconstructor &&
      (this.reconstructor.finishedReconstruction(),
      (this.reconstructor = null));
  }
}
class hs {
  constructor(t) {
    (this.packet = t), (this.buffers = []), (this.reconPack = t);
  }
  takeBinaryData(t) {
    return (
      this.buffers.push(t),
      this.buffers.length === this.reconPack.attachments
        ? ((t = os(this.reconPack, this.buffers)),
          this.finishedReconstruction(),
          t)
        : null
    );
  }
  finishedReconstruction() {
    (this.reconPack = null), (this.buffers = []);
  }
}
var us = Object.freeze({
  __proto__: null,
  Decoder: cs,
  Encoder: class {
    constructor(t) {
      this.replacer = t;
    }
    encode(t) {
      return (t.type !== lr.EVENT && t.type !== lr.ACK) || !rs(t)
        ? [this.encodeAsString(t)]
        : this.encodeAsBinary({
            type: t.type === lr.EVENT ? lr.BINARY_EVENT : lr.BINARY_ACK,
            nsp: t.nsp,
            data: t.data,
            id: t.id,
          });
    }
    encodeAsString(t) {
      let e = '' + t.type;
      return (
        (t.type !== lr.BINARY_EVENT && t.type !== lr.BINARY_ACK) ||
          (e += t.attachments + '-'),
        t.nsp && '/' !== t.nsp && (e += t.nsp + ','),
        null != t.id && (e += t.id),
        null != t.data && (e += JSON.stringify(t.data, this.replacer)),
        e
      );
    }
    encodeAsBinary(t) {
      t = ns(t);
      var e = this.encodeAsString(t.packet);
      return (t = t.buffers).unshift(e), t;
    }
  },
  get PacketType() {
    return lr;
  },
  protocol: 5,
});
function ps(t, e, r) {
  return (
    t.on(e, r),
    function () {
      t.off(e, r);
    }
  );
}
const ds = Object.freeze({
  connect: 1,
  connect_error: 1,
  disconnect: 1,
  disconnecting: 1,
  newListener: 1,
  removeListener: 1,
});
class fs extends yn {
  constructor(t, e, r) {
    super(),
      (this.connected = !1),
      (this.recovered = !1),
      (this.receiveBuffer = []),
      (this.sendBuffer = []),
      (this._queue = []),
      (this._queueSeq = 0),
      (this.ids = 0),
      (this.acks = {}),
      (this.flags = {}),
      (this.io = t),
      (this.nsp = e),
      r && r.auth && (this.auth = r.auth),
      (this._opts = Object.assign({}, r)),
      this.io._autoConnect && this.open();
  }
  get disconnected() {
    return !this.connected;
  }
  subEvents() {
    var t;
    this.subs ||
      ((t = this.io),
      (this.subs = [
        ps(t, 'open', this.onopen.bind(this)),
        ps(t, 'packet', this.onpacket.bind(this)),
        ps(t, 'error', this.onerror.bind(this)),
        ps(t, 'close', this.onclose.bind(this)),
      ]));
  }
  get active() {
    return !!this.subs;
  }
  connect() {
    return (
      this.connected ||
        (this.subEvents(),
        this.io._reconnecting || this.io.open(),
        'open' === this.io._readyState && this.onopen()),
      this
    );
  }
  open() {
    return this.connect();
  }
  send(...t) {
    return t.unshift('message'), this.emit.apply(this, t), this;
  }
  emit(t, ...e) {
    if (ds.hasOwnProperty(t))
      throw new Error('"' + t.toString() + '" is a reserved event name');
    var r, n;
    return (
      e.unshift(t),
      !this._opts.retries || this.flags.fromQueue || this.flags.volatile
        ? (((t = { type: lr.EVENT, data: e, options: {} }).options.compress =
            !1 !== this.flags.compress),
          'function' == typeof e[e.length - 1] &&
            ((r = this.ids++),
            (n = e.pop()),
            this._registerAckCallback(r, n),
            (t.id = r)),
          (n =
            this.io.engine &&
            this.io.engine.transport &&
            this.io.engine.transport.writable),
          (!this.flags.volatile || (n && this.connected)) &&
            (this.connected
              ? (this.notifyOutgoingListeners(t), this.packet(t))
              : this.sendBuffer.push(t)),
          (this.flags = {}))
        : this._addToQueue(e),
      this
    );
  }
  _registerAckCallback(t, e) {
    var r = null != (r = this.flags.timeout) ? r : this._opts.ackTimeout;
    if (void 0 === r) this.acks[t] = e;
    else {
      const n = this.io.setTimeoutFn(() => {
        delete this.acks[t];
        for (let e = 0; e < this.sendBuffer.length; e++)
          this.sendBuffer[e].id === t && this.sendBuffer.splice(e, 1);
        e.call(this, new Error('operation has timed out'));
      }, r);
      this.acks[t] = (...t) => {
        this.io.clearTimeoutFn(n), e.apply(this, [null, ...t]);
      };
    }
  }
  emitWithAck(t, ...e) {
    const r = void 0 !== this.flags.timeout || void 0 !== this._opts.ackTimeout;
    return new Promise((n, s) => {
      e.push((t, e) => (r ? (t ? s(t) : n(e)) : n(t))), this.emit(t, ...e);
    });
  }
  _addToQueue(t) {
    let e;
    'function' == typeof t[t.length - 1] && (e = t.pop());
    const r = {
      id: this._queueSeq++,
      tryCount: 0,
      pending: !1,
      args: t,
      flags: Object.assign({ fromQueue: !0 }, this.flags),
    };
    t.push((t, ...n) => {
      if (r === this._queue[0])
        return (
          null !== t
            ? r.tryCount > this._opts.retries &&
              (this._queue.shift(), e) &&
              e(t)
            : (this._queue.shift(), e && e(null, ...n)),
          (r.pending = !1),
          this._drainQueue()
        );
    }),
      this._queue.push(r),
      this._drainQueue();
  }
  _drainQueue(t = !1) {
    var e;
    !this.connected ||
      0 === this._queue.length ||
      ((e = this._queue[0]).pending && !t) ||
      ((e.pending = !0),
      e.tryCount++,
      (this.flags = e.flags),
      this.emit.apply(this, e.args));
  }
  packet(t) {
    (t.nsp = this.nsp), this.io._packet(t);
  }
  onopen() {
    'function' == typeof this.auth
      ? this.auth((t) => {
          this._sendConnectPacket(t);
        })
      : this._sendConnectPacket(this.auth);
  }
  _sendConnectPacket(t) {
    this.packet({
      type: lr.CONNECT,
      data: this._pid
        ? Object.assign({ pid: this._pid, offset: this._lastOffset }, t)
        : t,
    });
  }
  onerror(t) {
    this.connected || this.emitReserved('connect_error', t);
  }
  onclose(t, e) {
    (this.connected = !1),
      delete this.id,
      this.emitReserved('disconnect', t, e);
  }
  onpacket(t) {
    if (t.nsp === this.nsp)
      switch (t.type) {
        case lr.CONNECT:
          t.data && t.data.sid
            ? this.onconnect(t.data.sid, t.data.pid)
            : this.emitReserved(
                'connect_error',
                new Error(
                  'It seems you are trying to reach a Socket.IO server in v2.x with a v3.x client, but they are not compatible (more information here: https://socket.io/docs/v3/migrating-from-2-x-to-3-0/)'
                )
              );
          break;
        case lr.EVENT:
        case lr.BINARY_EVENT:
          this.onevent(t);
          break;
        case lr.ACK:
        case lr.BINARY_ACK:
          this.onack(t);
          break;
        case lr.DISCONNECT:
          this.ondisconnect();
          break;
        case lr.CONNECT_ERROR:
          this.destroy();
          var e = new Error(t.data.message);
          (e.data = t.data.data), this.emitReserved('connect_error', e);
      }
  }
  onevent(t) {
    var e = t.data || [];
    null != t.id && e.push(this.ack(t.id)),
      this.connected
        ? this.emitEvent(e)
        : this.receiveBuffer.push(Object.freeze(e));
  }
  emitEvent(t) {
    if (this._anyListeners && this._anyListeners.length)
      for (const e of this._anyListeners.slice()) e.apply(this, t);
    super.emit.apply(this, t),
      this._pid &&
        t.length &&
        'string' == typeof t[t.length - 1] &&
        (this._lastOffset = t[t.length - 1]);
  }
  ack(t) {
    const e = this;
    let r = !1;
    return function (...n) {
      r || ((r = !0), e.packet({ type: lr.ACK, id: t, data: n }));
    };
  }
  onack(t) {
    var e = this.acks[t.id];
    'function' == typeof e && (e.apply(this, t.data), delete this.acks[t.id]);
  }
  onconnect(t, e) {
    (this.id = t),
      (this.recovered = e && this._pid === e),
      (this._pid = e),
      (this.connected = !0),
      this.emitBuffered(),
      this.emitReserved('connect'),
      this._drainQueue(!0);
  }
  emitBuffered() {
    this.receiveBuffer.forEach((t) => this.emitEvent(t)),
      (this.receiveBuffer = []),
      this.sendBuffer.forEach((t) => {
        this.notifyOutgoingListeners(t), this.packet(t);
      }),
      (this.sendBuffer = []);
  }
  ondisconnect() {
    this.destroy(), this.onclose('io server disconnect');
  }
  destroy() {
    this.subs && (this.subs.forEach((t) => t()), (this.subs = void 0)),
      this.io._destroy(this);
  }
  disconnect() {
    return (
      this.connected && this.packet({ type: lr.DISCONNECT }),
      this.destroy(),
      this.connected && this.onclose('io client disconnect'),
      this
    );
  }
  close() {
    return this.disconnect();
  }
  compress(t) {
    return (this.flags.compress = t), this;
  }
  get volatile() {
    return (this.flags.volatile = !0), this;
  }
  timeout(t) {
    return (this.flags.timeout = t), this;
  }
  onAny(t) {
    return (
      (this._anyListeners = this._anyListeners || []),
      this._anyListeners.push(t),
      this
    );
  }
  prependAny(t) {
    return (
      (this._anyListeners = this._anyListeners || []),
      this._anyListeners.unshift(t),
      this
    );
  }
  offAny(t) {
    if (this._anyListeners)
      if (t) {
        var e = this._anyListeners;
        for (let r = 0; r < e.length; r++)
          if (t === e[r]) return e.splice(r, 1), this;
      } else this._anyListeners = [];
    return this;
  }
  listenersAny() {
    return this._anyListeners || [];
  }
  onAnyOutgoing(t) {
    return (
      (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
      this._anyOutgoingListeners.push(t),
      this
    );
  }
  prependAnyOutgoing(t) {
    return (
      (this._anyOutgoingListeners = this._anyOutgoingListeners || []),
      this._anyOutgoingListeners.unshift(t),
      this
    );
  }
  offAnyOutgoing(t) {
    if (this._anyOutgoingListeners)
      if (t) {
        var e = this._anyOutgoingListeners;
        for (let r = 0; r < e.length; r++)
          if (t === e[r]) return e.splice(r, 1), this;
      } else this._anyOutgoingListeners = [];
    return this;
  }
  listenersAnyOutgoing() {
    return this._anyOutgoingListeners || [];
  }
  notifyOutgoingListeners(t) {
    if (this._anyOutgoingListeners && this._anyOutgoingListeners.length)
      for (const e of this._anyOutgoingListeners.slice()) e.apply(this, t.data);
  }
}
function gs(t) {
  (this.ms = (t = t || {}).min || 100),
    (this.max = t.max || 1e4),
    (this.factor = t.factor || 2),
    (this.jitter = 0 < t.jitter && t.jitter <= 1 ? t.jitter : 0),
    (this.attempts = 0);
}
(gs.prototype.duration = function () {
  var t,
    e,
    r = this.ms * Math.pow(this.factor, this.attempts++);
  return (
    this.jitter &&
      ((t = Math.random()),
      (e = Math.floor(t * this.jitter * r)),
      (r = 0 == (1 & Math.floor(10 * t)) ? r - e : r + e)),
    0 | Math.min(r, this.max)
  );
}),
  (gs.prototype.reset = function () {
    this.attempts = 0;
  }),
  (gs.prototype.setMin = function (t) {
    this.ms = t;
  }),
  (gs.prototype.setMax = function (t) {
    this.max = t;
  }),
  (gs.prototype.setJitter = function (t) {
    this.jitter = t;
  });
class bs extends yn {
  constructor(t, e) {
    super(),
      (this.nsps = {}),
      (this.subs = []),
      t && 'object' == typeof t && ((e = t), (t = void 0)),
      ((e = e || {}).path = e.path || '/socket.io'),
      (this.opts = e),
      _n(this, e),
      this.reconnection(!1 !== e.reconnection),
      this.reconnectionAttempts(e.reconnectionAttempts || 1 / 0),
      this.reconnectionDelay(e.reconnectionDelay || 1e3),
      this.reconnectionDelayMax(e.reconnectionDelayMax || 5e3),
      this.randomizationFactor(null != (r = e.randomizationFactor) ? r : 0.5),
      (this.backoff = new gs({
        min: this.reconnectionDelay(),
        max: this.reconnectionDelayMax(),
        jitter: this.randomizationFactor(),
      })),
      this.timeout(null == e.timeout ? 2e4 : e.timeout),
      (this._readyState = 'closed'),
      (this.uri = t);
    var r = e.parser || us;
    (this.encoder = new r.Encoder()),
      (this.decoder = new r.Decoder()),
      (this._autoConnect = !1 !== e.autoConnect),
      this._autoConnect && this.open();
  }
  reconnection(t) {
    return arguments.length
      ? ((this._reconnection = !!t), this)
      : this._reconnection;
  }
  reconnectionAttempts(t) {
    return void 0 === t
      ? this._reconnectionAttempts
      : ((this._reconnectionAttempts = t), this);
  }
  reconnectionDelay(t) {
    var e;
    return void 0 === t
      ? this._reconnectionDelay
      : ((this._reconnectionDelay = t),
        null != (e = this.backoff) && e.setMin(t),
        this);
  }
  randomizationFactor(t) {
    var e;
    return void 0 === t
      ? this._randomizationFactor
      : ((this._randomizationFactor = t),
        null != (e = this.backoff) && e.setJitter(t),
        this);
  }
  reconnectionDelayMax(t) {
    var e;
    return void 0 === t
      ? this._reconnectionDelayMax
      : ((this._reconnectionDelayMax = t),
        null != (e = this.backoff) && e.setMax(t),
        this);
  }
  timeout(t) {
    return arguments.length ? ((this._timeout = t), this) : this._timeout;
  }
  maybeReconnectOnOpen() {
    !this._reconnecting &&
      this._reconnection &&
      0 === this.backoff.attempts &&
      this.reconnect();
  }
  open(t) {
    if (!~this._readyState.indexOf('open')) {
      this.engine = new Xn(this.uri, this.opts);
      const n = this.engine,
        s = this,
        o =
          ((this._readyState = 'opening'),
          (this.skipReconnect = !1),
          ps(n, 'open', function () {
            s.onopen(), t && t();
          })),
        i = (e) => {
          this.cleanup(),
            (this._readyState = 'closed'),
            this.emitReserved('error', e),
            t ? t(e) : this.maybeReconnectOnOpen();
        };
      var e = ps(n, 'error', i);
      if (!1 !== this._timeout) {
        var r = this._timeout;
        const t = this.setTimeoutFn(() => {
          o(), i(new Error('timeout')), n.close();
        }, r);
        this.opts.autoUnref && t.unref(),
          this.subs.push(() => {
            this.clearTimeoutFn(t);
          });
      }
      this.subs.push(o), this.subs.push(e);
    }
    return this;
  }
  connect(t) {
    return this.open(t);
  }
  onopen() {
    this.cleanup(), (this._readyState = 'open'), this.emitReserved('open');
    var t = this.engine;
    this.subs.push(
      ps(t, 'ping', this.onping.bind(this)),
      ps(t, 'data', this.ondata.bind(this)),
      ps(t, 'error', this.onerror.bind(this)),
      ps(t, 'close', this.onclose.bind(this)),
      ps(this.decoder, 'decoded', this.ondecoded.bind(this))
    );
  }
  onping() {
    this.emitReserved('ping');
  }
  ondata(t) {
    try {
      this.decoder.add(t);
    } catch (t) {
      this.onclose('parse error', t);
    }
  }
  ondecoded(t) {
    Wn(() => {
      this.emitReserved('packet', t);
    }, this.setTimeoutFn);
  }
  onerror(t) {
    this.emitReserved('error', t);
  }
  socket(t, e) {
    let r = this.nsps[t];
    return (
      r
        ? this._autoConnect && !r.active && r.connect()
        : ((r = new fs(this, t, e)), (this.nsps[t] = r)),
      r
    );
  }
  _destroy(t) {
    for (const t of Object.keys(this.nsps)) {
      if (this.nsps[t].active) return;
    }
    this._close();
  }
  _packet(t) {
    var e = this.encoder.encode(t);
    for (let r = 0; r < e.length; r++) this.engine.write(e[r], t.options);
  }
  cleanup() {
    this.subs.forEach((t) => t()),
      (this.subs.length = 0),
      this.decoder.destroy();
  }
  _close() {
    (this.skipReconnect = !0),
      (this._reconnecting = !1),
      this.onclose('forced close'),
      this.engine && this.engine.close();
  }
  disconnect() {
    return this._close();
  }
  onclose(t, e) {
    this.cleanup(),
      this.backoff.reset(),
      (this._readyState = 'closed'),
      this.emitReserved('close', t, e),
      this._reconnection && !this.skipReconnect && this.reconnect();
  }
  reconnect() {
    if (this._reconnecting || this.skipReconnect) return this;
    const t = this;
    if (this.backoff.attempts >= this._reconnectionAttempts)
      this.backoff.reset(),
        this.emitReserved('reconnect_failed'),
        (this._reconnecting = !1);
    else {
      var e = this.backoff.duration();
      this._reconnecting = !0;
      const r = this.setTimeoutFn(() => {
        t.skipReconnect ||
          (this.emitReserved('reconnect_attempt', t.backoff.attempts),
          t.skipReconnect) ||
          t.open((e) => {
            e
              ? ((t._reconnecting = !1),
                t.reconnect(),
                this.emitReserved('reconnect_error', e))
              : t.onreconnect();
          });
      }, e);
      this.opts.autoUnref && r.unref(),
        this.subs.push(() => {
          this.clearTimeoutFn(r);
        });
    }
  }
  onreconnect() {
    var t = this.backoff.attempts;
    (this._reconnecting = !1),
      this.backoff.reset(),
      this.emitReserved('reconnect', t);
  }
}
const ms = {};
function ys(t, e) {
  'object' == typeof t && ((e = t), (t = void 0));
  t = (function (t, e = '', r) {
    let n = t;
    return (
      (r = r || ('undefined' != typeof location && location)),
      'string' == typeof (t = null == t ? r.protocol + '//' + r.host : t) &&
        ('/' === t.charAt(0) &&
          (t = '/' === t.charAt(1) ? r.protocol + t : r.host + t),
        /^(https?|wss?):\/\//.test(t) ||
          (t = void 0 !== r ? r.protocol + '//' + t : 'https://' + t),
        (n = Yn(t))),
      n.port ||
        (/^(http|ws)$/.test(n.protocol)
          ? (n.port = '80')
          : /^(http|ws)s$/.test(n.protocol) && (n.port = '443')),
      (n.path = n.path || '/'),
      (t = -1 !== n.host.indexOf(':') ? '[' + n.host + ']' : n.host),
      (n.id = n.protocol + '://' + t + ':' + n.port + e),
      (n.href =
        n.protocol + '://' + t + (r && r.port === n.port ? '' : ':' + n.port)),
      n
    );
  })(t, (e = e || {}).path || '/socket.io');
  var r = t.source,
    n = t.id,
    s = t.path;
  s = ms[n] && s in ms[n].nsps;
  let o;
  return (
    (o = (s =
      e.forceNew || e['force new connection'] || !1 === e.multiplex || s)
      ? new bs(r, e)
      : (ms[n] || (ms[n] = new bs(r, e)), ms[n])),
    t.query && !e.query && (e.query = t.queryKey),
    o.socket(t.path, e)
  );
}
Object.assign(ys, { Manager: bs, Socket: fs, io: ys, connect: ys });
const ws = nt('<style>'),
  vs = nt(
    '<div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true"><style></style><div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity animate-fade-in"></div><div class="fixed inset-0 z-10 overflow-y-auto"><div class="flex min-h-full items-center justify-center p-4 text-center sm:p-0"><div class="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">'
  ),
  xs = nt('<div><pre>');
const ks = (t) => {
    let e;
    const [r] = V(t, ['onOpen', 'onClose', 'isOpen', 'value']),
      [n, s] =
        (S(() => {
          e &&
            (e.innerHTML = (function (t) {
              return (t = (t =
                'string' != typeof t ? JSON.stringify(t, void 0, 2) : t)
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')).replace(
                /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
                function (t) {
                  let e = 'number';
                  return (
                    /^"/.test(t)
                      ? (e = /:$/.test(t) ? 'key' : 'string')
                      : /true|false/.test(t)
                      ? (e = 'boolean')
                      : /null/.test(t) && (e = 'null'),
                    '<span class="' + e + '">' + t + '</span>'
                  );
                }
              );
            })(JSON.stringify(t?.value, void 0, 2)));
        }),
        x(r.isOpen ?? !1)),
      o =
        (_(() => {
          xt(t.isOpen) || t.isOpen === n() || a();
        }),
        (t) => {
          t.stopPropagation();
        }),
      i = () => {
        s(!1), r.onClose?.(), (document.body.style.overflow = 'auto');
      },
      a = () => {
        n()
          ? i()
          : (s(!0), r.onOpen?.(), (document.body.style.overflow = 'hidden'));
      };
    return W(X, {
      get when() {
        return n();
      },
      get children() {
        return [
          (ct((s = ws()), vt), s),
          ((s = vs()),
          (r = s.firstChild),
          (n = r.nextSibling.nextSibling.firstChild.firstChild),
          s.style.setProperty('z-index', '1100'),
          s.addEventListener('click', i),
          ct(r, vt),
          n.style.setProperty('background-color', 'transparent'),
          n.style.setProperty('margin-left', '20px'),
          n.style.setProperty('margin-right', '20px'),
          n.addEventListener('click', o),
          n.addEventListener('pointerdown', o),
          ct(
            n,
            (() => {
              const r = C(() => !!t.value);
              return () => {
                return (
                  r() &&
                  ((n = (t = xs()).firstChild),
                  t.style.setProperty('background', 'white'),
                  t.style.setProperty('margin', 'auto'),
                  t.style.setProperty('padding', '7px'),
                  'function' == typeof (s = e) ? lt(s, n) : (e = n),
                  t)
                );
                var t, n, s;
              };
            })()
          ),
          s),
        ];
        var r, n, s;
      },
    });
  },
  _s = nt(
    '<div><div class="flex w-full h-full justify-center"><div class="overflow-y-scroll min-w-full w-full min-h-full px-3 pt-10 relative scrollable-container chatbot-chat-view scroll-smooth">'
  ),
  Cs = nt('<div>'),
  Os = nt('<div class="w-full h-32">'),
  Ss = 'Hi there! How can I help?',
  As = (t) => {
    let e, r, n;
    const [s, o] = x(''),
      [i, a] = x(!1),
      [l, c] = x(!1),
      [h, u] = x({}),
      [p, d] = x([{ message: t.welcomeMessage ?? Ss, type: 'apiMessage' }], {
        equals: !1,
      }),
      [f, g] = x(''),
      [b, m] = x(!1),
      y =
        (S(() => {
          r &&
            setTimeout(() => {
              e?.scrollTo(0, e.scrollHeight);
            }, 50);
        }),
        () => {
          setTimeout(() => {
            e?.scrollTo(0, e.scrollHeight);
          }, 50);
        }),
      w = (t) => {
        d((e) => [
          ...e.map((r, n) =>
            n === e.length - 1 ? { ...r, message: r.message + t } : r
          ),
        ]);
      },
      v = (t) => {
        d((e) => [
          ...e.map((r, n) =>
            n === e.length - 1 ? { ...r, sourceDocuments: t } : r
          ),
        ]);
      },
      O = async (e) => {
        if ((o(e), '' !== e.trim())) {
          a(!0), y();
          const s = t.welcomeMessage ?? Ss;
          var r,
            n = p().filter((t) => t.message !== s);
          n =
            (d((t) => [...t, { message: e, type: 'userMessage' }]),
            { question: e, history: n });
          if (
            (n =
              (t.chatflowConfig && (n.overrideConfig = t.chatflowConfig),
              b() && (n.socketIOClientId = f()),
              await Et({
                chatflowid: t.chatflowid,
                apiHost: t.apiHost,
                body: n,
              }))).data
          ) {
            const t = E(n.data);
            'object' == typeof t && t.text && t.sourceDocuments
              ? b() ||
                d((e) => [
                  ...e,
                  {
                    message: t.text,
                    sourceDocuments: t.sourceDocuments,
                    type: 'apiMessage',
                  },
                ])
              : b() || d((e) => [...e, { message: t, type: 'apiMessage' }]),
              a(!1),
              o(''),
              y();
          }
          n.error &&
            ((n = n.error),
            console.error(n),
            (n =
              'string' == typeof n
                ? n
                : n.response.data ||
                  n.response.status + ': ' + n.response.statusText),
            ([r = 'Oops! There seems to be an error. Please try again.'] = [n]),
            d((t) => [...t, { message: r, type: 'apiMessage' }]),
            a(!1),
            o(''),
            y());
        }
      },
      A =
        (_(() => {
          p() && y();
        }),
        _(() => {
          t.fontSize && n && (n.style.fontSize = t.fontSize + 'px');
        }),
        _(async () => {
          var e = (
            await (({ chatflowid: t, apiHost: e = 'http://localhost:3000' }) =>
              _t({
                method: 'GET',
                url: e + '/api/v1/chatflows-streaming/' + t,
              }))({ chatflowid: t.chatflowid, apiHost: t.apiHost })
          ).data;
          e && m(e?.isStreaming ?? !1);
          const r = ys(t.apiHost);
          return (
            r.on('connect', () => {
              g(r.id);
            }),
            r.on('start', () => {
              d((t) => [...t, { message: '', type: 'apiMessage' }]);
            }),
            r.on('sourceDocuments', v),
            r.on('token', w),
            () => {
              o(''),
                a(!1),
                d([{ message: t.welcomeMessage ?? Ss, type: 'apiMessage' }]),
                r && (r.disconnect(), g(''));
            }
          );
        }),
        (t) => {
          try {
            return new URL(t);
          } catch (t) {}
        }),
      E = (t) => (
        t.sourceDocuments &&
          t.sourceDocuments[0].metadata.length &&
          (t.sourceDocuments = t.sourceDocuments.map((t) => {
            var e = t.metadata.reduce((t, e) => ((t[e.name] = e.value), t), {});
            return { pageContent: t.pageContent, metadata: e };
          })),
        t
      );
    return [
      (() => {
        const o = _s(),
          a = o.firstChild,
          l = a.firstChild;
        var h;
        return (
          'function' ==
          typeof (h = ('function' == typeof (h = n) ? lt(h, o) : (n = o), e))
            ? lt(h, l)
            : (e = l),
          l.style.setProperty('padding-bottom', '100px'),
          ct(
            l,
            W(Y, {
              get each() {
                return [...p()];
              },
              children: (e, r) => [
                C(
                  (() => {
                    const r = C(() => 'userMessage' === e.type);
                    return () =>
                      r() &&
                      W(zr, {
                        get message() {
                          return e.message;
                        },
                        get backgroundColor() {
                          return t.userMessage?.backgroundColor;
                        },
                        get textColor() {
                          return t.userMessage?.textColor;
                        },
                        get showAvatar() {
                          return t.userMessage?.showAvatar;
                        },
                        get avatarSrc() {
                          return t.userMessage?.avatarSrc;
                        },
                      });
                  })()
                ),
                C(
                  (() => {
                    const r = C(() => 'apiMessage' === e.type);
                    return () =>
                      r() &&
                      W(qr, {
                        get message() {
                          return e.message;
                        },
                        get backgroundColor() {
                          return t.botMessage?.backgroundColor;
                        },
                        get textColor() {
                          return t.botMessage?.textColor;
                        },
                        get showAvatar() {
                          return t.botMessage?.showAvatar;
                        },
                        get avatarSrc() {
                          return t.botMessage?.avatarSrc;
                        },
                      });
                  })()
                ),
                C(
                  (() => {
                    const t = C(
                      () =>
                        !(
                          'userMessage' !== e.type ||
                          !i() ||
                          r() !== p().length - 1
                        )
                    );
                    return () => t() && W(Fr, {});
                  })()
                ),
                C(
                  (() => {
                    const t = C(
                      () => !(!e.sourceDocuments || !e.sourceDocuments.length)
                    );
                    return () => {
                      return (
                        t() &&
                        ((r = Cs()).style.setProperty('display', 'flex'),
                        r.style.setProperty('flex-direction', 'row'),
                        r.style.setProperty('width', '100%'),
                        ct(
                          r,
                          W(Y, {
                            get each() {
                              return [
                                ...((t) => {
                                  const e = [],
                                    r = [];
                                  return (
                                    (t = E(t)).sourceDocuments.forEach((t) => {
                                      A(t.metadata.source) &&
                                      !e.includes(t.metadata.source)
                                        ? (e.push(t.metadata.source), r.push(t))
                                        : A(t.metadata.source) || r.push(t);
                                    }),
                                    r
                                  );
                                })(e),
                              ];
                            },
                            children: (t) => {
                              const e = A(t.metadata.source);
                              return W(Gr, {
                                get pageContent() {
                                  return e ? e.pathname : t.pageContent;
                                },
                                get metadata() {
                                  return t.metadata;
                                },
                                onSourceClick: () => {
                                  e
                                    ? window.open(t.metadata.source, '_blank')
                                    : (u(t), c(!0));
                                },
                              });
                            },
                          })
                        ),
                        r)
                      );
                      var r;
                    };
                  })()
                ),
              ],
            })
          ),
          ct(
            a,
            W(yr, {
              get backgroundColor() {
                return t.textInput?.backgroundColor;
              },
              get textColor() {
                return t.textInput?.textColor;
              },
              get placeholder() {
                return t.textInput?.placeholder;
              },
              get sendButtonColor() {
                return t.textInput?.sendButtonColor;
              },
              get fontSize() {
                return t.fontSize;
              },
              get defaultValue() {
                return s();
              },
              onSubmit: O,
            }),
            null
          ),
          ct(
            o,
            W(Xr, {
              get badgeBackgroundColor() {
                return t.badgeBackgroundColor;
              },
              get poweredByTextColor() {
                return t.poweredByTextColor;
              },
              botContainer: n,
            }),
            null
          ),
          ct(
            o,
            W(Es, {
              ref(t) {
                'function' == typeof r ? r(t) : (r = t);
              },
            }),
            null
          ),
          k(() =>
            it(
              o,
              'relative flex w-full h-full text-base overflow-hidden bg-cover bg-center flex-col items-center chatbot-container ' +
                t.class
            )
          ),
          o
        );
      })(),
      C(
        (() => {
          const t = C(() => !!l());
          return () =>
            t() &&
            W(ks, {
              get isOpen() {
                return l();
              },
              get value() {
                return h();
              },
              onClose: () => c(!1),
            });
        })()
      ),
    ];
  },
  Es = (t) => {
    return (
      (e = Os()), 'function' == typeof (r = t.ref) ? lt(r, e) : (t.ref = e), e
    );
    var e, r;
  },
  Ts = nt('<style>'),
  Ps = nt('<div part="bot">'),
  Rs = (t) => {
    const [e] = V(t, ['theme']),
      [r, n] = x(!1),
      [s, o] = x(!1);
    var i;
    return [
      (ct((i = Ts()), vt), i),
      W(
        At,
        G(() => e.theme?.button, {
          toggleBot: () => {
            r() ? n(!1) : (s() || o(!0), n(!0));
          },
          get isBotOpened() {
            return r();
          },
        })
      ),
      (() => {
        const n = Ps();
        return (
          n.style.setProperty(
            'transition',
            'transform 200ms cubic-bezier(0, 1.2, 1, 1), opacity 150ms ease-out'
          ),
          n.style.setProperty('transform-origin', 'bottom right'),
          n.style.setProperty('box-shadow', 'rgb(0 0 0 / 16%) 0px 5px 40px'),
          n.style.setProperty('z-index', '42424242'),
          ct(
            n,
            W(X, {
              get when() {
                return s();
              },
              get children() {
                return W(As, {
                  get badgeBackgroundColor() {
                    return e.theme?.chatWindow?.backgroundColor;
                  },
                  get welcomeMessage() {
                    return e.theme?.chatWindow?.welcomeMessage;
                  },
                  get poweredByTextColor() {
                    return e.theme?.chatWindow?.poweredByTextColor;
                  },
                  get textInput() {
                    return e.theme?.chatWindow?.textInput;
                  },
                  get botMessage() {
                    return e.theme?.chatWindow?.botMessage;
                  },
                  get userMessage() {
                    return e.theme?.chatWindow?.userMessage;
                  },
                  get fontSize() {
                    return e.theme?.chatWindow?.fontSize;
                  },
                  get chatflowid() {
                    return t.chatflowid;
                  },
                  get chatflowConfig() {
                    return t.chatflowConfig;
                  },
                  get apiHost() {
                    return t.apiHost;
                  },
                });
              },
            })
          ),
          k(
            (s) => {
              var o = e.theme?.chatWindow?.height
                  ? e.theme?.chatWindow?.height.toString() + 'px'
                  : 'calc(100% - 100px)',
                i = r() ? 'scale3d(1, 1, 1)' : 'scale3d(0, 0, 1)',
                a = e.theme?.chatWindow?.backgroundColor || '#ffffff',
                l =
                  'fixed sm:right-5 rounded-lg w-full sm:w-[400px] max-h-[704px]' +
                  (r() ? ' opacity-1' : ' opacity-0 pointer-events-none') +
                  ('large' === t.theme?.button?.size
                    ? ' bottom-24'
                    : ' bottom-20');
              return (
                o !== s._v$ &&
                  (null != (s._v$ = o)
                    ? n.style.setProperty('height', o)
                    : n.style.removeProperty('height')),
                i !== s._v$2 &&
                  (null != (s._v$2 = i)
                    ? n.style.setProperty('transform', i)
                    : n.style.removeProperty('transform')),
                a !== s._v$3 &&
                  (null != (s._v$3 = a)
                    ? n.style.setProperty('background-color', a)
                    : n.style.removeProperty('background-color')),
                l !== s._v$4 && it(n, (s._v$4 = l)),
                s
              );
            },
            { _v$: void 0, _v$2: void 0, _v$3: void 0, _v$4: void 0 }
          ),
          n
        );
      })(),
    ];
  },
  $s = nt('<style>'),
  Bs = nt('<div>'),
  Ls = (t, { element: e }) => {
    const [r, n] = x(!1),
      s = new IntersectionObserver((t) => {
        t.some((t) => t.isIntersecting) && n(!0);
      });
    return (
      S(() => {
        s.observe(e);
      }),
      A(() => {
        s.disconnect();
      }),
      [
        (ct((o = $s()), vt), o),
        W(X, {
          get when() {
            return r();
          },
          get children() {
            const e = Bs();
            return (
              e.style.setProperty('margin', '0px'),
              ct(
                e,
                W(As, {
                  get badgeBackgroundColor() {
                    return t.theme?.chatWindow?.backgroundColor;
                  },
                  get welcomeMessage() {
                    return t.theme?.chatWindow?.welcomeMessage;
                  },
                  get poweredByTextColor() {
                    return t.theme?.chatWindow?.poweredByTextColor;
                  },
                  get textInput() {
                    return t.theme?.chatWindow?.textInput;
                  },
                  get botMessage() {
                    return t.theme?.chatWindow?.botMessage;
                  },
                  get userMessage() {
                    return t.theme?.chatWindow?.userMessage;
                  },
                  get fontSize() {
                    return t.theme?.chatWindow?.fontSize;
                  },
                  get chatflowid() {
                    return t.chatflowid;
                  },
                  get chatflowConfig() {
                    return t.chatflowConfig;
                  },
                  get apiHost() {
                    return t.apiHost;
                  },
                })
              ),
              k(
                (r) => {
                  var n = t.theme?.chatWindow?.backgroundColor || '#ffffff',
                    s = t.theme?.chatWindow?.height
                      ? t.theme?.chatWindow?.height.toString() + 'px'
                      : '100%',
                    o = t.theme?.chatWindow?.width
                      ? t.theme?.chatWindow?.width.toString() + 'px'
                      : '100%';
                  return (
                    n !== r._v$ &&
                      (null != (r._v$ = n)
                        ? e.style.setProperty('background-color', n)
                        : e.style.removeProperty('background-color')),
                    s !== r._v$2 &&
                      (null != (r._v$2 = s)
                        ? e.style.setProperty('height', s)
                        : e.style.removeProperty('height')),
                    o !== r._v$3 &&
                      (null != (r._v$3 = o)
                        ? e.style.setProperty('width', o)
                        : e.style.removeProperty('width')),
                    r
                  );
                },
                { _v$: void 0, _v$2: void 0, _v$3: void 0 }
              ),
              e
            );
          },
        }),
      ]
    );
    var o;
  },
  js = (t) => {
    var e = t.id
      ? document.getElementById(t.id)
      : document.querySelector('vertbuild-fullchatbot');
    if (!e) throw new Error('<vertbuild-fullchatbot> element not found.');
    Object.assign(e, t);
  },
  Ns = (t) => {
    var e = document.createElement('vert-chatbot');
    Object.assign(e, t), document.body.appendChild(e);
  },
  Ms =
    ('undefined' != typeof window &&
      (yt('vertbuild-fullchatbot', wt, Ls), yt('vert-chatbot', wt, Rs)),
    { initFull: js, init: Ns });
((t) => {
  'undefined' != typeof window && (window.Chatbot = { ...t });
})(Ms);
export { Ms as default };
