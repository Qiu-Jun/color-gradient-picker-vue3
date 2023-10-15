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
import { defineComponent, ref, inject, computed, watchEffect, openBlock, createElementBlock, normalizeStyle, unref, createElementVNode, normalizeClass, withModifiers, Fragment, renderList, createBlock, createVNode, createCommentVNode, withDirectives, isRef, vModelDynamic, toDisplayString } from "vue";
import { g as generateGradientStyle, a as generateSolidStyle, c as cloneDeep, v as v4, r as rgbToHex } from "./index-4c7f7b15.js";
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
const _hoisted_1$6 = { class: "picker-area-overlay1 wh-full" };
const _hoisted_2$3 = { class: "picker-area-overlay2 wh-full rounded-8px" };
const __default__$b = defineComponent({
  name: "AreaPicker"
});
const _sfc_main$b = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$b), {
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
        createElementVNode("div", _hoisted_1$6, [
          createElementVNode("div", _hoisted_2$3, [
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
const Picker = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-2e8391c9"]]);
const _hoisted_1$5 = { class: "preview-area mr-8px" };
const __default__$a = defineComponent({
  name: "AreaPreview"
});
const _sfc_main$a = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$a), {
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
      return openBlock(), createElementBlock("div", _hoisted_1$5, [
        createElementVNode("div", {
          class: "border-box w-36px h-36px rounded-8px border-width-1px border-solid border-[#ebedf5]",
          style: normalizeStyle(unref(style))
        }, null, 4)
      ]);
    };
  }
}));
const __default__$9 = defineComponent({
  name: "AreaHue"
});
const _sfc_main$9 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$9), {
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
const Hue = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-7cd4331a"]]);
const _hoisted_1$4 = { class: "alpha-area wh-full rounded-10px" };
const __default__$8 = defineComponent({
  name: "AreaAlpha"
});
const _sfc_main$8 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$8), {
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
        createElementVNode("div", _hoisted_1$4, [
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
const Alpha = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-256c0c24"]]);
const _hoisted_1$3 = ["onDblclick"];
const __default__$7 = defineComponent({
  name: "AreaGradientPoint"
});
const _sfc_main$7 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$7), {
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
      const index = props.index;
      const newIdx = index === 0 ? 1 : index - 1;
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
      ], 46, _hoisted_1$3);
    };
  }
}));
const __default__$6 = defineComponent({
  name: "AreaGradientPoints"
});
const _sfc_main$6 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$6), {
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
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(colorPickerState).points, (point, index) => {
            var _a;
            return openBlock(), createBlock(_sfc_main$7, {
              key: point.id,
              index,
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
const _hoisted_1$2 = { class: "flex flex-col px-16px" };
const _hoisted_2$2 = { class: "flex pb-16px" };
const _hoisted_3$1 = { class: "flex flex-col flex-1" };
const __default__$5 = defineComponent({
  name: "Area"
});
const _sfc_main$5 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$5), {
  setup(__props) {
    const colorPickerState = inject("colorPickerState");
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createVNode(Picker),
        unref(colorPickerState).isGradient ? (openBlock(), createBlock(_sfc_main$6, { key: 0 })) : createCommentVNode("", true),
        createElementVNode("div", _hoisted_2$2, [
          createVNode(_sfc_main$a),
          createElementVNode("div", _hoisted_3$1, [
            createVNode(Hue),
            createVNode(Alpha)
          ])
        ])
      ]);
    };
  }
}));
const _hoisted_1$1 = { class: "flex items-center relative w-full rounded-6px text-[#28314d]" };
const _hoisted_2$1 = ["maxlength", "type"];
const _hoisted_3 = { class: "text-12px lining-15px font-bold mt-6px mb-0 text-[#1f2667]" };
const __default__$4 = defineComponent({
  name: "Input"
});
const _sfc_main$4 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$4), {
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
        createElementVNode("div", _hoisted_1$1, [
          withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(value) ? value.value = $event : null),
            class: "w-full outline-0 text-[#1f2667] text-center font-bold text-12px",
            maxlength: __props.maxLen,
            type: props.type,
            onFocus,
            onBlur,
            onInput
          }, null, 40, _hoisted_2$1), [
            [
              vModelDynamic,
              unref(value),
              void 0,
              { trim: true }
            ]
          ])
        ]),
        createElementVNode("div", _hoisted_3, toDisplayString(__props.label), 1)
      ], 2);
    };
  }
}));
const index_vue_vue_type_style_index_0_scoped_034b5687_lang = "";
const CInput = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-034b5687"]]);
const __default__$3 = defineComponent({
  name: "PreviewHex"
});
const _sfc_main$3 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$3), {
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
const __default__$2 = defineComponent({
  name: "PreviewRGBItem"
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$2), {
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
const __default__$1 = defineComponent({
  name: "PreviewRGB"
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$1), {
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_sfc_main$2, {
          type: "number",
          label: "R"
        }),
        createVNode(_sfc_main$2, {
          type: "number",
          label: "G"
        }),
        createVNode(_sfc_main$2, {
          type: "number",
          label: "B"
        }),
        createVNode(_sfc_main$2, {
          type: "number",
          label: "A"
        })
      ], 64);
    };
  }
}));
const _hoisted_1 = { class: "color-preview-area mb-8px px-16px" };
const _hoisted_2 = { class: "w-full flex justify-between" };
const __default__ = defineComponent({
  name: "Preview"
});
const _sfc_main = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__), {
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createElementVNode("div", _hoisted_2, [
          createVNode(_sfc_main$3),
          createVNode(_sfc_main$1)
        ])
      ]);
    };
  }
}));
export {
  _export_sfc as _,
  _sfc_main$5 as a,
  _sfc_main as b,
  useMouseEvents as u
};
