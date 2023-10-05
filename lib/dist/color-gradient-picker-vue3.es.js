var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { defineComponent, ref, inject, computed, watchEffect, openBlock, createElementBlock, normalizeStyle, unref, createElementVNode, normalizeClass, withModifiers, Fragment, renderList, createBlock, createVNode, createCommentVNode, withDirectives, isRef, vModelDynamic, toDisplayString, pushScopeId, popScopeId, reactive, provide } from "vue";
function rgbToHsv({
  red,
  green,
  blue
}) {
  let rr;
  let gg;
  let bb;
  let h = 0;
  let s;
  const rabs = red / 255;
  const gabs = green / 255;
  const babs = blue / 255;
  const v = Math.max(rabs, gabs, babs);
  const diff = v - Math.min(rabs, gabs, babs);
  const diffc = (c) => (v - c) / 6 / diff + 1 / 2;
  if (diff === 0) {
    h = 0;
    s = 0;
  } else {
    s = diff / v;
    rr = diffc(rabs);
    gg = diffc(gabs);
    bb = diffc(babs);
    if (rabs === v) {
      h = bb - gg;
    } else if (gabs === v) {
      h = 1 / 3 + rr - bb;
    } else if (babs === v) {
      h = 2 / 3 + gg - rr;
    }
    if (h < 0) {
      h += 1;
    } else if (h > 1) {
      h -= 1;
    }
  }
  return {
    hue: Math.round(h * 360),
    saturation: Math.round(s * 100),
    value: Math.round(v * 100)
  };
}
function isValidRGBValue(value) {
  return typeof value === "number" && Number.isNaN(value) === false && value >= 0 && value <= 255;
}
function setRGBA(red, green, blue, alpha) {
  if (isValidRGBValue(red) && isValidRGBValue(green) && isValidRGBValue(blue)) {
    const color = {
      red: red | 0,
      green: green | 0,
      blue: blue | 0,
      alpha: alpha | 0
    };
    if (isValidRGBValue(alpha) === true) {
      color.alpha = alpha | 0;
    }
    return color;
  }
}
function hsvToRgb(hue, saturation, value, alpha) {
  value /= 100;
  const sat = saturation / 100;
  let C = sat * value;
  const H = hue / 60;
  let X = C * (1 - Math.abs(H % 2 - 1));
  let m = value - C;
  const precision = 255;
  C = (C + m) * precision | 0;
  X = (X + m) * precision | 0;
  m = m * precision | 0;
  if (H >= 1 && H < 2) {
    return setRGBA(X, C, m, alpha);
  }
  if (H >= 2 && H < 3) {
    return setRGBA(m, C, X, alpha);
  }
  if (H >= 3 && H < 4) {
    return setRGBA(m, X, C, alpha);
  }
  if (H >= 4 && H < 5) {
    return setRGBA(X, m, C, alpha);
  }
  if (H >= 5 && H <= 6) {
    return setRGBA(C, m, X, alpha);
  }
  return setRGBA(C, X, m, alpha);
}
function changePicker(x, y, height, width, hue, alpha) {
  if (x > width)
    x = width;
  if (y > height)
    y = height;
  if (x < 0)
    x = 0;
  if (y < 0)
    y = 0;
  const value = 100 - y * 100 / height | 0;
  const saturation = x * 100 / width | 0;
  return __spreadProps(__spreadValues({}, hsvToRgb(hue, saturation, value, alpha)), {
    saturation,
    value
  });
}
function getHue(offsetX, width, saturation, value, alpha) {
  let hue = 360 * offsetX / width | 0;
  hue = hue < 0 ? 0 : hue > 360 ? 360 : hue;
  return __spreadProps(__spreadValues({}, hsvToRgb(hue, saturation, value, alpha)), {
    saturation,
    hue
  });
}
function getAlpha(value, width) {
  value = Number((value / width).toFixed(2));
  return value > 1 ? 1 : value < 0 ? 0 : value;
}
function rgbToHex(red, green, blue) {
  let r16 = red.toString(16);
  let g16 = green.toString(16);
  let b16 = blue.toString(16);
  if (red < 16)
    r16 = `0${r16}`;
  if (green < 16)
    g16 = `0${g16}`;
  if (blue < 16)
    b16 = `0${b16}`;
  return r16 + g16 + b16;
}
const hexRegexp = /(^#{0,1}[0-9A-F]{6}$)|(^#{0,1}[0-9A-F]{3}$)|(^#{0,1}[0-9A-F]{8}$)/i;
function hexToRgb(value) {
  const valid = hexRegexp.test(value);
  if (valid) {
    if (value[0] === "#")
      value = value.slice(1, value.length);
    if (value.length < 6)
      return false;
    const red = parseInt(value.substring(0, 2), 16) || 0;
    const green = parseInt(value.substring(2, 4), 16) || 0;
    const blue = parseInt(value.substring(4, 6), 16) || 0;
    const alpha = parseInt(value.substring(6, 8), 16) / 255 || 0;
    const color = setRGBA(red, green, blue, alpha);
    const hsv = color && rgbToHsv(__spreadValues({}, color));
    return __spreadValues(__spreadValues({}, color), hsv);
  }
  return false;
}
function updateGradientActivePercent(offsetX, width) {
  const leftPercent = offsetX * 100 / width;
  return leftPercent < 0 ? 0 : leftPercent > 100 ? 100 : leftPercent;
}
function calculateDegree(x, y, centerX, centerY) {
  const radians = Math.atan2(x - centerX, y - centerY);
  return radians * (180 / Math.PI) * -1 + 180;
}
function generateSolidStyle(red, green, blue, alpha) {
  return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
}
function generateGradientStyle(points, type, degree) {
  let style = "";
  const sortedPoints = points.slice();
  sortedPoints.sort((a, b) => a.left - b.left);
  if (type === "linear") {
    style = `linear-gradient(${degree}deg,`;
  } else {
    style = "radial-gradient(";
  }
  sortedPoints.forEach((point, index2) => {
    style += `rgba(${point.red}, ${point.green}, ${point.blue}, ${point.alpha}) ${point.left}%`;
    if (index2 !== sortedPoints.length - 1) {
      style += ",";
    }
  });
  style += ")";
  return style;
}
function useMouseEvents(mouseDownHandler, mouseMoveHandler, mouseUpHandler) {
  return function mouseEventsHandler(event) {
    let positions = mouseDownHandler(event);
    function onMouseMove(event2) {
      positions = mouseMoveHandler(event2, positions) || positions;
    }
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener(
      "mouseup",
      (event2) => {
        window.removeEventListener("mousemove", onMouseMove);
        mouseUpHandler && mouseUpHandler(event2, positions);
      },
      { once: true }
    );
  };
}
const _hoisted_1$8 = { class: "picker-area-overlay1 wh-full" };
const _hoisted_2$5 = { class: "picker-area-overlay2 wh-full rounded-8px" };
const __default__$f = defineComponent({
  name: "AreaPicker"
});
const _sfc_main$f = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$f), {
  setup(__props) {
    const pickerAreaRef = ref(null);
    const pickerBoxInfo = ref(null);
    const colorPickerState = inject("colorPickerState");
    const updateColor = inject("updateColor");
    const pointerStyle = computed(() => {
      const { width = 0, height = 0 } = pickerBoxInfo.value || {};
      const {
        saturation = 100,
        value = 100,
        isGradient,
        activePointIndex
      } = colorPickerState;
      const offsetLeft = (saturation * width / 100 | 0) - 6;
      const offsetTop = (height - value * height / 100 | 0) - 6;
      const points = colorPickerState.points;
      const activePoint = points[activePointIndex || 0];
      const red = isGradient ? activePoint == null ? void 0 : activePoint.red : colorPickerState.red;
      const green = isGradient ? activePoint == null ? void 0 : activePoint.green : colorPickerState.green;
      const blue = isGradient ? activePoint == null ? void 0 : activePoint.blue : colorPickerState.blue;
      return {
        backgroundColor: `rgb(${red}, ${green}, ${blue})`,
        left: `${offsetLeft}px`,
        top: `${offsetTop}px`
      };
    });
    const pickerStyle = computed(() => {
      const {
        isGradient,
        red,
        green,
        blue,
        activePointIndex = 0,
        points = []
      } = colorPickerState;
      if (isGradient) {
        const activePoint = points[activePointIndex];
        return {
          backgroundColor: `rgb(${activePoint.red}, ${activePoint.green}, ${activePoint.blue})`
        };
      } else {
        return {
          backgroundColor: `rgb(${red}, ${green}, ${blue})`
        };
      }
    });
    const mouseDownHandler = (event) => {
      if (!pickerBoxInfo.value)
        return;
      const { x: elementX, y: elementY } = pickerBoxInfo.value;
      const { width = 0, height = 0 } = pickerBoxInfo.value || {};
      const startX = event.pageX;
      const startY = event.pageY;
      const positionX = startX - elementX;
      const positionY = startY - elementY;
      const color = changePicker(
        positionX,
        positionY,
        height,
        width,
        colorPickerState.hue,
        colorPickerState.alpha
      );
      updateColor(color);
      return {
        startX,
        startY,
        positionX,
        positionY
      };
    };
    const changeObjectPositions = (event, { startX, startY, positionX, positionY }) => {
      const moveX = event.pageX - startX;
      const moveY = event.pageY - startY;
      const { width = 0, height = 0 } = pickerBoxInfo.value || {};
      positionX += moveX;
      positionY += moveY;
      const color = changePicker(
        positionX,
        positionY,
        height,
        width,
        colorPickerState.hue,
        colorPickerState.alpha
      );
      return {
        positions: {
          positionX,
          positionY,
          startX: event.pageX,
          startY: event.pageY
        },
        color
      };
    };
    const mouseMoveHandler = (event, { startX, startY, positionX, positionY }) => {
      const { positions, color } = changeObjectPositions(event, {
        startX,
        startY,
        positionX,
        positionY
      });
      updateColor(color);
      return positions;
    };
    const mouseUpHandler = (event, { startX, startY, positionX, positionY }) => {
      const { positions, color } = changeObjectPositions(event, {
        startX,
        startY,
        positionX,
        positionY
      });
      updateColor(color);
      return positions;
    };
    const mouseEvents = useMouseEvents(
      mouseDownHandler,
      mouseMoveHandler,
      mouseUpHandler
    );
    watchEffect(() => {
      var _a;
      const pickerAreaEl = pickerAreaRef.value;
      if (pickerAreaEl && !((_a = pickerBoxInfo.value) == null ? void 0 : _a.width)) {
        pickerBoxInfo.value = pickerAreaEl.getBoundingClientRect() || null;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "pickerAreaRef",
        ref: pickerAreaRef,
        class: "picker-area w-full mb-16px relative rounded-8px",
        style: normalizeStyle(unref(pickerStyle)),
        onMousedown: _cache[0] || (_cache[0] = //@ts-ignore
        (...args) => unref(mouseEvents) && unref(mouseEvents)(...args))
      }, [
        createElementVNode("div", _hoisted_1$8, [
          createElementVNode("div", _hoisted_2$5, [
            createElementVNode("div", {
              class: "picker-pointer",
              style: normalizeStyle(unref(pointerStyle))
            }, null, 4)
          ])
        ])
      ], 36);
    };
  }
}));
const index_vue_vue_type_style_index_0_scoped_2e8391c9_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const Picker = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["__scopeId", "data-v-2e8391c9"]]);
const _hoisted_1$7 = { class: "preview-area mr-8px" };
const __default__$e = defineComponent({
  name: "AreaPreview"
});
const _sfc_main$e = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$e), {
  setup(__props) {
    const colorPickerState = inject("colorPickerState");
    const style = computed(() => {
      let _style = "";
      if (colorPickerState.isGradient) {
        _style = generateGradientStyle(
          colorPickerState.points,
          colorPickerState.type,
          colorPickerState.degree
        );
      } else {
        _style = generateSolidStyle(
          colorPickerState.red,
          colorPickerState.green,
          colorPickerState.blue,
          colorPickerState.alpha
        );
      }
      return { background: _style };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$7, [
        createElementVNode("div", {
          class: "border-box w-36px h-36px rounded-8px border-width-1px border-solid border-[#ebedf5]",
          style: normalizeStyle(unref(style))
        }, null, 4)
      ]);
    };
  }
}));
const __default__$d = defineComponent({
  name: "AreaHue"
});
const _sfc_main$d = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$d), {
  setup(__props) {
    const hueRef = ref(null);
    const hueBoxInfo = ref(null);
    const colorPickerState = inject("colorPickerState");
    const updateColor = inject("updateColor");
    const offsetLeft = computed(() => {
      var _a;
      const width = ((_a = hueBoxInfo.value) == null ? void 0 : _a.width) || 0;
      const hue = colorPickerState.hue || 0;
      return hue * (width - 14) / 360 | 0;
    });
    const pointerStyle = computed(() => {
      return {
        left: `${offsetLeft.value}px`
      };
    });
    const mouseDownHandler = (event) => {
      var _a, _b;
      const elementX = ((_a = hueBoxInfo.value) == null ? void 0 : _a.x) || 0;
      const startX = event.pageX;
      const width = ((_b = hueBoxInfo.value) == null ? void 0 : _b.width) || 0;
      const positionX = startX - elementX;
      const color = getHue(
        positionX,
        width,
        colorPickerState.saturation,
        colorPickerState.value,
        colorPickerState.alpha
      );
      updateColor(color);
      return {
        startX,
        positionX
      };
    };
    const changeObjectPositions = (event, { startX, positionX }) => {
      var _a;
      const moveX = event.pageX - startX;
      const width = ((_a = hueBoxInfo.value) == null ? void 0 : _a.width) || 0;
      positionX += moveX;
      const offsetX = positionX > width ? width : positionX <= 0 ? 0 : positionX;
      const color = getHue(
        offsetX,
        width,
        colorPickerState.saturation,
        colorPickerState.value,
        colorPickerState.alpha
      );
      return {
        positions: {
          positionX,
          startX: event.pageX
        },
        color
      };
    };
    const mouseMoveHandler = (event, { startX, positionX }) => {
      const { positions, color } = changeObjectPositions(event, {
        startX,
        positionX
      });
      updateColor(color);
      return positions;
    };
    const mouseUpHandler = (event, { startX, positionX }) => {
      const { positions, color } = changeObjectPositions(event, {
        startX,
        positionX
      });
      updateColor(color);
      return positions;
    };
    const mouseEvents = useMouseEvents(
      mouseDownHandler,
      mouseMoveHandler,
      mouseUpHandler
    );
    watchEffect(() => {
      var _a, _b;
      if (hueRef.value && !((_a = hueBoxInfo.value) == null ? void 0 : _a.width)) {
        hueBoxInfo.value = ((_b = hueRef.value) == null ? void 0 : _b.getBoundingClientRect()) || null;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "relative w-full overflow-hidden rounded-10px mb-8px bg-[red] cursor-pointer",
        onMousedown: _cache[0] || (_cache[0] = //@ts-ignore
        (...args) => unref(mouseEvents) && unref(mouseEvents)(...args))
      }, [
        createElementVNode("div", {
          ref_key: "hueRef",
          ref: hueRef,
          class: "hue-area relative"
        }, [
          createElementVNode("div", {
            class: "picker-pointer",
            style: normalizeStyle(unref(pointerStyle))
          }, null, 4)
        ], 512)
      ], 32);
    };
  }
}));
const index_vue_vue_type_style_index_0_scoped_7cd4331a_lang = "";
const Hue = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-7cd4331a"]]);
const _hoisted_1$6 = { class: "alpha-area wh-full rounded-10px" };
const __default__$c = defineComponent({
  name: "AreaAlpha"
});
const _sfc_main$c = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$c), {
  setup(__props) {
    const colorPickerState = inject("colorPickerState");
    const updateColor = inject("updateColor");
    const alphaMaskRef = ref(null);
    const alphaMaskBoxInfo = ref(null);
    const offsetLeft = computed(() => {
      var _a;
      const {
        isGradient,
        alpha,
        activePointIndex = 0,
        points = []
      } = colorPickerState;
      const width = ((_a = alphaMaskBoxInfo.value) == null ? void 0 : _a.width) || 0;
      if (isGradient) {
        const activePoint = points[activePointIndex];
        return activePoint.alpha * (width - 14) | 0;
      } else {
        return alpha * (width - 14) | 0;
      }
    });
    const style = computed(() => {
      const {
        isGradient,
        red,
        green,
        blue,
        activePointIndex = 0,
        points = []
      } = colorPickerState;
      if (isGradient) {
        const activePoint = points[activePointIndex];
        return {
          background: `linear-gradient(to right, rgba(0, 0, 0, 0), rgb(${activePoint.red}, ${activePoint.green}, ${activePoint.blue}))`
        };
      } else {
        return {
          background: `linear-gradient(to right, rgba(0, 0, 0, 0), rgb(${red}, ${green}, ${blue}))`
        };
      }
    });
    const pointerStyle = computed(() => {
      return { left: `${offsetLeft.value}px` };
    });
    const mouseDownHandler = (event) => {
      var _a, _b;
      const elementX = ((_a = alphaMaskBoxInfo.value) == null ? void 0 : _a.x) || 0;
      const startX = event.pageX;
      const width = ((_b = alphaMaskBoxInfo.value) == null ? void 0 : _b.width) || 0;
      let positionX = startX - elementX;
      updateColor({ alpha: getAlpha(positionX, width) }, "alpha");
      return {
        startX,
        positionX
      };
    };
    const changeObjectPositions = (event, { startX, positionX }) => {
      var _a;
      const moveX = event.pageX - startX;
      const width = ((_a = alphaMaskBoxInfo.value) == null ? void 0 : _a.width) || 0;
      positionX += moveX;
      const alpha = getAlpha(positionX, width);
      return {
        positions: {
          positionX,
          startX: event.pageX
        },
        alpha
      };
    };
    const mouseMoveHandler = (event, { startX, positionX }) => {
      const { positions, alpha } = changeObjectPositions(event, {
        startX,
        positionX
      });
      updateColor({ alpha }, "alpha");
      return positions;
    };
    const mouseUpHandler = (event, { startX, positionX }) => {
      const { positions, alpha } = changeObjectPositions(event, {
        startX,
        positionX
      });
      updateColor({ alpha }, "alpha");
      return positions;
    };
    const mouseEvents = useMouseEvents(
      mouseDownHandler,
      mouseMoveHandler,
      mouseUpHandler
    );
    watchEffect(() => {
      var _a, _b;
      if (alphaMaskRef.value && !((_a = alphaMaskBoxInfo.value) == null ? void 0 : _a.width)) {
        alphaMaskBoxInfo.value = ((_b = alphaMaskRef.value) == null ? void 0 : _b.getBoundingClientRect()) || null;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "relative w-full overflow-hidden rounded-10px h-14px cursor-pointer",
        onMousedown: _cache[0] || (_cache[0] = //@ts-ignore
        (...args) => unref(mouseEvents) && unref(mouseEvents)(...args))
      }, [
        createElementVNode("div", {
          class: "absolute left-0 right-0 top-0 bottom-0",
          style: normalizeStyle(unref(style))
        }, null, 4),
        createElementVNode("div", _hoisted_1$6, [
          createElementVNode("div", {
            ref_key: "alphaMaskRef",
            ref: alphaMaskRef,
            class: "wh-full relative"
          }, [
            createElementVNode("div", {
              class: "picker-pointer",
              style: normalizeStyle(unref(pointerStyle))
            }, null, 4)
          ], 512)
        ])
      ], 32);
    };
  }
}));
const index_vue_vue_type_style_index_0_scoped_256c0c24_lang = "";
const Alpha = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-256c0c24"]]);
var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
const freeGlobal$1 = freeGlobal;
var freeSelf = typeof self == "object" && self && self.Object === Object && self;
var root = freeGlobal$1 || freeSelf || Function("return this")();
const root$1 = root;
var Symbol$1 = root$1.Symbol;
const Symbol$2 = Symbol$1;
var objectProto$c = Object.prototype;
var hasOwnProperty$9 = objectProto$c.hasOwnProperty;
var nativeObjectToString$1 = objectProto$c.toString;
var symToStringTag$1 = Symbol$2 ? Symbol$2.toStringTag : void 0;
function getRawTag(value) {
  var isOwn = hasOwnProperty$9.call(value, symToStringTag$1), tag = value[symToStringTag$1];
  try {
    value[symToStringTag$1] = void 0;
    var unmasked = true;
  } catch (e) {
  }
  var result = nativeObjectToString$1.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag$1] = tag;
    } else {
      delete value[symToStringTag$1];
    }
  }
  return result;
}
var objectProto$b = Object.prototype;
var nativeObjectToString = objectProto$b.toString;
function objectToString(value) {
  return nativeObjectToString.call(value);
}
var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
var symToStringTag = Symbol$2 ? Symbol$2.toStringTag : void 0;
function baseGetTag(value) {
  if (value == null) {
    return value === void 0 ? undefinedTag : nullTag;
  }
  return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
}
function isObjectLike(value) {
  return value != null && typeof value == "object";
}
var symbolTag$2 = "[object Symbol]";
function isSymbol(value) {
  return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag$2;
}
var isArray = Array.isArray;
const isArray$1 = isArray;
var reWhitespace = /\s/;
function trimmedEndIndex(string) {
  var index2 = string.length;
  while (index2-- && reWhitespace.test(string.charAt(index2))) {
  }
  return index2;
}
var reTrimStart = /^\s+/;
function baseTrim(string) {
  return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
}
function isObject(value) {
  var type = typeof value;
  return value != null && (type == "object" || type == "function");
}
var NAN = 0 / 0;
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
var reIsBinary = /^0b[01]+$/i;
var reIsOctal = /^0o[0-7]+$/i;
var freeParseInt = parseInt;
function toNumber(value) {
  if (typeof value == "number") {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == "function" ? value.valueOf() : value;
    value = isObject(other) ? other + "" : other;
  }
  if (typeof value != "string") {
    return value === 0 ? value : +value;
  }
  value = baseTrim(value);
  var isBinary = reIsBinary.test(value);
  return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
}
var asyncTag = "[object AsyncFunction]", funcTag$2 = "[object Function]", genTag$1 = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == funcTag$2 || tag == genTag$1 || tag == asyncTag || tag == proxyTag;
}
var coreJsData = root$1["__core-js_shared__"];
const coreJsData$1 = coreJsData;
var maskSrcKey = function() {
  var uid = /[^.]+$/.exec(coreJsData$1 && coreJsData$1.keys && coreJsData$1.keys.IE_PROTO || "");
  return uid ? "Symbol(src)_1." + uid : "";
}();
function isMasked(func) {
  return !!maskSrcKey && maskSrcKey in func;
}
var funcProto$1 = Function.prototype;
var funcToString$1 = funcProto$1.toString;
function toSource(func) {
  if (func != null) {
    try {
      return funcToString$1.call(func);
    } catch (e) {
    }
    try {
      return func + "";
    } catch (e) {
    }
  }
  return "";
}
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
var reIsHostCtor = /^\[object .+?Constructor\]$/;
var funcProto = Function.prototype, objectProto$a = Object.prototype;
var funcToString = funcProto.toString;
var hasOwnProperty$8 = objectProto$a.hasOwnProperty;
var reIsNative = RegExp(
  "^" + funcToString.call(hasOwnProperty$8).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}
