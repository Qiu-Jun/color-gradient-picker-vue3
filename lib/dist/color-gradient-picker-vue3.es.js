import { defineComponent as _, ref as X, reactive as S, computed as m, onMounted as G, openBlock as v, createElementBlock as y, normalizeStyle as w, unref as N, createElementVNode as f, normalizeClass as H, withModifiers as te, Fragment as T, renderList as ne, createBlock as R, createVNode as P, createCommentVNode as U, withDirectives as oe, isRef as re, vModelText as ae, toDisplayString as W, watch as M, getCurrentInstance as ie, onBeforeUnmount as le } from "vue";
function B({
  red: n,
  green: t,
  blue: e,
  alpha: o
}) {
  let i, s, r, a = 0, d;
  const g = n / 255, u = t / 255, c = e / 255, l = Math.max(g, u, c), p = l - Math.min(g, u, c), h = (b) => (l - b) / 6 / p + 1 / 2;
  return p === 0 ? (a = 0, d = 0) : (d = p / l, i = h(g), s = h(u), r = h(c), g === l ? a = r - s : u === l ? a = 1 / 3 + i - r : c === l && (a = 2 / 3 + s - i), a < 0 ? a += 1 : a > 1 && (a -= 1)), {
    hue: Math.round(a * 360),
    saturation: Math.round(d * 100),
    value: Math.round(l * 100)
  };
}
function se(n) {
  let t = 1;
  const e = n / 60;
  let o = t * (1 - Math.abs(e % 2 - 1));
  const i = 0, s = 255;
  let r = 0, a = 0, d = 0;
  return t = (t + i) * s | 0, o = (o + i) * s | 0, e >= 0 && e < 1 && (r = t | 0, a = o | 0, d = i | 0), e >= 1 && e < 2 && (r = o | 0, a = t | 0, d = i | 0), e >= 2 && e < 3 && (r = i | 0, a = t | 0, d = o | 0), e >= 3 && e < 4 && (r = i | 0, a = o | 0, d = t | 0), e >= 4 && e < 5 && (r = o | 0, a = i | 0, d = t | 0), e >= 5 && e <= 6 && (r = t | 0, a = i | 0, d = o | 0), {
    red: r,
    green: a,
    blue: d
  };
}
function A(n) {
  return typeof n == "number" && Number.isNaN(n) === !1 && n >= 0 && n <= 255;
}
function F(n, t, e, o) {
  if (A(n) && A(t) && A(e)) {
    const i = {
      red: n | 0,
      green: t | 0,
      blue: e | 0,
      alpha: o | 0
    };
    return A(o) === !0 && (i.alpha = o | 0), i;
  }
}
function z(n, t, e) {
  e /= 100;
  let i = t / 100 * e;
  const s = n / 60;
  let r = i * (1 - Math.abs(s % 2 - 1)), a = e - i;
  const d = 255, g = 0;
  return i = (i + a) * d | 0, r = (r + a) * d | 0, a = a * d | 0, s >= 1 && s < 2 ? F(r, i, a, g) : s >= 2 && s < 3 ? F(a, i, r, g) : s >= 3 && s < 4 ? F(a, r, i, g) : s >= 4 && s < 5 ? F(r, a, i, g) : s >= 5 && s <= 6 ? F(i, a, r, g) : F(i, r, a, g);
}
function O(n, t, e, o, i) {
  n > o && (n = o), t > e && (t = e), n < 0 && (n = 0), t < 0 && (t = 0);
  const s = 100 - t * 100 / e | 0, r = n * 100 / o | 0;
  return {
    ...z(i, r, s),
    saturation: r,
    value: s
  };
}
function j(n, t, e, o) {
  let i = 360 * n / t | 0;
  return i = i < 0 ? 0 : i > 360 ? 360 : i, {
    ...z(i, e, o),
    hue: i
  };
}
function L(n, t) {
  return n = Number((n / t).toFixed(2)), n > 1 ? 1 : n < 0 ? 0 : n;
}
function Y(n, t, e) {
  let o = n.toString(16), i = t.toString(16), s = e.toString(16);
  return n < 16 && (o = `0${o}`), t < 16 && (i = `0${i}`), e < 16 && (s = `0${s}`), o + i + s;
}
const ue = /(^#{0,1}[0-9A-F]{6}$)|(^#{0,1}[0-9A-F]{3}$)|(^#{0,1}[0-9A-F]{8}$)/i;
function ce(n) {
  if (ue.test(n)) {
    if (n[0] === "#" && (n = n.slice(1, n.length)), n.length < 6)
      return;
    const e = parseInt(n.substring(0, 2), 16) || 0, o = parseInt(n.substring(2, 4), 16) || 0, i = parseInt(n.substring(4, 6), 16) || 0, s = parseInt(n.substring(6, 10), 16) / 255 || 0, r = F(e, o, i, s), a = r && B({ ...r });
    return {
      ...r,
      ...a
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
function x(n, t) {
  return !n && n !== 0 ? t : n;
}
function J(n, t, e, o) {
  return `rgba(${n}, ${t}, ${e}, ${o})`;
}
function I(n, t, e) {
  let o = "";
  const i = n.slice();
  return i.sort((s, r) => s.left - r.left), t === "linear" ? o = `linear-gradient(${e}deg,` : o = "radial-gradient(", i.forEach((s, r) => {
    o += `rgba(${s.red}, ${s.green}, ${s.blue}, ${s.alpha}) ${s.left}%`, r !== i.length - 1 && (o += ",");
  }), o += ")", o;
}
function V(n, t, e) {
  return function(i) {
    let s = n(i);
    function r(a) {
      s = t(a, s) || s;
    }
    window.addEventListener("mousemove", r), window.addEventListener(
      "mouseup",
      (a) => {
        window.removeEventListener("mousemove", r), e && e(a, s);
      },
      { once: !0 }
    );
  };
}
const ge = { class: "picking-area-overlay1" }, pe = { class: "picking-area-overlay2" }, he = _({
  name: "Picker"
}), fe = /* @__PURE__ */ Object.assign(he, {
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
    const t = n, e = X(null), o = S({
      width: 0,
      height: 0,
      mouseEvents: () => !1
    }), i = m(
      () => (t.saturation * o.width / 100 | 0) - 6
    ), s = m(
      () => (o.height - t.value * o.height / 100 | 0) - 6
    ), r = m(() => ({
      backgroundColor: `rgb(${t.red}, ${t.green}, ${t.blue})`,
      left: `${i.value}px`,
      top: `${s.value}px`
    })), a = m(() => {
      const { red: l, green: p, blue: h } = se(t.hue);
      return { backgroundColor: `rgb(${l}, ${p}, ${h})` };
    }), d = (l) => {
      const p = e == null ? void 0 : e.value;
      if (!p)
        return;
      const { x: h, y: b } = p.getBoundingClientRect(), C = l.pageX, k = l.pageY, $ = C - h, E = k - b, ee = O(
        $,
        E,
        o.height,
        o.width,
        t.hue
      );
      return t.updateColor(ee, "onStartChange"), {
        startX: C,
        startY: k,
        positionX: $,
        positionY: E
      };
    }, g = (l, { startX: p, startY: h, positionX: b, positionY: C }) => {
      const k = l.pageX - p, $ = l.pageY - h;
      b += k, C += $;
      const E = O(
        b,
        C,
        o.height,
        o.width,
        t.hue
      );
      return {
        positions: {
          positionX: b,
          positionY: C,
          startX: l.pageX,
          startY: l.pageY
        },
        color: E
      };
    }, u = (l, { startX: p, startY: h, positionX: b, positionY: C }) => {
      const { positions: k, color: $ } = g(l, {
        startX: p,
        startY: h,
        positionX: b,
        positionY: C
      });
      return t.updateColor($, "onChange"), k;
    }, c = (l, { startX: p, startY: h, positionX: b, positionY: C }) => {
      const { positions: k, color: $ } = g(l, {
        startX: p,
        startY: h,
        positionX: b,
        positionY: C
      });
      return t.updateColor($, "onEndChange"), k;
    };
    return G(() => {
      const l = e == null ? void 0 : e.value;
      l && (o.width = l.clientWidth, o.height = l.clientHeight), o.mouseEvents = V(
        d,
        u,
        c
      );
    }), (l, p) => (v(), y("div", {
      ref_key: "pickerAreaRef",
      ref: e,
      class: "picking-area",
      style: w(N(a)),
      onMousedown: p[0] || (p[0] = (...h) => o.mouseEvents && o.mouseEvents(...h))
    }, [
      f("div", ge, [
        f("div", pe, [
          f("div", {
            class: "picker-pointer",
            style: w(N(r))
          }, null, 4)
        ])
      ])
    ], 36));
  }
}), be = { class: "preview-area" }, ve = _({
  name: "PickerPreView"
}), me = /* @__PURE__ */ Object.assign(ve, {
  props: {
    isGradient: Boolean,
    red: Number,
    green: Number,
    blue: Number,
    alpha: Number,
    points: Array,
    gradientDegree: Number,
    gradientType: String
  },
  setup(n) {
    const t = n, e = m(() => {
      let o = "";
      return t.isGradient ? (o = I(
        t.points,
        t.gradientType,
        t.gradientDegree
      ), { background: o }) : (o = J(t.red, t.green, t.blue, t.alpha), { backgroundColor: o });
    });
    return (o, i) => (v(), y("div", be, [
      f("div", {
        class: "preview-box",
        style: w(N(e))
      }, null, 4)
    ]));
  }
}), ye = _({
  name: "Hue"
}), Ce = /* @__PURE__ */ Object.assign(ye, {
  props: {
    hue: Number,
    saturation: Number,
    value: Number,
    updateColor: Function
  },
  setup(n) {
    const t = n, e = X(null), o = S({
      width: 0,
      mouseEvents: () => !1
    }), i = m(() => (t.hue * o.width / 360 | 0) - 6), s = m(() => ({
      left: `${i.value}px`
    })), r = (u) => {
      const c = u.currentTarget.getBoundingClientRect().x, l = u.pageX, p = l - c, h = j(p, o.width, t.saturation, t.value);
      return t.updateColor(h, "onStartChange"), {
        startX: l,
        positionX: p
      };
    }, a = (u, { startX: c, positionX: l }) => {
      const p = u.pageX - c;
      l += p;
      const h = l > o.width ? o.width : l <= 0 ? 0 : l, b = j(h, o.width, t.saturation, t.value);
      return {
        positions: {
          positionX: l,
          startX: u.pageX
        },
        color: b
      };
    }, d = (u, { startX: c, positionX: l }) => {
      const { positions: p, color: h } = a(u, {
        startX: c,
        positionX: l
      });
      return t.updateColor(h, "onChange"), p;
    }, g = (u, { startX: c, positionX: l }) => {
      const { positions: p, color: h } = a(u, {
        startX: c,
        positionX: l
      });
      return t.updateColor(h, "onEndChange"), p;
    };
    return G(() => {
      e.value && (o.width = e.value.clientWidth), o.mouseEvents = V(
        r,
        d,
        g
      );
    }), (u, c) => (v(), y("div", {
      class: "hue",
      onMousedown: c[0] || (c[0] = (...l) => o.mouseEvents && o.mouseEvents(...l))
    }, [
      f("div", {
        ref_key: "hueRef",
        ref: e,
        class: "hue-area"
      }, [
        f("div", {
          class: "picker-pointer",
          style: w(N(s))
        }, null, 4)
      ], 512)
    ], 32));
  }
}), xe = { class: "alpha-area" }, Pe = _({
  name: "alpha"
}), _e = /* @__PURE__ */ Object.assign(Pe, {
  props: {
    red: Number,
    green: Number,
    blue: Number,
    alpha: Number,
    updateColor: Function
  },
  setup(n) {
    const t = n, e = X(null), o = S({
      width: 0,
      mouseEvents: () => !1
    }), i = m(() => (t.alpha * o.width | 0) - 6), s = m(() => ({ left: `${i.value}px` })), r = m(() => ({
      background: `linear-gradient(to right, rgba(0, 0, 0, 0), rgb(${t.red}, ${t.green}, ${t.blue}))`
    })), a = (c) => {
      const l = c.currentTarget.getBoundingClientRect().x, p = c.pageX, h = p - l;
      return t.updateColor(
        { alpha: L(h, o.width) },
        "onStartChange"
      ), {
        startX: p,
        positionX: h
      };
    }, d = (c, { startX: l, positionX: p }) => {
      const h = c.pageX - l;
      p += h;
      const b = L(p, o.width);
      return {
        positions: {
          positionX: p,
          startX: c.pageX
        },
        alpha: b
      };
    }, g = (c, { startX: l, positionX: p }) => {
      const { positions: h, alpha: b } = d(c, {
        startX: l,
        positionX: p
      });
      return t.updateColor({ alpha: b }, "onChange"), h;
    }, u = (c, { startX: l, positionX: p }) => {
      const { positions: h, alpha: b } = d(c, {
        startX: l,
        positionX: p
      });
      return t.updateColor({ alpha: b }, "onEndChange"), h;
    };
    return G(() => {
      const c = e.value;
      c && (o.width = c.clientWidth), o.mouseEvents = V(
        a,
        g,
        u
      );
    }), (c, l) => (v(), y("div", {
      class: "alpha",
      onMousedown: l[0] || (l[0] = (...p) => o.mouseEvents && o.mouseEvents(...p))
    }, [
      f("div", {
        class: "gradient",
        style: w(N(r))
      }, null, 4),
      f("div", xe, [
        f("div", {
          ref_key: "alphaMaskRef",
          ref: e,
          class: "alpha-mask"
        }, [
          f("div", {
            class: "picker-pointer",
            style: w(N(s))
          }, null, 4)
        ], 512)
      ])
    ], 32));
  }
}), $e = _({
  name: "GradientPoint"
}), Ne = /* @__PURE__ */ Object.assign($e, {
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
    const t = n, e = S({
      mouseEvents: () => !1
    }), o = m(
      () => t.activePointIndex === t.index ? " active" : ""
    ), i = m(() => ({ left: `${t.point.left * (t.width / 100) - 6}px` })), s = (g) => {
      t.changeActivePointIndex(t.index);
      const u = g.pageX, c = g.pageY, l = u - t.positions.x;
      return t.updateGradientLeft(t.point.left, t.index, "onStartChange"), {
        startX: u,
        startY: c,
        offsetX: l
      };
    }, r = (g, { startX: u, offsetX: c }) => {
      const l = g.pageX - u;
      c += l;
      const p = q(c, t.width);
      return {
        positions: {
          offsetX: c,
          startX: g.pageX
        },
        left: p
      };
    }, a = (g, { startX: u, offsetX: c }) => {
      const { positions: l, left: p } = r(g, {
        startX: u,
        offsetX: c
      });
      return t.updateGradientLeft(p, t.index, "onChange"), l;
    }, d = (g, { startX: u, offsetX: c }) => {
      const { positions: l, left: p } = r(g, {
        startX: u,
        offsetX: c
      });
      return t.updateGradientLeft(p, t.index, "onEndChange"), l;
    };
    return G(() => {
      e.mouseEvents = V(
        s,
        a,
        d
      );
    }), (g, u) => (v(), y("div", {
      class: H(`picker-pointer${N(o)}`),
      style: w(N(i)),
      onMousedown: u[0] || (u[0] = (...c) => e.mouseEvents && e.mouseEvents(...c)),
      onDblclick: u[1] || (u[1] = () => n.removePoint(n.index)),
      onClick: u[2] || (u[2] = te(() => {
      }, ["stop"]))
    }, [
      f("span", {
        class: H(`child-point${N(o)}`)
      }, null, 2)
    ], 38));
  }
}), ke = _({
  name: "GradientPoints"
}), Se = /* @__PURE__ */ Object.assign(ke, {
  props: {
    points: Array,
    activePointIndex: Number,
    changeActivePointIndex: Function,
    updateGradientLeft: Function,
    addPoint: Function,
    removePoint: Function
  },
  setup(n) {
    const t = n, e = X(null), o = S({
      width: 0,
      positions: { x: 0, y: 0 }
    }), i = m(() => ({ background: I(t.points, "linear", 90) })), s = (r) => {
      const a = q(
        r.pageX - o.positions.x,
        o.width
      );
      t.addPoint(a);
    };
    return G(() => {
      const r = e.value;
      if (r) {
        o.width = r.clientWidth;
        const a = r.getBoundingClientRect();
        o.positions = { x: a.x, y: a.y };
      }
    }), (r, a) => (v(), y("div", {
      class: "gradient",
      style: w(N(i)),
      onClick: s
    }, [
      f("div", {
        ref_key: "pointsContainerRef",
        ref: e,
        class: "gradient-slider-container"
      }, [
        (v(!0), y(T, null, ne(t.points, (d, g) => (v(), R(N(Ne), {
          key: g,
          "active-point-index": t.activePointIndex,
          index: g,
          point: d,
          width: o.width,
          positions: o.positions,
          "change-active-point-index": t.changeActivePointIndex,
          "update-gradient-left": n.updateGradientLeft,
          "remove-point": t.removePoint
        }, null, 8, ["active-point-index", "index", "point", "width", "positions", "change-active-point-index", "update-gradient-left", "remove-point"]))), 128))
      ], 512)
    ], 4));
  }
}), we = { class: "picker-area" }, Ge = { class: "preview" }, Ee = { class: "color-hue-alpha" }, Fe = _({
  name: "ColorPicker"
}), K = /* @__PURE__ */ Object.assign(Fe, {
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
    return (t, e) => (v(), y("div", we, [
      P(fe, {
        red: n.red,
        green: n.green,
        blue: n.blue,
        hue: n.hue,
        saturation: n.saturation,
        value: n.value,
        "update-color": n.updateColor
      }, null, 8, ["red", "green", "blue", "hue", "saturation", "value", "update-color"]),
      n.isGradient ? (v(), R(Se, {
        key: 0,
        type: n.type,
        degree: n.degree,
        points: n.points,
        "active-point-index": n.activePointIndex,
        "change-active-point-index": n.changeActivePointIndex,
        "update-gradient-left": n.updateGradientLeft,
        "add-point": n.addPoint,
        "remove-point": n.removePoint
      }, null, 8, ["type", "degree", "points", "active-point-index", "change-active-point-index", "update-gradient-left", "add-point", "remove-point"])) : U("", !0),
      f("div", Ge, [
        P(me, {
          red: n.red,
          green: n.green,
          blue: n.blue,
          alpha: n.alpha,
          "is-gradient": n.isGradient,
          points: n.points,
          "gradient-degree": n.degree,
          "gradient-type": n.type
        }, null, 8, ["red", "green", "blue", "alpha", "is-gradient", "points", "gradient-degree", "gradient-type"]),
        f("div", Ee, [
          P(Ce, {
            hue: n.hue,
            saturation: n.saturation,
            value: n.value,
            "update-color": n.updateColor
          }, null, 8, ["hue", "saturation", "value", "update-color"]),
          P(_e, {
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
}), Ie = { class: "input-container" }, He = { class: "label" }, Be = _({
  name: "Input"
}), Re = /* @__PURE__ */ _({
  ...Be,
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    classes: {
      type: String,
      default: ""
    },
    onFocus: {
      type: Function,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {
      }
    },
    onBlur: {
      type: Function,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {
      }
    }
  },
  emits: ["input", "update:value"],
  setup(n, { emit: t }) {
    const e = n, o = m({
      get: () => e.value,
      set: (s) => t("update:value", s)
    }), i = (s) => {
      t("input", s);
    };
    return (s, r) => (v(), y("div", {
      class: H(`input-field ${e.classes}`)
    }, [
      f("div", Ie, [
        oe(f("input", {
          "onUpdate:modelValue": r[0] || (r[0] = (a) => re(o) ? o.value = a : null),
          class: H(`${e.type}-input input`),
          onFocus: r[1] || (r[1] = //@ts-ignore
          (...a) => e.onFocus && e.onFocus(...a)),
          onBlur: r[2] || (r[2] = //@ts-ignore
          (...a) => e.onBlur && e.onBlur(...a)),
          onInput: i
        }, null, 34), [
          [ae, N(o)]
        ])
      ]),
      f("div", He, W(n.label), 1)
    ], 2));
  }
});
const Ve = (n, t) => {
  const e = n.__vccOpts || n;
  for (const [o, i] of t)
    e[o] = i;
  return e;
}, Q = /* @__PURE__ */ Ve(Re, [["__scopeId", "data-v-7645d384"]]), Ae = _({
  name: "Preview"
}), De = /* @__PURE__ */ Object.assign(Ae, {
  props: {
    red: Number,
    green: Number,
    blue: Number,
    alpha: Number,
    updateColor: Function
  },
  setup(n) {
    const t = n, e = S({
      hexValue: Y(t.red, t.green, t.blue)
    }), o = m(() => Y(t.red, t.green, t.blue)), i = () => {
      o.value.length === 6 && (e.hexValue = o.value);
    }, s = (r) => {
      const a = ce(r.target.value);
      a && t.updateColor(a);
    };
    return M(
      () => [t.red, t.green, t.blue],
      () => i()
    ), (r, a) => (v(), R(Q, {
      value: e.hexValue,
      label: "hex",
      "in-progress": e.inProgress,
      classes: "hex",
      onInput: s
    }, null, 8, ["value", "in-progress"]));
  }
}), Me = _({
  name: "RGBItem"
}), D = /* @__PURE__ */ Object.assign(Me, {
  props: {
    value: [String, Number],
    type: String,
    label: String,
    onChange: Function
  },
  setup(n) {
    const t = n, e = ie(), o = S({
      inputValue: t.value,
      inProgress: !1
    }), i = () => {
      t.value !== +o.inputValue && o.inputValue !== "" && (o.inputValue = t.value);
    }, s = (a) => {
      var g;
      const d = +a.target.value;
      if (Number.isNaN(d) || d.length > 3 || d < 0 || d > 255) {
        o.inputValue = t.value, (g = e == null ? void 0 : e.proxy) == null || g.$forceUpdate();
        return;
      }
      o.inputValue = a.target.value, t.onChange(d);
    }, r = () => {
      !o.inputValue && !o.inputValue !== 0 && (o.inputValue = t.value), o.inProgress = !1;
    };
    return M(
      () => t.value,
      () => i()
    ), (a, d) => (v(), y("div", null, [
      P(Q, {
        value: o.inputValue,
        type: t.type,
        label: t.label,
        "on-focus": () => o.inProgress = !0,
        "on-blur": r,
        "in-progress": o.inProgress,
        classes: "rgb",
        onInput: s
      }, null, 8, ["value", "type", "label", "on-focus", "in-progress"])
    ]));
  }
}), Xe = _({
  name: "RGB"
}), Te = /* @__PURE__ */ Object.assign(Xe, {
  props: {
    red: Number,
    green: Number,
    blue: Number,
    alpha: Number,
    updateColor: Function
  },
  setup(n) {
    const t = n, e = (o, i) => {
      if (o === "alpha") {
        t.updateColor({ alpha: i / 100 });
        return;
      }
      const s = B({
        red: t.red,
        green: t.green,
        blue: t.blue,
        [o]: i
      });
      t.updateColor({ ...s, [o]: i });
    };
    return (o, i) => (v(), y(T, null, [
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
        value: parseInt(t.alpha * 100, 10),
        type: "number",
        label: "Alpha",
        "on-change": (s) => e("alpha", s)
      }, null, 8, ["value", "on-change"])
    ], 64));
  }
}), Oe = { class: "color-preview-area" }, je = { class: "input-group" }, Z = {
  __name: "index",
  props: {
    red: Number,
    green: Number,
    blue: Number,
    alpha: Number,
    updateColor: Function
  },
  setup(n) {
    const t = n;
    return (e, o) => (v(), y("div", Oe, [
      f("div", je, [
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
}, Le = _({
  name: "Solid"
}), Ye = /* @__PURE__ */ Object.assign(Le, {
  props: {
    red: {
      type: Number,
      default: 255
    },
    green: {
      type: Number,
      default: 0
    },
    blue: {
      type: Number,
      default: 0
    },
    alpha: {
      type: Number,
      default: 1
    },
    hue: Number,
    saturation: Number,
    value: Number,
    onStartChange: Function,
    onChange: Function,
    onEndChange: Function
  },
  setup(n) {
    const t = n, e = S({
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
    }), o = m(() => t.hue === void 0 || t.saturation === void 0 || t.value === void 0 ? B({
      red: t.red,
      green: t.green,
      blue: t.blue
    }) : {
      hue: t.hue,
      saturation: t.saturation,
      value: t.value
    }), i = m(() => ({
      red: t.red,
      green: t.green,
      blue: t.blue,
      alpha: t.alpha
    }));
    M(
      () => o.value,
      (r) => {
        const { hue: a, saturation: d, value: g } = r;
        e.colorHue = a, e.colorSaturation = d, e.colorValue = g;
      }
    ), M(
      () => i.value,
      (r) => {
        const { red: a, green: d, blue: g, alpha: u } = r;
        e.colorRed = a, e.colorGreen = d, e.colorBlue = g, e.colorAlpha = u;
      }
    );
    const s = ({ red: r, green: a, blue: d, alpha: g, hue: u, saturation: c, value: l }, p = "onChange") => {
      r = x(r, e.colorRed), a = x(a, e.colorGreen), d = x(d, e.colorBlue), g = x(g, e.colorAlpha), u = x(u, e.colorHue), c = x(c, e.colorSaturation), l = x(l, e.colorValue), e.colorRed = r, e.colorGreen = a, e.colorBlue = d, e.colorAlpha = g, e.colorHue = u, e.colorSaturation = c, e.colorValue = l;
      const h = e.actions[p];
      h && h({
        red: r,
        green: a,
        blue: d,
        alpha: g,
        hue: u,
        saturation: c,
        value: l,
        style: J(r, a, d, g)
      });
    };
    return G(() => {
      const { hue: r, saturation: a, value: d } = B({
        red: e.colorRed,
        green: e.colorGreen,
        blue: e.colorBlue
      });
      e.colorHue = r, e.colorSaturation = a, e.colorValue = d;
    }), (r, a) => (v(), y(T, null, [
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
}), Ue = { class: "gradient-controls" }, We = { class: "gradient-type" }, ze = {
  key: 0,
  class: "gradient-degrees-options"
}, qe = /* @__PURE__ */ f("div", { class: "gradient-degree-pointer" }, null, -1), Je = [
  qe
], Ke = { class: "gradient-degree-value" }, Qe = _({
  name: "GradientControls"
}), Ze = /* @__PURE__ */ Object.assign(Qe, {
  props: {
    type: String,
    degree: Number,
    changeGradientControl: {
      type: Function,
      default: () => !1
    }
  },
  setup(n) {
    const t = n, e = S({
      disableClick: !1,
      mouseEvents: () => !1
    }), o = m(() => ({ transform: `rotate(${t.degree}deg)` })), i = (d) => {
      const u = d.target.getBoundingClientRect(), c = u.top + parseInt(8 - window.pageYOffset, 10), l = u.left + parseInt(8 - window.pageXOffset, 10);
      return {
        centerY: c,
        centerX: l
      };
    }, s = (d, { centerX: g, centerY: u }) => {
      e.disableClick = !0;
      const c = de(
        d.clientX,
        d.clientY,
        g,
        u
      );
      t.changeGradientControl({ degree: parseInt(c, 10) });
    }, r = (d) => {
      const g = d.target.classList;
      g.contains("gradient-degrees") || g.contains("icon-rotate") || (e.disableClick = !1);
    }, a = () => {
      if (e.disableClick) {
        e.disableClick = !1;
        return;
      }
      let d = t.degree + 45;
      d >= 360 && (d = 0), t.changeGradientControl({ degree: parseInt(d, 10) });
    };
    return G(() => {
      e.mouseEvents = V(
        i,
        s,
        r
      );
    }), (d, g) => (v(), y("div", Ue, [
      f("div", We, [
        f("div", {
          class: H(`gradient-type-item liner-gradient ${t.type === "linear" ? "active" : ""}`),
          onClick: g[0] || (g[0] = () => n.changeGradientControl({ type: "linear" }))
        }, null, 2),
        f("div", {
          class: H(`gradient-type-item radial-gradient ${t.type === "radial" ? "active" : ""}`),
          onClick: g[1] || (g[1] = () => n.changeGradientControl({ type: "radial" }))
        }, null, 2)
      ]),
      t.type === "linear" ? (v(), y("div", ze, [
        f("div", {
          class: "gradient-degrees",
          onMousedown: g[2] || (g[2] = (...u) => d.mouseEvents && d.mouseEvents(...u)),
          onClick: a
        }, [
          f("div", {
            class: "gradient-degree-center",
            style: w(N(o))
          }, Je, 4)
        ], 32),
        f("div", Ke, [
          f("p", null, W(t.degree) + "°", 1)
        ])
      ])) : U("", !0)
    ]));
  }
}), et = {
  __name: "index",
  props: {
    type: {
      type: String,
      default: "linear"
    },
    degree: {
      type: Number,
      default: 0
    },
    points: {
      type: Array,
      default: () => [
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
    },
    onStartChange: Function,
    onChange: Function,
    onEndChange: Function
  },
  setup(n) {
    const t = n, e = S({
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
    }, i = (u) => {
      (u.keyCode === 46 || u.keyCode === 8) && o(e.activePointIndex);
    }, s = (u) => {
      e.activePointIndex = u, e.activePoint = e.gradientPoints[u];
      const { red: c, green: l, blue: p, alpha: h } = e.activePoint;
      e.colorRed = c, e.colorGreen = l, e.colorBlue = p, e.colorAlpha = h;
      const { hue: b, saturation: C, value: k } = B({ red: c, green: l, blue: p });
      e.colorHue = b, e.colorSaturation = C, e.colorValue = k;
    }, r = ({ type: u, degree: c }) => {
      u = x(u, e.gradientType), c = x(c, e.gradientDegree), e.gradientType = u, e.gradientDegree = c, t.onChange({
        points: e.gradientPoints,
        type: e.gradientType,
        degree: e.gradientDegree,
        style: I(
          e.gradientPoints,
          e.gradientType,
          e.gradientDegree
        )
      });
    }, a = ({ red: u, green: c, blue: l, alpha: p, hue: h, saturation: b, value: C }, k = "onChange") => {
      u = x(u, e.colorRed), c = x(c, e.colorGreen), l = x(l, e.colorBlue), p = x(p, e.colorAlpha), h = x(h, e.colorHue), b = x(b, e.colorSaturation), C = x(C, e.colorValue);
      const $ = e.gradientPoints.slice();
      $[e.activePointIndex] = {
        ...$[e.activePointIndex],
        red: u,
        green: c,
        blue: l,
        alpha: p
      }, e.colorRed = u, e.colorGreen = c, e.colorBlue = l, e.colorAlpha = p, e.colorHue = h, e.colorSaturation = b, e.colorValue = C, e.gradientPoints = $;
      const E = e.actions[k];
      E && E({
        points: $,
        type: e.gradientType,
        degree: e.gradientDegree,
        style: I(
          $,
          e.gradientType,
          e.gradientDegree
        )
      });
    }, d = (u, c, l = "onChange") => {
      e.gradientPoints[c].left = u;
      const p = e.actions[l];
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
    }, g = (u) => {
      e.gradientPoints.push({
        ...e.gradientPoints[e.activePointIndex],
        left: u
      }), e.activePointIndex = e.gradientPoints.length - 1, t.onChange && t.onChange({
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
    return G(() => {
      const { hue: u, saturation: c, value: l } = B({
        red: e.colorRed,
        green: e.colorGreen,
        blue: e.colorBlue
      });
      e.colorHue = u, e.colorSaturation = c, e.colorValue = l, document.addEventListener("keyup", i);
    }), le(() => {
      document.removeEventListener("keyup", i);
    }), (u, c) => (v(), y(T, null, [
      P(Ze, {
        type: e.gradientType,
        degree: e.gradientDegree,
        "change-gradient-control": r
      }, null, 8, ["type", "degree"]),
      P(K, {
        red: e.colorRed,
        green: e.colorGreen,
        blue: e.colorBlue,
        alpha: e.colorAlpha,
        hue: e.colorHue,
        saturation: e.colorSaturation,
        value: e.colorValue,
        "update-color": a,
        "is-gradient": !0,
        type: e.gradientType,
        degree: e.gradientDegree,
        points: e.gradientPoints,
        "active-point-index": e.activePointIndex,
        "change-gradient-control": r,
        "change-active-point-index": s,
        "update-gradient-left": d,
        "add-point": g,
        "remove-point": o
      }, null, 8, ["red", "green", "blue", "alpha", "hue", "saturation", "value", "type", "degree", "points", "active-point-index"]),
      P(Z, {
        red: e.colorRed,
        green: e.colorGreen,
        blue: e.colorBlue,
        alpha: e.colorAlpha,
        "update-color": a
      }, null, 8, ["red", "green", "blue", "alpha"])
    ], 64));
  }
}, tt = { class: "ui-color-picker" }, nt = _({
  name: "ColorPicker"
}), rt = /* @__PURE__ */ Object.assign(nt, {
  props: {
    isGradient: {
      type: Boolean,
      default: !1
    },
    color: {
      type: Object,
      default: () => ({
        red: 255,
        green: 0,
        blue: 0,
        alpha: 1,
        hue: 0,
        saturation: 100,
        value: 100
      })
    },
    gradient: {
      type: Object,
      default: () => ({
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
      })
    },
    onChange: {
      type: Function,
      default: () => !1
    },
    onStartChange: {
      type: Function,
      default: () => !1
    },
    onEndChange: {
      type: Function,
      default: () => !1
    }
  },
  setup(n) {
    const t = n;
    return (e, o) => (v(), y("div", tt, [
      t.isGradient ? (v(), R(et, {
        key: 0,
        points: t.gradient.points,
        type: t.gradient.type,
        degree: t.gradient.degree,
        "on-change": t.onChange,
        "on-start-change": t.onStartChange,
        "on-end-change": t.onEndChange
      }, null, 8, ["points", "type", "degree", "on-change", "on-start-change", "on-end-change"])) : (v(), R(Ye, {
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
  rt as default
};
