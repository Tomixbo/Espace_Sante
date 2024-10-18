(function () {
  const n = document.createElement("link").relList;
  if (n && n.supports && n.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) r(i);
  new MutationObserver((i) => {
    for (const l of i)
      if (l.type === "childList")
        for (const o of l.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && r(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(i) {
    const l = {};
    return (
      i.integrity && (l.integrity = i.integrity),
      i.referrerPolicy && (l.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (l.credentials = "include")
        : i.crossOrigin === "anonymous"
        ? (l.credentials = "omit")
        : (l.credentials = "same-origin"),
      l
    );
  }
  function r(i) {
    if (i.ep) return;
    i.ep = !0;
    const l = t(i);
    fetch(i.href, l);
  }
})();
var Ts =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
    ? window
    : typeof global < "u"
    ? global
    : typeof self < "u"
    ? self
    : {};
function zc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default")
    ? e.default
    : e;
}
var Lc = { exports: {} },
  cl = {},
  Oc = { exports: {} },
  W = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var Xr = Symbol.for("react.element"),
  jd = Symbol.for("react.portal"),
  Bd = Symbol.for("react.fragment"),
  Ud = Symbol.for("react.strict_mode"),
  Vd = Symbol.for("react.profiler"),
  Hd = Symbol.for("react.provider"),
  $d = Symbol.for("react.context"),
  Wd = Symbol.for("react.forward_ref"),
  Qd = Symbol.for("react.suspense"),
  bd = Symbol.for("react.memo"),
  Kd = Symbol.for("react.lazy"),
  zs = Symbol.iterator;
function Yd(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (zs && e[zs]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var Ac = {
    isMounted: function () {
      return !1;
    },
    enqueueForceUpdate: function () {},
    enqueueReplaceState: function () {},
    enqueueSetState: function () {},
  },
  Rc = Object.assign,
  Dc = {};
function Zt(e, n, t) {
  (this.props = e),
    (this.context = n),
    (this.refs = Dc),
    (this.updater = t || Ac);
}
Zt.prototype.isReactComponent = {};
Zt.prototype.setState = function (e, n) {
  if (typeof e != "object" && typeof e != "function" && e != null)
    throw Error(
      "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
    );
  this.updater.enqueueSetState(this, e, n, "setState");
};
Zt.prototype.forceUpdate = function (e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Mc() {}
Mc.prototype = Zt.prototype;
function mu(e, n, t) {
  (this.props = e),
    (this.context = n),
    (this.refs = Dc),
    (this.updater = t || Ac);
}
var gu = (mu.prototype = new Mc());
gu.constructor = mu;
Rc(gu, Zt.prototype);
gu.isPureReactComponent = !0;
var Ls = Array.isArray,
  Fc = Object.prototype.hasOwnProperty,
  yu = { current: null },
  jc = { key: !0, ref: !0, __self: !0, __source: !0 };
function Bc(e, n, t) {
  var r,
    i = {},
    l = null,
    o = null;
  if (n != null)
    for (r in (n.ref !== void 0 && (o = n.ref),
    n.key !== void 0 && (l = "" + n.key),
    n))
      Fc.call(n, r) && !jc.hasOwnProperty(r) && (i[r] = n[r]);
  var u = arguments.length - 2;
  if (u === 1) i.children = t;
  else if (1 < u) {
    for (var s = Array(u), a = 0; a < u; a++) s[a] = arguments[a + 2];
    i.children = s;
  }
  if (e && e.defaultProps)
    for (r in ((u = e.defaultProps), u)) i[r] === void 0 && (i[r] = u[r]);
  return {
    $$typeof: Xr,
    type: e,
    key: l,
    ref: o,
    props: i,
    _owner: yu.current,
  };
}
function Xd(e, n) {
  return {
    $$typeof: Xr,
    type: e.type,
    key: n,
    ref: e.ref,
    props: e.props,
    _owner: e._owner,
  };
}
function vu(e) {
  return typeof e == "object" && e !== null && e.$$typeof === Xr;
}
function qd(e) {
  var n = { "=": "=0", ":": "=2" };
  return (
    "$" +
    e.replace(/[=:]/g, function (t) {
      return n[t];
    })
  );
}
var Os = /\/+/g;
function Tl(e, n) {
  return typeof e == "object" && e !== null && e.key != null
    ? qd("" + e.key)
    : n.toString(36);
}
function Ei(e, n, t, r, i) {
  var l = typeof e;
  (l === "undefined" || l === "boolean") && (e = null);
  var o = !1;
  if (e === null) o = !0;
  else
    switch (l) {
      case "string":
      case "number":
        o = !0;
        break;
      case "object":
        switch (e.$$typeof) {
          case Xr:
          case jd:
            o = !0;
        }
    }
  if (o)
    return (
      (o = e),
      (i = i(o)),
      (e = r === "" ? "." + Tl(o, 0) : r),
      Ls(i)
        ? ((t = ""),
          e != null && (t = e.replace(Os, "$&/") + "/"),
          Ei(i, n, t, "", function (a) {
            return a;
          }))
        : i != null &&
          (vu(i) &&
            (i = Xd(
              i,
              t +
                (!i.key || (o && o.key === i.key)
                  ? ""
                  : ("" + i.key).replace(Os, "$&/") + "/") +
                e
            )),
          n.push(i)),
      1
    );
  if (((o = 0), (r = r === "" ? "." : r + ":"), Ls(e)))
    for (var u = 0; u < e.length; u++) {
      l = e[u];
      var s = r + Tl(l, u);
      o += Ei(l, n, t, s, i);
    }
  else if (((s = Yd(e)), typeof s == "function"))
    for (e = s.call(e), u = 0; !(l = e.next()).done; )
      (l = l.value), (s = r + Tl(l, u++)), (o += Ei(l, n, t, s, i));
  else if (l === "object")
    throw (
      ((n = String(e)),
      Error(
        "Objects are not valid as a React child (found: " +
          (n === "[object Object]"
            ? "object with keys {" + Object.keys(e).join(", ") + "}"
            : n) +
          "). If you meant to render a collection of children, use an array instead."
      ))
    );
  return o;
}
function ri(e, n, t) {
  if (e == null) return e;
  var r = [],
    i = 0;
  return (
    Ei(e, r, "", "", function (l) {
      return n.call(t, l, i++);
    }),
    r
  );
}
function Gd(e) {
  if (e._status === -1) {
    var n = e._result;
    (n = n()),
      n.then(
        function (t) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 1), (e._result = t));
        },
        function (t) {
          (e._status === 0 || e._status === -1) &&
            ((e._status = 2), (e._result = t));
        }
      ),
      e._status === -1 && ((e._status = 0), (e._result = n));
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var Oe = { current: null },
  Ci = { transition: null },
  Jd = {
    ReactCurrentDispatcher: Oe,
    ReactCurrentBatchConfig: Ci,
    ReactCurrentOwner: yu,
  };
function Uc() {
  throw Error("act(...) is not supported in production builds of React.");
}
W.Children = {
  map: ri,
  forEach: function (e, n, t) {
    ri(
      e,
      function () {
        n.apply(this, arguments);
      },
      t
    );
  },
  count: function (e) {
    var n = 0;
    return (
      ri(e, function () {
        n++;
      }),
      n
    );
  },
  toArray: function (e) {
    return (
      ri(e, function (n) {
        return n;
      }) || []
    );
  },
  only: function (e) {
    if (!vu(e))
      throw Error(
        "React.Children.only expected to receive a single React element child."
      );
    return e;
  },
};
W.Component = Zt;
W.Fragment = Bd;
W.Profiler = Vd;
W.PureComponent = mu;
W.StrictMode = Ud;
W.Suspense = Qd;
W.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Jd;
W.act = Uc;
W.cloneElement = function (e, n, t) {
  if (e == null)
    throw Error(
      "React.cloneElement(...): The argument must be a React element, but you passed " +
        e +
        "."
    );
  var r = Rc({}, e.props),
    i = e.key,
    l = e.ref,
    o = e._owner;
  if (n != null) {
    if (
      (n.ref !== void 0 && ((l = n.ref), (o = yu.current)),
      n.key !== void 0 && (i = "" + n.key),
      e.type && e.type.defaultProps)
    )
      var u = e.type.defaultProps;
    for (s in n)
      Fc.call(n, s) &&
        !jc.hasOwnProperty(s) &&
        (r[s] = n[s] === void 0 && u !== void 0 ? u[s] : n[s]);
  }
  var s = arguments.length - 2;
  if (s === 1) r.children = t;
  else if (1 < s) {
    u = Array(s);
    for (var a = 0; a < s; a++) u[a] = arguments[a + 2];
    r.children = u;
  }
  return { $$typeof: Xr, type: e.type, key: i, ref: l, props: r, _owner: o };
};
W.createContext = function (e) {
  return (
    (e = {
      $$typeof: $d,
      _currentValue: e,
      _currentValue2: e,
      _threadCount: 0,
      Provider: null,
      Consumer: null,
      _defaultValue: null,
      _globalName: null,
    }),
    (e.Provider = { $$typeof: Hd, _context: e }),
    (e.Consumer = e)
  );
};
W.createElement = Bc;
W.createFactory = function (e) {
  var n = Bc.bind(null, e);
  return (n.type = e), n;
};
W.createRef = function () {
  return { current: null };
};
W.forwardRef = function (e) {
  return { $$typeof: Wd, render: e };
};
W.isValidElement = vu;
W.lazy = function (e) {
  return { $$typeof: Kd, _payload: { _status: -1, _result: e }, _init: Gd };
};
W.memo = function (e, n) {
  return { $$typeof: bd, type: e, compare: n === void 0 ? null : n };
};
W.startTransition = function (e) {
  var n = Ci.transition;
  Ci.transition = {};
  try {
    e();
  } finally {
    Ci.transition = n;
  }
};
W.unstable_act = Uc;
W.useCallback = function (e, n) {
  return Oe.current.useCallback(e, n);
};
W.useContext = function (e) {
  return Oe.current.useContext(e);
};
W.useDebugValue = function () {};
W.useDeferredValue = function (e) {
  return Oe.current.useDeferredValue(e);
};
W.useEffect = function (e, n) {
  return Oe.current.useEffect(e, n);
};
W.useId = function () {
  return Oe.current.useId();
};
W.useImperativeHandle = function (e, n, t) {
  return Oe.current.useImperativeHandle(e, n, t);
};
W.useInsertionEffect = function (e, n) {
  return Oe.current.useInsertionEffect(e, n);
};
W.useLayoutEffect = function (e, n) {
  return Oe.current.useLayoutEffect(e, n);
};
W.useMemo = function (e, n) {
  return Oe.current.useMemo(e, n);
};
W.useReducer = function (e, n, t) {
  return Oe.current.useReducer(e, n, t);
};
W.useRef = function (e) {
  return Oe.current.useRef(e);
};
W.useState = function (e) {
  return Oe.current.useState(e);
};
W.useSyncExternalStore = function (e, n, t) {
  return Oe.current.useSyncExternalStore(e, n, t);
};
W.useTransition = function () {
  return Oe.current.useTransition();
};
W.version = "18.3.1";
Oc.exports = W;
var fe = Oc.exports;
const Zd = zc(fe);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var eh = fe,
  nh = Symbol.for("react.element"),
  th = Symbol.for("react.fragment"),
  rh = Object.prototype.hasOwnProperty,
  ih = eh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
  lh = { key: !0, ref: !0, __self: !0, __source: !0 };
function Vc(e, n, t) {
  var r,
    i = {},
    l = null,
    o = null;
  t !== void 0 && (l = "" + t),
    n.key !== void 0 && (l = "" + n.key),
    n.ref !== void 0 && (o = n.ref);
  for (r in n) rh.call(n, r) && !lh.hasOwnProperty(r) && (i[r] = n[r]);
  if (e && e.defaultProps)
    for (r in ((n = e.defaultProps), n)) i[r] === void 0 && (i[r] = n[r]);
  return {
    $$typeof: nh,
    type: e,
    key: l,
    ref: o,
    props: i,
    _owner: ih.current,
  };
}
cl.Fragment = th;
cl.jsx = Vc;
cl.jsxs = Vc;
Lc.exports = cl;
var ku = Lc.exports;
const Hc = ku.Fragment,
  X = ku.jsx,
  xe = ku.jsxs;
var po = {},
  $c = { exports: {} },
  Ye = {},
  Wc = { exports: {} },
  Qc = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ (function (e) {
  function n(P, j) {
    var g = P.length;
    P.push(j);
    e: for (; 0 < g; ) {
      var K = (g - 1) >>> 1,
        J = P[K];
      if (0 < i(J, j)) (P[K] = j), (P[g] = J), (g = K);
      else break e;
    }
  }
  function t(P) {
    return P.length === 0 ? null : P[0];
  }
  function r(P) {
    if (P.length === 0) return null;
    var j = P[0],
      g = P.pop();
    if (g !== j) {
      P[0] = g;
      e: for (var K = 0, J = P.length, v = J >>> 1; K < v; ) {
        var ge = 2 * (K + 1) - 1,
          ln = P[ge],
          ie = ge + 1,
          hn = P[ie];
        if (0 > i(ln, g))
          ie < J && 0 > i(hn, ln)
            ? ((P[K] = hn), (P[ie] = g), (K = ie))
            : ((P[K] = ln), (P[ge] = g), (K = ge));
        else if (ie < J && 0 > i(hn, g)) (P[K] = hn), (P[ie] = g), (K = ie);
        else break e;
      }
    }
    return j;
  }
  function i(P, j) {
    var g = P.sortIndex - j.sortIndex;
    return g !== 0 ? g : P.id - j.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var l = performance;
    e.unstable_now = function () {
      return l.now();
    };
  } else {
    var o = Date,
      u = o.now();
    e.unstable_now = function () {
      return o.now() - u;
    };
  }
  var s = [],
    a = [],
    c = 1,
    f = null,
    d = 3,
    p = !1,
    k = !1,
    w = !1,
    T = typeof setTimeout == "function" ? setTimeout : null,
    h = typeof clearTimeout == "function" ? clearTimeout : null,
    m = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" &&
    navigator.scheduling !== void 0 &&
    navigator.scheduling.isInputPending !== void 0 &&
    navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function y(P) {
    for (var j = t(a); j !== null; ) {
      if (j.callback === null) r(a);
      else if (j.startTime <= P)
        r(a), (j.sortIndex = j.expirationTime), n(s, j);
      else break;
      j = t(a);
    }
  }
  function S(P) {
    if (((w = !1), y(P), !k))
      if (t(s) !== null) (k = !0), M(C);
      else {
        var j = t(a);
        j !== null && H(S, j.startTime - P);
      }
  }
  function C(P, j) {
    (k = !1), w && ((w = !1), h(O), (O = -1)), (p = !0);
    var g = d;
    try {
      for (
        y(j), f = t(s);
        f !== null && (!(f.expirationTime > j) || (P && !L()));

      ) {
        var K = f.callback;
        if (typeof K == "function") {
          (f.callback = null), (d = f.priorityLevel);
          var J = K(f.expirationTime <= j);
          (j = e.unstable_now()),
            typeof J == "function" ? (f.callback = J) : f === t(s) && r(s),
            y(j);
        } else r(s);
        f = t(s);
      }
      if (f !== null) var v = !0;
      else {
        var ge = t(a);
        ge !== null && H(S, ge.startTime - j), (v = !1);
      }
      return v;
    } finally {
      (f = null), (d = g), (p = !1);
    }
  }
  var x = !1,
    N = null,
    O = -1,
    F = 5,
    D = -1;
  function L() {
    return !(e.unstable_now() - D < F);
  }
  function A() {
    if (N !== null) {
      var P = e.unstable_now();
      D = P;
      var j = !0;
      try {
        j = N(!0, P);
      } finally {
        j ? b() : ((x = !1), (N = null));
      }
    } else x = !1;
  }
  var b;
  if (typeof m == "function")
    b = function () {
      m(A);
    };
  else if (typeof MessageChannel < "u") {
    var ee = new MessageChannel(),
      V = ee.port2;
    (ee.port1.onmessage = A),
      (b = function () {
        V.postMessage(null);
      });
  } else
    b = function () {
      T(A, 0);
    };
  function M(P) {
    (N = P), x || ((x = !0), b());
  }
  function H(P, j) {
    O = T(function () {
      P(e.unstable_now());
    }, j);
  }
  (e.unstable_IdlePriority = 5),
    (e.unstable_ImmediatePriority = 1),
    (e.unstable_LowPriority = 4),
    (e.unstable_NormalPriority = 3),
    (e.unstable_Profiling = null),
    (e.unstable_UserBlockingPriority = 2),
    (e.unstable_cancelCallback = function (P) {
      P.callback = null;
    }),
    (e.unstable_continueExecution = function () {
      k || p || ((k = !0), M(C));
    }),
    (e.unstable_forceFrameRate = function (P) {
      0 > P || 125 < P
        ? console.error(
            "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
          )
        : (F = 0 < P ? Math.floor(1e3 / P) : 5);
    }),
    (e.unstable_getCurrentPriorityLevel = function () {
      return d;
    }),
    (e.unstable_getFirstCallbackNode = function () {
      return t(s);
    }),
    (e.unstable_next = function (P) {
      switch (d) {
        case 1:
        case 2:
        case 3:
          var j = 3;
          break;
        default:
          j = d;
      }
      var g = d;
      d = j;
      try {
        return P();
      } finally {
        d = g;
      }
    }),
    (e.unstable_pauseExecution = function () {}),
    (e.unstable_requestPaint = function () {}),
    (e.unstable_runWithPriority = function (P, j) {
      switch (P) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          P = 3;
      }
      var g = d;
      d = P;
      try {
        return j();
      } finally {
        d = g;
      }
    }),
    (e.unstable_scheduleCallback = function (P, j, g) {
      var K = e.unstable_now();
      switch (
        (typeof g == "object" && g !== null
          ? ((g = g.delay), (g = typeof g == "number" && 0 < g ? K + g : K))
          : (g = K),
        P)
      ) {
        case 1:
          var J = -1;
          break;
        case 2:
          J = 250;
          break;
        case 5:
          J = 1073741823;
          break;
        case 4:
          J = 1e4;
          break;
        default:
          J = 5e3;
      }
      return (
        (J = g + J),
        (P = {
          id: c++,
          callback: j,
          priorityLevel: P,
          startTime: g,
          expirationTime: J,
          sortIndex: -1,
        }),
        g > K
          ? ((P.sortIndex = g),
            n(a, P),
            t(s) === null &&
              P === t(a) &&
              (w ? (h(O), (O = -1)) : (w = !0), H(S, g - K)))
          : ((P.sortIndex = J), n(s, P), k || p || ((k = !0), M(C))),
        P
      );
    }),
    (e.unstable_shouldYield = L),
    (e.unstable_wrapCallback = function (P) {
      var j = d;
      return function () {
        var g = d;
        d = j;
        try {
          return P.apply(this, arguments);
        } finally {
          d = g;
        }
      };
    });
})(Qc);
Wc.exports = Qc;
var oh = Wc.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var uh = fe,
  Ke = oh;
function _(e) {
  for (
    var n = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, t = 1;
    t < arguments.length;
    t++
  )
    n += "&args[]=" + encodeURIComponent(arguments[t]);
  return (
    "Minified React error #" +
    e +
    "; visit " +
    n +
    " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
  );
}
var bc = new Set(),
  Lr = {};
function vt(e, n) {
  bt(e, n), bt(e + "Capture", n);
}
function bt(e, n) {
  for (Lr[e] = n, e = 0; e < n.length; e++) bc.add(n[e]);
}
var Tn = !(
    typeof window > "u" ||
    typeof window.document > "u" ||
    typeof window.document.createElement > "u"
  ),
  ho = Object.prototype.hasOwnProperty,
  sh =
    /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
  As = {},
  Rs = {};
function ah(e) {
  return ho.call(Rs, e)
    ? !0
    : ho.call(As, e)
    ? !1
    : sh.test(e)
    ? (Rs[e] = !0)
    : ((As[e] = !0), !1);
}
function ch(e, n, t, r) {
  if (t !== null && t.type === 0) return !1;
  switch (typeof n) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r
        ? !1
        : t !== null
        ? !t.acceptsBooleans
        : ((e = e.toLowerCase().slice(0, 5)), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function fh(e, n, t, r) {
  if (n === null || typeof n > "u" || ch(e, n, t, r)) return !0;
  if (r) return !1;
  if (t !== null)
    switch (t.type) {
      case 3:
        return !n;
      case 4:
        return n === !1;
      case 5:
        return isNaN(n);
      case 6:
        return isNaN(n) || 1 > n;
    }
  return !1;
}
function Ae(e, n, t, r, i, l, o) {
  (this.acceptsBooleans = n === 2 || n === 3 || n === 4),
    (this.attributeName = r),
    (this.attributeNamespace = i),
    (this.mustUseProperty = t),
    (this.propertyName = e),
    (this.type = n),
    (this.sanitizeURL = l),
    (this.removeEmptyString = o);
}
var Ce = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
  .split(" ")
  .forEach(function (e) {
    Ce[e] = new Ae(e, 0, !1, e, null, !1, !1);
  });
[
  ["acceptCharset", "accept-charset"],
  ["className", "class"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
].forEach(function (e) {
  var n = e[0];
  Ce[n] = new Ae(n, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function (e) {
  Ce[e] = new Ae(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
[
  "autoReverse",
  "externalResourcesRequired",
  "focusable",
  "preserveAlpha",
].forEach(function (e) {
  Ce[e] = new Ae(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
  .split(" ")
  .forEach(function (e) {
    Ce[e] = new Ae(e, 3, !1, e.toLowerCase(), null, !1, !1);
  });
["checked", "multiple", "muted", "selected"].forEach(function (e) {
  Ce[e] = new Ae(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function (e) {
  Ce[e] = new Ae(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function (e) {
  Ce[e] = new Ae(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function (e) {
  Ce[e] = new Ae(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var wu = /[\-:]([a-z])/g;
function xu(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
  .split(" ")
  .forEach(function (e) {
    var n = e.replace(wu, xu);
    Ce[n] = new Ae(n, 1, !1, e, null, !1, !1);
  });
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
  .split(" ")
  .forEach(function (e) {
    var n = e.replace(wu, xu);
    Ce[n] = new Ae(n, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
  });
["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
  var n = e.replace(wu, xu);
  Ce[n] = new Ae(n, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function (e) {
  Ce[e] = new Ae(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
Ce.xlinkHref = new Ae(
  "xlinkHref",
  1,
  !1,
  "xlink:href",
  "http://www.w3.org/1999/xlink",
  !0,
  !1
);
["src", "href", "action", "formAction"].forEach(function (e) {
  Ce[e] = new Ae(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function Su(e, n, t, r) {
  var i = Ce.hasOwnProperty(n) ? Ce[n] : null;
  (i !== null
    ? i.type !== 0
    : r ||
      !(2 < n.length) ||
      (n[0] !== "o" && n[0] !== "O") ||
      (n[1] !== "n" && n[1] !== "N")) &&
    (fh(n, t, i, r) && (t = null),
    r || i === null
      ? ah(n) && (t === null ? e.removeAttribute(n) : e.setAttribute(n, "" + t))
      : i.mustUseProperty
      ? (e[i.propertyName] = t === null ? (i.type === 3 ? !1 : "") : t)
      : ((n = i.attributeName),
        (r = i.attributeNamespace),
        t === null
          ? e.removeAttribute(n)
          : ((i = i.type),
            (t = i === 3 || (i === 4 && t === !0) ? "" : "" + t),
            r ? e.setAttributeNS(r, n, t) : e.setAttribute(n, t))));
}
var Rn = uh.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
  ii = Symbol.for("react.element"),
  _t = Symbol.for("react.portal"),
  Nt = Symbol.for("react.fragment"),
  Eu = Symbol.for("react.strict_mode"),
  mo = Symbol.for("react.profiler"),
  Kc = Symbol.for("react.provider"),
  Yc = Symbol.for("react.context"),
  Cu = Symbol.for("react.forward_ref"),
  go = Symbol.for("react.suspense"),
  yo = Symbol.for("react.suspense_list"),
  Pu = Symbol.for("react.memo"),
  jn = Symbol.for("react.lazy"),
  Xc = Symbol.for("react.offscreen"),
  Ds = Symbol.iterator;
function or(e) {
  return e === null || typeof e != "object"
    ? null
    : ((e = (Ds && e[Ds]) || e["@@iterator"]),
      typeof e == "function" ? e : null);
}
var ce = Object.assign,
  zl;
function gr(e) {
  if (zl === void 0)
    try {
      throw Error();
    } catch (t) {
      var n = t.stack.trim().match(/\n( *(at )?)/);
      zl = (n && n[1]) || "";
    }
  return (
    `
` +
    zl +
    e
  );
}
var Ll = !1;
function Ol(e, n) {
  if (!e || Ll) return "";
  Ll = !0;
  var t = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (n)
      if (
        ((n = function () {
          throw Error();
        }),
        Object.defineProperty(n.prototype, "props", {
          set: function () {
            throw Error();
          },
        }),
        typeof Reflect == "object" && Reflect.construct)
      ) {
        try {
          Reflect.construct(n, []);
        } catch (a) {
          var r = a;
        }
        Reflect.construct(e, [], n);
      } else {
        try {
          n.call();
        } catch (a) {
          r = a;
        }
        e.call(n.prototype);
      }
    else {
      try {
        throw Error();
      } catch (a) {
        r = a;
      }
      e();
    }
  } catch (a) {
    if (a && r && typeof a.stack == "string") {
      for (
        var i = a.stack.split(`
`),
          l = r.stack.split(`
`),
          o = i.length - 1,
          u = l.length - 1;
        1 <= o && 0 <= u && i[o] !== l[u];

      )
        u--;
      for (; 1 <= o && 0 <= u; o--, u--)
        if (i[o] !== l[u]) {
          if (o !== 1 || u !== 1)
            do
              if ((o--, u--, 0 > u || i[o] !== l[u])) {
                var s =
                  `
` + i[o].replace(" at new ", " at ");
                return (
                  e.displayName &&
                    s.includes("<anonymous>") &&
                    (s = s.replace("<anonymous>", e.displayName)),
                  s
                );
              }
            while (1 <= o && 0 <= u);
          break;
        }
    }
  } finally {
    (Ll = !1), (Error.prepareStackTrace = t);
  }
  return (e = e ? e.displayName || e.name : "") ? gr(e) : "";
}
function ph(e) {
  switch (e.tag) {
    case 5:
      return gr(e.type);
    case 16:
      return gr("Lazy");
    case 13:
      return gr("Suspense");
    case 19:
      return gr("SuspenseList");
    case 0:
    case 2:
    case 15:
      return (e = Ol(e.type, !1)), e;
    case 11:
      return (e = Ol(e.type.render, !1)), e;
    case 1:
      return (e = Ol(e.type, !0)), e;
    default:
      return "";
  }
}
function vo(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Nt:
      return "Fragment";
    case _t:
      return "Portal";
    case mo:
      return "Profiler";
    case Eu:
      return "StrictMode";
    case go:
      return "Suspense";
    case yo:
      return "SuspenseList";
  }
  if (typeof e == "object")
    switch (e.$$typeof) {
      case Yc:
        return (e.displayName || "Context") + ".Consumer";
      case Kc:
        return (e._context.displayName || "Context") + ".Provider";
      case Cu:
        var n = e.render;
        return (
          (e = e.displayName),
          e ||
            ((e = n.displayName || n.name || ""),
            (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
          e
        );
      case Pu:
        return (
          (n = e.displayName || null), n !== null ? n : vo(e.type) || "Memo"
        );
      case jn:
        (n = e._payload), (e = e._init);
        try {
          return vo(e(n));
        } catch {}
    }
  return null;
}
function dh(e) {
  var n = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (n.displayName || "Context") + ".Consumer";
    case 10:
      return (n._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return (
        (e = n.render),
        (e = e.displayName || e.name || ""),
        n.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
      );
    case 7:
      return "Fragment";
    case 5:
      return n;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return vo(n);
    case 8:
      return n === Eu ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof n == "function") return n.displayName || n.name || null;
      if (typeof n == "string") return n;
  }
  return null;
}
function Jn(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function qc(e) {
  var n = e.type;
  return (
    (e = e.nodeName) &&
    e.toLowerCase() === "input" &&
    (n === "checkbox" || n === "radio")
  );
}
function hh(e) {
  var n = qc(e) ? "checked" : "value",
    t = Object.getOwnPropertyDescriptor(e.constructor.prototype, n),
    r = "" + e[n];
  if (
    !e.hasOwnProperty(n) &&
    typeof t < "u" &&
    typeof t.get == "function" &&
    typeof t.set == "function"
  ) {
    var i = t.get,
      l = t.set;
    return (
      Object.defineProperty(e, n, {
        configurable: !0,
        get: function () {
          return i.call(this);
        },
        set: function (o) {
          (r = "" + o), l.call(this, o);
        },
      }),
      Object.defineProperty(e, n, { enumerable: t.enumerable }),
      {
        getValue: function () {
          return r;
        },
        setValue: function (o) {
          r = "" + o;
        },
        stopTracking: function () {
          (e._valueTracker = null), delete e[n];
        },
      }
    );
  }
}
function li(e) {
  e._valueTracker || (e._valueTracker = hh(e));
}
function Gc(e) {
  if (!e) return !1;
  var n = e._valueTracker;
  if (!n) return !0;
  var t = n.getValue(),
    r = "";
  return (
    e && (r = qc(e) ? (e.checked ? "true" : "false") : e.value),
    (e = r),
    e !== t ? (n.setValue(e), !0) : !1
  );
}
function Fi(e) {
  if (((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u"))
    return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function ko(e, n) {
  var t = n.checked;
  return ce({}, n, {
    defaultChecked: void 0,
    defaultValue: void 0,
    value: void 0,
    checked: t ?? e._wrapperState.initialChecked,
  });
}
function Ms(e, n) {
  var t = n.defaultValue == null ? "" : n.defaultValue,
    r = n.checked != null ? n.checked : n.defaultChecked;
  (t = Jn(n.value != null ? n.value : t)),
    (e._wrapperState = {
      initialChecked: r,
      initialValue: t,
      controlled:
        n.type === "checkbox" || n.type === "radio"
          ? n.checked != null
          : n.value != null,
    });
}
function Jc(e, n) {
  (n = n.checked), n != null && Su(e, "checked", n, !1);
}
function wo(e, n) {
  Jc(e, n);
  var t = Jn(n.value),
    r = n.type;
  if (t != null)
    r === "number"
      ? ((t === 0 && e.value === "") || e.value != t) && (e.value = "" + t)
      : e.value !== "" + t && (e.value = "" + t);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  n.hasOwnProperty("value")
    ? xo(e, n.type, t)
    : n.hasOwnProperty("defaultValue") && xo(e, n.type, Jn(n.defaultValue)),
    n.checked == null &&
      n.defaultChecked != null &&
      (e.defaultChecked = !!n.defaultChecked);
}
function Fs(e, n, t) {
  if (n.hasOwnProperty("value") || n.hasOwnProperty("defaultValue")) {
    var r = n.type;
    if (
      !(
        (r !== "submit" && r !== "reset") ||
        (n.value !== void 0 && n.value !== null)
      )
    )
      return;
    (n = "" + e._wrapperState.initialValue),
      t || n === e.value || (e.value = n),
      (e.defaultValue = n);
  }
  (t = e.name),
    t !== "" && (e.name = ""),
    (e.defaultChecked = !!e._wrapperState.initialChecked),
    t !== "" && (e.name = t);
}
function xo(e, n, t) {
  (n !== "number" || Fi(e.ownerDocument) !== e) &&
    (t == null
      ? (e.defaultValue = "" + e._wrapperState.initialValue)
      : e.defaultValue !== "" + t && (e.defaultValue = "" + t));
}
var yr = Array.isArray;
function jt(e, n, t, r) {
  if (((e = e.options), n)) {
    n = {};
    for (var i = 0; i < t.length; i++) n["$" + t[i]] = !0;
    for (t = 0; t < e.length; t++)
      (i = n.hasOwnProperty("$" + e[t].value)),
        e[t].selected !== i && (e[t].selected = i),
        i && r && (e[t].defaultSelected = !0);
  } else {
    for (t = "" + Jn(t), n = null, i = 0; i < e.length; i++) {
      if (e[i].value === t) {
        (e[i].selected = !0), r && (e[i].defaultSelected = !0);
        return;
      }
      n !== null || e[i].disabled || (n = e[i]);
    }
    n !== null && (n.selected = !0);
  }
}
function So(e, n) {
  if (n.dangerouslySetInnerHTML != null) throw Error(_(91));
  return ce({}, n, {
    value: void 0,
    defaultValue: void 0,
    children: "" + e._wrapperState.initialValue,
  });
}
function js(e, n) {
  var t = n.value;
  if (t == null) {
    if (((t = n.children), (n = n.defaultValue), t != null)) {
      if (n != null) throw Error(_(92));
      if (yr(t)) {
        if (1 < t.length) throw Error(_(93));
        t = t[0];
      }
      n = t;
    }
    n == null && (n = ""), (t = n);
  }
  e._wrapperState = { initialValue: Jn(t) };
}
function Zc(e, n) {
  var t = Jn(n.value),
    r = Jn(n.defaultValue);
  t != null &&
    ((t = "" + t),
    t !== e.value && (e.value = t),
    n.defaultValue == null && e.defaultValue !== t && (e.defaultValue = t)),
    r != null && (e.defaultValue = "" + r);
}
function Bs(e) {
  var n = e.textContent;
  n === e._wrapperState.initialValue && n !== "" && n !== null && (e.value = n);
}
function ef(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function Eo(e, n) {
  return e == null || e === "http://www.w3.org/1999/xhtml"
    ? ef(n)
    : e === "http://www.w3.org/2000/svg" && n === "foreignObject"
    ? "http://www.w3.org/1999/xhtml"
    : e;
}
var oi,
  nf = (function (e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
      ? function (n, t, r, i) {
          MSApp.execUnsafeLocalFunction(function () {
            return e(n, t, r, i);
          });
        }
      : e;
  })(function (e, n) {
    if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
      e.innerHTML = n;
    else {
      for (
        oi = oi || document.createElement("div"),
          oi.innerHTML = "<svg>" + n.valueOf().toString() + "</svg>",
          n = oi.firstChild;
        e.firstChild;

      )
        e.removeChild(e.firstChild);
      for (; n.firstChild; ) e.appendChild(n.firstChild);
    }
  });
function Or(e, n) {
  if (n) {
    var t = e.firstChild;
    if (t && t === e.lastChild && t.nodeType === 3) {
      t.nodeValue = n;
      return;
    }
  }
  e.textContent = n;
}
var wr = {
    animationIterationCount: !0,
    aspectRatio: !0,
    borderImageOutset: !0,
    borderImageSlice: !0,
    borderImageWidth: !0,
    boxFlex: !0,
    boxFlexGroup: !0,
    boxOrdinalGroup: !0,
    columnCount: !0,
    columns: !0,
    flex: !0,
    flexGrow: !0,
    flexPositive: !0,
    flexShrink: !0,
    flexNegative: !0,
    flexOrder: !0,
    gridArea: !0,
    gridRow: !0,
    gridRowEnd: !0,
    gridRowSpan: !0,
    gridRowStart: !0,
    gridColumn: !0,
    gridColumnEnd: !0,
    gridColumnSpan: !0,
    gridColumnStart: !0,
    fontWeight: !0,
    lineClamp: !0,
    lineHeight: !0,
    opacity: !0,
    order: !0,
    orphans: !0,
    tabSize: !0,
    widows: !0,
    zIndex: !0,
    zoom: !0,
    fillOpacity: !0,
    floodOpacity: !0,
    stopOpacity: !0,
    strokeDasharray: !0,
    strokeDashoffset: !0,
    strokeMiterlimit: !0,
    strokeOpacity: !0,
    strokeWidth: !0,
  },
  mh = ["Webkit", "ms", "Moz", "O"];
Object.keys(wr).forEach(function (e) {
  mh.forEach(function (n) {
    (n = n + e.charAt(0).toUpperCase() + e.substring(1)), (wr[n] = wr[e]);
  });
});
function tf(e, n, t) {
  return n == null || typeof n == "boolean" || n === ""
    ? ""
    : t || typeof n != "number" || n === 0 || (wr.hasOwnProperty(e) && wr[e])
    ? ("" + n).trim()
    : n + "px";
}
function rf(e, n) {
  e = e.style;
  for (var t in n)
    if (n.hasOwnProperty(t)) {
      var r = t.indexOf("--") === 0,
        i = tf(t, n[t], r);
      t === "float" && (t = "cssFloat"), r ? e.setProperty(t, i) : (e[t] = i);
    }
}
var gh = ce(
  { menuitem: !0 },
  {
    area: !0,
    base: !0,
    br: !0,
    col: !0,
    embed: !0,
    hr: !0,
    img: !0,
    input: !0,
    keygen: !0,
    link: !0,
    meta: !0,
    param: !0,
    source: !0,
    track: !0,
    wbr: !0,
  }
);
function Co(e, n) {
  if (n) {
    if (gh[e] && (n.children != null || n.dangerouslySetInnerHTML != null))
      throw Error(_(137, e));
    if (n.dangerouslySetInnerHTML != null) {
      if (n.children != null) throw Error(_(60));
      if (
        typeof n.dangerouslySetInnerHTML != "object" ||
        !("__html" in n.dangerouslySetInnerHTML)
      )
        throw Error(_(61));
    }
    if (n.style != null && typeof n.style != "object") throw Error(_(62));
  }
}
function Po(e, n) {
  if (e.indexOf("-") === -1) return typeof n.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var _o = null;
function _u(e) {
  return (
    (e = e.target || e.srcElement || window),
    e.correspondingUseElement && (e = e.correspondingUseElement),
    e.nodeType === 3 ? e.parentNode : e
  );
}
var No = null,
  Bt = null,
  Ut = null;
function Us(e) {
  if ((e = Jr(e))) {
    if (typeof No != "function") throw Error(_(280));
    var n = e.stateNode;
    n && ((n = ml(n)), No(e.stateNode, e.type, n));
  }
}
function lf(e) {
  Bt ? (Ut ? Ut.push(e) : (Ut = [e])) : (Bt = e);
}
function of() {
  if (Bt) {
    var e = Bt,
      n = Ut;
    if (((Ut = Bt = null), Us(e), n)) for (e = 0; e < n.length; e++) Us(n[e]);
  }
}
function uf(e, n) {
  return e(n);
}
function sf() {}
var Al = !1;
function af(e, n, t) {
  if (Al) return e(n, t);
  Al = !0;
  try {
    return uf(e, n, t);
  } finally {
    (Al = !1), (Bt !== null || Ut !== null) && (sf(), of());
  }
}
function Ar(e, n) {
  var t = e.stateNode;
  if (t === null) return null;
  var r = ml(t);
  if (r === null) return null;
  t = r[n];
  e: switch (n) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) ||
        ((e = e.type),
        (r = !(
          e === "button" ||
          e === "input" ||
          e === "select" ||
          e === "textarea"
        ))),
        (e = !r);
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (t && typeof t != "function") throw Error(_(231, n, typeof t));
  return t;
}
var Io = !1;
if (Tn)
  try {
    var ur = {};
    Object.defineProperty(ur, "passive", {
      get: function () {
        Io = !0;
      },
    }),
      window.addEventListener("test", ur, ur),
      window.removeEventListener("test", ur, ur);
  } catch {
    Io = !1;
  }
function yh(e, n, t, r, i, l, o, u, s) {
  var a = Array.prototype.slice.call(arguments, 3);
  try {
    n.apply(t, a);
  } catch (c) {
    this.onError(c);
  }
}
var xr = !1,
  ji = null,
  Bi = !1,
  To = null,
  vh = {
    onError: function (e) {
      (xr = !0), (ji = e);
    },
  };
function kh(e, n, t, r, i, l, o, u, s) {
  (xr = !1), (ji = null), yh.apply(vh, arguments);
}
function wh(e, n, t, r, i, l, o, u, s) {
  if ((kh.apply(this, arguments), xr)) {
    if (xr) {
      var a = ji;
      (xr = !1), (ji = null);
    } else throw Error(_(198));
    Bi || ((Bi = !0), (To = a));
  }
}
function kt(e) {
  var n = e,
    t = e;
  if (e.alternate) for (; n.return; ) n = n.return;
  else {
    e = n;
    do (n = e), n.flags & 4098 && (t = n.return), (e = n.return);
    while (e);
  }
  return n.tag === 3 ? t : null;
}
function cf(e) {
  if (e.tag === 13) {
    var n = e.memoizedState;
    if (
      (n === null && ((e = e.alternate), e !== null && (n = e.memoizedState)),
      n !== null)
    )
      return n.dehydrated;
  }
  return null;
}
function Vs(e) {
  if (kt(e) !== e) throw Error(_(188));
}
function xh(e) {
  var n = e.alternate;
  if (!n) {
    if (((n = kt(e)), n === null)) throw Error(_(188));
    return n !== e ? null : e;
  }
  for (var t = e, r = n; ; ) {
    var i = t.return;
    if (i === null) break;
    var l = i.alternate;
    if (l === null) {
      if (((r = i.return), r !== null)) {
        t = r;
        continue;
      }
      break;
    }
    if (i.child === l.child) {
      for (l = i.child; l; ) {
        if (l === t) return Vs(i), e;
        if (l === r) return Vs(i), n;
        l = l.sibling;
      }
      throw Error(_(188));
    }
    if (t.return !== r.return) (t = i), (r = l);
    else {
      for (var o = !1, u = i.child; u; ) {
        if (u === t) {
          (o = !0), (t = i), (r = l);
          break;
        }
        if (u === r) {
          (o = !0), (r = i), (t = l);
          break;
        }
        u = u.sibling;
      }
      if (!o) {
        for (u = l.child; u; ) {
          if (u === t) {
            (o = !0), (t = l), (r = i);
            break;
          }
          if (u === r) {
            (o = !0), (r = l), (t = i);
            break;
          }
          u = u.sibling;
        }
        if (!o) throw Error(_(189));
      }
    }
    if (t.alternate !== r) throw Error(_(190));
  }
  if (t.tag !== 3) throw Error(_(188));
  return t.stateNode.current === t ? e : n;
}
function ff(e) {
  return (e = xh(e)), e !== null ? pf(e) : null;
}
function pf(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var n = pf(e);
    if (n !== null) return n;
    e = e.sibling;
  }
  return null;
}
var df = Ke.unstable_scheduleCallback,
  Hs = Ke.unstable_cancelCallback,
  Sh = Ke.unstable_shouldYield,
  Eh = Ke.unstable_requestPaint,
  de = Ke.unstable_now,
  Ch = Ke.unstable_getCurrentPriorityLevel,
  Nu = Ke.unstable_ImmediatePriority,
  hf = Ke.unstable_UserBlockingPriority,
  Ui = Ke.unstable_NormalPriority,
  Ph = Ke.unstable_LowPriority,
  mf = Ke.unstable_IdlePriority,
  fl = null,
  wn = null;
function _h(e) {
  if (wn && typeof wn.onCommitFiberRoot == "function")
    try {
      wn.onCommitFiberRoot(fl, e, void 0, (e.current.flags & 128) === 128);
    } catch {}
}
var fn = Math.clz32 ? Math.clz32 : Th,
  Nh = Math.log,
  Ih = Math.LN2;
function Th(e) {
  return (e >>>= 0), e === 0 ? 32 : (31 - ((Nh(e) / Ih) | 0)) | 0;
}
var ui = 64,
  si = 4194304;
function vr(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Vi(e, n) {
  var t = e.pendingLanes;
  if (t === 0) return 0;
  var r = 0,
    i = e.suspendedLanes,
    l = e.pingedLanes,
    o = t & 268435455;
  if (o !== 0) {
    var u = o & ~i;
    u !== 0 ? (r = vr(u)) : ((l &= o), l !== 0 && (r = vr(l)));
  } else (o = t & ~i), o !== 0 ? (r = vr(o)) : l !== 0 && (r = vr(l));
  if (r === 0) return 0;
  if (
    n !== 0 &&
    n !== r &&
    !(n & i) &&
    ((i = r & -r), (l = n & -n), i >= l || (i === 16 && (l & 4194240) !== 0))
  )
    return n;
  if ((r & 4 && (r |= t & 16), (n = e.entangledLanes), n !== 0))
    for (e = e.entanglements, n &= r; 0 < n; )
      (t = 31 - fn(n)), (i = 1 << t), (r |= e[t]), (n &= ~i);
  return r;
}
function zh(e, n) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return n + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return n + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Lh(e, n) {
  for (
    var t = e.suspendedLanes,
      r = e.pingedLanes,
      i = e.expirationTimes,
      l = e.pendingLanes;
    0 < l;

  ) {
    var o = 31 - fn(l),
      u = 1 << o,
      s = i[o];
    s === -1
      ? (!(u & t) || u & r) && (i[o] = zh(u, n))
      : s <= n && (e.expiredLanes |= u),
      (l &= ~u);
  }
}
function zo(e) {
  return (
    (e = e.pendingLanes & -1073741825),
    e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
  );
}
function gf() {
  var e = ui;
  return (ui <<= 1), !(ui & 4194240) && (ui = 64), e;
}
function Rl(e) {
  for (var n = [], t = 0; 31 > t; t++) n.push(e);
  return n;
}
function qr(e, n, t) {
  (e.pendingLanes |= n),
    n !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
    (e = e.eventTimes),
    (n = 31 - fn(n)),
    (e[n] = t);
}
function Oh(e, n) {
  var t = e.pendingLanes & ~n;
  (e.pendingLanes = n),
    (e.suspendedLanes = 0),
    (e.pingedLanes = 0),
    (e.expiredLanes &= n),
    (e.mutableReadLanes &= n),
    (e.entangledLanes &= n),
    (n = e.entanglements);
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < t; ) {
    var i = 31 - fn(t),
      l = 1 << i;
    (n[i] = 0), (r[i] = -1), (e[i] = -1), (t &= ~l);
  }
}
function Iu(e, n) {
  var t = (e.entangledLanes |= n);
  for (e = e.entanglements; t; ) {
    var r = 31 - fn(t),
      i = 1 << r;
    (i & n) | (e[r] & n) && (e[r] |= n), (t &= ~i);
  }
}
var G = 0;
function yf(e) {
  return (e &= -e), 1 < e ? (4 < e ? (e & 268435455 ? 16 : 536870912) : 4) : 1;
}
var vf,
  Tu,
  kf,
  wf,
  xf,
  Lo = !1,
  ai = [],
  Wn = null,
  Qn = null,
  bn = null,
  Rr = new Map(),
  Dr = new Map(),
  Un = [],
  Ah =
    "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
      " "
    );
function $s(e, n) {
  switch (e) {
    case "focusin":
    case "focusout":
      Wn = null;
      break;
    case "dragenter":
    case "dragleave":
      Qn = null;
      break;
    case "mouseover":
    case "mouseout":
      bn = null;
      break;
    case "pointerover":
    case "pointerout":
      Rr.delete(n.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Dr.delete(n.pointerId);
  }
}
function sr(e, n, t, r, i, l) {
  return e === null || e.nativeEvent !== l
    ? ((e = {
        blockedOn: n,
        domEventName: t,
        eventSystemFlags: r,
        nativeEvent: l,
        targetContainers: [i],
      }),
      n !== null && ((n = Jr(n)), n !== null && Tu(n)),
      e)
    : ((e.eventSystemFlags |= r),
      (n = e.targetContainers),
      i !== null && n.indexOf(i) === -1 && n.push(i),
      e);
}
function Rh(e, n, t, r, i) {
  switch (n) {
    case "focusin":
      return (Wn = sr(Wn, e, n, t, r, i)), !0;
    case "dragenter":
      return (Qn = sr(Qn, e, n, t, r, i)), !0;
    case "mouseover":
      return (bn = sr(bn, e, n, t, r, i)), !0;
    case "pointerover":
      var l = i.pointerId;
      return Rr.set(l, sr(Rr.get(l) || null, e, n, t, r, i)), !0;
    case "gotpointercapture":
      return (
        (l = i.pointerId), Dr.set(l, sr(Dr.get(l) || null, e, n, t, r, i)), !0
      );
  }
  return !1;
}
function Sf(e) {
  var n = st(e.target);
  if (n !== null) {
    var t = kt(n);
    if (t !== null) {
      if (((n = t.tag), n === 13)) {
        if (((n = cf(t)), n !== null)) {
          (e.blockedOn = n),
            xf(e.priority, function () {
              kf(t);
            });
          return;
        }
      } else if (n === 3 && t.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = t.tag === 3 ? t.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Pi(e) {
  if (e.blockedOn !== null) return !1;
  for (var n = e.targetContainers; 0 < n.length; ) {
    var t = Oo(e.domEventName, e.eventSystemFlags, n[0], e.nativeEvent);
    if (t === null) {
      t = e.nativeEvent;
      var r = new t.constructor(t.type, t);
      (_o = r), t.target.dispatchEvent(r), (_o = null);
    } else return (n = Jr(t)), n !== null && Tu(n), (e.blockedOn = t), !1;
    n.shift();
  }
  return !0;
}
function Ws(e, n, t) {
  Pi(e) && t.delete(n);
}
function Dh() {
  (Lo = !1),
    Wn !== null && Pi(Wn) && (Wn = null),
    Qn !== null && Pi(Qn) && (Qn = null),
    bn !== null && Pi(bn) && (bn = null),
    Rr.forEach(Ws),
    Dr.forEach(Ws);
}
function ar(e, n) {
  e.blockedOn === n &&
    ((e.blockedOn = null),
    Lo ||
      ((Lo = !0),
      Ke.unstable_scheduleCallback(Ke.unstable_NormalPriority, Dh)));
}
function Mr(e) {
  function n(i) {
    return ar(i, e);
  }
  if (0 < ai.length) {
    ar(ai[0], e);
    for (var t = 1; t < ai.length; t++) {
      var r = ai[t];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (
    Wn !== null && ar(Wn, e),
      Qn !== null && ar(Qn, e),
      bn !== null && ar(bn, e),
      Rr.forEach(n),
      Dr.forEach(n),
      t = 0;
    t < Un.length;
    t++
  )
    (r = Un[t]), r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < Un.length && ((t = Un[0]), t.blockedOn === null); )
    Sf(t), t.blockedOn === null && Un.shift();
}
var Vt = Rn.ReactCurrentBatchConfig,
  Hi = !0;
function Mh(e, n, t, r) {
  var i = G,
    l = Vt.transition;
  Vt.transition = null;
  try {
    (G = 1), zu(e, n, t, r);
  } finally {
    (G = i), (Vt.transition = l);
  }
}
function Fh(e, n, t, r) {
  var i = G,
    l = Vt.transition;
  Vt.transition = null;
  try {
    (G = 4), zu(e, n, t, r);
  } finally {
    (G = i), (Vt.transition = l);
  }
}
function zu(e, n, t, r) {
  if (Hi) {
    var i = Oo(e, n, t, r);
    if (i === null) Wl(e, n, r, $i, t), $s(e, r);
    else if (Rh(i, e, n, t, r)) r.stopPropagation();
    else if (($s(e, r), n & 4 && -1 < Ah.indexOf(e))) {
      for (; i !== null; ) {
        var l = Jr(i);
        if (
          (l !== null && vf(l),
          (l = Oo(e, n, t, r)),
          l === null && Wl(e, n, r, $i, t),
          l === i)
        )
          break;
        i = l;
      }
      i !== null && r.stopPropagation();
    } else Wl(e, n, r, null, t);
  }
}
var $i = null;
function Oo(e, n, t, r) {
  if ((($i = null), (e = _u(r)), (e = st(e)), e !== null))
    if (((n = kt(e)), n === null)) e = null;
    else if (((t = n.tag), t === 13)) {
      if (((e = cf(n)), e !== null)) return e;
      e = null;
    } else if (t === 3) {
      if (n.stateNode.current.memoizedState.isDehydrated)
        return n.tag === 3 ? n.stateNode.containerInfo : null;
      e = null;
    } else n !== e && (e = null);
  return ($i = e), null;
}
function Ef(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (Ch()) {
        case Nu:
          return 1;
        case hf:
          return 4;
        case Ui:
        case Ph:
          return 16;
        case mf:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var Hn = null,
  Lu = null,
  _i = null;
function Cf() {
  if (_i) return _i;
  var e,
    n = Lu,
    t = n.length,
    r,
    i = "value" in Hn ? Hn.value : Hn.textContent,
    l = i.length;
  for (e = 0; e < t && n[e] === i[e]; e++);
  var o = t - e;
  for (r = 1; r <= o && n[t - r] === i[l - r]; r++);
  return (_i = i.slice(e, 1 < r ? 1 - r : void 0));
}
function Ni(e) {
  var n = e.keyCode;
  return (
    "charCode" in e
      ? ((e = e.charCode), e === 0 && n === 13 && (e = 13))
      : (e = n),
    e === 10 && (e = 13),
    32 <= e || e === 13 ? e : 0
  );
}
function ci() {
  return !0;
}
function Qs() {
  return !1;
}
function Xe(e) {
  function n(t, r, i, l, o) {
    (this._reactName = t),
      (this._targetInst = i),
      (this.type = r),
      (this.nativeEvent = l),
      (this.target = o),
      (this.currentTarget = null);
    for (var u in e)
      e.hasOwnProperty(u) && ((t = e[u]), (this[u] = t ? t(l) : l[u]));
    return (
      (this.isDefaultPrevented = (
        l.defaultPrevented != null ? l.defaultPrevented : l.returnValue === !1
      )
        ? ci
        : Qs),
      (this.isPropagationStopped = Qs),
      this
    );
  }
  return (
    ce(n.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var t = this.nativeEvent;
        t &&
          (t.preventDefault
            ? t.preventDefault()
            : typeof t.returnValue != "unknown" && (t.returnValue = !1),
          (this.isDefaultPrevented = ci));
      },
      stopPropagation: function () {
        var t = this.nativeEvent;
        t &&
          (t.stopPropagation
            ? t.stopPropagation()
            : typeof t.cancelBubble != "unknown" && (t.cancelBubble = !0),
          (this.isPropagationStopped = ci));
      },
      persist: function () {},
      isPersistent: ci,
    }),
    n
  );
}
var er = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function (e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0,
  },
  Ou = Xe(er),
  Gr = ce({}, er, { view: 0, detail: 0 }),
  jh = Xe(Gr),
  Dl,
  Ml,
  cr,
  pl = ce({}, Gr, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Au,
    button: 0,
    buttons: 0,
    relatedTarget: function (e) {
      return e.relatedTarget === void 0
        ? e.fromElement === e.srcElement
          ? e.toElement
          : e.fromElement
        : e.relatedTarget;
    },
    movementX: function (e) {
      return "movementX" in e
        ? e.movementX
        : (e !== cr &&
            (cr && e.type === "mousemove"
              ? ((Dl = e.screenX - cr.screenX), (Ml = e.screenY - cr.screenY))
              : (Ml = Dl = 0),
            (cr = e)),
          Dl);
    },
    movementY: function (e) {
      return "movementY" in e ? e.movementY : Ml;
    },
  }),
  bs = Xe(pl),
  Bh = ce({}, pl, { dataTransfer: 0 }),
  Uh = Xe(Bh),
  Vh = ce({}, Gr, { relatedTarget: 0 }),
  Fl = Xe(Vh),
  Hh = ce({}, er, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
  $h = Xe(Hh),
  Wh = ce({}, er, {
    clipboardData: function (e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    },
  }),
  Qh = Xe(Wh),
  bh = ce({}, er, { data: 0 }),
  Ks = Xe(bh),
  Kh = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified",
  },
  Yh = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta",
  },
  Xh = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey",
  };
function qh(e) {
  var n = this.nativeEvent;
  return n.getModifierState ? n.getModifierState(e) : (e = Xh[e]) ? !!n[e] : !1;
}
function Au() {
  return qh;
}
var Gh = ce({}, Gr, {
    key: function (e) {
      if (e.key) {
        var n = Kh[e.key] || e.key;
        if (n !== "Unidentified") return n;
      }
      return e.type === "keypress"
        ? ((e = Ni(e)), e === 13 ? "Enter" : String.fromCharCode(e))
        : e.type === "keydown" || e.type === "keyup"
        ? Yh[e.keyCode] || "Unidentified"
        : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Au,
    charCode: function (e) {
      return e.type === "keypress" ? Ni(e) : 0;
    },
    keyCode: function (e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function (e) {
      return e.type === "keypress"
        ? Ni(e)
        : e.type === "keydown" || e.type === "keyup"
        ? e.keyCode
        : 0;
    },
  }),
  Jh = Xe(Gh),
  Zh = ce({}, pl, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0,
  }),
  Ys = Xe(Zh),
  em = ce({}, Gr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Au,
  }),
  nm = Xe(em),
  tm = ce({}, er, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
  rm = Xe(tm),
  im = ce({}, pl, {
    deltaX: function (e) {
      return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
    },
    deltaY: function (e) {
      return "deltaY" in e
        ? e.deltaY
        : "wheelDeltaY" in e
        ? -e.wheelDeltaY
        : "wheelDelta" in e
        ? -e.wheelDelta
        : 0;
    },
    deltaZ: 0,
    deltaMode: 0,
  }),
  lm = Xe(im),
  om = [9, 13, 27, 32],
  Ru = Tn && "CompositionEvent" in window,
  Sr = null;
Tn && "documentMode" in document && (Sr = document.documentMode);
var um = Tn && "TextEvent" in window && !Sr,
  Pf = Tn && (!Ru || (Sr && 8 < Sr && 11 >= Sr)),
  Xs = String.fromCharCode(32),
  qs = !1;
function _f(e, n) {
  switch (e) {
    case "keyup":
      return om.indexOf(n.keyCode) !== -1;
    case "keydown":
      return n.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function Nf(e) {
  return (e = e.detail), typeof e == "object" && "data" in e ? e.data : null;
}
var It = !1;
function sm(e, n) {
  switch (e) {
    case "compositionend":
      return Nf(n);
    case "keypress":
      return n.which !== 32 ? null : ((qs = !0), Xs);
    case "textInput":
      return (e = n.data), e === Xs && qs ? null : e;
    default:
      return null;
  }
}
function am(e, n) {
  if (It)
    return e === "compositionend" || (!Ru && _f(e, n))
      ? ((e = Cf()), (_i = Lu = Hn = null), (It = !1), e)
      : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(n.ctrlKey || n.altKey || n.metaKey) || (n.ctrlKey && n.altKey)) {
        if (n.char && 1 < n.char.length) return n.char;
        if (n.which) return String.fromCharCode(n.which);
      }
      return null;
    case "compositionend":
      return Pf && n.locale !== "ko" ? null : n.data;
    default:
      return null;
  }
}
var cm = {
  color: !0,
  date: !0,
  datetime: !0,
  "datetime-local": !0,
  email: !0,
  month: !0,
  number: !0,
  password: !0,
  range: !0,
  search: !0,
  tel: !0,
  text: !0,
  time: !0,
  url: !0,
  week: !0,
};
function Gs(e) {
  var n = e && e.nodeName && e.nodeName.toLowerCase();
  return n === "input" ? !!cm[e.type] : n === "textarea";
}
function If(e, n, t, r) {
  lf(r),
    (n = Wi(n, "onChange")),
    0 < n.length &&
      ((t = new Ou("onChange", "change", null, t, r)),
      e.push({ event: t, listeners: n }));
}
var Er = null,
  Fr = null;
function fm(e) {
  Bf(e, 0);
}
function dl(e) {
  var n = Lt(e);
  if (Gc(n)) return e;
}
function pm(e, n) {
  if (e === "change") return n;
}
var Tf = !1;
if (Tn) {
  var jl;
  if (Tn) {
    var Bl = "oninput" in document;
    if (!Bl) {
      var Js = document.createElement("div");
      Js.setAttribute("oninput", "return;"),
        (Bl = typeof Js.oninput == "function");
    }
    jl = Bl;
  } else jl = !1;
  Tf = jl && (!document.documentMode || 9 < document.documentMode);
}
function Zs() {
  Er && (Er.detachEvent("onpropertychange", zf), (Fr = Er = null));
}
function zf(e) {
  if (e.propertyName === "value" && dl(Fr)) {
    var n = [];
    If(n, Fr, e, _u(e)), af(fm, n);
  }
}
function dm(e, n, t) {
  e === "focusin"
    ? (Zs(), (Er = n), (Fr = t), Er.attachEvent("onpropertychange", zf))
    : e === "focusout" && Zs();
}
function hm(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown")
    return dl(Fr);
}
function mm(e, n) {
  if (e === "click") return dl(n);
}
function gm(e, n) {
  if (e === "input" || e === "change") return dl(n);
}
function ym(e, n) {
  return (e === n && (e !== 0 || 1 / e === 1 / n)) || (e !== e && n !== n);
}
var dn = typeof Object.is == "function" ? Object.is : ym;
function jr(e, n) {
  if (dn(e, n)) return !0;
  if (typeof e != "object" || e === null || typeof n != "object" || n === null)
    return !1;
  var t = Object.keys(e),
    r = Object.keys(n);
  if (t.length !== r.length) return !1;
  for (r = 0; r < t.length; r++) {
    var i = t[r];
    if (!ho.call(n, i) || !dn(e[i], n[i])) return !1;
  }
  return !0;
}
function ea(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function na(e, n) {
  var t = ea(e);
  e = 0;
  for (var r; t; ) {
    if (t.nodeType === 3) {
      if (((r = e + t.textContent.length), e <= n && r >= n))
        return { node: t, offset: n - e };
      e = r;
    }
    e: {
      for (; t; ) {
        if (t.nextSibling) {
          t = t.nextSibling;
          break e;
        }
        t = t.parentNode;
      }
      t = void 0;
    }
    t = ea(t);
  }
}
function Lf(e, n) {
  return e && n
    ? e === n
      ? !0
      : e && e.nodeType === 3
      ? !1
      : n && n.nodeType === 3
      ? Lf(e, n.parentNode)
      : "contains" in e
      ? e.contains(n)
      : e.compareDocumentPosition
      ? !!(e.compareDocumentPosition(n) & 16)
      : !1
    : !1;
}
function Of() {
  for (var e = window, n = Fi(); n instanceof e.HTMLIFrameElement; ) {
    try {
      var t = typeof n.contentWindow.location.href == "string";
    } catch {
      t = !1;
    }
    if (t) e = n.contentWindow;
    else break;
    n = Fi(e.document);
  }
  return n;
}
function Du(e) {
  var n = e && e.nodeName && e.nodeName.toLowerCase();
  return (
    n &&
    ((n === "input" &&
      (e.type === "text" ||
        e.type === "search" ||
        e.type === "tel" ||
        e.type === "url" ||
        e.type === "password")) ||
      n === "textarea" ||
      e.contentEditable === "true")
  );
}
function vm(e) {
  var n = Of(),
    t = e.focusedElem,
    r = e.selectionRange;
  if (
    n !== t &&
    t &&
    t.ownerDocument &&
    Lf(t.ownerDocument.documentElement, t)
  ) {
    if (r !== null && Du(t)) {
      if (
        ((n = r.start),
        (e = r.end),
        e === void 0 && (e = n),
        "selectionStart" in t)
      )
        (t.selectionStart = n), (t.selectionEnd = Math.min(e, t.value.length));
      else if (
        ((e = ((n = t.ownerDocument || document) && n.defaultView) || window),
        e.getSelection)
      ) {
        e = e.getSelection();
        var i = t.textContent.length,
          l = Math.min(r.start, i);
        (r = r.end === void 0 ? l : Math.min(r.end, i)),
          !e.extend && l > r && ((i = r), (r = l), (l = i)),
          (i = na(t, l));
        var o = na(t, r);
        i &&
          o &&
          (e.rangeCount !== 1 ||
            e.anchorNode !== i.node ||
            e.anchorOffset !== i.offset ||
            e.focusNode !== o.node ||
            e.focusOffset !== o.offset) &&
          ((n = n.createRange()),
          n.setStart(i.node, i.offset),
          e.removeAllRanges(),
          l > r
            ? (e.addRange(n), e.extend(o.node, o.offset))
            : (n.setEnd(o.node, o.offset), e.addRange(n)));
      }
    }
    for (n = [], e = t; (e = e.parentNode); )
      e.nodeType === 1 &&
        n.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof t.focus == "function" && t.focus(), t = 0; t < n.length; t++)
      (e = n[t]),
        (e.element.scrollLeft = e.left),
        (e.element.scrollTop = e.top);
  }
}
var km = Tn && "documentMode" in document && 11 >= document.documentMode,
  Tt = null,
  Ao = null,
  Cr = null,
  Ro = !1;
function ta(e, n, t) {
  var r = t.window === t ? t.document : t.nodeType === 9 ? t : t.ownerDocument;
  Ro ||
    Tt == null ||
    Tt !== Fi(r) ||
    ((r = Tt),
    "selectionStart" in r && Du(r)
      ? (r = { start: r.selectionStart, end: r.selectionEnd })
      : ((r = (
          (r.ownerDocument && r.ownerDocument.defaultView) ||
          window
        ).getSelection()),
        (r = {
          anchorNode: r.anchorNode,
          anchorOffset: r.anchorOffset,
          focusNode: r.focusNode,
          focusOffset: r.focusOffset,
        })),
    (Cr && jr(Cr, r)) ||
      ((Cr = r),
      (r = Wi(Ao, "onSelect")),
      0 < r.length &&
        ((n = new Ou("onSelect", "select", null, n, t)),
        e.push({ event: n, listeners: r }),
        (n.target = Tt))));
}
function fi(e, n) {
  var t = {};
  return (
    (t[e.toLowerCase()] = n.toLowerCase()),
    (t["Webkit" + e] = "webkit" + n),
    (t["Moz" + e] = "moz" + n),
    t
  );
}
var zt = {
    animationend: fi("Animation", "AnimationEnd"),
    animationiteration: fi("Animation", "AnimationIteration"),
    animationstart: fi("Animation", "AnimationStart"),
    transitionend: fi("Transition", "TransitionEnd"),
  },
  Ul = {},
  Af = {};
Tn &&
  ((Af = document.createElement("div").style),
  "AnimationEvent" in window ||
    (delete zt.animationend.animation,
    delete zt.animationiteration.animation,
    delete zt.animationstart.animation),
  "TransitionEvent" in window || delete zt.transitionend.transition);
function hl(e) {
  if (Ul[e]) return Ul[e];
  if (!zt[e]) return e;
  var n = zt[e],
    t;
  for (t in n) if (n.hasOwnProperty(t) && t in Af) return (Ul[e] = n[t]);
  return e;
}
var Rf = hl("animationend"),
  Df = hl("animationiteration"),
  Mf = hl("animationstart"),
  Ff = hl("transitionend"),
  jf = new Map(),
  ra =
    "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
      " "
    );
function et(e, n) {
  jf.set(e, n), vt(n, [e]);
}
for (var Vl = 0; Vl < ra.length; Vl++) {
  var Hl = ra[Vl],
    wm = Hl.toLowerCase(),
    xm = Hl[0].toUpperCase() + Hl.slice(1);
  et(wm, "on" + xm);
}
et(Rf, "onAnimationEnd");
et(Df, "onAnimationIteration");
et(Mf, "onAnimationStart");
et("dblclick", "onDoubleClick");
et("focusin", "onFocus");
et("focusout", "onBlur");
et(Ff, "onTransitionEnd");
bt("onMouseEnter", ["mouseout", "mouseover"]);
bt("onMouseLeave", ["mouseout", "mouseover"]);
bt("onPointerEnter", ["pointerout", "pointerover"]);
bt("onPointerLeave", ["pointerout", "pointerover"]);
vt(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
vt(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
vt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
vt(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
vt(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
vt(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var kr =
    "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
      " "
    ),
  Sm = new Set("cancel close invalid load scroll toggle".split(" ").concat(kr));
function ia(e, n, t) {
  var r = e.type || "unknown-event";
  (e.currentTarget = t), wh(r, n, void 0, e), (e.currentTarget = null);
}
function Bf(e, n) {
  n = (n & 4) !== 0;
  for (var t = 0; t < e.length; t++) {
    var r = e[t],
      i = r.event;
    r = r.listeners;
    e: {
      var l = void 0;
      if (n)
        for (var o = r.length - 1; 0 <= o; o--) {
          var u = r[o],
            s = u.instance,
            a = u.currentTarget;
          if (((u = u.listener), s !== l && i.isPropagationStopped())) break e;
          ia(i, u, a), (l = s);
        }
      else
        for (o = 0; o < r.length; o++) {
          if (
            ((u = r[o]),
            (s = u.instance),
            (a = u.currentTarget),
            (u = u.listener),
            s !== l && i.isPropagationStopped())
          )
            break e;
          ia(i, u, a), (l = s);
        }
    }
  }
  if (Bi) throw ((e = To), (Bi = !1), (To = null), e);
}
function le(e, n) {
  var t = n[Bo];
  t === void 0 && (t = n[Bo] = new Set());
  var r = e + "__bubble";
  t.has(r) || (Uf(n, e, 2, !1), t.add(r));
}
function $l(e, n, t) {
  var r = 0;
  n && (r |= 4), Uf(t, e, r, n);
}
var pi = "_reactListening" + Math.random().toString(36).slice(2);
function Br(e) {
  if (!e[pi]) {
    (e[pi] = !0),
      bc.forEach(function (t) {
        t !== "selectionchange" && (Sm.has(t) || $l(t, !1, e), $l(t, !0, e));
      });
    var n = e.nodeType === 9 ? e : e.ownerDocument;
    n === null || n[pi] || ((n[pi] = !0), $l("selectionchange", !1, n));
  }
}
function Uf(e, n, t, r) {
  switch (Ef(n)) {
    case 1:
      var i = Mh;
      break;
    case 4:
      i = Fh;
      break;
    default:
      i = zu;
  }
  (t = i.bind(null, n, t, e)),
    (i = void 0),
    !Io ||
      (n !== "touchstart" && n !== "touchmove" && n !== "wheel") ||
      (i = !0),
    r
      ? i !== void 0
        ? e.addEventListener(n, t, { capture: !0, passive: i })
        : e.addEventListener(n, t, !0)
      : i !== void 0
      ? e.addEventListener(n, t, { passive: i })
      : e.addEventListener(n, t, !1);
}
function Wl(e, n, t, r, i) {
  var l = r;
  if (!(n & 1) && !(n & 2) && r !== null)
    e: for (;;) {
      if (r === null) return;
      var o = r.tag;
      if (o === 3 || o === 4) {
        var u = r.stateNode.containerInfo;
        if (u === i || (u.nodeType === 8 && u.parentNode === i)) break;
        if (o === 4)
          for (o = r.return; o !== null; ) {
            var s = o.tag;
            if (
              (s === 3 || s === 4) &&
              ((s = o.stateNode.containerInfo),
              s === i || (s.nodeType === 8 && s.parentNode === i))
            )
              return;
            o = o.return;
          }
        for (; u !== null; ) {
          if (((o = st(u)), o === null)) return;
          if (((s = o.tag), s === 5 || s === 6)) {
            r = l = o;
            continue e;
          }
          u = u.parentNode;
        }
      }
      r = r.return;
    }
  af(function () {
    var a = l,
      c = _u(t),
      f = [];
    e: {
      var d = jf.get(e);
      if (d !== void 0) {
        var p = Ou,
          k = e;
        switch (e) {
          case "keypress":
            if (Ni(t) === 0) break e;
          case "keydown":
          case "keyup":
            p = Jh;
            break;
          case "focusin":
            (k = "focus"), (p = Fl);
            break;
          case "focusout":
            (k = "blur"), (p = Fl);
            break;
          case "beforeblur":
          case "afterblur":
            p = Fl;
            break;
          case "click":
            if (t.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            p = bs;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            p = Uh;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            p = nm;
            break;
          case Rf:
          case Df:
          case Mf:
            p = $h;
            break;
          case Ff:
            p = rm;
            break;
          case "scroll":
            p = jh;
            break;
          case "wheel":
            p = lm;
            break;
          case "copy":
          case "cut":
          case "paste":
            p = Qh;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            p = Ys;
        }
        var w = (n & 4) !== 0,
          T = !w && e === "scroll",
          h = w ? (d !== null ? d + "Capture" : null) : d;
        w = [];
        for (var m = a, y; m !== null; ) {
          y = m;
          var S = y.stateNode;
          if (
            (y.tag === 5 &&
              S !== null &&
              ((y = S),
              h !== null && ((S = Ar(m, h)), S != null && w.push(Ur(m, S, y)))),
            T)
          )
            break;
          m = m.return;
        }
        0 < w.length &&
          ((d = new p(d, k, null, t, c)), f.push({ event: d, listeners: w }));
      }
    }
    if (!(n & 7)) {
      e: {
        if (
          ((d = e === "mouseover" || e === "pointerover"),
          (p = e === "mouseout" || e === "pointerout"),
          d &&
            t !== _o &&
            (k = t.relatedTarget || t.fromElement) &&
            (st(k) || k[zn]))
        )
          break e;
        if (
          (p || d) &&
          ((d =
            c.window === c
              ? c
              : (d = c.ownerDocument)
              ? d.defaultView || d.parentWindow
              : window),
          p
            ? ((k = t.relatedTarget || t.toElement),
              (p = a),
              (k = k ? st(k) : null),
              k !== null &&
                ((T = kt(k)), k !== T || (k.tag !== 5 && k.tag !== 6)) &&
                (k = null))
            : ((p = null), (k = a)),
          p !== k)
        ) {
          if (
            ((w = bs),
            (S = "onMouseLeave"),
            (h = "onMouseEnter"),
            (m = "mouse"),
            (e === "pointerout" || e === "pointerover") &&
              ((w = Ys),
              (S = "onPointerLeave"),
              (h = "onPointerEnter"),
              (m = "pointer")),
            (T = p == null ? d : Lt(p)),
            (y = k == null ? d : Lt(k)),
            (d = new w(S, m + "leave", p, t, c)),
            (d.target = T),
            (d.relatedTarget = y),
            (S = null),
            st(c) === a &&
              ((w = new w(h, m + "enter", k, t, c)),
              (w.target = y),
              (w.relatedTarget = T),
              (S = w)),
            (T = S),
            p && k)
          )
            n: {
              for (w = p, h = k, m = 0, y = w; y; y = Ct(y)) m++;
              for (y = 0, S = h; S; S = Ct(S)) y++;
              for (; 0 < m - y; ) (w = Ct(w)), m--;
              for (; 0 < y - m; ) (h = Ct(h)), y--;
              for (; m--; ) {
                if (w === h || (h !== null && w === h.alternate)) break n;
                (w = Ct(w)), (h = Ct(h));
              }
              w = null;
            }
          else w = null;
          p !== null && la(f, d, p, w, !1),
            k !== null && T !== null && la(f, T, k, w, !0);
        }
      }
      e: {
        if (
          ((d = a ? Lt(a) : window),
          (p = d.nodeName && d.nodeName.toLowerCase()),
          p === "select" || (p === "input" && d.type === "file"))
        )
          var C = pm;
        else if (Gs(d))
          if (Tf) C = gm;
          else {
            C = hm;
            var x = dm;
          }
        else
          (p = d.nodeName) &&
            p.toLowerCase() === "input" &&
            (d.type === "checkbox" || d.type === "radio") &&
            (C = mm);
        if (C && (C = C(e, a))) {
          If(f, C, t, c);
          break e;
        }
        x && x(e, d, a),
          e === "focusout" &&
            (x = d._wrapperState) &&
            x.controlled &&
            d.type === "number" &&
            xo(d, "number", d.value);
      }
      switch (((x = a ? Lt(a) : window), e)) {
        case "focusin":
          (Gs(x) || x.contentEditable === "true") &&
            ((Tt = x), (Ao = a), (Cr = null));
          break;
        case "focusout":
          Cr = Ao = Tt = null;
          break;
        case "mousedown":
          Ro = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          (Ro = !1), ta(f, t, c);
          break;
        case "selectionchange":
          if (km) break;
        case "keydown":
        case "keyup":
          ta(f, t, c);
      }
      var N;
      if (Ru)
        e: {
          switch (e) {
            case "compositionstart":
              var O = "onCompositionStart";
              break e;
            case "compositionend":
              O = "onCompositionEnd";
              break e;
            case "compositionupdate":
              O = "onCompositionUpdate";
              break e;
          }
          O = void 0;
        }
      else
        It
          ? _f(e, t) && (O = "onCompositionEnd")
          : e === "keydown" && t.keyCode === 229 && (O = "onCompositionStart");
      O &&
        (Pf &&
          t.locale !== "ko" &&
          (It || O !== "onCompositionStart"
            ? O === "onCompositionEnd" && It && (N = Cf())
            : ((Hn = c),
              (Lu = "value" in Hn ? Hn.value : Hn.textContent),
              (It = !0))),
        (x = Wi(a, O)),
        0 < x.length &&
          ((O = new Ks(O, e, null, t, c)),
          f.push({ event: O, listeners: x }),
          N ? (O.data = N) : ((N = Nf(t)), N !== null && (O.data = N)))),
        (N = um ? sm(e, t) : am(e, t)) &&
          ((a = Wi(a, "onBeforeInput")),
          0 < a.length &&
            ((c = new Ks("onBeforeInput", "beforeinput", null, t, c)),
            f.push({ event: c, listeners: a }),
            (c.data = N)));
    }
    Bf(f, n);
  });
}
function Ur(e, n, t) {
  return { instance: e, listener: n, currentTarget: t };
}
function Wi(e, n) {
  for (var t = n + "Capture", r = []; e !== null; ) {
    var i = e,
      l = i.stateNode;
    i.tag === 5 &&
      l !== null &&
      ((i = l),
      (l = Ar(e, t)),
      l != null && r.unshift(Ur(e, l, i)),
      (l = Ar(e, n)),
      l != null && r.push(Ur(e, l, i))),
      (e = e.return);
  }
  return r;
}
function Ct(e) {
  if (e === null) return null;
  do e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function la(e, n, t, r, i) {
  for (var l = n._reactName, o = []; t !== null && t !== r; ) {
    var u = t,
      s = u.alternate,
      a = u.stateNode;
    if (s !== null && s === r) break;
    u.tag === 5 &&
      a !== null &&
      ((u = a),
      i
        ? ((s = Ar(t, l)), s != null && o.unshift(Ur(t, s, u)))
        : i || ((s = Ar(t, l)), s != null && o.push(Ur(t, s, u)))),
      (t = t.return);
  }
  o.length !== 0 && e.push({ event: n, listeners: o });
}
var Em = /\r\n?/g,
  Cm = /\u0000|\uFFFD/g;
function oa(e) {
  return (typeof e == "string" ? e : "" + e)
    .replace(
      Em,
      `
`
    )
    .replace(Cm, "");
}
function di(e, n, t) {
  if (((n = oa(n)), oa(e) !== n && t)) throw Error(_(425));
}
function Qi() {}
var Do = null,
  Mo = null;
function Fo(e, n) {
  return (
    e === "textarea" ||
    e === "noscript" ||
    typeof n.children == "string" ||
    typeof n.children == "number" ||
    (typeof n.dangerouslySetInnerHTML == "object" &&
      n.dangerouslySetInnerHTML !== null &&
      n.dangerouslySetInnerHTML.__html != null)
  );
}
var jo = typeof setTimeout == "function" ? setTimeout : void 0,
  Pm = typeof clearTimeout == "function" ? clearTimeout : void 0,
  ua = typeof Promise == "function" ? Promise : void 0,
  _m =
    typeof queueMicrotask == "function"
      ? queueMicrotask
      : typeof ua < "u"
      ? function (e) {
          return ua.resolve(null).then(e).catch(Nm);
        }
      : jo;
function Nm(e) {
  setTimeout(function () {
    throw e;
  });
}
function Ql(e, n) {
  var t = n,
    r = 0;
  do {
    var i = t.nextSibling;
    if ((e.removeChild(t), i && i.nodeType === 8))
      if (((t = i.data), t === "/$")) {
        if (r === 0) {
          e.removeChild(i), Mr(n);
          return;
        }
        r--;
      } else (t !== "$" && t !== "$?" && t !== "$!") || r++;
    t = i;
  } while (t);
  Mr(n);
}
function Kn(e) {
  for (; e != null; e = e.nextSibling) {
    var n = e.nodeType;
    if (n === 1 || n === 3) break;
    if (n === 8) {
      if (((n = e.data), n === "$" || n === "$!" || n === "$?")) break;
      if (n === "/$") return null;
    }
  }
  return e;
}
function sa(e) {
  e = e.previousSibling;
  for (var n = 0; e; ) {
    if (e.nodeType === 8) {
      var t = e.data;
      if (t === "$" || t === "$!" || t === "$?") {
        if (n === 0) return e;
        n--;
      } else t === "/$" && n++;
    }
    e = e.previousSibling;
  }
  return null;
}
var nr = Math.random().toString(36).slice(2),
  vn = "__reactFiber$" + nr,
  Vr = "__reactProps$" + nr,
  zn = "__reactContainer$" + nr,
  Bo = "__reactEvents$" + nr,
  Im = "__reactListeners$" + nr,
  Tm = "__reactHandles$" + nr;
function st(e) {
  var n = e[vn];
  if (n) return n;
  for (var t = e.parentNode; t; ) {
    if ((n = t[zn] || t[vn])) {
      if (
        ((t = n.alternate),
        n.child !== null || (t !== null && t.child !== null))
      )
        for (e = sa(e); e !== null; ) {
          if ((t = e[vn])) return t;
          e = sa(e);
        }
      return n;
    }
    (e = t), (t = e.parentNode);
  }
  return null;
}
function Jr(e) {
  return (
    (e = e[vn] || e[zn]),
    !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3) ? null : e
  );
}
function Lt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(_(33));
}
function ml(e) {
  return e[Vr] || null;
}
var Uo = [],
  Ot = -1;
function nt(e) {
  return { current: e };
}
function oe(e) {
  0 > Ot || ((e.current = Uo[Ot]), (Uo[Ot] = null), Ot--);
}
function te(e, n) {
  Ot++, (Uo[Ot] = e.current), (e.current = n);
}
var Zn = {},
  Ie = nt(Zn),
  Fe = nt(!1),
  dt = Zn;
function Kt(e, n) {
  var t = e.type.contextTypes;
  if (!t) return Zn;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === n)
    return r.__reactInternalMemoizedMaskedChildContext;
  var i = {},
    l;
  for (l in t) i[l] = n[l];
  return (
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = n),
      (e.__reactInternalMemoizedMaskedChildContext = i)),
    i
  );
}
function je(e) {
  return (e = e.childContextTypes), e != null;
}
function bi() {
  oe(Fe), oe(Ie);
}
function aa(e, n, t) {
  if (Ie.current !== Zn) throw Error(_(168));
  te(Ie, n), te(Fe, t);
}
function Vf(e, n, t) {
  var r = e.stateNode;
  if (((n = n.childContextTypes), typeof r.getChildContext != "function"))
    return t;
  r = r.getChildContext();
  for (var i in r) if (!(i in n)) throw Error(_(108, dh(e) || "Unknown", i));
  return ce({}, t, r);
}
function Ki(e) {
  return (
    (e =
      ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) || Zn),
    (dt = Ie.current),
    te(Ie, e),
    te(Fe, Fe.current),
    !0
  );
}
function ca(e, n, t) {
  var r = e.stateNode;
  if (!r) throw Error(_(169));
  t
    ? ((e = Vf(e, n, dt)),
      (r.__reactInternalMemoizedMergedChildContext = e),
      oe(Fe),
      oe(Ie),
      te(Ie, e))
    : oe(Fe),
    te(Fe, t);
}
var Pn = null,
  gl = !1,
  bl = !1;
function Hf(e) {
  Pn === null ? (Pn = [e]) : Pn.push(e);
}
function zm(e) {
  (gl = !0), Hf(e);
}
function tt() {
  if (!bl && Pn !== null) {
    bl = !0;
    var e = 0,
      n = G;
    try {
      var t = Pn;
      for (G = 1; e < t.length; e++) {
        var r = t[e];
        do r = r(!0);
        while (r !== null);
      }
      (Pn = null), (gl = !1);
    } catch (i) {
      throw (Pn !== null && (Pn = Pn.slice(e + 1)), df(Nu, tt), i);
    } finally {
      (G = n), (bl = !1);
    }
  }
  return null;
}
var At = [],
  Rt = 0,
  Yi = null,
  Xi = 0,
  qe = [],
  Ge = 0,
  ht = null,
  _n = 1,
  Nn = "";
function lt(e, n) {
  (At[Rt++] = Xi), (At[Rt++] = Yi), (Yi = e), (Xi = n);
}
function $f(e, n, t) {
  (qe[Ge++] = _n), (qe[Ge++] = Nn), (qe[Ge++] = ht), (ht = e);
  var r = _n;
  e = Nn;
  var i = 32 - fn(r) - 1;
  (r &= ~(1 << i)), (t += 1);
  var l = 32 - fn(n) + i;
  if (30 < l) {
    var o = i - (i % 5);
    (l = (r & ((1 << o) - 1)).toString(32)),
      (r >>= o),
      (i -= o),
      (_n = (1 << (32 - fn(n) + i)) | (t << i) | r),
      (Nn = l + e);
  } else (_n = (1 << l) | (t << i) | r), (Nn = e);
}
function Mu(e) {
  e.return !== null && (lt(e, 1), $f(e, 1, 0));
}
function Fu(e) {
  for (; e === Yi; )
    (Yi = At[--Rt]), (At[Rt] = null), (Xi = At[--Rt]), (At[Rt] = null);
  for (; e === ht; )
    (ht = qe[--Ge]),
      (qe[Ge] = null),
      (Nn = qe[--Ge]),
      (qe[Ge] = null),
      (_n = qe[--Ge]),
      (qe[Ge] = null);
}
var be = null,
  We = null,
  ue = !1,
  cn = null;
function Wf(e, n) {
  var t = Ze(5, null, null, 0);
  (t.elementType = "DELETED"),
    (t.stateNode = n),
    (t.return = e),
    (n = e.deletions),
    n === null ? ((e.deletions = [t]), (e.flags |= 16)) : n.push(t);
}
function fa(e, n) {
  switch (e.tag) {
    case 5:
      var t = e.type;
      return (
        (n =
          n.nodeType !== 1 || t.toLowerCase() !== n.nodeName.toLowerCase()
            ? null
            : n),
        n !== null
          ? ((e.stateNode = n), (be = e), (We = Kn(n.firstChild)), !0)
          : !1
      );
    case 6:
      return (
        (n = e.pendingProps === "" || n.nodeType !== 3 ? null : n),
        n !== null ? ((e.stateNode = n), (be = e), (We = null), !0) : !1
      );
    case 13:
      return (
        (n = n.nodeType !== 8 ? null : n),
        n !== null
          ? ((t = ht !== null ? { id: _n, overflow: Nn } : null),
            (e.memoizedState = {
              dehydrated: n,
              treeContext: t,
              retryLane: 1073741824,
            }),
            (t = Ze(18, null, null, 0)),
            (t.stateNode = n),
            (t.return = e),
            (e.child = t),
            (be = e),
            (We = null),
            !0)
          : !1
      );
    default:
      return !1;
  }
}
function Vo(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Ho(e) {
  if (ue) {
    var n = We;
    if (n) {
      var t = n;
      if (!fa(e, n)) {
        if (Vo(e)) throw Error(_(418));
        n = Kn(t.nextSibling);
        var r = be;
        n && fa(e, n)
          ? Wf(r, t)
          : ((e.flags = (e.flags & -4097) | 2), (ue = !1), (be = e));
      }
    } else {
      if (Vo(e)) throw Error(_(418));
      (e.flags = (e.flags & -4097) | 2), (ue = !1), (be = e);
    }
  }
}
function pa(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; )
    e = e.return;
  be = e;
}
function hi(e) {
  if (e !== be) return !1;
  if (!ue) return pa(e), (ue = !0), !1;
  var n;
  if (
    ((n = e.tag !== 3) &&
      !(n = e.tag !== 5) &&
      ((n = e.type),
      (n = n !== "head" && n !== "body" && !Fo(e.type, e.memoizedProps))),
    n && (n = We))
  ) {
    if (Vo(e)) throw (Qf(), Error(_(418)));
    for (; n; ) Wf(e, n), (n = Kn(n.nextSibling));
  }
  if ((pa(e), e.tag === 13)) {
    if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
      throw Error(_(317));
    e: {
      for (e = e.nextSibling, n = 0; e; ) {
        if (e.nodeType === 8) {
          var t = e.data;
          if (t === "/$") {
            if (n === 0) {
              We = Kn(e.nextSibling);
              break e;
            }
            n--;
          } else (t !== "$" && t !== "$!" && t !== "$?") || n++;
        }
        e = e.nextSibling;
      }
      We = null;
    }
  } else We = be ? Kn(e.stateNode.nextSibling) : null;
  return !0;
}
function Qf() {
  for (var e = We; e; ) e = Kn(e.nextSibling);
}
function Yt() {
  (We = be = null), (ue = !1);
}
function ju(e) {
  cn === null ? (cn = [e]) : cn.push(e);
}
var Lm = Rn.ReactCurrentBatchConfig;
function fr(e, n, t) {
  if (
    ((e = t.ref), e !== null && typeof e != "function" && typeof e != "object")
  ) {
    if (t._owner) {
      if (((t = t._owner), t)) {
        if (t.tag !== 1) throw Error(_(309));
        var r = t.stateNode;
      }
      if (!r) throw Error(_(147, e));
      var i = r,
        l = "" + e;
      return n !== null &&
        n.ref !== null &&
        typeof n.ref == "function" &&
        n.ref._stringRef === l
        ? n.ref
        : ((n = function (o) {
            var u = i.refs;
            o === null ? delete u[l] : (u[l] = o);
          }),
          (n._stringRef = l),
          n);
    }
    if (typeof e != "string") throw Error(_(284));
    if (!t._owner) throw Error(_(290, e));
  }
  return e;
}
function mi(e, n) {
  throw (
    ((e = Object.prototype.toString.call(n)),
    Error(
      _(
        31,
        e === "[object Object]"
          ? "object with keys {" + Object.keys(n).join(", ") + "}"
          : e
      )
    ))
  );
}
function da(e) {
  var n = e._init;
  return n(e._payload);
}
function bf(e) {
  function n(h, m) {
    if (e) {
      var y = h.deletions;
      y === null ? ((h.deletions = [m]), (h.flags |= 16)) : y.push(m);
    }
  }
  function t(h, m) {
    if (!e) return null;
    for (; m !== null; ) n(h, m), (m = m.sibling);
    return null;
  }
  function r(h, m) {
    for (h = new Map(); m !== null; )
      m.key !== null ? h.set(m.key, m) : h.set(m.index, m), (m = m.sibling);
    return h;
  }
  function i(h, m) {
    return (h = Gn(h, m)), (h.index = 0), (h.sibling = null), h;
  }
  function l(h, m, y) {
    return (
      (h.index = y),
      e
        ? ((y = h.alternate),
          y !== null
            ? ((y = y.index), y < m ? ((h.flags |= 2), m) : y)
            : ((h.flags |= 2), m))
        : ((h.flags |= 1048576), m)
    );
  }
  function o(h) {
    return e && h.alternate === null && (h.flags |= 2), h;
  }
  function u(h, m, y, S) {
    return m === null || m.tag !== 6
      ? ((m = Zl(y, h.mode, S)), (m.return = h), m)
      : ((m = i(m, y)), (m.return = h), m);
  }
  function s(h, m, y, S) {
    var C = y.type;
    return C === Nt
      ? c(h, m, y.props.children, S, y.key)
      : m !== null &&
        (m.elementType === C ||
          (typeof C == "object" &&
            C !== null &&
            C.$$typeof === jn &&
            da(C) === m.type))
      ? ((S = i(m, y.props)), (S.ref = fr(h, m, y)), (S.return = h), S)
      : ((S = Ri(y.type, y.key, y.props, null, h.mode, S)),
        (S.ref = fr(h, m, y)),
        (S.return = h),
        S);
  }
  function a(h, m, y, S) {
    return m === null ||
      m.tag !== 4 ||
      m.stateNode.containerInfo !== y.containerInfo ||
      m.stateNode.implementation !== y.implementation
      ? ((m = eo(y, h.mode, S)), (m.return = h), m)
      : ((m = i(m, y.children || [])), (m.return = h), m);
  }
  function c(h, m, y, S, C) {
    return m === null || m.tag !== 7
      ? ((m = pt(y, h.mode, S, C)), (m.return = h), m)
      : ((m = i(m, y)), (m.return = h), m);
  }
  function f(h, m, y) {
    if ((typeof m == "string" && m !== "") || typeof m == "number")
      return (m = Zl("" + m, h.mode, y)), (m.return = h), m;
    if (typeof m == "object" && m !== null) {
      switch (m.$$typeof) {
        case ii:
          return (
            (y = Ri(m.type, m.key, m.props, null, h.mode, y)),
            (y.ref = fr(h, null, m)),
            (y.return = h),
            y
          );
        case _t:
          return (m = eo(m, h.mode, y)), (m.return = h), m;
        case jn:
          var S = m._init;
          return f(h, S(m._payload), y);
      }
      if (yr(m) || or(m))
        return (m = pt(m, h.mode, y, null)), (m.return = h), m;
      mi(h, m);
    }
    return null;
  }
  function d(h, m, y, S) {
    var C = m !== null ? m.key : null;
    if ((typeof y == "string" && y !== "") || typeof y == "number")
      return C !== null ? null : u(h, m, "" + y, S);
    if (typeof y == "object" && y !== null) {
      switch (y.$$typeof) {
        case ii:
          return y.key === C ? s(h, m, y, S) : null;
        case _t:
          return y.key === C ? a(h, m, y, S) : null;
        case jn:
          return (C = y._init), d(h, m, C(y._payload), S);
      }
      if (yr(y) || or(y)) return C !== null ? null : c(h, m, y, S, null);
      mi(h, y);
    }
    return null;
  }
  function p(h, m, y, S, C) {
    if ((typeof S == "string" && S !== "") || typeof S == "number")
      return (h = h.get(y) || null), u(m, h, "" + S, C);
    if (typeof S == "object" && S !== null) {
      switch (S.$$typeof) {
        case ii:
          return (h = h.get(S.key === null ? y : S.key) || null), s(m, h, S, C);
        case _t:
          return (h = h.get(S.key === null ? y : S.key) || null), a(m, h, S, C);
        case jn:
          var x = S._init;
          return p(h, m, y, x(S._payload), C);
      }
      if (yr(S) || or(S)) return (h = h.get(y) || null), c(m, h, S, C, null);
      mi(m, S);
    }
    return null;
  }
  function k(h, m, y, S) {
    for (
      var C = null, x = null, N = m, O = (m = 0), F = null;
      N !== null && O < y.length;
      O++
    ) {
      N.index > O ? ((F = N), (N = null)) : (F = N.sibling);
      var D = d(h, N, y[O], S);
      if (D === null) {
        N === null && (N = F);
        break;
      }
      e && N && D.alternate === null && n(h, N),
        (m = l(D, m, O)),
        x === null ? (C = D) : (x.sibling = D),
        (x = D),
        (N = F);
    }
    if (O === y.length) return t(h, N), ue && lt(h, O), C;
    if (N === null) {
      for (; O < y.length; O++)
        (N = f(h, y[O], S)),
          N !== null &&
            ((m = l(N, m, O)), x === null ? (C = N) : (x.sibling = N), (x = N));
      return ue && lt(h, O), C;
    }
    for (N = r(h, N); O < y.length; O++)
      (F = p(N, h, O, y[O], S)),
        F !== null &&
          (e && F.alternate !== null && N.delete(F.key === null ? O : F.key),
          (m = l(F, m, O)),
          x === null ? (C = F) : (x.sibling = F),
          (x = F));
    return (
      e &&
        N.forEach(function (L) {
          return n(h, L);
        }),
      ue && lt(h, O),
      C
    );
  }
  function w(h, m, y, S) {
    var C = or(y);
    if (typeof C != "function") throw Error(_(150));
    if (((y = C.call(y)), y == null)) throw Error(_(151));
    for (
      var x = (C = null), N = m, O = (m = 0), F = null, D = y.next();
      N !== null && !D.done;
      O++, D = y.next()
    ) {
      N.index > O ? ((F = N), (N = null)) : (F = N.sibling);
      var L = d(h, N, D.value, S);
      if (L === null) {
        N === null && (N = F);
        break;
      }
      e && N && L.alternate === null && n(h, N),
        (m = l(L, m, O)),
        x === null ? (C = L) : (x.sibling = L),
        (x = L),
        (N = F);
    }
    if (D.done) return t(h, N), ue && lt(h, O), C;
    if (N === null) {
      for (; !D.done; O++, D = y.next())
        (D = f(h, D.value, S)),
          D !== null &&
            ((m = l(D, m, O)), x === null ? (C = D) : (x.sibling = D), (x = D));
      return ue && lt(h, O), C;
    }
    for (N = r(h, N); !D.done; O++, D = y.next())
      (D = p(N, h, O, D.value, S)),
        D !== null &&
          (e && D.alternate !== null && N.delete(D.key === null ? O : D.key),
          (m = l(D, m, O)),
          x === null ? (C = D) : (x.sibling = D),
          (x = D));
    return (
      e &&
        N.forEach(function (A) {
          return n(h, A);
        }),
      ue && lt(h, O),
      C
    );
  }
  function T(h, m, y, S) {
    if (
      (typeof y == "object" &&
        y !== null &&
        y.type === Nt &&
        y.key === null &&
        (y = y.props.children),
      typeof y == "object" && y !== null)
    ) {
      switch (y.$$typeof) {
        case ii:
          e: {
            for (var C = y.key, x = m; x !== null; ) {
              if (x.key === C) {
                if (((C = y.type), C === Nt)) {
                  if (x.tag === 7) {
                    t(h, x.sibling),
                      (m = i(x, y.props.children)),
                      (m.return = h),
                      (h = m);
                    break e;
                  }
                } else if (
                  x.elementType === C ||
                  (typeof C == "object" &&
                    C !== null &&
                    C.$$typeof === jn &&
                    da(C) === x.type)
                ) {
                  t(h, x.sibling),
                    (m = i(x, y.props)),
                    (m.ref = fr(h, x, y)),
                    (m.return = h),
                    (h = m);
                  break e;
                }
                t(h, x);
                break;
              } else n(h, x);
              x = x.sibling;
            }
            y.type === Nt
              ? ((m = pt(y.props.children, h.mode, S, y.key)),
                (m.return = h),
                (h = m))
              : ((S = Ri(y.type, y.key, y.props, null, h.mode, S)),
                (S.ref = fr(h, m, y)),
                (S.return = h),
                (h = S));
          }
          return o(h);
        case _t:
          e: {
            for (x = y.key; m !== null; ) {
              if (m.key === x)
                if (
                  m.tag === 4 &&
                  m.stateNode.containerInfo === y.containerInfo &&
                  m.stateNode.implementation === y.implementation
                ) {
                  t(h, m.sibling),
                    (m = i(m, y.children || [])),
                    (m.return = h),
                    (h = m);
                  break e;
                } else {
                  t(h, m);
                  break;
                }
              else n(h, m);
              m = m.sibling;
            }
            (m = eo(y, h.mode, S)), (m.return = h), (h = m);
          }
          return o(h);
        case jn:
          return (x = y._init), T(h, m, x(y._payload), S);
      }
      if (yr(y)) return k(h, m, y, S);
      if (or(y)) return w(h, m, y, S);
      mi(h, y);
    }
    return (typeof y == "string" && y !== "") || typeof y == "number"
      ? ((y = "" + y),
        m !== null && m.tag === 6
          ? (t(h, m.sibling), (m = i(m, y)), (m.return = h), (h = m))
          : (t(h, m), (m = Zl(y, h.mode, S)), (m.return = h), (h = m)),
        o(h))
      : t(h, m);
  }
  return T;
}
var Xt = bf(!0),
  Kf = bf(!1),
  qi = nt(null),
  Gi = null,
  Dt = null,
  Bu = null;
function Uu() {
  Bu = Dt = Gi = null;
}
function Vu(e) {
  var n = qi.current;
  oe(qi), (e._currentValue = n);
}
function $o(e, n, t) {
  for (; e !== null; ) {
    var r = e.alternate;
    if (
      ((e.childLanes & n) !== n
        ? ((e.childLanes |= n), r !== null && (r.childLanes |= n))
        : r !== null && (r.childLanes & n) !== n && (r.childLanes |= n),
      e === t)
    )
      break;
    e = e.return;
  }
}
function Ht(e, n) {
  (Gi = e),
    (Bu = Dt = null),
    (e = e.dependencies),
    e !== null &&
      e.firstContext !== null &&
      (e.lanes & n && (Me = !0), (e.firstContext = null));
}
function nn(e) {
  var n = e._currentValue;
  if (Bu !== e)
    if (((e = { context: e, memoizedValue: n, next: null }), Dt === null)) {
      if (Gi === null) throw Error(_(308));
      (Dt = e), (Gi.dependencies = { lanes: 0, firstContext: e });
    } else Dt = Dt.next = e;
  return n;
}
var at = null;
function Hu(e) {
  at === null ? (at = [e]) : at.push(e);
}
function Yf(e, n, t, r) {
  var i = n.interleaved;
  return (
    i === null ? ((t.next = t), Hu(n)) : ((t.next = i.next), (i.next = t)),
    (n.interleaved = t),
    Ln(e, r)
  );
}
function Ln(e, n) {
  e.lanes |= n;
  var t = e.alternate;
  for (t !== null && (t.lanes |= n), t = e, e = e.return; e !== null; )
    (e.childLanes |= n),
      (t = e.alternate),
      t !== null && (t.childLanes |= n),
      (t = e),
      (e = e.return);
  return t.tag === 3 ? t.stateNode : null;
}
var Bn = !1;
function $u(e) {
  e.updateQueue = {
    baseState: e.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, interleaved: null, lanes: 0 },
    effects: null,
  };
}
function Xf(e, n) {
  (e = e.updateQueue),
    n.updateQueue === e &&
      (n.updateQueue = {
        baseState: e.baseState,
        firstBaseUpdate: e.firstBaseUpdate,
        lastBaseUpdate: e.lastBaseUpdate,
        shared: e.shared,
        effects: e.effects,
      });
}
function In(e, n) {
  return {
    eventTime: e,
    lane: n,
    tag: 0,
    payload: null,
    callback: null,
    next: null,
  };
}
function Yn(e, n, t) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (((r = r.shared), Y & 2)) {
    var i = r.pending;
    return (
      i === null ? (n.next = n) : ((n.next = i.next), (i.next = n)),
      (r.pending = n),
      Ln(e, t)
    );
  }
  return (
    (i = r.interleaved),
    i === null ? ((n.next = n), Hu(r)) : ((n.next = i.next), (i.next = n)),
    (r.interleaved = n),
    Ln(e, t)
  );
}
function Ii(e, n, t) {
  if (
    ((n = n.updateQueue), n !== null && ((n = n.shared), (t & 4194240) !== 0))
  ) {
    var r = n.lanes;
    (r &= e.pendingLanes), (t |= r), (n.lanes = t), Iu(e, t);
  }
}
function ha(e, n) {
  var t = e.updateQueue,
    r = e.alternate;
  if (r !== null && ((r = r.updateQueue), t === r)) {
    var i = null,
      l = null;
    if (((t = t.firstBaseUpdate), t !== null)) {
      do {
        var o = {
          eventTime: t.eventTime,
          lane: t.lane,
          tag: t.tag,
          payload: t.payload,
          callback: t.callback,
          next: null,
        };
        l === null ? (i = l = o) : (l = l.next = o), (t = t.next);
      } while (t !== null);
      l === null ? (i = l = n) : (l = l.next = n);
    } else i = l = n;
    (t = {
      baseState: r.baseState,
      firstBaseUpdate: i,
      lastBaseUpdate: l,
      shared: r.shared,
      effects: r.effects,
    }),
      (e.updateQueue = t);
    return;
  }
  (e = t.lastBaseUpdate),
    e === null ? (t.firstBaseUpdate = n) : (e.next = n),
    (t.lastBaseUpdate = n);
}
function Ji(e, n, t, r) {
  var i = e.updateQueue;
  Bn = !1;
  var l = i.firstBaseUpdate,
    o = i.lastBaseUpdate,
    u = i.shared.pending;
  if (u !== null) {
    i.shared.pending = null;
    var s = u,
      a = s.next;
    (s.next = null), o === null ? (l = a) : (o.next = a), (o = s);
    var c = e.alternate;
    c !== null &&
      ((c = c.updateQueue),
      (u = c.lastBaseUpdate),
      u !== o &&
        (u === null ? (c.firstBaseUpdate = a) : (u.next = a),
        (c.lastBaseUpdate = s)));
  }
  if (l !== null) {
    var f = i.baseState;
    (o = 0), (c = a = s = null), (u = l);
    do {
      var d = u.lane,
        p = u.eventTime;
      if ((r & d) === d) {
        c !== null &&
          (c = c.next =
            {
              eventTime: p,
              lane: 0,
              tag: u.tag,
              payload: u.payload,
              callback: u.callback,
              next: null,
            });
        e: {
          var k = e,
            w = u;
          switch (((d = n), (p = t), w.tag)) {
            case 1:
              if (((k = w.payload), typeof k == "function")) {
                f = k.call(p, f, d);
                break e;
              }
              f = k;
              break e;
            case 3:
              k.flags = (k.flags & -65537) | 128;
            case 0:
              if (
                ((k = w.payload),
                (d = typeof k == "function" ? k.call(p, f, d) : k),
                d == null)
              )
                break e;
              f = ce({}, f, d);
              break e;
            case 2:
              Bn = !0;
          }
        }
        u.callback !== null &&
          u.lane !== 0 &&
          ((e.flags |= 64),
          (d = i.effects),
          d === null ? (i.effects = [u]) : d.push(u));
      } else
        (p = {
          eventTime: p,
          lane: d,
          tag: u.tag,
          payload: u.payload,
          callback: u.callback,
          next: null,
        }),
          c === null ? ((a = c = p), (s = f)) : (c = c.next = p),
          (o |= d);
      if (((u = u.next), u === null)) {
        if (((u = i.shared.pending), u === null)) break;
        (d = u),
          (u = d.next),
          (d.next = null),
          (i.lastBaseUpdate = d),
          (i.shared.pending = null);
      }
    } while (1);
    if (
      (c === null && (s = f),
      (i.baseState = s),
      (i.firstBaseUpdate = a),
      (i.lastBaseUpdate = c),
      (n = i.shared.interleaved),
      n !== null)
    ) {
      i = n;
      do (o |= i.lane), (i = i.next);
      while (i !== n);
    } else l === null && (i.shared.lanes = 0);
    (gt |= o), (e.lanes = o), (e.memoizedState = f);
  }
}
function ma(e, n, t) {
  if (((e = n.effects), (n.effects = null), e !== null))
    for (n = 0; n < e.length; n++) {
      var r = e[n],
        i = r.callback;
      if (i !== null) {
        if (((r.callback = null), (r = t), typeof i != "function"))
          throw Error(_(191, i));
        i.call(r);
      }
    }
}
var Zr = {},
  xn = nt(Zr),
  Hr = nt(Zr),
  $r = nt(Zr);
function ct(e) {
  if (e === Zr) throw Error(_(174));
  return e;
}
function Wu(e, n) {
  switch ((te($r, n), te(Hr, e), te(xn, Zr), (e = n.nodeType), e)) {
    case 9:
    case 11:
      n = (n = n.documentElement) ? n.namespaceURI : Eo(null, "");
      break;
    default:
      (e = e === 8 ? n.parentNode : n),
        (n = e.namespaceURI || null),
        (e = e.tagName),
        (n = Eo(n, e));
  }
  oe(xn), te(xn, n);
}
function qt() {
  oe(xn), oe(Hr), oe($r);
}
function qf(e) {
  ct($r.current);
  var n = ct(xn.current),
    t = Eo(n, e.type);
  n !== t && (te(Hr, e), te(xn, t));
}
function Qu(e) {
  Hr.current === e && (oe(xn), oe(Hr));
}
var se = nt(0);
function Zi(e) {
  for (var n = e; n !== null; ) {
    if (n.tag === 13) {
      var t = n.memoizedState;
      if (
        t !== null &&
        ((t = t.dehydrated), t === null || t.data === "$?" || t.data === "$!")
      )
        return n;
    } else if (n.tag === 19 && n.memoizedProps.revealOrder !== void 0) {
      if (n.flags & 128) return n;
    } else if (n.child !== null) {
      (n.child.return = n), (n = n.child);
      continue;
    }
    if (n === e) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === e) return null;
      n = n.return;
    }
    (n.sibling.return = n.return), (n = n.sibling);
  }
  return null;
}
var Kl = [];
function bu() {
  for (var e = 0; e < Kl.length; e++)
    Kl[e]._workInProgressVersionPrimary = null;
  Kl.length = 0;
}
var Ti = Rn.ReactCurrentDispatcher,
  Yl = Rn.ReactCurrentBatchConfig,
  mt = 0,
  ae = null,
  ye = null,
  ke = null,
  el = !1,
  Pr = !1,
  Wr = 0,
  Om = 0;
function Pe() {
  throw Error(_(321));
}
function Ku(e, n) {
  if (n === null) return !1;
  for (var t = 0; t < n.length && t < e.length; t++)
    if (!dn(e[t], n[t])) return !1;
  return !0;
}
function Yu(e, n, t, r, i, l) {
  if (
    ((mt = l),
    (ae = n),
    (n.memoizedState = null),
    (n.updateQueue = null),
    (n.lanes = 0),
    (Ti.current = e === null || e.memoizedState === null ? Mm : Fm),
    (e = t(r, i)),
    Pr)
  ) {
    l = 0;
    do {
      if (((Pr = !1), (Wr = 0), 25 <= l)) throw Error(_(301));
      (l += 1),
        (ke = ye = null),
        (n.updateQueue = null),
        (Ti.current = jm),
        (e = t(r, i));
    } while (Pr);
  }
  if (
    ((Ti.current = nl),
    (n = ye !== null && ye.next !== null),
    (mt = 0),
    (ke = ye = ae = null),
    (el = !1),
    n)
  )
    throw Error(_(300));
  return e;
}
function Xu() {
  var e = Wr !== 0;
  return (Wr = 0), e;
}
function gn() {
  var e = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
  return ke === null ? (ae.memoizedState = ke = e) : (ke = ke.next = e), ke;
}
function tn() {
  if (ye === null) {
    var e = ae.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ye.next;
  var n = ke === null ? ae.memoizedState : ke.next;
  if (n !== null) (ke = n), (ye = e);
  else {
    if (e === null) throw Error(_(310));
    (ye = e),
      (e = {
        memoizedState: ye.memoizedState,
        baseState: ye.baseState,
        baseQueue: ye.baseQueue,
        queue: ye.queue,
        next: null,
      }),
      ke === null ? (ae.memoizedState = ke = e) : (ke = ke.next = e);
  }
  return ke;
}
function Qr(e, n) {
  return typeof n == "function" ? n(e) : n;
}
function Xl(e) {
  var n = tn(),
    t = n.queue;
  if (t === null) throw Error(_(311));
  t.lastRenderedReducer = e;
  var r = ye,
    i = r.baseQueue,
    l = t.pending;
  if (l !== null) {
    if (i !== null) {
      var o = i.next;
      (i.next = l.next), (l.next = o);
    }
    (r.baseQueue = i = l), (t.pending = null);
  }
  if (i !== null) {
    (l = i.next), (r = r.baseState);
    var u = (o = null),
      s = null,
      a = l;
    do {
      var c = a.lane;
      if ((mt & c) === c)
        s !== null &&
          (s = s.next =
            {
              lane: 0,
              action: a.action,
              hasEagerState: a.hasEagerState,
              eagerState: a.eagerState,
              next: null,
            }),
          (r = a.hasEagerState ? a.eagerState : e(r, a.action));
      else {
        var f = {
          lane: c,
          action: a.action,
          hasEagerState: a.hasEagerState,
          eagerState: a.eagerState,
          next: null,
        };
        s === null ? ((u = s = f), (o = r)) : (s = s.next = f),
          (ae.lanes |= c),
          (gt |= c);
      }
      a = a.next;
    } while (a !== null && a !== l);
    s === null ? (o = r) : (s.next = u),
      dn(r, n.memoizedState) || (Me = !0),
      (n.memoizedState = r),
      (n.baseState = o),
      (n.baseQueue = s),
      (t.lastRenderedState = r);
  }
  if (((e = t.interleaved), e !== null)) {
    i = e;
    do (l = i.lane), (ae.lanes |= l), (gt |= l), (i = i.next);
    while (i !== e);
  } else i === null && (t.lanes = 0);
  return [n.memoizedState, t.dispatch];
}
function ql(e) {
  var n = tn(),
    t = n.queue;
  if (t === null) throw Error(_(311));
  t.lastRenderedReducer = e;
  var r = t.dispatch,
    i = t.pending,
    l = n.memoizedState;
  if (i !== null) {
    t.pending = null;
    var o = (i = i.next);
    do (l = e(l, o.action)), (o = o.next);
    while (o !== i);
    dn(l, n.memoizedState) || (Me = !0),
      (n.memoizedState = l),
      n.baseQueue === null && (n.baseState = l),
      (t.lastRenderedState = l);
  }
  return [l, r];
}
function Gf() {}
function Jf(e, n) {
  var t = ae,
    r = tn(),
    i = n(),
    l = !dn(r.memoizedState, i);
  if (
    (l && ((r.memoizedState = i), (Me = !0)),
    (r = r.queue),
    qu(np.bind(null, t, r, e), [e]),
    r.getSnapshot !== n || l || (ke !== null && ke.memoizedState.tag & 1))
  ) {
    if (
      ((t.flags |= 2048),
      br(9, ep.bind(null, t, r, i, n), void 0, null),
      we === null)
    )
      throw Error(_(349));
    mt & 30 || Zf(t, n, i);
  }
  return i;
}
function Zf(e, n, t) {
  (e.flags |= 16384),
    (e = { getSnapshot: n, value: t }),
    (n = ae.updateQueue),
    n === null
      ? ((n = { lastEffect: null, stores: null }),
        (ae.updateQueue = n),
        (n.stores = [e]))
      : ((t = n.stores), t === null ? (n.stores = [e]) : t.push(e));
}
function ep(e, n, t, r) {
  (n.value = t), (n.getSnapshot = r), tp(n) && rp(e);
}
function np(e, n, t) {
  return t(function () {
    tp(n) && rp(e);
  });
}
function tp(e) {
  var n = e.getSnapshot;
  e = e.value;
  try {
    var t = n();
    return !dn(e, t);
  } catch {
    return !0;
  }
}
function rp(e) {
  var n = Ln(e, 1);
  n !== null && pn(n, e, 1, -1);
}
function ga(e) {
  var n = gn();
  return (
    typeof e == "function" && (e = e()),
    (n.memoizedState = n.baseState = e),
    (e = {
      pending: null,
      interleaved: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Qr,
      lastRenderedState: e,
    }),
    (n.queue = e),
    (e = e.dispatch = Dm.bind(null, ae, e)),
    [n.memoizedState, e]
  );
}
function br(e, n, t, r) {
  return (
    (e = { tag: e, create: n, destroy: t, deps: r, next: null }),
    (n = ae.updateQueue),
    n === null
      ? ((n = { lastEffect: null, stores: null }),
        (ae.updateQueue = n),
        (n.lastEffect = e.next = e))
      : ((t = n.lastEffect),
        t === null
          ? (n.lastEffect = e.next = e)
          : ((r = t.next), (t.next = e), (e.next = r), (n.lastEffect = e))),
    e
  );
}
function ip() {
  return tn().memoizedState;
}
function zi(e, n, t, r) {
  var i = gn();
  (ae.flags |= e),
    (i.memoizedState = br(1 | n, t, void 0, r === void 0 ? null : r));
}
function yl(e, n, t, r) {
  var i = tn();
  r = r === void 0 ? null : r;
  var l = void 0;
  if (ye !== null) {
    var o = ye.memoizedState;
    if (((l = o.destroy), r !== null && Ku(r, o.deps))) {
      i.memoizedState = br(n, t, l, r);
      return;
    }
  }
  (ae.flags |= e), (i.memoizedState = br(1 | n, t, l, r));
}
function ya(e, n) {
  return zi(8390656, 8, e, n);
}
function qu(e, n) {
  return yl(2048, 8, e, n);
}
function lp(e, n) {
  return yl(4, 2, e, n);
}
function op(e, n) {
  return yl(4, 4, e, n);
}
function up(e, n) {
  if (typeof n == "function")
    return (
      (e = e()),
      n(e),
      function () {
        n(null);
      }
    );
  if (n != null)
    return (
      (e = e()),
      (n.current = e),
      function () {
        n.current = null;
      }
    );
}
function sp(e, n, t) {
  return (
    (t = t != null ? t.concat([e]) : null), yl(4, 4, up.bind(null, n, e), t)
  );
}
function Gu() {}
function ap(e, n) {
  var t = tn();
  n = n === void 0 ? null : n;
  var r = t.memoizedState;
  return r !== null && n !== null && Ku(n, r[1])
    ? r[0]
    : ((t.memoizedState = [e, n]), e);
}
function cp(e, n) {
  var t = tn();
  n = n === void 0 ? null : n;
  var r = t.memoizedState;
  return r !== null && n !== null && Ku(n, r[1])
    ? r[0]
    : ((e = e()), (t.memoizedState = [e, n]), e);
}
function fp(e, n, t) {
  return mt & 21
    ? (dn(t, n) || ((t = gf()), (ae.lanes |= t), (gt |= t), (e.baseState = !0)),
      n)
    : (e.baseState && ((e.baseState = !1), (Me = !0)), (e.memoizedState = t));
}
function Am(e, n) {
  var t = G;
  (G = t !== 0 && 4 > t ? t : 4), e(!0);
  var r = Yl.transition;
  Yl.transition = {};
  try {
    e(!1), n();
  } finally {
    (G = t), (Yl.transition = r);
  }
}
function pp() {
  return tn().memoizedState;
}
function Rm(e, n, t) {
  var r = qn(e);
  if (
    ((t = {
      lane: r,
      action: t,
      hasEagerState: !1,
      eagerState: null,
      next: null,
    }),
    dp(e))
  )
    hp(n, t);
  else if (((t = Yf(e, n, t, r)), t !== null)) {
    var i = Le();
    pn(t, e, r, i), mp(t, n, r);
  }
}
function Dm(e, n, t) {
  var r = qn(e),
    i = { lane: r, action: t, hasEagerState: !1, eagerState: null, next: null };
  if (dp(e)) hp(n, i);
  else {
    var l = e.alternate;
    if (
      e.lanes === 0 &&
      (l === null || l.lanes === 0) &&
      ((l = n.lastRenderedReducer), l !== null)
    )
      try {
        var o = n.lastRenderedState,
          u = l(o, t);
        if (((i.hasEagerState = !0), (i.eagerState = u), dn(u, o))) {
          var s = n.interleaved;
          s === null
            ? ((i.next = i), Hu(n))
            : ((i.next = s.next), (s.next = i)),
            (n.interleaved = i);
          return;
        }
      } catch {
      } finally {
      }
    (t = Yf(e, n, i, r)),
      t !== null && ((i = Le()), pn(t, e, r, i), mp(t, n, r));
  }
}
function dp(e) {
  var n = e.alternate;
  return e === ae || (n !== null && n === ae);
}
function hp(e, n) {
  Pr = el = !0;
  var t = e.pending;
  t === null ? (n.next = n) : ((n.next = t.next), (t.next = n)),
    (e.pending = n);
}
function mp(e, n, t) {
  if (t & 4194240) {
    var r = n.lanes;
    (r &= e.pendingLanes), (t |= r), (n.lanes = t), Iu(e, t);
  }
}
var nl = {
    readContext: nn,
    useCallback: Pe,
    useContext: Pe,
    useEffect: Pe,
    useImperativeHandle: Pe,
    useInsertionEffect: Pe,
    useLayoutEffect: Pe,
    useMemo: Pe,
    useReducer: Pe,
    useRef: Pe,
    useState: Pe,
    useDebugValue: Pe,
    useDeferredValue: Pe,
    useTransition: Pe,
    useMutableSource: Pe,
    useSyncExternalStore: Pe,
    useId: Pe,
    unstable_isNewReconciler: !1,
  },
  Mm = {
    readContext: nn,
    useCallback: function (e, n) {
      return (gn().memoizedState = [e, n === void 0 ? null : n]), e;
    },
    useContext: nn,
    useEffect: ya,
    useImperativeHandle: function (e, n, t) {
      return (
        (t = t != null ? t.concat([e]) : null),
        zi(4194308, 4, up.bind(null, n, e), t)
      );
    },
    useLayoutEffect: function (e, n) {
      return zi(4194308, 4, e, n);
    },
    useInsertionEffect: function (e, n) {
      return zi(4, 2, e, n);
    },
    useMemo: function (e, n) {
      var t = gn();
      return (
        (n = n === void 0 ? null : n), (e = e()), (t.memoizedState = [e, n]), e
      );
    },
    useReducer: function (e, n, t) {
      var r = gn();
      return (
        (n = t !== void 0 ? t(n) : n),
        (r.memoizedState = r.baseState = n),
        (e = {
          pending: null,
          interleaved: null,
          lanes: 0,
          dispatch: null,
          lastRenderedReducer: e,
          lastRenderedState: n,
        }),
        (r.queue = e),
        (e = e.dispatch = Rm.bind(null, ae, e)),
        [r.memoizedState, e]
      );
    },
    useRef: function (e) {
      var n = gn();
      return (e = { current: e }), (n.memoizedState = e);
    },
    useState: ga,
    useDebugValue: Gu,
    useDeferredValue: function (e) {
      return (gn().memoizedState = e);
    },
    useTransition: function () {
      var e = ga(!1),
        n = e[0];
      return (e = Am.bind(null, e[1])), (gn().memoizedState = e), [n, e];
    },
    useMutableSource: function () {},
    useSyncExternalStore: function (e, n, t) {
      var r = ae,
        i = gn();
      if (ue) {
        if (t === void 0) throw Error(_(407));
        t = t();
      } else {
        if (((t = n()), we === null)) throw Error(_(349));
        mt & 30 || Zf(r, n, t);
      }
      i.memoizedState = t;
      var l = { value: t, getSnapshot: n };
      return (
        (i.queue = l),
        ya(np.bind(null, r, l, e), [e]),
        (r.flags |= 2048),
        br(9, ep.bind(null, r, l, t, n), void 0, null),
        t
      );
    },
    useId: function () {
      var e = gn(),
        n = we.identifierPrefix;
      if (ue) {
        var t = Nn,
          r = _n;
        (t = (r & ~(1 << (32 - fn(r) - 1))).toString(32) + t),
          (n = ":" + n + "R" + t),
          (t = Wr++),
          0 < t && (n += "H" + t.toString(32)),
          (n += ":");
      } else (t = Om++), (n = ":" + n + "r" + t.toString(32) + ":");
      return (e.memoizedState = n);
    },
    unstable_isNewReconciler: !1,
  },
  Fm = {
    readContext: nn,
    useCallback: ap,
    useContext: nn,
    useEffect: qu,
    useImperativeHandle: sp,
    useInsertionEffect: lp,
    useLayoutEffect: op,
    useMemo: cp,
    useReducer: Xl,
    useRef: ip,
    useState: function () {
      return Xl(Qr);
    },
    useDebugValue: Gu,
    useDeferredValue: function (e) {
      var n = tn();
      return fp(n, ye.memoizedState, e);
    },
    useTransition: function () {
      var e = Xl(Qr)[0],
        n = tn().memoizedState;
      return [e, n];
    },
    useMutableSource: Gf,
    useSyncExternalStore: Jf,
    useId: pp,
    unstable_isNewReconciler: !1,
  },
  jm = {
    readContext: nn,
    useCallback: ap,
    useContext: nn,
    useEffect: qu,
    useImperativeHandle: sp,
    useInsertionEffect: lp,
    useLayoutEffect: op,
    useMemo: cp,
    useReducer: ql,
    useRef: ip,
    useState: function () {
      return ql(Qr);
    },
    useDebugValue: Gu,
    useDeferredValue: function (e) {
      var n = tn();
      return ye === null ? (n.memoizedState = e) : fp(n, ye.memoizedState, e);
    },
    useTransition: function () {
      var e = ql(Qr)[0],
        n = tn().memoizedState;
      return [e, n];
    },
    useMutableSource: Gf,
    useSyncExternalStore: Jf,
    useId: pp,
    unstable_isNewReconciler: !1,
  };
function sn(e, n) {
  if (e && e.defaultProps) {
    (n = ce({}, n)), (e = e.defaultProps);
    for (var t in e) n[t] === void 0 && (n[t] = e[t]);
    return n;
  }
  return n;
}
function Wo(e, n, t, r) {
  (n = e.memoizedState),
    (t = t(r, n)),
    (t = t == null ? n : ce({}, n, t)),
    (e.memoizedState = t),
    e.lanes === 0 && (e.updateQueue.baseState = t);
}
var vl = {
  isMounted: function (e) {
    return (e = e._reactInternals) ? kt(e) === e : !1;
  },
  enqueueSetState: function (e, n, t) {
    e = e._reactInternals;
    var r = Le(),
      i = qn(e),
      l = In(r, i);
    (l.payload = n),
      t != null && (l.callback = t),
      (n = Yn(e, l, i)),
      n !== null && (pn(n, e, i, r), Ii(n, e, i));
  },
  enqueueReplaceState: function (e, n, t) {
    e = e._reactInternals;
    var r = Le(),
      i = qn(e),
      l = In(r, i);
    (l.tag = 1),
      (l.payload = n),
      t != null && (l.callback = t),
      (n = Yn(e, l, i)),
      n !== null && (pn(n, e, i, r), Ii(n, e, i));
  },
  enqueueForceUpdate: function (e, n) {
    e = e._reactInternals;
    var t = Le(),
      r = qn(e),
      i = In(t, r);
    (i.tag = 2),
      n != null && (i.callback = n),
      (n = Yn(e, i, r)),
      n !== null && (pn(n, e, r, t), Ii(n, e, r));
  },
};
function va(e, n, t, r, i, l, o) {
  return (
    (e = e.stateNode),
    typeof e.shouldComponentUpdate == "function"
      ? e.shouldComponentUpdate(r, l, o)
      : n.prototype && n.prototype.isPureReactComponent
      ? !jr(t, r) || !jr(i, l)
      : !0
  );
}
function gp(e, n, t) {
  var r = !1,
    i = Zn,
    l = n.contextType;
  return (
    typeof l == "object" && l !== null
      ? (l = nn(l))
      : ((i = je(n) ? dt : Ie.current),
        (r = n.contextTypes),
        (l = (r = r != null) ? Kt(e, i) : Zn)),
    (n = new n(t, l)),
    (e.memoizedState = n.state !== null && n.state !== void 0 ? n.state : null),
    (n.updater = vl),
    (e.stateNode = n),
    (n._reactInternals = e),
    r &&
      ((e = e.stateNode),
      (e.__reactInternalMemoizedUnmaskedChildContext = i),
      (e.__reactInternalMemoizedMaskedChildContext = l)),
    n
  );
}
function ka(e, n, t, r) {
  (e = n.state),
    typeof n.componentWillReceiveProps == "function" &&
      n.componentWillReceiveProps(t, r),
    typeof n.UNSAFE_componentWillReceiveProps == "function" &&
      n.UNSAFE_componentWillReceiveProps(t, r),
    n.state !== e && vl.enqueueReplaceState(n, n.state, null);
}
function Qo(e, n, t, r) {
  var i = e.stateNode;
  (i.props = t), (i.state = e.memoizedState), (i.refs = {}), $u(e);
  var l = n.contextType;
  typeof l == "object" && l !== null
    ? (i.context = nn(l))
    : ((l = je(n) ? dt : Ie.current), (i.context = Kt(e, l))),
    (i.state = e.memoizedState),
    (l = n.getDerivedStateFromProps),
    typeof l == "function" && (Wo(e, n, l, t), (i.state = e.memoizedState)),
    typeof n.getDerivedStateFromProps == "function" ||
      typeof i.getSnapshotBeforeUpdate == "function" ||
      (typeof i.UNSAFE_componentWillMount != "function" &&
        typeof i.componentWillMount != "function") ||
      ((n = i.state),
      typeof i.componentWillMount == "function" && i.componentWillMount(),
      typeof i.UNSAFE_componentWillMount == "function" &&
        i.UNSAFE_componentWillMount(),
      n !== i.state && vl.enqueueReplaceState(i, i.state, null),
      Ji(e, t, i, r),
      (i.state = e.memoizedState)),
    typeof i.componentDidMount == "function" && (e.flags |= 4194308);
}
function Gt(e, n) {
  try {
    var t = "",
      r = n;
    do (t += ph(r)), (r = r.return);
    while (r);
    var i = t;
  } catch (l) {
    i =
      `
Error generating stack: ` +
      l.message +
      `
` +
      l.stack;
  }
  return { value: e, source: n, stack: i, digest: null };
}
function Gl(e, n, t) {
  return { value: e, source: null, stack: t ?? null, digest: n ?? null };
}
function bo(e, n) {
  try {
    console.error(n.value);
  } catch (t) {
    setTimeout(function () {
      throw t;
    });
  }
}
var Bm = typeof WeakMap == "function" ? WeakMap : Map;
function yp(e, n, t) {
  (t = In(-1, t)), (t.tag = 3), (t.payload = { element: null });
  var r = n.value;
  return (
    (t.callback = function () {
      rl || ((rl = !0), (tu = r)), bo(e, n);
    }),
    t
  );
}
function vp(e, n, t) {
  (t = In(-1, t)), (t.tag = 3);
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var i = n.value;
    (t.payload = function () {
      return r(i);
    }),
      (t.callback = function () {
        bo(e, n);
      });
  }
  var l = e.stateNode;
  return (
    l !== null &&
      typeof l.componentDidCatch == "function" &&
      (t.callback = function () {
        bo(e, n),
          typeof r != "function" &&
            (Xn === null ? (Xn = new Set([this])) : Xn.add(this));
        var o = n.stack;
        this.componentDidCatch(n.value, {
          componentStack: o !== null ? o : "",
        });
      }),
    t
  );
}
function wa(e, n, t) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new Bm();
    var i = new Set();
    r.set(n, i);
  } else (i = r.get(n)), i === void 0 && ((i = new Set()), r.set(n, i));
  i.has(t) || (i.add(t), (e = Zm.bind(null, e, n, t)), n.then(e, e));
}
function xa(e) {
  do {
    var n;
    if (
      ((n = e.tag === 13) &&
        ((n = e.memoizedState), (n = n !== null ? n.dehydrated !== null : !0)),
      n)
    )
      return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Sa(e, n, t, r, i) {
  return e.mode & 1
    ? ((e.flags |= 65536), (e.lanes = i), e)
    : (e === n
        ? (e.flags |= 65536)
        : ((e.flags |= 128),
          (t.flags |= 131072),
          (t.flags &= -52805),
          t.tag === 1 &&
            (t.alternate === null
              ? (t.tag = 17)
              : ((n = In(-1, 1)), (n.tag = 2), Yn(t, n, 1))),
          (t.lanes |= 1)),
      e);
}
var Um = Rn.ReactCurrentOwner,
  Me = !1;
function ze(e, n, t, r) {
  n.child = e === null ? Kf(n, null, t, r) : Xt(n, e.child, t, r);
}
function Ea(e, n, t, r, i) {
  t = t.render;
  var l = n.ref;
  return (
    Ht(n, i),
    (r = Yu(e, n, t, r, l, i)),
    (t = Xu()),
    e !== null && !Me
      ? ((n.updateQueue = e.updateQueue),
        (n.flags &= -2053),
        (e.lanes &= ~i),
        On(e, n, i))
      : (ue && t && Mu(n), (n.flags |= 1), ze(e, n, r, i), n.child)
  );
}
function Ca(e, n, t, r, i) {
  if (e === null) {
    var l = t.type;
    return typeof l == "function" &&
      !ls(l) &&
      l.defaultProps === void 0 &&
      t.compare === null &&
      t.defaultProps === void 0
      ? ((n.tag = 15), (n.type = l), kp(e, n, l, r, i))
      : ((e = Ri(t.type, null, r, n, n.mode, i)),
        (e.ref = n.ref),
        (e.return = n),
        (n.child = e));
  }
  if (((l = e.child), !(e.lanes & i))) {
    var o = l.memoizedProps;
    if (
      ((t = t.compare), (t = t !== null ? t : jr), t(o, r) && e.ref === n.ref)
    )
      return On(e, n, i);
  }
  return (
    (n.flags |= 1),
    (e = Gn(l, r)),
    (e.ref = n.ref),
    (e.return = n),
    (n.child = e)
  );
}
function kp(e, n, t, r, i) {
  if (e !== null) {
    var l = e.memoizedProps;
    if (jr(l, r) && e.ref === n.ref)
      if (((Me = !1), (n.pendingProps = r = l), (e.lanes & i) !== 0))
        e.flags & 131072 && (Me = !0);
      else return (n.lanes = e.lanes), On(e, n, i);
  }
  return Ko(e, n, t, r, i);
}
function wp(e, n, t) {
  var r = n.pendingProps,
    i = r.children,
    l = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden")
    if (!(n.mode & 1))
      (n.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        te(Ft, $e),
        ($e |= t);
    else {
      if (!(t & 1073741824))
        return (
          (e = l !== null ? l.baseLanes | t : t),
          (n.lanes = n.childLanes = 1073741824),
          (n.memoizedState = {
            baseLanes: e,
            cachePool: null,
            transitions: null,
          }),
          (n.updateQueue = null),
          te(Ft, $e),
          ($e |= e),
          null
        );
      (n.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }),
        (r = l !== null ? l.baseLanes : t),
        te(Ft, $e),
        ($e |= r);
    }
  else
    l !== null ? ((r = l.baseLanes | t), (n.memoizedState = null)) : (r = t),
      te(Ft, $e),
      ($e |= r);
  return ze(e, n, i, t), n.child;
}
function xp(e, n) {
  var t = n.ref;
  ((e === null && t !== null) || (e !== null && e.ref !== t)) &&
    ((n.flags |= 512), (n.flags |= 2097152));
}
function Ko(e, n, t, r, i) {
  var l = je(t) ? dt : Ie.current;
  return (
    (l = Kt(n, l)),
    Ht(n, i),
    (t = Yu(e, n, t, r, l, i)),
    (r = Xu()),
    e !== null && !Me
      ? ((n.updateQueue = e.updateQueue),
        (n.flags &= -2053),
        (e.lanes &= ~i),
        On(e, n, i))
      : (ue && r && Mu(n), (n.flags |= 1), ze(e, n, t, i), n.child)
  );
}
function Pa(e, n, t, r, i) {
  if (je(t)) {
    var l = !0;
    Ki(n);
  } else l = !1;
  if ((Ht(n, i), n.stateNode === null))
    Li(e, n), gp(n, t, r), Qo(n, t, r, i), (r = !0);
  else if (e === null) {
    var o = n.stateNode,
      u = n.memoizedProps;
    o.props = u;
    var s = o.context,
      a = t.contextType;
    typeof a == "object" && a !== null
      ? (a = nn(a))
      : ((a = je(t) ? dt : Ie.current), (a = Kt(n, a)));
    var c = t.getDerivedStateFromProps,
      f =
        typeof c == "function" ||
        typeof o.getSnapshotBeforeUpdate == "function";
    f ||
      (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
        typeof o.componentWillReceiveProps != "function") ||
      ((u !== r || s !== a) && ka(n, o, r, a)),
      (Bn = !1);
    var d = n.memoizedState;
    (o.state = d),
      Ji(n, r, o, i),
      (s = n.memoizedState),
      u !== r || d !== s || Fe.current || Bn
        ? (typeof c == "function" && (Wo(n, t, c, r), (s = n.memoizedState)),
          (u = Bn || va(n, t, u, r, d, s, a))
            ? (f ||
                (typeof o.UNSAFE_componentWillMount != "function" &&
                  typeof o.componentWillMount != "function") ||
                (typeof o.componentWillMount == "function" &&
                  o.componentWillMount(),
                typeof o.UNSAFE_componentWillMount == "function" &&
                  o.UNSAFE_componentWillMount()),
              typeof o.componentDidMount == "function" && (n.flags |= 4194308))
            : (typeof o.componentDidMount == "function" && (n.flags |= 4194308),
              (n.memoizedProps = r),
              (n.memoizedState = s)),
          (o.props = r),
          (o.state = s),
          (o.context = a),
          (r = u))
        : (typeof o.componentDidMount == "function" && (n.flags |= 4194308),
          (r = !1));
  } else {
    (o = n.stateNode),
      Xf(e, n),
      (u = n.memoizedProps),
      (a = n.type === n.elementType ? u : sn(n.type, u)),
      (o.props = a),
      (f = n.pendingProps),
      (d = o.context),
      (s = t.contextType),
      typeof s == "object" && s !== null
        ? (s = nn(s))
        : ((s = je(t) ? dt : Ie.current), (s = Kt(n, s)));
    var p = t.getDerivedStateFromProps;
    (c =
      typeof p == "function" ||
      typeof o.getSnapshotBeforeUpdate == "function") ||
      (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
        typeof o.componentWillReceiveProps != "function") ||
      ((u !== f || d !== s) && ka(n, o, r, s)),
      (Bn = !1),
      (d = n.memoizedState),
      (o.state = d),
      Ji(n, r, o, i);
    var k = n.memoizedState;
    u !== f || d !== k || Fe.current || Bn
      ? (typeof p == "function" && (Wo(n, t, p, r), (k = n.memoizedState)),
        (a = Bn || va(n, t, a, r, d, k, s) || !1)
          ? (c ||
              (typeof o.UNSAFE_componentWillUpdate != "function" &&
                typeof o.componentWillUpdate != "function") ||
              (typeof o.componentWillUpdate == "function" &&
                o.componentWillUpdate(r, k, s),
              typeof o.UNSAFE_componentWillUpdate == "function" &&
                o.UNSAFE_componentWillUpdate(r, k, s)),
            typeof o.componentDidUpdate == "function" && (n.flags |= 4),
            typeof o.getSnapshotBeforeUpdate == "function" && (n.flags |= 1024))
          : (typeof o.componentDidUpdate != "function" ||
              (u === e.memoizedProps && d === e.memoizedState) ||
              (n.flags |= 4),
            typeof o.getSnapshotBeforeUpdate != "function" ||
              (u === e.memoizedProps && d === e.memoizedState) ||
              (n.flags |= 1024),
            (n.memoizedProps = r),
            (n.memoizedState = k)),
        (o.props = r),
        (o.state = k),
        (o.context = s),
        (r = a))
      : (typeof o.componentDidUpdate != "function" ||
          (u === e.memoizedProps && d === e.memoizedState) ||
          (n.flags |= 4),
        typeof o.getSnapshotBeforeUpdate != "function" ||
          (u === e.memoizedProps && d === e.memoizedState) ||
          (n.flags |= 1024),
        (r = !1));
  }
  return Yo(e, n, t, r, l, i);
}
function Yo(e, n, t, r, i, l) {
  xp(e, n);
  var o = (n.flags & 128) !== 0;
  if (!r && !o) return i && ca(n, t, !1), On(e, n, l);
  (r = n.stateNode), (Um.current = n);
  var u =
    o && typeof t.getDerivedStateFromError != "function" ? null : r.render();
  return (
    (n.flags |= 1),
    e !== null && o
      ? ((n.child = Xt(n, e.child, null, l)), (n.child = Xt(n, null, u, l)))
      : ze(e, n, u, l),
    (n.memoizedState = r.state),
    i && ca(n, t, !0),
    n.child
  );
}
function Sp(e) {
  var n = e.stateNode;
  n.pendingContext
    ? aa(e, n.pendingContext, n.pendingContext !== n.context)
    : n.context && aa(e, n.context, !1),
    Wu(e, n.containerInfo);
}
function _a(e, n, t, r, i) {
  return Yt(), ju(i), (n.flags |= 256), ze(e, n, t, r), n.child;
}
var Xo = { dehydrated: null, treeContext: null, retryLane: 0 };
function qo(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function Ep(e, n, t) {
  var r = n.pendingProps,
    i = se.current,
    l = !1,
    o = (n.flags & 128) !== 0,
    u;
  if (
    ((u = o) ||
      (u = e !== null && e.memoizedState === null ? !1 : (i & 2) !== 0),
    u
      ? ((l = !0), (n.flags &= -129))
      : (e === null || e.memoizedState !== null) && (i |= 1),
    te(se, i & 1),
    e === null)
  )
    return (
      Ho(n),
      (e = n.memoizedState),
      e !== null && ((e = e.dehydrated), e !== null)
        ? (n.mode & 1
            ? e.data === "$!"
              ? (n.lanes = 8)
              : (n.lanes = 1073741824)
            : (n.lanes = 1),
          null)
        : ((o = r.children),
          (e = r.fallback),
          l
            ? ((r = n.mode),
              (l = n.child),
              (o = { mode: "hidden", children: o }),
              !(r & 1) && l !== null
                ? ((l.childLanes = 0), (l.pendingProps = o))
                : (l = xl(o, r, 0, null)),
              (e = pt(e, r, t, null)),
              (l.return = n),
              (e.return = n),
              (l.sibling = e),
              (n.child = l),
              (n.child.memoizedState = qo(t)),
              (n.memoizedState = Xo),
              e)
            : Ju(n, o))
    );
  if (((i = e.memoizedState), i !== null && ((u = i.dehydrated), u !== null)))
    return Vm(e, n, o, r, u, i, t);
  if (l) {
    (l = r.fallback), (o = n.mode), (i = e.child), (u = i.sibling);
    var s = { mode: "hidden", children: r.children };
    return (
      !(o & 1) && n.child !== i
        ? ((r = n.child),
          (r.childLanes = 0),
          (r.pendingProps = s),
          (n.deletions = null))
        : ((r = Gn(i, s)), (r.subtreeFlags = i.subtreeFlags & 14680064)),
      u !== null ? (l = Gn(u, l)) : ((l = pt(l, o, t, null)), (l.flags |= 2)),
      (l.return = n),
      (r.return = n),
      (r.sibling = l),
      (n.child = r),
      (r = l),
      (l = n.child),
      (o = e.child.memoizedState),
      (o =
        o === null
          ? qo(t)
          : {
              baseLanes: o.baseLanes | t,
              cachePool: null,
              transitions: o.transitions,
            }),
      (l.memoizedState = o),
      (l.childLanes = e.childLanes & ~t),
      (n.memoizedState = Xo),
      r
    );
  }
  return (
    (l = e.child),
    (e = l.sibling),
    (r = Gn(l, { mode: "visible", children: r.children })),
    !(n.mode & 1) && (r.lanes = t),
    (r.return = n),
    (r.sibling = null),
    e !== null &&
      ((t = n.deletions),
      t === null ? ((n.deletions = [e]), (n.flags |= 16)) : t.push(e)),
    (n.child = r),
    (n.memoizedState = null),
    r
  );
}
function Ju(e, n) {
  return (
    (n = xl({ mode: "visible", children: n }, e.mode, 0, null)),
    (n.return = e),
    (e.child = n)
  );
}
function gi(e, n, t, r) {
  return (
    r !== null && ju(r),
    Xt(n, e.child, null, t),
    (e = Ju(n, n.pendingProps.children)),
    (e.flags |= 2),
    (n.memoizedState = null),
    e
  );
}
function Vm(e, n, t, r, i, l, o) {
  if (t)
    return n.flags & 256
      ? ((n.flags &= -257), (r = Gl(Error(_(422)))), gi(e, n, o, r))
      : n.memoizedState !== null
      ? ((n.child = e.child), (n.flags |= 128), null)
      : ((l = r.fallback),
        (i = n.mode),
        (r = xl({ mode: "visible", children: r.children }, i, 0, null)),
        (l = pt(l, i, o, null)),
        (l.flags |= 2),
        (r.return = n),
        (l.return = n),
        (r.sibling = l),
        (n.child = r),
        n.mode & 1 && Xt(n, e.child, null, o),
        (n.child.memoizedState = qo(o)),
        (n.memoizedState = Xo),
        l);
  if (!(n.mode & 1)) return gi(e, n, o, null);
  if (i.data === "$!") {
    if (((r = i.nextSibling && i.nextSibling.dataset), r)) var u = r.dgst;
    return (r = u), (l = Error(_(419))), (r = Gl(l, r, void 0)), gi(e, n, o, r);
  }
  if (((u = (o & e.childLanes) !== 0), Me || u)) {
    if (((r = we), r !== null)) {
      switch (o & -o) {
        case 4:
          i = 2;
          break;
        case 16:
          i = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          i = 32;
          break;
        case 536870912:
          i = 268435456;
          break;
        default:
          i = 0;
      }
      (i = i & (r.suspendedLanes | o) ? 0 : i),
        i !== 0 &&
          i !== l.retryLane &&
          ((l.retryLane = i), Ln(e, i), pn(r, e, i, -1));
    }
    return is(), (r = Gl(Error(_(421)))), gi(e, n, o, r);
  }
  return i.data === "$?"
    ? ((n.flags |= 128),
      (n.child = e.child),
      (n = eg.bind(null, e)),
      (i._reactRetry = n),
      null)
    : ((e = l.treeContext),
      (We = Kn(i.nextSibling)),
      (be = n),
      (ue = !0),
      (cn = null),
      e !== null &&
        ((qe[Ge++] = _n),
        (qe[Ge++] = Nn),
        (qe[Ge++] = ht),
        (_n = e.id),
        (Nn = e.overflow),
        (ht = n)),
      (n = Ju(n, r.children)),
      (n.flags |= 4096),
      n);
}
function Na(e, n, t) {
  e.lanes |= n;
  var r = e.alternate;
  r !== null && (r.lanes |= n), $o(e.return, n, t);
}
function Jl(e, n, t, r, i) {
  var l = e.memoizedState;
  l === null
    ? (e.memoizedState = {
        isBackwards: n,
        rendering: null,
        renderingStartTime: 0,
        last: r,
        tail: t,
        tailMode: i,
      })
    : ((l.isBackwards = n),
      (l.rendering = null),
      (l.renderingStartTime = 0),
      (l.last = r),
      (l.tail = t),
      (l.tailMode = i));
}
function Cp(e, n, t) {
  var r = n.pendingProps,
    i = r.revealOrder,
    l = r.tail;
  if ((ze(e, n, r.children, t), (r = se.current), r & 2))
    (r = (r & 1) | 2), (n.flags |= 128);
  else {
    if (e !== null && e.flags & 128)
      e: for (e = n.child; e !== null; ) {
        if (e.tag === 13) e.memoizedState !== null && Na(e, t, n);
        else if (e.tag === 19) Na(e, t, n);
        else if (e.child !== null) {
          (e.child.return = e), (e = e.child);
          continue;
        }
        if (e === n) break e;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === n) break e;
          e = e.return;
        }
        (e.sibling.return = e.return), (e = e.sibling);
      }
    r &= 1;
  }
  if ((te(se, r), !(n.mode & 1))) n.memoizedState = null;
  else
    switch (i) {
      case "forwards":
        for (t = n.child, i = null; t !== null; )
          (e = t.alternate),
            e !== null && Zi(e) === null && (i = t),
            (t = t.sibling);
        (t = i),
          t === null
            ? ((i = n.child), (n.child = null))
            : ((i = t.sibling), (t.sibling = null)),
          Jl(n, !1, i, t, l);
        break;
      case "backwards":
        for (t = null, i = n.child, n.child = null; i !== null; ) {
          if (((e = i.alternate), e !== null && Zi(e) === null)) {
            n.child = i;
            break;
          }
          (e = i.sibling), (i.sibling = t), (t = i), (i = e);
        }
        Jl(n, !0, t, null, l);
        break;
      case "together":
        Jl(n, !1, null, null, void 0);
        break;
      default:
        n.memoizedState = null;
    }
  return n.child;
}
function Li(e, n) {
  !(n.mode & 1) &&
    e !== null &&
    ((e.alternate = null), (n.alternate = null), (n.flags |= 2));
}
function On(e, n, t) {
  if (
    (e !== null && (n.dependencies = e.dependencies),
    (gt |= n.lanes),
    !(t & n.childLanes))
  )
    return null;
  if (e !== null && n.child !== e.child) throw Error(_(153));
  if (n.child !== null) {
    for (
      e = n.child, t = Gn(e, e.pendingProps), n.child = t, t.return = n;
      e.sibling !== null;

    )
      (e = e.sibling), (t = t.sibling = Gn(e, e.pendingProps)), (t.return = n);
    t.sibling = null;
  }
  return n.child;
}
function Hm(e, n, t) {
  switch (n.tag) {
    case 3:
      Sp(n), Yt();
      break;
    case 5:
      qf(n);
      break;
    case 1:
      je(n.type) && Ki(n);
      break;
    case 4:
      Wu(n, n.stateNode.containerInfo);
      break;
    case 10:
      var r = n.type._context,
        i = n.memoizedProps.value;
      te(qi, r._currentValue), (r._currentValue = i);
      break;
    case 13:
      if (((r = n.memoizedState), r !== null))
        return r.dehydrated !== null
          ? (te(se, se.current & 1), (n.flags |= 128), null)
          : t & n.child.childLanes
          ? Ep(e, n, t)
          : (te(se, se.current & 1),
            (e = On(e, n, t)),
            e !== null ? e.sibling : null);
      te(se, se.current & 1);
      break;
    case 19:
      if (((r = (t & n.childLanes) !== 0), e.flags & 128)) {
        if (r) return Cp(e, n, t);
        n.flags |= 128;
      }
      if (
        ((i = n.memoizedState),
        i !== null &&
          ((i.rendering = null), (i.tail = null), (i.lastEffect = null)),
        te(se, se.current),
        r)
      )
        break;
      return null;
    case 22:
    case 23:
      return (n.lanes = 0), wp(e, n, t);
  }
  return On(e, n, t);
}
var Pp, Go, _p, Np;
Pp = function (e, n) {
  for (var t = n.child; t !== null; ) {
    if (t.tag === 5 || t.tag === 6) e.appendChild(t.stateNode);
    else if (t.tag !== 4 && t.child !== null) {
      (t.child.return = t), (t = t.child);
      continue;
    }
    if (t === n) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === n) return;
      t = t.return;
    }
    (t.sibling.return = t.return), (t = t.sibling);
  }
};
Go = function () {};
_p = function (e, n, t, r) {
  var i = e.memoizedProps;
  if (i !== r) {
    (e = n.stateNode), ct(xn.current);
    var l = null;
    switch (t) {
      case "input":
        (i = ko(e, i)), (r = ko(e, r)), (l = []);
        break;
      case "select":
        (i = ce({}, i, { value: void 0 })),
          (r = ce({}, r, { value: void 0 })),
          (l = []);
        break;
      case "textarea":
        (i = So(e, i)), (r = So(e, r)), (l = []);
        break;
      default:
        typeof i.onClick != "function" &&
          typeof r.onClick == "function" &&
          (e.onclick = Qi);
    }
    Co(t, r);
    var o;
    t = null;
    for (a in i)
      if (!r.hasOwnProperty(a) && i.hasOwnProperty(a) && i[a] != null)
        if (a === "style") {
          var u = i[a];
          for (o in u) u.hasOwnProperty(o) && (t || (t = {}), (t[o] = ""));
        } else
          a !== "dangerouslySetInnerHTML" &&
            a !== "children" &&
            a !== "suppressContentEditableWarning" &&
            a !== "suppressHydrationWarning" &&
            a !== "autoFocus" &&
            (Lr.hasOwnProperty(a)
              ? l || (l = [])
              : (l = l || []).push(a, null));
    for (a in r) {
      var s = r[a];
      if (
        ((u = i != null ? i[a] : void 0),
        r.hasOwnProperty(a) && s !== u && (s != null || u != null))
      )
        if (a === "style")
          if (u) {
            for (o in u)
              !u.hasOwnProperty(o) ||
                (s && s.hasOwnProperty(o)) ||
                (t || (t = {}), (t[o] = ""));
            for (o in s)
              s.hasOwnProperty(o) &&
                u[o] !== s[o] &&
                (t || (t = {}), (t[o] = s[o]));
          } else t || (l || (l = []), l.push(a, t)), (t = s);
        else
          a === "dangerouslySetInnerHTML"
            ? ((s = s ? s.__html : void 0),
              (u = u ? u.__html : void 0),
              s != null && u !== s && (l = l || []).push(a, s))
            : a === "children"
            ? (typeof s != "string" && typeof s != "number") ||
              (l = l || []).push(a, "" + s)
            : a !== "suppressContentEditableWarning" &&
              a !== "suppressHydrationWarning" &&
              (Lr.hasOwnProperty(a)
                ? (s != null && a === "onScroll" && le("scroll", e),
                  l || u === s || (l = []))
                : (l = l || []).push(a, s));
    }
    t && (l = l || []).push("style", t);
    var a = l;
    (n.updateQueue = a) && (n.flags |= 4);
  }
};
Np = function (e, n, t, r) {
  t !== r && (n.flags |= 4);
};
function pr(e, n) {
  if (!ue)
    switch (e.tailMode) {
      case "hidden":
        n = e.tail;
        for (var t = null; n !== null; )
          n.alternate !== null && (t = n), (n = n.sibling);
        t === null ? (e.tail = null) : (t.sibling = null);
        break;
      case "collapsed":
        t = e.tail;
        for (var r = null; t !== null; )
          t.alternate !== null && (r = t), (t = t.sibling);
        r === null
          ? n || e.tail === null
            ? (e.tail = null)
            : (e.tail.sibling = null)
          : (r.sibling = null);
    }
}
function _e(e) {
  var n = e.alternate !== null && e.alternate.child === e.child,
    t = 0,
    r = 0;
  if (n)
    for (var i = e.child; i !== null; )
      (t |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags & 14680064),
        (r |= i.flags & 14680064),
        (i.return = e),
        (i = i.sibling);
  else
    for (i = e.child; i !== null; )
      (t |= i.lanes | i.childLanes),
        (r |= i.subtreeFlags),
        (r |= i.flags),
        (i.return = e),
        (i = i.sibling);
  return (e.subtreeFlags |= r), (e.childLanes = t), n;
}
function $m(e, n, t) {
  var r = n.pendingProps;
  switch ((Fu(n), n.tag)) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return _e(n), null;
    case 1:
      return je(n.type) && bi(), _e(n), null;
    case 3:
      return (
        (r = n.stateNode),
        qt(),
        oe(Fe),
        oe(Ie),
        bu(),
        r.pendingContext &&
          ((r.context = r.pendingContext), (r.pendingContext = null)),
        (e === null || e.child === null) &&
          (hi(n)
            ? (n.flags |= 4)
            : e === null ||
              (e.memoizedState.isDehydrated && !(n.flags & 256)) ||
              ((n.flags |= 1024), cn !== null && (lu(cn), (cn = null)))),
        Go(e, n),
        _e(n),
        null
      );
    case 5:
      Qu(n);
      var i = ct($r.current);
      if (((t = n.type), e !== null && n.stateNode != null))
        _p(e, n, t, r, i),
          e.ref !== n.ref && ((n.flags |= 512), (n.flags |= 2097152));
      else {
        if (!r) {
          if (n.stateNode === null) throw Error(_(166));
          return _e(n), null;
        }
        if (((e = ct(xn.current)), hi(n))) {
          (r = n.stateNode), (t = n.type);
          var l = n.memoizedProps;
          switch (((r[vn] = n), (r[Vr] = l), (e = (n.mode & 1) !== 0), t)) {
            case "dialog":
              le("cancel", r), le("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              le("load", r);
              break;
            case "video":
            case "audio":
              for (i = 0; i < kr.length; i++) le(kr[i], r);
              break;
            case "source":
              le("error", r);
              break;
            case "img":
            case "image":
            case "link":
              le("error", r), le("load", r);
              break;
            case "details":
              le("toggle", r);
              break;
            case "input":
              Ms(r, l), le("invalid", r);
              break;
            case "select":
              (r._wrapperState = { wasMultiple: !!l.multiple }),
                le("invalid", r);
              break;
            case "textarea":
              js(r, l), le("invalid", r);
          }
          Co(t, l), (i = null);
          for (var o in l)
            if (l.hasOwnProperty(o)) {
              var u = l[o];
              o === "children"
                ? typeof u == "string"
                  ? r.textContent !== u &&
                    (l.suppressHydrationWarning !== !0 &&
                      di(r.textContent, u, e),
                    (i = ["children", u]))
                  : typeof u == "number" &&
                    r.textContent !== "" + u &&
                    (l.suppressHydrationWarning !== !0 &&
                      di(r.textContent, u, e),
                    (i = ["children", "" + u]))
                : Lr.hasOwnProperty(o) &&
                  u != null &&
                  o === "onScroll" &&
                  le("scroll", r);
            }
          switch (t) {
            case "input":
              li(r), Fs(r, l, !0);
              break;
            case "textarea":
              li(r), Bs(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof l.onClick == "function" && (r.onclick = Qi);
          }
          (r = i), (n.updateQueue = r), r !== null && (n.flags |= 4);
        } else {
          (o = i.nodeType === 9 ? i : i.ownerDocument),
            e === "http://www.w3.org/1999/xhtml" && (e = ef(t)),
            e === "http://www.w3.org/1999/xhtml"
              ? t === "script"
                ? ((e = o.createElement("div")),
                  (e.innerHTML = "<script></script>"),
                  (e = e.removeChild(e.firstChild)))
                : typeof r.is == "string"
                ? (e = o.createElement(t, { is: r.is }))
                : ((e = o.createElement(t)),
                  t === "select" &&
                    ((o = e),
                    r.multiple
                      ? (o.multiple = !0)
                      : r.size && (o.size = r.size)))
              : (e = o.createElementNS(e, t)),
            (e[vn] = n),
            (e[Vr] = r),
            Pp(e, n, !1, !1),
            (n.stateNode = e);
          e: {
            switch (((o = Po(t, r)), t)) {
              case "dialog":
                le("cancel", e), le("close", e), (i = r);
                break;
              case "iframe":
              case "object":
              case "embed":
                le("load", e), (i = r);
                break;
              case "video":
              case "audio":
                for (i = 0; i < kr.length; i++) le(kr[i], e);
                i = r;
                break;
              case "source":
                le("error", e), (i = r);
                break;
              case "img":
              case "image":
              case "link":
                le("error", e), le("load", e), (i = r);
                break;
              case "details":
                le("toggle", e), (i = r);
                break;
              case "input":
                Ms(e, r), (i = ko(e, r)), le("invalid", e);
                break;
              case "option":
                i = r;
                break;
              case "select":
                (e._wrapperState = { wasMultiple: !!r.multiple }),
                  (i = ce({}, r, { value: void 0 })),
                  le("invalid", e);
                break;
              case "textarea":
                js(e, r), (i = So(e, r)), le("invalid", e);
                break;
              default:
                i = r;
            }
            Co(t, i), (u = i);
            for (l in u)
              if (u.hasOwnProperty(l)) {
                var s = u[l];
                l === "style"
                  ? rf(e, s)
                  : l === "dangerouslySetInnerHTML"
                  ? ((s = s ? s.__html : void 0), s != null && nf(e, s))
                  : l === "children"
                  ? typeof s == "string"
                    ? (t !== "textarea" || s !== "") && Or(e, s)
                    : typeof s == "number" && Or(e, "" + s)
                  : l !== "suppressContentEditableWarning" &&
                    l !== "suppressHydrationWarning" &&
                    l !== "autoFocus" &&
                    (Lr.hasOwnProperty(l)
                      ? s != null && l === "onScroll" && le("scroll", e)
                      : s != null && Su(e, l, s, o));
              }
            switch (t) {
              case "input":
                li(e), Fs(e, r, !1);
                break;
              case "textarea":
                li(e), Bs(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + Jn(r.value));
                break;
              case "select":
                (e.multiple = !!r.multiple),
                  (l = r.value),
                  l != null
                    ? jt(e, !!r.multiple, l, !1)
                    : r.defaultValue != null &&
                      jt(e, !!r.multiple, r.defaultValue, !0);
                break;
              default:
                typeof i.onClick == "function" && (e.onclick = Qi);
            }
            switch (t) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (n.flags |= 4);
        }
        n.ref !== null && ((n.flags |= 512), (n.flags |= 2097152));
      }
      return _e(n), null;
    case 6:
      if (e && n.stateNode != null) Np(e, n, e.memoizedProps, r);
      else {
        if (typeof r != "string" && n.stateNode === null) throw Error(_(166));
        if (((t = ct($r.current)), ct(xn.current), hi(n))) {
          if (
            ((r = n.stateNode),
            (t = n.memoizedProps),
            (r[vn] = n),
            (l = r.nodeValue !== t) && ((e = be), e !== null))
          )
            switch (e.tag) {
              case 3:
                di(r.nodeValue, t, (e.mode & 1) !== 0);
                break;
              case 5:
                e.memoizedProps.suppressHydrationWarning !== !0 &&
                  di(r.nodeValue, t, (e.mode & 1) !== 0);
            }
          l && (n.flags |= 4);
        } else
          (r = (t.nodeType === 9 ? t : t.ownerDocument).createTextNode(r)),
            (r[vn] = n),
            (n.stateNode = r);
      }
      return _e(n), null;
    case 13:
      if (
        (oe(se),
        (r = n.memoizedState),
        e === null ||
          (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
      ) {
        if (ue && We !== null && n.mode & 1 && !(n.flags & 128))
          Qf(), Yt(), (n.flags |= 98560), (l = !1);
        else if (((l = hi(n)), r !== null && r.dehydrated !== null)) {
          if (e === null) {
            if (!l) throw Error(_(318));
            if (
              ((l = n.memoizedState),
              (l = l !== null ? l.dehydrated : null),
              !l)
            )
              throw Error(_(317));
            l[vn] = n;
          } else
            Yt(), !(n.flags & 128) && (n.memoizedState = null), (n.flags |= 4);
          _e(n), (l = !1);
        } else cn !== null && (lu(cn), (cn = null)), (l = !0);
        if (!l) return n.flags & 65536 ? n : null;
      }
      return n.flags & 128
        ? ((n.lanes = t), n)
        : ((r = r !== null),
          r !== (e !== null && e.memoizedState !== null) &&
            r &&
            ((n.child.flags |= 8192),
            n.mode & 1 &&
              (e === null || se.current & 1 ? ve === 0 && (ve = 3) : is())),
          n.updateQueue !== null && (n.flags |= 4),
          _e(n),
          null);
    case 4:
      return (
        qt(), Go(e, n), e === null && Br(n.stateNode.containerInfo), _e(n), null
      );
    case 10:
      return Vu(n.type._context), _e(n), null;
    case 17:
      return je(n.type) && bi(), _e(n), null;
    case 19:
      if ((oe(se), (l = n.memoizedState), l === null)) return _e(n), null;
      if (((r = (n.flags & 128) !== 0), (o = l.rendering), o === null))
        if (r) pr(l, !1);
        else {
          if (ve !== 0 || (e !== null && e.flags & 128))
            for (e = n.child; e !== null; ) {
              if (((o = Zi(e)), o !== null)) {
                for (
                  n.flags |= 128,
                    pr(l, !1),
                    r = o.updateQueue,
                    r !== null && ((n.updateQueue = r), (n.flags |= 4)),
                    n.subtreeFlags = 0,
                    r = t,
                    t = n.child;
                  t !== null;

                )
                  (l = t),
                    (e = r),
                    (l.flags &= 14680066),
                    (o = l.alternate),
                    o === null
                      ? ((l.childLanes = 0),
                        (l.lanes = e),
                        (l.child = null),
                        (l.subtreeFlags = 0),
                        (l.memoizedProps = null),
                        (l.memoizedState = null),
                        (l.updateQueue = null),
                        (l.dependencies = null),
                        (l.stateNode = null))
                      : ((l.childLanes = o.childLanes),
                        (l.lanes = o.lanes),
                        (l.child = o.child),
                        (l.subtreeFlags = 0),
                        (l.deletions = null),
                        (l.memoizedProps = o.memoizedProps),
                        (l.memoizedState = o.memoizedState),
                        (l.updateQueue = o.updateQueue),
                        (l.type = o.type),
                        (e = o.dependencies),
                        (l.dependencies =
                          e === null
                            ? null
                            : {
                                lanes: e.lanes,
                                firstContext: e.firstContext,
                              })),
                    (t = t.sibling);
                return te(se, (se.current & 1) | 2), n.child;
              }
              e = e.sibling;
            }
          l.tail !== null &&
            de() > Jt &&
            ((n.flags |= 128), (r = !0), pr(l, !1), (n.lanes = 4194304));
        }
      else {
        if (!r)
          if (((e = Zi(o)), e !== null)) {
            if (
              ((n.flags |= 128),
              (r = !0),
              (t = e.updateQueue),
              t !== null && ((n.updateQueue = t), (n.flags |= 4)),
              pr(l, !0),
              l.tail === null && l.tailMode === "hidden" && !o.alternate && !ue)
            )
              return _e(n), null;
          } else
            2 * de() - l.renderingStartTime > Jt &&
              t !== 1073741824 &&
              ((n.flags |= 128), (r = !0), pr(l, !1), (n.lanes = 4194304));
        l.isBackwards
          ? ((o.sibling = n.child), (n.child = o))
          : ((t = l.last),
            t !== null ? (t.sibling = o) : (n.child = o),
            (l.last = o));
      }
      return l.tail !== null
        ? ((n = l.tail),
          (l.rendering = n),
          (l.tail = n.sibling),
          (l.renderingStartTime = de()),
          (n.sibling = null),
          (t = se.current),
          te(se, r ? (t & 1) | 2 : t & 1),
          n)
        : (_e(n), null);
    case 22:
    case 23:
      return (
        rs(),
        (r = n.memoizedState !== null),
        e !== null && (e.memoizedState !== null) !== r && (n.flags |= 8192),
        r && n.mode & 1
          ? $e & 1073741824 && (_e(n), n.subtreeFlags & 6 && (n.flags |= 8192))
          : _e(n),
        null
      );
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(_(156, n.tag));
}
function Wm(e, n) {
  switch ((Fu(n), n.tag)) {
    case 1:
      return (
        je(n.type) && bi(),
        (e = n.flags),
        e & 65536 ? ((n.flags = (e & -65537) | 128), n) : null
      );
    case 3:
      return (
        qt(),
        oe(Fe),
        oe(Ie),
        bu(),
        (e = n.flags),
        e & 65536 && !(e & 128) ? ((n.flags = (e & -65537) | 128), n) : null
      );
    case 5:
      return Qu(n), null;
    case 13:
      if (
        (oe(se), (e = n.memoizedState), e !== null && e.dehydrated !== null)
      ) {
        if (n.alternate === null) throw Error(_(340));
        Yt();
      }
      return (
        (e = n.flags), e & 65536 ? ((n.flags = (e & -65537) | 128), n) : null
      );
    case 19:
      return oe(se), null;
    case 4:
      return qt(), null;
    case 10:
      return Vu(n.type._context), null;
    case 22:
    case 23:
      return rs(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var yi = !1,
  Ne = !1,
  Qm = typeof WeakSet == "function" ? WeakSet : Set,
  R = null;
function Mt(e, n) {
  var t = e.ref;
  if (t !== null)
    if (typeof t == "function")
      try {
        t(null);
      } catch (r) {
        pe(e, n, r);
      }
    else t.current = null;
}
function Jo(e, n, t) {
  try {
    t();
  } catch (r) {
    pe(e, n, r);
  }
}
var Ia = !1;
function bm(e, n) {
  if (((Do = Hi), (e = Of()), Du(e))) {
    if ("selectionStart" in e)
      var t = { start: e.selectionStart, end: e.selectionEnd };
    else
      e: {
        t = ((t = e.ownerDocument) && t.defaultView) || window;
        var r = t.getSelection && t.getSelection();
        if (r && r.rangeCount !== 0) {
          t = r.anchorNode;
          var i = r.anchorOffset,
            l = r.focusNode;
          r = r.focusOffset;
          try {
            t.nodeType, l.nodeType;
          } catch {
            t = null;
            break e;
          }
          var o = 0,
            u = -1,
            s = -1,
            a = 0,
            c = 0,
            f = e,
            d = null;
          n: for (;;) {
            for (
              var p;
              f !== t || (i !== 0 && f.nodeType !== 3) || (u = o + i),
                f !== l || (r !== 0 && f.nodeType !== 3) || (s = o + r),
                f.nodeType === 3 && (o += f.nodeValue.length),
                (p = f.firstChild) !== null;

            )
              (d = f), (f = p);
            for (;;) {
              if (f === e) break n;
              if (
                (d === t && ++a === i && (u = o),
                d === l && ++c === r && (s = o),
                (p = f.nextSibling) !== null)
              )
                break;
              (f = d), (d = f.parentNode);
            }
            f = p;
          }
          t = u === -1 || s === -1 ? null : { start: u, end: s };
        } else t = null;
      }
    t = t || { start: 0, end: 0 };
  } else t = null;
  for (Mo = { focusedElem: e, selectionRange: t }, Hi = !1, R = n; R !== null; )
    if (((n = R), (e = n.child), (n.subtreeFlags & 1028) !== 0 && e !== null))
      (e.return = n), (R = e);
    else
      for (; R !== null; ) {
        n = R;
        try {
          var k = n.alternate;
          if (n.flags & 1024)
            switch (n.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (k !== null) {
                  var w = k.memoizedProps,
                    T = k.memoizedState,
                    h = n.stateNode,
                    m = h.getSnapshotBeforeUpdate(
                      n.elementType === n.type ? w : sn(n.type, w),
                      T
                    );
                  h.__reactInternalSnapshotBeforeUpdate = m;
                }
                break;
              case 3:
                var y = n.stateNode.containerInfo;
                y.nodeType === 1
                  ? (y.textContent = "")
                  : y.nodeType === 9 &&
                    y.documentElement &&
                    y.removeChild(y.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(_(163));
            }
        } catch (S) {
          pe(n, n.return, S);
        }
        if (((e = n.sibling), e !== null)) {
          (e.return = n.return), (R = e);
          break;
        }
        R = n.return;
      }
  return (k = Ia), (Ia = !1), k;
}
function _r(e, n, t) {
  var r = n.updateQueue;
  if (((r = r !== null ? r.lastEffect : null), r !== null)) {
    var i = (r = r.next);
    do {
      if ((i.tag & e) === e) {
        var l = i.destroy;
        (i.destroy = void 0), l !== void 0 && Jo(n, t, l);
      }
      i = i.next;
    } while (i !== r);
  }
}
function kl(e, n) {
  if (
    ((n = n.updateQueue), (n = n !== null ? n.lastEffect : null), n !== null)
  ) {
    var t = (n = n.next);
    do {
      if ((t.tag & e) === e) {
        var r = t.create;
        t.destroy = r();
      }
      t = t.next;
    } while (t !== n);
  }
}
function Zo(e) {
  var n = e.ref;
  if (n !== null) {
    var t = e.stateNode;
    switch (e.tag) {
      case 5:
        e = t;
        break;
      default:
        e = t;
    }
    typeof n == "function" ? n(e) : (n.current = e);
  }
}
function Ip(e) {
  var n = e.alternate;
  n !== null && ((e.alternate = null), Ip(n)),
    (e.child = null),
    (e.deletions = null),
    (e.sibling = null),
    e.tag === 5 &&
      ((n = e.stateNode),
      n !== null &&
        (delete n[vn], delete n[Vr], delete n[Bo], delete n[Im], delete n[Tm])),
    (e.stateNode = null),
    (e.return = null),
    (e.dependencies = null),
    (e.memoizedProps = null),
    (e.memoizedState = null),
    (e.pendingProps = null),
    (e.stateNode = null),
    (e.updateQueue = null);
}
function Tp(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function Ta(e) {
  e: for (;;) {
    for (; e.sibling === null; ) {
      if (e.return === null || Tp(e.return)) return null;
      e = e.return;
    }
    for (
      e.sibling.return = e.return, e = e.sibling;
      e.tag !== 5 && e.tag !== 6 && e.tag !== 18;

    ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      (e.child.return = e), (e = e.child);
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function eu(e, n, t) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode),
      n
        ? t.nodeType === 8
          ? t.parentNode.insertBefore(e, n)
          : t.insertBefore(e, n)
        : (t.nodeType === 8
            ? ((n = t.parentNode), n.insertBefore(e, t))
            : ((n = t), n.appendChild(e)),
          (t = t._reactRootContainer),
          t != null || n.onclick !== null || (n.onclick = Qi));
  else if (r !== 4 && ((e = e.child), e !== null))
    for (eu(e, n, t), e = e.sibling; e !== null; ) eu(e, n, t), (e = e.sibling);
}
function nu(e, n, t) {
  var r = e.tag;
  if (r === 5 || r === 6)
    (e = e.stateNode), n ? t.insertBefore(e, n) : t.appendChild(e);
  else if (r !== 4 && ((e = e.child), e !== null))
    for (nu(e, n, t), e = e.sibling; e !== null; ) nu(e, n, t), (e = e.sibling);
}
var Se = null,
  an = !1;
function Mn(e, n, t) {
  for (t = t.child; t !== null; ) zp(e, n, t), (t = t.sibling);
}
function zp(e, n, t) {
  if (wn && typeof wn.onCommitFiberUnmount == "function")
    try {
      wn.onCommitFiberUnmount(fl, t);
    } catch {}
  switch (t.tag) {
    case 5:
      Ne || Mt(t, n);
    case 6:
      var r = Se,
        i = an;
      (Se = null),
        Mn(e, n, t),
        (Se = r),
        (an = i),
        Se !== null &&
          (an
            ? ((e = Se),
              (t = t.stateNode),
              e.nodeType === 8 ? e.parentNode.removeChild(t) : e.removeChild(t))
            : Se.removeChild(t.stateNode));
      break;
    case 18:
      Se !== null &&
        (an
          ? ((e = Se),
            (t = t.stateNode),
            e.nodeType === 8
              ? Ql(e.parentNode, t)
              : e.nodeType === 1 && Ql(e, t),
            Mr(e))
          : Ql(Se, t.stateNode));
      break;
    case 4:
      (r = Se),
        (i = an),
        (Se = t.stateNode.containerInfo),
        (an = !0),
        Mn(e, n, t),
        (Se = r),
        (an = i);
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (
        !Ne &&
        ((r = t.updateQueue), r !== null && ((r = r.lastEffect), r !== null))
      ) {
        i = r = r.next;
        do {
          var l = i,
            o = l.destroy;
          (l = l.tag),
            o !== void 0 && (l & 2 || l & 4) && Jo(t, n, o),
            (i = i.next);
        } while (i !== r);
      }
      Mn(e, n, t);
      break;
    case 1:
      if (
        !Ne &&
        (Mt(t, n),
        (r = t.stateNode),
        typeof r.componentWillUnmount == "function")
      )
        try {
          (r.props = t.memoizedProps),
            (r.state = t.memoizedState),
            r.componentWillUnmount();
        } catch (u) {
          pe(t, n, u);
        }
      Mn(e, n, t);
      break;
    case 21:
      Mn(e, n, t);
      break;
    case 22:
      t.mode & 1
        ? ((Ne = (r = Ne) || t.memoizedState !== null), Mn(e, n, t), (Ne = r))
        : Mn(e, n, t);
      break;
    default:
      Mn(e, n, t);
  }
}
function za(e) {
  var n = e.updateQueue;
  if (n !== null) {
    e.updateQueue = null;
    var t = e.stateNode;
    t === null && (t = e.stateNode = new Qm()),
      n.forEach(function (r) {
        var i = ng.bind(null, e, r);
        t.has(r) || (t.add(r), r.then(i, i));
      });
  }
}
function un(e, n) {
  var t = n.deletions;
  if (t !== null)
    for (var r = 0; r < t.length; r++) {
      var i = t[r];
      try {
        var l = e,
          o = n,
          u = o;
        e: for (; u !== null; ) {
          switch (u.tag) {
            case 5:
              (Se = u.stateNode), (an = !1);
              break e;
            case 3:
              (Se = u.stateNode.containerInfo), (an = !0);
              break e;
            case 4:
              (Se = u.stateNode.containerInfo), (an = !0);
              break e;
          }
          u = u.return;
        }
        if (Se === null) throw Error(_(160));
        zp(l, o, i), (Se = null), (an = !1);
        var s = i.alternate;
        s !== null && (s.return = null), (i.return = null);
      } catch (a) {
        pe(i, n, a);
      }
    }
  if (n.subtreeFlags & 12854)
    for (n = n.child; n !== null; ) Lp(n, e), (n = n.sibling);
}
function Lp(e, n) {
  var t = e.alternate,
    r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if ((un(n, e), mn(e), r & 4)) {
        try {
          _r(3, e, e.return), kl(3, e);
        } catch (w) {
          pe(e, e.return, w);
        }
        try {
          _r(5, e, e.return);
        } catch (w) {
          pe(e, e.return, w);
        }
      }
      break;
    case 1:
      un(n, e), mn(e), r & 512 && t !== null && Mt(t, t.return);
      break;
    case 5:
      if (
        (un(n, e),
        mn(e),
        r & 512 && t !== null && Mt(t, t.return),
        e.flags & 32)
      ) {
        var i = e.stateNode;
        try {
          Or(i, "");
        } catch (w) {
          pe(e, e.return, w);
        }
      }
      if (r & 4 && ((i = e.stateNode), i != null)) {
        var l = e.memoizedProps,
          o = t !== null ? t.memoizedProps : l,
          u = e.type,
          s = e.updateQueue;
        if (((e.updateQueue = null), s !== null))
          try {
            u === "input" && l.type === "radio" && l.name != null && Jc(i, l),
              Po(u, o);
            var a = Po(u, l);
            for (o = 0; o < s.length; o += 2) {
              var c = s[o],
                f = s[o + 1];
              c === "style"
                ? rf(i, f)
                : c === "dangerouslySetInnerHTML"
                ? nf(i, f)
                : c === "children"
                ? Or(i, f)
                : Su(i, c, f, a);
            }
            switch (u) {
              case "input":
                wo(i, l);
                break;
              case "textarea":
                Zc(i, l);
                break;
              case "select":
                var d = i._wrapperState.wasMultiple;
                i._wrapperState.wasMultiple = !!l.multiple;
                var p = l.value;
                p != null
                  ? jt(i, !!l.multiple, p, !1)
                  : d !== !!l.multiple &&
                    (l.defaultValue != null
                      ? jt(i, !!l.multiple, l.defaultValue, !0)
                      : jt(i, !!l.multiple, l.multiple ? [] : "", !1));
            }
            i[Vr] = l;
          } catch (w) {
            pe(e, e.return, w);
          }
      }
      break;
    case 6:
      if ((un(n, e), mn(e), r & 4)) {
        if (e.stateNode === null) throw Error(_(162));
        (i = e.stateNode), (l = e.memoizedProps);
        try {
          i.nodeValue = l;
        } catch (w) {
          pe(e, e.return, w);
        }
      }
      break;
    case 3:
      if (
        (un(n, e), mn(e), r & 4 && t !== null && t.memoizedState.isDehydrated)
      )
        try {
          Mr(n.containerInfo);
        } catch (w) {
          pe(e, e.return, w);
        }
      break;
    case 4:
      un(n, e), mn(e);
      break;
    case 13:
      un(n, e),
        mn(e),
        (i = e.child),
        i.flags & 8192 &&
          ((l = i.memoizedState !== null),
          (i.stateNode.isHidden = l),
          !l ||
            (i.alternate !== null && i.alternate.memoizedState !== null) ||
            (ns = de())),
        r & 4 && za(e);
      break;
    case 22:
      if (
        ((c = t !== null && t.memoizedState !== null),
        e.mode & 1 ? ((Ne = (a = Ne) || c), un(n, e), (Ne = a)) : un(n, e),
        mn(e),
        r & 8192)
      ) {
        if (
          ((a = e.memoizedState !== null),
          (e.stateNode.isHidden = a) && !c && e.mode & 1)
        )
          for (R = e, c = e.child; c !== null; ) {
            for (f = R = c; R !== null; ) {
              switch (((d = R), (p = d.child), d.tag)) {
                case 0:
                case 11:
                case 14:
                case 15:
                  _r(4, d, d.return);
                  break;
                case 1:
                  Mt(d, d.return);
                  var k = d.stateNode;
                  if (typeof k.componentWillUnmount == "function") {
                    (r = d), (t = d.return);
                    try {
                      (n = r),
                        (k.props = n.memoizedProps),
                        (k.state = n.memoizedState),
                        k.componentWillUnmount();
                    } catch (w) {
                      pe(r, t, w);
                    }
                  }
                  break;
                case 5:
                  Mt(d, d.return);
                  break;
                case 22:
                  if (d.memoizedState !== null) {
                    Oa(f);
                    continue;
                  }
              }
              p !== null ? ((p.return = d), (R = p)) : Oa(f);
            }
            c = c.sibling;
          }
        e: for (c = null, f = e; ; ) {
          if (f.tag === 5) {
            if (c === null) {
              c = f;
              try {
                (i = f.stateNode),
                  a
                    ? ((l = i.style),
                      typeof l.setProperty == "function"
                        ? l.setProperty("display", "none", "important")
                        : (l.display = "none"))
                    : ((u = f.stateNode),
                      (s = f.memoizedProps.style),
                      (o =
                        s != null && s.hasOwnProperty("display")
                          ? s.display
                          : null),
                      (u.style.display = tf("display", o)));
              } catch (w) {
                pe(e, e.return, w);
              }
            }
          } else if (f.tag === 6) {
            if (c === null)
              try {
                f.stateNode.nodeValue = a ? "" : f.memoizedProps;
              } catch (w) {
                pe(e, e.return, w);
              }
          } else if (
            ((f.tag !== 22 && f.tag !== 23) ||
              f.memoizedState === null ||
              f === e) &&
            f.child !== null
          ) {
            (f.child.return = f), (f = f.child);
            continue;
          }
          if (f === e) break e;
          for (; f.sibling === null; ) {
            if (f.return === null || f.return === e) break e;
            c === f && (c = null), (f = f.return);
          }
          c === f && (c = null), (f.sibling.return = f.return), (f = f.sibling);
        }
      }
      break;
    case 19:
      un(n, e), mn(e), r & 4 && za(e);
      break;
    case 21:
      break;
    default:
      un(n, e), mn(e);
  }
}
function mn(e) {
  var n = e.flags;
  if (n & 2) {
    try {
      e: {
        for (var t = e.return; t !== null; ) {
          if (Tp(t)) {
            var r = t;
            break e;
          }
          t = t.return;
        }
        throw Error(_(160));
      }
      switch (r.tag) {
        case 5:
          var i = r.stateNode;
          r.flags & 32 && (Or(i, ""), (r.flags &= -33));
          var l = Ta(e);
          nu(e, l, i);
          break;
        case 3:
        case 4:
          var o = r.stateNode.containerInfo,
            u = Ta(e);
          eu(e, u, o);
          break;
        default:
          throw Error(_(161));
      }
    } catch (s) {
      pe(e, e.return, s);
    }
    e.flags &= -3;
  }
  n & 4096 && (e.flags &= -4097);
}
function Km(e, n, t) {
  (R = e), Op(e);
}
function Op(e, n, t) {
  for (var r = (e.mode & 1) !== 0; R !== null; ) {
    var i = R,
      l = i.child;
    if (i.tag === 22 && r) {
      var o = i.memoizedState !== null || yi;
      if (!o) {
        var u = i.alternate,
          s = (u !== null && u.memoizedState !== null) || Ne;
        u = yi;
        var a = Ne;
        if (((yi = o), (Ne = s) && !a))
          for (R = i; R !== null; )
            (o = R),
              (s = o.child),
              o.tag === 22 && o.memoizedState !== null
                ? Aa(i)
                : s !== null
                ? ((s.return = o), (R = s))
                : Aa(i);
        for (; l !== null; ) (R = l), Op(l), (l = l.sibling);
        (R = i), (yi = u), (Ne = a);
      }
      La(e);
    } else
      i.subtreeFlags & 8772 && l !== null ? ((l.return = i), (R = l)) : La(e);
  }
}
function La(e) {
  for (; R !== null; ) {
    var n = R;
    if (n.flags & 8772) {
      var t = n.alternate;
      try {
        if (n.flags & 8772)
          switch (n.tag) {
            case 0:
            case 11:
            case 15:
              Ne || kl(5, n);
              break;
            case 1:
              var r = n.stateNode;
              if (n.flags & 4 && !Ne)
                if (t === null) r.componentDidMount();
                else {
                  var i =
                    n.elementType === n.type
                      ? t.memoizedProps
                      : sn(n.type, t.memoizedProps);
                  r.componentDidUpdate(
                    i,
                    t.memoizedState,
                    r.__reactInternalSnapshotBeforeUpdate
                  );
                }
              var l = n.updateQueue;
              l !== null && ma(n, l, r);
              break;
            case 3:
              var o = n.updateQueue;
              if (o !== null) {
                if (((t = null), n.child !== null))
                  switch (n.child.tag) {
                    case 5:
                      t = n.child.stateNode;
                      break;
                    case 1:
                      t = n.child.stateNode;
                  }
                ma(n, o, t);
              }
              break;
            case 5:
              var u = n.stateNode;
              if (t === null && n.flags & 4) {
                t = u;
                var s = n.memoizedProps;
                switch (n.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    s.autoFocus && t.focus();
                    break;
                  case "img":
                    s.src && (t.src = s.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (n.memoizedState === null) {
                var a = n.alternate;
                if (a !== null) {
                  var c = a.memoizedState;
                  if (c !== null) {
                    var f = c.dehydrated;
                    f !== null && Mr(f);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(_(163));
          }
        Ne || (n.flags & 512 && Zo(n));
      } catch (d) {
        pe(n, n.return, d);
      }
    }
    if (n === e) {
      R = null;
      break;
    }
    if (((t = n.sibling), t !== null)) {
      (t.return = n.return), (R = t);
      break;
    }
    R = n.return;
  }
}
function Oa(e) {
  for (; R !== null; ) {
    var n = R;
    if (n === e) {
      R = null;
      break;
    }
    var t = n.sibling;
    if (t !== null) {
      (t.return = n.return), (R = t);
      break;
    }
    R = n.return;
  }
}
function Aa(e) {
  for (; R !== null; ) {
    var n = R;
    try {
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          var t = n.return;
          try {
            kl(4, n);
          } catch (s) {
            pe(n, t, s);
          }
          break;
        case 1:
          var r = n.stateNode;
          if (typeof r.componentDidMount == "function") {
            var i = n.return;
            try {
              r.componentDidMount();
            } catch (s) {
              pe(n, i, s);
            }
          }
          var l = n.return;
          try {
            Zo(n);
          } catch (s) {
            pe(n, l, s);
          }
          break;
        case 5:
          var o = n.return;
          try {
            Zo(n);
          } catch (s) {
            pe(n, o, s);
          }
      }
    } catch (s) {
      pe(n, n.return, s);
    }
    if (n === e) {
      R = null;
      break;
    }
    var u = n.sibling;
    if (u !== null) {
      (u.return = n.return), (R = u);
      break;
    }
    R = n.return;
  }
}
var Ym = Math.ceil,
  tl = Rn.ReactCurrentDispatcher,
  Zu = Rn.ReactCurrentOwner,
  en = Rn.ReactCurrentBatchConfig,
  Y = 0,
  we = null,
  me = null,
  Ee = 0,
  $e = 0,
  Ft = nt(0),
  ve = 0,
  Kr = null,
  gt = 0,
  wl = 0,
  es = 0,
  Nr = null,
  De = null,
  ns = 0,
  Jt = 1 / 0,
  Cn = null,
  rl = !1,
  tu = null,
  Xn = null,
  vi = !1,
  $n = null,
  il = 0,
  Ir = 0,
  ru = null,
  Oi = -1,
  Ai = 0;
function Le() {
  return Y & 6 ? de() : Oi !== -1 ? Oi : (Oi = de());
}
function qn(e) {
  return e.mode & 1
    ? Y & 2 && Ee !== 0
      ? Ee & -Ee
      : Lm.transition !== null
      ? (Ai === 0 && (Ai = gf()), Ai)
      : ((e = G),
        e !== 0 || ((e = window.event), (e = e === void 0 ? 16 : Ef(e.type))),
        e)
    : 1;
}
function pn(e, n, t, r) {
  if (50 < Ir) throw ((Ir = 0), (ru = null), Error(_(185)));
  qr(e, t, r),
    (!(Y & 2) || e !== we) &&
      (e === we && (!(Y & 2) && (wl |= t), ve === 4 && Vn(e, Ee)),
      Be(e, r),
      t === 1 && Y === 0 && !(n.mode & 1) && ((Jt = de() + 500), gl && tt()));
}
function Be(e, n) {
  var t = e.callbackNode;
  Lh(e, n);
  var r = Vi(e, e === we ? Ee : 0);
  if (r === 0)
    t !== null && Hs(t), (e.callbackNode = null), (e.callbackPriority = 0);
  else if (((n = r & -r), e.callbackPriority !== n)) {
    if ((t != null && Hs(t), n === 1))
      e.tag === 0 ? zm(Ra.bind(null, e)) : Hf(Ra.bind(null, e)),
        _m(function () {
          !(Y & 6) && tt();
        }),
        (t = null);
    else {
      switch (yf(r)) {
        case 1:
          t = Nu;
          break;
        case 4:
          t = hf;
          break;
        case 16:
          t = Ui;
          break;
        case 536870912:
          t = mf;
          break;
        default:
          t = Ui;
      }
      t = Up(t, Ap.bind(null, e));
    }
    (e.callbackPriority = n), (e.callbackNode = t);
  }
}
function Ap(e, n) {
  if (((Oi = -1), (Ai = 0), Y & 6)) throw Error(_(327));
  var t = e.callbackNode;
  if ($t() && e.callbackNode !== t) return null;
  var r = Vi(e, e === we ? Ee : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || n) n = ll(e, r);
  else {
    n = r;
    var i = Y;
    Y |= 2;
    var l = Dp();
    (we !== e || Ee !== n) && ((Cn = null), (Jt = de() + 500), ft(e, n));
    do
      try {
        Gm();
        break;
      } catch (u) {
        Rp(e, u);
      }
    while (1);
    Uu(),
      (tl.current = l),
      (Y = i),
      me !== null ? (n = 0) : ((we = null), (Ee = 0), (n = ve));
  }
  if (n !== 0) {
    if (
      (n === 2 && ((i = zo(e)), i !== 0 && ((r = i), (n = iu(e, i)))), n === 1)
    )
      throw ((t = Kr), ft(e, 0), Vn(e, r), Be(e, de()), t);
    if (n === 6) Vn(e, r);
    else {
      if (
        ((i = e.current.alternate),
        !(r & 30) &&
          !Xm(i) &&
          ((n = ll(e, r)),
          n === 2 && ((l = zo(e)), l !== 0 && ((r = l), (n = iu(e, l)))),
          n === 1))
      )
        throw ((t = Kr), ft(e, 0), Vn(e, r), Be(e, de()), t);
      switch (((e.finishedWork = i), (e.finishedLanes = r), n)) {
        case 0:
        case 1:
          throw Error(_(345));
        case 2:
          ot(e, De, Cn);
          break;
        case 3:
          if (
            (Vn(e, r), (r & 130023424) === r && ((n = ns + 500 - de()), 10 < n))
          ) {
            if (Vi(e, 0) !== 0) break;
            if (((i = e.suspendedLanes), (i & r) !== r)) {
              Le(), (e.pingedLanes |= e.suspendedLanes & i);
              break;
            }
            e.timeoutHandle = jo(ot.bind(null, e, De, Cn), n);
            break;
          }
          ot(e, De, Cn);
          break;
        case 4:
          if ((Vn(e, r), (r & 4194240) === r)) break;
          for (n = e.eventTimes, i = -1; 0 < r; ) {
            var o = 31 - fn(r);
            (l = 1 << o), (o = n[o]), o > i && (i = o), (r &= ~l);
          }
          if (
            ((r = i),
            (r = de() - r),
            (r =
              (120 > r
                ? 120
                : 480 > r
                ? 480
                : 1080 > r
                ? 1080
                : 1920 > r
                ? 1920
                : 3e3 > r
                ? 3e3
                : 4320 > r
                ? 4320
                : 1960 * Ym(r / 1960)) - r),
            10 < r)
          ) {
            e.timeoutHandle = jo(ot.bind(null, e, De, Cn), r);
            break;
          }
          ot(e, De, Cn);
          break;
        case 5:
          ot(e, De, Cn);
          break;
        default:
          throw Error(_(329));
      }
    }
  }
  return Be(e, de()), e.callbackNode === t ? Ap.bind(null, e) : null;
}
function iu(e, n) {
  var t = Nr;
  return (
    e.current.memoizedState.isDehydrated && (ft(e, n).flags |= 256),
    (e = ll(e, n)),
    e !== 2 && ((n = De), (De = t), n !== null && lu(n)),
    e
  );
}
function lu(e) {
  De === null ? (De = e) : De.push.apply(De, e);
}
function Xm(e) {
  for (var n = e; ; ) {
    if (n.flags & 16384) {
      var t = n.updateQueue;
      if (t !== null && ((t = t.stores), t !== null))
        for (var r = 0; r < t.length; r++) {
          var i = t[r],
            l = i.getSnapshot;
          i = i.value;
          try {
            if (!dn(l(), i)) return !1;
          } catch {
            return !1;
          }
        }
    }
    if (((t = n.child), n.subtreeFlags & 16384 && t !== null))
      (t.return = n), (n = t);
    else {
      if (n === e) break;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === e) return !0;
        n = n.return;
      }
      (n.sibling.return = n.return), (n = n.sibling);
    }
  }
  return !0;
}
function Vn(e, n) {
  for (
    n &= ~es,
      n &= ~wl,
      e.suspendedLanes |= n,
      e.pingedLanes &= ~n,
      e = e.expirationTimes;
    0 < n;

  ) {
    var t = 31 - fn(n),
      r = 1 << t;
    (e[t] = -1), (n &= ~r);
  }
}
function Ra(e) {
  if (Y & 6) throw Error(_(327));
  $t();
  var n = Vi(e, 0);
  if (!(n & 1)) return Be(e, de()), null;
  var t = ll(e, n);
  if (e.tag !== 0 && t === 2) {
    var r = zo(e);
    r !== 0 && ((n = r), (t = iu(e, r)));
  }
  if (t === 1) throw ((t = Kr), ft(e, 0), Vn(e, n), Be(e, de()), t);
  if (t === 6) throw Error(_(345));
  return (
    (e.finishedWork = e.current.alternate),
    (e.finishedLanes = n),
    ot(e, De, Cn),
    Be(e, de()),
    null
  );
}
function ts(e, n) {
  var t = Y;
  Y |= 1;
  try {
    return e(n);
  } finally {
    (Y = t), Y === 0 && ((Jt = de() + 500), gl && tt());
  }
}
function yt(e) {
  $n !== null && $n.tag === 0 && !(Y & 6) && $t();
  var n = Y;
  Y |= 1;
  var t = en.transition,
    r = G;
  try {
    if (((en.transition = null), (G = 1), e)) return e();
  } finally {
    (G = r), (en.transition = t), (Y = n), !(Y & 6) && tt();
  }
}
function rs() {
  ($e = Ft.current), oe(Ft);
}
function ft(e, n) {
  (e.finishedWork = null), (e.finishedLanes = 0);
  var t = e.timeoutHandle;
  if ((t !== -1 && ((e.timeoutHandle = -1), Pm(t)), me !== null))
    for (t = me.return; t !== null; ) {
      var r = t;
      switch ((Fu(r), r.tag)) {
        case 1:
          (r = r.type.childContextTypes), r != null && bi();
          break;
        case 3:
          qt(), oe(Fe), oe(Ie), bu();
          break;
        case 5:
          Qu(r);
          break;
        case 4:
          qt();
          break;
        case 13:
          oe(se);
          break;
        case 19:
          oe(se);
          break;
        case 10:
          Vu(r.type._context);
          break;
        case 22:
        case 23:
          rs();
      }
      t = t.return;
    }
  if (
    ((we = e),
    (me = e = Gn(e.current, null)),
    (Ee = $e = n),
    (ve = 0),
    (Kr = null),
    (es = wl = gt = 0),
    (De = Nr = null),
    at !== null)
  ) {
    for (n = 0; n < at.length; n++)
      if (((t = at[n]), (r = t.interleaved), r !== null)) {
        t.interleaved = null;
        var i = r.next,
          l = t.pending;
        if (l !== null) {
          var o = l.next;
          (l.next = i), (r.next = o);
        }
        t.pending = r;
      }
    at = null;
  }
  return e;
}
function Rp(e, n) {
  do {
    var t = me;
    try {
      if ((Uu(), (Ti.current = nl), el)) {
        for (var r = ae.memoizedState; r !== null; ) {
          var i = r.queue;
          i !== null && (i.pending = null), (r = r.next);
        }
        el = !1;
      }
      if (
        ((mt = 0),
        (ke = ye = ae = null),
        (Pr = !1),
        (Wr = 0),
        (Zu.current = null),
        t === null || t.return === null)
      ) {
        (ve = 1), (Kr = n), (me = null);
        break;
      }
      e: {
        var l = e,
          o = t.return,
          u = t,
          s = n;
        if (
          ((n = Ee),
          (u.flags |= 32768),
          s !== null && typeof s == "object" && typeof s.then == "function")
        ) {
          var a = s,
            c = u,
            f = c.tag;
          if (!(c.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var d = c.alternate;
            d
              ? ((c.updateQueue = d.updateQueue),
                (c.memoizedState = d.memoizedState),
                (c.lanes = d.lanes))
              : ((c.updateQueue = null), (c.memoizedState = null));
          }
          var p = xa(o);
          if (p !== null) {
            (p.flags &= -257),
              Sa(p, o, u, l, n),
              p.mode & 1 && wa(l, a, n),
              (n = p),
              (s = a);
            var k = n.updateQueue;
            if (k === null) {
              var w = new Set();
              w.add(s), (n.updateQueue = w);
            } else k.add(s);
            break e;
          } else {
            if (!(n & 1)) {
              wa(l, a, n), is();
              break e;
            }
            s = Error(_(426));
          }
        } else if (ue && u.mode & 1) {
          var T = xa(o);
          if (T !== null) {
            !(T.flags & 65536) && (T.flags |= 256),
              Sa(T, o, u, l, n),
              ju(Gt(s, u));
            break e;
          }
        }
        (l = s = Gt(s, u)),
          ve !== 4 && (ve = 2),
          Nr === null ? (Nr = [l]) : Nr.push(l),
          (l = o);
        do {
          switch (l.tag) {
            case 3:
              (l.flags |= 65536), (n &= -n), (l.lanes |= n);
              var h = yp(l, s, n);
              ha(l, h);
              break e;
            case 1:
              u = s;
              var m = l.type,
                y = l.stateNode;
              if (
                !(l.flags & 128) &&
                (typeof m.getDerivedStateFromError == "function" ||
                  (y !== null &&
                    typeof y.componentDidCatch == "function" &&
                    (Xn === null || !Xn.has(y))))
              ) {
                (l.flags |= 65536), (n &= -n), (l.lanes |= n);
                var S = vp(l, u, n);
                ha(l, S);
                break e;
              }
          }
          l = l.return;
        } while (l !== null);
      }
      Fp(t);
    } catch (C) {
      (n = C), me === t && t !== null && (me = t = t.return);
      continue;
    }
    break;
  } while (1);
}
function Dp() {
  var e = tl.current;
  return (tl.current = nl), e === null ? nl : e;
}
function is() {
  (ve === 0 || ve === 3 || ve === 2) && (ve = 4),
    we === null || (!(gt & 268435455) && !(wl & 268435455)) || Vn(we, Ee);
}
function ll(e, n) {
  var t = Y;
  Y |= 2;
  var r = Dp();
  (we !== e || Ee !== n) && ((Cn = null), ft(e, n));
  do
    try {
      qm();
      break;
    } catch (i) {
      Rp(e, i);
    }
  while (1);
  if ((Uu(), (Y = t), (tl.current = r), me !== null)) throw Error(_(261));
  return (we = null), (Ee = 0), ve;
}
function qm() {
  for (; me !== null; ) Mp(me);
}
function Gm() {
  for (; me !== null && !Sh(); ) Mp(me);
}
function Mp(e) {
  var n = Bp(e.alternate, e, $e);
  (e.memoizedProps = e.pendingProps),
    n === null ? Fp(e) : (me = n),
    (Zu.current = null);
}
function Fp(e) {
  var n = e;
  do {
    var t = n.alternate;
    if (((e = n.return), n.flags & 32768)) {
      if (((t = Wm(t, n)), t !== null)) {
        (t.flags &= 32767), (me = t);
        return;
      }
      if (e !== null)
        (e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null);
      else {
        (ve = 6), (me = null);
        return;
      }
    } else if (((t = $m(t, n, $e)), t !== null)) {
      me = t;
      return;
    }
    if (((n = n.sibling), n !== null)) {
      me = n;
      return;
    }
    me = n = e;
  } while (n !== null);
  ve === 0 && (ve = 5);
}
function ot(e, n, t) {
  var r = G,
    i = en.transition;
  try {
    (en.transition = null), (G = 1), Jm(e, n, t, r);
  } finally {
    (en.transition = i), (G = r);
  }
  return null;
}
function Jm(e, n, t, r) {
  do $t();
  while ($n !== null);
  if (Y & 6) throw Error(_(327));
  t = e.finishedWork;
  var i = e.finishedLanes;
  if (t === null) return null;
  if (((e.finishedWork = null), (e.finishedLanes = 0), t === e.current))
    throw Error(_(177));
  (e.callbackNode = null), (e.callbackPriority = 0);
  var l = t.lanes | t.childLanes;
  if (
    (Oh(e, l),
    e === we && ((me = we = null), (Ee = 0)),
    (!(t.subtreeFlags & 2064) && !(t.flags & 2064)) ||
      vi ||
      ((vi = !0),
      Up(Ui, function () {
        return $t(), null;
      })),
    (l = (t.flags & 15990) !== 0),
    t.subtreeFlags & 15990 || l)
  ) {
    (l = en.transition), (en.transition = null);
    var o = G;
    G = 1;
    var u = Y;
    (Y |= 4),
      (Zu.current = null),
      bm(e, t),
      Lp(t, e),
      vm(Mo),
      (Hi = !!Do),
      (Mo = Do = null),
      (e.current = t),
      Km(t),
      Eh(),
      (Y = u),
      (G = o),
      (en.transition = l);
  } else e.current = t;
  if (
    (vi && ((vi = !1), ($n = e), (il = i)),
    (l = e.pendingLanes),
    l === 0 && (Xn = null),
    _h(t.stateNode),
    Be(e, de()),
    n !== null)
  )
    for (r = e.onRecoverableError, t = 0; t < n.length; t++)
      (i = n[t]), r(i.value, { componentStack: i.stack, digest: i.digest });
  if (rl) throw ((rl = !1), (e = tu), (tu = null), e);
  return (
    il & 1 && e.tag !== 0 && $t(),
    (l = e.pendingLanes),
    l & 1 ? (e === ru ? Ir++ : ((Ir = 0), (ru = e))) : (Ir = 0),
    tt(),
    null
  );
}
function $t() {
  if ($n !== null) {
    var e = yf(il),
      n = en.transition,
      t = G;
    try {
      if (((en.transition = null), (G = 16 > e ? 16 : e), $n === null))
        var r = !1;
      else {
        if (((e = $n), ($n = null), (il = 0), Y & 6)) throw Error(_(331));
        var i = Y;
        for (Y |= 4, R = e.current; R !== null; ) {
          var l = R,
            o = l.child;
          if (R.flags & 16) {
            var u = l.deletions;
            if (u !== null) {
              for (var s = 0; s < u.length; s++) {
                var a = u[s];
                for (R = a; R !== null; ) {
                  var c = R;
                  switch (c.tag) {
                    case 0:
                    case 11:
                    case 15:
                      _r(8, c, l);
                  }
                  var f = c.child;
                  if (f !== null) (f.return = c), (R = f);
                  else
                    for (; R !== null; ) {
                      c = R;
                      var d = c.sibling,
                        p = c.return;
                      if ((Ip(c), c === a)) {
                        R = null;
                        break;
                      }
                      if (d !== null) {
                        (d.return = p), (R = d);
                        break;
                      }
                      R = p;
                    }
                }
              }
              var k = l.alternate;
              if (k !== null) {
                var w = k.child;
                if (w !== null) {
                  k.child = null;
                  do {
                    var T = w.sibling;
                    (w.sibling = null), (w = T);
                  } while (w !== null);
                }
              }
              R = l;
            }
          }
          if (l.subtreeFlags & 2064 && o !== null) (o.return = l), (R = o);
          else
            e: for (; R !== null; ) {
              if (((l = R), l.flags & 2048))
                switch (l.tag) {
                  case 0:
                  case 11:
                  case 15:
                    _r(9, l, l.return);
                }
              var h = l.sibling;
              if (h !== null) {
                (h.return = l.return), (R = h);
                break e;
              }
              R = l.return;
            }
        }
        var m = e.current;
        for (R = m; R !== null; ) {
          o = R;
          var y = o.child;
          if (o.subtreeFlags & 2064 && y !== null) (y.return = o), (R = y);
          else
            e: for (o = m; R !== null; ) {
              if (((u = R), u.flags & 2048))
                try {
                  switch (u.tag) {
                    case 0:
                    case 11:
                    case 15:
                      kl(9, u);
                  }
                } catch (C) {
                  pe(u, u.return, C);
                }
              if (u === o) {
                R = null;
                break e;
              }
              var S = u.sibling;
              if (S !== null) {
                (S.return = u.return), (R = S);
                break e;
              }
              R = u.return;
            }
        }
        if (
          ((Y = i), tt(), wn && typeof wn.onPostCommitFiberRoot == "function")
        )
          try {
            wn.onPostCommitFiberRoot(fl, e);
          } catch {}
        r = !0;
      }
      return r;
    } finally {
      (G = t), (en.transition = n);
    }
  }
  return !1;
}
function Da(e, n, t) {
  (n = Gt(t, n)),
    (n = yp(e, n, 1)),
    (e = Yn(e, n, 1)),
    (n = Le()),
    e !== null && (qr(e, 1, n), Be(e, n));
}
function pe(e, n, t) {
  if (e.tag === 3) Da(e, e, t);
  else
    for (; n !== null; ) {
      if (n.tag === 3) {
        Da(n, e, t);
        break;
      } else if (n.tag === 1) {
        var r = n.stateNode;
        if (
          typeof n.type.getDerivedStateFromError == "function" ||
          (typeof r.componentDidCatch == "function" &&
            (Xn === null || !Xn.has(r)))
        ) {
          (e = Gt(t, e)),
            (e = vp(n, e, 1)),
            (n = Yn(n, e, 1)),
            (e = Le()),
            n !== null && (qr(n, 1, e), Be(n, e));
          break;
        }
      }
      n = n.return;
    }
}
function Zm(e, n, t) {
  var r = e.pingCache;
  r !== null && r.delete(n),
    (n = Le()),
    (e.pingedLanes |= e.suspendedLanes & t),
    we === e &&
      (Ee & t) === t &&
      (ve === 4 || (ve === 3 && (Ee & 130023424) === Ee && 500 > de() - ns)
        ? ft(e, 0)
        : (es |= t)),
    Be(e, n);
}
function jp(e, n) {
  n === 0 &&
    (e.mode & 1
      ? ((n = si), (si <<= 1), !(si & 130023424) && (si = 4194304))
      : (n = 1));
  var t = Le();
  (e = Ln(e, n)), e !== null && (qr(e, n, t), Be(e, t));
}
function eg(e) {
  var n = e.memoizedState,
    t = 0;
  n !== null && (t = n.retryLane), jp(e, t);
}
function ng(e, n) {
  var t = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode,
        i = e.memoizedState;
      i !== null && (t = i.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(_(314));
  }
  r !== null && r.delete(n), jp(e, t);
}
var Bp;
Bp = function (e, n, t) {
  if (e !== null)
    if (e.memoizedProps !== n.pendingProps || Fe.current) Me = !0;
    else {
      if (!(e.lanes & t) && !(n.flags & 128)) return (Me = !1), Hm(e, n, t);
      Me = !!(e.flags & 131072);
    }
  else (Me = !1), ue && n.flags & 1048576 && $f(n, Xi, n.index);
  switch (((n.lanes = 0), n.tag)) {
    case 2:
      var r = n.type;
      Li(e, n), (e = n.pendingProps);
      var i = Kt(n, Ie.current);
      Ht(n, t), (i = Yu(null, n, r, e, i, t));
      var l = Xu();
      return (
        (n.flags |= 1),
        typeof i == "object" &&
        i !== null &&
        typeof i.render == "function" &&
        i.$$typeof === void 0
          ? ((n.tag = 1),
            (n.memoizedState = null),
            (n.updateQueue = null),
            je(r) ? ((l = !0), Ki(n)) : (l = !1),
            (n.memoizedState =
              i.state !== null && i.state !== void 0 ? i.state : null),
            $u(n),
            (i.updater = vl),
            (n.stateNode = i),
            (i._reactInternals = n),
            Qo(n, r, e, t),
            (n = Yo(null, n, r, !0, l, t)))
          : ((n.tag = 0), ue && l && Mu(n), ze(null, n, i, t), (n = n.child)),
        n
      );
    case 16:
      r = n.elementType;
      e: {
        switch (
          (Li(e, n),
          (e = n.pendingProps),
          (i = r._init),
          (r = i(r._payload)),
          (n.type = r),
          (i = n.tag = rg(r)),
          (e = sn(r, e)),
          i)
        ) {
          case 0:
            n = Ko(null, n, r, e, t);
            break e;
          case 1:
            n = Pa(null, n, r, e, t);
            break e;
          case 11:
            n = Ea(null, n, r, e, t);
            break e;
          case 14:
            n = Ca(null, n, r, sn(r.type, e), t);
            break e;
        }
        throw Error(_(306, r, ""));
      }
      return n;
    case 0:
      return (
        (r = n.type),
        (i = n.pendingProps),
        (i = n.elementType === r ? i : sn(r, i)),
        Ko(e, n, r, i, t)
      );
    case 1:
      return (
        (r = n.type),
        (i = n.pendingProps),
        (i = n.elementType === r ? i : sn(r, i)),
        Pa(e, n, r, i, t)
      );
    case 3:
      e: {
        if ((Sp(n), e === null)) throw Error(_(387));
        (r = n.pendingProps),
          (l = n.memoizedState),
          (i = l.element),
          Xf(e, n),
          Ji(n, r, null, t);
        var o = n.memoizedState;
        if (((r = o.element), l.isDehydrated))
          if (
            ((l = {
              element: r,
              isDehydrated: !1,
              cache: o.cache,
              pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
              transitions: o.transitions,
            }),
            (n.updateQueue.baseState = l),
            (n.memoizedState = l),
            n.flags & 256)
          ) {
            (i = Gt(Error(_(423)), n)), (n = _a(e, n, r, t, i));
            break e;
          } else if (r !== i) {
            (i = Gt(Error(_(424)), n)), (n = _a(e, n, r, t, i));
            break e;
          } else
            for (
              We = Kn(n.stateNode.containerInfo.firstChild),
                be = n,
                ue = !0,
                cn = null,
                t = Kf(n, null, r, t),
                n.child = t;
              t;

            )
              (t.flags = (t.flags & -3) | 4096), (t = t.sibling);
        else {
          if ((Yt(), r === i)) {
            n = On(e, n, t);
            break e;
          }
          ze(e, n, r, t);
        }
        n = n.child;
      }
      return n;
    case 5:
      return (
        qf(n),
        e === null && Ho(n),
        (r = n.type),
        (i = n.pendingProps),
        (l = e !== null ? e.memoizedProps : null),
        (o = i.children),
        Fo(r, i) ? (o = null) : l !== null && Fo(r, l) && (n.flags |= 32),
        xp(e, n),
        ze(e, n, o, t),
        n.child
      );
    case 6:
      return e === null && Ho(n), null;
    case 13:
      return Ep(e, n, t);
    case 4:
      return (
        Wu(n, n.stateNode.containerInfo),
        (r = n.pendingProps),
        e === null ? (n.child = Xt(n, null, r, t)) : ze(e, n, r, t),
        n.child
      );
    case 11:
      return (
        (r = n.type),
        (i = n.pendingProps),
        (i = n.elementType === r ? i : sn(r, i)),
        Ea(e, n, r, i, t)
      );
    case 7:
      return ze(e, n, n.pendingProps, t), n.child;
    case 8:
      return ze(e, n, n.pendingProps.children, t), n.child;
    case 12:
      return ze(e, n, n.pendingProps.children, t), n.child;
    case 10:
      e: {
        if (
          ((r = n.type._context),
          (i = n.pendingProps),
          (l = n.memoizedProps),
          (o = i.value),
          te(qi, r._currentValue),
          (r._currentValue = o),
          l !== null)
        )
          if (dn(l.value, o)) {
            if (l.children === i.children && !Fe.current) {
              n = On(e, n, t);
              break e;
            }
          } else
            for (l = n.child, l !== null && (l.return = n); l !== null; ) {
              var u = l.dependencies;
              if (u !== null) {
                o = l.child;
                for (var s = u.firstContext; s !== null; ) {
                  if (s.context === r) {
                    if (l.tag === 1) {
                      (s = In(-1, t & -t)), (s.tag = 2);
                      var a = l.updateQueue;
                      if (a !== null) {
                        a = a.shared;
                        var c = a.pending;
                        c === null
                          ? (s.next = s)
                          : ((s.next = c.next), (c.next = s)),
                          (a.pending = s);
                      }
                    }
                    (l.lanes |= t),
                      (s = l.alternate),
                      s !== null && (s.lanes |= t),
                      $o(l.return, t, n),
                      (u.lanes |= t);
                    break;
                  }
                  s = s.next;
                }
              } else if (l.tag === 10) o = l.type === n.type ? null : l.child;
              else if (l.tag === 18) {
                if (((o = l.return), o === null)) throw Error(_(341));
                (o.lanes |= t),
                  (u = o.alternate),
                  u !== null && (u.lanes |= t),
                  $o(o, t, n),
                  (o = l.sibling);
              } else o = l.child;
              if (o !== null) o.return = l;
              else
                for (o = l; o !== null; ) {
                  if (o === n) {
                    o = null;
                    break;
                  }
                  if (((l = o.sibling), l !== null)) {
                    (l.return = o.return), (o = l);
                    break;
                  }
                  o = o.return;
                }
              l = o;
            }
        ze(e, n, i.children, t), (n = n.child);
      }
      return n;
    case 9:
      return (
        (i = n.type),
        (r = n.pendingProps.children),
        Ht(n, t),
        (i = nn(i)),
        (r = r(i)),
        (n.flags |= 1),
        ze(e, n, r, t),
        n.child
      );
    case 14:
      return (
        (r = n.type),
        (i = sn(r, n.pendingProps)),
        (i = sn(r.type, i)),
        Ca(e, n, r, i, t)
      );
    case 15:
      return kp(e, n, n.type, n.pendingProps, t);
    case 17:
      return (
        (r = n.type),
        (i = n.pendingProps),
        (i = n.elementType === r ? i : sn(r, i)),
        Li(e, n),
        (n.tag = 1),
        je(r) ? ((e = !0), Ki(n)) : (e = !1),
        Ht(n, t),
        gp(n, r, i),
        Qo(n, r, i, t),
        Yo(null, n, r, !0, e, t)
      );
    case 19:
      return Cp(e, n, t);
    case 22:
      return wp(e, n, t);
  }
  throw Error(_(156, n.tag));
};
function Up(e, n) {
  return df(e, n);
}
function tg(e, n, t, r) {
  (this.tag = e),
    (this.key = t),
    (this.sibling =
      this.child =
      this.return =
      this.stateNode =
      this.type =
      this.elementType =
        null),
    (this.index = 0),
    (this.ref = null),
    (this.pendingProps = n),
    (this.dependencies =
      this.memoizedState =
      this.updateQueue =
      this.memoizedProps =
        null),
    (this.mode = r),
    (this.subtreeFlags = this.flags = 0),
    (this.deletions = null),
    (this.childLanes = this.lanes = 0),
    (this.alternate = null);
}
function Ze(e, n, t, r) {
  return new tg(e, n, t, r);
}
function ls(e) {
  return (e = e.prototype), !(!e || !e.isReactComponent);
}
function rg(e) {
  if (typeof e == "function") return ls(e) ? 1 : 0;
  if (e != null) {
    if (((e = e.$$typeof), e === Cu)) return 11;
    if (e === Pu) return 14;
  }
  return 2;
}
function Gn(e, n) {
  var t = e.alternate;
  return (
    t === null
      ? ((t = Ze(e.tag, n, e.key, e.mode)),
        (t.elementType = e.elementType),
        (t.type = e.type),
        (t.stateNode = e.stateNode),
        (t.alternate = e),
        (e.alternate = t))
      : ((t.pendingProps = n),
        (t.type = e.type),
        (t.flags = 0),
        (t.subtreeFlags = 0),
        (t.deletions = null)),
    (t.flags = e.flags & 14680064),
    (t.childLanes = e.childLanes),
    (t.lanes = e.lanes),
    (t.child = e.child),
    (t.memoizedProps = e.memoizedProps),
    (t.memoizedState = e.memoizedState),
    (t.updateQueue = e.updateQueue),
    (n = e.dependencies),
    (t.dependencies =
      n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }),
    (t.sibling = e.sibling),
    (t.index = e.index),
    (t.ref = e.ref),
    t
  );
}
function Ri(e, n, t, r, i, l) {
  var o = 2;
  if (((r = e), typeof e == "function")) ls(e) && (o = 1);
  else if (typeof e == "string") o = 5;
  else
    e: switch (e) {
      case Nt:
        return pt(t.children, i, l, n);
      case Eu:
        (o = 8), (i |= 8);
        break;
      case mo:
        return (
          (e = Ze(12, t, n, i | 2)), (e.elementType = mo), (e.lanes = l), e
        );
      case go:
        return (e = Ze(13, t, n, i)), (e.elementType = go), (e.lanes = l), e;
      case yo:
        return (e = Ze(19, t, n, i)), (e.elementType = yo), (e.lanes = l), e;
      case Xc:
        return xl(t, i, l, n);
      default:
        if (typeof e == "object" && e !== null)
          switch (e.$$typeof) {
            case Kc:
              o = 10;
              break e;
            case Yc:
              o = 9;
              break e;
            case Cu:
              o = 11;
              break e;
            case Pu:
              o = 14;
              break e;
            case jn:
              (o = 16), (r = null);
              break e;
          }
        throw Error(_(130, e == null ? e : typeof e, ""));
    }
  return (
    (n = Ze(o, t, n, i)), (n.elementType = e), (n.type = r), (n.lanes = l), n
  );
}
function pt(e, n, t, r) {
  return (e = Ze(7, e, r, n)), (e.lanes = t), e;
}
function xl(e, n, t, r) {
  return (
    (e = Ze(22, e, r, n)),
    (e.elementType = Xc),
    (e.lanes = t),
    (e.stateNode = { isHidden: !1 }),
    e
  );
}
function Zl(e, n, t) {
  return (e = Ze(6, e, null, n)), (e.lanes = t), e;
}
function eo(e, n, t) {
  return (
    (n = Ze(4, e.children !== null ? e.children : [], e.key, n)),
    (n.lanes = t),
    (n.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      implementation: e.implementation,
    }),
    n
  );
}
function ig(e, n, t, r, i) {
  (this.tag = n),
    (this.containerInfo = e),
    (this.finishedWork =
      this.pingCache =
      this.current =
      this.pendingChildren =
        null),
    (this.timeoutHandle = -1),
    (this.callbackNode = this.pendingContext = this.context = null),
    (this.callbackPriority = 0),
    (this.eventTimes = Rl(0)),
    (this.expirationTimes = Rl(-1)),
    (this.entangledLanes =
      this.finishedLanes =
      this.mutableReadLanes =
      this.expiredLanes =
      this.pingedLanes =
      this.suspendedLanes =
      this.pendingLanes =
        0),
    (this.entanglements = Rl(0)),
    (this.identifierPrefix = r),
    (this.onRecoverableError = i),
    (this.mutableSourceEagerHydrationData = null);
}
function os(e, n, t, r, i, l, o, u, s) {
  return (
    (e = new ig(e, n, t, u, s)),
    n === 1 ? ((n = 1), l === !0 && (n |= 8)) : (n = 0),
    (l = Ze(3, null, null, n)),
    (e.current = l),
    (l.stateNode = e),
    (l.memoizedState = {
      element: r,
      isDehydrated: t,
      cache: null,
      transitions: null,
      pendingSuspenseBoundaries: null,
    }),
    $u(l),
    e
  );
}
function lg(e, n, t) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return {
    $$typeof: _t,
    key: r == null ? null : "" + r,
    children: e,
    containerInfo: n,
    implementation: t,
  };
}
function Vp(e) {
  if (!e) return Zn;
  e = e._reactInternals;
  e: {
    if (kt(e) !== e || e.tag !== 1) throw Error(_(170));
    var n = e;
    do {
      switch (n.tag) {
        case 3:
          n = n.stateNode.context;
          break e;
        case 1:
          if (je(n.type)) {
            n = n.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      n = n.return;
    } while (n !== null);
    throw Error(_(171));
  }
  if (e.tag === 1) {
    var t = e.type;
    if (je(t)) return Vf(e, t, n);
  }
  return n;
}
function Hp(e, n, t, r, i, l, o, u, s) {
  return (
    (e = os(t, r, !0, e, i, l, o, u, s)),
    (e.context = Vp(null)),
    (t = e.current),
    (r = Le()),
    (i = qn(t)),
    (l = In(r, i)),
    (l.callback = n ?? null),
    Yn(t, l, i),
    (e.current.lanes = i),
    qr(e, i, r),
    Be(e, r),
    e
  );
}
function Sl(e, n, t, r) {
  var i = n.current,
    l = Le(),
    o = qn(i);
  return (
    (t = Vp(t)),
    n.context === null ? (n.context = t) : (n.pendingContext = t),
    (n = In(l, o)),
    (n.payload = { element: e }),
    (r = r === void 0 ? null : r),
    r !== null && (n.callback = r),
    (e = Yn(i, n, o)),
    e !== null && (pn(e, i, o, l), Ii(e, i, o)),
    o
  );
}
function ol(e) {
  if (((e = e.current), !e.child)) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function Ma(e, n) {
  if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
    var t = e.retryLane;
    e.retryLane = t !== 0 && t < n ? t : n;
  }
}
function us(e, n) {
  Ma(e, n), (e = e.alternate) && Ma(e, n);
}
function og() {
  return null;
}
var $p =
  typeof reportError == "function"
    ? reportError
    : function (e) {
        console.error(e);
      };
function ss(e) {
  this._internalRoot = e;
}
El.prototype.render = ss.prototype.render = function (e) {
  var n = this._internalRoot;
  if (n === null) throw Error(_(409));
  Sl(e, n, null, null);
};
El.prototype.unmount = ss.prototype.unmount = function () {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var n = e.containerInfo;
    yt(function () {
      Sl(null, e, null, null);
    }),
      (n[zn] = null);
  }
};
function El(e) {
  this._internalRoot = e;
}
El.prototype.unstable_scheduleHydration = function (e) {
  if (e) {
    var n = wf();
    e = { blockedOn: null, target: e, priority: n };
    for (var t = 0; t < Un.length && n !== 0 && n < Un[t].priority; t++);
    Un.splice(t, 0, e), t === 0 && Sf(e);
  }
};
function as(e) {
  return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
}
function Cl(e) {
  return !(
    !e ||
    (e.nodeType !== 1 &&
      e.nodeType !== 9 &&
      e.nodeType !== 11 &&
      (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
  );
}
function Fa() {}
function ug(e, n, t, r, i) {
  if (i) {
    if (typeof r == "function") {
      var l = r;
      r = function () {
        var a = ol(o);
        l.call(a);
      };
    }
    var o = Hp(n, r, e, 0, null, !1, !1, "", Fa);
    return (
      (e._reactRootContainer = o),
      (e[zn] = o.current),
      Br(e.nodeType === 8 ? e.parentNode : e),
      yt(),
      o
    );
  }
  for (; (i = e.lastChild); ) e.removeChild(i);
  if (typeof r == "function") {
    var u = r;
    r = function () {
      var a = ol(s);
      u.call(a);
    };
  }
  var s = os(e, 0, !1, null, null, !1, !1, "", Fa);
  return (
    (e._reactRootContainer = s),
    (e[zn] = s.current),
    Br(e.nodeType === 8 ? e.parentNode : e),
    yt(function () {
      Sl(n, s, t, r);
    }),
    s
  );
}
function Pl(e, n, t, r, i) {
  var l = t._reactRootContainer;
  if (l) {
    var o = l;
    if (typeof i == "function") {
      var u = i;
      i = function () {
        var s = ol(o);
        u.call(s);
      };
    }
    Sl(n, o, e, i);
  } else o = ug(t, n, e, i, r);
  return ol(o);
}
vf = function (e) {
  switch (e.tag) {
    case 3:
      var n = e.stateNode;
      if (n.current.memoizedState.isDehydrated) {
        var t = vr(n.pendingLanes);
        t !== 0 &&
          (Iu(n, t | 1), Be(n, de()), !(Y & 6) && ((Jt = de() + 500), tt()));
      }
      break;
    case 13:
      yt(function () {
        var r = Ln(e, 1);
        if (r !== null) {
          var i = Le();
          pn(r, e, 1, i);
        }
      }),
        us(e, 1);
  }
};
Tu = function (e) {
  if (e.tag === 13) {
    var n = Ln(e, 134217728);
    if (n !== null) {
      var t = Le();
      pn(n, e, 134217728, t);
    }
    us(e, 134217728);
  }
};
kf = function (e) {
  if (e.tag === 13) {
    var n = qn(e),
      t = Ln(e, n);
    if (t !== null) {
      var r = Le();
      pn(t, e, n, r);
    }
    us(e, n);
  }
};
wf = function () {
  return G;
};
xf = function (e, n) {
  var t = G;
  try {
    return (G = e), n();
  } finally {
    G = t;
  }
};
No = function (e, n, t) {
  switch (n) {
    case "input":
      if ((wo(e, t), (n = t.name), t.type === "radio" && n != null)) {
        for (t = e; t.parentNode; ) t = t.parentNode;
        for (
          t = t.querySelectorAll(
            "input[name=" + JSON.stringify("" + n) + '][type="radio"]'
          ),
            n = 0;
          n < t.length;
          n++
        ) {
          var r = t[n];
          if (r !== e && r.form === e.form) {
            var i = ml(r);
            if (!i) throw Error(_(90));
            Gc(r), wo(r, i);
          }
        }
      }
      break;
    case "textarea":
      Zc(e, t);
      break;
    case "select":
      (n = t.value), n != null && jt(e, !!t.multiple, n, !1);
  }
};
uf = ts;
sf = yt;
var sg = { usingClientEntryPoint: !1, Events: [Jr, Lt, ml, lf, of, ts] },
  dr = {
    findFiberByHostInstance: st,
    bundleType: 0,
    version: "18.3.1",
    rendererPackageName: "react-dom",
  },
  ag = {
    bundleType: dr.bundleType,
    version: dr.version,
    rendererPackageName: dr.rendererPackageName,
    rendererConfig: dr.rendererConfig,
    overrideHookState: null,
    overrideHookStateDeletePath: null,
    overrideHookStateRenamePath: null,
    overrideProps: null,
    overridePropsDeletePath: null,
    overridePropsRenamePath: null,
    setErrorHandler: null,
    setSuspenseHandler: null,
    scheduleUpdate: null,
    currentDispatcherRef: Rn.ReactCurrentDispatcher,
    findHostInstanceByFiber: function (e) {
      return (e = ff(e)), e === null ? null : e.stateNode;
    },
    findFiberByHostInstance: dr.findFiberByHostInstance || og,
    findHostInstancesForRefresh: null,
    scheduleRefresh: null,
    scheduleRoot: null,
    setRefreshHandler: null,
    getCurrentFiber: null,
    reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
  };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var ki = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!ki.isDisabled && ki.supportsFiber)
    try {
      (fl = ki.inject(ag)), (wn = ki);
    } catch {}
}
Ye.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = sg;
Ye.createPortal = function (e, n) {
  var t = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!as(n)) throw Error(_(200));
  return lg(e, n, null, t);
};
Ye.createRoot = function (e, n) {
  if (!as(e)) throw Error(_(299));
  var t = !1,
    r = "",
    i = $p;
  return (
    n != null &&
      (n.unstable_strictMode === !0 && (t = !0),
      n.identifierPrefix !== void 0 && (r = n.identifierPrefix),
      n.onRecoverableError !== void 0 && (i = n.onRecoverableError)),
    (n = os(e, 1, !1, null, null, t, !1, r, i)),
    (e[zn] = n.current),
    Br(e.nodeType === 8 ? e.parentNode : e),
    new ss(n)
  );
};
Ye.findDOMNode = function (e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var n = e._reactInternals;
  if (n === void 0)
    throw typeof e.render == "function"
      ? Error(_(188))
      : ((e = Object.keys(e).join(",")), Error(_(268, e)));
  return (e = ff(n)), (e = e === null ? null : e.stateNode), e;
};
Ye.flushSync = function (e) {
  return yt(e);
};
Ye.hydrate = function (e, n, t) {
  if (!Cl(n)) throw Error(_(200));
  return Pl(null, e, n, !0, t);
};
Ye.hydrateRoot = function (e, n, t) {
  if (!as(e)) throw Error(_(405));
  var r = (t != null && t.hydratedSources) || null,
    i = !1,
    l = "",
    o = $p;
  if (
    (t != null &&
      (t.unstable_strictMode === !0 && (i = !0),
      t.identifierPrefix !== void 0 && (l = t.identifierPrefix),
      t.onRecoverableError !== void 0 && (o = t.onRecoverableError)),
    (n = Hp(n, null, e, 1, t ?? null, i, !1, l, o)),
    (e[zn] = n.current),
    Br(e),
    r)
  )
    for (e = 0; e < r.length; e++)
      (t = r[e]),
        (i = t._getVersion),
        (i = i(t._source)),
        n.mutableSourceEagerHydrationData == null
          ? (n.mutableSourceEagerHydrationData = [t, i])
          : n.mutableSourceEagerHydrationData.push(t, i);
  return new El(n);
};
Ye.render = function (e, n, t) {
  if (!Cl(n)) throw Error(_(200));
  return Pl(null, e, n, !1, t);
};
Ye.unmountComponentAtNode = function (e) {
  if (!Cl(e)) throw Error(_(40));
  return e._reactRootContainer
    ? (yt(function () {
        Pl(null, null, e, !1, function () {
          (e._reactRootContainer = null), (e[zn] = null);
        });
      }),
      !0)
    : !1;
};
Ye.unstable_batchedUpdates = ts;
Ye.unstable_renderSubtreeIntoContainer = function (e, n, t, r) {
  if (!Cl(t)) throw Error(_(200));
  if (e == null || e._reactInternals === void 0) throw Error(_(38));
  return Pl(e, n, t, !1, r);
};
Ye.version = "18.3.1-next-f1338f8080-20240426";
function Wp() {
  if (
    !(
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
    )
  )
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Wp);
    } catch (e) {
      console.error(e);
    }
}
Wp(), ($c.exports = Ye);
var cg = $c.exports,
  ja = cg;
(po.createRoot = ja.createRoot), (po.hydrateRoot = ja.hydrateRoot);
function fg(e, n) {
  const t = n || {};
  return (e[e.length - 1] === "" ? [...e, ""] : e)
    .join((t.padRight ? " " : "") + "," + (t.padLeft === !1 ? "" : " "))
    .trim();
}
const pg = /^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,
  dg = /^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,
  hg = {};
function Ba(e, n) {
  return ((n || hg).jsx ? dg : pg).test(e);
}
const mg = /[ \t\n\f\r]/g;
function gg(e) {
  return typeof e == "object" ? (e.type === "text" ? Ua(e.value) : !1) : Ua(e);
}
function Ua(e) {
  return e.replace(mg, "") === "";
}
class ei {
  constructor(n, t, r) {
    (this.property = n), (this.normal = t), r && (this.space = r);
  }
}
ei.prototype.property = {};
ei.prototype.normal = {};
ei.prototype.space = null;
function Qp(e, n) {
  const t = {},
    r = {};
  let i = -1;
  for (; ++i < e.length; )
    Object.assign(t, e[i].property), Object.assign(r, e[i].normal);
  return new ei(t, r, n);
}
function ou(e) {
  return e.toLowerCase();
}
class rn {
  constructor(n, t) {
    (this.property = n), (this.attribute = t);
  }
}
rn.prototype.space = null;
rn.prototype.boolean = !1;
rn.prototype.booleanish = !1;
rn.prototype.overloadedBoolean = !1;
rn.prototype.number = !1;
rn.prototype.commaSeparated = !1;
rn.prototype.spaceSeparated = !1;
rn.prototype.commaOrSpaceSeparated = !1;
rn.prototype.mustUseProperty = !1;
rn.prototype.defined = !1;
let yg = 0;
const $ = wt(),
  he = wt(),
  bp = wt(),
  I = wt(),
  ne = wt(),
  Wt = wt(),
  He = wt();
function wt() {
  return 2 ** ++yg;
}
const uu = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        boolean: $,
        booleanish: he,
        commaOrSpaceSeparated: He,
        commaSeparated: Wt,
        number: I,
        overloadedBoolean: bp,
        spaceSeparated: ne,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  ),
  no = Object.keys(uu);
class cs extends rn {
  constructor(n, t, r, i) {
    let l = -1;
    if ((super(n, t), Va(this, "space", i), typeof r == "number"))
      for (; ++l < no.length; ) {
        const o = no[l];
        Va(this, no[l], (r & uu[o]) === uu[o]);
      }
  }
}
cs.prototype.defined = !0;
function Va(e, n, t) {
  t && (e[n] = t);
}
const vg = {}.hasOwnProperty;
function tr(e) {
  const n = {},
    t = {};
  let r;
  for (r in e.properties)
    if (vg.call(e.properties, r)) {
      const i = e.properties[r],
        l = new cs(r, e.transform(e.attributes || {}, r), i, e.space);
      e.mustUseProperty &&
        e.mustUseProperty.includes(r) &&
        (l.mustUseProperty = !0),
        (n[r] = l),
        (t[ou(r)] = r),
        (t[ou(l.attribute)] = r);
    }
  return new ei(n, t, e.space);
}
const Kp = tr({
    space: "xlink",
    transform(e, n) {
      return "xlink:" + n.slice(5).toLowerCase();
    },
    properties: {
      xLinkActuate: null,
      xLinkArcRole: null,
      xLinkHref: null,
      xLinkRole: null,
      xLinkShow: null,
      xLinkTitle: null,
      xLinkType: null,
    },
  }),
  Yp = tr({
    space: "xml",
    transform(e, n) {
      return "xml:" + n.slice(3).toLowerCase();
    },
    properties: { xmlLang: null, xmlBase: null, xmlSpace: null },
  });
function Xp(e, n) {
  return n in e ? e[n] : n;
}
function qp(e, n) {
  return Xp(e, n.toLowerCase());
}
const Gp = tr({
    space: "xmlns",
    attributes: { xmlnsxlink: "xmlns:xlink" },
    transform: qp,
    properties: { xmlns: null, xmlnsXLink: null },
  }),
  Jp = tr({
    transform(e, n) {
      return n === "role" ? n : "aria-" + n.slice(4).toLowerCase();
    },
    properties: {
      ariaActiveDescendant: null,
      ariaAtomic: he,
      ariaAutoComplete: null,
      ariaBusy: he,
      ariaChecked: he,
      ariaColCount: I,
      ariaColIndex: I,
      ariaColSpan: I,
      ariaControls: ne,
      ariaCurrent: null,
      ariaDescribedBy: ne,
      ariaDetails: null,
      ariaDisabled: he,
      ariaDropEffect: ne,
      ariaErrorMessage: null,
      ariaExpanded: he,
      ariaFlowTo: ne,
      ariaGrabbed: he,
      ariaHasPopup: null,
      ariaHidden: he,
      ariaInvalid: null,
      ariaKeyShortcuts: null,
      ariaLabel: null,
      ariaLabelledBy: ne,
      ariaLevel: I,
      ariaLive: null,
      ariaModal: he,
      ariaMultiLine: he,
      ariaMultiSelectable: he,
      ariaOrientation: null,
      ariaOwns: ne,
      ariaPlaceholder: null,
      ariaPosInSet: I,
      ariaPressed: he,
      ariaReadOnly: he,
      ariaRelevant: null,
      ariaRequired: he,
      ariaRoleDescription: ne,
      ariaRowCount: I,
      ariaRowIndex: I,
      ariaRowSpan: I,
      ariaSelected: he,
      ariaSetSize: I,
      ariaSort: null,
      ariaValueMax: I,
      ariaValueMin: I,
      ariaValueNow: I,
      ariaValueText: null,
      role: null,
    },
  }),
  kg = tr({
    space: "html",
    attributes: {
      acceptcharset: "accept-charset",
      classname: "class",
      htmlfor: "for",
      httpequiv: "http-equiv",
    },
    transform: qp,
    mustUseProperty: ["checked", "multiple", "muted", "selected"],
    properties: {
      abbr: null,
      accept: Wt,
      acceptCharset: ne,
      accessKey: ne,
      action: null,
      allow: null,
      allowFullScreen: $,
      allowPaymentRequest: $,
      allowUserMedia: $,
      alt: null,
      as: null,
      async: $,
      autoCapitalize: null,
      autoComplete: ne,
      autoFocus: $,
      autoPlay: $,
      blocking: ne,
      capture: null,
      charSet: null,
      checked: $,
      cite: null,
      className: ne,
      cols: I,
      colSpan: null,
      content: null,
      contentEditable: he,
      controls: $,
      controlsList: ne,
      coords: I | Wt,
      crossOrigin: null,
      data: null,
      dateTime: null,
      decoding: null,
      default: $,
      defer: $,
      dir: null,
      dirName: null,
      disabled: $,
      download: bp,
      draggable: he,
      encType: null,
      enterKeyHint: null,
      fetchPriority: null,
      form: null,
      formAction: null,
      formEncType: null,
      formMethod: null,
      formNoValidate: $,
      formTarget: null,
      headers: ne,
      height: I,
      hidden: $,
      high: I,
      href: null,
      hrefLang: null,
      htmlFor: ne,
      httpEquiv: ne,
      id: null,
      imageSizes: null,
      imageSrcSet: null,
      inert: $,
      inputMode: null,
      integrity: null,
      is: null,
      isMap: $,
      itemId: null,
      itemProp: ne,
      itemRef: ne,
      itemScope: $,
      itemType: ne,
      kind: null,
      label: null,
      lang: null,
      language: null,
      list: null,
      loading: null,
      loop: $,
      low: I,
      manifest: null,
      max: null,
      maxLength: I,
      media: null,
      method: null,
      min: null,
      minLength: I,
      multiple: $,
      muted: $,
      name: null,
      nonce: null,
      noModule: $,
      noValidate: $,
      onAbort: null,
      onAfterPrint: null,
      onAuxClick: null,
      onBeforeMatch: null,
      onBeforePrint: null,
      onBeforeToggle: null,
      onBeforeUnload: null,
      onBlur: null,
      onCancel: null,
      onCanPlay: null,
      onCanPlayThrough: null,
      onChange: null,
      onClick: null,
      onClose: null,
      onContextLost: null,
      onContextMenu: null,
      onContextRestored: null,
      onCopy: null,
      onCueChange: null,
      onCut: null,
      onDblClick: null,
      onDrag: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragExit: null,
      onDragLeave: null,
      onDragOver: null,
      onDragStart: null,
      onDrop: null,
      onDurationChange: null,
      onEmptied: null,
      onEnded: null,
      onError: null,
      onFocus: null,
      onFormData: null,
      onHashChange: null,
      onInput: null,
      onInvalid: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      onLanguageChange: null,
      onLoad: null,
      onLoadedData: null,
      onLoadedMetadata: null,
      onLoadEnd: null,
      onLoadStart: null,
      onMessage: null,
      onMessageError: null,
      onMouseDown: null,
      onMouseEnter: null,
      onMouseLeave: null,
      onMouseMove: null,
      onMouseOut: null,
      onMouseOver: null,
      onMouseUp: null,
      onOffline: null,
      onOnline: null,
      onPageHide: null,
      onPageShow: null,
      onPaste: null,
      onPause: null,
      onPlay: null,
      onPlaying: null,
      onPopState: null,
      onProgress: null,
      onRateChange: null,
      onRejectionHandled: null,
      onReset: null,
      onResize: null,
      onScroll: null,
      onScrollEnd: null,
      onSecurityPolicyViolation: null,
      onSeeked: null,
      onSeeking: null,
      onSelect: null,
      onSlotChange: null,
      onStalled: null,
      onStorage: null,
      onSubmit: null,
      onSuspend: null,
      onTimeUpdate: null,
      onToggle: null,
      onUnhandledRejection: null,
      onUnload: null,
      onVolumeChange: null,
      onWaiting: null,
      onWheel: null,
      open: $,
      optimum: I,
      pattern: null,
      ping: ne,
      placeholder: null,
      playsInline: $,
      popover: null,
      popoverTarget: null,
      popoverTargetAction: null,
      poster: null,
      preload: null,
      readOnly: $,
      referrerPolicy: null,
      rel: ne,
      required: $,
      reversed: $,
      rows: I,
      rowSpan: I,
      sandbox: ne,
      scope: null,
      scoped: $,
      seamless: $,
      selected: $,
      shadowRootClonable: $,
      shadowRootDelegatesFocus: $,
      shadowRootMode: null,
      shape: null,
      size: I,
      sizes: null,
      slot: null,
      span: I,
      spellCheck: he,
      src: null,
      srcDoc: null,
      srcLang: null,
      srcSet: null,
      start: I,
      step: null,
      style: null,
      tabIndex: I,
      target: null,
      title: null,
      translate: null,
      type: null,
      typeMustMatch: $,
      useMap: null,
      value: he,
      width: I,
      wrap: null,
      writingSuggestions: null,
      align: null,
      aLink: null,
      archive: ne,
      axis: null,
      background: null,
      bgColor: null,
      border: I,
      borderColor: null,
      bottomMargin: I,
      cellPadding: null,
      cellSpacing: null,
      char: null,
      charOff: null,
      classId: null,
      clear: null,
      code: null,
      codeBase: null,
      codeType: null,
      color: null,
      compact: $,
      declare: $,
      event: null,
      face: null,
      frame: null,
      frameBorder: null,
      hSpace: I,
      leftMargin: I,
      link: null,
      longDesc: null,
      lowSrc: null,
      marginHeight: I,
      marginWidth: I,
      noResize: $,
      noHref: $,
      noShade: $,
      noWrap: $,
      object: null,
      profile: null,
      prompt: null,
      rev: null,
      rightMargin: I,
      rules: null,
      scheme: null,
      scrolling: he,
      standby: null,
      summary: null,
      text: null,
      topMargin: I,
      valueType: null,
      version: null,
      vAlign: null,
      vLink: null,
      vSpace: I,
      allowTransparency: null,
      autoCorrect: null,
      autoSave: null,
      disablePictureInPicture: $,
      disableRemotePlayback: $,
      prefix: null,
      property: null,
      results: I,
      security: null,
      unselectable: null,
    },
  }),
  wg = tr({
    space: "svg",
    attributes: {
      accentHeight: "accent-height",
      alignmentBaseline: "alignment-baseline",
      arabicForm: "arabic-form",
      baselineShift: "baseline-shift",
      capHeight: "cap-height",
      className: "class",
      clipPath: "clip-path",
      clipRule: "clip-rule",
      colorInterpolation: "color-interpolation",
      colorInterpolationFilters: "color-interpolation-filters",
      colorProfile: "color-profile",
      colorRendering: "color-rendering",
      crossOrigin: "crossorigin",
      dataType: "datatype",
      dominantBaseline: "dominant-baseline",
      enableBackground: "enable-background",
      fillOpacity: "fill-opacity",
      fillRule: "fill-rule",
      floodColor: "flood-color",
      floodOpacity: "flood-opacity",
      fontFamily: "font-family",
      fontSize: "font-size",
      fontSizeAdjust: "font-size-adjust",
      fontStretch: "font-stretch",
      fontStyle: "font-style",
      fontVariant: "font-variant",
      fontWeight: "font-weight",
      glyphName: "glyph-name",
      glyphOrientationHorizontal: "glyph-orientation-horizontal",
      glyphOrientationVertical: "glyph-orientation-vertical",
      hrefLang: "hreflang",
      horizAdvX: "horiz-adv-x",
      horizOriginX: "horiz-origin-x",
      horizOriginY: "horiz-origin-y",
      imageRendering: "image-rendering",
      letterSpacing: "letter-spacing",
      lightingColor: "lighting-color",
      markerEnd: "marker-end",
      markerMid: "marker-mid",
      markerStart: "marker-start",
      navDown: "nav-down",
      navDownLeft: "nav-down-left",
      navDownRight: "nav-down-right",
      navLeft: "nav-left",
      navNext: "nav-next",
      navPrev: "nav-prev",
      navRight: "nav-right",
      navUp: "nav-up",
      navUpLeft: "nav-up-left",
      navUpRight: "nav-up-right",
      onAbort: "onabort",
      onActivate: "onactivate",
      onAfterPrint: "onafterprint",
      onBeforePrint: "onbeforeprint",
      onBegin: "onbegin",
      onCancel: "oncancel",
      onCanPlay: "oncanplay",
      onCanPlayThrough: "oncanplaythrough",
      onChange: "onchange",
      onClick: "onclick",
      onClose: "onclose",
      onCopy: "oncopy",
      onCueChange: "oncuechange",
      onCut: "oncut",
      onDblClick: "ondblclick",
      onDrag: "ondrag",
      onDragEnd: "ondragend",
      onDragEnter: "ondragenter",
      onDragExit: "ondragexit",
      onDragLeave: "ondragleave",
      onDragOver: "ondragover",
      onDragStart: "ondragstart",
      onDrop: "ondrop",
      onDurationChange: "ondurationchange",
      onEmptied: "onemptied",
      onEnd: "onend",
      onEnded: "onended",
      onError: "onerror",
      onFocus: "onfocus",
      onFocusIn: "onfocusin",
      onFocusOut: "onfocusout",
      onHashChange: "onhashchange",
      onInput: "oninput",
      onInvalid: "oninvalid",
      onKeyDown: "onkeydown",
      onKeyPress: "onkeypress",
      onKeyUp: "onkeyup",
      onLoad: "onload",
      onLoadedData: "onloadeddata",
      onLoadedMetadata: "onloadedmetadata",
      onLoadStart: "onloadstart",
      onMessage: "onmessage",
      onMouseDown: "onmousedown",
      onMouseEnter: "onmouseenter",
      onMouseLeave: "onmouseleave",
      onMouseMove: "onmousemove",
      onMouseOut: "onmouseout",
      onMouseOver: "onmouseover",
      onMouseUp: "onmouseup",
      onMouseWheel: "onmousewheel",
      onOffline: "onoffline",
      onOnline: "ononline",
      onPageHide: "onpagehide",
      onPageShow: "onpageshow",
      onPaste: "onpaste",
      onPause: "onpause",
      onPlay: "onplay",
      onPlaying: "onplaying",
      onPopState: "onpopstate",
      onProgress: "onprogress",
      onRateChange: "onratechange",
      onRepeat: "onrepeat",
      onReset: "onreset",
      onResize: "onresize",
      onScroll: "onscroll",
      onSeeked: "onseeked",
      onSeeking: "onseeking",
      onSelect: "onselect",
      onShow: "onshow",
      onStalled: "onstalled",
      onStorage: "onstorage",
      onSubmit: "onsubmit",
      onSuspend: "onsuspend",
      onTimeUpdate: "ontimeupdate",
      onToggle: "ontoggle",
      onUnload: "onunload",
      onVolumeChange: "onvolumechange",
      onWaiting: "onwaiting",
      onZoom: "onzoom",
      overlinePosition: "overline-position",
      overlineThickness: "overline-thickness",
      paintOrder: "paint-order",
      panose1: "panose-1",
      pointerEvents: "pointer-events",
      referrerPolicy: "referrerpolicy",
      renderingIntent: "rendering-intent",
      shapeRendering: "shape-rendering",
      stopColor: "stop-color",
      stopOpacity: "stop-opacity",
      strikethroughPosition: "strikethrough-position",
      strikethroughThickness: "strikethrough-thickness",
      strokeDashArray: "stroke-dasharray",
      strokeDashOffset: "stroke-dashoffset",
      strokeLineCap: "stroke-linecap",
      strokeLineJoin: "stroke-linejoin",
      strokeMiterLimit: "stroke-miterlimit",
      strokeOpacity: "stroke-opacity",
      strokeWidth: "stroke-width",
      tabIndex: "tabindex",
      textAnchor: "text-anchor",
      textDecoration: "text-decoration",
      textRendering: "text-rendering",
      transformOrigin: "transform-origin",
      typeOf: "typeof",
      underlinePosition: "underline-position",
      underlineThickness: "underline-thickness",
      unicodeBidi: "unicode-bidi",
      unicodeRange: "unicode-range",
      unitsPerEm: "units-per-em",
      vAlphabetic: "v-alphabetic",
      vHanging: "v-hanging",
      vIdeographic: "v-ideographic",
      vMathematical: "v-mathematical",
      vectorEffect: "vector-effect",
      vertAdvY: "vert-adv-y",
      vertOriginX: "vert-origin-x",
      vertOriginY: "vert-origin-y",
      wordSpacing: "word-spacing",
      writingMode: "writing-mode",
      xHeight: "x-height",
      playbackOrder: "playbackorder",
      timelineBegin: "timelinebegin",
    },
    transform: Xp,
    properties: {
      about: He,
      accentHeight: I,
      accumulate: null,
      additive: null,
      alignmentBaseline: null,
      alphabetic: I,
      amplitude: I,
      arabicForm: null,
      ascent: I,
      attributeName: null,
      attributeType: null,
      azimuth: I,
      bandwidth: null,
      baselineShift: null,
      baseFrequency: null,
      baseProfile: null,
      bbox: null,
      begin: null,
      bias: I,
      by: null,
      calcMode: null,
      capHeight: I,
      className: ne,
      clip: null,
      clipPath: null,
      clipPathUnits: null,
      clipRule: null,
      color: null,
      colorInterpolation: null,
      colorInterpolationFilters: null,
      colorProfile: null,
      colorRendering: null,
      content: null,
      contentScriptType: null,
      contentStyleType: null,
      crossOrigin: null,
      cursor: null,
      cx: null,
      cy: null,
      d: null,
      dataType: null,
      defaultAction: null,
      descent: I,
      diffuseConstant: I,
      direction: null,
      display: null,
      dur: null,
      divisor: I,
      dominantBaseline: null,
      download: $,
      dx: null,
      dy: null,
      edgeMode: null,
      editable: null,
      elevation: I,
      enableBackground: null,
      end: null,
      event: null,
      exponent: I,
      externalResourcesRequired: null,
      fill: null,
      fillOpacity: I,
      fillRule: null,
      filter: null,
      filterRes: null,
      filterUnits: null,
      floodColor: null,
      floodOpacity: null,
      focusable: null,
      focusHighlight: null,
      fontFamily: null,
      fontSize: null,
      fontSizeAdjust: null,
      fontStretch: null,
      fontStyle: null,
      fontVariant: null,
      fontWeight: null,
      format: null,
      fr: null,
      from: null,
      fx: null,
      fy: null,
      g1: Wt,
      g2: Wt,
      glyphName: Wt,
      glyphOrientationHorizontal: null,
      glyphOrientationVertical: null,
      glyphRef: null,
      gradientTransform: null,
      gradientUnits: null,
      handler: null,
      hanging: I,
      hatchContentUnits: null,
      hatchUnits: null,
      height: null,
      href: null,
      hrefLang: null,
      horizAdvX: I,
      horizOriginX: I,
      horizOriginY: I,
      id: null,
      ideographic: I,
      imageRendering: null,
      initialVisibility: null,
      in: null,
      in2: null,
      intercept: I,
      k: I,
      k1: I,
      k2: I,
      k3: I,
      k4: I,
      kernelMatrix: He,
      kernelUnitLength: null,
      keyPoints: null,
      keySplines: null,
      keyTimes: null,
      kerning: null,
      lang: null,
      lengthAdjust: null,
      letterSpacing: null,
      lightingColor: null,
      limitingConeAngle: I,
      local: null,
      markerEnd: null,
      markerMid: null,
      markerStart: null,
      markerHeight: null,
      markerUnits: null,
      markerWidth: null,
      mask: null,
      maskContentUnits: null,
      maskUnits: null,
      mathematical: null,
      max: null,
      media: null,
      mediaCharacterEncoding: null,
      mediaContentEncodings: null,
      mediaSize: I,
      mediaTime: null,
      method: null,
      min: null,
      mode: null,
      name: null,
      navDown: null,
      navDownLeft: null,
      navDownRight: null,
      navLeft: null,
      navNext: null,
      navPrev: null,
      navRight: null,
      navUp: null,
      navUpLeft: null,
      navUpRight: null,
      numOctaves: null,
      observer: null,
      offset: null,
      onAbort: null,
      onActivate: null,
      onAfterPrint: null,
      onBeforePrint: null,
      onBegin: null,
      onCancel: null,
      onCanPlay: null,
      onCanPlayThrough: null,
      onChange: null,
      onClick: null,
      onClose: null,
      onCopy: null,
      onCueChange: null,
      onCut: null,
      onDblClick: null,
      onDrag: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragExit: null,
      onDragLeave: null,
      onDragOver: null,
      onDragStart: null,
      onDrop: null,
      onDurationChange: null,
      onEmptied: null,
      onEnd: null,
      onEnded: null,
      onError: null,
      onFocus: null,
      onFocusIn: null,
      onFocusOut: null,
      onHashChange: null,
      onInput: null,
      onInvalid: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      onLoad: null,
      onLoadedData: null,
      onLoadedMetadata: null,
      onLoadStart: null,
      onMessage: null,
      onMouseDown: null,
      onMouseEnter: null,
      onMouseLeave: null,
      onMouseMove: null,
      onMouseOut: null,
      onMouseOver: null,
      onMouseUp: null,
      onMouseWheel: null,
      onOffline: null,
      onOnline: null,
      onPageHide: null,
      onPageShow: null,
      onPaste: null,
      onPause: null,
      onPlay: null,
      onPlaying: null,
      onPopState: null,
      onProgress: null,
      onRateChange: null,
      onRepeat: null,
      onReset: null,
      onResize: null,
      onScroll: null,
      onSeeked: null,
      onSeeking: null,
      onSelect: null,
      onShow: null,
      onStalled: null,
      onStorage: null,
      onSubmit: null,
      onSuspend: null,
      onTimeUpdate: null,
      onToggle: null,
      onUnload: null,
      onVolumeChange: null,
      onWaiting: null,
      onZoom: null,
      opacity: null,
      operator: null,
      order: null,
      orient: null,
      orientation: null,
      origin: null,
      overflow: null,
      overlay: null,
      overlinePosition: I,
      overlineThickness: I,
      paintOrder: null,
      panose1: null,
      path: null,
      pathLength: I,
      patternContentUnits: null,
      patternTransform: null,
      patternUnits: null,
      phase: null,
      ping: ne,
      pitch: null,
      playbackOrder: null,
      pointerEvents: null,
      points: null,
      pointsAtX: I,
      pointsAtY: I,
      pointsAtZ: I,
      preserveAlpha: null,
      preserveAspectRatio: null,
      primitiveUnits: null,
      propagate: null,
      property: He,
      r: null,
      radius: null,
      referrerPolicy: null,
      refX: null,
      refY: null,
      rel: He,
      rev: He,
      renderingIntent: null,
      repeatCount: null,
      repeatDur: null,
      requiredExtensions: He,
      requiredFeatures: He,
      requiredFonts: He,
      requiredFormats: He,
      resource: null,
      restart: null,
      result: null,
      rotate: null,
      rx: null,
      ry: null,
      scale: null,
      seed: null,
      shapeRendering: null,
      side: null,
      slope: null,
      snapshotTime: null,
      specularConstant: I,
      specularExponent: I,
      spreadMethod: null,
      spacing: null,
      startOffset: null,
      stdDeviation: null,
      stemh: null,
      stemv: null,
      stitchTiles: null,
      stopColor: null,
      stopOpacity: null,
      strikethroughPosition: I,
      strikethroughThickness: I,
      string: null,
      stroke: null,
      strokeDashArray: He,
      strokeDashOffset: null,
      strokeLineCap: null,
      strokeLineJoin: null,
      strokeMiterLimit: I,
      strokeOpacity: I,
      strokeWidth: null,
      style: null,
      surfaceScale: I,
      syncBehavior: null,
      syncBehaviorDefault: null,
      syncMaster: null,
      syncTolerance: null,
      syncToleranceDefault: null,
      systemLanguage: He,
      tabIndex: I,
      tableValues: null,
      target: null,
      targetX: I,
      targetY: I,
      textAnchor: null,
      textDecoration: null,
      textRendering: null,
      textLength: null,
      timelineBegin: null,
      title: null,
      transformBehavior: null,
      type: null,
      typeOf: He,
      to: null,
      transform: null,
      transformOrigin: null,
      u1: null,
      u2: null,
      underlinePosition: I,
      underlineThickness: I,
      unicode: null,
      unicodeBidi: null,
      unicodeRange: null,
      unitsPerEm: I,
      values: null,
      vAlphabetic: I,
      vMathematical: I,
      vectorEffect: null,
      vHanging: I,
      vIdeographic: I,
      version: null,
      vertAdvY: I,
      vertOriginX: I,
      vertOriginY: I,
      viewBox: null,
      viewTarget: null,
      visibility: null,
      width: null,
      widths: null,
      wordSpacing: null,
      writingMode: null,
      x: null,
      x1: null,
      x2: null,
      xChannelSelector: null,
      xHeight: I,
      y: null,
      y1: null,
      y2: null,
      yChannelSelector: null,
      z: null,
      zoomAndPan: null,
    },
  }),
  xg = /^data[-\w.:]+$/i,
  Ha = /-[a-z]/g,
  Sg = /[A-Z]/g;
function Eg(e, n) {
  const t = ou(n);
  let r = n,
    i = rn;
  if (t in e.normal) return e.property[e.normal[t]];
  if (t.length > 4 && t.slice(0, 4) === "data" && xg.test(n)) {
    if (n.charAt(4) === "-") {
      const l = n.slice(5).replace(Ha, Pg);
      r = "data" + l.charAt(0).toUpperCase() + l.slice(1);
    } else {
      const l = n.slice(4);
      if (!Ha.test(l)) {
        let o = l.replace(Sg, Cg);
        o.charAt(0) !== "-" && (o = "-" + o), (n = "data" + o);
      }
    }
    i = cs;
  }
  return new i(r, n);
}
function Cg(e) {
  return "-" + e.toLowerCase();
}
function Pg(e) {
  return e.charAt(1).toUpperCase();
}
const _g = {
    classId: "classID",
    dataType: "datatype",
    itemId: "itemID",
    strokeDashArray: "strokeDasharray",
    strokeDashOffset: "strokeDashoffset",
    strokeLineCap: "strokeLinecap",
    strokeLineJoin: "strokeLinejoin",
    strokeMiterLimit: "strokeMiterlimit",
    typeOf: "typeof",
    xLinkActuate: "xlinkActuate",
    xLinkArcRole: "xlinkArcrole",
    xLinkHref: "xlinkHref",
    xLinkRole: "xlinkRole",
    xLinkShow: "xlinkShow",
    xLinkTitle: "xlinkTitle",
    xLinkType: "xlinkType",
    xmlnsXLink: "xmlnsXlink",
  },
  Ng = Qp([Yp, Kp, Gp, Jp, kg], "html"),
  fs = Qp([Yp, Kp, Gp, Jp, wg], "svg");
function Ig(e) {
  return e.join(" ").trim();
}
var Zp = {},
  $a = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,
  Tg = /\n/g,
  zg = /^\s*/,
  Lg = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,
  Og = /^:\s*/,
  Ag = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,
  Rg = /^[;\s]*/,
  Dg = /^\s+|\s+$/g,
  Mg = `
`,
  Wa = "/",
  Qa = "*",
  ut = "",
  Fg = "comment",
  jg = "declaration",
  Bg = function (e, n) {
    if (typeof e != "string")
      throw new TypeError("First argument must be a string");
    if (!e) return [];
    n = n || {};
    var t = 1,
      r = 1;
    function i(k) {
      var w = k.match(Tg);
      w && (t += w.length);
      var T = k.lastIndexOf(Mg);
      r = ~T ? k.length - T : r + k.length;
    }
    function l() {
      var k = { line: t, column: r };
      return function (w) {
        return (w.position = new o(k)), a(), w;
      };
    }
    function o(k) {
      (this.start = k),
        (this.end = { line: t, column: r }),
        (this.source = n.source);
    }
    o.prototype.content = e;
    function u(k) {
      var w = new Error(n.source + ":" + t + ":" + r + ": " + k);
      if (
        ((w.reason = k),
        (w.filename = n.source),
        (w.line = t),
        (w.column = r),
        (w.source = e),
        !n.silent)
      )
        throw w;
    }
    function s(k) {
      var w = k.exec(e);
      if (w) {
        var T = w[0];
        return i(T), (e = e.slice(T.length)), w;
      }
    }
    function a() {
      s(zg);
    }
    function c(k) {
      var w;
      for (k = k || []; (w = f()); ) w !== !1 && k.push(w);
      return k;
    }
    function f() {
      var k = l();
      if (!(Wa != e.charAt(0) || Qa != e.charAt(1))) {
        for (
          var w = 2;
          ut != e.charAt(w) && (Qa != e.charAt(w) || Wa != e.charAt(w + 1));

        )
          ++w;
        if (((w += 2), ut === e.charAt(w - 1)))
          return u("End of comment missing");
        var T = e.slice(2, w - 2);
        return (
          (r += 2),
          i(T),
          (e = e.slice(w)),
          (r += 2),
          k({ type: Fg, comment: T })
        );
      }
    }
    function d() {
      var k = l(),
        w = s(Lg);
      if (w) {
        if ((f(), !s(Og))) return u("property missing ':'");
        var T = s(Ag),
          h = k({
            type: jg,
            property: ba(w[0].replace($a, ut)),
            value: T ? ba(T[0].replace($a, ut)) : ut,
          });
        return s(Rg), h;
      }
    }
    function p() {
      var k = [];
      c(k);
      for (var w; (w = d()); ) w !== !1 && (k.push(w), c(k));
      return k;
    }
    return a(), p();
  };
function ba(e) {
  return e ? e.replace(Dg, ut) : ut;
}
var Ug =
  (Ts && Ts.__importDefault) ||
  function (e) {
    return e && e.__esModule ? e : { default: e };
  };
Object.defineProperty(Zp, "__esModule", { value: !0 });
var Ka = (Zp.default = Hg),
  Vg = Ug(Bg);
function Hg(e, n) {
  var t = null;
  if (!e || typeof e != "string") return t;
  var r = (0, Vg.default)(e),
    i = typeof n == "function";
  return (
    r.forEach(function (l) {
      if (l.type === "declaration") {
        var o = l.property,
          u = l.value;
        i ? n(o, u, l) : u && ((t = t || {}), (t[o] = u));
      }
    }),
    t
  );
}
const $g = Ka.default || Ka,
  ed = nd("end"),
  ps = nd("start");
function nd(e) {
  return n;
  function n(t) {
    const r = (t && t.position && t.position[e]) || {};
    if (
      typeof r.line == "number" &&
      r.line > 0 &&
      typeof r.column == "number" &&
      r.column > 0
    )
      return {
        line: r.line,
        column: r.column,
        offset:
          typeof r.offset == "number" && r.offset > -1 ? r.offset : void 0,
      };
  }
}
function Wg(e) {
  const n = ps(e),
    t = ed(e);
  if (n && t) return { start: n, end: t };
}
function Tr(e) {
  return !e || typeof e != "object"
    ? ""
    : "position" in e || "type" in e
    ? Ya(e.position)
    : "start" in e || "end" in e
    ? Ya(e)
    : "line" in e || "column" in e
    ? su(e)
    : "";
}
function su(e) {
  return Xa(e && e.line) + ":" + Xa(e && e.column);
}
function Ya(e) {
  return su(e && e.start) + "-" + su(e && e.end);
}
function Xa(e) {
  return e && typeof e == "number" ? e : 1;
}
class Te extends Error {
  constructor(n, t, r) {
    super(), typeof t == "string" && ((r = t), (t = void 0));
    let i = "",
      l = {},
      o = !1;
    if (
      (t &&
        ("line" in t && "column" in t
          ? (l = { place: t })
          : "start" in t && "end" in t
          ? (l = { place: t })
          : "type" in t
          ? (l = { ancestors: [t], place: t.position })
          : (l = { ...t })),
      typeof n == "string"
        ? (i = n)
        : !l.cause && n && ((o = !0), (i = n.message), (l.cause = n)),
      !l.ruleId && !l.source && typeof r == "string")
    ) {
      const s = r.indexOf(":");
      s === -1
        ? (l.ruleId = r)
        : ((l.source = r.slice(0, s)), (l.ruleId = r.slice(s + 1)));
    }
    if (!l.place && l.ancestors && l.ancestors) {
      const s = l.ancestors[l.ancestors.length - 1];
      s && (l.place = s.position);
    }
    const u = l.place && "start" in l.place ? l.place.start : l.place;
    (this.ancestors = l.ancestors || void 0),
      (this.cause = l.cause || void 0),
      (this.column = u ? u.column : void 0),
      (this.fatal = void 0),
      this.file,
      (this.message = i),
      (this.line = u ? u.line : void 0),
      (this.name = Tr(l.place) || "1:1"),
      (this.place = l.place || void 0),
      (this.reason = this.message),
      (this.ruleId = l.ruleId || void 0),
      (this.source = l.source || void 0),
      (this.stack =
        o && l.cause && typeof l.cause.stack == "string" ? l.cause.stack : ""),
      this.actual,
      this.expected,
      this.note,
      this.url;
  }
}
Te.prototype.file = "";
Te.prototype.name = "";
Te.prototype.reason = "";
Te.prototype.message = "";
Te.prototype.stack = "";
Te.prototype.column = void 0;
Te.prototype.line = void 0;
Te.prototype.ancestors = void 0;
Te.prototype.cause = void 0;
Te.prototype.fatal = void 0;
Te.prototype.place = void 0;
Te.prototype.ruleId = void 0;
Te.prototype.source = void 0;
const ds = {}.hasOwnProperty,
  Qg = new Map(),
  bg = /[A-Z]/g,
  Kg = /-([a-z])/g,
  Yg = new Set(["table", "tbody", "thead", "tfoot", "tr"]),
  Xg = new Set(["td", "th"]),
  td = "https://github.com/syntax-tree/hast-util-to-jsx-runtime";
function qg(e, n) {
  if (!n || n.Fragment === void 0)
    throw new TypeError("Expected `Fragment` in options");
  const t = n.filePath || void 0;
  let r;
  if (n.development) {
    if (typeof n.jsxDEV != "function")
      throw new TypeError(
        "Expected `jsxDEV` in options when `development: true`"
      );
    r = iy(t, n.jsxDEV);
  } else {
    if (typeof n.jsx != "function")
      throw new TypeError("Expected `jsx` in production options");
    if (typeof n.jsxs != "function")
      throw new TypeError("Expected `jsxs` in production options");
    r = ry(t, n.jsx, n.jsxs);
  }
  const i = {
      Fragment: n.Fragment,
      ancestors: [],
      components: n.components || {},
      create: r,
      elementAttributeNameCase: n.elementAttributeNameCase || "react",
      evaluater: n.createEvaluater ? n.createEvaluater() : void 0,
      filePath: t,
      ignoreInvalidStyle: n.ignoreInvalidStyle || !1,
      passKeys: n.passKeys !== !1,
      passNode: n.passNode || !1,
      schema: n.space === "svg" ? fs : Ng,
      stylePropertyNameCase: n.stylePropertyNameCase || "dom",
      tableCellAlignToStyle: n.tableCellAlignToStyle !== !1,
    },
    l = rd(i, e, void 0);
  return l && typeof l != "string"
    ? l
    : i.create(e, i.Fragment, { children: l || void 0 }, void 0);
}
function rd(e, n, t) {
  if (n.type === "element") return Gg(e, n, t);
  if (n.type === "mdxFlowExpression" || n.type === "mdxTextExpression")
    return Jg(e, n);
  if (n.type === "mdxJsxFlowElement" || n.type === "mdxJsxTextElement")
    return ey(e, n, t);
  if (n.type === "mdxjsEsm") return Zg(e, n);
  if (n.type === "root") return ny(e, n, t);
  if (n.type === "text") return ty(e, n);
}
function Gg(e, n, t) {
  const r = e.schema;
  let i = r;
  n.tagName.toLowerCase() === "svg" &&
    r.space === "html" &&
    ((i = fs), (e.schema = i)),
    e.ancestors.push(n);
  const l = ld(e, n.tagName, !1),
    o = ly(e, n);
  let u = ms(e, n);
  return (
    Yg.has(n.tagName) &&
      (u = u.filter(function (s) {
        return typeof s == "string" ? !gg(s) : !0;
      })),
    id(e, o, l, n),
    hs(o, u),
    e.ancestors.pop(),
    (e.schema = r),
    e.create(n, l, o, t)
  );
}
function Jg(e, n) {
  if (n.data && n.data.estree && e.evaluater) {
    const r = n.data.estree.body[0];
    return r.type, e.evaluater.evaluateExpression(r.expression);
  }
  Yr(e, n.position);
}
function Zg(e, n) {
  if (n.data && n.data.estree && e.evaluater)
    return e.evaluater.evaluateProgram(n.data.estree);
  Yr(e, n.position);
}
function ey(e, n, t) {
  const r = e.schema;
  let i = r;
  n.name === "svg" && r.space === "html" && ((i = fs), (e.schema = i)),
    e.ancestors.push(n);
  const l = n.name === null ? e.Fragment : ld(e, n.name, !0),
    o = oy(e, n),
    u = ms(e, n);
  return (
    id(e, o, l, n),
    hs(o, u),
    e.ancestors.pop(),
    (e.schema = r),
    e.create(n, l, o, t)
  );
}
function ny(e, n, t) {
  const r = {};
  return hs(r, ms(e, n)), e.create(n, e.Fragment, r, t);
}
function ty(e, n) {
  return n.value;
}
function id(e, n, t, r) {
  typeof t != "string" && t !== e.Fragment && e.passNode && (n.node = r);
}
function hs(e, n) {
  if (n.length > 0) {
    const t = n.length > 1 ? n : n[0];
    t && (e.children = t);
  }
}
function ry(e, n, t) {
  return r;
  function r(i, l, o, u) {
    const a = Array.isArray(o.children) ? t : n;
    return u ? a(l, o, u) : a(l, o);
  }
}
function iy(e, n) {
  return t;
  function t(r, i, l, o) {
    const u = Array.isArray(l.children),
      s = ps(r);
    return n(
      i,
      l,
      o,
      u,
      {
        columnNumber: s ? s.column - 1 : void 0,
        fileName: e,
        lineNumber: s ? s.line : void 0,
      },
      void 0
    );
  }
}
function ly(e, n) {
  const t = {};
  let r, i;
  for (i in n.properties)
    if (i !== "children" && ds.call(n.properties, i)) {
      const l = uy(e, i, n.properties[i]);
      if (l) {
        const [o, u] = l;
        e.tableCellAlignToStyle &&
        o === "align" &&
        typeof u == "string" &&
        Xg.has(n.tagName)
          ? (r = u)
          : (t[o] = u);
      }
    }
  if (r) {
    const l = t.style || (t.style = {});
    l[e.stylePropertyNameCase === "css" ? "text-align" : "textAlign"] = r;
  }
  return t;
}
function oy(e, n) {
  const t = {};
  for (const r of n.attributes)
    if (r.type === "mdxJsxExpressionAttribute")
      if (r.data && r.data.estree && e.evaluater) {
        const l = r.data.estree.body[0];
        l.type;
        const o = l.expression;
        o.type;
        const u = o.properties[0];
        u.type, Object.assign(t, e.evaluater.evaluateExpression(u.argument));
      } else Yr(e, n.position);
    else {
      const i = r.name;
      let l;
      if (r.value && typeof r.value == "object")
        if (r.value.data && r.value.data.estree && e.evaluater) {
          const u = r.value.data.estree.body[0];
          u.type, (l = e.evaluater.evaluateExpression(u.expression));
        } else Yr(e, n.position);
      else l = r.value === null ? !0 : r.value;
      t[i] = l;
    }
  return t;
}
function ms(e, n) {
  const t = [];
  let r = -1;
  const i = e.passKeys ? new Map() : Qg;
  for (; ++r < n.children.length; ) {
    const l = n.children[r];
    let o;
    if (e.passKeys) {
      const s =
        l.type === "element"
          ? l.tagName
          : l.type === "mdxJsxFlowElement" || l.type === "mdxJsxTextElement"
          ? l.name
          : void 0;
      if (s) {
        const a = i.get(s) || 0;
        (o = s + "-" + a), i.set(s, a + 1);
      }
    }
    const u = rd(e, l, o);
    u !== void 0 && t.push(u);
  }
  return t;
}
function uy(e, n, t) {
  const r = Eg(e.schema, n);
  if (!(t == null || (typeof t == "number" && Number.isNaN(t)))) {
    if (
      (Array.isArray(t) && (t = r.commaSeparated ? fg(t) : Ig(t)),
      r.property === "style")
    ) {
      let i = typeof t == "object" ? t : sy(e, String(t));
      return e.stylePropertyNameCase === "css" && (i = ay(i)), ["style", i];
    }
    return [
      e.elementAttributeNameCase === "react" && r.space
        ? _g[r.property] || r.property
        : r.attribute,
      t,
    ];
  }
}
function sy(e, n) {
  const t = {};
  try {
    $g(n, r);
  } catch (i) {
    if (!e.ignoreInvalidStyle) {
      const l = i,
        o = new Te("Cannot parse `style` attribute", {
          ancestors: e.ancestors,
          cause: l,
          ruleId: "style",
          source: "hast-util-to-jsx-runtime",
        });
      throw (
        ((o.file = e.filePath || void 0),
        (o.url = td + "#cannot-parse-style-attribute"),
        o)
      );
    }
  }
  return t;
  function r(i, l) {
    let o = i;
    o.slice(0, 2) !== "--" &&
      (o.slice(0, 4) === "-ms-" && (o = "ms-" + o.slice(4)),
      (o = o.replace(Kg, fy))),
      (t[o] = l);
  }
}
function ld(e, n, t) {
  let r;
  if (!t) r = { type: "Literal", value: n };
  else if (n.includes(".")) {
    const i = n.split(".");
    let l = -1,
      o;
    for (; ++l < i.length; ) {
      const u = Ba(i[l])
        ? { type: "Identifier", name: i[l] }
        : { type: "Literal", value: i[l] };
      o = o
        ? {
            type: "MemberExpression",
            object: o,
            property: u,
            computed: !!(l && u.type === "Literal"),
            optional: !1,
          }
        : u;
    }
    r = o;
  } else
    r =
      Ba(n) && !/^[a-z]/.test(n)
        ? { type: "Identifier", name: n }
        : { type: "Literal", value: n };
  if (r.type === "Literal") {
    const i = r.value;
    return ds.call(e.components, i) ? e.components[i] : i;
  }
  if (e.evaluater) return e.evaluater.evaluateExpression(r);
  Yr(e);
}
function Yr(e, n) {
  const t = new Te("Cannot handle MDX estrees without `createEvaluater`", {
    ancestors: e.ancestors,
    place: n,
    ruleId: "mdx-estree",
    source: "hast-util-to-jsx-runtime",
  });
  throw (
    ((t.file = e.filePath || void 0),
    (t.url = td + "#cannot-handle-mdx-estrees-without-createevaluater"),
    t)
  );
}
function ay(e) {
  const n = {};
  let t;
  for (t in e) ds.call(e, t) && (n[cy(t)] = e[t]);
  return n;
}
function cy(e) {
  let n = e.replace(bg, py);
  return n.slice(0, 3) === "ms-" && (n = "-" + n), n;
}
function fy(e, n) {
  return n.toUpperCase();
}
function py(e) {
  return "-" + e.toLowerCase();
}
const to = {
    action: ["form"],
    cite: ["blockquote", "del", "ins", "q"],
    data: ["object"],
    formAction: ["button", "input"],
    href: ["a", "area", "base", "link"],
    icon: ["menuitem"],
    itemId: null,
    manifest: ["html"],
    ping: ["a", "area"],
    poster: ["video"],
    src: [
      "audio",
      "embed",
      "iframe",
      "img",
      "input",
      "script",
      "source",
      "track",
      "video",
    ],
  },
  dy = {};
function hy(e, n) {
  const t = n || dy,
    r = typeof t.includeImageAlt == "boolean" ? t.includeImageAlt : !0,
    i = typeof t.includeHtml == "boolean" ? t.includeHtml : !0;
  return od(e, r, i);
}
function od(e, n, t) {
  if (my(e)) {
    if ("value" in e) return e.type === "html" && !t ? "" : e.value;
    if (n && "alt" in e && e.alt) return e.alt;
    if ("children" in e) return qa(e.children, n, t);
  }
  return Array.isArray(e) ? qa(e, n, t) : "";
}
function qa(e, n, t) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) r[i] = od(e[i], n, t);
  return r.join("");
}
function my(e) {
  return !!(e && typeof e == "object");
}
const Ga = document.createElement("i");
function gs(e) {
  const n = "&" + e + ";";
  Ga.innerHTML = n;
  const t = Ga.textContent;
  return (t.charCodeAt(t.length - 1) === 59 && e !== "semi") || t === n
    ? !1
    : t;
}
function An(e, n, t, r) {
  const i = e.length;
  let l = 0,
    o;
  if (
    (n < 0 ? (n = -n > i ? 0 : i + n) : (n = n > i ? i : n),
    (t = t > 0 ? t : 0),
    r.length < 1e4)
  )
    (o = Array.from(r)), o.unshift(n, t), e.splice(...o);
  else
    for (t && e.splice(n, t); l < r.length; )
      (o = r.slice(l, l + 1e4)),
        o.unshift(n, 0),
        e.splice(...o),
        (l += 1e4),
        (n += 1e4);
}
function Je(e, n) {
  return e.length > 0 ? (An(e, e.length, 0, n), e) : n;
}
const Ja = {}.hasOwnProperty;
function gy(e) {
  const n = {};
  let t = -1;
  for (; ++t < e.length; ) yy(n, e[t]);
  return n;
}
function yy(e, n) {
  let t;
  for (t in n) {
    const i = (Ja.call(e, t) ? e[t] : void 0) || (e[t] = {}),
      l = n[t];
    let o;
    if (l)
      for (o in l) {
        Ja.call(i, o) || (i[o] = []);
        const u = l[o];
        vy(i[o], Array.isArray(u) ? u : u ? [u] : []);
      }
  }
}
function vy(e, n) {
  let t = -1;
  const r = [];
  for (; ++t < n.length; ) (n[t].add === "after" ? e : r).push(n[t]);
  An(e, 0, 0, r);
}
function ud(e, n) {
  const t = Number.parseInt(e, n);
  return t < 9 ||
    t === 11 ||
    (t > 13 && t < 32) ||
    (t > 126 && t < 160) ||
    (t > 55295 && t < 57344) ||
    (t > 64975 && t < 65008) ||
    (t & 65535) === 65535 ||
    (t & 65535) === 65534 ||
    t > 1114111
    ? "�"
    : String.fromCodePoint(t);
}
function Qt(e) {
  return e
    .replace(/[\t\n\r ]+/g, " ")
    .replace(/^ | $/g, "")
    .toLowerCase()
    .toUpperCase();
}
const kn = rt(/[A-Za-z]/),
  Qe = rt(/[\dA-Za-z]/),
  ky = rt(/[#-'*+\--9=?A-Z^-~]/);
function au(e) {
  return e !== null && (e < 32 || e === 127);
}
const cu = rt(/\d/),
  wy = rt(/[\dA-Fa-f]/),
  xy = rt(/[!-/:-@[-`{-~]/);
function B(e) {
  return e !== null && e < -2;
}
function Ue(e) {
  return e !== null && (e < 0 || e === 32);
}
function q(e) {
  return e === -2 || e === -1 || e === 32;
}
const Sy = rt(/\p{P}|\p{S}/u),
  Ey = rt(/\s/);
function rt(e) {
  return n;
  function n(t) {
    return t !== null && t > -1 && e.test(String.fromCharCode(t));
  }
}
function rr(e) {
  const n = [];
  let t = -1,
    r = 0,
    i = 0;
  for (; ++t < e.length; ) {
    const l = e.charCodeAt(t);
    let o = "";
    if (l === 37 && Qe(e.charCodeAt(t + 1)) && Qe(e.charCodeAt(t + 2))) i = 2;
    else if (l < 128)
      /[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(l)) ||
        (o = String.fromCharCode(l));
    else if (l > 55295 && l < 57344) {
      const u = e.charCodeAt(t + 1);
      l < 56320 && u > 56319 && u < 57344
        ? ((o = String.fromCharCode(l, u)), (i = 1))
        : (o = "�");
    } else o = String.fromCharCode(l);
    o &&
      (n.push(e.slice(r, t), encodeURIComponent(o)), (r = t + i + 1), (o = "")),
      i && ((t += i), (i = 0));
  }
  return n.join("") + e.slice(r);
}
function re(e, n, t, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let l = 0;
  return o;
  function o(s) {
    return q(s) ? (e.enter(t), u(s)) : n(s);
  }
  function u(s) {
    return q(s) && l++ < i ? (e.consume(s), u) : (e.exit(t), n(s));
  }
}
const Cy = { tokenize: Py };
function Py(e) {
  const n = e.attempt(this.parser.constructs.contentInitial, r, i);
  let t;
  return n;
  function r(u) {
    if (u === null) {
      e.consume(u);
      return;
    }
    return (
      e.enter("lineEnding"),
      e.consume(u),
      e.exit("lineEnding"),
      re(e, n, "linePrefix")
    );
  }
  function i(u) {
    return e.enter("paragraph"), l(u);
  }
  function l(u) {
    const s = e.enter("chunkText", { contentType: "text", previous: t });
    return t && (t.next = s), (t = s), o(u);
  }
  function o(u) {
    if (u === null) {
      e.exit("chunkText"), e.exit("paragraph"), e.consume(u);
      return;
    }
    return B(u) ? (e.consume(u), e.exit("chunkText"), l) : (e.consume(u), o);
  }
}
const _y = { tokenize: Ny },
  Za = { tokenize: Iy };
function Ny(e) {
  const n = this,
    t = [];
  let r = 0,
    i,
    l,
    o;
  return u;
  function u(y) {
    if (r < t.length) {
      const S = t[r];
      return (n.containerState = S[1]), e.attempt(S[0].continuation, s, a)(y);
    }
    return a(y);
  }
  function s(y) {
    if ((r++, n.containerState._closeFlow)) {
      (n.containerState._closeFlow = void 0), i && m();
      const S = n.events.length;
      let C = S,
        x;
      for (; C--; )
        if (n.events[C][0] === "exit" && n.events[C][1].type === "chunkFlow") {
          x = n.events[C][1].end;
          break;
        }
      h(r);
      let N = S;
      for (; N < n.events.length; )
        (n.events[N][1].end = Object.assign({}, x)), N++;
      return (
        An(n.events, C + 1, 0, n.events.slice(S)), (n.events.length = N), a(y)
      );
    }
    return u(y);
  }
  function a(y) {
    if (r === t.length) {
      if (!i) return d(y);
      if (i.currentConstruct && i.currentConstruct.concrete) return k(y);
      n.interrupt = !!(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return (n.containerState = {}), e.check(Za, c, f)(y);
  }
  function c(y) {
    return i && m(), h(r), d(y);
  }
  function f(y) {
    return (
      (n.parser.lazy[n.now().line] = r !== t.length), (o = n.now().offset), k(y)
    );
  }
  function d(y) {
    return (n.containerState = {}), e.attempt(Za, p, k)(y);
  }
  function p(y) {
    return r++, t.push([n.currentConstruct, n.containerState]), d(y);
  }
  function k(y) {
    if (y === null) {
      i && m(), h(0), e.consume(y);
      return;
    }
    return (
      (i = i || n.parser.flow(n.now())),
      e.enter("chunkFlow", { contentType: "flow", previous: l, _tokenizer: i }),
      w(y)
    );
  }
  function w(y) {
    if (y === null) {
      T(e.exit("chunkFlow"), !0), h(0), e.consume(y);
      return;
    }
    return B(y)
      ? (e.consume(y),
        T(e.exit("chunkFlow")),
        (r = 0),
        (n.interrupt = void 0),
        u)
      : (e.consume(y), w);
  }
  function T(y, S) {
    const C = n.sliceStream(y);
    if (
      (S && C.push(null),
      (y.previous = l),
      l && (l.next = y),
      (l = y),
      i.defineSkip(y.start),
      i.write(C),
      n.parser.lazy[y.start.line])
    ) {
      let x = i.events.length;
      for (; x--; )
        if (
          i.events[x][1].start.offset < o &&
          (!i.events[x][1].end || i.events[x][1].end.offset > o)
        )
          return;
      const N = n.events.length;
      let O = N,
        F,
        D;
      for (; O--; )
        if (n.events[O][0] === "exit" && n.events[O][1].type === "chunkFlow") {
          if (F) {
            D = n.events[O][1].end;
            break;
          }
          F = !0;
        }
      for (h(r), x = N; x < n.events.length; )
        (n.events[x][1].end = Object.assign({}, D)), x++;
      An(n.events, O + 1, 0, n.events.slice(N)), (n.events.length = x);
    }
  }
  function h(y) {
    let S = t.length;
    for (; S-- > y; ) {
      const C = t[S];
      (n.containerState = C[1]), C[0].exit.call(n, e);
    }
    t.length = y;
  }
  function m() {
    i.write([null]),
      (l = void 0),
      (i = void 0),
      (n.containerState._closeFlow = void 0);
  }
}
function Iy(e, n, t) {
  return re(
    e,
    e.attempt(this.parser.constructs.document, n, t),
    "linePrefix",
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
  );
}
function ec(e) {
  if (e === null || Ue(e) || Ey(e)) return 1;
  if (Sy(e)) return 2;
}
function ys(e, n, t) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const l = e[i].resolveAll;
    l && !r.includes(l) && ((n = l(n, t)), r.push(l));
  }
  return n;
}
const fu = { name: "attention", tokenize: zy, resolveAll: Ty };
function Ty(e, n) {
  let t = -1,
    r,
    i,
    l,
    o,
    u,
    s,
    a,
    c;
  for (; ++t < e.length; )
    if (
      e[t][0] === "enter" &&
      e[t][1].type === "attentionSequence" &&
      e[t][1]._close
    ) {
      for (r = t; r--; )
        if (
          e[r][0] === "exit" &&
          e[r][1].type === "attentionSequence" &&
          e[r][1]._open &&
          n.sliceSerialize(e[r][1]).charCodeAt(0) ===
            n.sliceSerialize(e[t][1]).charCodeAt(0)
        ) {
          if (
            (e[r][1]._close || e[t][1]._open) &&
            (e[t][1].end.offset - e[t][1].start.offset) % 3 &&
            !(
              (e[r][1].end.offset -
                e[r][1].start.offset +
                e[t][1].end.offset -
                e[t][1].start.offset) %
              3
            )
          )
            continue;
          s =
            e[r][1].end.offset - e[r][1].start.offset > 1 &&
            e[t][1].end.offset - e[t][1].start.offset > 1
              ? 2
              : 1;
          const f = Object.assign({}, e[r][1].end),
            d = Object.assign({}, e[t][1].start);
          nc(f, -s),
            nc(d, s),
            (o = {
              type: s > 1 ? "strongSequence" : "emphasisSequence",
              start: f,
              end: Object.assign({}, e[r][1].end),
            }),
            (u = {
              type: s > 1 ? "strongSequence" : "emphasisSequence",
              start: Object.assign({}, e[t][1].start),
              end: d,
            }),
            (l = {
              type: s > 1 ? "strongText" : "emphasisText",
              start: Object.assign({}, e[r][1].end),
              end: Object.assign({}, e[t][1].start),
            }),
            (i = {
              type: s > 1 ? "strong" : "emphasis",
              start: Object.assign({}, o.start),
              end: Object.assign({}, u.end),
            }),
            (e[r][1].end = Object.assign({}, o.start)),
            (e[t][1].start = Object.assign({}, u.end)),
            (a = []),
            e[r][1].end.offset - e[r][1].start.offset &&
              (a = Je(a, [
                ["enter", e[r][1], n],
                ["exit", e[r][1], n],
              ])),
            (a = Je(a, [
              ["enter", i, n],
              ["enter", o, n],
              ["exit", o, n],
              ["enter", l, n],
            ])),
            (a = Je(
              a,
              ys(n.parser.constructs.insideSpan.null, e.slice(r + 1, t), n)
            )),
            (a = Je(a, [
              ["exit", l, n],
              ["enter", u, n],
              ["exit", u, n],
              ["exit", i, n],
            ])),
            e[t][1].end.offset - e[t][1].start.offset
              ? ((c = 2),
                (a = Je(a, [
                  ["enter", e[t][1], n],
                  ["exit", e[t][1], n],
                ])))
              : (c = 0),
            An(e, r - 1, t - r + 3, a),
            (t = r + a.length - c - 2);
          break;
        }
    }
  for (t = -1; ++t < e.length; )
    e[t][1].type === "attentionSequence" && (e[t][1].type = "data");
  return e;
}
function zy(e, n) {
  const t = this.parser.constructs.attentionMarkers.null,
    r = this.previous,
    i = ec(r);
  let l;
  return o;
  function o(s) {
    return (l = s), e.enter("attentionSequence"), u(s);
  }
  function u(s) {
    if (s === l) return e.consume(s), u;
    const a = e.exit("attentionSequence"),
      c = ec(s),
      f = !c || (c === 2 && i) || t.includes(s),
      d = !i || (i === 2 && c) || t.includes(r);
    return (
      (a._open = !!(l === 42 ? f : f && (i || !d))),
      (a._close = !!(l === 42 ? d : d && (c || !f))),
      n(s)
    );
  }
}
function nc(e, n) {
  (e.column += n), (e.offset += n), (e._bufferIndex += n);
}
const Ly = { name: "autolink", tokenize: Oy };
function Oy(e, n, t) {
  let r = 0;
  return i;
  function i(p) {
    return (
      e.enter("autolink"),
      e.enter("autolinkMarker"),
      e.consume(p),
      e.exit("autolinkMarker"),
      e.enter("autolinkProtocol"),
      l
    );
  }
  function l(p) {
    return kn(p) ? (e.consume(p), o) : p === 64 ? t(p) : a(p);
  }
  function o(p) {
    return p === 43 || p === 45 || p === 46 || Qe(p) ? ((r = 1), u(p)) : a(p);
  }
  function u(p) {
    return p === 58
      ? (e.consume(p), (r = 0), s)
      : (p === 43 || p === 45 || p === 46 || Qe(p)) && r++ < 32
      ? (e.consume(p), u)
      : ((r = 0), a(p));
  }
  function s(p) {
    return p === 62
      ? (e.exit("autolinkProtocol"),
        e.enter("autolinkMarker"),
        e.consume(p),
        e.exit("autolinkMarker"),
        e.exit("autolink"),
        n)
      : p === null || p === 32 || p === 60 || au(p)
      ? t(p)
      : (e.consume(p), s);
  }
  function a(p) {
    return p === 64 ? (e.consume(p), c) : ky(p) ? (e.consume(p), a) : t(p);
  }
  function c(p) {
    return Qe(p) ? f(p) : t(p);
  }
  function f(p) {
    return p === 46
      ? (e.consume(p), (r = 0), c)
      : p === 62
      ? ((e.exit("autolinkProtocol").type = "autolinkEmail"),
        e.enter("autolinkMarker"),
        e.consume(p),
        e.exit("autolinkMarker"),
        e.exit("autolink"),
        n)
      : d(p);
  }
  function d(p) {
    if ((p === 45 || Qe(p)) && r++ < 63) {
      const k = p === 45 ? d : f;
      return e.consume(p), k;
    }
    return t(p);
  }
}
const _l = { tokenize: Ay, partial: !0 };
function Ay(e, n, t) {
  return r;
  function r(l) {
    return q(l) ? re(e, i, "linePrefix")(l) : i(l);
  }
  function i(l) {
    return l === null || B(l) ? n(l) : t(l);
  }
}
const sd = {
  name: "blockQuote",
  tokenize: Ry,
  continuation: { tokenize: Dy },
  exit: My,
};
function Ry(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    if (o === 62) {
      const u = r.containerState;
      return (
        u.open || (e.enter("blockQuote", { _container: !0 }), (u.open = !0)),
        e.enter("blockQuotePrefix"),
        e.enter("blockQuoteMarker"),
        e.consume(o),
        e.exit("blockQuoteMarker"),
        l
      );
    }
    return t(o);
  }
  function l(o) {
    return q(o)
      ? (e.enter("blockQuotePrefixWhitespace"),
        e.consume(o),
        e.exit("blockQuotePrefixWhitespace"),
        e.exit("blockQuotePrefix"),
        n)
      : (e.exit("blockQuotePrefix"), n(o));
  }
}
function Dy(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return q(o)
      ? re(
          e,
          l,
          "linePrefix",
          r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
        )(o)
      : l(o);
  }
  function l(o) {
    return e.attempt(sd, n, t)(o);
  }
}
function My(e) {
  e.exit("blockQuote");
}
const ad = { name: "characterEscape", tokenize: Fy };
function Fy(e, n, t) {
  return r;
  function r(l) {
    return (
      e.enter("characterEscape"),
      e.enter("escapeMarker"),
      e.consume(l),
      e.exit("escapeMarker"),
      i
    );
  }
  function i(l) {
    return xy(l)
      ? (e.enter("characterEscapeValue"),
        e.consume(l),
        e.exit("characterEscapeValue"),
        e.exit("characterEscape"),
        n)
      : t(l);
  }
}
const cd = { name: "characterReference", tokenize: jy };
function jy(e, n, t) {
  const r = this;
  let i = 0,
    l,
    o;
  return u;
  function u(f) {
    return (
      e.enter("characterReference"),
      e.enter("characterReferenceMarker"),
      e.consume(f),
      e.exit("characterReferenceMarker"),
      s
    );
  }
  function s(f) {
    return f === 35
      ? (e.enter("characterReferenceMarkerNumeric"),
        e.consume(f),
        e.exit("characterReferenceMarkerNumeric"),
        a)
      : (e.enter("characterReferenceValue"), (l = 31), (o = Qe), c(f));
  }
  function a(f) {
    return f === 88 || f === 120
      ? (e.enter("characterReferenceMarkerHexadecimal"),
        e.consume(f),
        e.exit("characterReferenceMarkerHexadecimal"),
        e.enter("characterReferenceValue"),
        (l = 6),
        (o = wy),
        c)
      : (e.enter("characterReferenceValue"), (l = 7), (o = cu), c(f));
  }
  function c(f) {
    if (f === 59 && i) {
      const d = e.exit("characterReferenceValue");
      return o === Qe && !gs(r.sliceSerialize(d))
        ? t(f)
        : (e.enter("characterReferenceMarker"),
          e.consume(f),
          e.exit("characterReferenceMarker"),
          e.exit("characterReference"),
          n);
    }
    return o(f) && i++ < l ? (e.consume(f), c) : t(f);
  }
}
const tc = { tokenize: Uy, partial: !0 },
  rc = { name: "codeFenced", tokenize: By, concrete: !0 };
function By(e, n, t) {
  const r = this,
    i = { tokenize: C, partial: !0 };
  let l = 0,
    o = 0,
    u;
  return s;
  function s(x) {
    return a(x);
  }
  function a(x) {
    const N = r.events[r.events.length - 1];
    return (
      (l =
        N && N[1].type === "linePrefix"
          ? N[2].sliceSerialize(N[1], !0).length
          : 0),
      (u = x),
      e.enter("codeFenced"),
      e.enter("codeFencedFence"),
      e.enter("codeFencedFenceSequence"),
      c(x)
    );
  }
  function c(x) {
    return x === u
      ? (o++, e.consume(x), c)
      : o < 3
      ? t(x)
      : (e.exit("codeFencedFenceSequence"),
        q(x) ? re(e, f, "whitespace")(x) : f(x));
  }
  function f(x) {
    return x === null || B(x)
      ? (e.exit("codeFencedFence"), r.interrupt ? n(x) : e.check(tc, w, S)(x))
      : (e.enter("codeFencedFenceInfo"),
        e.enter("chunkString", { contentType: "string" }),
        d(x));
  }
  function d(x) {
    return x === null || B(x)
      ? (e.exit("chunkString"), e.exit("codeFencedFenceInfo"), f(x))
      : q(x)
      ? (e.exit("chunkString"),
        e.exit("codeFencedFenceInfo"),
        re(e, p, "whitespace")(x))
      : x === 96 && x === u
      ? t(x)
      : (e.consume(x), d);
  }
  function p(x) {
    return x === null || B(x)
      ? f(x)
      : (e.enter("codeFencedFenceMeta"),
        e.enter("chunkString", { contentType: "string" }),
        k(x));
  }
  function k(x) {
    return x === null || B(x)
      ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), f(x))
      : x === 96 && x === u
      ? t(x)
      : (e.consume(x), k);
  }
  function w(x) {
    return e.attempt(i, S, T)(x);
  }
  function T(x) {
    return e.enter("lineEnding"), e.consume(x), e.exit("lineEnding"), h;
  }
  function h(x) {
    return l > 0 && q(x) ? re(e, m, "linePrefix", l + 1)(x) : m(x);
  }
  function m(x) {
    return x === null || B(x)
      ? e.check(tc, w, S)(x)
      : (e.enter("codeFlowValue"), y(x));
  }
  function y(x) {
    return x === null || B(x)
      ? (e.exit("codeFlowValue"), m(x))
      : (e.consume(x), y);
  }
  function S(x) {
    return e.exit("codeFenced"), n(x);
  }
  function C(x, N, O) {
    let F = 0;
    return D;
    function D(V) {
      return x.enter("lineEnding"), x.consume(V), x.exit("lineEnding"), L;
    }
    function L(V) {
      return (
        x.enter("codeFencedFence"),
        q(V)
          ? re(
              x,
              A,
              "linePrefix",
              r.parser.constructs.disable.null.includes("codeIndented")
                ? void 0
                : 4
            )(V)
          : A(V)
      );
    }
    function A(V) {
      return V === u ? (x.enter("codeFencedFenceSequence"), b(V)) : O(V);
    }
    function b(V) {
      return V === u
        ? (F++, x.consume(V), b)
        : F >= o
        ? (x.exit("codeFencedFenceSequence"),
          q(V) ? re(x, ee, "whitespace")(V) : ee(V))
        : O(V);
    }
    function ee(V) {
      return V === null || B(V) ? (x.exit("codeFencedFence"), N(V)) : O(V);
    }
  }
}
function Uy(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return o === null
      ? t(o)
      : (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), l);
  }
  function l(o) {
    return r.parser.lazy[r.now().line] ? t(o) : n(o);
  }
}
const ro = { name: "codeIndented", tokenize: Hy },
  Vy = { tokenize: $y, partial: !0 };
function Hy(e, n, t) {
  const r = this;
  return i;
  function i(a) {
    return e.enter("codeIndented"), re(e, l, "linePrefix", 4 + 1)(a);
  }
  function l(a) {
    const c = r.events[r.events.length - 1];
    return c &&
      c[1].type === "linePrefix" &&
      c[2].sliceSerialize(c[1], !0).length >= 4
      ? o(a)
      : t(a);
  }
  function o(a) {
    return a === null
      ? s(a)
      : B(a)
      ? e.attempt(Vy, o, s)(a)
      : (e.enter("codeFlowValue"), u(a));
  }
  function u(a) {
    return a === null || B(a)
      ? (e.exit("codeFlowValue"), o(a))
      : (e.consume(a), u);
  }
  function s(a) {
    return e.exit("codeIndented"), n(a);
  }
}
function $y(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return r.parser.lazy[r.now().line]
      ? t(o)
      : B(o)
      ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), i)
      : re(e, l, "linePrefix", 4 + 1)(o);
  }
  function l(o) {
    const u = r.events[r.events.length - 1];
    return u &&
      u[1].type === "linePrefix" &&
      u[2].sliceSerialize(u[1], !0).length >= 4
      ? n(o)
      : B(o)
      ? i(o)
      : t(o);
  }
}
const Wy = { name: "codeText", tokenize: Ky, resolve: Qy, previous: by };
function Qy(e) {
  let n = e.length - 4,
    t = 3,
    r,
    i;
  if (
    (e[t][1].type === "lineEnding" || e[t][1].type === "space") &&
    (e[n][1].type === "lineEnding" || e[n][1].type === "space")
  ) {
    for (r = t; ++r < n; )
      if (e[r][1].type === "codeTextData") {
        (e[t][1].type = "codeTextPadding"),
          (e[n][1].type = "codeTextPadding"),
          (t += 2),
          (n -= 2);
        break;
      }
  }
  for (r = t - 1, n++; ++r <= n; )
    i === void 0
      ? r !== n && e[r][1].type !== "lineEnding" && (i = r)
      : (r === n || e[r][1].type === "lineEnding") &&
        ((e[i][1].type = "codeTextData"),
        r !== i + 2 &&
          ((e[i][1].end = e[r - 1][1].end),
          e.splice(i + 2, r - i - 2),
          (n -= r - i - 2),
          (r = i + 2)),
        (i = void 0));
  return e;
}
function by(e) {
  return (
    e !== 96 ||
    this.events[this.events.length - 1][1].type === "characterEscape"
  );
}
function Ky(e, n, t) {
  let r = 0,
    i,
    l;
  return o;
  function o(f) {
    return e.enter("codeText"), e.enter("codeTextSequence"), u(f);
  }
  function u(f) {
    return f === 96
      ? (e.consume(f), r++, u)
      : (e.exit("codeTextSequence"), s(f));
  }
  function s(f) {
    return f === null
      ? t(f)
      : f === 32
      ? (e.enter("space"), e.consume(f), e.exit("space"), s)
      : f === 96
      ? ((l = e.enter("codeTextSequence")), (i = 0), c(f))
      : B(f)
      ? (e.enter("lineEnding"), e.consume(f), e.exit("lineEnding"), s)
      : (e.enter("codeTextData"), a(f));
  }
  function a(f) {
    return f === null || f === 32 || f === 96 || B(f)
      ? (e.exit("codeTextData"), s(f))
      : (e.consume(f), a);
  }
  function c(f) {
    return f === 96
      ? (e.consume(f), i++, c)
      : i === r
      ? (e.exit("codeTextSequence"), e.exit("codeText"), n(f))
      : ((l.type = "codeTextData"), a(f));
  }
}
class Yy {
  constructor(n) {
    (this.left = n ? [...n] : []), (this.right = []);
  }
  get(n) {
    if (n < 0 || n >= this.left.length + this.right.length)
      throw new RangeError(
        "Cannot access index `" +
          n +
          "` in a splice buffer of size `" +
          (this.left.length + this.right.length) +
          "`"
      );
    return n < this.left.length
      ? this.left[n]
      : this.right[this.right.length - n + this.left.length - 1];
  }
  get length() {
    return this.left.length + this.right.length;
  }
  shift() {
    return this.setCursor(0), this.right.pop();
  }
  slice(n, t) {
    const r = t ?? Number.POSITIVE_INFINITY;
    return r < this.left.length
      ? this.left.slice(n, r)
      : n > this.left.length
      ? this.right
          .slice(
            this.right.length - r + this.left.length,
            this.right.length - n + this.left.length
          )
          .reverse()
      : this.left
          .slice(n)
          .concat(
            this.right.slice(this.right.length - r + this.left.length).reverse()
          );
  }
  splice(n, t, r) {
    const i = t || 0;
    this.setCursor(Math.trunc(n));
    const l = this.right.splice(
      this.right.length - i,
      Number.POSITIVE_INFINITY
    );
    return r && hr(this.left, r), l.reverse();
  }
  pop() {
    return this.setCursor(Number.POSITIVE_INFINITY), this.left.pop();
  }
  push(n) {
    this.setCursor(Number.POSITIVE_INFINITY), this.left.push(n);
  }
  pushMany(n) {
    this.setCursor(Number.POSITIVE_INFINITY), hr(this.left, n);
  }
  unshift(n) {
    this.setCursor(0), this.right.push(n);
  }
  unshiftMany(n) {
    this.setCursor(0), hr(this.right, n.reverse());
  }
  setCursor(n) {
    if (
      !(
        n === this.left.length ||
        (n > this.left.length && this.right.length === 0) ||
        (n < 0 && this.left.length === 0)
      )
    )
      if (n < this.left.length) {
        const t = this.left.splice(n, Number.POSITIVE_INFINITY);
        hr(this.right, t.reverse());
      } else {
        const t = this.right.splice(
          this.left.length + this.right.length - n,
          Number.POSITIVE_INFINITY
        );
        hr(this.left, t.reverse());
      }
  }
}
function hr(e, n) {
  let t = 0;
  if (n.length < 1e4) e.push(...n);
  else for (; t < n.length; ) e.push(...n.slice(t, t + 1e4)), (t += 1e4);
}
function fd(e) {
  const n = {};
  let t = -1,
    r,
    i,
    l,
    o,
    u,
    s,
    a;
  const c = new Yy(e);
  for (; ++t < c.length; ) {
    for (; t in n; ) t = n[t];
    if (
      ((r = c.get(t)),
      t &&
        r[1].type === "chunkFlow" &&
        c.get(t - 1)[1].type === "listItemPrefix" &&
        ((s = r[1]._tokenizer.events),
        (l = 0),
        l < s.length && s[l][1].type === "lineEndingBlank" && (l += 2),
        l < s.length && s[l][1].type === "content"))
    )
      for (; ++l < s.length && s[l][1].type !== "content"; )
        s[l][1].type === "chunkText" &&
          ((s[l][1]._isInFirstContentOfListItem = !0), l++);
    if (r[0] === "enter")
      r[1].contentType && (Object.assign(n, Xy(c, t)), (t = n[t]), (a = !0));
    else if (r[1]._container) {
      for (
        l = t, i = void 0;
        l-- &&
        ((o = c.get(l)),
        o[1].type === "lineEnding" || o[1].type === "lineEndingBlank");

      )
        o[0] === "enter" &&
          (i && (c.get(i)[1].type = "lineEndingBlank"),
          (o[1].type = "lineEnding"),
          (i = l));
      i &&
        ((r[1].end = Object.assign({}, c.get(i)[1].start)),
        (u = c.slice(i, t)),
        u.unshift(r),
        c.splice(i, t - i + 1, u));
    }
  }
  return An(e, 0, Number.POSITIVE_INFINITY, c.slice(0)), !a;
}
function Xy(e, n) {
  const t = e.get(n)[1],
    r = e.get(n)[2];
  let i = n - 1;
  const l = [],
    o = t._tokenizer || r.parser[t.contentType](t.start),
    u = o.events,
    s = [],
    a = {};
  let c,
    f,
    d = -1,
    p = t,
    k = 0,
    w = 0;
  const T = [w];
  for (; p; ) {
    for (; e.get(++i)[1] !== p; );
    l.push(i),
      p._tokenizer ||
        ((c = r.sliceStream(p)),
        p.next || c.push(null),
        f && o.defineSkip(p.start),
        p._isInFirstContentOfListItem &&
          (o._gfmTasklistFirstContentOfListItem = !0),
        o.write(c),
        p._isInFirstContentOfListItem &&
          (o._gfmTasklistFirstContentOfListItem = void 0)),
      (f = p),
      (p = p.next);
  }
  for (p = t; ++d < u.length; )
    u[d][0] === "exit" &&
      u[d - 1][0] === "enter" &&
      u[d][1].type === u[d - 1][1].type &&
      u[d][1].start.line !== u[d][1].end.line &&
      ((w = d + 1),
      T.push(w),
      (p._tokenizer = void 0),
      (p.previous = void 0),
      (p = p.next));
  for (
    o.events = [],
      p ? ((p._tokenizer = void 0), (p.previous = void 0)) : T.pop(),
      d = T.length;
    d--;

  ) {
    const h = u.slice(T[d], T[d + 1]),
      m = l.pop();
    s.push([m, m + h.length - 1]), e.splice(m, 2, h);
  }
  for (s.reverse(), d = -1; ++d < s.length; )
    (a[k + s[d][0]] = k + s[d][1]), (k += s[d][1] - s[d][0] - 1);
  return a;
}
const qy = { tokenize: Zy, resolve: Jy },
  Gy = { tokenize: e1, partial: !0 };
function Jy(e) {
  return fd(e), e;
}
function Zy(e, n) {
  let t;
  return r;
  function r(u) {
    return (
      e.enter("content"),
      (t = e.enter("chunkContent", { contentType: "content" })),
      i(u)
    );
  }
  function i(u) {
    return u === null ? l(u) : B(u) ? e.check(Gy, o, l)(u) : (e.consume(u), i);
  }
  function l(u) {
    return e.exit("chunkContent"), e.exit("content"), n(u);
  }
  function o(u) {
    return (
      e.consume(u),
      e.exit("chunkContent"),
      (t.next = e.enter("chunkContent", {
        contentType: "content",
        previous: t,
      })),
      (t = t.next),
      i
    );
  }
}
function e1(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return (
      e.exit("chunkContent"),
      e.enter("lineEnding"),
      e.consume(o),
      e.exit("lineEnding"),
      re(e, l, "linePrefix")
    );
  }
  function l(o) {
    if (o === null || B(o)) return t(o);
    const u = r.events[r.events.length - 1];
    return !r.parser.constructs.disable.null.includes("codeIndented") &&
      u &&
      u[1].type === "linePrefix" &&
      u[2].sliceSerialize(u[1], !0).length >= 4
      ? n(o)
      : e.interrupt(r.parser.constructs.flow, t, n)(o);
  }
}
function pd(e, n, t, r, i, l, o, u, s) {
  const a = s || Number.POSITIVE_INFINITY;
  let c = 0;
  return f;
  function f(h) {
    return h === 60
      ? (e.enter(r), e.enter(i), e.enter(l), e.consume(h), e.exit(l), d)
      : h === null || h === 32 || h === 41 || au(h)
      ? t(h)
      : (e.enter(r),
        e.enter(o),
        e.enter(u),
        e.enter("chunkString", { contentType: "string" }),
        w(h));
  }
  function d(h) {
    return h === 62
      ? (e.enter(l), e.consume(h), e.exit(l), e.exit(i), e.exit(r), n)
      : (e.enter(u), e.enter("chunkString", { contentType: "string" }), p(h));
  }
  function p(h) {
    return h === 62
      ? (e.exit("chunkString"), e.exit(u), d(h))
      : h === null || h === 60 || B(h)
      ? t(h)
      : (e.consume(h), h === 92 ? k : p);
  }
  function k(h) {
    return h === 60 || h === 62 || h === 92 ? (e.consume(h), p) : p(h);
  }
  function w(h) {
    return !c && (h === null || h === 41 || Ue(h))
      ? (e.exit("chunkString"), e.exit(u), e.exit(o), e.exit(r), n(h))
      : c < a && h === 40
      ? (e.consume(h), c++, w)
      : h === 41
      ? (e.consume(h), c--, w)
      : h === null || h === 32 || h === 40 || au(h)
      ? t(h)
      : (e.consume(h), h === 92 ? T : w);
  }
  function T(h) {
    return h === 40 || h === 41 || h === 92 ? (e.consume(h), w) : w(h);
  }
}
function dd(e, n, t, r, i, l) {
  const o = this;
  let u = 0,
    s;
  return a;
  function a(p) {
    return e.enter(r), e.enter(i), e.consume(p), e.exit(i), e.enter(l), c;
  }
  function c(p) {
    return u > 999 ||
      p === null ||
      p === 91 ||
      (p === 93 && !s) ||
      (p === 94 && !u && "_hiddenFootnoteSupport" in o.parser.constructs)
      ? t(p)
      : p === 93
      ? (e.exit(l), e.enter(i), e.consume(p), e.exit(i), e.exit(r), n)
      : B(p)
      ? (e.enter("lineEnding"), e.consume(p), e.exit("lineEnding"), c)
      : (e.enter("chunkString", { contentType: "string" }), f(p));
  }
  function f(p) {
    return p === null || p === 91 || p === 93 || B(p) || u++ > 999
      ? (e.exit("chunkString"), c(p))
      : (e.consume(p), s || (s = !q(p)), p === 92 ? d : f);
  }
  function d(p) {
    return p === 91 || p === 92 || p === 93 ? (e.consume(p), u++, f) : f(p);
  }
}
function hd(e, n, t, r, i, l) {
  let o;
  return u;
  function u(d) {
    return d === 34 || d === 39 || d === 40
      ? (e.enter(r),
        e.enter(i),
        e.consume(d),
        e.exit(i),
        (o = d === 40 ? 41 : d),
        s)
      : t(d);
  }
  function s(d) {
    return d === o
      ? (e.enter(i), e.consume(d), e.exit(i), e.exit(r), n)
      : (e.enter(l), a(d));
  }
  function a(d) {
    return d === o
      ? (e.exit(l), s(o))
      : d === null
      ? t(d)
      : B(d)
      ? (e.enter("lineEnding"),
        e.consume(d),
        e.exit("lineEnding"),
        re(e, a, "linePrefix"))
      : (e.enter("chunkString", { contentType: "string" }), c(d));
  }
  function c(d) {
    return d === o || d === null || B(d)
      ? (e.exit("chunkString"), a(d))
      : (e.consume(d), d === 92 ? f : c);
  }
  function f(d) {
    return d === o || d === 92 ? (e.consume(d), c) : c(d);
  }
}
function zr(e, n) {
  let t;
  return r;
  function r(i) {
    return B(i)
      ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), (t = !0), r)
      : q(i)
      ? re(e, r, t ? "linePrefix" : "lineSuffix")(i)
      : n(i);
  }
}
const n1 = { name: "definition", tokenize: r1 },
  t1 = { tokenize: i1, partial: !0 };
function r1(e, n, t) {
  const r = this;
  let i;
  return l;
  function l(p) {
    return e.enter("definition"), o(p);
  }
  function o(p) {
    return dd.call(
      r,
      e,
      u,
      t,
      "definitionLabel",
      "definitionLabelMarker",
      "definitionLabelString"
    )(p);
  }
  function u(p) {
    return (
      (i = Qt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))),
      p === 58
        ? (e.enter("definitionMarker"),
          e.consume(p),
          e.exit("definitionMarker"),
          s)
        : t(p)
    );
  }
  function s(p) {
    return Ue(p) ? zr(e, a)(p) : a(p);
  }
  function a(p) {
    return pd(
      e,
      c,
      t,
      "definitionDestination",
      "definitionDestinationLiteral",
      "definitionDestinationLiteralMarker",
      "definitionDestinationRaw",
      "definitionDestinationString"
    )(p);
  }
  function c(p) {
    return e.attempt(t1, f, f)(p);
  }
  function f(p) {
    return q(p) ? re(e, d, "whitespace")(p) : d(p);
  }
  function d(p) {
    return p === null || B(p)
      ? (e.exit("definition"), r.parser.defined.push(i), n(p))
      : t(p);
  }
}
function i1(e, n, t) {
  return r;
  function r(u) {
    return Ue(u) ? zr(e, i)(u) : t(u);
  }
  function i(u) {
    return hd(
      e,
      l,
      t,
      "definitionTitle",
      "definitionTitleMarker",
      "definitionTitleString"
    )(u);
  }
  function l(u) {
    return q(u) ? re(e, o, "whitespace")(u) : o(u);
  }
  function o(u) {
    return u === null || B(u) ? n(u) : t(u);
  }
}
const l1 = { name: "hardBreakEscape", tokenize: o1 };
function o1(e, n, t) {
  return r;
  function r(l) {
    return e.enter("hardBreakEscape"), e.consume(l), i;
  }
  function i(l) {
    return B(l) ? (e.exit("hardBreakEscape"), n(l)) : t(l);
  }
}
const u1 = { name: "headingAtx", tokenize: a1, resolve: s1 };
function s1(e, n) {
  let t = e.length - 2,
    r = 3,
    i,
    l;
  return (
    e[r][1].type === "whitespace" && (r += 2),
    t - 2 > r && e[t][1].type === "whitespace" && (t -= 2),
    e[t][1].type === "atxHeadingSequence" &&
      (r === t - 1 || (t - 4 > r && e[t - 2][1].type === "whitespace")) &&
      (t -= r + 1 === t ? 2 : 4),
    t > r &&
      ((i = { type: "atxHeadingText", start: e[r][1].start, end: e[t][1].end }),
      (l = {
        type: "chunkText",
        start: e[r][1].start,
        end: e[t][1].end,
        contentType: "text",
      }),
      An(e, r, t - r + 1, [
        ["enter", i, n],
        ["enter", l, n],
        ["exit", l, n],
        ["exit", i, n],
      ])),
    e
  );
}
function a1(e, n, t) {
  let r = 0;
  return i;
  function i(c) {
    return e.enter("atxHeading"), l(c);
  }
  function l(c) {
    return e.enter("atxHeadingSequence"), o(c);
  }
  function o(c) {
    return c === 35 && r++ < 6
      ? (e.consume(c), o)
      : c === null || Ue(c)
      ? (e.exit("atxHeadingSequence"), u(c))
      : t(c);
  }
  function u(c) {
    return c === 35
      ? (e.enter("atxHeadingSequence"), s(c))
      : c === null || B(c)
      ? (e.exit("atxHeading"), n(c))
      : q(c)
      ? re(e, u, "whitespace")(c)
      : (e.enter("atxHeadingText"), a(c));
  }
  function s(c) {
    return c === 35 ? (e.consume(c), s) : (e.exit("atxHeadingSequence"), u(c));
  }
  function a(c) {
    return c === null || c === 35 || Ue(c)
      ? (e.exit("atxHeadingText"), u(c))
      : (e.consume(c), a);
  }
}
const c1 = [
    "address",
    "article",
    "aside",
    "base",
    "basefont",
    "blockquote",
    "body",
    "caption",
    "center",
    "col",
    "colgroup",
    "dd",
    "details",
    "dialog",
    "dir",
    "div",
    "dl",
    "dt",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "frame",
    "frameset",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hr",
    "html",
    "iframe",
    "legend",
    "li",
    "link",
    "main",
    "menu",
    "menuitem",
    "nav",
    "noframes",
    "ol",
    "optgroup",
    "option",
    "p",
    "param",
    "search",
    "section",
    "summary",
    "table",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "title",
    "tr",
    "track",
    "ul",
  ],
  ic = ["pre", "script", "style", "textarea"],
  f1 = { name: "htmlFlow", tokenize: m1, resolveTo: h1, concrete: !0 },
  p1 = { tokenize: y1, partial: !0 },
  d1 = { tokenize: g1, partial: !0 };
function h1(e) {
  let n = e.length;
  for (; n-- && !(e[n][0] === "enter" && e[n][1].type === "htmlFlow"); );
  return (
    n > 1 &&
      e[n - 2][1].type === "linePrefix" &&
      ((e[n][1].start = e[n - 2][1].start),
      (e[n + 1][1].start = e[n - 2][1].start),
      e.splice(n - 2, 2)),
    e
  );
}
function m1(e, n, t) {
  const r = this;
  let i, l, o, u, s;
  return a;
  function a(v) {
    return c(v);
  }
  function c(v) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(v), f;
  }
  function f(v) {
    return v === 33
      ? (e.consume(v), d)
      : v === 47
      ? (e.consume(v), (l = !0), w)
      : v === 63
      ? (e.consume(v), (i = 3), r.interrupt ? n : g)
      : kn(v)
      ? (e.consume(v), (o = String.fromCharCode(v)), T)
      : t(v);
  }
  function d(v) {
    return v === 45
      ? (e.consume(v), (i = 2), p)
      : v === 91
      ? (e.consume(v), (i = 5), (u = 0), k)
      : kn(v)
      ? (e.consume(v), (i = 4), r.interrupt ? n : g)
      : t(v);
  }
  function p(v) {
    return v === 45 ? (e.consume(v), r.interrupt ? n : g) : t(v);
  }
  function k(v) {
    const ge = "CDATA[";
    return v === ge.charCodeAt(u++)
      ? (e.consume(v), u === ge.length ? (r.interrupt ? n : A) : k)
      : t(v);
  }
  function w(v) {
    return kn(v) ? (e.consume(v), (o = String.fromCharCode(v)), T) : t(v);
  }
  function T(v) {
    if (v === null || v === 47 || v === 62 || Ue(v)) {
      const ge = v === 47,
        ln = o.toLowerCase();
      return !ge && !l && ic.includes(ln)
        ? ((i = 1), r.interrupt ? n(v) : A(v))
        : c1.includes(o.toLowerCase())
        ? ((i = 6), ge ? (e.consume(v), h) : r.interrupt ? n(v) : A(v))
        : ((i = 7),
          r.interrupt && !r.parser.lazy[r.now().line] ? t(v) : l ? m(v) : y(v));
    }
    return v === 45 || Qe(v)
      ? (e.consume(v), (o += String.fromCharCode(v)), T)
      : t(v);
  }
  function h(v) {
    return v === 62 ? (e.consume(v), r.interrupt ? n : A) : t(v);
  }
  function m(v) {
    return q(v) ? (e.consume(v), m) : D(v);
  }
  function y(v) {
    return v === 47
      ? (e.consume(v), D)
      : v === 58 || v === 95 || kn(v)
      ? (e.consume(v), S)
      : q(v)
      ? (e.consume(v), y)
      : D(v);
  }
  function S(v) {
    return v === 45 || v === 46 || v === 58 || v === 95 || Qe(v)
      ? (e.consume(v), S)
      : C(v);
  }
  function C(v) {
    return v === 61 ? (e.consume(v), x) : q(v) ? (e.consume(v), C) : y(v);
  }
  function x(v) {
    return v === null || v === 60 || v === 61 || v === 62 || v === 96
      ? t(v)
      : v === 34 || v === 39
      ? (e.consume(v), (s = v), N)
      : q(v)
      ? (e.consume(v), x)
      : O(v);
  }
  function N(v) {
    return v === s
      ? (e.consume(v), (s = null), F)
      : v === null || B(v)
      ? t(v)
      : (e.consume(v), N);
  }
  function O(v) {
    return v === null ||
      v === 34 ||
      v === 39 ||
      v === 47 ||
      v === 60 ||
      v === 61 ||
      v === 62 ||
      v === 96 ||
      Ue(v)
      ? C(v)
      : (e.consume(v), O);
  }
  function F(v) {
    return v === 47 || v === 62 || q(v) ? y(v) : t(v);
  }
  function D(v) {
    return v === 62 ? (e.consume(v), L) : t(v);
  }
  function L(v) {
    return v === null || B(v) ? A(v) : q(v) ? (e.consume(v), L) : t(v);
  }
  function A(v) {
    return v === 45 && i === 2
      ? (e.consume(v), M)
      : v === 60 && i === 1
      ? (e.consume(v), H)
      : v === 62 && i === 4
      ? (e.consume(v), K)
      : v === 63 && i === 3
      ? (e.consume(v), g)
      : v === 93 && i === 5
      ? (e.consume(v), j)
      : B(v) && (i === 6 || i === 7)
      ? (e.exit("htmlFlowData"), e.check(p1, J, b)(v))
      : v === null || B(v)
      ? (e.exit("htmlFlowData"), b(v))
      : (e.consume(v), A);
  }
  function b(v) {
    return e.check(d1, ee, J)(v);
  }
  function ee(v) {
    return e.enter("lineEnding"), e.consume(v), e.exit("lineEnding"), V;
  }
  function V(v) {
    return v === null || B(v) ? b(v) : (e.enter("htmlFlowData"), A(v));
  }
  function M(v) {
    return v === 45 ? (e.consume(v), g) : A(v);
  }
  function H(v) {
    return v === 47 ? (e.consume(v), (o = ""), P) : A(v);
  }
  function P(v) {
    if (v === 62) {
      const ge = o.toLowerCase();
      return ic.includes(ge) ? (e.consume(v), K) : A(v);
    }
    return kn(v) && o.length < 8
      ? (e.consume(v), (o += String.fromCharCode(v)), P)
      : A(v);
  }
  function j(v) {
    return v === 93 ? (e.consume(v), g) : A(v);
  }
  function g(v) {
    return v === 62
      ? (e.consume(v), K)
      : v === 45 && i === 2
      ? (e.consume(v), g)
      : A(v);
  }
  function K(v) {
    return v === null || B(v)
      ? (e.exit("htmlFlowData"), J(v))
      : (e.consume(v), K);
  }
  function J(v) {
    return e.exit("htmlFlow"), n(v);
  }
}
function g1(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return B(o)
      ? (e.enter("lineEnding"), e.consume(o), e.exit("lineEnding"), l)
      : t(o);
  }
  function l(o) {
    return r.parser.lazy[r.now().line] ? t(o) : n(o);
  }
}
function y1(e, n, t) {
  return r;
  function r(i) {
    return (
      e.enter("lineEnding"),
      e.consume(i),
      e.exit("lineEnding"),
      e.attempt(_l, n, t)
    );
  }
}
const v1 = { name: "htmlText", tokenize: k1 };
function k1(e, n, t) {
  const r = this;
  let i, l, o;
  return u;
  function u(g) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(g), s;
  }
  function s(g) {
    return g === 33
      ? (e.consume(g), a)
      : g === 47
      ? (e.consume(g), C)
      : g === 63
      ? (e.consume(g), y)
      : kn(g)
      ? (e.consume(g), O)
      : t(g);
  }
  function a(g) {
    return g === 45
      ? (e.consume(g), c)
      : g === 91
      ? (e.consume(g), (l = 0), k)
      : kn(g)
      ? (e.consume(g), m)
      : t(g);
  }
  function c(g) {
    return g === 45 ? (e.consume(g), p) : t(g);
  }
  function f(g) {
    return g === null
      ? t(g)
      : g === 45
      ? (e.consume(g), d)
      : B(g)
      ? ((o = f), H(g))
      : (e.consume(g), f);
  }
  function d(g) {
    return g === 45 ? (e.consume(g), p) : f(g);
  }
  function p(g) {
    return g === 62 ? M(g) : g === 45 ? d(g) : f(g);
  }
  function k(g) {
    const K = "CDATA[";
    return g === K.charCodeAt(l++)
      ? (e.consume(g), l === K.length ? w : k)
      : t(g);
  }
  function w(g) {
    return g === null
      ? t(g)
      : g === 93
      ? (e.consume(g), T)
      : B(g)
      ? ((o = w), H(g))
      : (e.consume(g), w);
  }
  function T(g) {
    return g === 93 ? (e.consume(g), h) : w(g);
  }
  function h(g) {
    return g === 62 ? M(g) : g === 93 ? (e.consume(g), h) : w(g);
  }
  function m(g) {
    return g === null || g === 62
      ? M(g)
      : B(g)
      ? ((o = m), H(g))
      : (e.consume(g), m);
  }
  function y(g) {
    return g === null
      ? t(g)
      : g === 63
      ? (e.consume(g), S)
      : B(g)
      ? ((o = y), H(g))
      : (e.consume(g), y);
  }
  function S(g) {
    return g === 62 ? M(g) : y(g);
  }
  function C(g) {
    return kn(g) ? (e.consume(g), x) : t(g);
  }
  function x(g) {
    return g === 45 || Qe(g) ? (e.consume(g), x) : N(g);
  }
  function N(g) {
    return B(g) ? ((o = N), H(g)) : q(g) ? (e.consume(g), N) : M(g);
  }
  function O(g) {
    return g === 45 || Qe(g)
      ? (e.consume(g), O)
      : g === 47 || g === 62 || Ue(g)
      ? F(g)
      : t(g);
  }
  function F(g) {
    return g === 47
      ? (e.consume(g), M)
      : g === 58 || g === 95 || kn(g)
      ? (e.consume(g), D)
      : B(g)
      ? ((o = F), H(g))
      : q(g)
      ? (e.consume(g), F)
      : M(g);
  }
  function D(g) {
    return g === 45 || g === 46 || g === 58 || g === 95 || Qe(g)
      ? (e.consume(g), D)
      : L(g);
  }
  function L(g) {
    return g === 61
      ? (e.consume(g), A)
      : B(g)
      ? ((o = L), H(g))
      : q(g)
      ? (e.consume(g), L)
      : F(g);
  }
  function A(g) {
    return g === null || g === 60 || g === 61 || g === 62 || g === 96
      ? t(g)
      : g === 34 || g === 39
      ? (e.consume(g), (i = g), b)
      : B(g)
      ? ((o = A), H(g))
      : q(g)
      ? (e.consume(g), A)
      : (e.consume(g), ee);
  }
  function b(g) {
    return g === i
      ? (e.consume(g), (i = void 0), V)
      : g === null
      ? t(g)
      : B(g)
      ? ((o = b), H(g))
      : (e.consume(g), b);
  }
  function ee(g) {
    return g === null ||
      g === 34 ||
      g === 39 ||
      g === 60 ||
      g === 61 ||
      g === 96
      ? t(g)
      : g === 47 || g === 62 || Ue(g)
      ? F(g)
      : (e.consume(g), ee);
  }
  function V(g) {
    return g === 47 || g === 62 || Ue(g) ? F(g) : t(g);
  }
  function M(g) {
    return g === 62
      ? (e.consume(g), e.exit("htmlTextData"), e.exit("htmlText"), n)
      : t(g);
  }
  function H(g) {
    return (
      e.exit("htmlTextData"),
      e.enter("lineEnding"),
      e.consume(g),
      e.exit("lineEnding"),
      P
    );
  }
  function P(g) {
    return q(g)
      ? re(
          e,
          j,
          "linePrefix",
          r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
        )(g)
      : j(g);
  }
  function j(g) {
    return e.enter("htmlTextData"), o(g);
  }
}
const vs = { name: "labelEnd", tokenize: P1, resolveTo: C1, resolveAll: E1 },
  w1 = { tokenize: _1 },
  x1 = { tokenize: N1 },
  S1 = { tokenize: I1 };
function E1(e) {
  let n = -1;
  for (; ++n < e.length; ) {
    const t = e[n][1];
    (t.type === "labelImage" ||
      t.type === "labelLink" ||
      t.type === "labelEnd") &&
      (e.splice(n + 1, t.type === "labelImage" ? 4 : 2),
      (t.type = "data"),
      n++);
  }
  return e;
}
function C1(e, n) {
  let t = e.length,
    r = 0,
    i,
    l,
    o,
    u;
  for (; t--; )
    if (((i = e[t][1]), l)) {
      if (i.type === "link" || (i.type === "labelLink" && i._inactive)) break;
      e[t][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
    } else if (o) {
      if (
        e[t][0] === "enter" &&
        (i.type === "labelImage" || i.type === "labelLink") &&
        !i._balanced &&
        ((l = t), i.type !== "labelLink")
      ) {
        r = 2;
        break;
      }
    } else i.type === "labelEnd" && (o = t);
  const s = {
      type: e[l][1].type === "labelLink" ? "link" : "image",
      start: Object.assign({}, e[l][1].start),
      end: Object.assign({}, e[e.length - 1][1].end),
    },
    a = {
      type: "label",
      start: Object.assign({}, e[l][1].start),
      end: Object.assign({}, e[o][1].end),
    },
    c = {
      type: "labelText",
      start: Object.assign({}, e[l + r + 2][1].end),
      end: Object.assign({}, e[o - 2][1].start),
    };
  return (
    (u = [
      ["enter", s, n],
      ["enter", a, n],
    ]),
    (u = Je(u, e.slice(l + 1, l + r + 3))),
    (u = Je(u, [["enter", c, n]])),
    (u = Je(
      u,
      ys(n.parser.constructs.insideSpan.null, e.slice(l + r + 4, o - 3), n)
    )),
    (u = Je(u, [["exit", c, n], e[o - 2], e[o - 1], ["exit", a, n]])),
    (u = Je(u, e.slice(o + 1))),
    (u = Je(u, [["exit", s, n]])),
    An(e, l, e.length, u),
    e
  );
}
function P1(e, n, t) {
  const r = this;
  let i = r.events.length,
    l,
    o;
  for (; i--; )
    if (
      (r.events[i][1].type === "labelImage" ||
        r.events[i][1].type === "labelLink") &&
      !r.events[i][1]._balanced
    ) {
      l = r.events[i][1];
      break;
    }
  return u;
  function u(d) {
    return l
      ? l._inactive
        ? f(d)
        : ((o = r.parser.defined.includes(
            Qt(r.sliceSerialize({ start: l.end, end: r.now() }))
          )),
          e.enter("labelEnd"),
          e.enter("labelMarker"),
          e.consume(d),
          e.exit("labelMarker"),
          e.exit("labelEnd"),
          s)
      : t(d);
  }
  function s(d) {
    return d === 40
      ? e.attempt(w1, c, o ? c : f)(d)
      : d === 91
      ? e.attempt(x1, c, o ? a : f)(d)
      : o
      ? c(d)
      : f(d);
  }
  function a(d) {
    return e.attempt(S1, c, f)(d);
  }
  function c(d) {
    return n(d);
  }
  function f(d) {
    return (l._balanced = !0), t(d);
  }
}
function _1(e, n, t) {
  return r;
  function r(f) {
    return (
      e.enter("resource"),
      e.enter("resourceMarker"),
      e.consume(f),
      e.exit("resourceMarker"),
      i
    );
  }
  function i(f) {
    return Ue(f) ? zr(e, l)(f) : l(f);
  }
  function l(f) {
    return f === 41
      ? c(f)
      : pd(
          e,
          o,
          u,
          "resourceDestination",
          "resourceDestinationLiteral",
          "resourceDestinationLiteralMarker",
          "resourceDestinationRaw",
          "resourceDestinationString",
          32
        )(f);
  }
  function o(f) {
    return Ue(f) ? zr(e, s)(f) : c(f);
  }
  function u(f) {
    return t(f);
  }
  function s(f) {
    return f === 34 || f === 39 || f === 40
      ? hd(
          e,
          a,
          t,
          "resourceTitle",
          "resourceTitleMarker",
          "resourceTitleString"
        )(f)
      : c(f);
  }
  function a(f) {
    return Ue(f) ? zr(e, c)(f) : c(f);
  }
  function c(f) {
    return f === 41
      ? (e.enter("resourceMarker"),
        e.consume(f),
        e.exit("resourceMarker"),
        e.exit("resource"),
        n)
      : t(f);
  }
}
function N1(e, n, t) {
  const r = this;
  return i;
  function i(u) {
    return dd.call(
      r,
      e,
      l,
      o,
      "reference",
      "referenceMarker",
      "referenceString"
    )(u);
  }
  function l(u) {
    return r.parser.defined.includes(
      Qt(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))
    )
      ? n(u)
      : t(u);
  }
  function o(u) {
    return t(u);
  }
}
function I1(e, n, t) {
  return r;
  function r(l) {
    return (
      e.enter("reference"),
      e.enter("referenceMarker"),
      e.consume(l),
      e.exit("referenceMarker"),
      i
    );
  }
  function i(l) {
    return l === 93
      ? (e.enter("referenceMarker"),
        e.consume(l),
        e.exit("referenceMarker"),
        e.exit("reference"),
        n)
      : t(l);
  }
}
const T1 = { name: "labelStartImage", tokenize: z1, resolveAll: vs.resolveAll };
function z1(e, n, t) {
  const r = this;
  return i;
  function i(u) {
    return (
      e.enter("labelImage"),
      e.enter("labelImageMarker"),
      e.consume(u),
      e.exit("labelImageMarker"),
      l
    );
  }
  function l(u) {
    return u === 91
      ? (e.enter("labelMarker"),
        e.consume(u),
        e.exit("labelMarker"),
        e.exit("labelImage"),
        o)
      : t(u);
  }
  function o(u) {
    return u === 94 && "_hiddenFootnoteSupport" in r.parser.constructs
      ? t(u)
      : n(u);
  }
}
const L1 = { name: "labelStartLink", tokenize: O1, resolveAll: vs.resolveAll };
function O1(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return (
      e.enter("labelLink"),
      e.enter("labelMarker"),
      e.consume(o),
      e.exit("labelMarker"),
      e.exit("labelLink"),
      l
    );
  }
  function l(o) {
    return o === 94 && "_hiddenFootnoteSupport" in r.parser.constructs
      ? t(o)
      : n(o);
  }
}
const io = { name: "lineEnding", tokenize: A1 };
function A1(e, n) {
  return t;
  function t(r) {
    return (
      e.enter("lineEnding"),
      e.consume(r),
      e.exit("lineEnding"),
      re(e, n, "linePrefix")
    );
  }
}
const Di = { name: "thematicBreak", tokenize: R1 };
function R1(e, n, t) {
  let r = 0,
    i;
  return l;
  function l(a) {
    return e.enter("thematicBreak"), o(a);
  }
  function o(a) {
    return (i = a), u(a);
  }
  function u(a) {
    return a === i
      ? (e.enter("thematicBreakSequence"), s(a))
      : r >= 3 && (a === null || B(a))
      ? (e.exit("thematicBreak"), n(a))
      : t(a);
  }
  function s(a) {
    return a === i
      ? (e.consume(a), r++, s)
      : (e.exit("thematicBreakSequence"),
        q(a) ? re(e, u, "whitespace")(a) : u(a));
  }
}
const Re = {
    name: "list",
    tokenize: F1,
    continuation: { tokenize: j1 },
    exit: U1,
  },
  D1 = { tokenize: V1, partial: !0 },
  M1 = { tokenize: B1, partial: !0 };
function F1(e, n, t) {
  const r = this,
    i = r.events[r.events.length - 1];
  let l =
      i && i[1].type === "linePrefix"
        ? i[2].sliceSerialize(i[1], !0).length
        : 0,
    o = 0;
  return u;
  function u(p) {
    const k =
      r.containerState.type ||
      (p === 42 || p === 43 || p === 45 ? "listUnordered" : "listOrdered");
    if (
      k === "listUnordered"
        ? !r.containerState.marker || p === r.containerState.marker
        : cu(p)
    ) {
      if (
        (r.containerState.type ||
          ((r.containerState.type = k), e.enter(k, { _container: !0 })),
        k === "listUnordered")
      )
        return (
          e.enter("listItemPrefix"),
          p === 42 || p === 45 ? e.check(Di, t, a)(p) : a(p)
        );
      if (!r.interrupt || p === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), s(p);
    }
    return t(p);
  }
  function s(p) {
    return cu(p) && ++o < 10
      ? (e.consume(p), s)
      : (!r.interrupt || o < 2) &&
        (r.containerState.marker
          ? p === r.containerState.marker
          : p === 41 || p === 46)
      ? (e.exit("listItemValue"), a(p))
      : t(p);
  }
  function a(p) {
    return (
      e.enter("listItemMarker"),
      e.consume(p),
      e.exit("listItemMarker"),
      (r.containerState.marker = r.containerState.marker || p),
      e.check(_l, r.interrupt ? t : c, e.attempt(D1, d, f))
    );
  }
  function c(p) {
    return (r.containerState.initialBlankLine = !0), l++, d(p);
  }
  function f(p) {
    return q(p)
      ? (e.enter("listItemPrefixWhitespace"),
        e.consume(p),
        e.exit("listItemPrefixWhitespace"),
        d)
      : t(p);
  }
  function d(p) {
    return (
      (r.containerState.size =
        l + r.sliceSerialize(e.exit("listItemPrefix"), !0).length),
      n(p)
    );
  }
}
function j1(e, n, t) {
  const r = this;
  return (r.containerState._closeFlow = void 0), e.check(_l, i, l);
  function i(u) {
    return (
      (r.containerState.furtherBlankLines =
        r.containerState.furtherBlankLines ||
        r.containerState.initialBlankLine),
      re(e, n, "listItemIndent", r.containerState.size + 1)(u)
    );
  }
  function l(u) {
    return r.containerState.furtherBlankLines || !q(u)
      ? ((r.containerState.furtherBlankLines = void 0),
        (r.containerState.initialBlankLine = void 0),
        o(u))
      : ((r.containerState.furtherBlankLines = void 0),
        (r.containerState.initialBlankLine = void 0),
        e.attempt(M1, n, o)(u));
  }
  function o(u) {
    return (
      (r.containerState._closeFlow = !0),
      (r.interrupt = void 0),
      re(
        e,
        e.attempt(Re, n, t),
        "linePrefix",
        r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
      )(u)
    );
  }
}
function B1(e, n, t) {
  const r = this;
  return re(e, i, "listItemIndent", r.containerState.size + 1);
  function i(l) {
    const o = r.events[r.events.length - 1];
    return o &&
      o[1].type === "listItemIndent" &&
      o[2].sliceSerialize(o[1], !0).length === r.containerState.size
      ? n(l)
      : t(l);
  }
}
function U1(e) {
  e.exit(this.containerState.type);
}
function V1(e, n, t) {
  const r = this;
  return re(
    e,
    i,
    "listItemPrefixWhitespace",
    r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4 + 1
  );
  function i(l) {
    const o = r.events[r.events.length - 1];
    return !q(l) && o && o[1].type === "listItemPrefixWhitespace" ? n(l) : t(l);
  }
}
const lc = { name: "setextUnderline", tokenize: $1, resolveTo: H1 };
function H1(e, n) {
  let t = e.length,
    r,
    i,
    l;
  for (; t--; )
    if (e[t][0] === "enter") {
      if (e[t][1].type === "content") {
        r = t;
        break;
      }
      e[t][1].type === "paragraph" && (i = t);
    } else
      e[t][1].type === "content" && e.splice(t, 1),
        !l && e[t][1].type === "definition" && (l = t);
  const o = {
    type: "setextHeading",
    start: Object.assign({}, e[i][1].start),
    end: Object.assign({}, e[e.length - 1][1].end),
  };
  return (
    (e[i][1].type = "setextHeadingText"),
    l
      ? (e.splice(i, 0, ["enter", o, n]),
        e.splice(l + 1, 0, ["exit", e[r][1], n]),
        (e[r][1].end = Object.assign({}, e[l][1].end)))
      : (e[r][1] = o),
    e.push(["exit", o, n]),
    e
  );
}
function $1(e, n, t) {
  const r = this;
  let i;
  return l;
  function l(a) {
    let c = r.events.length,
      f;
    for (; c--; )
      if (
        r.events[c][1].type !== "lineEnding" &&
        r.events[c][1].type !== "linePrefix" &&
        r.events[c][1].type !== "content"
      ) {
        f = r.events[c][1].type === "paragraph";
        break;
      }
    return !r.parser.lazy[r.now().line] && (r.interrupt || f)
      ? (e.enter("setextHeadingLine"), (i = a), o(a))
      : t(a);
  }
  function o(a) {
    return e.enter("setextHeadingLineSequence"), u(a);
  }
  function u(a) {
    return a === i
      ? (e.consume(a), u)
      : (e.exit("setextHeadingLineSequence"),
        q(a) ? re(e, s, "lineSuffix")(a) : s(a));
  }
  function s(a) {
    return a === null || B(a) ? (e.exit("setextHeadingLine"), n(a)) : t(a);
  }
}
const W1 = { tokenize: Q1 };
function Q1(e) {
  const n = this,
    t = e.attempt(
      _l,
      r,
      e.attempt(
        this.parser.constructs.flowInitial,
        i,
        re(
          e,
          e.attempt(this.parser.constructs.flow, i, e.attempt(qy, i)),
          "linePrefix"
        )
      )
    );
  return t;
  function r(l) {
    if (l === null) {
      e.consume(l);
      return;
    }
    return (
      e.enter("lineEndingBlank"),
      e.consume(l),
      e.exit("lineEndingBlank"),
      (n.currentConstruct = void 0),
      t
    );
  }
  function i(l) {
    if (l === null) {
      e.consume(l);
      return;
    }
    return (
      e.enter("lineEnding"),
      e.consume(l),
      e.exit("lineEnding"),
      (n.currentConstruct = void 0),
      t
    );
  }
}
const b1 = { resolveAll: gd() },
  K1 = md("string"),
  Y1 = md("text");
function md(e) {
  return { tokenize: n, resolveAll: gd(e === "text" ? X1 : void 0) };
  function n(t) {
    const r = this,
      i = this.parser.constructs[e],
      l = t.attempt(i, o, u);
    return o;
    function o(c) {
      return a(c) ? l(c) : u(c);
    }
    function u(c) {
      if (c === null) {
        t.consume(c);
        return;
      }
      return t.enter("data"), t.consume(c), s;
    }
    function s(c) {
      return a(c) ? (t.exit("data"), l(c)) : (t.consume(c), s);
    }
    function a(c) {
      if (c === null) return !0;
      const f = i[c];
      let d = -1;
      if (f)
        for (; ++d < f.length; ) {
          const p = f[d];
          if (!p.previous || p.previous.call(r, r.previous)) return !0;
        }
      return !1;
    }
  }
}
function gd(e) {
  return n;
  function n(t, r) {
    let i = -1,
      l;
    for (; ++i <= t.length; )
      l === void 0
        ? t[i] && t[i][1].type === "data" && ((l = i), i++)
        : (!t[i] || t[i][1].type !== "data") &&
          (i !== l + 2 &&
            ((t[l][1].end = t[i - 1][1].end),
            t.splice(l + 2, i - l - 2),
            (i = l + 2)),
          (l = void 0));
    return e ? e(t, r) : t;
  }
}
function X1(e, n) {
  let t = 0;
  for (; ++t <= e.length; )
    if (
      (t === e.length || e[t][1].type === "lineEnding") &&
      e[t - 1][1].type === "data"
    ) {
      const r = e[t - 1][1],
        i = n.sliceStream(r);
      let l = i.length,
        o = -1,
        u = 0,
        s;
      for (; l--; ) {
        const a = i[l];
        if (typeof a == "string") {
          for (o = a.length; a.charCodeAt(o - 1) === 32; ) u++, o--;
          if (o) break;
          o = -1;
        } else if (a === -2) (s = !0), u++;
        else if (a !== -1) {
          l++;
          break;
        }
      }
      if (u) {
        const a = {
          type:
            t === e.length || s || u < 2 ? "lineSuffix" : "hardBreakTrailing",
          start: {
            line: r.end.line,
            column: r.end.column - u,
            offset: r.end.offset - u,
            _index: r.start._index + l,
            _bufferIndex: l ? o : r.start._bufferIndex + o,
          },
          end: Object.assign({}, r.end),
        };
        (r.end = Object.assign({}, a.start)),
          r.start.offset === r.end.offset
            ? Object.assign(r, a)
            : (e.splice(t, 0, ["enter", a, n], ["exit", a, n]), (t += 2));
      }
      t++;
    }
  return e;
}
function q1(e, n, t) {
  let r = Object.assign(
    t ? Object.assign({}, t) : { line: 1, column: 1, offset: 0 },
    { _index: 0, _bufferIndex: -1 }
  );
  const i = {},
    l = [];
  let o = [],
    u = [];
  const s = {
      consume: m,
      enter: y,
      exit: S,
      attempt: N(C),
      check: N(x),
      interrupt: N(x, { interrupt: !0 }),
    },
    a = {
      previous: null,
      code: null,
      containerState: {},
      events: [],
      parser: e,
      sliceStream: p,
      sliceSerialize: d,
      now: k,
      defineSkip: w,
      write: f,
    };
  let c = n.tokenize.call(a, s);
  return n.resolveAll && l.push(n), a;
  function f(L) {
    return (
      (o = Je(o, L)),
      T(),
      o[o.length - 1] !== null
        ? []
        : (O(n, 0), (a.events = ys(l, a.events, a)), a.events)
    );
  }
  function d(L, A) {
    return J1(p(L), A);
  }
  function p(L) {
    return G1(o, L);
  }
  function k() {
    const { line: L, column: A, offset: b, _index: ee, _bufferIndex: V } = r;
    return { line: L, column: A, offset: b, _index: ee, _bufferIndex: V };
  }
  function w(L) {
    (i[L.line] = L.column), D();
  }
  function T() {
    let L;
    for (; r._index < o.length; ) {
      const A = o[r._index];
      if (typeof A == "string")
        for (
          L = r._index, r._bufferIndex < 0 && (r._bufferIndex = 0);
          r._index === L && r._bufferIndex < A.length;

        )
          h(A.charCodeAt(r._bufferIndex));
      else h(A);
    }
  }
  function h(L) {
    c = c(L);
  }
  function m(L) {
    B(L)
      ? (r.line++, (r.column = 1), (r.offset += L === -3 ? 2 : 1), D())
      : L !== -1 && (r.column++, r.offset++),
      r._bufferIndex < 0
        ? r._index++
        : (r._bufferIndex++,
          r._bufferIndex === o[r._index].length &&
            ((r._bufferIndex = -1), r._index++)),
      (a.previous = L);
  }
  function y(L, A) {
    const b = A || {};
    return (
      (b.type = L),
      (b.start = k()),
      a.events.push(["enter", b, a]),
      u.push(b),
      b
    );
  }
  function S(L) {
    const A = u.pop();
    return (A.end = k()), a.events.push(["exit", A, a]), A;
  }
  function C(L, A) {
    O(L, A.from);
  }
  function x(L, A) {
    A.restore();
  }
  function N(L, A) {
    return b;
    function b(ee, V, M) {
      let H, P, j, g;
      return Array.isArray(ee) ? J(ee) : "tokenize" in ee ? J([ee]) : K(ee);
      function K(ie) {
        return hn;
        function hn(Dn) {
          const xt = Dn !== null && ie[Dn],
            St = Dn !== null && ie.null,
            ti = [
              ...(Array.isArray(xt) ? xt : xt ? [xt] : []),
              ...(Array.isArray(St) ? St : St ? [St] : []),
            ];
          return J(ti)(Dn);
        }
      }
      function J(ie) {
        return (H = ie), (P = 0), ie.length === 0 ? M : v(ie[P]);
      }
      function v(ie) {
        return hn;
        function hn(Dn) {
          return (
            (g = F()),
            (j = ie),
            ie.partial || (a.currentConstruct = ie),
            ie.name && a.parser.constructs.disable.null.includes(ie.name)
              ? ln()
              : ie.tokenize.call(
                  A ? Object.assign(Object.create(a), A) : a,
                  s,
                  ge,
                  ln
                )(Dn)
          );
        }
      }
      function ge(ie) {
        return L(j, g), V;
      }
      function ln(ie) {
        return g.restore(), ++P < H.length ? v(H[P]) : M;
      }
    }
  }
  function O(L, A) {
    L.resolveAll && !l.includes(L) && l.push(L),
      L.resolve &&
        An(a.events, A, a.events.length - A, L.resolve(a.events.slice(A), a)),
      L.resolveTo && (a.events = L.resolveTo(a.events, a));
  }
  function F() {
    const L = k(),
      A = a.previous,
      b = a.currentConstruct,
      ee = a.events.length,
      V = Array.from(u);
    return { restore: M, from: ee };
    function M() {
      (r = L),
        (a.previous = A),
        (a.currentConstruct = b),
        (a.events.length = ee),
        (u = V),
        D();
    }
  }
  function D() {
    r.line in i &&
      r.column < 2 &&
      ((r.column = i[r.line]), (r.offset += i[r.line] - 1));
  }
}
function G1(e, n) {
  const t = n.start._index,
    r = n.start._bufferIndex,
    i = n.end._index,
    l = n.end._bufferIndex;
  let o;
  if (t === i) o = [e[t].slice(r, l)];
  else {
    if (((o = e.slice(t, i)), r > -1)) {
      const u = o[0];
      typeof u == "string" ? (o[0] = u.slice(r)) : o.shift();
    }
    l > 0 && o.push(e[i].slice(0, l));
  }
  return o;
}
function J1(e, n) {
  let t = -1;
  const r = [];
  let i;
  for (; ++t < e.length; ) {
    const l = e[t];
    let o;
    if (typeof l == "string") o = l;
    else
      switch (l) {
        case -5: {
          o = "\r";
          break;
        }
        case -4: {
          o = `
`;
          break;
        }
        case -3: {
          o = `\r
`;
          break;
        }
        case -2: {
          o = n ? " " : "	";
          break;
        }
        case -1: {
          if (!n && i) continue;
          o = " ";
          break;
        }
        default:
          o = String.fromCharCode(l);
      }
    (i = l === -2), r.push(o);
  }
  return r.join("");
}
const Z1 = {
    42: Re,
    43: Re,
    45: Re,
    48: Re,
    49: Re,
    50: Re,
    51: Re,
    52: Re,
    53: Re,
    54: Re,
    55: Re,
    56: Re,
    57: Re,
    62: sd,
  },
  e0 = { 91: n1 },
  n0 = { [-2]: ro, [-1]: ro, 32: ro },
  t0 = {
    35: u1,
    42: Di,
    45: [lc, Di],
    60: f1,
    61: lc,
    95: Di,
    96: rc,
    126: rc,
  },
  r0 = { 38: cd, 92: ad },
  i0 = {
    [-5]: io,
    [-4]: io,
    [-3]: io,
    33: T1,
    38: cd,
    42: fu,
    60: [Ly, v1],
    91: L1,
    92: [l1, ad],
    93: vs,
    95: fu,
    96: Wy,
  },
  l0 = { null: [fu, b1] },
  o0 = { null: [42, 95] },
  u0 = { null: [] },
  s0 = Object.freeze(
    Object.defineProperty(
      {
        __proto__: null,
        attentionMarkers: o0,
        contentInitial: e0,
        disable: u0,
        document: Z1,
        flow: t0,
        flowInitial: n0,
        insideSpan: l0,
        string: r0,
        text: i0,
      },
      Symbol.toStringTag,
      { value: "Module" }
    )
  );
function a0(e) {
  const t = gy([s0, ...((e || {}).extensions || [])]),
    r = {
      defined: [],
      lazy: {},
      constructs: t,
      content: i(Cy),
      document: i(_y),
      flow: i(W1),
      string: i(K1),
      text: i(Y1),
    };
  return r;
  function i(l) {
    return o;
    function o(u) {
      return q1(r, l, u);
    }
  }
}
function c0(e) {
  for (; !fd(e); );
  return e;
}
const oc = /[\0\t\n\r]/g;
function f0() {
  let e = 1,
    n = "",
    t = !0,
    r;
  return i;
  function i(l, o, u) {
    const s = [];
    let a, c, f, d, p;
    for (
      l =
        n +
        (typeof l == "string"
          ? l.toString()
          : new TextDecoder(o || void 0).decode(l)),
        f = 0,
        n = "",
        t && (l.charCodeAt(0) === 65279 && f++, (t = void 0));
      f < l.length;

    ) {
      if (
        ((oc.lastIndex = f),
        (a = oc.exec(l)),
        (d = a && a.index !== void 0 ? a.index : l.length),
        (p = l.charCodeAt(d)),
        !a)
      ) {
        n = l.slice(f);
        break;
      }
      if (p === 10 && f === d && r) s.push(-3), (r = void 0);
      else
        switch (
          (r && (s.push(-5), (r = void 0)),
          f < d && (s.push(l.slice(f, d)), (e += d - f)),
          p)
        ) {
          case 0: {
            s.push(65533), e++;
            break;
          }
          case 9: {
            for (c = Math.ceil(e / 4) * 4, s.push(-2); e++ < c; ) s.push(-1);
            break;
          }
          case 10: {
            s.push(-4), (e = 1);
            break;
          }
          default:
            (r = !0), (e = 1);
        }
      f = d + 1;
    }
    return u && (r && s.push(-5), n && s.push(n), s.push(null)), s;
  }
}
const p0 = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function d0(e) {
  return e.replace(p0, h0);
}
function h0(e, n, t) {
  if (n) return n;
  if (t.charCodeAt(0) === 35) {
    const i = t.charCodeAt(1),
      l = i === 120 || i === 88;
    return ud(t.slice(l ? 2 : 1), l ? 16 : 10);
  }
  return gs(t) || e;
}
const yd = {}.hasOwnProperty;
function m0(e, n, t) {
  return (
    typeof n != "string" && ((t = n), (n = void 0)),
    g0(t)(c0(a0(t).document().write(f0()(e, n, !0))))
  );
}
function g0(e) {
  const n = {
    transforms: [],
    canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
    enter: {
      autolink: l(Ns),
      autolinkProtocol: F,
      autolinkEmail: F,
      atxHeading: l(Cs),
      blockQuote: l(St),
      characterEscape: F,
      characterReference: F,
      codeFenced: l(ti),
      codeFencedFenceInfo: o,
      codeFencedFenceMeta: o,
      codeIndented: l(ti, o),
      codeText: l(Td, o),
      codeTextData: F,
      data: F,
      codeFlowValue: F,
      definition: l(zd),
      definitionDestinationString: o,
      definitionLabelString: o,
      definitionTitleString: o,
      emphasis: l(Ld),
      hardBreakEscape: l(Ps),
      hardBreakTrailing: l(Ps),
      htmlFlow: l(_s, o),
      htmlFlowData: F,
      htmlText: l(_s, o),
      htmlTextData: F,
      image: l(Od),
      label: o,
      link: l(Ns),
      listItem: l(Ad),
      listItemValue: d,
      listOrdered: l(Is, f),
      listUnordered: l(Is),
      paragraph: l(Rd),
      reference: v,
      referenceString: o,
      resourceDestinationString: o,
      resourceTitleString: o,
      setextHeading: l(Cs),
      strong: l(Dd),
      thematicBreak: l(Fd),
    },
    exit: {
      atxHeading: s(),
      atxHeadingSequence: C,
      autolink: s(),
      autolinkEmail: xt,
      autolinkProtocol: Dn,
      blockQuote: s(),
      characterEscapeValue: D,
      characterReferenceMarkerHexadecimal: ln,
      characterReferenceMarkerNumeric: ln,
      characterReferenceValue: ie,
      characterReference: hn,
      codeFenced: s(T),
      codeFencedFence: w,
      codeFencedFenceInfo: p,
      codeFencedFenceMeta: k,
      codeFlowValue: D,
      codeIndented: s(h),
      codeText: s(V),
      codeTextData: D,
      data: D,
      definition: s(),
      definitionDestinationString: S,
      definitionLabelString: m,
      definitionTitleString: y,
      emphasis: s(),
      hardBreakEscape: s(A),
      hardBreakTrailing: s(A),
      htmlFlow: s(b),
      htmlFlowData: D,
      htmlText: s(ee),
      htmlTextData: D,
      image: s(H),
      label: j,
      labelText: P,
      lineEnding: L,
      link: s(M),
      listItem: s(),
      listOrdered: s(),
      listUnordered: s(),
      paragraph: s(),
      referenceString: ge,
      resourceDestinationString: g,
      resourceTitleString: K,
      resource: J,
      setextHeading: s(O),
      setextHeadingLineSequence: N,
      setextHeadingText: x,
      strong: s(),
      thematicBreak: s(),
    },
  };
  vd(n, (e || {}).mdastExtensions || []);
  const t = {};
  return r;
  function r(E) {
    let z = { type: "root", children: [] };
    const U = {
        stack: [z],
        tokenStack: [],
        config: n,
        enter: u,
        exit: a,
        buffer: o,
        resume: c,
        data: t,
      },
      Q = [];
    let Z = -1;
    for (; ++Z < E.length; )
      if (E[Z][1].type === "listOrdered" || E[Z][1].type === "listUnordered")
        if (E[Z][0] === "enter") Q.push(Z);
        else {
          const on = Q.pop();
          Z = i(E, on, Z);
        }
    for (Z = -1; ++Z < E.length; ) {
      const on = n[E[Z][0]];
      yd.call(on, E[Z][1].type) &&
        on[E[Z][1].type].call(
          Object.assign({ sliceSerialize: E[Z][2].sliceSerialize }, U),
          E[Z][1]
        );
    }
    if (U.tokenStack.length > 0) {
      const on = U.tokenStack[U.tokenStack.length - 1];
      (on[1] || uc).call(U, void 0, on[0]);
    }
    for (
      z.position = {
        start: Fn(
          E.length > 0 ? E[0][1].start : { line: 1, column: 1, offset: 0 }
        ),
        end: Fn(
          E.length > 0
            ? E[E.length - 2][1].end
            : { line: 1, column: 1, offset: 0 }
        ),
      },
        Z = -1;
      ++Z < n.transforms.length;

    )
      z = n.transforms[Z](z) || z;
    return z;
  }
  function i(E, z, U) {
    let Q = z - 1,
      Z = -1,
      on = !1,
      it,
      Sn,
      ir,
      lr;
    for (; ++Q <= U; ) {
      const Ve = E[Q];
      switch (Ve[1].type) {
        case "listUnordered":
        case "listOrdered":
        case "blockQuote": {
          Ve[0] === "enter" ? Z++ : Z--, (lr = void 0);
          break;
        }
        case "lineEndingBlank": {
          Ve[0] === "enter" &&
            (it && !lr && !Z && !ir && (ir = Q), (lr = void 0));
          break;
        }
        case "linePrefix":
        case "listItemValue":
        case "listItemMarker":
        case "listItemPrefix":
        case "listItemPrefixWhitespace":
          break;
        default:
          lr = void 0;
      }
      if (
        (!Z && Ve[0] === "enter" && Ve[1].type === "listItemPrefix") ||
        (Z === -1 &&
          Ve[0] === "exit" &&
          (Ve[1].type === "listUnordered" || Ve[1].type === "listOrdered"))
      ) {
        if (it) {
          let Et = Q;
          for (Sn = void 0; Et--; ) {
            const En = E[Et];
            if (
              En[1].type === "lineEnding" ||
              En[1].type === "lineEndingBlank"
            ) {
              if (En[0] === "exit") continue;
              Sn && ((E[Sn][1].type = "lineEndingBlank"), (on = !0)),
                (En[1].type = "lineEnding"),
                (Sn = Et);
            } else if (
              !(
                En[1].type === "linePrefix" ||
                En[1].type === "blockQuotePrefix" ||
                En[1].type === "blockQuotePrefixWhitespace" ||
                En[1].type === "blockQuoteMarker" ||
                En[1].type === "listItemIndent"
              )
            )
              break;
          }
          ir && (!Sn || ir < Sn) && (it._spread = !0),
            (it.end = Object.assign({}, Sn ? E[Sn][1].start : Ve[1].end)),
            E.splice(Sn || Q, 0, ["exit", it, Ve[2]]),
            Q++,
            U++;
        }
        if (Ve[1].type === "listItemPrefix") {
          const Et = {
            type: "listItem",
            _spread: !1,
            start: Object.assign({}, Ve[1].start),
            end: void 0,
          };
          (it = Et),
            E.splice(Q, 0, ["enter", Et, Ve[2]]),
            Q++,
            U++,
            (ir = void 0),
            (lr = !0);
        }
      }
    }
    return (E[z][1]._spread = on), U;
  }
  function l(E, z) {
    return U;
    function U(Q) {
      u.call(this, E(Q), Q), z && z.call(this, Q);
    }
  }
  function o() {
    this.stack.push({ type: "fragment", children: [] });
  }
  function u(E, z, U) {
    this.stack[this.stack.length - 1].children.push(E),
      this.stack.push(E),
      this.tokenStack.push([z, U]),
      (E.position = { start: Fn(z.start), end: void 0 });
  }
  function s(E) {
    return z;
    function z(U) {
      E && E.call(this, U), a.call(this, U);
    }
  }
  function a(E, z) {
    const U = this.stack.pop(),
      Q = this.tokenStack.pop();
    if (Q)
      Q[0].type !== E.type &&
        (z ? z.call(this, E, Q[0]) : (Q[1] || uc).call(this, E, Q[0]));
    else
      throw new Error(
        "Cannot close `" +
          E.type +
          "` (" +
          Tr({ start: E.start, end: E.end }) +
          "): it’s not open"
      );
    U.position.end = Fn(E.end);
  }
  function c() {
    return hy(this.stack.pop());
  }
  function f() {
    this.data.expectingFirstListItemValue = !0;
  }
  function d(E) {
    if (this.data.expectingFirstListItemValue) {
      const z = this.stack[this.stack.length - 2];
      (z.start = Number.parseInt(this.sliceSerialize(E), 10)),
        (this.data.expectingFirstListItemValue = void 0);
    }
  }
  function p() {
    const E = this.resume(),
      z = this.stack[this.stack.length - 1];
    z.lang = E;
  }
  function k() {
    const E = this.resume(),
      z = this.stack[this.stack.length - 1];
    z.meta = E;
  }
  function w() {
    this.data.flowCodeInside ||
      (this.buffer(), (this.data.flowCodeInside = !0));
  }
  function T() {
    const E = this.resume(),
      z = this.stack[this.stack.length - 1];
    (z.value = E.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "")),
      (this.data.flowCodeInside = void 0);
  }
  function h() {
    const E = this.resume(),
      z = this.stack[this.stack.length - 1];
    z.value = E.replace(/(\r?\n|\r)$/g, "");
  }
  function m(E) {
    const z = this.resume(),
      U = this.stack[this.stack.length - 1];
    (U.label = z), (U.identifier = Qt(this.sliceSerialize(E)).toLowerCase());
  }
  function y() {
    const E = this.resume(),
      z = this.stack[this.stack.length - 1];
    z.title = E;
  }
  function S() {
    const E = this.resume(),
      z = this.stack[this.stack.length - 1];
    z.url = E;
  }
  function C(E) {
    const z = this.stack[this.stack.length - 1];
    if (!z.depth) {
      const U = this.sliceSerialize(E).length;
      z.depth = U;
    }
  }
  function x() {
    this.data.setextHeadingSlurpLineEnding = !0;
  }
  function N(E) {
    const z = this.stack[this.stack.length - 1];
    z.depth = this.sliceSerialize(E).codePointAt(0) === 61 ? 1 : 2;
  }
  function O() {
    this.data.setextHeadingSlurpLineEnding = void 0;
  }
  function F(E) {
    const U = this.stack[this.stack.length - 1].children;
    let Q = U[U.length - 1];
    (!Q || Q.type !== "text") &&
      ((Q = Md()),
      (Q.position = { start: Fn(E.start), end: void 0 }),
      U.push(Q)),
      this.stack.push(Q);
  }
  function D(E) {
    const z = this.stack.pop();
    (z.value += this.sliceSerialize(E)), (z.position.end = Fn(E.end));
  }
  function L(E) {
    const z = this.stack[this.stack.length - 1];
    if (this.data.atHardBreak) {
      const U = z.children[z.children.length - 1];
      (U.position.end = Fn(E.end)), (this.data.atHardBreak = void 0);
      return;
    }
    !this.data.setextHeadingSlurpLineEnding &&
      n.canContainEols.includes(z.type) &&
      (F.call(this, E), D.call(this, E));
  }
  function A() {
    this.data.atHardBreak = !0;
  }
  function b() {
    const E = this.resume(),
      z = this.stack[this.stack.length - 1];
    z.value = E;
  }
  function ee() {
    const E = this.resume(),
      z = this.stack[this.stack.length - 1];
    z.value = E;
  }
  function V() {
    const E = this.resume(),
      z = this.stack[this.stack.length - 1];
    z.value = E;
  }
  function M() {
    const E = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const z = this.data.referenceType || "shortcut";
      (E.type += "Reference"),
        (E.referenceType = z),
        delete E.url,
        delete E.title;
    } else delete E.identifier, delete E.label;
    this.data.referenceType = void 0;
  }
  function H() {
    const E = this.stack[this.stack.length - 1];
    if (this.data.inReference) {
      const z = this.data.referenceType || "shortcut";
      (E.type += "Reference"),
        (E.referenceType = z),
        delete E.url,
        delete E.title;
    } else delete E.identifier, delete E.label;
    this.data.referenceType = void 0;
  }
  function P(E) {
    const z = this.sliceSerialize(E),
      U = this.stack[this.stack.length - 2];
    (U.label = d0(z)), (U.identifier = Qt(z).toLowerCase());
  }
  function j() {
    const E = this.stack[this.stack.length - 1],
      z = this.resume(),
      U = this.stack[this.stack.length - 1];
    if (((this.data.inReference = !0), U.type === "link")) {
      const Q = E.children;
      U.children = Q;
    } else U.alt = z;
  }
  function g() {
    const E = this.resume(),
      z = this.stack[this.stack.length - 1];
    z.url = E;
  }
  function K() {
    const E = this.resume(),
      z = this.stack[this.stack.length - 1];
    z.title = E;
  }
  function J() {
    this.data.inReference = void 0;
  }
  function v() {
    this.data.referenceType = "collapsed";
  }
  function ge(E) {
    const z = this.resume(),
      U = this.stack[this.stack.length - 1];
    (U.label = z),
      (U.identifier = Qt(this.sliceSerialize(E)).toLowerCase()),
      (this.data.referenceType = "full");
  }
  function ln(E) {
    this.data.characterReferenceType = E.type;
  }
  function ie(E) {
    const z = this.sliceSerialize(E),
      U = this.data.characterReferenceType;
    let Q;
    U
      ? ((Q = ud(z, U === "characterReferenceMarkerNumeric" ? 10 : 16)),
        (this.data.characterReferenceType = void 0))
      : (Q = gs(z));
    const Z = this.stack[this.stack.length - 1];
    Z.value += Q;
  }
  function hn(E) {
    const z = this.stack.pop();
    z.position.end = Fn(E.end);
  }
  function Dn(E) {
    D.call(this, E);
    const z = this.stack[this.stack.length - 1];
    z.url = this.sliceSerialize(E);
  }
  function xt(E) {
    D.call(this, E);
    const z = this.stack[this.stack.length - 1];
    z.url = "mailto:" + this.sliceSerialize(E);
  }
  function St() {
    return { type: "blockquote", children: [] };
  }
  function ti() {
    return { type: "code", lang: null, meta: null, value: "" };
  }
  function Td() {
    return { type: "inlineCode", value: "" };
  }
  function zd() {
    return {
      type: "definition",
      identifier: "",
      label: null,
      title: null,
      url: "",
    };
  }
  function Ld() {
    return { type: "emphasis", children: [] };
  }
  function Cs() {
    return { type: "heading", depth: 0, children: [] };
  }
  function Ps() {
    return { type: "break" };
  }
  function _s() {
    return { type: "html", value: "" };
  }
  function Od() {
    return { type: "image", title: null, url: "", alt: null };
  }
  function Ns() {
    return { type: "link", title: null, url: "", children: [] };
  }
  function Is(E) {
    return {
      type: "list",
      ordered: E.type === "listOrdered",
      start: null,
      spread: E._spread,
      children: [],
    };
  }
  function Ad(E) {
    return { type: "listItem", spread: E._spread, checked: null, children: [] };
  }
  function Rd() {
    return { type: "paragraph", children: [] };
  }
  function Dd() {
    return { type: "strong", children: [] };
  }
  function Md() {
    return { type: "text", value: "" };
  }
  function Fd() {
    return { type: "thematicBreak" };
  }
}
function Fn(e) {
  return { line: e.line, column: e.column, offset: e.offset };
}
function vd(e, n) {
  let t = -1;
  for (; ++t < n.length; ) {
    const r = n[t];
    Array.isArray(r) ? vd(e, r) : y0(e, r);
  }
}
function y0(e, n) {
  let t;
  for (t in n)
    if (yd.call(n, t))
      switch (t) {
        case "canContainEols": {
          const r = n[t];
          r && e[t].push(...r);
          break;
        }
        case "transforms": {
          const r = n[t];
          r && e[t].push(...r);
          break;
        }
        case "enter":
        case "exit": {
          const r = n[t];
          r && Object.assign(e[t], r);
          break;
        }
      }
}
function uc(e, n) {
  throw e
    ? new Error(
        "Cannot close `" +
          e.type +
          "` (" +
          Tr({ start: e.start, end: e.end }) +
          "): a different token (`" +
          n.type +
          "`, " +
          Tr({ start: n.start, end: n.end }) +
          ") is open"
      )
    : new Error(
        "Cannot close document, a token (`" +
          n.type +
          "`, " +
          Tr({ start: n.start, end: n.end }) +
          ") is still open"
      );
}
function v0(e) {
  const n = this;
  n.parser = t;
  function t(r) {
    return m0(r, {
      ...n.data("settings"),
      ...e,
      extensions: n.data("micromarkExtensions") || [],
      mdastExtensions: n.data("fromMarkdownExtensions") || [],
    });
  }
}
function k0(e, n) {
  const t = {
    type: "element",
    tagName: "blockquote",
    properties: {},
    children: e.wrap(e.all(n), !0),
  };
  return e.patch(n, t), e.applyData(n, t);
}
function w0(e, n) {
  const t = { type: "element", tagName: "br", properties: {}, children: [] };
  return (
    e.patch(n, t),
    [
      e.applyData(n, t),
      {
        type: "text",
        value: `
`,
      },
    ]
  );
}
function x0(e, n) {
  const t = n.value
      ? n.value +
        `
`
      : "",
    r = {};
  n.lang && (r.className = ["language-" + n.lang]);
  let i = {
    type: "element",
    tagName: "code",
    properties: r,
    children: [{ type: "text", value: t }],
  };
  return (
    n.meta && (i.data = { meta: n.meta }),
    e.patch(n, i),
    (i = e.applyData(n, i)),
    (i = { type: "element", tagName: "pre", properties: {}, children: [i] }),
    e.patch(n, i),
    i
  );
}
function S0(e, n) {
  const t = {
    type: "element",
    tagName: "del",
    properties: {},
    children: e.all(n),
  };
  return e.patch(n, t), e.applyData(n, t);
}
function E0(e, n) {
  const t = {
    type: "element",
    tagName: "em",
    properties: {},
    children: e.all(n),
  };
  return e.patch(n, t), e.applyData(n, t);
}
function C0(e, n) {
  const t =
      typeof e.options.clobberPrefix == "string"
        ? e.options.clobberPrefix
        : "user-content-",
    r = String(n.identifier).toUpperCase(),
    i = rr(r.toLowerCase()),
    l = e.footnoteOrder.indexOf(r);
  let o,
    u = e.footnoteCounts.get(r);
  u === void 0
    ? ((u = 0), e.footnoteOrder.push(r), (o = e.footnoteOrder.length))
    : (o = l + 1),
    (u += 1),
    e.footnoteCounts.set(r, u);
  const s = {
    type: "element",
    tagName: "a",
    properties: {
      href: "#" + t + "fn-" + i,
      id: t + "fnref-" + i + (u > 1 ? "-" + u : ""),
      dataFootnoteRef: !0,
      ariaDescribedBy: ["footnote-label"],
    },
    children: [{ type: "text", value: String(o) }],
  };
  e.patch(n, s);
  const a = { type: "element", tagName: "sup", properties: {}, children: [s] };
  return e.patch(n, a), e.applyData(n, a);
}
function P0(e, n) {
  const t = {
    type: "element",
    tagName: "h" + n.depth,
    properties: {},
    children: e.all(n),
  };
  return e.patch(n, t), e.applyData(n, t);
}
function _0(e, n) {
  if (e.options.allowDangerousHtml) {
    const t = { type: "raw", value: n.value };
    return e.patch(n, t), e.applyData(n, t);
  }
}
function kd(e, n) {
  const t = n.referenceType;
  let r = "]";
  if (
    (t === "collapsed"
      ? (r += "[]")
      : t === "full" && (r += "[" + (n.label || n.identifier) + "]"),
    n.type === "imageReference")
  )
    return [{ type: "text", value: "![" + n.alt + r }];
  const i = e.all(n),
    l = i[0];
  l && l.type === "text"
    ? (l.value = "[" + l.value)
    : i.unshift({ type: "text", value: "[" });
  const o = i[i.length - 1];
  return (
    o && o.type === "text"
      ? (o.value += r)
      : i.push({ type: "text", value: r }),
    i
  );
}
function N0(e, n) {
  const t = String(n.identifier).toUpperCase(),
    r = e.definitionById.get(t);
  if (!r) return kd(e, n);
  const i = { src: rr(r.url || ""), alt: n.alt };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const l = { type: "element", tagName: "img", properties: i, children: [] };
  return e.patch(n, l), e.applyData(n, l);
}
function I0(e, n) {
  const t = { src: rr(n.url) };
  n.alt !== null && n.alt !== void 0 && (t.alt = n.alt),
    n.title !== null && n.title !== void 0 && (t.title = n.title);
  const r = { type: "element", tagName: "img", properties: t, children: [] };
  return e.patch(n, r), e.applyData(n, r);
}
function T0(e, n) {
  const t = { type: "text", value: n.value.replace(/\r?\n|\r/g, " ") };
  e.patch(n, t);
  const r = { type: "element", tagName: "code", properties: {}, children: [t] };
  return e.patch(n, r), e.applyData(n, r);
}
function z0(e, n) {
  const t = String(n.identifier).toUpperCase(),
    r = e.definitionById.get(t);
  if (!r) return kd(e, n);
  const i = { href: rr(r.url || "") };
  r.title !== null && r.title !== void 0 && (i.title = r.title);
  const l = {
    type: "element",
    tagName: "a",
    properties: i,
    children: e.all(n),
  };
  return e.patch(n, l), e.applyData(n, l);
}
function L0(e, n) {
  const t = { href: rr(n.url) };
  n.title !== null && n.title !== void 0 && (t.title = n.title);
  const r = {
    type: "element",
    tagName: "a",
    properties: t,
    children: e.all(n),
  };
  return e.patch(n, r), e.applyData(n, r);
}
function O0(e, n, t) {
  const r = e.all(n),
    i = t ? A0(t) : wd(n),
    l = {},
    o = [];
  if (typeof n.checked == "boolean") {
    const c = r[0];
    let f;
    c && c.type === "element" && c.tagName === "p"
      ? (f = c)
      : ((f = { type: "element", tagName: "p", properties: {}, children: [] }),
        r.unshift(f)),
      f.children.length > 0 && f.children.unshift({ type: "text", value: " " }),
      f.children.unshift({
        type: "element",
        tagName: "input",
        properties: { type: "checkbox", checked: n.checked, disabled: !0 },
        children: [],
      }),
      (l.className = ["task-list-item"]);
  }
  let u = -1;
  for (; ++u < r.length; ) {
    const c = r[u];
    (i || u !== 0 || c.type !== "element" || c.tagName !== "p") &&
      o.push({
        type: "text",
        value: `
`,
      }),
      c.type === "element" && c.tagName === "p" && !i
        ? o.push(...c.children)
        : o.push(c);
  }
  const s = r[r.length - 1];
  s &&
    (i || s.type !== "element" || s.tagName !== "p") &&
    o.push({
      type: "text",
      value: `
`,
    });
  const a = { type: "element", tagName: "li", properties: l, children: o };
  return e.patch(n, a), e.applyData(n, a);
}
function A0(e) {
  let n = !1;
  if (e.type === "list") {
    n = e.spread || !1;
    const t = e.children;
    let r = -1;
    for (; !n && ++r < t.length; ) n = wd(t[r]);
  }
  return n;
}
function wd(e) {
  const n = e.spread;
  return n ?? e.children.length > 1;
}
function R0(e, n) {
  const t = {},
    r = e.all(n);
  let i = -1;
  for (
    typeof n.start == "number" && n.start !== 1 && (t.start = n.start);
    ++i < r.length;

  ) {
    const o = r[i];
    if (
      o.type === "element" &&
      o.tagName === "li" &&
      o.properties &&
      Array.isArray(o.properties.className) &&
      o.properties.className.includes("task-list-item")
    ) {
      t.className = ["contains-task-list"];
      break;
    }
  }
  const l = {
    type: "element",
    tagName: n.ordered ? "ol" : "ul",
    properties: t,
    children: e.wrap(r, !0),
  };
  return e.patch(n, l), e.applyData(n, l);
}
function D0(e, n) {
  const t = {
    type: "element",
    tagName: "p",
    properties: {},
    children: e.all(n),
  };
  return e.patch(n, t), e.applyData(n, t);
}
function M0(e, n) {
  const t = { type: "root", children: e.wrap(e.all(n)) };
  return e.patch(n, t), e.applyData(n, t);
}
function F0(e, n) {
  const t = {
    type: "element",
    tagName: "strong",
    properties: {},
    children: e.all(n),
  };
  return e.patch(n, t), e.applyData(n, t);
}
function j0(e, n) {
  const t = e.all(n),
    r = t.shift(),
    i = [];
  if (r) {
    const o = {
      type: "element",
      tagName: "thead",
      properties: {},
      children: e.wrap([r], !0),
    };
    e.patch(n.children[0], o), i.push(o);
  }
  if (t.length > 0) {
    const o = {
        type: "element",
        tagName: "tbody",
        properties: {},
        children: e.wrap(t, !0),
      },
      u = ps(n.children[1]),
      s = ed(n.children[n.children.length - 1]);
    u && s && (o.position = { start: u, end: s }), i.push(o);
  }
  const l = {
    type: "element",
    tagName: "table",
    properties: {},
    children: e.wrap(i, !0),
  };
  return e.patch(n, l), e.applyData(n, l);
}
function B0(e, n, t) {
  const r = t ? t.children : void 0,
    l = (r ? r.indexOf(n) : 1) === 0 ? "th" : "td",
    o = t && t.type === "table" ? t.align : void 0,
    u = o ? o.length : n.children.length;
  let s = -1;
  const a = [];
  for (; ++s < u; ) {
    const f = n.children[s],
      d = {},
      p = o ? o[s] : void 0;
    p && (d.align = p);
    let k = { type: "element", tagName: l, properties: d, children: [] };
    f && ((k.children = e.all(f)), e.patch(f, k), (k = e.applyData(f, k))),
      a.push(k);
  }
  const c = {
    type: "element",
    tagName: "tr",
    properties: {},
    children: e.wrap(a, !0),
  };
  return e.patch(n, c), e.applyData(n, c);
}
function U0(e, n) {
  const t = {
    type: "element",
    tagName: "td",
    properties: {},
    children: e.all(n),
  };
  return e.patch(n, t), e.applyData(n, t);
}
const sc = 9,
  ac = 32;
function V0(e) {
  const n = String(e),
    t = /\r?\n|\r/g;
  let r = t.exec(n),
    i = 0;
  const l = [];
  for (; r; )
    l.push(cc(n.slice(i, r.index), i > 0, !0), r[0]),
      (i = r.index + r[0].length),
      (r = t.exec(n));
  return l.push(cc(n.slice(i), i > 0, !1)), l.join("");
}
function cc(e, n, t) {
  let r = 0,
    i = e.length;
  if (n) {
    let l = e.codePointAt(r);
    for (; l === sc || l === ac; ) r++, (l = e.codePointAt(r));
  }
  if (t) {
    let l = e.codePointAt(i - 1);
    for (; l === sc || l === ac; ) i--, (l = e.codePointAt(i - 1));
  }
  return i > r ? e.slice(r, i) : "";
}
function H0(e, n) {
  const t = { type: "text", value: V0(String(n.value)) };
  return e.patch(n, t), e.applyData(n, t);
}
function $0(e, n) {
  const t = { type: "element", tagName: "hr", properties: {}, children: [] };
  return e.patch(n, t), e.applyData(n, t);
}
const W0 = {
  blockquote: k0,
  break: w0,
  code: x0,
  delete: S0,
  emphasis: E0,
  footnoteReference: C0,
  heading: P0,
  html: _0,
  imageReference: N0,
  image: I0,
  inlineCode: T0,
  linkReference: z0,
  link: L0,
  listItem: O0,
  list: R0,
  paragraph: D0,
  root: M0,
  strong: F0,
  table: j0,
  tableCell: U0,
  tableRow: B0,
  text: H0,
  thematicBreak: $0,
  toml: wi,
  yaml: wi,
  definition: wi,
  footnoteDefinition: wi,
};
function wi() {}
const xd = -1,
  Nl = 0,
  ul = 1,
  sl = 2,
  ks = 3,
  ws = 4,
  xs = 5,
  Ss = 6,
  Sd = 7,
  Ed = 8,
  fc = typeof self == "object" ? self : globalThis,
  Q0 = (e, n) => {
    const t = (i, l) => (e.set(l, i), i),
      r = (i) => {
        if (e.has(i)) return e.get(i);
        const [l, o] = n[i];
        switch (l) {
          case Nl:
          case xd:
            return t(o, i);
          case ul: {
            const u = t([], i);
            for (const s of o) u.push(r(s));
            return u;
          }
          case sl: {
            const u = t({}, i);
            for (const [s, a] of o) u[r(s)] = r(a);
            return u;
          }
          case ks:
            return t(new Date(o), i);
          case ws: {
            const { source: u, flags: s } = o;
            return t(new RegExp(u, s), i);
          }
          case xs: {
            const u = t(new Map(), i);
            for (const [s, a] of o) u.set(r(s), r(a));
            return u;
          }
          case Ss: {
            const u = t(new Set(), i);
            for (const s of o) u.add(r(s));
            return u;
          }
          case Sd: {
            const { name: u, message: s } = o;
            return t(new fc[u](s), i);
          }
          case Ed:
            return t(BigInt(o), i);
          case "BigInt":
            return t(Object(BigInt(o)), i);
        }
        return t(new fc[l](o), i);
      };
    return r;
  },
  pc = (e) => Q0(new Map(), e)(0),
  Pt = "",
  { toString: b0 } = {},
  { keys: K0 } = Object,
  mr = (e) => {
    const n = typeof e;
    if (n !== "object" || !e) return [Nl, n];
    const t = b0.call(e).slice(8, -1);
    switch (t) {
      case "Array":
        return [ul, Pt];
      case "Object":
        return [sl, Pt];
      case "Date":
        return [ks, Pt];
      case "RegExp":
        return [ws, Pt];
      case "Map":
        return [xs, Pt];
      case "Set":
        return [Ss, Pt];
    }
    return t.includes("Array")
      ? [ul, t]
      : t.includes("Error")
      ? [Sd, t]
      : [sl, t];
  },
  xi = ([e, n]) => e === Nl && (n === "function" || n === "symbol"),
  Y0 = (e, n, t, r) => {
    const i = (o, u) => {
        const s = r.push(o) - 1;
        return t.set(u, s), s;
      },
      l = (o) => {
        if (t.has(o)) return t.get(o);
        let [u, s] = mr(o);
        switch (u) {
          case Nl: {
            let c = o;
            switch (s) {
              case "bigint":
                (u = Ed), (c = o.toString());
                break;
              case "function":
              case "symbol":
                if (e) throw new TypeError("unable to serialize " + s);
                c = null;
                break;
              case "undefined":
                return i([xd], o);
            }
            return i([u, c], o);
          }
          case ul: {
            if (s) return i([s, [...o]], o);
            const c = [],
              f = i([u, c], o);
            for (const d of o) c.push(l(d));
            return f;
          }
          case sl: {
            if (s)
              switch (s) {
                case "BigInt":
                  return i([s, o.toString()], o);
                case "Boolean":
                case "Number":
                case "String":
                  return i([s, o.valueOf()], o);
              }
            if (n && "toJSON" in o) return l(o.toJSON());
            const c = [],
              f = i([u, c], o);
            for (const d of K0(o))
              (e || !xi(mr(o[d]))) && c.push([l(d), l(o[d])]);
            return f;
          }
          case ks:
            return i([u, o.toISOString()], o);
          case ws: {
            const { source: c, flags: f } = o;
            return i([u, { source: c, flags: f }], o);
          }
          case xs: {
            const c = [],
              f = i([u, c], o);
            for (const [d, p] of o)
              (e || !(xi(mr(d)) || xi(mr(p)))) && c.push([l(d), l(p)]);
            return f;
          }
          case Ss: {
            const c = [],
              f = i([u, c], o);
            for (const d of o) (e || !xi(mr(d))) && c.push(l(d));
            return f;
          }
        }
        const { message: a } = o;
        return i([u, { name: s, message: a }], o);
      };
    return l;
  },
  dc = (e, { json: n, lossy: t } = {}) => {
    const r = [];
    return Y0(!(n || t), !!n, new Map(), r)(e), r;
  },
  al =
    typeof structuredClone == "function"
      ? (e, n) =>
          n && ("json" in n || "lossy" in n) ? pc(dc(e, n)) : structuredClone(e)
      : (e, n) => pc(dc(e, n));
function X0(e, n) {
  const t = [{ type: "text", value: "↩" }];
  return (
    n > 1 &&
      t.push({
        type: "element",
        tagName: "sup",
        properties: {},
        children: [{ type: "text", value: String(n) }],
      }),
    t
  );
}
function q0(e, n) {
  return "Back to reference " + (e + 1) + (n > 1 ? "-" + n : "");
}
function G0(e) {
  const n =
      typeof e.options.clobberPrefix == "string"
        ? e.options.clobberPrefix
        : "user-content-",
    t = e.options.footnoteBackContent || X0,
    r = e.options.footnoteBackLabel || q0,
    i = e.options.footnoteLabel || "Footnotes",
    l = e.options.footnoteLabelTagName || "h2",
    o = e.options.footnoteLabelProperties || { className: ["sr-only"] },
    u = [];
  let s = -1;
  for (; ++s < e.footnoteOrder.length; ) {
    const a = e.footnoteById.get(e.footnoteOrder[s]);
    if (!a) continue;
    const c = e.all(a),
      f = String(a.identifier).toUpperCase(),
      d = rr(f.toLowerCase());
    let p = 0;
    const k = [],
      w = e.footnoteCounts.get(f);
    for (; w !== void 0 && ++p <= w; ) {
      k.length > 0 && k.push({ type: "text", value: " " });
      let m = typeof t == "string" ? t : t(s, p);
      typeof m == "string" && (m = { type: "text", value: m }),
        k.push({
          type: "element",
          tagName: "a",
          properties: {
            href: "#" + n + "fnref-" + d + (p > 1 ? "-" + p : ""),
            dataFootnoteBackref: "",
            ariaLabel: typeof r == "string" ? r : r(s, p),
            className: ["data-footnote-backref"],
          },
          children: Array.isArray(m) ? m : [m],
        });
    }
    const T = c[c.length - 1];
    if (T && T.type === "element" && T.tagName === "p") {
      const m = T.children[T.children.length - 1];
      m && m.type === "text"
        ? (m.value += " ")
        : T.children.push({ type: "text", value: " " }),
        T.children.push(...k);
    } else c.push(...k);
    const h = {
      type: "element",
      tagName: "li",
      properties: { id: n + "fn-" + d },
      children: e.wrap(c, !0),
    };
    e.patch(a, h), u.push(h);
  }
  if (u.length !== 0)
    return {
      type: "element",
      tagName: "section",
      properties: { dataFootnotes: !0, className: ["footnotes"] },
      children: [
        {
          type: "element",
          tagName: l,
          properties: { ...al(o), id: "footnote-label" },
          children: [{ type: "text", value: i }],
        },
        {
          type: "text",
          value: `
`,
        },
        {
          type: "element",
          tagName: "ol",
          properties: {},
          children: e.wrap(u, !0),
        },
        {
          type: "text",
          value: `
`,
        },
      ],
    };
}
const Cd = function (e) {
  if (e == null) return nv;
  if (typeof e == "function") return Il(e);
  if (typeof e == "object") return Array.isArray(e) ? J0(e) : Z0(e);
  if (typeof e == "string") return ev(e);
  throw new Error("Expected function, string, or object as test");
};
function J0(e) {
  const n = [];
  let t = -1;
  for (; ++t < e.length; ) n[t] = Cd(e[t]);
  return Il(r);
  function r(...i) {
    let l = -1;
    for (; ++l < n.length; ) if (n[l].apply(this, i)) return !0;
    return !1;
  }
}
function Z0(e) {
  const n = e;
  return Il(t);
  function t(r) {
    const i = r;
    let l;
    for (l in e) if (i[l] !== n[l]) return !1;
    return !0;
  }
}
function ev(e) {
  return Il(n);
  function n(t) {
    return t && t.type === e;
  }
}
function Il(e) {
  return n;
  function n(t, r, i) {
    return !!(
      tv(t) && e.call(this, t, typeof r == "number" ? r : void 0, i || void 0)
    );
  }
}
function nv() {
  return !0;
}
function tv(e) {
  return e !== null && typeof e == "object" && "type" in e;
}
const Pd = [],
  rv = !0,
  hc = !1,
  iv = "skip";
function lv(e, n, t, r) {
  let i;
  typeof n == "function" && typeof t != "function"
    ? ((r = t), (t = n))
    : (i = n);
  const l = Cd(i),
    o = r ? -1 : 1;
  u(e, void 0, [])();
  function u(s, a, c) {
    const f = s && typeof s == "object" ? s : {};
    if (typeof f.type == "string") {
      const p =
        typeof f.tagName == "string"
          ? f.tagName
          : typeof f.name == "string"
          ? f.name
          : void 0;
      Object.defineProperty(d, "name", {
        value: "node (" + (s.type + (p ? "<" + p + ">" : "")) + ")",
      });
    }
    return d;
    function d() {
      let p = Pd,
        k,
        w,
        T;
      if (
        (!n || l(s, a, c[c.length - 1] || void 0)) &&
        ((p = ov(t(s, c))), p[0] === hc)
      )
        return p;
      if ("children" in s && s.children) {
        const h = s;
        if (h.children && p[0] !== iv)
          for (
            w = (r ? h.children.length : -1) + o, T = c.concat(h);
            w > -1 && w < h.children.length;

          ) {
            const m = h.children[w];
            if (((k = u(m, w, T)()), k[0] === hc)) return k;
            w = typeof k[1] == "number" ? k[1] : w + o;
          }
      }
      return p;
    }
  }
}
function ov(e) {
  return Array.isArray(e)
    ? e
    : typeof e == "number"
    ? [rv, e]
    : e == null
    ? Pd
    : [e];
}
function _d(e, n, t, r) {
  let i, l, o;
  typeof n == "function" && typeof t != "function"
    ? ((l = void 0), (o = n), (i = t))
    : ((l = n), (o = t), (i = r)),
    lv(e, l, u, i);
  function u(s, a) {
    const c = a[a.length - 1],
      f = c ? c.children.indexOf(s) : void 0;
    return o(s, f, c);
  }
}
const pu = {}.hasOwnProperty,
  uv = {};
function sv(e, n) {
  const t = n || uv,
    r = new Map(),
    i = new Map(),
    l = new Map(),
    o = { ...W0, ...t.handlers },
    u = {
      all: a,
      applyData: cv,
      definitionById: r,
      footnoteById: i,
      footnoteCounts: l,
      footnoteOrder: [],
      handlers: o,
      one: s,
      options: t,
      patch: av,
      wrap: pv,
    };
  return (
    _d(e, function (c) {
      if (c.type === "definition" || c.type === "footnoteDefinition") {
        const f = c.type === "definition" ? r : i,
          d = String(c.identifier).toUpperCase();
        f.has(d) || f.set(d, c);
      }
    }),
    u
  );
  function s(c, f) {
    const d = c.type,
      p = u.handlers[d];
    if (pu.call(u.handlers, d) && p) return p(u, c, f);
    if (u.options.passThrough && u.options.passThrough.includes(d)) {
      if ("children" in c) {
        const { children: w, ...T } = c,
          h = al(T);
        return (h.children = u.all(c)), h;
      }
      return al(c);
    }
    return (u.options.unknownHandler || fv)(u, c, f);
  }
  function a(c) {
    const f = [];
    if ("children" in c) {
      const d = c.children;
      let p = -1;
      for (; ++p < d.length; ) {
        const k = u.one(d[p], c);
        if (k) {
          if (
            p &&
            d[p - 1].type === "break" &&
            (!Array.isArray(k) && k.type === "text" && (k.value = mc(k.value)),
            !Array.isArray(k) && k.type === "element")
          ) {
            const w = k.children[0];
            w && w.type === "text" && (w.value = mc(w.value));
          }
          Array.isArray(k) ? f.push(...k) : f.push(k);
        }
      }
    }
    return f;
  }
}
function av(e, n) {
  e.position && (n.position = Wg(e));
}
function cv(e, n) {
  let t = n;
  if (e && e.data) {
    const r = e.data.hName,
      i = e.data.hChildren,
      l = e.data.hProperties;
    if (typeof r == "string")
      if (t.type === "element") t.tagName = r;
      else {
        const o = "children" in t ? t.children : [t];
        t = { type: "element", tagName: r, properties: {}, children: o };
      }
    t.type === "element" && l && Object.assign(t.properties, al(l)),
      "children" in t &&
        t.children &&
        i !== null &&
        i !== void 0 &&
        (t.children = i);
  }
  return t;
}
function fv(e, n) {
  const t = n.data || {},
    r =
      "value" in n && !(pu.call(t, "hProperties") || pu.call(t, "hChildren"))
        ? { type: "text", value: n.value }
        : {
            type: "element",
            tagName: "div",
            properties: {},
            children: e.all(n),
          };
  return e.patch(n, r), e.applyData(n, r);
}
function pv(e, n) {
  const t = [];
  let r = -1;
  for (
    n &&
    t.push({
      type: "text",
      value: `
`,
    });
    ++r < e.length;

  )
    r &&
      t.push({
        type: "text",
        value: `
`,
      }),
      t.push(e[r]);
  return (
    n &&
      e.length > 0 &&
      t.push({
        type: "text",
        value: `
`,
      }),
    t
  );
}
function mc(e) {
  let n = 0,
    t = e.charCodeAt(n);
  for (; t === 9 || t === 32; ) n++, (t = e.charCodeAt(n));
  return e.slice(n);
}
function gc(e, n) {
  const t = sv(e, n),
    r = t.one(e, void 0),
    i = G0(t),
    l = Array.isArray(r)
      ? { type: "root", children: r }
      : r || { type: "root", children: [] };
  return (
    i &&
      l.children.push(
        {
          type: "text",
          value: `
`,
        },
        i
      ),
    l
  );
}
function dv(e, n) {
  return e && "run" in e
    ? async function (t, r) {
        const i = gc(t, { file: r, ...n });
        await e.run(i, r);
      }
    : function (t, r) {
        return gc(t, { file: r, ...(e || n) });
      };
}
function yc(e) {
  if (e) throw e;
}
var Mi = Object.prototype.hasOwnProperty,
  Nd = Object.prototype.toString,
  vc = Object.defineProperty,
  kc = Object.getOwnPropertyDescriptor,
  wc = function (n) {
    return typeof Array.isArray == "function"
      ? Array.isArray(n)
      : Nd.call(n) === "[object Array]";
  },
  xc = function (n) {
    if (!n || Nd.call(n) !== "[object Object]") return !1;
    var t = Mi.call(n, "constructor"),
      r =
        n.constructor &&
        n.constructor.prototype &&
        Mi.call(n.constructor.prototype, "isPrototypeOf");
    if (n.constructor && !t && !r) return !1;
    var i;
    for (i in n);
    return typeof i > "u" || Mi.call(n, i);
  },
  Sc = function (n, t) {
    vc && t.name === "__proto__"
      ? vc(n, t.name, {
          enumerable: !0,
          configurable: !0,
          value: t.newValue,
          writable: !0,
        })
      : (n[t.name] = t.newValue);
  },
  Ec = function (n, t) {
    if (t === "__proto__")
      if (Mi.call(n, t)) {
        if (kc) return kc(n, t).value;
      } else return;
    return n[t];
  },
  hv = function e() {
    var n,
      t,
      r,
      i,
      l,
      o,
      u = arguments[0],
      s = 1,
      a = arguments.length,
      c = !1;
    for (
      typeof u == "boolean" && ((c = u), (u = arguments[1] || {}), (s = 2)),
        (u == null || (typeof u != "object" && typeof u != "function")) &&
          (u = {});
      s < a;
      ++s
    )
      if (((n = arguments[s]), n != null))
        for (t in n)
          (r = Ec(u, t)),
            (i = Ec(n, t)),
            u !== i &&
              (c && i && (xc(i) || (l = wc(i)))
                ? (l
                    ? ((l = !1), (o = r && wc(r) ? r : []))
                    : (o = r && xc(r) ? r : {}),
                  Sc(u, { name: t, newValue: e(c, o, i) }))
                : typeof i < "u" && Sc(u, { name: t, newValue: i }));
    return u;
  };
const lo = zc(hv);
function du(e) {
  if (typeof e != "object" || e === null) return !1;
  const n = Object.getPrototypeOf(e);
  return (
    (n === null ||
      n === Object.prototype ||
      Object.getPrototypeOf(n) === null) &&
    !(Symbol.toStringTag in e) &&
    !(Symbol.iterator in e)
  );
}
function mv() {
  const e = [],
    n = { run: t, use: r };
  return n;
  function t(...i) {
    let l = -1;
    const o = i.pop();
    if (typeof o != "function")
      throw new TypeError("Expected function as last argument, not " + o);
    u(null, ...i);
    function u(s, ...a) {
      const c = e[++l];
      let f = -1;
      if (s) {
        o(s);
        return;
      }
      for (; ++f < i.length; )
        (a[f] === null || a[f] === void 0) && (a[f] = i[f]);
      (i = a), c ? gv(c, u)(...a) : o(null, ...a);
    }
  }
  function r(i) {
    if (typeof i != "function")
      throw new TypeError("Expected `middelware` to be a function, not " + i);
    return e.push(i), n;
  }
}
function gv(e, n) {
  let t;
  return r;
  function r(...o) {
    const u = e.length > o.length;
    let s;
    u && o.push(i);
    try {
      s = e.apply(this, o);
    } catch (a) {
      const c = a;
      if (u && t) throw c;
      return i(c);
    }
    u ||
      (s && s.then && typeof s.then == "function"
        ? s.then(l, i)
        : s instanceof Error
        ? i(s)
        : l(s));
  }
  function i(o, ...u) {
    t || ((t = !0), n(o, ...u));
  }
  function l(o) {
    i(null, o);
  }
}
const yn = { basename: yv, dirname: vv, extname: kv, join: wv, sep: "/" };
function yv(e, n) {
  if (n !== void 0 && typeof n != "string")
    throw new TypeError('"ext" argument must be a string');
  ni(e);
  let t = 0,
    r = -1,
    i = e.length,
    l;
  if (n === void 0 || n.length === 0 || n.length > e.length) {
    for (; i--; )
      if (e.codePointAt(i) === 47) {
        if (l) {
          t = i + 1;
          break;
        }
      } else r < 0 && ((l = !0), (r = i + 1));
    return r < 0 ? "" : e.slice(t, r);
  }
  if (n === e) return "";
  let o = -1,
    u = n.length - 1;
  for (; i--; )
    if (e.codePointAt(i) === 47) {
      if (l) {
        t = i + 1;
        break;
      }
    } else
      o < 0 && ((l = !0), (o = i + 1)),
        u > -1 &&
          (e.codePointAt(i) === n.codePointAt(u--)
            ? u < 0 && (r = i)
            : ((u = -1), (r = o)));
  return t === r ? (r = o) : r < 0 && (r = e.length), e.slice(t, r);
}
function vv(e) {
  if ((ni(e), e.length === 0)) return ".";
  let n = -1,
    t = e.length,
    r;
  for (; --t; )
    if (e.codePointAt(t) === 47) {
      if (r) {
        n = t;
        break;
      }
    } else r || (r = !0);
  return n < 0
    ? e.codePointAt(0) === 47
      ? "/"
      : "."
    : n === 1 && e.codePointAt(0) === 47
    ? "//"
    : e.slice(0, n);
}
function kv(e) {
  ni(e);
  let n = e.length,
    t = -1,
    r = 0,
    i = -1,
    l = 0,
    o;
  for (; n--; ) {
    const u = e.codePointAt(n);
    if (u === 47) {
      if (o) {
        r = n + 1;
        break;
      }
      continue;
    }
    t < 0 && ((o = !0), (t = n + 1)),
      u === 46 ? (i < 0 ? (i = n) : l !== 1 && (l = 1)) : i > -1 && (l = -1);
  }
  return i < 0 || t < 0 || l === 0 || (l === 1 && i === t - 1 && i === r + 1)
    ? ""
    : e.slice(i, t);
}
function wv(...e) {
  let n = -1,
    t;
  for (; ++n < e.length; )
    ni(e[n]), e[n] && (t = t === void 0 ? e[n] : t + "/" + e[n]);
  return t === void 0 ? "." : xv(t);
}
function xv(e) {
  ni(e);
  const n = e.codePointAt(0) === 47;
  let t = Sv(e, !n);
  return (
    t.length === 0 && !n && (t = "."),
    t.length > 0 && e.codePointAt(e.length - 1) === 47 && (t += "/"),
    n ? "/" + t : t
  );
}
function Sv(e, n) {
  let t = "",
    r = 0,
    i = -1,
    l = 0,
    o = -1,
    u,
    s;
  for (; ++o <= e.length; ) {
    if (o < e.length) u = e.codePointAt(o);
    else {
      if (u === 47) break;
      u = 47;
    }
    if (u === 47) {
      if (!(i === o - 1 || l === 1))
        if (i !== o - 1 && l === 2) {
          if (
            t.length < 2 ||
            r !== 2 ||
            t.codePointAt(t.length - 1) !== 46 ||
            t.codePointAt(t.length - 2) !== 46
          ) {
            if (t.length > 2) {
              if (((s = t.lastIndexOf("/")), s !== t.length - 1)) {
                s < 0
                  ? ((t = ""), (r = 0))
                  : ((t = t.slice(0, s)),
                    (r = t.length - 1 - t.lastIndexOf("/"))),
                  (i = o),
                  (l = 0);
                continue;
              }
            } else if (t.length > 0) {
              (t = ""), (r = 0), (i = o), (l = 0);
              continue;
            }
          }
          n && ((t = t.length > 0 ? t + "/.." : ".."), (r = 2));
        } else
          t.length > 0
            ? (t += "/" + e.slice(i + 1, o))
            : (t = e.slice(i + 1, o)),
            (r = o - i - 1);
      (i = o), (l = 0);
    } else u === 46 && l > -1 ? l++ : (l = -1);
  }
  return t;
}
function ni(e) {
  if (typeof e != "string")
    throw new TypeError("Path must be a string. Received " + JSON.stringify(e));
}
const Ev = { cwd: Cv };
function Cv() {
  return "/";
}
function hu(e) {
  return !!(
    e !== null &&
    typeof e == "object" &&
    "href" in e &&
    e.href &&
    "protocol" in e &&
    e.protocol &&
    e.auth === void 0
  );
}
function Pv(e) {
  if (typeof e == "string") e = new URL(e);
  else if (!hu(e)) {
    const n = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' +
        e +
        "`"
    );
    throw ((n.code = "ERR_INVALID_ARG_TYPE"), n);
  }
  if (e.protocol !== "file:") {
    const n = new TypeError("The URL must be of scheme file");
    throw ((n.code = "ERR_INVALID_URL_SCHEME"), n);
  }
  return _v(e);
}
function _v(e) {
  if (e.hostname !== "") {
    const r = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw ((r.code = "ERR_INVALID_FILE_URL_HOST"), r);
  }
  const n = e.pathname;
  let t = -1;
  for (; ++t < n.length; )
    if (n.codePointAt(t) === 37 && n.codePointAt(t + 1) === 50) {
      const r = n.codePointAt(t + 2);
      if (r === 70 || r === 102) {
        const i = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw ((i.code = "ERR_INVALID_FILE_URL_PATH"), i);
      }
    }
  return decodeURIComponent(n);
}
const oo = ["history", "path", "basename", "stem", "extname", "dirname"];
class Id {
  constructor(n) {
    let t;
    n
      ? hu(n)
        ? (t = { path: n })
        : typeof n == "string" || Nv(n)
        ? (t = { value: n })
        : (t = n)
      : (t = {}),
      (this.cwd = "cwd" in t ? "" : Ev.cwd()),
      (this.data = {}),
      (this.history = []),
      (this.messages = []),
      this.value,
      this.map,
      this.result,
      this.stored;
    let r = -1;
    for (; ++r < oo.length; ) {
      const l = oo[r];
      l in t &&
        t[l] !== void 0 &&
        t[l] !== null &&
        (this[l] = l === "history" ? [...t[l]] : t[l]);
    }
    let i;
    for (i in t) oo.includes(i) || (this[i] = t[i]);
  }
  get basename() {
    return typeof this.path == "string" ? yn.basename(this.path) : void 0;
  }
  set basename(n) {
    so(n, "basename"),
      uo(n, "basename"),
      (this.path = yn.join(this.dirname || "", n));
  }
  get dirname() {
    return typeof this.path == "string" ? yn.dirname(this.path) : void 0;
  }
  set dirname(n) {
    Cc(this.basename, "dirname"), (this.path = yn.join(n || "", this.basename));
  }
  get extname() {
    return typeof this.path == "string" ? yn.extname(this.path) : void 0;
  }
  set extname(n) {
    if ((uo(n, "extname"), Cc(this.dirname, "extname"), n)) {
      if (n.codePointAt(0) !== 46)
        throw new Error("`extname` must start with `.`");
      if (n.includes(".", 1))
        throw new Error("`extname` cannot contain multiple dots");
    }
    this.path = yn.join(this.dirname, this.stem + (n || ""));
  }
  get path() {
    return this.history[this.history.length - 1];
  }
  set path(n) {
    hu(n) && (n = Pv(n)),
      so(n, "path"),
      this.path !== n && this.history.push(n);
  }
  get stem() {
    return typeof this.path == "string"
      ? yn.basename(this.path, this.extname)
      : void 0;
  }
  set stem(n) {
    so(n, "stem"),
      uo(n, "stem"),
      (this.path = yn.join(this.dirname || "", n + (this.extname || "")));
  }
  fail(n, t, r) {
    const i = this.message(n, t, r);
    throw ((i.fatal = !0), i);
  }
  info(n, t, r) {
    const i = this.message(n, t, r);
    return (i.fatal = void 0), i;
  }
  message(n, t, r) {
    const i = new Te(n, t, r);
    return (
      this.path && ((i.name = this.path + ":" + i.name), (i.file = this.path)),
      (i.fatal = !1),
      this.messages.push(i),
      i
    );
  }
  toString(n) {
    return this.value === void 0
      ? ""
      : typeof this.value == "string"
      ? this.value
      : new TextDecoder(n || void 0).decode(this.value);
  }
}
function uo(e, n) {
  if (e && e.includes(yn.sep))
    throw new Error(
      "`" + n + "` cannot be a path: did not expect `" + yn.sep + "`"
    );
}
function so(e, n) {
  if (!e) throw new Error("`" + n + "` cannot be empty");
}
function Cc(e, n) {
  if (!e) throw new Error("Setting `" + n + "` requires `path` to be set too");
}
function Nv(e) {
  return !!(
    e &&
    typeof e == "object" &&
    "byteLength" in e &&
    "byteOffset" in e
  );
}
const Iv = function (e) {
    const r = this.constructor.prototype,
      i = r[e],
      l = function () {
        return i.apply(l, arguments);
      };
    return Object.setPrototypeOf(l, r), l;
  },
  Tv = {}.hasOwnProperty;
class Es extends Iv {
  constructor() {
    super("copy"),
      (this.Compiler = void 0),
      (this.Parser = void 0),
      (this.attachers = []),
      (this.compiler = void 0),
      (this.freezeIndex = -1),
      (this.frozen = void 0),
      (this.namespace = {}),
      (this.parser = void 0),
      (this.transformers = mv());
  }
  copy() {
    const n = new Es();
    let t = -1;
    for (; ++t < this.attachers.length; ) {
      const r = this.attachers[t];
      n.use(...r);
    }
    return n.data(lo(!0, {}, this.namespace)), n;
  }
  data(n, t) {
    return typeof n == "string"
      ? arguments.length === 2
        ? (fo("data", this.frozen), (this.namespace[n] = t), this)
        : (Tv.call(this.namespace, n) && this.namespace[n]) || void 0
      : n
      ? (fo("data", this.frozen), (this.namespace = n), this)
      : this.namespace;
  }
  freeze() {
    if (this.frozen) return this;
    const n = this;
    for (; ++this.freezeIndex < this.attachers.length; ) {
      const [t, ...r] = this.attachers[this.freezeIndex];
      if (r[0] === !1) continue;
      r[0] === !0 && (r[0] = void 0);
      const i = t.call(n, ...r);
      typeof i == "function" && this.transformers.use(i);
    }
    return (
      (this.frozen = !0), (this.freezeIndex = Number.POSITIVE_INFINITY), this
    );
  }
  parse(n) {
    this.freeze();
    const t = Si(n),
      r = this.parser || this.Parser;
    return ao("parse", r), r(String(t), t);
  }
  process(n, t) {
    const r = this;
    return (
      this.freeze(),
      ao("process", this.parser || this.Parser),
      co("process", this.compiler || this.Compiler),
      t ? i(void 0, t) : new Promise(i)
    );
    function i(l, o) {
      const u = Si(n),
        s = r.parse(u);
      r.run(s, u, function (c, f, d) {
        if (c || !f || !d) return a(c);
        const p = f,
          k = r.stringify(p, d);
        Ov(k) ? (d.value = k) : (d.result = k), a(c, d);
      });
      function a(c, f) {
        c || !f ? o(c) : l ? l(f) : t(void 0, f);
      }
    }
  }
  processSync(n) {
    let t = !1,
      r;
    return (
      this.freeze(),
      ao("processSync", this.parser || this.Parser),
      co("processSync", this.compiler || this.Compiler),
      this.process(n, i),
      _c("processSync", "process", t),
      r
    );
    function i(l, o) {
      (t = !0), yc(l), (r = o);
    }
  }
  run(n, t, r) {
    Pc(n), this.freeze();
    const i = this.transformers;
    return (
      !r && typeof t == "function" && ((r = t), (t = void 0)),
      r ? l(void 0, r) : new Promise(l)
    );
    function l(o, u) {
      const s = Si(t);
      i.run(n, s, a);
      function a(c, f, d) {
        const p = f || n;
        c ? u(c) : o ? o(p) : r(void 0, p, d);
      }
    }
  }
  runSync(n, t) {
    let r = !1,
      i;
    return this.run(n, t, l), _c("runSync", "run", r), i;
    function l(o, u) {
      yc(o), (i = u), (r = !0);
    }
  }
  stringify(n, t) {
    this.freeze();
    const r = Si(t),
      i = this.compiler || this.Compiler;
    return co("stringify", i), Pc(n), i(n, r);
  }
  use(n, ...t) {
    const r = this.attachers,
      i = this.namespace;
    if ((fo("use", this.frozen), n != null))
      if (typeof n == "function") s(n, t);
      else if (typeof n == "object") Array.isArray(n) ? u(n) : o(n);
      else throw new TypeError("Expected usable value, not `" + n + "`");
    return this;
    function l(a) {
      if (typeof a == "function") s(a, []);
      else if (typeof a == "object")
        if (Array.isArray(a)) {
          const [c, ...f] = a;
          s(c, f);
        } else o(a);
      else throw new TypeError("Expected usable value, not `" + a + "`");
    }
    function o(a) {
      if (!("plugins" in a) && !("settings" in a))
        throw new Error(
          "Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither"
        );
      u(a.plugins), a.settings && (i.settings = lo(!0, i.settings, a.settings));
    }
    function u(a) {
      let c = -1;
      if (a != null)
        if (Array.isArray(a))
          for (; ++c < a.length; ) {
            const f = a[c];
            l(f);
          }
        else throw new TypeError("Expected a list of plugins, not `" + a + "`");
    }
    function s(a, c) {
      let f = -1,
        d = -1;
      for (; ++f < r.length; )
        if (r[f][0] === a) {
          d = f;
          break;
        }
      if (d === -1) r.push([a, ...c]);
      else if (c.length > 0) {
        let [p, ...k] = c;
        const w = r[d][1];
        du(w) && du(p) && (p = lo(!0, w, p)), (r[d] = [a, p, ...k]);
      }
    }
  }
}
const zv = new Es().freeze();
function ao(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `parser`");
}
function co(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `compiler`");
}
function fo(e, n) {
  if (n)
    throw new Error(
      "Cannot call `" +
        e +
        "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function Pc(e) {
  if (!du(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function _c(e, n, t) {
  if (!t)
    throw new Error("`" + e + "` finished async. Use `" + n + "` instead");
}
function Si(e) {
  return Lv(e) ? e : new Id(e);
}
function Lv(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function Ov(e) {
  return typeof e == "string" || Av(e);
}
function Av(e) {
  return !!(
    e &&
    typeof e == "object" &&
    "byteLength" in e &&
    "byteOffset" in e
  );
}
const Rv = "https://github.com/remarkjs/react-markdown/blob/main/changelog.md",
  Nc = [],
  Ic = { allowDangerousHtml: !0 },
  Dv = /^(https?|ircs?|mailto|xmpp)$/i,
  Mv = [
    { from: "astPlugins", id: "remove-buggy-html-in-markdown-parser" },
    { from: "allowDangerousHtml", id: "remove-buggy-html-in-markdown-parser" },
    {
      from: "allowNode",
      id: "replace-allownode-allowedtypes-and-disallowedtypes",
      to: "allowElement",
    },
    {
      from: "allowedTypes",
      id: "replace-allownode-allowedtypes-and-disallowedtypes",
      to: "allowedElements",
    },
    {
      from: "disallowedTypes",
      id: "replace-allownode-allowedtypes-and-disallowedtypes",
      to: "disallowedElements",
    },
    { from: "escapeHtml", id: "remove-buggy-html-in-markdown-parser" },
    { from: "includeElementIndex", id: "#remove-includeelementindex" },
    {
      from: "includeNodeIndex",
      id: "change-includenodeindex-to-includeelementindex",
    },
    { from: "linkTarget", id: "remove-linktarget" },
    {
      from: "plugins",
      id: "change-plugins-to-remarkplugins",
      to: "remarkPlugins",
    },
    { from: "rawSourcePos", id: "#remove-rawsourcepos" },
    {
      from: "renderers",
      id: "change-renderers-to-components",
      to: "components",
    },
    { from: "source", id: "change-source-to-children", to: "children" },
    { from: "sourcePos", id: "#remove-sourcepos" },
    { from: "transformImageUri", id: "#add-urltransform", to: "urlTransform" },
    { from: "transformLinkUri", id: "#add-urltransform", to: "urlTransform" },
  ];
function Fv(e) {
  const n = e.allowedElements,
    t = e.allowElement,
    r = e.children || "",
    i = e.className,
    l = e.components,
    o = e.disallowedElements,
    u = e.rehypePlugins || Nc,
    s = e.remarkPlugins || Nc,
    a = e.remarkRehypeOptions ? { ...e.remarkRehypeOptions, ...Ic } : Ic,
    c = e.skipHtml,
    f = e.unwrapDisallowed,
    d = e.urlTransform || jv,
    p = zv().use(v0).use(s).use(dv, a).use(u),
    k = new Id();
  typeof r == "string" && (k.value = r);
  for (const m of Mv)
    Object.hasOwn(e, m.from) &&
      ("" +
        m.from +
        (m.to ? "use `" + m.to + "` instead" : "remove it") +
        Rv +
        m.id,
      void 0);
  const w = p.parse(k);
  let T = p.runSync(w, k);
  return (
    i &&
      (T = {
        type: "element",
        tagName: "div",
        properties: { className: i },
        children: T.type === "root" ? T.children : [T],
      }),
    _d(T, h),
    qg(T, {
      Fragment: Hc,
      components: l,
      ignoreInvalidStyle: !0,
      jsx: X,
      jsxs: xe,
      passKeys: !0,
      passNode: !0,
    })
  );
  function h(m, y, S) {
    if (m.type === "raw" && S && typeof y == "number")
      return (
        c
          ? S.children.splice(y, 1)
          : (S.children[y] = { type: "text", value: m.value }),
        y
      );
    if (m.type === "element") {
      let C;
      for (C in to)
        if (Object.hasOwn(to, C) && Object.hasOwn(m.properties, C)) {
          const x = m.properties[C],
            N = to[C];
          (N === null || N.includes(m.tagName)) &&
            (m.properties[C] = d(String(x || ""), C, m));
        }
    }
    if (m.type === "element") {
      let C = n ? !n.includes(m.tagName) : o ? o.includes(m.tagName) : !1;
      if (
        (!C && t && typeof y == "number" && (C = !t(m, y, S)),
        C && S && typeof y == "number")
      )
        return (
          f && m.children
            ? S.children.splice(y, 1, ...m.children)
            : S.children.splice(y, 1),
          y
        );
    }
  }
}
function jv(e) {
  const n = e.indexOf(":"),
    t = e.indexOf("?"),
    r = e.indexOf("#"),
    i = e.indexOf("/");
  return n < 0 ||
    (i > -1 && n > i) ||
    (t > -1 && n > t) ||
    (r > -1 && n > r) ||
    Dv.test(e.slice(0, n))
    ? e
    : "";
}
const Bv = (e) => e.charAt(0).toUpperCase() + e.slice(1).toLowerCase(),
  Uv = ({ messages: e, currentUser: n }) => {
    const t = fe.useRef(null),
      r = fe.useRef(null),
      [i, l] = fe.useState(!0),
      o = () => {
        t.current && t.current.scrollIntoView({ behavior: "smooth" });
      };
    fe.useEffect(() => {
      i && o();
    }, [e]);
    const u = () => {
        const c =
          r.current.scrollHeight - r.current.scrollTop ===
          r.current.clientHeight;
        l(c);
      },
      s = (c) => {
        const f = new Date(c);
        return `${f.toLocaleDateString()} ${f.toLocaleTimeString()}`;
      },
      a = (c) => {
        const f = c.sender ? c.sender.charAt(0).toUpperCase() : "A";
        return c.profilePicture
          ? X("img", {
              src: c.profilePicture,
              alt: "profile",
              className: "w-8 h-8 rounded-full object-cover",
            })
          : X("div", {
              className:
                "w-8 h-8 rounded-full bg-gray-500 text-white flex items-center justify-center",
              children: f,
            });
      };
    return xe("div", {
      className: "flex-grow p-4 overflow-y-auto border-b h-0",
      ref: r,
      onScroll: u,
      children: [
        e.length > 0
          ? e.map((c, f) =>
              xe(
                "div",
                {
                  className: `p-2 mb-2 border rounded-lg max-w-md ${
                    c.sender.trim().toLowerCase() === n.trim().toLowerCase()
                      ? "ml-auto bg-blue-300 text-blue-900"
                      : c.sender.trim().toLowerCase() === "bot01"
                      ? "mr-auto bg-green-100 text-gray-800"
                      : "mr-auto bg-gray-100 text-gray-800"
                  } animate-message`,
                  children: [
                    xe("div", {
                      className: "flex items-center mb-1",
                      children: [
                        c.sender !== "System" &&
                          X("div", { className: "mr-2", children: a(c) }),
                        X("span", {
                          className: "font-bold",
                          children: Bv(c.sender) || "Anonymous",
                        }),
                        X("span", {
                          className: "ml-auto text-sm text-gray-500",
                          children: s(c.timestamp),
                        }),
                      ],
                    }),
                    X("div", { children: X(Fv, { children: c.text }) }),
                    X("div", {
                      className: "text-right text-xs text-gray-500",
                      children: c.seen ? "Vu" : "Non vu",
                    }),
                  ],
                },
                f
              )
            )
          : X("p", { children: "No messages yet" }),
        X("div", { ref: t }),
      ],
    });
  },
  Vv = ({ onSendMessage: e, isInputEnabled: n }) => {
    const [t, r] = fe.useState(""),
      i = (u) => {
        r(u.target.value);
      },
      l = () => {
        n && (e(t), r(""));
      };
    return xe("div", {
      className: "flex p-2",
      children: [
        X("textarea", {
          className:
            "flex-grow p-2 border border-gray-300 rounded-l resize-none",
          placeholder: n ? "Type a message..." : "Waiting for connection...",
          value: t,
          onChange: i,
          onKeyDown: (u) => {
            u.key === "Enter" && !u.shiftKey && n && (u.preventDefault(), l());
          },
          disabled: !n,
          rows: "2",
        }),
        X("button", {
          className: `p-2 ${
            n ? "bg-blue-500" : "bg-gray-400"
          } text-white rounded-r`,
          onClick: l,
          disabled: !n,
          children: "Send",
        }),
      ],
    });
  },
  Tc = (e) => e.charAt(0).toUpperCase() + e.slice(1).toLowerCase(),
  Hv = () => {
    const [e, n] = fe.useState([]),
      [t, r] = fe.useState(null),
      [i, l] = fe.useState("Anonymous"),
      [o, u] = fe.useState("membre"),
      [s, a] = fe.useState(""),
      [c, f] = fe.useState("disconnected"),
      [d, p] = fe.useState([]),
      [k, w] = fe.useState(!1),
      [T, h] = fe.useState(null),
      [m, y] = fe.useState(!1),
      [S, C] = fe.useState(null),
      x = (c === "active" || c === "inactive") && (d.length > 0 || k),
      N = 5e3,
      O = (L) => {
        C(L), y(!0);
      };
    fe.useEffect(() => {
      const L = window.currentUser || "Anonymous",
        A = window.userType || "membre",
        b = window.memberId || null;
      l(L), u(A), h(b);
    }, []),
      fe.useEffect(() => {
        if (T) {
          const L = window.location.protocol === "https:" ? "wss" : "ws",
            A = new WebSocket(`${L}://${window.location.host}/ws/chat/${T}/`);
          r(A),
            (A.onopen = () => {
              console.log("WebSocket connected to room", T);
              const V = setInterval(() => {
                A.readyState === WebSocket.OPEN &&
                  A.send(JSON.stringify({ type: "heartbeat", user: i }));
              }, N);
              A.onclose = () => {
                clearInterval(V),
                  console.log("WebSocket disconnected from room", T);
              };
            }),
            (A.onmessage = (V) => {
              const M = JSON.parse(V.data);
              if (
                (console.log("Received data from WebSocket: ", M),
                M.type === "chat_history")
              ) {
                const H = M.messages.map((P) => ({
                  id: P.message_id,
                  text: P.message,
                  sender: P.sender,
                  timestamp: P.timestamp,
                  seen: P.seen,
                }));
                n(H);
              } else
                M.type === "room_info"
                  ? (a(M.membre_name),
                    p(M.doctors_in_room),
                    f(M.member_status.status))
                  : M.type === "doctor_joined"
                  ? p((H) =>
                      H.some((P) => P.name === M.doctor_name)
                        ? H
                        : [...H, { name: M.doctor_name, status: "active" }]
                    )
                  : M.type === "doctor_left"
                  ? p((H) => H.filter((P) => P.name !== M.doctor_name))
                  : M.type === "doctor_active"
                  ? p((H) =>
                      H.map((P) =>
                        P.name === M.doctor_name
                          ? { ...P, status: "active" }
                          : P
                      )
                    )
                  : M.type === "doctor_inactive"
                  ? p((H) =>
                      H.map((P) =>
                        P.name === M.doctor_name
                          ? { ...P, status: "inactive" }
                          : P
                      )
                    )
                  : M.type === "member_active"
                  ? f("active")
                  : M.type === "member_inactive"
                  ? f("inactive")
                  : M.type === "member_disconnected"
                  ? f("disconnected")
                  : M.type === "message_seen"
                  ? n((H) =>
                      H.map((P) =>
                        P.id === M.message_id ? { ...P, seen: M.seen } : P
                      )
                    )
                  : M.type === "chat_message_stream"
                  ? b(M.message)
                  : M.message && M.sender && M.timestamp
                  ? n((H) => [
                      ...H,
                      {
                        id: M.message_id,
                        text: M.message,
                        sender: M.sender,
                        timestamp: M.timestamp,
                        seen: M.seen,
                      },
                    ])
                  : M.type === "incoming_call" && O(M.doctor);
            });
          const b = (V) => {
              n((M) => {
                const H = M[M.length - 1];
                if (H && H.sender === "Bot01") {
                  const P = { ...H, text: H.text + V };
                  return [...M.slice(0, -1), P];
                } else
                  return [
                    ...M,
                    { sender: "Bot01", text: V, timestamp: new Date() },
                  ];
              });
            },
            ee = () => {
              document.visibilityState === "hidden"
                ? A.send(JSON.stringify({ type: "inactive" }))
                : A.send(JSON.stringify({ type: "active" }));
            };
          return (
            document.addEventListener("visibilitychange", ee),
            () => {
              A.close(), document.removeEventListener("visibilitychange", ee);
            }
          );
        }
      }, [T]);
    const F = async () => {
      try {
        const A = await (await fetch("/check-ai-availability/")).json();
        w(A.available);
      } catch (L) {
        console.error("Error checking AI availability:", L), w(!1);
      }
    };
    fe.useEffect(() => {
      F();
    }, []);
    const D = (L) => {
      if (L.trim()) {
        const A = {
          message: L,
          sender: i,
          timestamp: new Date().toISOString(),
        };
        t && t.readyState === WebSocket.OPEN && t.send(JSON.stringify(A));
      }
    };
    return xe("div", {
      className: "flex h-full w-full ",
      children: [
        xe("div", {
          className: "w-2/6 px-4 py-6  text-white bg-gray-700 flex flex-col",
          children: [
            xe("div", {
              className: "py-4",
              children: [
                xe("h2", {
                  className: "text-lg font-semibold",
                  children: ["Salon de consultation pour : ", Tc(s)],
                }),
                xe("p", {
                  className: "text-sm",
                  children: [
                    "Statut du membre :",
                    " ",
                    X("span", {
                      className:
                        c === "active"
                          ? "text-green-500"
                          : c === "inactive"
                          ? "text-yellow-500"
                          : "text-red-500",
                      children: c === "active" ? "Actif" : "Inactif",
                    }),
                  ],
                }),
              ],
            }),
            xe("div", {
              className: "border-t py-4",
              children: [
                X("h3", {
                  className: "font-semibold mb-2",
                  children: "Médecins",
                }),
                d.length > 0
                  ? X("ul", {
                      children: d.map((L, A) =>
                        xe(
                          "li",
                          {
                            className:
                              L.name === i
                                ? "font-bold text-blue-500"
                                : L.status === "inactive"
                                ? "text-gray-500"
                                : "",
                            children: [
                              Tc(L.name),
                              " (",
                              L.status === "inactive" ? "Inactif" : "Actif",
                              ")",
                            ],
                          },
                          A
                        )
                      ),
                    })
                  : X("p", {
                      className: "text-gray-400",
                      children: "Aucun médecin connecté",
                    }),
              ],
            }),
            xe("div", {
              className: "border-t py-4",
              children: [
                X("h3", {
                  className: "font-semibold mb-2",
                  children: "Assistant IA",
                }),
                k
                  ? X("p", {
                      className: "text-green-500",
                      children: "Bot01 (Disponible)",
                    })
                  : X("p", {
                      className: "text-gray-400",
                      children: "Aucun assistant IA disponible",
                    }),
              ],
            }),
            o === "medecin" &&
              X("div", {
                className: "mt-auto border-t pt-4",
                children: X("button", {
                  className: `w-full py-2 text-white rounded-lg ${
                    c === "disconnected"
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                  }`,
                  disabled: c === "disconnected",
                  onClick: () => {
                    t.send(
                      JSON.stringify({
                        type: "call_initiated",
                        doctor: i,
                        room_id: T,
                      })
                    ),
                      window.open(
                        `/video-call/${T}?initiator=true`,
                        "_blank",
                        "width=800,height=600"
                      );
                  },
                  children: "Lancer un appel",
                }),
              }),
          ],
        }),
        xe("div", {
          className: "flex-grow flex flex-col p-4 bg-gray-200",
          children: [
            X(Uv, { messages: e, currentUser: i }),
            X(Vv, { onSendMessage: D, isInputEnabled: x }),
          ],
        }),
        m &&
          S !== i &&
          X("div", {
            className:
              "modal fixed inset-0 flex items-center justify-center z-50",
            children: xe("div", {
              className: "bg-white p-6 rounded-lg shadow-lg",
              children: [
                xe("h2", { children: [S, " is calling..."] }),
                xe("div", {
                  className: "flex justify-between mt-4",
                  children: [
                    X("button", {
                      className:
                        "bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded",
                      onClick: () => {
                        window.open(
                          `/video-call/${T}`,
                          "_blank",
                          "width=800,height=600"
                        ),
                          y(!1);
                      },
                      children: "Accept",
                    }),
                    X("button", {
                      className:
                        "bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded",
                      onClick: () => y(!1),
                      children: "Reject",
                    }),
                  ],
                }),
              ],
            }),
          }),
      ],
    });
  };
function $v() {
  return X(Hc, { children: X(Hv, {}) });
}
po.createRoot(document.getElementById("react-app-chat")).render(
  X(Zd.StrictMode, { children: X($v, {}) })
);