function getValue(object, key) {
  return object == null ? void 0 : object[key];
}
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : void 0;
}
var WeakMap = getNative(root$1, "WeakMap");
const WeakMap$1 = WeakMap;
var objectCreate = Object.create;
var baseCreate = function() {
  function object() {
  }
  return function(proto) {
    if (!isObject(proto)) {
      return {};
    }
    if (objectCreate) {
      return objectCreate(proto);
    }
    object.prototype = proto;
    var result = new object();
    object.prototype = void 0;
    return result;
  };
}();
const baseCreate$1 = baseCreate;
function copyArray(source, array) {
  var index2 = -1, length = source.length;
  array || (array = Array(length));
  while (++index2 < length) {
    array[index2] = source[index2];
  }
  return array;
}
var defineProperty = function() {
  try {
    var func = getNative(Object, "defineProperty");
    func({}, "", {});
    return func;
  } catch (e) {
  }
}();
const defineProperty$1 = defineProperty;
function arrayEach(array, iteratee) {
  var index2 = -1, length = array == null ? 0 : array.length;
  while (++index2 < length) {
    if (iteratee(array[index2], index2, array) === false) {
      break;
    }
  }
  return array;
}
var MAX_SAFE_INTEGER$1 = 9007199254740991;
var reIsUint = /^(?:0|[1-9]\d*)$/;
function isIndex(value, length) {
  var type = typeof value;
  length = length == null ? MAX_SAFE_INTEGER$1 : length;
  return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
}
function baseAssignValue(object, key, value) {
  if (key == "__proto__" && defineProperty$1) {
    defineProperty$1(object, key, {
      "configurable": true,
      "enumerable": true,
      "value": value,
      "writable": true
    });
  } else {
    object[key] = value;
  }
}
function eq(value, other) {
  return value === other || value !== value && other !== other;
}
var objectProto$9 = Object.prototype;
var hasOwnProperty$7 = objectProto$9.hasOwnProperty;
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty$7.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) {
    baseAssignValue(object, key, value);
  }
}
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});
  var index2 = -1, length = props.length;
  while (++index2 < length) {
    var key = props[index2];
    var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
    if (newValue === void 0) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}
