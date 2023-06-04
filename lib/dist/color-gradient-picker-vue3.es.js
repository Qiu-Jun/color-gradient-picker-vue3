var re = Object.defineProperty, le = Object.defineProperties;
var ie = Object.getOwnPropertyDescriptors;
var O = Object.getOwnPropertySymbols;
var se = Object.prototype.hasOwnProperty, ue = Object.prototype.propertyIsEnumerable;
var U = (n, t, e) => t in n ? re(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e, b = (n, t) => {
  for (var e in t || (t = {}))
    se.call(t, e) && U(n, e, t[e]);
  if (O)
    for (var e of O(t))
      ue.call(t, e) && U(n, e, t[e]);
  return n;
}, y = (n, t) => le(n, ie(t));
import { defineComponent as f, ref as L, reactive as E, computed as _, onMounted as N, openBlock as C, createElementBlock as x, normalizeStyle as H, unref as S, createElementVNode as v, normalizeClass as F, withModifiers as ce, Fragment as Y, renderList as de, createBlock as A, createVNode as k, createCommentVNode as J, withDirectives as ge, isRef as pe, vModelText as he, toDisplayString as K, watch as T, getCurrentInstance as fe, onBeforeUnmount as ve } from "vue";
function V({
  red: n,
  green: t,
  blue: e,
  alpha: o
}) {
  let l, s, a, r = 0, g;
  const d = n / 255, u = t / 255, c = e / 255, i = Math.max(d, u, c), p = i - Math.min(d, u, c), h = (m) => (i - m) / 6 / p + 1 / 2;
  return p === 0 ? (r = 0, g = 0) : (g = p / i, l = h(d), s = h(u), a = h(c), d === i ? r = a - s : u === i ? r = 1 / 3 + l - a : c === i && (r = 2 / 3 + s - l), r < 0 ? r += 1 : r > 1 && (r -= 1)), {
    hue: Math.round(r * 360),
    saturation: Math.round(g * 100),
    value: Math.round(i * 100)
  };
}
function me(n) {
  let t = 1;
  const e = n / 60;
  let o = t * (1 - Math.abs(e % 2 - 1));
  const l = 0, s = 255;
  let a = 0, r = 0, g = 0;
  return t = (t + l) * s | 0, o = (o + l) * s | 0, e >= 0 && e < 1 && (a = t | 0, r = o | 0, g = l | 0), e >= 1 && e < 2 && (a = o | 0, r = t | 0, g = l | 0), e >= 2 && e < 3 && (a = l | 0, r = t | 0, g = o | 0), e >= 3 && e < 4 && (a = l | 0, r = o | 0, g = t | 0), e >= 4 && e < 5 && (a = o | 0, r = l | 0, g = t | 0), e >= 5 && e <= 6 && (a = t | 0, r = l | 0, g = o | 0), {
    red: a,
    green: r,
    blue: g
  };
}
function M(n) {
  return typeof n == "number" && Number.isNaN(n) === !1 && n >= 0 && n <= 255;
}
function R(n, t, e, o) {
  if (M(n) && M(t) && M(e)) {
    const l = {
      red: n | 0,
      green: t | 0,
      blue: e | 0,
      alpha: o | 0
    };
    return M(o) === !0 && (l.alpha = o | 0), l;
  }
}
function Q(n, t, e) {
  e /= 100;
  let l = t / 100 * e;
  const s = n / 60;
  let a = l * (1 - Math.abs(s % 2 - 1)), r = e - l;
  const g = 255, d = 0;
  return l = (l + r) * g | 0, a = (a + r) * g | 0, r = r * g | 0, s >= 1 && s < 2 ? R(a, l, r, d) : s >= 2 && s < 3 ? R(r, l, a, d) : s >= 3 && s < 4 ? R(r, a, l, d) : s >= 4 && s < 5 ? R(a, r, l, d) : s >= 5 && s <= 6 ? R(l, r, a, d) : R(l, a, r, d);
}
function j(n, t, e, o, l) {
  n > o && (n = o), t > e && (t = e), n < 0 && (n = 0), t < 0 && (t = 0);
  const s = 100 - t * 100 / e | 0, a = n * 100 / o | 0;
  return y(b({}, Q(l, a, s)), {
    saturation: a,
    value: s
  });
}
function W(n, t, e, o) {
  let l = 360 * n / t | 0;
  return l = l < 0 ? 0 : l > 360 ? 360 : l, y(b({}, Q(l, e, o)), {
    hue: l
  });
}
function z(n, t) {
  return n = Number((n / t).toFixed(2)), n > 1 ? 1 : n < 0 ? 0 : n;
}
function q(n, t, e) {
  let o = n.toString(16), l = t.toString(16), s = e.toString(16);
  return n < 16 && (o = `0${o}`), t < 16 && (l = `0${l}`), e < 16 && (s = `0${s}`), o + l + s;
}
const be = /(^#{0,1}[0-9A-F]{6}$)|(^#{0,1}[0-9A-F]{3}$)|(^#{0,1}[0-9A-F]{8}$)/i;
function ye(n) {
  if (be.test(n)) {
    if (n[0] === "#" && (n = n.slice(1, n.length)), n.length < 6)
      return;
    const e = parseInt(n.substring(0, 2), 16) || 0, o = parseInt(n.substring(2, 4), 16) || 0, l = parseInt(n.substring(4, 6), 16) || 0, s = parseInt(n.substring(6, 10), 16) / 255 || 0, a = R(e, o, l, s), r = a && V(b({}, a));
    return b(b({}, a), r);
  }
  return !1;
}
function Z(n, t) {
  const e = n * 100 / t;
  return e < 0 ? 0 : e > 100 ? 100 : e;
}
function Ce(n, t, e, o) {
  return Math.atan2(n - e, t - o) * (180 / Math.PI) * -1 + 180;
}
function $(n, t) {
  return !n && n !== 0 ? t : n;
}
function ee(n, t, e, o) {
  return `rgba(${n}, ${t}, ${e}, ${o})`;
}
function I(n, t, e) {
  let o = "";
  const l = n.slice();
  return l.sort((s, a) => s.left - a.left), t === "linear" ? o = `linear-gradient(${e}deg,` : o = "radial-gradient(", l.forEach((s, a) => {
    o += `rgba(${s.red}, ${s.green}, ${s.blue}, ${s.alpha}) ${s.left}%`, a !== l.length - 1 && (o += ",");
  }), o += ")", o;
}
function D(n, t, e) {
  return function(l) {
    let s = n(l);
    function a(r) {
      s = t(r, s) || s;
    }
    window.addEventListener("mousemove", a), window.addEventListener(
      "mouseup",
      (r) => {
        window.removeEventListener("mousemove", a), e && e(r, s);
      },
      { once: !0 }
    );
  };
}
const _e = { class: "picking-area-overlay1" }, xe = { class: "picking-area-overlay2" }, Pe = f({
  name: "Picker"
}), $e = /* @__PURE__ */ f(y(b({}, Pe), {
  props: {
    red: Number,
    green: Number,
    blue: Number,
    alpha: Number,
    hue: Number,
    saturation: Number,
    value: Number,
    updateColor: Function
  },
  setup(n) {
    const t = n, e = L(null), o = E({
      width: 0,
      height: 0,
      mouseEvents: () => !1
    }), l = _(
      () => (t.saturation * o.width / 100 | 0) - 6
    ), s = _(
      () => (o.height - t.value * o.height / 100 | 0) - 6
    ), a = _(() => ({
      backgroundColor: `rgb(${t.red}, ${t.green}, ${t.blue})`,
      left: `${l.value}px`,
      top: `${s.value}px`
    })), r = _(() => {
      const { red: i, green: p, blue: h } = me(t.hue);
      return { backgroundColor: `rgb(${i}, ${p}, ${h})` };
    }), g = (i) => {
      const p = e == null ? void 0 : e.value;
      if (!p)
        return;
      const { x: h, y: m } = p.getBoundingClientRect(), P = i.pageX, G = i.pageY, w = P - h, B = G - m, ae = j(
        w,
        B,
        o.height,
        o.width,
        t.hue
      );
      return t.updateColor(ae, "onStartChange"), {
        startX: P,
        startY: G,
        positionX: w,
        positionY: B
      };
    }, d = (i, { startX: p, startY: h, positionX: m, positionY: P }) => {
      const G = i.pageX - p, w = i.pageY - h;
      m += G, P += w;
      const B = j(
        m,
        P,
        o.height,
        o.width,
        t.hue
      );
      return {
        positions: {
          positionX: m,
          positionY: P,
          startX: i.pageX,
          startY: i.pageY
        },
        color: B
      };
    }, u = (i, { startX: p, startY: h, positionX: m, positionY: P }) => {
      const { positions: G, color: w } = d(i, {
        startX: p,
        startY: h,
        positionX: m,
        positionY: P
      });
      return t.updateColor(w, "onChange"), G;
    }, c = (i, { startX: p, startY: h, positionX: m, positionY: P }) => {
      const { positions: G, color: w } = d(i, {
        startX: p,
        startY: h,
        positionX: m,
        positionY: P
      });
      return t.updateColor(w, "onEndChange"), G;
    };
    return N(() => {
      const i = e == null ? void 0 : e.value;
      i && (o.width = i.clientWidth, o.height = i.clientHeight), o.mouseEvents = D(
        g,
        u,
        c
      );
    }), (i, p) => (C(), x("div", {
      ref_key: "pickerAreaRef",
      ref: e,
      class: "picking-area",
      style: H(S(r)),
      onMousedown: p[0] || (p[0] = //@ts-ignore
      (...h) => o.mouseEvents && o.mouseEvents(...h))
    }, [
      v("div", _e, [
        v("div", xe, [
          v("div", {
            class: "picker-pointer",
            style: H(S(a))
          }, null, 4)
        ])
      ])
    ], 36));
  }
})), ke = { class: "preview-area" }, we = f({
  name: "PickerPreView"
}), Ge = /* @__PURE__ */ f(y(b({}, we), {
  props: {
    isGradient: { type: Boolean, default: !1 },
    red: { default: 255 },
    green: { default: 0 },
    blue: { default: 0 },
    alpha: { default: 1 },
    points: { default: () => [
      {
        left: 0,
        red: 0,
        green: 0,
        blue: 0,
        alpha: 1
      },
      {
        left: 100,
        red: 255,
        green: 0,
        blue: 0,
        alpha: 1
      }
    ] },
    gradientDegree: { default: 0 },
    gradientType: { default: "" }
  },
  setup(n) {
    const t = n, e = _(() => {
      let o = "";
      return t.isGradient ? (o = I(
        t.points,
        t.gradientType,
        t.gradientDegree
      ), { background: o }) : (o = ee(t.red, t.green, t.blue, t.alpha), { backgroundColor: o });
    });
    return (o, l) => (C(), x("div", ke, [
      v("div", {
        class: "preview-box",
        style: H(S(e))
      }, null, 4)
    ]));
  }
})), Se = f({
  name: "Hue"
}), Ee = /* @__PURE__ */ f(y(b({}, Se), {
  props: {
    hue: Number,
    saturation: Number,
    value: Number,
    updateColor: Function
  },
  setup(n) {
    const t = n, e = L(null), o = E({
      width: 0,
      mouseEvents: () => !1
    }), l = _(() => (t.hue * o.width / 360 | 0) - 6), s = _(() => ({
      left: `${l.value}px`
    })), a = (u) => {
      const c = u.currentTarget.getBoundingClientRect().x, i = u.pageX, p = i - c, h = W(p, o.width, t.saturation, t.value);
      return t.updateColor(h, "onStartChange"), {
        startX: i,
        positionX: p
      };
    }, r = (u, { startX: c, positionX: i }) => {
      const p = u.pageX - c;
      i += p;
      const h = i > o.width ? o.width : i <= 0 ? 0 : i, m = W(h, o.width, t.saturation, t.value);
      return {
        positions: {
          positionX: i,
          startX: u.pageX
        },
        color: m
      };
    }, g = (u, { startX: c, positionX: i }) => {
      const { positions: p, color: h } = r(u, {
        startX: c,
        positionX: i
      });
      return t.updateColor(h, "onChange"), p;
    }, d = (u, { startX: c, positionX: i }) => {
      const { positions: p, color: h } = r(u, {
        startX: c,
        positionX: i
      });
      return t.updateColor(h, "onEndChange"), p;
    };
    return N(() => {
      e.value && (o.width = e.value.clientWidth), o.mouseEvents = D(
        a,
        g,
        d
      );
    }), (u, c) => (C(), x("div", {
      class: "hue",
      onMousedown: c[0] || (c[0] = //@ts-ignore
      (...i) => o.mouseEvents && o.mouseEvents(...i))
    }, [
      v("div", {
        ref_key: "hueRef",
        ref: e,
        class: "hue-area"
      }, [
        v("div", {
          class: "picker-pointer",
          style: H(S(s))
        }, null, 4)
      ], 512)
    ], 32));
  }
})), He = { class: "alpha-area" }, Ne = f({
  name: "alpha"
}), Be = /* @__PURE__ */ f(y(b({}, Ne), {
  props: {
    red: Number,
    green: Number,
    blue: Number,
    alpha: Number,
    updateColor: Function
  },
  setup(n) {
    const t = n, e = L(null), o = E({
      width: 0,
      mouseEvents: () => !1
    }), l = _(() => (t.alpha * o.width | 0) - 6), s = _(() => ({ left: `${l.value}px` })), a = _(() => ({
      background: `linear-gradient(to right, rgba(0, 0, 0, 0), rgb(${t.red}, ${t.green}, ${t.blue}))`
    })), r = (c) => {
      const i = c.currentTarget.getBoundingClientRect().x, p = c.pageX, h = p - i;
      return t.updateColor(
        { alpha: z(h, o.width) },
        "onStartChange"
      ), {
        startX: p,
        positionX: h
      };
    }, g = (c, { startX: i, positionX: p }) => {
      const h = c.pageX - i;
      p += h;
      const m = z(p, o.width);
      return {
        positions: {
          positionX: p,
          startX: c.pageX
        },
        alpha: m
      };
    }, d = (c, { startX: i, positionX: p }) => {
      const { positions: h, alpha: m } = g(c, {
        startX: i,
        positionX: p
      });
      return t.updateColor({ alpha: m }, "onChange"), h;
    }, u = (c, { startX: i, positionX: p }) => {
      const { positions: h, alpha: m } = g(c, {
        startX: i,
        positionX: p
      });
      return t.updateColor({ alpha: m }, "onEndChange"), h;
    };
    return N(() => {
      const c = e.value;
      c && (o.width = c.clientWidth), o.mouseEvents = D(
        r,
        d,
        u
      );
    }), (c, i) => (C(), x("div", {
      class: "alpha",
      onMousedown: i[0] || (i[0] = //@ts-ignore
      (...p) => o.mouseEvents && o.mouseEvents(...p))
    }, [
      v("div", {
        class: "gradient",
        style: H(S(a))
      }, null, 4),
      v("div", He, [
        v("div", {
          ref_key: "alphaMaskRef",
          ref: e,
          class: "alpha-mask"
        }, [
          v("div", {
            class: "picker-pointer",
            style: H(S(s))
          }, null, 4)
        ], 512)
      ])
    ], 32));
  }
})), Re = f({
  name: "GradientPoint"
}), Ie = /* @__PURE__ */ f(y(b({}, Re), {
  props: {
    point: Object,
    activePointIndex: Number,
    index: Number,
    width: Number,
    positions: Object,
    changeActivePointIndex: Function,
    updateGradientLeft: Function,
    removePoint: Function
  },
  setup(n) {
    const t = n, e = E({
      mouseEvents: () => !1
    }), o = _(
      () => t.activePointIndex === t.index ? " active" : ""
    ), l = _(() => ({ left: `${t.point.left * (t.width / 100) - 6}px` })), s = (d) => {
      t.changeActivePointIndex(t.index);
      const u = d.pageX, c = d.pageY, i = u - t.positions.x;
      return t.updateGradientLeft(t.point.left, t.index, "onStartChange"), {
        startX: u,
        startY: c,
        offsetX: i
      };
    }, a = (d, { startX: u, offsetX: c }) => {
      const i = d.pageX - u;
      c += i;
      const p = Z(c, t.width);
      return {
        positions: {
          offsetX: c,
          startX: d.pageX
        },
        left: p
      };
    }, r = (d, { startX: u, offsetX: c }) => {
      const { positions: i, left: p } = a(d, {
        startX: u,
        offsetX: c
      });
      return t.updateGradientLeft(p, t.index, "onChange"), i;
    }, g = (d, { startX: u, offsetX: c }) => {
      const { positions: i, left: p } = a(d, {
        startX: u,
        offsetX: c
      });
      return t.updateGradientLeft(p, t.index, "onEndChange"), i;
    };
    return N(() => {
      e.mouseEvents = D(
        s,
        r,
        g
      );
    }), (d, u) => (C(), x("div", {
      class: F(`picker-pointer${S(o)}`),
      style: H(S(l)),
      onMousedown: u[0] || (u[0] = //@ts-ignore
      (...c) => e.mouseEvents && e.mouseEvents(...c)),
      onDblclick: u[1] || (u[1] = () => t.removePoint(n.index)),
      onClick: u[2] || (u[2] = ce(() => {
      }, ["stop"]))
    }, [
      v("span", {
        class: F(`child-point${S(o)}`)
      }, null, 2)
    ], 38));
  }
})), Fe = f({
  name: "GradientPoints"
}), Ve = /* @__PURE__ */ f(y(b({}, Fe), {
  props: {
    points: Array,
    activePointIndex: Number,
    changeActivePointIndex: Function,
    updateGradientLeft: Function,
    addPoint: Function,
    removePoint: Function
  },
  setup(n) {
    const t = n, e = L(null), o = E({
      width: 0,
      positions: { x: 0, y: 0 }
    }), l = _(() => ({ background: I(t.points, "linear", 90) })), s = (a) => {
      const r = Z(
        a.pageX - o.positions.x,
        o.width
      );
      t.addPoint(r);
    };
    return N(() => {
      const a = e.value;
      if (a) {
        o.width = a.clientWidth;
        const r = a.getBoundingClientRect();
        o.positions = { x: r.x, y: r.y };
      }
    }), (a, r) => (C(), x("div", {
      class: "gradient",
      style: H(S(l)),
      onClick: s
    }, [
      v("div", {
        ref_key: "pointsContainerRef",
        ref: e,
        class: "gradient-slider-container"
      }, [
        (C(!0), x(Y, null, de(t.points, (g, d) => (C(), A(Ie, {
          key: d,
          "active-point-index": t.activePointIndex,
          index: d,
          point: g,
          width: o.width,
          positions: o.positions,
          "change-active-point-index": t.changeActivePointIndex,
          "update-gradient-left": n.updateGradientLeft,
          "remove-point": t.removePoint
        }, null, 8, ["active-point-index", "index", "point", "width", "positions", "change-active-point-index", "update-gradient-left", "remove-point"]))), 128))
      ], 512)
    ], 4));
  }
})), Ae = { class: "picker-area" }, De = { class: "preview" }, Me = { class: "color-hue-alpha" }, Xe = f({
  name: "ColorPicker"
}), te = /* @__PURE__ */ f(y(b({}, Xe), {
  props: {
    isGradient: Boolean,
    red: Number,
    green: Number,
    blue: Number,
    alpha: Number,
    hue: Number,
    saturation: Number,
    value: Number,
    updateColor: Function,
    points: Array,
    degree: Number,
    type: String,
    activePointIndex: Number,
    changeGradientControl: Function,
    changeActivePointIndex: Function,
    updateGradientLeft: Function,
    addPoint: Function,
    removePoint: Function
  },
  setup(n) {
    return (t, e) => (C(), x("div", Ae, [
      k($e, {
        red: n.red,
        green: n.green,
        blue: n.blue,
        hue: n.hue,
        saturation: n.saturation,
        value: n.value,
        "update-color": n.updateColor
      }, null, 8, ["red", "green", "blue", "hue", "saturation", "value", "update-color"]),
      n.isGradient ? (C(), A(Ve, {
        key: 0,
        type: n.type,
        degree: n.degree,
        points: n.points,
        "active-point-index": n.activePointIndex,
        "change-active-point-index": n.changeActivePointIndex,
        "update-gradient-left": n.updateGradientLeft,
        "add-point": n.addPoint,
        "remove-point": n.removePoint
      }, null, 8, ["type", "degree", "points", "active-point-index", "change-active-point-index", "update-gradient-left", "add-point", "remove-point"])) : J("", !0),
      v("div", De, [
        k(Ge, {
          red: n.red,
          green: n.green,
          blue: n.blue,
          alpha: n.alpha,
          "is-gradient": n.isGradient,
          points: n.points,
          "gradient-degree": n.degree,
          "gradient-type": n.type
        }, null, 8, ["red", "green", "blue", "alpha", "is-gradient", "points", "gradient-degree", "gradient-type"]),
        v("div", Me, [
          k(Ee, {
            hue: n.hue,
            saturation: n.saturation,
            value: n.value,
            "update-color": n.updateColor
          }, null, 8, ["hue", "saturation", "value", "update-color"]),
          k(Be, {
            alpha: n.alpha,
            red: n.red,
            green: n.green,
            blue: n.blue,
            "update-color": n.updateColor
          }, null, 8, ["alpha", "red", "green", "blue", "update-color"])
        ])
      ])
    ]));
  }
})), Te = { class: "input-container" }, Le = { class: "label" }, Ye = f({
  name: "Input"
}), Oe = /* @__PURE__ */ f(y(b({}, Ye), {
  props: {
    value: { default: "" },
    label: { default: "" },
    type: { default: "text" },
    classes: { default: "" },
    onFocus: { type: Function, default: () => {
    } },
    onBlur: { type: Function, default: () => {
    } }
  },
  emits: ["input", "update:value"],
  setup(n, { emit: t }) {
    const e = n, o = _({
      get: () => ~~e.value,
      set: (s) => t("update:value", s)
    }), l = (s) => {
      t("input", s);
    };
    return (s, a) => (C(), x("div", {
      class: F(`input-field ${e.classes}`)
    }, [
      v("div", Te, [
        ge(v("input", {
          "onUpdate:modelValue": a[0] || (a[0] = (r) => pe(o) ? o.value = r : null),
          class: F(`${e.type}-input input`),
          onFocus: a[1] || (a[1] = //@ts-ignore
          (...r) => e.onFocus && e.onFocus(...r)),
          onBlur: a[2] || (a[2] = //@ts-ignore
          (...r) => e.onBlur && e.onBlur(...r)),
          onInput: l
        }, null, 34), [
          [he, S(o)]
        ])
      ]),
      v("div", Le, K(n.label), 1)
    ], 2));
  }
}));
const Ue = (n, t) => {
  const e = n.__vccOpts || n;
  for (const [o, l] of t)
    e[o] = l;
  return e;
}, ne = /* @__PURE__ */ Ue(Oe, [["__scopeId", "data-v-b140d166"]]), je = f({
  name: "Preview"
}), We = /* @__PURE__ */ f(y(b({}, je), {
  props: {
    red: { default: 0 },
    green: { default: 0 },
    blue: { default: 0 },
    alpha: null,
    updateColor: { type: Function, default: (n) => !1 }
  },
  setup(n) {
    const t = n, e = E({
      hexValue: q(t.red, t.green, t.blue)
    }), o = _(() => q(t.red, t.green, t.blue)), l = () => {
      o.value.length === 6 && (e.hexValue = o.value);
    }, s = (a) => {
      const r = ye(a.target.value);
      r && t.updateColor(r);
    };
    return T(
      () => [t.red, t.green, t.blue],
      () => l()
    ), (a, r) => (C(), A(ne, {
      value: e.hexValue,
      label: "hex",
      classes: "hex",
      onInput: s
    }, null, 8, ["value"]));
  }
})), ze = f({
  name: "RGBItem"
}), X = /* @__PURE__ */ f(y(b({}, ze), {
  props: {
    value: null,
    type: { default: "text" },
    label: { default: "" },
    onChange: { type: Function, default: (n) => !1 }
  },
  setup(n) {
    const t = n, e = fe(), o = E({
      inputValue: t.value || 0,
      inProgress: !1
    }), l = () => {
      t.value !== +o.inputValue && o.inputValue !== "" && (o.inputValue = t.value);
    }, s = (r) => {
      var d;
      const g = +r.target.value;
      if (Number.isNaN(g) || g < 0 || g > 255) {
        o.inputValue = t.value, (d = e == null ? void 0 : e.proxy) == null || d.$forceUpdate();
        return;
      }
      o.inputValue = r.target.value, t.onChange(g);
    }, a = () => {
      o.inputValue || (o.inputValue = t.value), o.inProgress = !1;
    };
    return T(
      () => t.value,
      () => l()
    ), (r, g) => (C(), x("div", null, [
      k(ne, {
        value: o.inputValue,
        type: t.type,
        label: t.label,
        "on-focus": () => o.inProgress = !0,
        "on-blur": a,
        "in-progress": o.inProgress,
        classes: "rgb",
        onInput: s
      }, null, 8, ["value", "type", "label", "on-focus", "in-progress"])
    ]));
  }
})), qe = f({
  name: "RGB"
}), Je = /* @__PURE__ */ f(y(b({}, qe), {
  props: {
    red: { default: 0 },
    green: { default: 0 },
    blue: { default: 0 },
    alpha: { default: 0 },
    updateColor: { type: Function, default: () => !1 }
  },
  setup(n) {
    const t = n, e = (o, l) => {
      if (o === "alpha") {
        t.updateColor({ alpha: l / 100 });
        return;
      }
      const s = V({
        red: t.red,
        green: t.green,
        blue: t.blue,
        [o]: l
      });
      t.updateColor(y(b({}, s), { [o]: l }));
    };
    return (o, l) => (C(), x(Y, null, [
      k(X, {
        value: t.red,
        type: "number",
        label: "R",
        "on-change": (s) => e("red", s)
      }, null, 8, ["value", "on-change"]),
      k(X, {
        value: t.green,
        type: "number",
        label: "G",
        "on-change": (s) => e("green", s)
      }, null, 8, ["value", "on-change"]),
      k(X, {
        value: t.blue,
        type: "number",
        label: "B",
        "on-change": (s) => e("blue", s)
      }, null, 8, ["value", "on-change"]),
      k(X, {
        value: t.alpha * 100,
        type: "number",
        label: "Alpha",
        "on-change": (s) => e("alpha", s)
      }, null, 8, ["value", "on-change"])
    ], 64));
  }
})), Ke = { class: "color-preview-area" }, Qe = { class: "input-group" }, Ze = f({
  name: "Preview"
}), oe = /* @__PURE__ */ f(y(b({}, Ze), {
  props: {
    red: { default: 0 },
    green: { default: 0 },
    blue: { default: 0 },
    alpha: { default: 0 },
    updateColor: { type: Function, default: (n) => !1 }
  },
  setup(n) {
    const t = n;
    return (e, o) => (C(), x("div", Ke, [
      v("div", Qe, [
        k(We, {
          red: t.red,
          green: t.green,
          blue: t.blue,
          "update-color": t.updateColor
        }, null, 8, ["red", "green", "blue", "update-color"]),
        k(Je, {
          red: t.red,
          green: t.green,
          blue: t.blue,
          alpha: t.alpha,
          "update-color": t.updateColor
        }, null, 8, ["red", "green", "blue", "alpha", "update-color"])
      ])
    ]));
  }
})), et = f({
  name: "Solid"
}), tt = /* @__PURE__ */ f(y(b({}, et), {
  props: {
    red: { default: 255 },
    green: { default: 0 },
    blue: { default: 0 },
    alpha: { default: 1 },
    hue: { default: 0 },
    saturation: { default: 0 },
    value: { default: 0 },
    onStartChange: { default: () => {
    } },
    onChange: { default: () => {
    } },
    onEndChange: { default: () => {
    } }
  },
  setup(n) {
    const t = n, e = E({
      colorRed: t.red,
      colorGreen: t.green,
      colorBlue: t.blue,
      colorAlpha: t.alpha,
      colorHue: 0,
      colorSaturation: 100,
      colorValue: 100,
      actions: {
        onStartChange: t.onStartChange,
        onChange: t.onChange,
        onEndChange: t.onEndChange
      }
    }), o = _(() => t.hue === void 0 || t.saturation === void 0 || t.value === void 0 ? V({
      red: t.red,
      green: t.green,
      blue: t.blue
    }) : {
      hue: t.hue,
      saturation: t.saturation,
      value: t.value
    }), l = _(() => ({
      red: t.red,
      green: t.green,
      blue: t.blue,
      alpha: t.alpha
    }));
    T(
      () => o.value,
      (a) => {
        const { hue: r, saturation: g, value: d } = a;
        e.colorHue = r, e.colorSaturation = g, e.colorValue = d;
      }
    ), T(
      () => l.value,
      (a) => {
        const { red: r, green: g, blue: d, alpha: u } = a;
        e.colorRed = r, e.colorGreen = g, e.colorBlue = d, e.colorAlpha = u;
      }
    );
    const s = ({ red: a, green: r, blue: g, alpha: d, hue: u, saturation: c, value: i }, p = "onChange") => {
      a = $(a, e.colorRed), r = $(r, e.colorGreen), g = $(g, e.colorBlue), d = $(d, e.colorAlpha), u = $(u, e.colorHue), c = $(c, e.colorSaturation), i = $(i, e.colorValue), e.colorRed = a, e.colorGreen = r, e.colorBlue = g, e.colorAlpha = d, e.colorHue = u, e.colorSaturation = c, e.colorValue = i;
      const h = e.actions[p];
      h && h({
        red: a,
        green: r,
        blue: g,
        alpha: d,
        hue: u,
        saturation: c,
        value: i,
        style: ee(a, r, g, d)
      });
    };
    return N(() => {
      const { hue: a, saturation: r, value: g } = V({
        red: e.colorRed,
        green: e.colorGreen,
        blue: e.colorBlue
      });
      e.colorHue = a, e.colorSaturation = r, e.colorValue = g;
    }), (a, r) => (C(), x(Y, null, [
      k(te, {
        red: e.colorRed,
        green: e.colorGreen,
        blue: e.colorBlue,
        alpha: e.colorAlpha,
        hue: e.colorHue,
        saturation: e.colorSaturation,
        value: e.colorValue,
        "update-color": s,
        "is-gradient": !1
      }, null, 8, ["red", "green", "blue", "alpha", "hue", "saturation", "value"]),
      k(oe, {
        red: e.colorRed,
        green: e.colorGreen,
        blue: e.colorBlue,
        alpha: e.colorAlpha,
        "update-color": s
      }, null, 8, ["red", "green", "blue", "alpha"])
    ], 64));
  }
})), nt = { class: "gradient-controls" }, ot = { class: "gradient-type" }, at = {
  key: 0,
  class: "gradient-degrees-options"
}, rt = /* @__PURE__ */ v("div", { class: "gradient-degree-pointer" }, null, -1), lt = [
  rt
], it = { class: "gradient-degree-value" }, st = f({
  name: "GradientControls"
}), ut = /* @__PURE__ */ f(y(b({}, st), {
  props: {
    type: String,
    degree: Number,
    changeGradientControl: {
      type: Function,
      default: () => !1
    }
  },
  setup(n) {
    const t = n, e = E({
      disableClick: !1,
      mouseEvents: () => !1
    }), o = _(() => ({ transform: `rotate(${t.degree}deg)` })), l = (g) => {
      const u = g.target.getBoundingClientRect(), c = ~~(8 - window.pageYOffset) + u.top, i = ~~(8 - window.pageXOffset) + u.left;
      return {
        centerY: c,
        centerX: i
      };
    }, s = (g, { centerX: d, centerY: u }) => {
      e.disableClick = !0;
      const c = Ce(
        g.clientX,
        g.clientY,
        d,
        u
      );
      t.changeGradientControl({ degree: ~~c });
    }, a = (g) => {
      const d = g.target.classList;
      d.contains("gradient-degrees") || d.contains("icon-rotate") || (e.disableClick = !1);
    }, r = () => {
      if (e.disableClick) {
        e.disableClick = !1;
        return;
      }
      let g = (t.degree || 0) + 45;
      g >= 360 && (g = 0), t.changeGradientControl({ degree: ~~g });
    };
    return N(() => {
      e.mouseEvents = D(
        l,
        s,
        a
      );
    }), (g, d) => (C(), x("div", nt, [
      v("div", ot, [
        v("div", {
          class: F(`gradient-type-item liner-gradient ${t.type === "linear" ? "active" : ""}`),
          onClick: d[0] || (d[0] = () => t.changeGradientControl({ type: "linear" }))
        }, null, 2),
        v("div", {
          class: F(`gradient-type-item radial-gradient ${t.type === "radial" ? "active" : ""}`),
          onClick: d[1] || (d[1] = () => t.changeGradientControl({ type: "radial" }))
        }, null, 2)
      ]),
      t.type === "linear" ? (C(), x("div", at, [
        v("div", {
          class: "gradient-degrees",
          onMousedown: d[2] || (d[2] = //@ts-ignore
          (...u) => e.mouseEvents && e.mouseEvents(...u)),
          onClick: r
        }, [
          v("div", {
            class: "gradient-degree-center",
            style: H(S(o))
          }, lt, 4)
        ], 32),
        v("div", it, [
          v("p", null, K(t.degree) + "°", 1)
        ])
      ])) : J("", !0)
    ]));
  }
})), ct = f({
  name: "Gradient"
}), dt = /* @__PURE__ */ f(y(b({}, ct), {
  props: {
    type: { default: "linear" },
    degree: { default: 0 },
    points: { default: () => [
      {
        left: 0,
        red: 0,
        green: 0,
        blue: 0,
        alpha: 1
      },
      {
        left: 100,
        red: 255,
        green: 0,
        blue: 0,
        alpha: 1
      }
    ] },
    onStartChange: { default: null },
    onChange: { default: null },
    onEndChange: { default: null }
  },
  setup(n) {
    const t = n, e = E({
      activePointIndex: 0,
      gradientPoints: t.points,
      activePoint: t.points[0],
      colorRed: t.points[0].red,
      colorGreen: t.points[0].green,
      colorBlue: t.points[0].blue,
      colorAlpha: t.points[0].alpha,
      colorHue: 0,
      colorSaturation: 100,
      colorValue: 100,
      gradientType: t.type,
      gradientDegree: t.degree,
      actions: {
        onStartChange: t.onStartChange,
        onChange: t.onChange,
        onEndChange: t.onEndChange
      }
    }), o = (u = e.activePointIndex) => {
      e.gradientPoints.length <= 2 || (e.gradientPoints.splice(u, 1), u > 0 && (e.activePointIndex = u - 1), t.onChange && t.onChange({
        points: e.gradientPoints,
        type: e.gradientType,
        degree: e.gradientDegree,
        style: I(
          e.gradientPoints,
          e.gradientType,
          e.gradientDegree
        )
      }));
    }, l = (u) => {
      (u.keyCode === 46 || u.keyCode === 8) && o(e.activePointIndex);
    }, s = (u) => {
      e.activePointIndex = u, e.activePoint = e.gradientPoints[u];
      const { red: c, green: i, blue: p, alpha: h } = e.activePoint;
      e.colorRed = c, e.colorGreen = i, e.colorBlue = p, e.colorAlpha = h;
      const { hue: m, saturation: P, value: G } = V({ red: c, green: i, blue: p });
      e.colorHue = m, e.colorSaturation = P, e.colorValue = G;
    }, a = ({ type: u, degree: c }) => {
      u = $(u, e.gradientType), c = $(c, e.gradientDegree), e.gradientType = u, e.gradientDegree = c, t.onChange && t.onChange({
        points: e.gradientPoints,
        type: e.gradientType,
        degree: e.gradientDegree,
        style: I(
          e.gradientPoints,
          e.gradientType,
          e.gradientDegree
        )
      });
    }, r = ({ red: u, green: c, blue: i, alpha: p, hue: h, saturation: m, value: P }, G = "onChange") => {
      u = $(u, e.colorRed), c = $(c, e.colorGreen), i = $(i, e.colorBlue), p = $(p, e.colorAlpha), h = $(h, e.colorHue), m = $(m, e.colorSaturation), P = $(P, e.colorValue);
      const w = e.gradientPoints.slice();
      w[e.activePointIndex] = y(b({}, w[e.activePointIndex]), {
        red: u,
        green: c,
        blue: i,
        alpha: p
      }), e.colorRed = u, e.colorGreen = c, e.colorBlue = i, e.colorAlpha = p, e.colorHue = h, e.colorSaturation = m, e.colorValue = P, e.gradientPoints = w;
      const B = e.actions[G];
      B && B({
        points: w,
        type: e.gradientType,
        degree: e.gradientDegree,
        style: I(
          w,
          e.gradientType,
          e.gradientDegree
        )
      });
    }, g = (u, c, i = "onChange") => {
      e.gradientPoints[c].left = u;
      const p = e.actions[i];
      p && p({
        points: e.gradientPoints,
        type: e.gradientType,
        degree: e.gradientDegree,
        style: I(
          e.gradientPoints,
          e.gradientType,
          e.gradientDegree
        )
      });
    }, d = (u) => {
      e.gradientPoints.push(y(b({}, e.gradientPoints[e.activePointIndex]), {
        left: u
      })), e.activePointIndex = e.gradientPoints.length - 1, t.onChange && t.onChange({
        points: e.gradientPoints,
        type: e.gradientType,
        degree: e.gradientDegree,
        style: I(
          e.gradientPoints,
          e.gradientType,
          e.gradientDegree
        )
      });
    };
    return N(() => {
      const { hue: u, saturation: c, value: i } = V({
        red: e.colorRed,
        green: e.colorGreen,
        blue: e.colorBlue
      });
      e.colorHue = u, e.colorSaturation = c, e.colorValue = i, document.addEventListener("keyup", l);
    }), ve(() => {
      document.removeEventListener("keyup", l);
    }), (u, c) => (C(), x(Y, null, [
      k(ut, {
        type: e.gradientType,
        degree: e.gradientDegree,
        "change-gradient-control": a
      }, null, 8, ["type", "degree"]),
      k(te, {
        red: e.colorRed,
        green: e.colorGreen,
        blue: e.colorBlue,
        alpha: e.colorAlpha,
        hue: e.colorHue,
        saturation: e.colorSaturation,
        value: e.colorValue,
        "update-color": r,
        "is-gradient": !0,
        type: e.gradientType,
        degree: e.gradientDegree,
        points: e.gradientPoints,
        "active-point-index": e.activePointIndex,
        "change-gradient-control": a,
        "change-active-point-index": s,
        "update-gradient-left": g,
        "add-point": d,
        "remove-point": o
      }, null, 8, ["red", "green", "blue", "alpha", "hue", "saturation", "value", "type", "degree", "points", "active-point-index"]),
      k(oe, {
        red: e.colorRed,
        green: e.colorGreen,
        blue: e.colorBlue,
        alpha: e.colorAlpha,
        "update-color": r
      }, null, 8, ["red", "green", "blue", "alpha"])
    ], 64));
  }
})), gt = { class: "ui-color-picker" }, pt = f({
  name: "ColorPicker"
}), vt = /* @__PURE__ */ f(y(b({}, pt), {
  props: {
    isGradient: { type: Boolean, default: !1 },
    color: { default: () => ({
      red: 255,
      green: 0,
      blue: 0,
      alpha: 1,
      hue: 0,
      saturation: 100,
      value: 100
    }) },
    gradient: { default: () => ({
      type: "linear",
      degree: 0,
      points: [
        {
          left: 0,
          red: 0,
          green: 0,
          blue: 0,
          alpha: 1
        },
        {
          left: 100,
          red: 255,
          green: 0,
          blue: 0,
          alpha: 1
        }
      ]
    }) },
    onChange: { default: () => !1 },
    onStartChange: { default: () => !1 },
    onEndChange: { default: () => !1 }
  },
  setup(n) {
    const t = n;
    return (e, o) => (C(), x("div", gt, [
      t.isGradient ? (C(), A(dt, {
        key: 0,
        points: t.gradient.points,
        type: t.gradient.type,
        degree: t.gradient.degree,
        "on-change": t.onChange,
        "on-start-change": t.onStartChange,
        "on-end-change": t.onEndChange
      }, null, 8, ["points", "type", "degree", "on-change", "on-start-change", "on-end-change"])) : (C(), A(tt, {
        key: 1,
        red: t.color.red,
        green: t.color.green,
        blue: t.color.blue,
        alpha: t.color.alpha,
        hue: t.color.hue,
        saturation: t.color.saturation,
        value: t.color.value,
        "on-change": t.onChange,
        "on-start-change": t.onStartChange,
        "on-end-change": t.onEndChange
      }, null, 8, ["red", "green", "blue", "alpha", "hue", "saturation", "value", "on-change", "on-start-change", "on-end-change"]))
    ]));
  }
}));
export {
  vt as default
};
