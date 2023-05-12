import { defineComponent as f, ref as X, reactive as G, computed as y, onMounted as E, openBlock as b, createElementBlock as C, normalizeStyle as S, unref as w, createElementVNode as v, normalizeClass as R, withModifiers as te, Fragment as T, renderList as ne, createBlock as F, createVNode as P, createCommentVNode as j, withDirectives as oe, isRef as ae, vModelText as re, toDisplayString as W, watch as M, getCurrentInstance as le, onBeforeUnmount as ie } from "vue";
function I({
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
function se(n) {
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
function A(n) {
  return typeof n == "number" && Number.isNaN(n) === !1 && n >= 0 && n <= 255;
}
function N(n, t, e, o) {
  if (A(n) && A(t) && A(e)) {
    const l = {
      red: n | 0,
      green: t | 0,
      blue: e | 0,
      alpha: o | 0
    };
    return A(o) === !0 && (l.alpha = o | 0), l;
  }
}
function z(n, t, e) {
  e /= 100;
  let l = t / 100 * e;
  const s = n / 60;
  let a = l * (1 - Math.abs(s % 2 - 1)), r = e - l;
  const g = 255, d = 0;
  return l = (l + r) * g | 0, a = (a + r) * g | 0, r = r * g | 0, s >= 1 && s < 2 ? N(a, l, r, d) : s >= 2 && s < 3 ? N(r, l, a, d) : s >= 3 && s < 4 ? N(r, a, l, d) : s >= 4 && s < 5 ? N(a, r, l, d) : s >= 5 && s <= 6 ? N(l, r, a, d) : N(l, a, r, d);
}
function L(n, t, e, o, l) {
  n > o && (n = o), t > e && (t = e), n < 0 && (n = 0), t < 0 && (t = 0);
  const s = 100 - t * 100 / e | 0, a = n * 100 / o | 0;
  return {
    ...z(l, a, s),
    saturation: a,
    value: s
  };
}
function Y(n, t, e, o) {
  let l = 360 * n / t | 0;
  return l = l < 0 ? 0 : l > 360 ? 360 : l, {
    ...z(l, e, o),
    hue: l
  };
}
function O(n, t) {
  return n = Number((n / t).toFixed(2)), n > 1 ? 1 : n < 0 ? 0 : n;
}
function U(n, t, e) {
  let o = n.toString(16), l = t.toString(16), s = e.toString(16);
  return n < 16 && (o = `0${o}`), t < 16 && (l = `0${l}`), e < 16 && (s = `0${s}`), o + l + s;
}
const ue = /(^#{0,1}[0-9A-F]{6}$)|(^#{0,1}[0-9A-F]{3}$)|(^#{0,1}[0-9A-F]{8}$)/i;
function ce(n) {
  if (ue.test(n)) {
    if (n[0] === "#" && (n = n.slice(1, n.length)), n.length < 6)
      return;
    const e = parseInt(n.substring(0, 2), 16) || 0, o = parseInt(n.substring(2, 4), 16) || 0, l = parseInt(n.substring(4, 6), 16) || 0, s = parseInt(n.substring(6, 10), 16) / 255 || 0, a = N(e, o, l, s), r = a && I({ ...a });
    return {
      ...a,
      ...r
    };
  }
  return !1;
}
function q(n, t) {
  const e = n * 100 / t;
  return e < 0 ? 0 : e > 100 ? 100 : e;
}
function de(n, t, e, o) {
  return Math.atan2(n - e, t - o) * (180 / Math.PI) * -1 + 180;
}
function _(n, t) {
  return !n && n !== 0 ? t : n;
}
function J(n, t, e, o) {
  return `rgba(${n}, ${t}, ${e}, ${o})`;
}
function B(n, t, e) {
  let o = "";
  const l = n.slice();
  return l.sort((s, a) => s.left - a.left), t === "linear" ? o = `linear-gradient(${e}deg,` : o = "radial-gradient(", l.forEach((s, a) => {
    o += `rgba(${s.red}, ${s.green}, ${s.blue}, ${s.alpha}) ${s.left}%`, a !== l.length - 1 && (o += ",");
  }), o += ")", o;
}
function V(n, t, e) {
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
const ge = { class: "picking-area-overlay1" }, pe = { class: "picking-area-overlay2" }, he = f({
  name: "Picker"
}), fe = /* @__PURE__ */ f({
  ...he,
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
    const t = n, e = X(null), o = G({
      width: 0,
      height: 0,
      mouseEvents: () => !1
    }), l = y(
      () => (t.saturation * o.width / 100 | 0) - 6
    ), s = y(
      () => (o.height - t.value * o.height / 100 | 0) - 6
    ), a = y(() => ({
      backgroundColor: `rgb(${t.red}, ${t.green}, ${t.blue})`,
      left: `${l.value}px`,
      top: `${s.value}px`
    })), r = y(() => {
      const { red: i, green: p, blue: h } = se(t.hue);
      return { backgroundColor: `rgb(${i}, ${p}, ${h})` };
    }), g = (i) => {
      const p = e == null ? void 0 : e.value;
      if (!p)
        return;
      const { x: h, y: m } = p.getBoundingClientRect(), x = i.pageX, k = i.pageY, $ = x - h, H = k - m, ee = L(
        $,
        H,
        o.height,
        o.width,
        t.hue
      );
      return t.updateColor(ee, "onStartChange"), {
        startX: x,
        startY: k,
        positionX: $,
        positionY: H
      };
    }, d = (i, { startX: p, startY: h, positionX: m, positionY: x }) => {
      const k = i.pageX - p, $ = i.pageY - h;
      m += k, x += $;
      const H = L(
        m,
        x,
        o.height,
        o.width,
        t.hue
      );
      return {
        positions: {
          positionX: m,
          positionY: x,
          startX: i.pageX,
          startY: i.pageY
        },
        color: H
      };
    }, u = (i, { startX: p, startY: h, positionX: m, positionY: x }) => {
      const { positions: k, color: $ } = d(i, {
        startX: p,
        startY: h,
        positionX: m,
        positionY: x
      });
      return t.updateColor($, "onChange"), k;
    }, c = (i, { startX: p, startY: h, positionX: m, positionY: x }) => {
      const { positions: k, color: $ } = d(i, {
        startX: p,
        startY: h,
        positionX: m,
        positionY: x
      });
      return t.updateColor($, "onEndChange"), k;
    };
    return E(() => {
      const i = e == null ? void 0 : e.value;
      i && (o.width = i.clientWidth, o.height = i.clientHeight), o.mouseEvents = V(
        g,
        u,
        c
      );
    }), (i, p) => (b(), C("div", {
      ref_key: "pickerAreaRef",
      ref: e,
      class: "picking-area",
      style: S(w(r)),
      onMousedown: p[0] || (p[0] = //@ts-ignore
      (...h) => o.mouseEvents && o.mouseEvents(...h))
    }, [
      v("div", ge, [
        v("div", pe, [
          v("div", {
            class: "picker-pointer",
            style: S(w(a))
          }, null, 4)
        ])
      ])
    ], 36));
  }
}), ve = { class: "preview-area" }, me = f({
  name: "PickerPreView"
}), be = /* @__PURE__ */ f({
  ...me,
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
    const t = n, e = y(() => {
      let o = "";
      return t.isGradient ? (o = B(
        t.points,
        t.gradientType,
        t.gradientDegree
      ), { background: o }) : (o = J(t.red, t.green, t.blue, t.alpha), { backgroundColor: o });
    });
    return (o, l) => (b(), C("div", ve, [
      v("div", {
        class: "preview-box",
        style: S(w(e))
      }, null, 4)
    ]));
  }
}), ye = f({
  name: "Hue"
}), Ce = /* @__PURE__ */ f({
  ...ye,
  props: {
    hue: Number,
    saturation: Number,
    value: Number,
    updateColor: Function
  },
  setup(n) {
    const t = n, e = X(null), o = G({
      width: 0,
      mouseEvents: () => !1
    }), l = y(() => (t.hue * o.width / 360 | 0) - 6), s = y(() => ({
      left: `${l.value}px`
    })), a = (u) => {
      const c = u.currentTarget.getBoundingClientRect().x, i = u.pageX, p = i - c, h = Y(p, o.width, t.saturation, t.value);
      return t.updateColor(h, "onStartChange"), {
        startX: i,
        positionX: p
      };
    }, r = (u, { startX: c, positionX: i }) => {
      const p = u.pageX - c;
      i += p;
      const h = i > o.width ? o.width : i <= 0 ? 0 : i, m = Y(h, o.width, t.saturation, t.value);
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
    return E(() => {
      e.value && (o.width = e.value.clientWidth), o.mouseEvents = V(
        a,
        g,
        d
      );
    }), (u, c) => (b(), C("div", {
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
          style: S(w(s))
        }, null, 4)
      ], 512)
    ], 32));
  }
}), xe = { class: "alpha-area" }, _e = f({
  name: "alpha"
}), Pe = /* @__PURE__ */ f({
  ..._e,
  props: {
    red: Number,
    green: Number,
    blue: Number,
    alpha: Number,
    updateColor: Function
  },
  setup(n) {
    const t = n, e = X(null), o = G({
      width: 0,
      mouseEvents: () => !1
    }), l = y(() => (t.alpha * o.width | 0) - 6), s = y(() => ({ left: `${l.value}px` })), a = y(() => ({
      background: `linear-gradient(to right, rgba(0, 0, 0, 0), rgb(${t.red}, ${t.green}, ${t.blue}))`
    })), r = (c) => {
      const i = c.currentTarget.getBoundingClientRect().x, p = c.pageX, h = p - i;
      return t.updateColor(
        { alpha: O(h, o.width) },
        "onStartChange"
      ), {
        startX: p,
        positionX: h
      };
    }, g = (c, { startX: i, positionX: p }) => {
      const h = c.pageX - i;
      p += h;
      const m = O(p, o.width);
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
    return E(() => {
      const c = e.value;
      c && (o.width = c.clientWidth), o.mouseEvents = V(
        r,
        d,
        u
      );
    }), (c, i) => (b(), C("div", {
      class: "alpha",
      onMousedown: i[0] || (i[0] = //@ts-ignore
      (...p) => o.mouseEvents && o.mouseEvents(...p))
    }, [
      v("div", {
        class: "gradient",
        style: S(w(a))
      }, null, 4),
      v("div", xe, [
        v("div", {
          ref_key: "alphaMaskRef",
          ref: e,
          class: "alpha-mask"
        }, [
          v("div", {
            class: "picker-pointer",
            style: S(w(s))
          }, null, 4)
        ], 512)
      ])
    ], 32));
  }
}), $e = f({
  name: "GradientPoint"
}), ke = /* @__PURE__ */ f({
  ...$e,
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
    const t = n, e = G({
      mouseEvents: () => !1
    }), o = y(
      () => t.activePointIndex === t.index ? " active" : ""
    ), l = y(() => ({ left: `${t.point.left * (t.width / 100) - 6}px` })), s = (d) => {
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
      const p = q(c, t.width);
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
    return E(() => {
      e.mouseEvents = V(
        s,
        r,
        g
      );
    }), (d, u) => (b(), C("div", {
      class: R(`picker-pointer${w(o)}`),
      style: S(w(l)),
      onMousedown: u[0] || (u[0] = //@ts-ignore
      (...c) => e.mouseEvents && e.mouseEvents(...c)),
      onDblclick: u[1] || (u[1] = () => t.removePoint(n.index)),
      onClick: u[2] || (u[2] = te(() => {
      }, ["stop"]))
    }, [
      v("span", {
        class: R(`child-point${w(o)}`)
      }, null, 2)
    ], 38));
  }
}), we = f({
  name: "GradientPoints"
}), Ge = /* @__PURE__ */ f({
  ...we,
  props: {
    points: Array,
    activePointIndex: Number,
    changeActivePointIndex: Function,
    updateGradientLeft: Function,
    addPoint: Function,
    removePoint: Function
  },
  setup(n) {
    const t = n, e = X(null), o = G({
      width: 0,
      positions: { x: 0, y: 0 }
    }), l = y(() => ({ background: B(t.points, "linear", 90) })), s = (a) => {
      const r = q(
        a.pageX - o.positions.x,
        o.width
      );
      t.addPoint(r);
    };
    return E(() => {
      const a = e.value;
      if (a) {
        o.width = a.clientWidth;
        const r = a.getBoundingClientRect();
        o.positions = { x: r.x, y: r.y };
      }
    }), (a, r) => (b(), C("div", {
      class: "gradient",
      style: S(w(l)),
      onClick: s
    }, [
      v("div", {
        ref_key: "pointsContainerRef",
        ref: e,
        class: "gradient-slider-container"
      }, [
        (b(!0), C(T, null, ne(t.points, (g, d) => (b(), F(ke, {
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
}), Se = { class: "picker-area" }, Ee = { class: "preview" }, He = { class: "color-hue-alpha" }, Ne = f({
  name: "ColorPicker"
}), K = /* @__PURE__ */ f({
  ...Ne,
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
    return (t, e) => (b(), C("div", Se, [
      P(fe, {
        red: n.red,
        green: n.green,
        blue: n.blue,
        hue: n.hue,
        saturation: n.saturation,
        value: n.value,
        "update-color": n.updateColor
      }, null, 8, ["red", "green", "blue", "hue", "saturation", "value", "update-color"]),
      n.isGradient ? (b(), F(Ge, {
        key: 0,
        type: n.type,
        degree: n.degree,
        points: n.points,
        "active-point-index": n.activePointIndex,
        "change-active-point-index": n.changeActivePointIndex,
        "update-gradient-left": n.updateGradientLeft,
        "add-point": n.addPoint,
        "remove-point": n.removePoint
      }, null, 8, ["type", "degree", "points", "active-point-index", "change-active-point-index", "update-gradient-left", "add-point", "remove-point"])) : j("", !0),
      v("div", Ee, [
        P(be, {
          red: n.red,
          green: n.green,
          blue: n.blue,
          alpha: n.alpha,
          "is-gradient": n.isGradient,
          points: n.points,
          "gradient-degree": n.degree,
          "gradient-type": n.type
        }, null, 8, ["red", "green", "blue", "alpha", "is-gradient", "points", "gradient-degree", "gradient-type"]),
        v("div", He, [
          P(Ce, {
            hue: n.hue,
            saturation: n.saturation,
            value: n.value,
            "update-color": n.updateColor
          }, null, 8, ["hue", "saturation", "value", "update-color"]),
          P(Pe, {
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
}), Be = { class: "input-container" }, Re = { class: "label" }, Ie = f({
  name: "Input"
}), Fe = /* @__PURE__ */ f({
  ...Ie,
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
    const e = n, o = y({
      get: () => ~~e.value,
      set: (s) => t("update:value", s)
    }), l = (s) => {
      t("input", s);
    };
    return (s, a) => (b(), C("div", {
      class: R(`input-field ${e.classes}`)
    }, [
      v("div", Be, [
        oe(v("input", {
          "onUpdate:modelValue": a[0] || (a[0] = (r) => ae(o) ? o.value = r : null),
          class: R(`${e.type}-input input`),
          onFocus: a[1] || (a[1] = //@ts-ignore
          (...r) => e.onFocus && e.onFocus(...r)),
          onBlur: a[2] || (a[2] = //@ts-ignore
          (...r) => e.onBlur && e.onBlur(...r)),
          onInput: l
        }, null, 34), [
          [re, w(o)]
        ])
      ]),
      v("div", Re, W(n.label), 1)
    ], 2));
  }
});
const Ve = (n, t) => {
  const e = n.__vccOpts || n;
  for (const [o, l] of t)
    e[o] = l;
  return e;
}, Q = /* @__PURE__ */ Ve(Fe, [["__scopeId", "data-v-b140d166"]]), Ae = f({
  name: "Preview"
}), De = /* @__PURE__ */ f({
  ...Ae,
  props: {
    red: { default: 0 },
    green: { default: 0 },
    blue: { default: 0 },
    alpha: null,
    updateColor: { type: Function, default: (n) => !1 }
  },
  setup(n) {
    const t = n, e = G({
      hexValue: U(t.red, t.green, t.blue)
    }), o = y(() => U(t.red, t.green, t.blue)), l = () => {
      o.value.length === 6 && (e.hexValue = o.value);
    }, s = (a) => {
      const r = ce(a.target.value);
      r && t.updateColor(r);
    };
    return M(
      () => [t.red, t.green, t.blue],
      () => l()
    ), (a, r) => (b(), F(Q, {
      value: e.hexValue,
      label: "hex",
      classes: "hex",
      onInput: s
    }, null, 8, ["value"]));
  }
}), Me = f({
  name: "RGBItem"
}), D = /* @__PURE__ */ f({
  ...Me,
  props: {
    value: null,
    type: { default: "text" },
    label: { default: "" },
    onChange: { type: Function, default: (n) => !1 }
  },
  setup(n) {
    const t = n, e = le(), o = G({
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
    return M(
      () => t.value,
      () => l()
    ), (r, g) => (b(), C("div", null, [
      P(Q, {
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
}), Xe = f({
  name: "RGB"
}), Te = /* @__PURE__ */ f({
  ...Xe,
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
      const s = I({
        red: t.red,
        green: t.green,
        blue: t.blue,
        [o]: l
      });
      t.updateColor({ ...s, [o]: l });
    };
    return (o, l) => (b(), C(T, null, [
      P(D, {
        value: t.red,
        type: "number",
        label: "R",
        "on-change": (s) => e("red", s)
      }, null, 8, ["value", "on-change"]),
      P(D, {
        value: t.green,
        type: "number",
        label: "G",
        "on-change": (s) => e("green", s)
      }, null, 8, ["value", "on-change"]),
      P(D, {
        value: t.blue,
        type: "number",
        label: "B",
        "on-change": (s) => e("blue", s)
      }, null, 8, ["value", "on-change"]),
      P(D, {
        value: t.alpha * 100,
        type: "number",
        label: "Alpha",
        "on-change": (s) => e("alpha", s)
      }, null, 8, ["value", "on-change"])
    ], 64));
  }
}), Le = { class: "color-preview-area" }, Ye = { class: "input-group" }, Oe = f({
  name: "Preview"
}), Z = /* @__PURE__ */ f({
  ...Oe,
  props: {
    red: { default: 0 },
    green: { default: 0 },
    blue: { default: 0 },
    alpha: { default: 0 },
    updateColor: { type: Function, default: (n) => !1 }
  },
  setup(n) {
    const t = n;
    return (e, o) => (b(), C("div", Le, [
      v("div", Ye, [
        P(De, {
          red: t.red,
          green: t.green,
          blue: t.blue,
          "update-color": t.updateColor
        }, null, 8, ["red", "green", "blue", "update-color"]),
        P(Te, {
          red: t.red,
          green: t.green,
          blue: t.blue,
          alpha: t.alpha,
          "update-color": t.updateColor
        }, null, 8, ["red", "green", "blue", "alpha", "update-color"])
      ])
    ]));
  }
}), Ue = f({
  name: "Solid"
}), je = /* @__PURE__ */ f({
  ...Ue,
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
    const t = n, e = G({
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
    }), o = y(() => t.hue === void 0 || t.saturation === void 0 || t.value === void 0 ? I({
      red: t.red,
      green: t.green,
      blue: t.blue
    }) : {
      hue: t.hue,
      saturation: t.saturation,
      value: t.value
    }), l = y(() => ({
      red: t.red,
      green: t.green,
      blue: t.blue,
      alpha: t.alpha
    }));
    M(
      () => o.value,
      (a) => {
        const { hue: r, saturation: g, value: d } = a;
        e.colorHue = r, e.colorSaturation = g, e.colorValue = d;
      }
    ), M(
      () => l.value,
      (a) => {
        const { red: r, green: g, blue: d, alpha: u } = a;
        e.colorRed = r, e.colorGreen = g, e.colorBlue = d, e.colorAlpha = u;
      }
    );
    const s = ({ red: a, green: r, blue: g, alpha: d, hue: u, saturation: c, value: i }, p = "onChange") => {
      a = _(a, e.colorRed), r = _(r, e.colorGreen), g = _(g, e.colorBlue), d = _(d, e.colorAlpha), u = _(u, e.colorHue), c = _(c, e.colorSaturation), i = _(i, e.colorValue), e.colorRed = a, e.colorGreen = r, e.colorBlue = g, e.colorAlpha = d, e.colorHue = u, e.colorSaturation = c, e.colorValue = i;
      const h = e.actions[p];
      h && h({
        red: a,
        green: r,
        blue: g,
        alpha: d,
        hue: u,
        saturation: c,
        value: i,
        style: J(a, r, g, d)
      });
    };
    return E(() => {
      const { hue: a, saturation: r, value: g } = I({
        red: e.colorRed,
        green: e.colorGreen,
        blue: e.colorBlue
      });
      e.colorHue = a, e.colorSaturation = r, e.colorValue = g;
    }), (a, r) => (b(), C(T, null, [
      P(K, {
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
      P(Z, {
        red: e.colorRed,
        green: e.colorGreen,
        blue: e.colorBlue,
        alpha: e.colorAlpha,
        "update-color": s
      }, null, 8, ["red", "green", "blue", "alpha"])
    ], 64));
  }
}), We = { class: "gradient-controls" }, ze = { class: "gradient-type" }, qe = {
  key: 0,
  class: "gradient-degrees-options"
}, Je = /* @__PURE__ */ v("div", { class: "gradient-degree-pointer" }, null, -1), Ke = [
  Je
], Qe = { class: "gradient-degree-value" }, Ze = f({
  name: "GradientControls"
}), et = /* @__PURE__ */ f({
  ...Ze,
  props: {
    type: String,
    degree: Number,
    changeGradientControl: {
      type: Function,
      default: () => !1
    }
  },
  setup(n) {
    const t = n, e = G({
      disableClick: !1,
      mouseEvents: () => !1
    }), o = y(() => ({ transform: `rotate(${t.degree}deg)` })), l = (g) => {
      const u = g.target.getBoundingClientRect(), c = ~~(8 - window.pageYOffset) + u.top, i = ~~(8 - window.pageXOffset) + u.left;
      return {
        centerY: c,
        centerX: i
      };
    }, s = (g, { centerX: d, centerY: u }) => {
      e.disableClick = !0;
      const c = de(
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
    return E(() => {
      e.mouseEvents = V(
        l,
        s,
        a
      );
    }), (g, d) => (b(), C("div", We, [
      v("div", ze, [
        v("div", {
          class: R(`gradient-type-item liner-gradient ${t.type === "linear" ? "active" : ""}`),
          onClick: d[0] || (d[0] = () => n.changeGradientControl({ type: "linear" }))
        }, null, 2),
        v("div", {
          class: R(`gradient-type-item radial-gradient ${t.type === "radial" ? "active" : ""}`),
          onClick: d[1] || (d[1] = () => n.changeGradientControl({ type: "radial" }))
        }, null, 2)
      ]),
      t.type === "linear" ? (b(), C("div", qe, [
        v("div", {
          class: "gradient-degrees",
          onMousedown: d[2] || (d[2] = //@ts-ignore
          (...u) => e.mouseEvents && e.mouseEvents(...u)),
          onClick: r
        }, [
          v("div", {
            class: "gradient-degree-center",
            style: S(w(o))
          }, Ke, 4)
        ], 32),
        v("div", Qe, [
          v("p", null, W(t.degree) + "°", 1)
        ])
      ])) : j("", !0)
    ]));
  }
}), tt = f({
  name: "Gradient"
}), nt = /* @__PURE__ */ f({
  ...tt,
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
    onStartChange: { type: Function, default: () => !1 },
    onChange: { type: Function, default: () => !1 },
    onEndChange: { type: Function, default: () => !1 }
  },
  setup(n) {
    const t = n, e = G({
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
        style: B(
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
      const { hue: m, saturation: x, value: k } = I({ red: c, green: i, blue: p });
      e.colorHue = m, e.colorSaturation = x, e.colorValue = k;
    }, a = ({ type: u, degree: c }) => {
      u = _(u, e.gradientType), c = _(c, e.gradientDegree), e.gradientType = u, e.gradientDegree = c, t.onChange({
        points: e.gradientPoints,
        type: e.gradientType,
        degree: e.gradientDegree,
        style: B(
          e.gradientPoints,
          e.gradientType,
          e.gradientDegree
        )
      });
    }, r = ({ red: u, green: c, blue: i, alpha: p, hue: h, saturation: m, value: x }, k = "onChange") => {
      u = _(u, e.colorRed), c = _(c, e.colorGreen), i = _(i, e.colorBlue), p = _(p, e.colorAlpha), h = _(h, e.colorHue), m = _(m, e.colorSaturation), x = _(x, e.colorValue);
      const $ = e.gradientPoints.slice();
      $[e.activePointIndex] = {
        ...$[e.activePointIndex],
        red: u,
        green: c,
        blue: i,
        alpha: p
      }, e.colorRed = u, e.colorGreen = c, e.colorBlue = i, e.colorAlpha = p, e.colorHue = h, e.colorSaturation = m, e.colorValue = x, e.gradientPoints = $;
      const H = e.actions[k];
      H && H({
        points: $,
        type: e.gradientType,
        degree: e.gradientDegree,
        style: B(
          $,
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
        style: B(
          e.gradientPoints,
          e.gradientType,
          e.gradientDegree
        )
      });
    }, d = (u) => {
      e.gradientPoints.push({
        ...e.gradientPoints[e.activePointIndex],
        left: u
      }), e.activePointIndex = e.gradientPoints.length - 1, t.onChange && t.onChange({
        points: e.gradientPoints,
        type: e.gradientType,
        degree: e.gradientDegree,
        style: B(
          e.gradientPoints,
          e.gradientType,
          e.gradientDegree
        )
      });
    };
    return E(() => {
      const { hue: u, saturation: c, value: i } = I({
        red: e.colorRed,
        green: e.colorGreen,
        blue: e.colorBlue
      });
      e.colorHue = u, e.colorSaturation = c, e.colorValue = i, document.addEventListener("keyup", l);
    }), ie(() => {
      document.removeEventListener("keyup", l);
    }), (u, c) => (b(), C(T, null, [
      P(et, {
        type: e.gradientType,
        degree: e.gradientDegree,
        "change-gradient-control": a
      }, null, 8, ["type", "degree"]),
      P(K, {
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
      P(Z, {
        red: e.colorRed,
        green: e.colorGreen,
        blue: e.colorBlue,
        alpha: e.colorAlpha,
        "update-color": r
      }, null, 8, ["red", "green", "blue", "alpha"])
    ], 64));
  }
}), ot = { class: "ui-color-picker" }, at = f({
  name: "ColorPicker"
}), lt = /* @__PURE__ */ f({
  ...at,
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
    return (e, o) => (b(), C("div", ot, [
      t.isGradient ? (b(), F(nt, {
        key: 0,
        points: t.gradient.points,
        type: t.gradient.type,
        degree: t.gradient.degree,
        "on-change": t.onChange,
        "on-start-change": t.onStartChange,
        "on-end-change": t.onEndChange
      }, null, 8, ["points", "type", "degree", "on-change", "on-start-change", "on-end-change"])) : (b(), F(je, {
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
});
export {
  lt as default
};