var objectProto$8 = Object.prototype;
function isPrototype(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$8;
  return value === proto;
}
function baseTimes(n, iteratee) {
  var index2 = -1, result = Array(n);
  while (++index2 < n) {
    result[index2] = iteratee(index2);
  }
  return result;
}
var argsTag$2 = "[object Arguments]";
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag$2;
}
var objectProto$7 = Object.prototype;
var hasOwnProperty$6 = objectProto$7.hasOwnProperty;
var propertyIsEnumerable$1 = objectProto$7.propertyIsEnumerable;
var isArguments = baseIsArguments(function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty$6.call(value, "callee") && !propertyIsEnumerable$1.call(value, "callee");
};
const isArguments$1 = isArguments;
function stubFalse() {
  return false;
}
var freeExports$2 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$2 = freeExports$2 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$2 = freeModule$2 && freeModule$2.exports === freeExports$2;
var Buffer$1 = moduleExports$2 ? root$1.Buffer : void 0;
var nativeIsBuffer = Buffer$1 ? Buffer$1.isBuffer : void 0;
var isBuffer = nativeIsBuffer || stubFalse;
const isBuffer$1 = isBuffer;
var argsTag$1 = "[object Arguments]", arrayTag$1 = "[object Array]", boolTag$2 = "[object Boolean]", dateTag$2 = "[object Date]", errorTag$1 = "[object Error]", funcTag$1 = "[object Function]", mapTag$4 = "[object Map]", numberTag$2 = "[object Number]", objectTag$2 = "[object Object]", regexpTag$2 = "[object RegExp]", setTag$4 = "[object Set]", stringTag$2 = "[object String]", weakMapTag$2 = "[object WeakMap]";
var arrayBufferTag$2 = "[object ArrayBuffer]", dataViewTag$3 = "[object DataView]", float32Tag$2 = "[object Float32Array]", float64Tag$2 = "[object Float64Array]", int8Tag$2 = "[object Int8Array]", int16Tag$2 = "[object Int16Array]", int32Tag$2 = "[object Int32Array]", uint8Tag$2 = "[object Uint8Array]", uint8ClampedTag$2 = "[object Uint8ClampedArray]", uint16Tag$2 = "[object Uint16Array]", uint32Tag$2 = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag$2] = typedArrayTags[float64Tag$2] = typedArrayTags[int8Tag$2] = typedArrayTags[int16Tag$2] = typedArrayTags[int32Tag$2] = typedArrayTags[uint8Tag$2] = typedArrayTags[uint8ClampedTag$2] = typedArrayTags[uint16Tag$2] = typedArrayTags[uint32Tag$2] = true;
typedArrayTags[argsTag$1] = typedArrayTags[arrayTag$1] = typedArrayTags[arrayBufferTag$2] = typedArrayTags[boolTag$2] = typedArrayTags[dataViewTag$3] = typedArrayTags[dateTag$2] = typedArrayTags[errorTag$1] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag$4] = typedArrayTags[numberTag$2] = typedArrayTags[objectTag$2] = typedArrayTags[regexpTag$2] = typedArrayTags[setTag$4] = typedArrayTags[stringTag$2] = typedArrayTags[weakMapTag$2] = false;
function baseIsTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}
var freeExports$1 = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule$1 = freeExports$1 && typeof module == "object" && module && !module.nodeType && module;
var moduleExports$1 = freeModule$1 && freeModule$1.exports === freeExports$1;
var freeProcess = moduleExports$1 && freeGlobal$1.process;
var nodeUtil = function() {
  try {
    var types = freeModule$1 && freeModule$1.require && freeModule$1.require("util").types;
    if (types) {
      return types;
    }
    return freeProcess && freeProcess.binding && freeProcess.binding("util");
  } catch (e) {
  }
}();
const nodeUtil$1 = nodeUtil;
var nodeIsTypedArray = nodeUtil$1 && nodeUtil$1.isTypedArray;
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
const isTypedArray$1 = isTypedArray;
var objectProto$6 = Object.prototype;
var hasOwnProperty$5 = objectProto$6.hasOwnProperty;
function arrayLikeKeys(value, inherited) {
  var isArr = isArray$1(value), isArg = !isArr && isArguments$1(value), isBuff = !isArr && !isArg && isBuffer$1(value), isType = !isArr && !isArg && !isBuff && isTypedArray$1(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$5.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var nativeKeys = overArg(Object.keys, Object);
const nativeKeys$1 = nativeKeys;
var objectProto$5 = Object.prototype;
var hasOwnProperty$4 = objectProto$5.hasOwnProperty;
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys$1(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty$4.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}
var objectProto$4 = Object.prototype;
var hasOwnProperty$3 = objectProto$4.hasOwnProperty;
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object), result = [];
  for (var key in object) {
    if (!(key == "constructor" && (isProto || !hasOwnProperty$3.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}
var nativeCreate = getNative(Object, "create");
const nativeCreate$1 = nativeCreate;
function hashClear() {
  this.__data__ = nativeCreate$1 ? nativeCreate$1(null) : {};
  this.size = 0;
}
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}
var HASH_UNDEFINED$1 = "__lodash_hash_undefined__";
var objectProto$3 = Object.prototype;
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate$1) {
    var result = data[key];
    return result === HASH_UNDEFINED$1 ? void 0 : result;
  }
  return hasOwnProperty$2.call(data, key) ? data[key] : void 0;
}
var objectProto$2 = Object.prototype;
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate$1 ? data[key] !== void 0 : hasOwnProperty$1.call(data, key);
}
var HASH_UNDEFINED = "__lodash_hash_undefined__";
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = nativeCreate$1 && value === void 0 ? HASH_UNDEFINED : value;
  return this;
}
function Hash(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
Hash.prototype.clear = hashClear;
Hash.prototype["delete"] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}
var arrayProto = Array.prototype;
var splice = arrayProto.splice;
function listCacheDelete(key) {
  var data = this.__data__, index2 = assocIndexOf(data, key);
  if (index2 < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index2 == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index2, 1);
  }
  --this.size;
  return true;
}
function listCacheGet(key) {
  var data = this.__data__, index2 = assocIndexOf(data, key);
  return index2 < 0 ? void 0 : data[index2][1];
}
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}
function listCacheSet(key, value) {
  var data = this.__data__, index2 = assocIndexOf(data, key);
  if (index2 < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index2][1] = value;
  }
  return this;
}
function ListCache(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
ListCache.prototype.clear = listCacheClear;
ListCache.prototype["delete"] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;
var Map = getNative(root$1, "Map");
const Map$1 = Map;
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    "hash": new Hash(),
    "map": new (Map$1 || ListCache)(),
    "string": new Hash()
  };
}
function isKeyable(value) {
  var type = typeof value;
  return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
}
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
}
function mapCacheDelete(key) {
  var result = getMapData(this, key)["delete"](key);
  this.size -= result ? 1 : 0;
  return result;
}
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
function mapCacheSet(key, value) {
  var data = getMapData(this, key), size = data.size;
  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}
