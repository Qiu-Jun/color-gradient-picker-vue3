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
import { defineComponent, inject, computed, ref, openBlock, createElementBlock, createElementVNode, normalizeClass, unref, normalizeStyle, toDisplayString, createCommentVNode, pushScopeId, popScopeId, Fragment, createVNode } from "vue";
import { u as useMouseEvents, _ as _export_sfc, a as _sfc_main$2, b as _sfc_main$3 } from "./index.vue_vue_type_script_name_Preview_setup_true_lang-22e0d43b.js";
import "./index-4c7f7b15.js";
function calculateDegree(x, y, centerX, centerY) {
  const radians = Math.atan2(x - centerX, y - centerY);
  return radians * (180 / Math.PI) * -1 + 180;
}
const _withScopeId = (n) => (pushScopeId("data-v-4e21238c"), n = n(), popScopeId(), n);
const _hoisted_1 = { class: "gradient-controls border-box flex justify-between items-center w-full mb-8px px-16px" };
const _hoisted_2 = { class: "flex flex-1" };
const _hoisted_3 = {
  key: 0,
  class: "relative mr-24px"
};
const _hoisted_4 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createElementVNode("div", { class: "gradient-degree-pointer" }, null, -1));
const _hoisted_5 = [
  _hoisted_4
];
const _hoisted_6 = { class: "gradient-degree-value flex justify-center items-center" };
const __default__$1 = defineComponent({
  name: "GradientControls"
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__$1), {
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
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createElementVNode("div", _hoisted_2, [
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
const GradientControls = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-4e21238c"]]);
const __default__ = defineComponent({
  name: "Gradient"
});
const _sfc_main = /* @__PURE__ */ defineComponent(__spreadProps(__spreadValues({}, __default__), {
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(GradientControls),
        createVNode(_sfc_main$2),
        createVNode(_sfc_main$3)
      ], 64);
    };
  }
}));
export {
  _sfc_main as default
};
