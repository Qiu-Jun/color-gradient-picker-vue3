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
import { defineComponent, ref, reactive, computed, onMounted, openBlock, createElementBlock, normalizeStyle, unref, createElementVNode, normalizeClass, withModifiers, Fragment, renderList, createBlock, createVNode, createCommentVNode, withDirectives, isRef, vModelText, toDisplayString, watch, getCurrentInstance, inject, onBeforeUnmount, provide } from "vue";
function rgbToHSv({
  red,
  green,
  blue,
  alpha
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
function getRgbByHue(hue) {
  let C = 1;
  const H = hue / 60;
  let X = C * (1 - Math.abs(H % 2 - 1));
  const m = 0;
  const precision = 255;
  let r = 0;
  let g = 0;
  let b = 0;
  C = (C + m) * precision | 0;
  X = (X + m) * precision | 0;
  if (H >= 0 && H < 1) {
    r = C | 0;
    g = X | 0;
    b = m | 0;
  }
  if (H >= 1 && H < 2) {
    r = X | 0;
    g = C | 0;
    b = m | 0;
  }
  if (H >= 2 && H < 3) {
    r = m | 0;
    g = C | 0;
    b = X | 0;
  }
  if (H >= 3 && H < 4) {
    r = m | 0;
    g = X | 0;
    b = C | 0;
  }
  if (H >= 4 && H < 5) {
    r = X | 0;
    g = m | 0;
    b = C | 0;
  }
  if (H >= 5 && H <= 6) {
    r = C | 0;
    g = m | 0;
    b = X | 0;
  }
  return {
    red: r,
    green: g,
    blue: b
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
function hsvToRgb(hue, saturation, value) {
  value /= 100;
  const sat = saturation / 100;
  let C = sat * value;
  const H = hue / 60;
  let X = C * (1 - Math.abs(H % 2 - 1));
  let m = value - C;
  const precision = 255;
  const defaultAlpha = 1;
  C = (C + m) * precision | 0;
  X = (X + m) * precision | 0;
  m = m * precision | 0;
  if (H >= 1 && H < 2) {
    return setRGBA(X, C, m, defaultAlpha);
  }
  if (H >= 2 && H < 3) {
    return setRGBA(m, C, X, defaultAlpha);
  }
  if (H >= 3 && H < 4) {
    return setRGBA(m, X, C, defaultAlpha);
  }
  if (H >= 4 && H < 5) {
    return setRGBA(X, m, C, defaultAlpha);
  }
  if (H >= 5 && H <= 6) {
    return setRGBA(C, m, X, defaultAlpha);
  }
  return setRGBA(C, X, m, defaultAlpha);
}
function changePicker(x, y, height, width, hue) {
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
  return __spreadProps(__spreadValues({}, hsvToRgb(hue, saturation, value)), {
    saturation,
    value
  });
}
function getHue(offsetX, width, saturation, value) {
  let hue = 360 * offsetX / width | 0;
  hue = hue < 0 ? 0 : hue > 360 ? 360 : hue;
  return __spreadProps(__spreadValues({}, hsvToRgb(hue, saturation, value)), {
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
      return;
    const red = parseInt(value.substring(0, 2), 16) || 0;
    const green = parseInt(value.substring(2, 4), 16) || 0;
    const blue = parseInt(value.substring(4, 6), 16) || 0;
    const alpha = parseInt(value.substring(6, 10), 16) / 255 || 0;
    const color = setRGBA(red, green, blue, alpha);
    const hsv = color && rgbToHSv(__spreadValues({}, color));
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
function getRightValue(newValue, oldValue) {
  return !newValue && newValue !== 0 ? oldValue : newValue;
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
const _hoisted_1$7 = { class: "picking-area-overlay1" };
const _hoisted_2$5 = { class: "picking-area-overlay2" };
const __default__$f = defineComponent({
  name: "Picker"
});
const _sfc_main$f = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$f), {
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
  setup(__props) {
    const props = __props;
    const pickerAreaRef = ref(null);
    const state = reactive({
      width: 0,
      height: 0,
      mouseEvents: () => false
    });
    const offsetLeft = computed(
      () => (props.saturation * state.width / 100 | 0) - 6
    );
    const offsetTop = computed(
      () => (state.height - props.value * state.height / 100 | 0) - 6
    );
    const pointerStyle = computed(() => {
      return {
        backgroundColor: `rgb(${props.red}, ${props.green}, ${props.blue})`,
        left: `${offsetLeft.value}px`,
        top: `${offsetTop.value}px`
      };
    });
    const pickerStyle = computed(() => {
      const { red, green, blue } = getRgbByHue(props.hue);
      return { backgroundColor: `rgb(${red}, ${green}, ${blue})` };
    });
    const mouseDownHandler = (event) => {
      const _pickerAreaRef = pickerAreaRef == null ? void 0 : pickerAreaRef.value;
      if (!_pickerAreaRef)
        return;
      const { x: elementX, y: elementY } = _pickerAreaRef.getBoundingClientRect();
      const startX = event.pageX;
      const startY = event.pageY;
      const positionX = startX - elementX;
      const positionY = startY - elementY;
      const color = changePicker(
        positionX,
        positionY,
        state.height,
        state.width,
        props.hue
      );
      props.updateColor(color, "onStartChange");
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
      positionX += moveX;
      positionY += moveY;
      const color = changePicker(
        positionX,
        positionY,
        state.height,
        state.width,
        props.hue
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
      props.updateColor(color, "onChange");
      return positions;
    };
    const mouseUpHandler = (event, { startX, startY, positionX, positionY }) => {
      const { positions, color } = changeObjectPositions(event, {
        startX,
        startY,
        positionX,
        positionY
      });
      props.updateColor(color, "onEndChange");
      return positions;
    };
    onMounted(() => {
      const _pickerAreaRef = pickerAreaRef == null ? void 0 : pickerAreaRef.value;
      if (_pickerAreaRef) {
        state.width = _pickerAreaRef.clientWidth;
        state.height = _pickerAreaRef.clientHeight;
      }
      state.mouseEvents = useMouseEvents(
        mouseDownHandler,
        mouseMoveHandler,
        mouseUpHandler
      );
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "pickerAreaRef",
        ref: pickerAreaRef,
        class: "picking-area",
        style: normalizeStyle(unref(pickerStyle)),
        onMousedown: _cache[0] || (_cache[0] = //@ts-ignore
        (...args) => state.mouseEvents && state.mouseEvents(...args))
      }, [
        createElementVNode("div", _hoisted_1$7, [
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
const _hoisted_1$6 = { class: "preview-area" };
const __default__$e = defineComponent({
  name: "PickerPreView"
});
const _sfc_main$e = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$e), {
  props: {
    isGradient: { type: Boolean, default: false },
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
  setup(__props) {
    const props = __props;
    const style = computed(() => {
      let style2 = "";
      if (props.isGradient) {
        style2 = generateGradientStyle(
          props.points,
          props.gradientType,
          props.gradientDegree
        );
        return { background: style2 };
      }
      style2 = generateSolidStyle(props.red, props.green, props.blue, props.alpha);
      return { backgroundColor: style2 };
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$6, [
        createElementVNode("div", {
          class: "preview-box",
          style: normalizeStyle(unref(style))
        }, null, 4)
      ]);
    };
  }
}));
const __default__$d = defineComponent({
  name: "Hue"
});
const _sfc_main$d = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$d), {
  props: {
    hue: Number,
    saturation: Number,
    value: Number,
    updateColor: Function
  },
  setup(__props) {
    const props = __props;
    const hueRef = ref(null);
    const state = reactive({
      width: 0,
      mouseEvents: () => false
    });
    const offsetLeft = computed(() => (props.hue * state.width / 360 | 0) - 6);
    const pointerStyle = computed(() => {
      return {
        left: `${offsetLeft.value}px`
      };
    });
    const mouseDownHandler = (event) => {
      const elementX = event.currentTarget.getBoundingClientRect().x;
      const startX = event.pageX;
      const positionX = startX - elementX;
      const color = getHue(positionX, state.width, props.saturation, props.value);
      props.updateColor(color, "onStartChange");
      return {
        startX,
        positionX
      };
    };
    const changeObjectPositions = (event, { startX, positionX }) => {
      const moveX = event.pageX - startX;
      positionX += moveX;
      const offsetX = positionX > state.width ? state.width : positionX <= 0 ? 0 : positionX;
      const color = getHue(offsetX, state.width, props.saturation, props.value);
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
      props.updateColor(color, "onChange");
      return positions;
    };
    const mouseUpHandler = (event, { startX, positionX }) => {
      const { positions, color } = changeObjectPositions(event, {
        startX,
        positionX
      });
      props.updateColor(color, "onEndChange");
      return positions;
    };
    onMounted(() => {
      hueRef.value && (state.width = hueRef.value.clientWidth);
      state.mouseEvents = useMouseEvents(
        mouseDownHandler,
        mouseMoveHandler,
        mouseUpHandler
      );
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "hue",
        onMousedown: _cache[0] || (_cache[0] = //@ts-ignore
        (...args) => state.mouseEvents && state.mouseEvents(...args))
      }, [
        createElementVNode("div", {
          ref_key: "hueRef",
          ref: hueRef,
          class: "hue-area"
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
const _hoisted_1$5 = { class: "alpha-area" };
const __default__$c = defineComponent({
  name: "alpha"
});
const _sfc_main$c = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$c), {
  props: {
    red: Number,
    green: Number,
    blue: Number,
    alpha: Number,
    updateColor: Function
  },
  setup(__props) {
    const props = __props;
    const alphaMaskRef = ref(null);
    const state = reactive({
      width: 0,
      mouseEvents: () => false
    });
    const offsetLeft = computed(() => {
      return (props.alpha * state.width | 0) - 6;
    });
    const pointerStyle = computed(() => {
      return { left: `${offsetLeft.value}px` };
    });
    const style = computed(() => {
      return {
        background: `linear-gradient(to right, rgba(0, 0, 0, 0), rgb(${props.red}, ${props.green}, ${props.blue}))`
      };
    });
    const mouseDownHandler = (event) => {
      const elementX = event.currentTarget.getBoundingClientRect().x;
      const startX = event.pageX;
      const positionX = startX - elementX;
      props.updateColor(
        { alpha: getAlpha(positionX, state.width) },
        "onStartChange"
      );
      return {
        startX,
        positionX
      };
    };
    const changeObjectPositions = (event, { startX, positionX }) => {
      const moveX = event.pageX - startX;
      positionX += moveX;
      const alpha = getAlpha(positionX, state.width);
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
      props.updateColor({ alpha }, "onChange");
      return positions;
    };
    const mouseUpHandler = (event, { startX, positionX }) => {
      const { positions, alpha } = changeObjectPositions(event, {
        startX,
        positionX
      });
      props.updateColor({ alpha }, "onEndChange");
      return positions;
    };
    onMounted(() => {
      const _alphaMaskRef = alphaMaskRef.value;
      if (_alphaMaskRef) {
        state.width = _alphaMaskRef.clientWidth;
      }
      state.mouseEvents = useMouseEvents(
        mouseDownHandler,
        mouseMoveHandler,
        mouseUpHandler
      );
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "alpha",
        onMousedown: _cache[0] || (_cache[0] = //@ts-ignore
        (...args) => state.mouseEvents && state.mouseEvents(...args))
      }, [
        createElementVNode("div", {
          class: "gradient",
          style: normalizeStyle(unref(style))
        }, null, 4),
        createElementVNode("div", _hoisted_1$5, [
          createElementVNode("div", {
            ref_key: "alphaMaskRef",
            ref: alphaMaskRef,
            class: "alpha-mask"
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
const __default__$b = defineComponent({
  name: "GradientPoint"
});
const _sfc_main$b = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$b), {
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
  setup(__props) {
    const props = __props;
    const state = reactive({
      mouseEvents: () => false
    });
    const activeClassName = computed(
      () => props.activePointIndex === props.index ? " active" : ""
    );
    const pointStyle = computed(() => {
      return { left: `${props.point.left * (props.width / 100) - 6}px` };
    });
    const mouseDownHandler = (event) => {
      props.changeActivePointIndex(props.index);
      const startX = event.pageX;
      const startY = event.pageY;
      const offsetX = startX - props.positions.x;
      props.updateGradientLeft(props.point.left, props.index, "onStartChange");
      return {
        startX,
        startY,
        offsetX
      };
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
      props.updateGradientLeft(left, props.index, "onChange");
      return positions;
    };
    const mouseUpHandler = (event, { startX, offsetX }) => {
      const { positions, left } = changeObjectPositions(event, {
        startX,
        offsetX
      });
      props.updateGradientLeft(left, props.index, "onEndChange");
      return positions;
    };
    onMounted(() => {
      state.mouseEvents = useMouseEvents(
        mouseDownHandler,
        mouseMoveHandler,
        mouseUpHandler
      );
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(`picker-pointer${unref(activeClassName)}`),
        style: normalizeStyle(unref(pointStyle)),
        onMousedown: _cache[0] || (_cache[0] = //@ts-ignore
        (...args) => state.mouseEvents && state.mouseEvents(...args)),
        onDblclick: _cache[1] || (_cache[1] = () => props.removePoint(__props.index)),
        onClick: _cache[2] || (_cache[2] = withModifiers(() => {
        }, ["stop"]))
      }, [
        createElementVNode("span", {
          class: normalizeClass(`child-point${unref(activeClassName)}`)
        }, null, 2)
      ], 38);
    };
  }
}));
const __default__$a = defineComponent({
  name: "GradientPoints"
});
const _sfc_main$a = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$a), {
  props: {
    points: Array,
    activePointIndex: Number,
    changeActivePointIndex: Function,
    updateGradientLeft: Function,
    addPoint: Function,
    removePoint: Function
  },
  setup(__props) {
    const props = __props;
    const pointsContainerRef = ref(null);
    const state = reactive({
      width: 0,
      positions: { x: 0, y: 0 }
    });
    const pointsStyle = computed(() => {
      const style = generateGradientStyle(props.points, "linear", 90);
      return { background: style };
    });
    const pointsContainerClick = (event) => {
      const left = updateGradientActivePercent(
        event.pageX - state.positions.x,
        state.width
      );
      props.addPoint(left);
    };
    onMounted(() => {
      const pointer = pointsContainerRef.value;
      if (pointer) {
        state.width = pointer.clientWidth;
        const pointerPos = pointer.getBoundingClientRect();
        state.positions = { x: pointerPos.x, y: pointerPos.y };
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "gradient",
        style: normalizeStyle(unref(pointsStyle)),
        onClick: pointsContainerClick
      }, [
        createElementVNode("div", {
          ref_key: "pointsContainerRef",
          ref: pointsContainerRef,
          class: "gradient-slider-container"
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(props.points, (point, index2) => {
            return openBlock(), createBlock(_sfc_main$b, {
              key: index2,
              "active-point-index": props.activePointIndex,
              index: index2,
              point,
              width: state.width,
              positions: state.positions,
              "change-active-point-index": props.changeActivePointIndex,
              "update-gradient-left": __props.updateGradientLeft,
              "remove-point": props.removePoint
            }, null, 8, ["active-point-index", "index", "point", "width", "positions", "change-active-point-index", "update-gradient-left", "remove-point"]);
          }), 128))
        ], 512)
      ], 4);
    };
  }
}));
const _hoisted_1$4 = { class: "picker-area" };
const _hoisted_2$4 = { class: "preview" };
const _hoisted_3$1 = { class: "color-hue-alpha" };
const __default__$9 = defineComponent({
  name: "ColorPicker"
});
const _sfc_main$9 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$9), {
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
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$4, [
        createVNode(_sfc_main$f, {
          red: __props.red,
          green: __props.green,
          blue: __props.blue,
          hue: __props.hue,
          saturation: __props.saturation,
          value: __props.value,
          "update-color": __props.updateColor
        }, null, 8, ["red", "green", "blue", "hue", "saturation", "value", "update-color"]),
        __props.isGradient ? (openBlock(), createBlock(_sfc_main$a, {
          key: 0,
          type: __props.type,
          degree: __props.degree,
          points: __props.points,
          "active-point-index": __props.activePointIndex,
          "change-active-point-index": __props.changeActivePointIndex,
          "update-gradient-left": __props.updateGradientLeft,
          "add-point": __props.addPoint,
          "remove-point": __props.removePoint
        }, null, 8, ["type", "degree", "points", "active-point-index", "change-active-point-index", "update-gradient-left", "add-point", "remove-point"])) : createCommentVNode("", true),
        createElementVNode("div", _hoisted_2$4, [
          createVNode(_sfc_main$e, {
            red: __props.red,
            green: __props.green,
            blue: __props.blue,
            alpha: __props.alpha,
            "is-gradient": __props.isGradient,
            points: __props.points,
            "gradient-degree": __props.degree,
            "gradient-type": __props.type
          }, null, 8, ["red", "green", "blue", "alpha", "is-gradient", "points", "gradient-degree", "gradient-type"]),
          createElementVNode("div", _hoisted_3$1, [
            createVNode(_sfc_main$d, {
              hue: __props.hue,
              saturation: __props.saturation,
              value: __props.value,
              "update-color": __props.updateColor
            }, null, 8, ["hue", "saturation", "value", "update-color"]),
            createVNode(_sfc_main$c, {
              alpha: __props.alpha,
              red: __props.red,
              green: __props.green,
              blue: __props.blue,
              "update-color": __props.updateColor
            }, null, 8, ["alpha", "red", "green", "blue", "update-color"])
          ])
        ])
      ]);
    };
  }
}));
const _hoisted_1$3 = { class: "input-container" };
const _hoisted_2$3 = { class: "label" };
const __default__$8 = defineComponent({
  name: "Input"
});
const _sfc_main$8 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$8), {
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
  setup(__props, { emit: emits }) {
    const props = __props;
    const value = computed({
      get: () => props.value,
      set: (val) => emits("update:value", val)
    });
    const onInput = (e) => {
      emits("input", e);
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(`input-field ${props.classes}`)
      }, [
        createElementVNode("div", _hoisted_1$3, [
          withDirectives(createElementVNode("input", {
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(value) ? value.value = $event : null),
            class: normalizeClass(`${props.type}-input input`),
            onFocus: _cache[1] || (_cache[1] = //@ts-ignore
            (...args) => props.onFocus && props.onFocus(...args)),
            onBlur: _cache[2] || (_cache[2] = //@ts-ignore
            (...args) => props.onBlur && props.onBlur(...args)),
            onInput
          }, null, 34), [
            [vModelText, unref(value)]
          ])
        ]),
        createElementVNode("div", _hoisted_2$3, toDisplayString(__props.label), 1)
      ], 2);
    };
  }
}));
const index_vue_vue_type_style_index_0_scoped_986fef99_lang = "";
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const Input = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-986fef99"]]);
const __default__$7 = defineComponent({
  name: "Preview"
});
const _sfc_main$7 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$7), {
  props: {
    red: { default: 0 },
    green: { default: 0 },
    blue: { default: 0 },
    alpha: null,
    updateColor: { type: Function, default: (any) => false }
  },
  setup(__props) {
    const props = __props;
    const state = reactive({
      hexValue: rgbToHex(props.red, props.green, props.blue)
    });
    const hex = computed(() => rgbToHex(props.red, props.green, props.blue));
    const setHex = () => {
      if (hex.value.length === 6) {
        state.hexValue = hex.value;
      }
    };
    const changeHex = (event) => {
      const color = hexToRgb(event.target.value);
      if (color) {
        props.updateColor(color);
      }
    };
    watch(
      () => [props.red, props.green, props.blue],
      () => {
        setHex();
      }
    );
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Input, {
        value: state.hexValue,
        label: "hex",
        classes: "hex",
        onInput: changeHex
      }, null, 8, ["value"]);
    };
  }
}));
const __default__$6 = defineComponent({
  name: "RGBItem"
});
const _sfc_main$6 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$6), {
  props: {
    value: null,
    type: { default: "text" },
    label: { default: "" },
    onChange: { type: Function, default: (val) => false }
  },
  setup(__props) {
    const props = __props;
    const instance = getCurrentInstance();
    const state = reactive({
      inputValue: props.value || 0,
      inProgress: false
    });
    const setValue = () => {
      if (props.value !== +state.inputValue && state.inputValue !== "") {
        state.inputValue = props.value;
      }
    };
    const onChangeHandler = (event) => {
      var _a;
      const value = +event.target.value;
      if (Number.isNaN(value) || value < 0 || value > 255) {
        state.inputValue = props.value;
        (_a = instance == null ? void 0 : instance.proxy) == null ? void 0 : _a.$forceUpdate();
        return;
      }
      state.inputValue = event.target.value;
      props.onChange(value);
    };
    const onBlur = () => {
      if (!state.inputValue) {
        state.inputValue = props.value;
      }
      state.inProgress = false;
    };
    watch(
      () => props.value,
      () => setValue()
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", null, [
        createVNode(Input, {
          value: state.inputValue,
          type: props.type,
          label: props.label,
          "on-focus": () => state.inProgress = true,
          "on-blur": onBlur,
          "in-progress": state.inProgress,
          classes: "rgb",
          onInput: onChangeHandler
        }, null, 8, ["value", "type", "label", "on-focus", "in-progress"])
      ]);
    };
  }
}));
const __default__$5 = defineComponent({
  name: "RGB"
});
const _sfc_main$5 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$5), {
  props: {
    red: { default: 0 },
    green: { default: 0 },
    blue: { default: 0 },
    alpha: { default: 0 },
    updateColor: { type: Function, default: () => false }
  },
  setup(__props) {
    const props = __props;
    const changeValue = (field, value) => {
      if (field === "alpha") {
        props.updateColor({ alpha: value / 100 });
        return;
      }
      const color = rgbToHSv({
        red: props.red,
        green: props.green,
        blue: props.blue,
        [field]: value
      });
      props.updateColor(__spreadProps(__spreadValues({}, color), { [field]: value }));
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_sfc_main$6, {
          value: props.red,
          type: "number",
          label: "R",
          "on-change": (value) => changeValue("red", value)
        }, null, 8, ["value", "on-change"]),
        createVNode(_sfc_main$6, {
          value: props.green,
          type: "number",
          label: "G",
          "on-change": (value) => changeValue("green", value)
        }, null, 8, ["value", "on-change"]),
        createVNode(_sfc_main$6, {
          value: props.blue,
          type: "number",
          label: "B",
          "on-change": (value) => changeValue("blue", value)
        }, null, 8, ["value", "on-change"]),
        createVNode(_sfc_main$6, {
          value: props.alpha * 100,
          type: "number",
          label: "Alpha",
          "on-change": (value) => changeValue("alpha", value)
        }, null, 8, ["value", "on-change"])
      ], 64);
    };
  }
}));
const _hoisted_1$2 = { class: "color-preview-area" };
const _hoisted_2$2 = { class: "input-group" };
const __default__$4 = defineComponent({
  name: "Preview"
});
const _sfc_main$4 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$4), {
  props: {
    red: { default: 0 },
    green: { default: 0 },
    blue: { default: 0 },
    alpha: { default: 0 },
    updateColor: { type: Function, default: (data) => false }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        createElementVNode("div", _hoisted_2$2, [
          createVNode(_sfc_main$7, {
            red: props.red,
            green: props.green,
            blue: props.blue,
            "update-color": props.updateColor
          }, null, 8, ["red", "green", "blue", "update-color"]),
          createVNode(_sfc_main$5, {
            red: props.red,
            green: props.green,
            blue: props.blue,
            alpha: props.alpha,
            "update-color": props.updateColor
          }, null, 8, ["red", "green", "blue", "alpha", "update-color"])
        ])
      ]);
    };
  }
}));
const __default__$3 = defineComponent({
  name: "Solid"
});
const _sfc_main$3 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$3), {
  props: {
    red: { default: 255 },
    green: { default: 0 },
    blue: { default: 0 },
    alpha: { default: 1 },
    hue: { default: 0 },
    saturation: { default: 0 },
    value: { default: 0 }
  },
  setup(__props) {
    const props = __props;
    const provideData = inject("provideData");
    const state = reactive({
      colorRed: props.red,
      colorGreen: props.green,
      colorBlue: props.blue,
      colorAlpha: props.alpha,
      colorHue: 0,
      colorSaturation: 100,
      colorValue: 100
    });
    const actionsMap = {
      onStartChange: provideData.onStartChange,
      onChange: provideData.onChange,
      onEndChange: provideData.onEndChange
    };
    const hsv = computed(() => {
      if (props.hue === void 0 || props.saturation === void 0 || props.value === void 0) {
        return rgbToHSv({
          red: props.red,
          green: props.green,
          blue: props.blue
        });
      }
      return {
        hue: props.hue,
        saturation: props.saturation,
        value: props.value
      };
    });
    const color = computed(() => {
      return {
        red: props.red,
        green: props.green,
        blue: props.blue,
        alpha: props.alpha
      };
    });
    watch(
      () => hsv.value,
      (newVal) => {
        const { hue, saturation, value } = newVal;
        state.colorHue = hue;
        state.colorSaturation = saturation;
        state.colorValue = value;
      }
    );
    watch(
      () => color.value,
      (newVal) => {
        const { red, green, blue, alpha } = newVal;
        state.colorRed = red;
        state.colorGreen = green;
        state.colorBlue = blue;
        state.colorAlpha = alpha;
      }
    );
    const updateColor = ({ red, green, blue, alpha, hue, saturation, value }, actionName = "onChange") => {
      red = getRightValue(red, state.colorRed);
      green = getRightValue(green, state.colorGreen);
      blue = getRightValue(blue, state.colorBlue);
      alpha = getRightValue(alpha, state.colorAlpha);
      hue = getRightValue(hue, state.colorHue);
      saturation = getRightValue(saturation, state.colorSaturation);
      value = getRightValue(value, state.colorValue);
      state.colorRed = red;
      state.colorGreen = green;
      state.colorBlue = blue;
      state.colorAlpha = alpha;
      state.colorHue = hue;
      state.colorSaturation = saturation;
      state.colorValue = value;
      const action = actionsMap[actionName];
      action && action({
        red,
        green,
        blue,
        alpha,
        hue,
        saturation,
        value,
        style: generateSolidStyle(red, green, blue, alpha)
      });
    };
    onMounted(() => {
      const { hue, saturation, value } = rgbToHSv({
        red: state.colorRed,
        green: state.colorGreen,
        blue: state.colorBlue
      });
      state.colorHue = hue;
      state.colorSaturation = saturation;
      state.colorValue = value;
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_sfc_main$9, {
          red: state.colorRed,
          green: state.colorGreen,
          blue: state.colorBlue,
          alpha: state.colorAlpha,
          hue: state.colorHue,
          saturation: state.colorSaturation,
          value: state.colorValue,
          "update-color": updateColor,
          "is-gradient": false
        }, null, 8, ["red", "green", "blue", "alpha", "hue", "saturation", "value"]),
        createVNode(_sfc_main$4, {
          red: state.colorRed,
          green: state.colorGreen,
          blue: state.colorBlue,
          alpha: state.colorAlpha,
          "update-color": updateColor
        }, null, 8, ["red", "green", "blue", "alpha"])
      ], 64);
    };
  }
}));
const _hoisted_1$1 = { class: "gradient-controls" };
const _hoisted_2$1 = { class: "gradient-type" };
const _hoisted_3 = {
  key: 0,
  class: "gradient-degrees-options"
};
const _hoisted_4 = /* @__PURE__ */ createElementVNode("div", { class: "gradient-degree-pointer" }, null, -1);
const _hoisted_5 = [
  _hoisted_4
];
const _hoisted_6 = { class: "gradient-degree-value" };
const __default__$2 = defineComponent({
  name: "GradientControls"
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$2), {
  props: {
    type: String,
    degree: Number,
    changeGradientControl: {
      type: Function,
      default: () => false
    }
  },
  setup(__props) {
    const props = __props;
    const state = reactive({
      disableClick: false,
      mouseEvents: () => false
    });
    const degreesStyle = computed(() => {
      return { transform: `rotate(${props.degree}deg)` };
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
      state.disableClick = true;
      const newDegree = calculateDegree(
        event.clientX,
        event.clientY,
        centerX,
        centerY
      );
      props.changeGradientControl({ degree: ~~newDegree });
    };
    const mouseUpHandler = (event) => {
      const targetClasses = event.target.classList;
      if (targetClasses.contains("gradient-degrees") || targetClasses.contains("icon-rotate")) {
        return;
      }
      state.disableClick = false;
    };
    const onClickGradientDegree = () => {
      if (state.disableClick) {
        state.disableClick = false;
        return;
      }
      let gradientDegree = (props.degree || 0) + 45;
      if (gradientDegree >= 360) {
        gradientDegree = 0;
      }
      props.changeGradientControl({ degree: ~~gradientDegree });
    };
    onMounted(() => {
      state.mouseEvents = useMouseEvents(
        mouseDownHandler,
        mouseMoveHandler,
        mouseUpHandler
      );
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createElementVNode("div", _hoisted_2$1, [
          createElementVNode("div", {
            class: normalizeClass(`gradient-type-item liner-gradient ${props.type === "linear" ? "active" : ""}`),
            onClick: _cache[0] || (_cache[0] = () => props.changeGradientControl({ type: "linear" }))
          }, null, 2),
          createElementVNode("div", {
            class: normalizeClass(`gradient-type-item radial-gradient ${props.type === "radial" ? "active" : ""}`),
            onClick: _cache[1] || (_cache[1] = () => props.changeGradientControl({ type: "radial" }))
          }, null, 2)
        ]),
        props.type === "linear" ? (openBlock(), createElementBlock("div", _hoisted_3, [
          createElementVNode("div", {
            class: "gradient-degrees",
            onMousedown: _cache[2] || (_cache[2] = //@ts-ignore
            (...args) => state.mouseEvents && state.mouseEvents(...args)),
            onClick: onClickGradientDegree
          }, [
            createElementVNode("div", {
              class: "gradient-degree-center",
              style: normalizeStyle(unref(degreesStyle))
            }, _hoisted_5, 4)
          ], 32),
          createElementVNode("div", _hoisted_6, [
            createElementVNode("p", null, toDisplayString(props.degree) + "°", 1)
          ])
        ])) : createCommentVNode("", true)
      ]);
    };
  }
}));
const __default__$1 = defineComponent({
  name: "Gradient"
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$1), {
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
    onStartChange: null,
    onChange: null,
    onEndChange: null
  },
  setup(__props) {
    const props = __props;
    const provideData = inject("provideData");
    const state = reactive({
      activePointIndex: 0,
      gradientPoints: props.points,
      activePoint: props.points[0],
      colorRed: props.points[0].red,
      colorGreen: props.points[0].green,
      colorBlue: props.points[0].blue,
      colorAlpha: props.points[0].alpha,
      colorHue: 0,
      colorSaturation: 100,
      colorValue: 100,
      gradientType: props.type,
      gradientDegree: props.degree
    });
    const actionsMap = {
      onStartChange: provideData.onStartChange,
      onChange: provideData.onChange,
      onEndChange: provideData.onEndChange
    };
    const removePoint = (index2 = state.activePointIndex) => {
      if (state.gradientPoints.length <= 2) {
        return;
      }
      state.gradientPoints.splice(index2, 1);
      if (index2 > 0) {
        state.activePointIndex = index2 - 1;
      }
      props.onChange && props.onChange({
        points: state.gradientPoints,
        type: state.gradientType,
        degree: state.gradientDegree,
        style: generateGradientStyle(
          state.gradientPoints,
          state.gradientType,
          state.gradientDegree
        )
      });
    };
    const keyUpHandler = (event) => {
      if (event.keyCode === 46 || event.keyCode === 8) {
        removePoint(state.activePointIndex);
      }
    };
    const changeActivePointIndex = (index2) => {
      state.activePointIndex = index2;
      state.activePoint = state.gradientPoints[index2];
      const { red, green, blue, alpha } = state.activePoint;
      state.colorRed = red;
      state.colorGreen = green;
      state.colorBlue = blue;
      state.colorAlpha = alpha;
      const { hue, saturation, value } = rgbToHSv({ red, green, blue });
      state.colorHue = hue;
      state.colorSaturation = saturation;
      state.colorValue = value;
    };
    const changeGradientControl = ({ type, degree }) => {
      type = getRightValue(type, state.gradientType);
      degree = getRightValue(degree, state.gradientDegree);
      state.gradientType = type;
      state.gradientDegree = degree;
      props.onChange && props.onChange({
        points: state.gradientPoints,
        type: state.gradientType,
        degree: state.gradientDegree,
        style: generateGradientStyle(
          state.gradientPoints,
          state.gradientType,
          state.gradientDegree
        )
      });
    };
    const updateColor = ({ red, green, blue, alpha, hue, saturation, value }, actionName = "onChange") => {
      red = getRightValue(red, state.colorRed);
      green = getRightValue(green, state.colorGreen);
      blue = getRightValue(blue, state.colorBlue);
      alpha = getRightValue(alpha, state.colorAlpha);
      hue = getRightValue(hue, state.colorHue);
      saturation = getRightValue(saturation, state.colorSaturation);
      value = getRightValue(value, state.colorValue);
      const localGradientPoints = state.gradientPoints.slice();
      localGradientPoints[state.activePointIndex] = __spreadProps(__spreadValues({}, localGradientPoints[state.activePointIndex]), {
        red,
        green,
        blue,
        alpha
      });
      state.colorRed = red;
      state.colorGreen = green;
      state.colorBlue = blue;
      state.colorAlpha = alpha;
      state.colorHue = hue;
      state.colorSaturation = saturation;
      state.colorValue = value;
      state.gradientPoints = localGradientPoints;
      const action = actionsMap[actionName];
      action && action({
        points: localGradientPoints,
        type: state.gradientType,
        degree: state.gradientDegree,
        style: generateGradientStyle(
          localGradientPoints,
          state.gradientType,
          state.gradientDegree
        )
      });
    };
    const updateGradientLeft = (left, index2, actionName = "onChange") => {
      state.gradientPoints[index2].left = left;
      const action = actionsMap[actionName];
      action && action({
        points: state.gradientPoints,
        type: state.gradientType,
        degree: state.gradientDegree,
        style: generateGradientStyle(
          state.gradientPoints,
          state.gradientType,
          state.gradientDegree
        )
      });
    };
    const addPoint = (left) => {
      state.gradientPoints.push(__spreadProps(__spreadValues({}, state.gradientPoints[state.activePointIndex]), {
        left
      }));
      state.activePointIndex = state.gradientPoints.length - 1;
      props.onChange && props.onChange({
        points: state.gradientPoints,
        type: state.gradientType,
        degree: state.gradientDegree,
        style: generateGradientStyle(
          state.gradientPoints,
          state.gradientType,
          state.gradientDegree
        )
      });
    };
    onMounted(() => {
      const { hue, saturation, value } = rgbToHSv({
        red: state.colorRed,
        green: state.colorGreen,
        blue: state.colorBlue
      });
      state.colorHue = hue;
      state.colorSaturation = saturation;
      state.colorValue = value;
      document.addEventListener("keyup", keyUpHandler);
    });
    onBeforeUnmount(() => {
      document.removeEventListener("keyup", keyUpHandler);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_sfc_main$2, {
          type: state.gradientType,
          degree: state.gradientDegree,
          "change-gradient-control": changeGradientControl
        }, null, 8, ["type", "degree"]),
        createVNode(_sfc_main$9, {
          red: state.colorRed,
          green: state.colorGreen,
          blue: state.colorBlue,
          alpha: state.colorAlpha,
          hue: state.colorHue,
          saturation: state.colorSaturation,
          value: state.colorValue,
          "update-color": updateColor,
          "is-gradient": true,
          type: state.gradientType,
          degree: state.gradientDegree,
          points: state.gradientPoints,
          "active-point-index": state.activePointIndex,
          "change-gradient-control": changeGradientControl,
          "change-active-point-index": changeActivePointIndex,
          "update-gradient-left": updateGradientLeft,
          "add-point": addPoint,
          "remove-point": removePoint
        }, null, 8, ["red", "green", "blue", "alpha", "hue", "saturation", "value", "type", "degree", "points", "active-point-index"]),
        createVNode(_sfc_main$4, {
          red: state.colorRed,
          green: state.colorGreen,
          blue: state.colorBlue,
          alpha: state.colorAlpha,
          "update-color": updateColor
        }, null, 8, ["red", "green", "blue", "alpha"])
      ], 64);
    };
  }
}));
const _hoisted_1 = { class: "ui-color-picker" };
const _hoisted_2 = { class: "btns" };
const __default__ = defineComponent({
  name: "ColorPicker"
});
const _sfc_main = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__), {
  props: {
    isGradient: { type: Boolean, default: false },
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
    cancelText: { default: "取消" },
    cancelColor: null,
    cancelBg: null,
    confirmText: { default: "确认" },
    confirmColor: null,
    confirmBg: null
  },
  emits: ["onChange", "onCancel"],
  setup(__props, { emit: emits }) {
    const props = __props;
    const color = ref();
    color.value = props.isGradient ? __spreadValues({}, props.gradient) : __spreadValues({}, props.color);
    provide("provideData", {
      onChange: (attrs) => {
        color.value = __spreadValues({}, attrs);
      },
      onStartChange: (attrs) => {
        color.value = __spreadValues({}, attrs);
      },
      onEndChange: (attrs) => {
        color.value = __spreadValues({}, attrs);
      }
    });
    const handleCancel = () => {
      emits("onCancel");
    };
    const handleConfirm = () => {
      emits("onChange", __spreadValues({}, color.value));
    };
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        props.isGradient ? (openBlock(), createBlock(_sfc_main$1, {
          key: 0,
          points: props.gradient.points,
          type: props.gradient.type,
          degree: props.gradient.degree
        }, null, 8, ["points", "type", "degree"])) : (openBlock(), createBlock(_sfc_main$3, {
          key: 1,
          red: props.color.red,
          green: props.color.green,
          blue: props.color.blue,
          alpha: props.color.alpha,
          hue: props.color.hue,
          saturation: props.color.saturation,
          value: props.color.value
        }, null, 8, ["red", "green", "blue", "alpha", "hue", "saturation", "value"])),
        createElementVNode("div", _hoisted_2, [
          createElementVNode("div", {
            class: "btn",
            style: normalizeStyle({
              color: props.cancelColor,
              backgroundColor: props.cancelBg
            }),
            onClick: handleCancel
          }, toDisplayString(props.cancelText), 5),
          createElementVNode("div", {
            class: "btn",
            style: normalizeStyle({
              color: props.confirmColor,
              backgroundColor: props.confirmBg
            }),
            onClick: handleConfirm
          }, toDisplayString(props.confirmText), 5)
        ])
      ]);
    };
  }
}));
const index = "";
export {
  _sfc_main as default
};