function MapCache(entries) {
  var index2 = -1, length = entries == null ? 0 : entries.length;
  this.clear();
  while (++index2 < length) {
    var entry = entries[index2];
    this.set(entry[0], entry[1]);
  }
}
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype["delete"] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;
function arrayPush(array, values) {
  var index2 = -1, length = values.length, offset = array.length;
  while (++index2 < length) {
    array[offset + index2] = values[index2];
  }
  return array;
}
var getPrototype = overArg(Object.getPrototypeOf, Object);
const getPrototype$1 = getPrototype;
function stackClear() {
  this.__data__ = new ListCache();
  this.size = 0;
}
function stackDelete(key) {
  var data = this.__data__, result = data["delete"](key);
  this.size = data.size;
  return result;
}
function stackGet(key) {
  return this.__data__.get(key);
}
function stackHas(key) {
  return this.__data__.has(key);
}
var LARGE_ARRAY_SIZE = 200;
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map$1 || pairs.length < LARGE_ARRAY_SIZE - 1) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}
Stack.prototype.clear = stackClear;
Stack.prototype["delete"] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}
function baseAssignIn(object, source) {
  return object && copyObject(source, keysIn(source), object);
}
var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
var moduleExports = freeModule && freeModule.exports === freeExports;
var Buffer2 = moduleExports ? root$1.Buffer : void 0, allocUnsafe = Buffer2 ? Buffer2.allocUnsafe : void 0;
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var length = buffer.length, result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);
  buffer.copy(result);
  return result;
}
function arrayFilter(array, predicate) {
  var index2 = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
  while (++index2 < length) {
    var value = array[index2];
    if (predicate(value, index2, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}
function stubArray() {
  return [];
}
var objectProto$1 = Object.prototype;
var propertyIsEnumerable = objectProto$1.propertyIsEnumerable;
var nativeGetSymbols$1 = Object.getOwnPropertySymbols;
var getSymbols = !nativeGetSymbols$1 ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols$1(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};
const getSymbols$1 = getSymbols;
function copySymbols(source, object) {
  return copyObject(source, getSymbols$1(source), object);
}
var nativeGetSymbols = Object.getOwnPropertySymbols;
var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
  var result = [];
  while (object) {
    arrayPush(result, getSymbols$1(object));
    object = getPrototype$1(object);
  }
  return result;
};
const getSymbolsIn$1 = getSymbolsIn;
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn$1(source), object);
}
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray$1(object) ? result : arrayPush(result, symbolsFunc(object));
}
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols$1);
}
function getAllKeysIn(object) {
  return baseGetAllKeys(object, keysIn, getSymbolsIn$1);
}
var DataView = getNative(root$1, "DataView");
const DataView$1 = DataView;
var Promise$1 = getNative(root$1, "Promise");
const Promise$2 = Promise$1;
var Set = getNative(root$1, "Set");
const Set$1 = Set;
var mapTag$3 = "[object Map]", objectTag$1 = "[object Object]", promiseTag = "[object Promise]", setTag$3 = "[object Set]", weakMapTag$1 = "[object WeakMap]";
var dataViewTag$2 = "[object DataView]";
var dataViewCtorString = toSource(DataView$1), mapCtorString = toSource(Map$1), promiseCtorString = toSource(Promise$2), setCtorString = toSource(Set$1), weakMapCtorString = toSource(WeakMap$1);
var getTag = baseGetTag;
if (DataView$1 && getTag(new DataView$1(new ArrayBuffer(1))) != dataViewTag$2 || Map$1 && getTag(new Map$1()) != mapTag$3 || Promise$2 && getTag(Promise$2.resolve()) != promiseTag || Set$1 && getTag(new Set$1()) != setTag$3 || WeakMap$1 && getTag(new WeakMap$1()) != weakMapTag$1) {
  getTag = function(value) {
    var result = baseGetTag(value), Ctor = result == objectTag$1 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString:
          return dataViewTag$2;
        case mapCtorString:
          return mapTag$3;
        case promiseCtorString:
          return promiseTag;
        case setCtorString:
          return setTag$3;
        case weakMapCtorString:
          return weakMapTag$1;
      }
    }
    return result;
  };
}
const getTag$1 = getTag;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function initCloneArray(array) {
  var length = array.length, result = new array.constructor(length);
  if (length && typeof array[0] == "string" && hasOwnProperty.call(array, "index")) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}
var Uint8Array$1 = root$1.Uint8Array;
const Uint8Array$2 = Uint8Array$1;
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array$2(result).set(new Uint8Array$2(arrayBuffer));
  return result;
}
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}
var reFlags = /\w*$/;
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}
var symbolProto = Symbol$2 ? Symbol$2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}
var boolTag$1 = "[object Boolean]", dateTag$1 = "[object Date]", mapTag$2 = "[object Map]", numberTag$1 = "[object Number]", regexpTag$1 = "[object RegExp]", setTag$2 = "[object Set]", stringTag$1 = "[object String]", symbolTag$1 = "[object Symbol]";
var arrayBufferTag$1 = "[object ArrayBuffer]", dataViewTag$1 = "[object DataView]", float32Tag$1 = "[object Float32Array]", float64Tag$1 = "[object Float64Array]", int8Tag$1 = "[object Int8Array]", int16Tag$1 = "[object Int16Array]", int32Tag$1 = "[object Int32Array]", uint8Tag$1 = "[object Uint8Array]", uint8ClampedTag$1 = "[object Uint8ClampedArray]", uint16Tag$1 = "[object Uint16Array]", uint32Tag$1 = "[object Uint32Array]";
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag$1:
      return cloneArrayBuffer(object);
    case boolTag$1:
    case dateTag$1:
      return new Ctor(+object);
    case dataViewTag$1:
      return cloneDataView(object, isDeep);
    case float32Tag$1:
    case float64Tag$1:
    case int8Tag$1:
    case int16Tag$1:
    case int32Tag$1:
    case uint8Tag$1:
    case uint8ClampedTag$1:
    case uint16Tag$1:
    case uint32Tag$1:
      return cloneTypedArray(object, isDeep);
    case mapTag$2:
      return new Ctor();
    case numberTag$1:
    case stringTag$1:
      return new Ctor(object);
    case regexpTag$1:
      return cloneRegExp(object);
    case setTag$2:
      return new Ctor();
    case symbolTag$1:
      return cloneSymbol(object);
  }
}
function initCloneObject(object) {
  return typeof object.constructor == "function" && !isPrototype(object) ? baseCreate$1(getPrototype$1(object)) : {};
}
var mapTag$1 = "[object Map]";
function baseIsMap(value) {
  return isObjectLike(value) && getTag$1(value) == mapTag$1;
}
var nodeIsMap = nodeUtil$1 && nodeUtil$1.isMap;
var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;
const isMap$1 = isMap;
var setTag$1 = "[object Set]";
function baseIsSet(value) {
  return isObjectLike(value) && getTag$1(value) == setTag$1;
}
var nodeIsSet = nodeUtil$1 && nodeUtil$1.isSet;
var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;
const isSet$1 = isSet;
var CLONE_DEEP_FLAG$1 = 1, CLONE_FLAT_FLAG = 2, CLONE_SYMBOLS_FLAG$1 = 4;
var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", symbolTag = "[object Symbol]", weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] = cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] = cloneableTags[boolTag] = cloneableTags[dateTag] = cloneableTags[float32Tag] = cloneableTags[float64Tag] = cloneableTags[int8Tag] = cloneableTags[int16Tag] = cloneableTags[int32Tag] = cloneableTags[mapTag] = cloneableTags[numberTag] = cloneableTags[objectTag] = cloneableTags[regexpTag] = cloneableTags[setTag] = cloneableTags[stringTag] = cloneableTags[symbolTag] = cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] = cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] = cloneableTags[weakMapTag] = false;
function baseClone(value, bitmask, customizer, key, object, stack) {
  var result, isDeep = bitmask & CLONE_DEEP_FLAG$1, isFlat = bitmask & CLONE_FLAT_FLAG, isFull = bitmask & CLONE_SYMBOLS_FLAG$1;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== void 0) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray$1(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag$1(value), isFunc = tag == funcTag || tag == genTag;
    if (isBuffer$1(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || isFunc && !object) {
      result = isFlat || isFunc ? {} : initCloneObject(value);
      if (!isDeep) {
        return isFlat ? copySymbolsIn(value, baseAssignIn(result, value)) : copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, isDeep);
    }
  }
  stack || (stack = new Stack());
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);
  if (isSet$1(value)) {
    value.forEach(function(subValue) {
      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
    });
  } else if (isMap$1(value)) {
    value.forEach(function(subValue, key2) {
      result.set(key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
    });
  }
  var keysFunc = isFull ? isFlat ? getAllKeysIn : getAllKeys : isFlat ? keysIn : keys;
  var props = isArr ? void 0 : keysFunc(value);
  arrayEach(props || value, function(subValue, key2) {
    if (props) {
      key2 = subValue;
      subValue = value[key2];
    }
    assignValue(result, key2, baseClone(subValue, bitmask, customizer, key2, value, stack));
  });
  return result;
}
var CLONE_DEEP_FLAG = 1, CLONE_SYMBOLS_FLAG = 4;
function cloneDeep(value) {
  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
}
var now = function() {
  return root$1.Date.now();
};
const now$1 = now;
var FUNC_ERROR_TEXT$1 = "Expected a function";
var nativeMax = Math.max, nativeMin = Math.min;
function debounce(func, wait, options) {
  var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT$1);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  function invokeFunc(time) {
    var args = lastArgs, thisArg = lastThis;
    lastArgs = lastThis = void 0;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }
  function leadingEdge(time) {
    lastInvokeTime = time;
    timerId = setTimeout(timerExpired, wait);
    return leading ? invokeFunc(time) : result;
  }
  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
    return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }
  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
    return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }
  function timerExpired() {
    var time = now$1();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    timerId = setTimeout(timerExpired, remainingWait(time));
  }
  function trailingEdge(time) {
    timerId = void 0;
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = void 0;
    return result;
  }
  function cancel() {
    if (timerId !== void 0) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = void 0;
  }
  function flush() {
    return timerId === void 0 ? result : trailingEdge(now$1());
  }
  function debounced() {
    var time = now$1(), isInvoking = shouldInvoke(time);
    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;
    if (isInvoking) {
      if (timerId === void 0) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        clearTimeout(timerId);
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === void 0) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}
var FUNC_ERROR_TEXT = "Expected a function";
function throttle(func, wait, options) {
  var leading = true, trailing = true;
  if (typeof func != "function") {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  if (isObject(options)) {
    leading = "leading" in options ? !!options.leading : leading;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    "leading": leading,
    "maxWait": wait,
    "trailing": trailing
  });
}
const _hoisted_1$5 = ["onDblclick"];
const __default__$b = defineComponent({
  name: "AreaGradientPoint"
});
const _sfc_main$b = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$b), {
  props: {
    index: {
      type: Number,
      required: true
    },
    point: {
      type: Object,
      required: true
    },
    width: {
      type: Number,
      default: 0
    },
    positions: {
      type: Object
    }
  },
  setup(__props) {
    const props = __props;
    const colorPickerState = inject("colorPickerState");
    const updateColor = inject("updateColor");
    const activeClassName = computed(
      () => colorPickerState.activePointIndex === props.index ? " active" : ""
    );
    const pointStyle = computed(() => {
      return { left: `${props.point.left * ((props.width - 14) / 100)}px` };
    });
    const mouseDownHandler = (event) => {
      const startX = event.pageX;
      const startY = event.pageY;
      const offsetX = startX - (props.positions.x || 0);
      colorPickerState.activePointIndex = props.index;
      return {
        startX,
        startY,
        offsetX
      };
    };
    const updateGradientLeft = (left) => {
      colorPickerState.points[props.index].left = left;
      updateColor({ type: colorPickerState.type }, "type");
    };
    const changeObjectPositions = (event, { startX, offsetX }) => {
      const moveX = event.pageX - startX;
      offsetX += moveX;
      const left = updateGradientActivePercent(offsetX, props.width);
      return {
        positions: {
          offsetX,
          startX: event.pageX
        },
        left
      };
    };
    const mouseMoveHandler = (event, { startX, offsetX }) => {
      const { positions, left } = changeObjectPositions(event, {
        startX,
        offsetX
      });
      updateGradientLeft(left);
      return positions;
    };
    const mouseUpHandler = (event, { startX, offsetX }) => {
      const { positions, left } = changeObjectPositions(event, {
        startX,
        offsetX
      });
      updateGradientLeft(left);
      return positions;
    };
    const mouseEvents = useMouseEvents(
      mouseDownHandler,
      mouseMoveHandler,
      mouseUpHandler
    );
    const removePoint = () => {
      let points = cloneDeep(colorPickerState.points);
      if (points.length <= 2)
        return;
      const index2 = props.index;
      const newIdx = index2 === 0 ? 1 : index2 - 1;
      points = points == null ? void 0 : points.filter((i) => i.id !== props.point.id);
      colorPickerState.activePointIndex = newIdx;
      updateColor({ points }, "points");
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(`picker-pointer${unref(activeClassName)}`),
        style: normalizeStyle(unref(pointStyle)),
        onMousedown: _cache[0] || (_cache[0] = withModifiers(
          //@ts-ignore
          (...args) => unref(mouseEvents) && unref(mouseEvents)(...args),
          ["stop"]
        )),
        onDblclick: withModifiers(removePoint, ["stop"]),
        onClick: _cache[1] || (_cache[1] = withModifiers(() => unref(colorPickerState).activePointIndex = props.index, ["stop"]))
      }, [
        createElementVNode("span", {
          class: normalizeClass(`child-point${unref(activeClassName)}`)
        }, null, 2)
      ], 46, _hoisted_1$5);
    };
  }
}));
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  if (!getRandomValues) {
    getRandomValues = typeof crypto !== "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);
    if (!getRandomValues) {
      throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
    }
  }
  return getRandomValues(rnds8);
}
const byteToHex = [];
for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 256).toString(16).slice(1));
}
function unsafeStringify(arr, offset = 0) {
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}
const randomUUID = typeof crypto !== "undefined" && crypto.randomUUID && crypto.randomUUID.bind(crypto);
const native = {
  randomUUID
};
function v4(options, buf, offset) {
  if (native.randomUUID && !buf && !options) {
    return native.randomUUID();
  }
  options = options || {};
  const rnds = options.random || (options.rng || rng)();
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  if (buf) {
    offset = offset || 0;
    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }
    return buf;
  }
  return unsafeStringify(rnds);
}
const __default__$a = defineComponent({
  name: "AreaGradientPoints"
});
const _sfc_main$a = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$a), {
  setup(__props) {
    const colorPickerState = inject("colorPickerState");
    const updateColor = inject("updateColor");
    const pointsContainerRef = ref(null);
    const pointsContainerBoxInfo = ref(null);
    const pointsStyle = computed(() => {
      const style = generateGradientStyle(colorPickerState.points, "linear", 90);
      return { background: style };
    });
    const handleAddPoit = (event) => {
      const { x = 0, width = 0 } = pointsContainerBoxInfo.value || {};
      const left = updateGradientActivePercent(event.pageX - x, width);
      const { hue, saturation, value } = colorPickerState;
      const points = cloneDeep(colorPickerState.points);
      const rgba = hsvToRgb(hue, saturation, value, 1);
      const newPoint = __spreadProps(__spreadValues({
        id: v4()
      }, rgba), {
        left
      });
      points == null ? void 0 : points.push(newPoint);
      colorPickerState.activePointIndex = points.findIndex(
        (i) => i.id === newPoint.id
      );
      updateColor(
        {
          points
        },
        "points"
      );
    };
    watchEffect(() => {
      var _a, _b;
      if (pointsContainerRef.value && !((_a = pointsContainerBoxInfo.value) == null ? void 0 : _a.width)) {
        pointsContainerBoxInfo.value = ((_b = pointsContainerRef.value) == null ? void 0 : _b.getBoundingClientRect()) || null;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "gradient border-box w-full h-14px relative cursor-pointer rounded-10px mb-8px",
        style: normalizeStyle(unref(pointsStyle)),
        onClick: handleAddPoit
      }, [
        createElementVNode("div", {
          ref_key: "pointsContainerRef",
          ref: pointsContainerRef,
          class: "wh-full relative"
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(colorPickerState).points, (point, index2) => {
            var _a;
            return openBlock(), createBlock(_sfc_main$b, {
              key: point.id,
              index: index2,
              point,
              positions: unref(pointsContainerBoxInfo),
              width: (_a = unref(pointsContainerBoxInfo)) == null ? void 0 : _a.width
            }, null, 8, ["index", "point", "positions", "width"]);
          }), 128))
        ], 512)
      ], 4);
    };
  }
}));
const _hoisted_1$4 = { class: "flex flex-col px-16px" };
const _hoisted_2$4 = { class: "flex pb-16px" };
const _hoisted_3$2 = { class: "flex flex-col flex-1" };
const __default__$9 = defineComponent({
  name: "Area"
});
const _sfc_main$9 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$9), {
  setup(__props) {
    const colorPickerState = inject("colorPickerState");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$4, [
        createVNode(Picker),
        unref(colorPickerState).isGradient ? (openBlock(), createBlock(_sfc_main$a, { key: 0 })) : createCommentVNode("", true),
        createElementVNode("div", _hoisted_2$4, [
          createVNode(_sfc_main$e),
          createElementVNode("div", _hoisted_3$2, [
            createVNode(Hue),
            createVNode(Alpha)
          ])
        ])
      ]);
    };
  }
}));
const _hoisted_1$3 = { class: "flex items-center relative w-full rounded-6px text-[#28314d]" };
const _hoisted_2$3 = ["maxlength", "type"];
const _hoisted_3$1 = { class: "text-12px lining-15px font-bold mt-6px mb-0 text-[#1f2667]" };
const __default__$8 = defineComponent({
  name: "Input"
});
const _sfc_main$8 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$8), {
  props: {
    value: { default: "" },
    label: { default: "" },
    classes: { default: "" },
    maxLen: { default: "3" },
    type: { default: "text" }
  },
  emits: ["input", "blur", "focus", "update:value"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const value = computed({
      get: () => props.value,
      set: (val) => {
        emits("update:value", val);
      }
    });
    const onInput = (e) => {
      emits("input", e);
    };
    const onBlur = () => {
      emits("blur");
    };
    const onFocus = () => {
      emits("focus");
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(["flex flex-shrink-0 items-center flex-col", props.classes])
      }, [
        createElementVNode("div", _hoisted_1$3, [
          withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(value) ? value.value = $event : null),
            class: "w-full outline-0 text-[#1f2667] text-center font-bold text-12px",
            maxlength: __props.maxLen,
            type: props.type,
            onFocus,
            onBlur,
            onInput
          }, null, 40, _hoisted_2$3), [
            [
              vModelDynamic,
              unref(value),
              void 0,
              { trim: true }
            ]
          ])
        ]),
        createElementVNode("div", _hoisted_3$1, toDisplayString(__props.label), 1)
      ], 2);
    };
  }
}));
const index_vue_vue_type_style_index_0_scoped_034b5687_lang = "";
const CInput = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-034b5687"]]);
const __default__$7 = defineComponent({
  name: "PreviewHex"
});
const _sfc_main$7 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$7), {
  setup(__props) {
    const colorPickerState = inject("colorPickerState");
    const updateColor = inject("updateColor");
    const hexValue = computed(() => {
      const { isGradient, activePointIndex } = colorPickerState;
      const activePoint = colorPickerState.points[activePointIndex];
      if (isGradient) {
        return rgbToHex(activePoint.red, activePoint.green, activePoint.blue);
      } else {
        return rgbToHex(
          colorPickerState.red,
          colorPickerState.green,
          colorPickerState.blue
        );
      }
    });
    const changeHex = (event) => {
      let val = event.target.value;
      if (!val && val !== 0)
        return;
      const color = hexToRgb(val);
      if (color) {
        updateColor(color);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(CInput, {
        value: unref(hexValue),
        label: "Hex",
        "max-len": "7",
        classes: "hex mr-8px",
        onInput: changeHex
      }, null, 8, ["value"]);
    };
  }
}));
const __default__$6 = defineComponent({
  name: "PreviewRGBItem"
});
const _sfc_main$6 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$6), {
  props: {
    type: { default: "text" },
    label: { default: "" }
  },
  setup(__props) {
    const props = __props;
    const colorPickerState = inject("colorPickerState");
    const updateColor = inject("updateColor");
    const RGBValue = computed(() => {
      const {
        isGradient,
        red,
        green,
        blue,
        alpha,
        points = [],
        activePointIndex = 0
      } = colorPickerState;
      const activePoint = points[activePointIndex];
      let value = 0;
      switch (props.label) {
        case "R":
          value = isGradient ? activePoint.red : red;
          break;
        case "G":
          value = isGradient ? activePoint.green : green;
          break;
        case "B":
          value = isGradient ? activePoint.blue : blue;
          break;
        case "A":
          value = ~~((isGradient ? activePoint.alpha : alpha) * 100);
          break;
      }
      return value;
    });
    const onInput = (event) => {
      let value = +event.target.value;
      const { isGradient, points = [], activePointIndex = 0 } = colorPickerState;
      points[activePointIndex];
      if (props.label === "A" && value > 100) {
        value = 100;
      } else if (value <= 0) {
        value = 0;
      } else if (value > 255) {
        value = 255;
      }
      switch (props.label) {
        case "R":
          updateColor({ red: value }, "red");
          break;
        case "G":
          updateColor({ green: value }, "green");
          break;
        case "B":
          updateColor({ blue: value }, "blue");
          break;
        case "A":
          updateColor({ alpha: value / 100 }, "alpha");
          break;
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(CInput, {
          value: unref(RGBValue),
          label: props.label,
          type: props.type,
          classes: props.label !== "A" ? "mr-8px" : "",
          onInput
        }, null, 8, ["value", "label", "type", "classes"])
      ]);
    };
  }
}));
const __default__$5 = defineComponent({
  name: "PreviewRGB"
});
const _sfc_main$5 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$5), {
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_sfc_main$6, {
          type: "number",
          label: "R"
        }),
        createVNode(_sfc_main$6, {
          type: "number",
          label: "G"
        }),
        createVNode(_sfc_main$6, {
          type: "number",
          label: "B"
        }),
        createVNode(_sfc_main$6, {
          type: "number",
          label: "A"
        })
      ], 64);
    };
  }
}));
const _hoisted_1$2 = { class: "color-preview-area mb-8px px-16px" };
const _hoisted_2$2 = { class: "w-full flex justify-between" };
const __default__$4 = defineComponent({
  name: "Preview"
});
const _sfc_main$4 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$4), {
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createElementVNode("div", _hoisted_2$2, [
          createVNode(_sfc_main$7),
          createVNode(_sfc_main$5)
        ])
      ]);
    };
  }
}));
const __default__$3 = defineComponent({
  name: "Solid"
});
const _sfc_main$3 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$3), {
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_sfc_main$9),
        createVNode(_sfc_main$4)
      ], 64);
    };
  }
}));
const _withScopeId = (n) => (pushScopeId("data-v-4e21238c"), n = n(), popScopeId(), n);
const _hoisted_1$1 = { class: "gradient-controls border-box flex justify-between items-center w-full mb-8px px-16px" };
const _hoisted_2$1 = { class: "flex flex-1" };
const _hoisted_3 = {
  key: 0,
  class: "relative mr-24px"
};
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("div", { class: "gradient-degree-pointer" }, null, -1));
const _hoisted_5 = [
  _hoisted_4
];
const _hoisted_6 = { class: "gradient-degree-value flex justify-center items-center" };
const __default__$2 = defineComponent({
  name: "GradientControls"
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$2), {
  setup(__props) {
    const colorPickerState = inject("colorPickerState");
    const updateColor = inject("updateColor");
    const type = computed(() => colorPickerState.type);
    const degree = computed(() => colorPickerState.degree);
    const handleType = (type2) => {
      updateColor({ type: type2 }, "type");
    };
    const disableClick = ref(true);
    const onClickGradientDegree = () => {
      if (disableClick.value) {
        disableClick.value = false;
        return;
      }
      let gradientDegree = (colorPickerState.degree || 0) + 45;
      if (gradientDegree >= 360) {
        gradientDegree = 0;
      }
      updateColor({ degree: ~~gradientDegree }, "degree");
    };
    const degreesStyle = computed(() => {
      return { transform: `rotate(${colorPickerState.degree}deg)` };
    });
    const mouseDownHandler = (event) => {
      const pointer = event.target;
      const pointerBox = pointer.getBoundingClientRect();
      const centerY = ~~(8 - window.pageYOffset) + pointerBox.top;
      const centerX = ~~(8 - window.pageXOffset) + pointerBox.left;
      return {
        centerY,
        centerX
      };
    };
    const mouseMoveHandler = (event, { centerX, centerY }) => {
      disableClick.value = true;
      const newDegree = calculateDegree(
        event.clientX,
        event.clientY,
        centerX,
        centerY
      );
      updateColor({ degree: ~~newDegree }, "degree");
    };
    const mouseUpHandler = (event) => {
      const targetClasses = event.target.classList;
      disableClick.value = false;
      if (targetClasses.contains("gradient-degrees") || targetClasses.contains("icon-rotate")) {
        return;
      }
    };
    const mouseEvents = useMouseEvents(
      mouseDownHandler,
      mouseMoveHandler,
      mouseUpHandler
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createElementVNode("div", _hoisted_2$1, [
          createElementVNode("div", {
            class: normalizeClass(`gradient-type-item liner-gradient ${unref(type) === "linear" ? "active" : ""}`),
            onClick: _cache[0] || (_cache[0] = ($event) => handleType("linear"))
          }, null, 2),
          createElementVNode("div", {
            class: normalizeClass(`gradient-type-item radial-gradient ${unref(type) === "radial" ? "active" : ""}`),
            onClick: _cache[1] || (_cache[1] = ($event) => handleType("radial"))
          }, null, 2)
        ]),
        unref(type) === "linear" ? (openBlock(), createElementBlock("div", _hoisted_3, [
          createElementVNode("div", {
            class: "gradient-degrees cursor-pointer flex justify-center items-center",
            onMousedown: _cache[2] || (_cache[2] = //@ts-ignore
            (...args) => unref(mouseEvents) && unref(mouseEvents)(...args)),
            onClick: onClickGradientDegree
          }, [
            createElementVNode("div", {
              class: "gradient-degree-center",
              style: normalizeStyle(unref(degreesStyle))
            }, _hoisted_5, 4)
          ], 32),
          createElementVNode("div", _hoisted_6, [
            createElementVNode("p", null, toDisplayString(unref(degree)) + "°", 1)
          ])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
}));
const index_vue_vue_type_style_index_0_scoped_4e21238c_lang = "";
const GradientControls = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-4e21238c"]]);
const __default__$1 = defineComponent({
  name: "Gradient"
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$1), {
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(GradientControls),
        createVNode(_sfc_main$9),
        createVNode(_sfc_main$4)
      ], 64);
    };
  }
}));
const _hoisted_1 = { class: "picker-color-ui border-box m-8px bg-[#fff] flex flex-col slelect-none" };
const _hoisted_2 = {
  key: 2,
  class: "btns flex justify-end items-center select-none"
};
const __default__ = defineComponent({
  name: "ColorPicker"
});
const _sfc_main = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__), {
  props: {
    isGradient: {
      type: Boolean,
      default: false
    },
    showBtn: {
      type: Boolean,
      default: false
    },
    color: {
      type: Object,
      default: (_this) => {
        if (_this.isGradient) {
          return {
            type: "linear",
            degree: 0,
            points: [
              {
                id: v4(),
                left: 0,
                red: 0,
                green: 0,
                blue: 0,
                alpha: 1
              },
              {
                id: v4(),
                left: 100,
                red: 255,
                green: 0,
                blue: 0,
                alpha: 1
              }
            ]
          };
        } else {
          return { red: 255, green: 0, blue: 0, alpha: 1 };
        }
      }
    },
    // gradient: {
    //   type: Object as PropType<IGradient>,
    //   default: () => ({
    //     type: 'linear',
    //     degree: 0,
    //     points: [
    //       {
    //         id: uuidv4(),
    //         left: 0,
    //         red: 0,
    //         green: 0,
    //         blue: 0,
    //         alpha: 1,
    //       },
    //       {
    //         id: uuidv4(),
    //         left: 100,
    //         red: 255,
    //         green: 0,
    //         blue: 0,
    //         alpha: 1,
    //       },
    //     ],
    //   }),
    // },
    cancelText: {
      type: String,
      default: "Cancel"
    },
    cancelColor: {
      type: String,
      default: "#333"
    },
    cancelBg: {
      type: String,
      default: "#fff"
    },
    confirmText: {
      type: String,
      default: "Confirm"
    },
    confirmColor: {
      type: String,
      defualt: "#333"
    },
    confirmBg: {
      type: String,
      defualt: "#fff"
    }
  },
  emits: ["change"],
  setup(__props, { expose, emit: emits }) {
    var _a, _b;
    const props = __props;
    console.log(props);
    const pointLen = props.isGradient ? ((_b = (_a = props.color) == null ? void 0 : _a.points) == null ? void 0 : _b.length) || 0 : 0;
    const colorPickerState = reactive({
      isGradient: props.isGradient,
      // 是否是渐变
      red: props.isGradient ? props.color.points[pointLen - 1].red || 0 : props.color.red || 255,
      green: props.isGradient ? props.color.points[pointLen - 1].green || 0 : props.color.green || 0,
      blue: props.isGradient ? props.color.points[pointLen - 1].blue || 0 : props.color.blue || 0,
      alpha: props.isGradient ? props.color.points[pointLen - 1].alpha : props.color.alpha,
      hue: 0,
      saturation: 100,
      // 饱和
      value: 100,
      style: "",
      type: "linear",
      degree: 0,
      activePointIndex: pointLen - 1,
      // 当前渐变点的下标
      points: props.isGradient ? cloneDeep(props.color.points) : []
      // 渐变的点
    });
    const updateColor = throttle(
      function({
        red,
        green,
        blue,
        alpha,
        hue,
        saturation,
        value,
        points,
        type,
        degree
      }, key) {
        const params = {
          red,
          green,
          blue,
          alpha,
          hue,
          saturation,
          value,
          points,
          type,
          degree
        };
        props.isGradient ? updateGradient(params, key) : updateSolid(params, key);
      },
      props.showBtn ? 100 : 150
    );
    function updateGradient(color, key) {
      const {
        red = 0,
        green = 0,
        blue = 0,
        alpha = 0,
        hue,
        saturation,
        value,
        points,
        type,
        degree
      } = color;
      const activePoint = colorPickerState.points[colorPickerState.activePointIndex];
      if (key) {
        if (key === "points" || key === "type" || key === "degree") {
          colorPickerState[key] = color[key];
        } else {
          activePoint[key] = color[key];
        }
      } else {
        activePoint.red = red;
        activePoint.green = green;
        activePoint.blue = blue;
        colorPickerState.alpha = alpha;
        points && (colorPickerState.points = points);
        type && (colorPickerState.type = type);
        degree && (colorPickerState.degree = degree);
        saturation && (colorPickerState.saturation = saturation);
        value && (colorPickerState.value = value);
        hue && (colorPickerState.hue = hue);
      }
      const style = generateGradientStyle(
        colorPickerState.points,
        colorPickerState.type,
        colorPickerState.degree
      );
      colorPickerState.style = style;
      !props.showBtn && emits("change", {
        style: colorPickerState.style,
        gradient: {
          type: colorPickerState.type,
          degree: colorPickerState.degree,
          points: colorPickerState.points
        }
      });
    }
    function updateSolid(color, key) {
      const { red = 0, green = 0, blue = 0, alpha, hue, saturation, value } = color;
      if (key) {
        colorPickerState[key] = color[key];
      } else {
        colorPickerState.red = red;
        colorPickerState.green = green;
        colorPickerState.blue = blue;
        alpha && (colorPickerState.alpha = alpha);
        saturation && (colorPickerState.saturation = saturation);
        value && (colorPickerState.value = value);
        hue && (colorPickerState.hue = hue);
      }
      const style = generateSolidStyle(
        colorPickerState.red,
        colorPickerState.green,
        colorPickerState.blue,
        colorPickerState.alpha
      );
      colorPickerState.style = style;
      console.log(colorPickerState);
      !props.showBtn && emits("change", {
        style,
        color: {
          red: colorPickerState.red,
          green: colorPickerState.green,
          blue: colorPickerState.blue,
          hue: colorPickerState.hue,
          alpha: colorPickerState.alpha
        }
      });
    }
    const onClose = (cb) => {
      cb && typeof cb === "function" && cb();
    };
    const onConfirm = (cb) => {
      const {
        isGradient,
        style,
        type,
        degree,
        points,
        red,
        green,
        blue,
        alpha,
        hue
      } = colorPickerState;
      if (isGradient) {
        emits("change", {
          style,
          gradient: {
            type,
            degree,
            points
          }
        });
      } else {
        emits("change", {
          style,
          color: {
            red,
            green,
            blue,
            hue,
            alpha
          }
        });
      }
      cb && typeof cb === "function" && cb();
    };
    provide("colorPickerState", colorPickerState);
    provide("updateColor", updateColor);
    expose({
      onClose,
      onConfirm
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        props.isGradient ? (openBlock(), createBlock(_sfc_main$1, { key: 0 })) : (openBlock(), createBlock(_sfc_main$3, { key: 1 })),
        __props.showBtn ? (openBlock(), createElementBlock("div", _hoisted_2, [
          createElementVNode("div", {
            class: "btn",
            style: normalizeStyle({
              color: props.cancelColor,
              backgroundColor: props.cancelBg
            }),
            onClick: onClose
          }, toDisplayString(props.cancelText), 5),
          createElementVNode("div", {
            class: "btn",
            style: normalizeStyle({
              color: props.confirmColor,
              backgroundColor: props.confirmBg
            }),
            onClick: onConfirm
          }, toDisplayString(props.confirmText), 5)
        ])) : createCommentVNode("", true)
      ]);
    };
  }
}));
const index = "";
const __uno = "";
export {
  _sfc_main as default
};
