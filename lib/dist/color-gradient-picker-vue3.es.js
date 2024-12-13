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
import { reactive, ref, computed, unref, h, defineComponent, onMounted, onBeforeUnmount, openBlock, createElementBlock, createElementVNode, normalizeStyle, watchEffect, normalizeClass, createCommentVNode, Fragment, renderList, toDisplayString, withDirectives, isRef, vModelText, createVNode, watch, createBlock } from "vue";
function _typeof(obj) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(obj2) {
    return typeof obj2;
  } : function(obj2) {
    return obj2 && "function" == typeof Symbol && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
  }, _typeof(obj);
}
var trimLeft = /^\s+/;
var trimRight = /\s+$/;
function tinycolor$1(color, opts) {
  color = color ? color : "";
  opts = opts || {};
  if (color instanceof tinycolor$1) {
    return color;
  }
  if (!(this instanceof tinycolor$1)) {
    return new tinycolor$1(color, opts);
  }
  var rgb = inputToRGB(color);
  this._originalInput = color, this._r = rgb.r, this._g = rgb.g, this._b = rgb.b, this._a = rgb.a, this._roundA = Math.round(100 * this._a) / 100, this._format = opts.format || rgb.format;
  this._gradientType = opts.gradientType;
  if (this._r < 1)
    this._r = Math.round(this._r);
  if (this._g < 1)
    this._g = Math.round(this._g);
  if (this._b < 1)
    this._b = Math.round(this._b);
  this._ok = rgb.ok;
}
tinycolor$1.prototype = {
  isDark: function isDark() {
    return this.getBrightness() < 128;
  },
  isLight: function isLight() {
    return !this.isDark();
  },
  isValid: function isValid() {
    return this._ok;
  },
  getOriginalInput: function getOriginalInput() {
    return this._originalInput;
  },
  getFormat: function getFormat() {
    return this._format;
  },
  getAlpha: function getAlpha() {
    return this._a;
  },
  getBrightness: function getBrightness() {
    var rgb = this.toRgb();
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
  },
  getLuminance: function getLuminance() {
    var rgb = this.toRgb();
    var RsRGB, GsRGB, BsRGB, R, G, B;
    RsRGB = rgb.r / 255;
    GsRGB = rgb.g / 255;
    BsRGB = rgb.b / 255;
    if (RsRGB <= 0.03928)
      R = RsRGB / 12.92;
    else
      R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
    if (GsRGB <= 0.03928)
      G = GsRGB / 12.92;
    else
      G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
    if (BsRGB <= 0.03928)
      B = BsRGB / 12.92;
    else
      B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  },
  setAlpha: function setAlpha(value) {
    this._a = boundAlpha(value);
    this._roundA = Math.round(100 * this._a) / 100;
    return this;
  },
  toHsv: function toHsv() {
    var hsv = rgbToHsv(this._r, this._g, this._b);
    return {
      h: hsv.h * 360,
      s: hsv.s,
      v: hsv.v,
      a: this._a
    };
  },
  toHsvString: function toHsvString() {
    var hsv = rgbToHsv(this._r, this._g, this._b);
    var h2 = Math.round(hsv.h * 360), s = Math.round(hsv.s * 100), v = Math.round(hsv.v * 100);
    return this._a == 1 ? "hsv(" + h2 + ", " + s + "%, " + v + "%)" : "hsva(" + h2 + ", " + s + "%, " + v + "%, " + this._roundA + ")";
  },
  toHsl: function toHsl() {
    var hsl = rgbToHsl(this._r, this._g, this._b);
    return {
      h: hsl.h * 360,
      s: hsl.s,
      l: hsl.l,
      a: this._a
    };
  },
  toHslString: function toHslString() {
    var hsl = rgbToHsl(this._r, this._g, this._b);
    var h2 = Math.round(hsl.h * 360), s = Math.round(hsl.s * 100), l = Math.round(hsl.l * 100);
    return this._a == 1 ? "hsl(" + h2 + ", " + s + "%, " + l + "%)" : "hsla(" + h2 + ", " + s + "%, " + l + "%, " + this._roundA + ")";
  },
  toHex: function toHex(allow3Char) {
    return rgbToHex(this._r, this._g, this._b, allow3Char);
  },
  toHexString: function toHexString(allow3Char) {
    return "#" + this.toHex(allow3Char);
  },
  toHex8: function toHex8(allow4Char) {
    return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
  },
  toHex8String: function toHex8String(allow4Char) {
    return "#" + this.toHex8(allow4Char);
  },
  toRgb: function toRgb() {
    return {
      r: Math.round(this._r),
      g: Math.round(this._g),
      b: Math.round(this._b),
      a: this._a
    };
  },
  toRgbString: function toRgbString() {
    return this._a == 1 ? "rgb(" + Math.round(this._r) + ", " + Math.round(this._g) + ", " + Math.round(this._b) + ")" : "rgba(" + Math.round(this._r) + ", " + Math.round(this._g) + ", " + Math.round(this._b) + ", " + this._roundA + ")";
  },
  toPercentageRgb: function toPercentageRgb() {
    return {
      r: Math.round(bound01(this._r, 255) * 100) + "%",
      g: Math.round(bound01(this._g, 255) * 100) + "%",
      b: Math.round(bound01(this._b, 255) * 100) + "%",
      a: this._a
    };
  },
  toPercentageRgbString: function toPercentageRgbString() {
    return this._a == 1 ? "rgb(" + Math.round(bound01(this._r, 255) * 100) + "%, " + Math.round(bound01(this._g, 255) * 100) + "%, " + Math.round(bound01(this._b, 255) * 100) + "%)" : "rgba(" + Math.round(bound01(this._r, 255) * 100) + "%, " + Math.round(bound01(this._g, 255) * 100) + "%, " + Math.round(bound01(this._b, 255) * 100) + "%, " + this._roundA + ")";
  },
  toName: function toName() {
    if (this._a === 0) {
      return "transparent";
    }
    if (this._a < 1) {
      return false;
    }
    return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
  },
  toFilter: function toFilter(secondColor) {
    var hex8String = "#" + rgbaToArgbHex(this._r, this._g, this._b, this._a);
    var secondHex8String = hex8String;
    var gradientType2 = this._gradientType ? "GradientType = 1, " : "";
    if (secondColor) {
      var s = tinycolor$1(secondColor);
      secondHex8String = "#" + rgbaToArgbHex(s._r, s._g, s._b, s._a);
    }
    return "progid:DXImageTransform.Microsoft.gradient(" + gradientType2 + "startColorstr=" + hex8String + ",endColorstr=" + secondHex8String + ")";
  },
  toString: function toString(format) {
    var formatSet = !!format;
    format = format || this._format;
    var formattedString = false;
    var hasAlpha = this._a < 1 && this._a >= 0;
    var needsAlphaFormat = !formatSet && hasAlpha && (format === "hex" || format === "hex6" || format === "hex3" || format === "hex4" || format === "hex8" || format === "name");
    if (needsAlphaFormat) {
      if (format === "name" && this._a === 0) {
        return this.toName();
      }
      return this.toRgbString();
    }
    if (format === "rgb") {
      formattedString = this.toRgbString();
    }
    if (format === "prgb") {
      formattedString = this.toPercentageRgbString();
    }
    if (format === "hex" || format === "hex6") {
      formattedString = this.toHexString();
    }
    if (format === "hex3") {
      formattedString = this.toHexString(true);
    }
    if (format === "hex4") {
      formattedString = this.toHex8String(true);
    }
    if (format === "hex8") {
      formattedString = this.toHex8String();
    }
    if (format === "name") {
      formattedString = this.toName();
    }
    if (format === "hsl") {
      formattedString = this.toHslString();
    }
    if (format === "hsv") {
      formattedString = this.toHsvString();
    }
    return formattedString || this.toHexString();
  },
  clone: function clone() {
    return tinycolor$1(this.toString());
  },
  _applyModification: function _applyModification(fn, args) {
    var color = fn.apply(null, [this].concat([].slice.call(args)));
    this._r = color._r;
    this._g = color._g;
    this._b = color._b;
    this.setAlpha(color._a);
    return this;
  },
  lighten: function lighten() {
    return this._applyModification(_lighten, arguments);
  },
  brighten: function brighten() {
    return this._applyModification(_brighten, arguments);
  },
  darken: function darken() {
    return this._applyModification(_darken, arguments);
  },
  desaturate: function desaturate() {
    return this._applyModification(_desaturate, arguments);
  },
  saturate: function saturate() {
    return this._applyModification(_saturate, arguments);
  },
  greyscale: function greyscale() {
    return this._applyModification(_greyscale, arguments);
  },
  spin: function spin() {
    return this._applyModification(_spin, arguments);
  },
  _applyCombination: function _applyCombination(fn, args) {
    return fn.apply(null, [this].concat([].slice.call(args)));
  },
  analogous: function analogous() {
    return this._applyCombination(_analogous, arguments);
  },
  complement: function complement() {
    return this._applyCombination(_complement, arguments);
  },
  monochromatic: function monochromatic() {
    return this._applyCombination(_monochromatic, arguments);
  },
  splitcomplement: function splitcomplement() {
    return this._applyCombination(_splitcomplement, arguments);
  },
  // Disabled until https://github.com/bgrins/TinyColor/issues/254
  // polyad: function (number) {
  //   return this._applyCombination(polyad, [number]);
  // },
  triad: function triad() {
    return this._applyCombination(polyad, [3]);
  },
  tetrad: function tetrad() {
    return this._applyCombination(polyad, [4]);
  }
};
tinycolor$1.fromRatio = function(color, opts) {
  if (_typeof(color) == "object") {
    var newColor = {};
    for (var i in color) {
      if (color.hasOwnProperty(i)) {
        if (i === "a") {
          newColor[i] = color[i];
        } else {
          newColor[i] = convertToPercentage(color[i]);
        }
      }
    }
    color = newColor;
  }
  return tinycolor$1(color, opts);
};
function inputToRGB(color) {
  var rgb = {
    r: 0,
    g: 0,
    b: 0
  };
  var a = 1;
  var s = null;
  var v = null;
  var l = null;
  var ok = false;
  var format = false;
  if (typeof color == "string") {
    color = stringInputToObject(color);
  }
  if (_typeof(color) == "object") {
    if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
      rgb = rgbToRgb(color.r, color.g, color.b);
      ok = true;
      format = String(color.r).substr(-1) === "%" ? "prgb" : "rgb";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
      s = convertToPercentage(color.s);
      v = convertToPercentage(color.v);
      rgb = hsvToRgb(color.h, s, v);
      ok = true;
      format = "hsv";
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
      s = convertToPercentage(color.s);
      l = convertToPercentage(color.l);
      rgb = hslToRgb(color.h, s, l);
      ok = true;
      format = "hsl";
    }
    if (color.hasOwnProperty("a")) {
      a = color.a;
    }
  }
  a = boundAlpha(a);
  return {
    ok,
    format: color.format || format,
    r: Math.min(255, Math.max(rgb.r, 0)),
    g: Math.min(255, Math.max(rgb.g, 0)),
    b: Math.min(255, Math.max(rgb.b, 0)),
    a
  };
}
function rgbToRgb(r, g, b) {
  return {
    r: bound01(r, 255) * 255,
    g: bound01(g, 255) * 255,
    b: bound01(b, 255) * 255
  };
}
function rgbToHsl(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h2, s, l = (max + min) / 2;
  if (max == min) {
    h2 = s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h2 = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h2 = (b - r) / d + 2;
        break;
      case b:
        h2 = (r - g) / d + 4;
        break;
    }
    h2 /= 6;
  }
  return {
    h: h2,
    s,
    l
  };
}
function hslToRgb(h2, s, l) {
  var r, g, b;
  h2 = bound01(h2, 360);
  s = bound01(s, 100);
  l = bound01(l, 100);
  function hue2rgb(p2, q2, t) {
    if (t < 0)
      t += 1;
    if (t > 1)
      t -= 1;
    if (t < 1 / 6)
      return p2 + (q2 - p2) * 6 * t;
    if (t < 1 / 2)
      return q2;
    if (t < 2 / 3)
      return p2 + (q2 - p2) * (2 / 3 - t) * 6;
    return p2;
  }
  if (s === 0) {
    r = g = b = l;
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h2 + 1 / 3);
    g = hue2rgb(p, q, h2);
    b = hue2rgb(p, q, h2 - 1 / 3);
  }
  return {
    r: r * 255,
    g: g * 255,
    b: b * 255
  };
}
function rgbToHsv(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h2, s, v = max;
  var d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max == min) {
    h2 = 0;
  } else {
    switch (max) {
      case r:
        h2 = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h2 = (b - r) / d + 2;
        break;
      case b:
        h2 = (r - g) / d + 4;
        break;
    }
    h2 /= 6;
  }
  return {
    h: h2,
    s,
    v
  };
}
function hsvToRgb(h2, s, v) {
  h2 = bound01(h2, 360) * 6;
  s = bound01(s, 100);
  v = bound01(v, 100);
  var i = Math.floor(h2), f = h2 - i, p = v * (1 - s), q = v * (1 - f * s), t = v * (1 - (1 - f) * s), mod = i % 6, r = [v, q, p, p, t, v][mod], g = [t, v, v, q, p, p][mod], b = [p, p, t, v, v, q][mod];
  return {
    r: r * 255,
    g: g * 255,
    b: b * 255
  };
}
function rgbToHex(r, g, b, allow3Char) {
  var hex = [pad2(Math.round(r).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16))];
  if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
  }
  return hex.join("");
}
function rgbaToHex(r, g, b, a, allow4Char) {
  var hex = [pad2(Math.round(r).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16)), pad2(convertDecimalToHex(a))];
  if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
  }
  return hex.join("");
}
function rgbaToArgbHex(r, g, b, a) {
  var hex = [pad2(convertDecimalToHex(a)), pad2(Math.round(r).toString(16)), pad2(Math.round(g).toString(16)), pad2(Math.round(b).toString(16))];
  return hex.join("");
}
tinycolor$1.equals = function(color1, color2) {
  if (!color1 || !color2)
    return false;
  return tinycolor$1(color1).toRgbString() == tinycolor$1(color2).toRgbString();
};
tinycolor$1.random = function() {
  return tinycolor$1.fromRatio({
    r: Math.random(),
    g: Math.random(),
    b: Math.random()
  });
};
function _desaturate(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor$1(color).toHsl();
  hsl.s -= amount / 100;
  hsl.s = clamp01(hsl.s);
  return tinycolor$1(hsl);
}
function _saturate(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor$1(color).toHsl();
  hsl.s += amount / 100;
  hsl.s = clamp01(hsl.s);
  return tinycolor$1(hsl);
}
function _greyscale(color) {
  return tinycolor$1(color).desaturate(100);
}
function _lighten(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor$1(color).toHsl();
  hsl.l += amount / 100;
  hsl.l = clamp01(hsl.l);
  return tinycolor$1(hsl);
}
function _brighten(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var rgb = tinycolor$1(color).toRgb();
  rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
  rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
  rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
  return tinycolor$1(rgb);
}
function _darken(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor$1(color).toHsl();
  hsl.l -= amount / 100;
  hsl.l = clamp01(hsl.l);
  return tinycolor$1(hsl);
}
function _spin(color, amount) {
  var hsl = tinycolor$1(color).toHsl();
  var hue = (hsl.h + amount) % 360;
  hsl.h = hue < 0 ? 360 + hue : hue;
  return tinycolor$1(hsl);
}
function _complement(color) {
  var hsl = tinycolor$1(color).toHsl();
  hsl.h = (hsl.h + 180) % 360;
  return tinycolor$1(hsl);
}
function polyad(color, number) {
  if (isNaN(number) || number <= 0) {
    throw new Error("Argument to polyad must be a positive number");
  }
  var hsl = tinycolor$1(color).toHsl();
  var result = [tinycolor$1(color)];
  var step = 360 / number;
  for (var i = 1; i < number; i++) {
    result.push(tinycolor$1({
      h: (hsl.h + i * step) % 360,
      s: hsl.s,
      l: hsl.l
    }));
  }
  return result;
}
function _splitcomplement(color) {
  var hsl = tinycolor$1(color).toHsl();
  var h2 = hsl.h;
  return [tinycolor$1(color), tinycolor$1({
    h: (h2 + 72) % 360,
    s: hsl.s,
    l: hsl.l
  }), tinycolor$1({
    h: (h2 + 216) % 360,
    s: hsl.s,
    l: hsl.l
  })];
}
function _analogous(color, results, slices) {
  results = results || 6;
  slices = slices || 30;
  var hsl = tinycolor$1(color).toHsl();
  var part = 360 / slices;
  var ret = [tinycolor$1(color)];
  for (hsl.h = (hsl.h - (part * results >> 1) + 720) % 360; --results; ) {
    hsl.h = (hsl.h + part) % 360;
    ret.push(tinycolor$1(hsl));
  }
  return ret;
}
function _monochromatic(color, results) {
  results = results || 6;
  var hsv = tinycolor$1(color).toHsv();
  var h2 = hsv.h, s = hsv.s, v = hsv.v;
  var ret = [];
  var modification = 1 / results;
  while (results--) {
    ret.push(tinycolor$1({
      h: h2,
      s,
      v
    }));
    v = (v + modification) % 1;
  }
  return ret;
}
tinycolor$1.mix = function(color1, color2, amount) {
  amount = amount === 0 ? 0 : amount || 50;
  var rgb1 = tinycolor$1(color1).toRgb();
  var rgb2 = tinycolor$1(color2).toRgb();
  var p = amount / 100;
  var rgba = {
    r: (rgb2.r - rgb1.r) * p + rgb1.r,
    g: (rgb2.g - rgb1.g) * p + rgb1.g,
    b: (rgb2.b - rgb1.b) * p + rgb1.b,
    a: (rgb2.a - rgb1.a) * p + rgb1.a
  };
  return tinycolor$1(rgba);
};
tinycolor$1.readability = function(color1, color2) {
  var c1 = tinycolor$1(color1);
  var c2 = tinycolor$1(color2);
  return (Math.max(c1.getLuminance(), c2.getLuminance()) + 0.05) / (Math.min(c1.getLuminance(), c2.getLuminance()) + 0.05);
};
tinycolor$1.isReadable = function(color1, color2, wcag2) {
  var readability = tinycolor$1.readability(color1, color2);
  var wcag2Parms, out;
  out = false;
  wcag2Parms = validateWCAG2Parms(wcag2);
  switch (wcag2Parms.level + wcag2Parms.size) {
    case "AAsmall":
    case "AAAlarge":
      out = readability >= 4.5;
      break;
    case "AAlarge":
      out = readability >= 3;
      break;
    case "AAAsmall":
      out = readability >= 7;
      break;
  }
  return out;
};
tinycolor$1.mostReadable = function(baseColor, colorList, args) {
  var bestColor = null;
  var bestScore = 0;
  var readability;
  var includeFallbackColors, level, size;
  args = args || {};
  includeFallbackColors = args.includeFallbackColors;
  level = args.level;
  size = args.size;
  for (var i = 0; i < colorList.length; i++) {
    readability = tinycolor$1.readability(baseColor, colorList[i]);
    if (readability > bestScore) {
      bestScore = readability;
      bestColor = tinycolor$1(colorList[i]);
    }
  }
  if (tinycolor$1.isReadable(baseColor, bestColor, {
    level,
    size
  }) || !includeFallbackColors) {
    return bestColor;
  } else {
    args.includeFallbackColors = false;
    return tinycolor$1.mostReadable(baseColor, ["#fff", "#000"], args);
  }
};
var names = tinycolor$1.names = {
  aliceblue: "f0f8ff",
  antiquewhite: "faebd7",
  aqua: "0ff",
  aquamarine: "7fffd4",
  azure: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "000",
  blanchedalmond: "ffebcd",
  blue: "00f",
  blueviolet: "8a2be2",
  brown: "a52a2a",
  burlywood: "deb887",
  burntsienna: "ea7e5d",
  cadetblue: "5f9ea0",
  chartreuse: "7fff00",
  chocolate: "d2691e",
  coral: "ff7f50",
  cornflowerblue: "6495ed",
  cornsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "0ff",
  darkblue: "00008b",
  darkcyan: "008b8b",
  darkgoldenrod: "b8860b",
  darkgray: "a9a9a9",
  darkgreen: "006400",
  darkgrey: "a9a9a9",
  darkkhaki: "bdb76b",
  darkmagenta: "8b008b",
  darkolivegreen: "556b2f",
  darkorange: "ff8c00",
  darkorchid: "9932cc",
  darkred: "8b0000",
  darksalmon: "e9967a",
  darkseagreen: "8fbc8f",
  darkslateblue: "483d8b",
  darkslategray: "2f4f4f",
  darkslategrey: "2f4f4f",
  darkturquoise: "00ced1",
  darkviolet: "9400d3",
  deeppink: "ff1493",
  deepskyblue: "00bfff",
  dimgray: "696969",
  dimgrey: "696969",
  dodgerblue: "1e90ff",
  firebrick: "b22222",
  floralwhite: "fffaf0",
  forestgreen: "228b22",
  fuchsia: "f0f",
  gainsboro: "dcdcdc",
  ghostwhite: "f8f8ff",
  gold: "ffd700",
  goldenrod: "daa520",
  gray: "808080",
  green: "008000",
  greenyellow: "adff2f",
  grey: "808080",
  honeydew: "f0fff0",
  hotpink: "ff69b4",
  indianred: "cd5c5c",
  indigo: "4b0082",
  ivory: "fffff0",
  khaki: "f0e68c",
  lavender: "e6e6fa",
  lavenderblush: "fff0f5",
  lawngreen: "7cfc00",
  lemonchiffon: "fffacd",
  lightblue: "add8e6",
  lightcoral: "f08080",
  lightcyan: "e0ffff",
  lightgoldenrodyellow: "fafad2",
  lightgray: "d3d3d3",
  lightgreen: "90ee90",
  lightgrey: "d3d3d3",
  lightpink: "ffb6c1",
  lightsalmon: "ffa07a",
  lightseagreen: "20b2aa",
  lightskyblue: "87cefa",
  lightslategray: "789",
  lightslategrey: "789",
  lightsteelblue: "b0c4de",
  lightyellow: "ffffe0",
  lime: "0f0",
  limegreen: "32cd32",
  linen: "faf0e6",
  magenta: "f0f",
  maroon: "800000",
  mediumaquamarine: "66cdaa",
  mediumblue: "0000cd",
  mediumorchid: "ba55d3",
  mediumpurple: "9370db",
  mediumseagreen: "3cb371",
  mediumslateblue: "7b68ee",
  mediumspringgreen: "00fa9a",
  mediumturquoise: "48d1cc",
  mediumvioletred: "c71585",
  midnightblue: "191970",
  mintcream: "f5fffa",
  mistyrose: "ffe4e1",
  moccasin: "ffe4b5",
  navajowhite: "ffdead",
  navy: "000080",
  oldlace: "fdf5e6",
  olive: "808000",
  olivedrab: "6b8e23",
  orange: "ffa500",
  orangered: "ff4500",
  orchid: "da70d6",
  palegoldenrod: "eee8aa",
  palegreen: "98fb98",
  paleturquoise: "afeeee",
  palevioletred: "db7093",
  papayawhip: "ffefd5",
  peachpuff: "ffdab9",
  peru: "cd853f",
  pink: "ffc0cb",
  plum: "dda0dd",
  powderblue: "b0e0e6",
  purple: "800080",
  rebeccapurple: "663399",
  red: "f00",
  rosybrown: "bc8f8f",
  royalblue: "4169e1",
  saddlebrown: "8b4513",
  salmon: "fa8072",
  sandybrown: "f4a460",
  seagreen: "2e8b57",
  seashell: "fff5ee",
  sienna: "a0522d",
  silver: "c0c0c0",
  skyblue: "87ceeb",
  slateblue: "6a5acd",
  slategray: "708090",
  slategrey: "708090",
  snow: "fffafa",
  springgreen: "00ff7f",
  steelblue: "4682b4",
  tan: "d2b48c",
  teal: "008080",
  thistle: "d8bfd8",
  tomato: "ff6347",
  turquoise: "40e0d0",
  violet: "ee82ee",
  wheat: "f5deb3",
  white: "fff",
  whitesmoke: "f5f5f5",
  yellow: "ff0",
  yellowgreen: "9acd32"
};
var hexNames = tinycolor$1.hexNames = flip(names);
function flip(o) {
  var flipped = {};
  for (var i in o) {
    if (o.hasOwnProperty(i)) {
      flipped[o[i]] = i;
    }
  }
  return flipped;
}
function boundAlpha(a) {
  a = parseFloat(a);
  if (isNaN(a) || a < 0 || a > 1) {
    a = 1;
  }
  return a;
}
function bound01(n, max) {
  if (isOnePointZero(n))
    n = "100%";
  var processPercent = isPercentage(n);
  n = Math.min(max, Math.max(0, parseFloat(n)));
  if (processPercent) {
    n = parseInt(n * max, 10) / 100;
  }
  if (Math.abs(n - max) < 1e-6) {
    return 1;
  }
  return n % max / parseFloat(max);
}
function clamp01(val) {
  return Math.min(1, Math.max(0, val));
}
function parseIntFromHex(val) {
  return parseInt(val, 16);
}
function isOnePointZero(n) {
  return typeof n == "string" && n.indexOf(".") != -1 && parseFloat(n) === 1;
}
function isPercentage(n) {
  return typeof n === "string" && n.indexOf("%") != -1;
}
function pad2(c) {
  return c.length == 1 ? "0" + c : "" + c;
}
function convertToPercentage(n) {
  if (n <= 1) {
    n = n * 100 + "%";
  }
  return n;
}
function convertDecimalToHex(d) {
  return Math.round(parseFloat(d) * 255).toString(16);
}
function convertHexToDecimal(h2) {
  return parseIntFromHex(h2) / 255;
}
var matchers = function() {
  var CSS_INTEGER = "[-\\+]?\\d+%?";
  var CSS_NUMBER = "[-\\+]?\\d*\\.\\d+%?";
  var CSS_UNIT = "(?:" + CSS_NUMBER + ")|(?:" + CSS_INTEGER + ")";
  var PERMISSIVE_MATCH3 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
  var PERMISSIVE_MATCH4 = "[\\s|\\(]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")[,|\\s]+(" + CSS_UNIT + ")\\s*\\)?";
  return {
    CSS_UNIT: new RegExp(CSS_UNIT),
    rgb: new RegExp("rgb" + PERMISSIVE_MATCH3),
    rgba: new RegExp("rgba" + PERMISSIVE_MATCH4),
    hsl: new RegExp("hsl" + PERMISSIVE_MATCH3),
    hsla: new RegExp("hsla" + PERMISSIVE_MATCH4),
    hsv: new RegExp("hsv" + PERMISSIVE_MATCH3),
    hsva: new RegExp("hsva" + PERMISSIVE_MATCH4),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
  };
}();
function isValidCSSUnit(color) {
  return !!matchers.CSS_UNIT.exec(color);
}
function stringInputToObject(color) {
  color = color.replace(trimLeft, "").replace(trimRight, "").toLowerCase();
  var named = false;
  if (names[color]) {
    color = names[color];
    named = true;
  } else if (color == "transparent") {
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
      format: "name"
    };
  }
  var match;
  if (match = matchers.rgb.exec(color)) {
    return {
      r: match[1],
      g: match[2],
      b: match[3]
    };
  }
  if (match = matchers.rgba.exec(color)) {
    return {
      r: match[1],
      g: match[2],
      b: match[3],
      a: match[4]
    };
  }
  if (match = matchers.hsl.exec(color)) {
    return {
      h: match[1],
      s: match[2],
      l: match[3]
    };
  }
  if (match = matchers.hsla.exec(color)) {
    return {
      h: match[1],
      s: match[2],
      l: match[3],
      a: match[4]
    };
  }
  if (match = matchers.hsv.exec(color)) {
    return {
      h: match[1],
      s: match[2],
      v: match[3]
    };
  }
  if (match = matchers.hsva.exec(color)) {
    return {
      h: match[1],
      s: match[2],
      v: match[3],
      a: match[4]
    };
  }
  if (match = matchers.hex8.exec(color)) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      a: convertHexToDecimal(match[4]),
      format: named ? "name" : "hex8"
    };
  }
  if (match = matchers.hex6.exec(color)) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      format: named ? "name" : "hex"
    };
  }
  if (match = matchers.hex4.exec(color)) {
    return {
      r: parseIntFromHex(match[1] + "" + match[1]),
      g: parseIntFromHex(match[2] + "" + match[2]),
      b: parseIntFromHex(match[3] + "" + match[3]),
      a: convertHexToDecimal(match[4] + "" + match[4]),
      format: named ? "name" : "hex8"
    };
  }
  if (match = matchers.hex3.exec(color)) {
    return {
      r: parseIntFromHex(match[1] + "" + match[1]),
      g: parseIntFromHex(match[2] + "" + match[2]),
      b: parseIntFromHex(match[3] + "" + match[3]),
      format: named ? "name" : "hex"
    };
  }
  return false;
}
function validateWCAG2Parms(parms) {
  var level, size;
  parms = parms || {
    level: "AA",
    size: "small"
  };
  level = (parms.level || "AA").toUpperCase();
  size = (parms.size || "small").toLowerCase();
  if (level !== "AA" && level !== "AAA") {
    level = "AA";
  }
  if (size !== "small" && size !== "large") {
    size = "small";
  }
  return {
    level,
    size
  };
}
const gradientParser = (input = "") => {
  const tokens = {
    linearGradient: /^(-(webkit|o|ms|moz)-)?(linear-gradient)/i,
    repeatingLinearGradient: /^(-(webkit|o|ms|moz)-)?(repeating-linear-gradient)/i,
    radialGradient: /^(-(webkit|o|ms|moz)-)?(radial-gradient)/i,
    repeatingRadialGradient: /^(-(webkit|o|ms|moz)-)?(repeating-radial-gradient)/i,
    sideOrCorner: /^to (left (top|bottom)|right (top|bottom)|top (left|right)|bottom (left|right)|left|right|top|bottom)/i,
    extentKeywords: /^(closest-side|closest-corner|farthest-side|farthest-corner|contain|cover)/,
    positionKeywords: /^(left|center|right|top|bottom)/i,
    pixelValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))px/,
    percentageValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))%/,
    emValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))em/,
    angleValue: /^(-?(([0-9]*\.[0-9]+)|([0-9]+\.?)))deg/,
    startCall: /^\(/,
    endCall: /^\)/,
    comma: /^,/,
    hexColor: /^#([0-9a-fA-F]+)/,
    literalColor: /^([a-zA-Z]+)/,
    rgbColor: /^rgb/i,
    spacedRgbColor: /^(\d{1,3})\s+(\d{1,3})\s+(\d{1,3})\s+\/\s+([0-1](\.\d+)?)/,
    rgbaColor: /^rgba/i,
    hslColor: /^hsl/i,
    hsvColor: /^hsv/i,
    number: /^(([0-9]*\.[0-9]+)|([0-9]+\.?))/
  };
  function error(msg) {
    const err = new Error(input + ": " + msg);
    throw err;
  }
  function consume(size) {
    input = input.substr(size);
  }
  function scan(regexp) {
    const blankCaptures = /^[\n\r\t\s]+/.exec(input);
    if (blankCaptures) {
      consume(blankCaptures[0].length);
    }
    const captures = regexp.exec(input);
    if (captures) {
      consume(captures[0].length);
    }
    return captures;
  }
  function matchListing(matcher) {
    let captures = matcher();
    const result = [];
    if (captures) {
      result.push(captures);
      while (scan(tokens.comma)) {
        captures = matcher();
        if (captures) {
          result.push(captures);
        } else {
          error("One extra comma");
        }
      }
    }
    return result;
  }
  function match(type, pattern, captureIndex) {
    const captures = scan(pattern);
    if (captures) {
      return {
        type,
        value: captures[captureIndex]
      };
    }
  }
  function matchHexColor() {
    const hexObj = match("hex", tokens.hexColor, 1);
    if (hexObj == null ? void 0 : hexObj.value) {
      const { r, g, b, a } = tinycolor$1(hexObj == null ? void 0 : hexObj.value).toRgb();
      return {
        value: `rgba(${r}, ${g}, ${b}, ${a})`
      };
    }
  }
  const checkCaps = (val) => {
    const capIt = isUpperCase(val == null ? void 0 : val[0]);
    return {
      value: `${capIt ? "RGBA" : "rgba"}(${matchListing(matchNumber)})`
    };
  };
  function matchCall(pattern, callback) {
    const captures = scan(pattern);
    if (captures) {
      if (!scan(tokens.startCall)) {
        error("Missing (");
      }
      const result = callback(captures);
      if (!scan(tokens.endCall)) {
        error("Missing )");
      }
      return result;
    }
  }
  function matchHSLColor() {
    return matchCall(tokens.hslColor, convertHsl);
  }
  function matchRGBAColor() {
    return matchCall(tokens.rgbaColor, checkCaps);
  }
  function matchRGBColor() {
    return matchCall(tokens.rgbColor, convertRgb);
  }
  function matchLiteralColor() {
    const litObj = match("literal", tokens.literalColor, 0);
    if (litObj == null ? void 0 : litObj.value) {
      const { r, g, b, a } = tinycolor$1(litObj == null ? void 0 : litObj.value).toRgb();
      return {
        value: `rgba(${r}, ${g}, ${b}, ${a})`
      };
    }
  }
  function matchHSVColor() {
    return matchCall(tokens.hsvColor, convertHsv);
  }
  function matchColor() {
    return matchHexColor() || matchHSLColor() || matchRGBAColor() || matchRGBColor() || matchLiteralColor() || matchHSVColor();
  }
  function matchColorStop() {
    var _a;
    const color = matchColor();
    if (!color) {
      error("Expected color definition");
    }
    color.left = parseInt((_a = matchDistance()) == null ? void 0 : _a.value);
    return color;
  }
  function matchGradient(gradientType2, pattern, orientationMatcher) {
    return matchCall(pattern, function() {
      const orientation = orientationMatcher();
      if (orientation) {
        if (!scan(tokens.comma)) {
          error("Missing comma before color stops");
        }
      }
      return {
        type: gradientType2,
        orientation,
        colorStops: matchListing(matchColorStop)
      };
    });
  }
  function matchLinearOrientation() {
    return matchSideOrCorner() || matchAngle();
  }
  function matchDefinition() {
    return matchGradient(
      "linear-gradient",
      tokens.linearGradient,
      matchLinearOrientation
    ) || matchGradient(
      "repeating-linear-gradient",
      tokens.repeatingLinearGradient,
      matchLinearOrientation
    ) || matchGradient(
      "radial-gradient",
      tokens.radialGradient,
      matchListRadialOrientations
    ) || matchGradient(
      "repeating-radial-gradient",
      tokens.repeatingRadialGradient,
      matchListRadialOrientations
    );
  }
  function matchListDefinitions() {
    return matchListing(matchDefinition);
  }
  function getAST() {
    var _a;
    const ast = matchListDefinitions();
    if (input.length > 0) {
      error("Invalid input not EOF");
    }
    const ast0 = ast[0];
    const checkSelected = (_a = ast0 == null ? void 0 : ast0.colorStops) == null ? void 0 : _a.filter(
      (c) => isUpperCase(c.value)
    ).length;
    const getGradientObj = () => {
      if (checkSelected > 0) {
        return ast0;
      } else {
        const val = (c, i) => i === 0 ? high(c) : low(c);
        return __spreadProps(__spreadValues({}, ast0), {
          colorStops: ast0.colorStops.map((c, i) => __spreadProps(__spreadValues({}, c), {
            value: val(c, i)
          }))
        });
      }
    };
    return getGradientObj();
  }
  function matchSideOrCorner() {
    return match("directional", tokens.sideOrCorner, 1);
  }
  function matchAngle() {
    return match("angular", tokens.angleValue, 1);
  }
  function matchListRadialOrientations() {
    let radialOrientations, radialOrientation = matchRadialOrientation(), lookaheadCache;
    if (radialOrientation) {
      radialOrientations = [];
      radialOrientations.push(radialOrientation);
      lookaheadCache = input;
      if (scan(tokens.comma)) {
        radialOrientation = matchRadialOrientation();
        if (radialOrientation) {
          radialOrientations.push(radialOrientation);
        } else {
          input = lookaheadCache;
        }
      }
    }
    return radialOrientations;
  }
  function matchRadialOrientation() {
    let radialType = matchCircle() || matchEllipse();
    if (radialType) {
      radialType.at = matchAtPosition();
    } else {
      const extent = matchExtentKeyword();
      if (extent) {
        radialType = extent;
        const positionAt = matchAtPosition();
        if (positionAt) {
          radialType.at = positionAt;
        }
      } else {
        const defaultPosition = matchPositioning();
        if (defaultPosition) {
          radialType = {
            type: "default-radial",
            // @ts-expect-error - need to circle back for these types
            at: defaultPosition
          };
        }
      }
    }
    return radialType;
  }
  function matchLength() {
    return match("px", tokens.pixelValue, 1) || match("em", tokens.emValue, 1);
  }
  function matchCircle() {
    const circle = match("shape", /^(circle)/i, 0);
    if (circle) {
      circle.style = matchLength() || matchExtentKeyword();
    }
    return circle;
  }
  function matchEllipse() {
    const ellipse = match("shape", /^(ellipse)/i, 0);
    if (ellipse) {
      ellipse.style = matchDistance() || matchExtentKeyword();
    }
    return ellipse;
  }
  function matchExtentKeyword() {
    return match("extent-keyword", tokens.extentKeywords, 1);
  }
  function matchAtPosition() {
    if (match("position", /^at/, 0)) {
      const positioning = matchPositioning();
      if (!positioning) {
        error("Missing positioning value");
      }
      return positioning;
    }
  }
  function matchPositioning() {
    const location = matchCoordinates();
    if (location.x || location.y) {
      return {
        type: "position",
        value: location
      };
    }
  }
  function matchCoordinates() {
    return {
      x: matchDistance(),
      y: matchDistance()
    };
  }
  function matchNumber() {
    return scan(tokens.number)[1];
  }
  const convertHsl = (val) => {
    const capIt = isUpperCase(val == null ? void 0 : val[0]);
    const hsl = matchListing(matchNumber);
    const { r, g, b, a } = tinycolor$1({
      h: hsl[0],
      s: hsl[1],
      l: hsl[2],
      a: hsl[3] || 1
    }).toRgb();
    return {
      value: `${capIt ? "RGBA" : "rgba"}(${r}, ${g}, ${b}, ${a})`
    };
  };
  const convertHsv = (val) => {
    const capIt = isUpperCase(val == null ? void 0 : val[0]);
    const hsv = matchListing(matchNumber);
    const { r, g, b, a } = tinycolor$1({
      h: hsv[0],
      s: hsv[1],
      v: hsv[2],
      a: hsv[3] || 1
    }).toRgb();
    return {
      value: `${capIt ? "RGBA" : "rgba"}(${r}, ${g}, ${b}, ${a})`
    };
  };
  const convertRgb = (val) => {
    const capIt = isUpperCase(val == null ? void 0 : val[0]);
    const captures = scan(tokens.spacedRgbColor);
    const [, r, g, b, a = 1] = captures || [null, ...matchListing(matchNumber)];
    return {
      value: `${capIt ? "RGBA" : "rgba"}(${r}, ${g}, ${b}, ${a})`
    };
  };
  function matchDistance() {
    return match("%", tokens.percentageValue, 1) || matchPositionKeyword() || matchLength();
  }
  function matchPositionKeyword() {
    return match("position-keyword", tokens.positionKeywords, 1);
  }
  return getAST();
};
var InputType = /* @__PURE__ */ ((InputType2) => {
  InputType2["hsl"] = "HSL";
  InputType2["rgb"] = "RGB";
  InputType2["hsv"] = "HSV";
  InputType2["cmyk"] = "CMYK";
  return InputType2;
})(InputType || {});
var GradientType = /* @__PURE__ */ ((GradientType2) => {
  GradientType2["linear"] = "linear";
  GradientType2["radial"] = "radial";
  return GradientType2;
})(GradientType || {});
var Modes = /* @__PURE__ */ ((Modes2) => {
  Modes2["solid"] = "solid";
  Modes2["gradient"] = "gradient";
  return Modes2;
})(Modes || {});
const inputTypes = [
  InputType.rgb,
  InputType.hsl,
  InputType.hsv,
  InputType.cmyk
];
const config = {
  barSize: 18,
  crossSize: 18,
  delay: 150,
  defaultColor: "rgba(175, 51, 242, 1)",
  defaultGradient: "linear-gradient(90deg, rgb(245, 66, 245) 0%, rgb(0, 0, 255) 100%)"
};
const fakePresets = [
  "rgba(0,0,0,1)",
  "rgba(128,128,128, 1)",
  "rgba(192,192,192, 1)",
  "rgba(255,255,255, 1)",
  "rgba(0,0,128,1)",
  "rgba(0,0,255,1)",
  "rgba(0,255,255, 1)",
  "rgba(0,128,0,1)",
  "rgba(128,128,0, 1)",
  "rgba(0,128,128,1)",
  "rgba(0,255,0, 1)",
  "rgba(128,0,0, 1)",
  "rgba(128,0,128, 1)",
  "rgba(175, 51, 242, 1)",
  "rgba(255,0,255, 1)",
  "rgba(255,0,0, 1)",
  "rgba(240, 103, 46, 1)",
  "rgba(255,255,0, 1)"
];
const { defaultColor, defaultGradient } = config;
const low = (color) => {
  return color.value.toLowerCase();
};
const high = (color) => {
  return color.value.toUpperCase();
};
const getColors = (value) => {
  const isGradient = value == null ? void 0 : value.includes("gradient");
  if (isGradient) {
    const isConic = value == null ? void 0 : value.includes("conic");
    const safeValue = !isConic ? value : defaultGradient;
    if (isConic) {
      console.log("Sorry we can't handle conic gradients yet");
    }
    const obj = gradientParser(safeValue);
    return obj == null ? void 0 : obj.colorStops;
  } else {
    const safeValue = value || defaultColor;
    return [{ value: safeValue }];
  }
};
const formatInputValues = (value, min, max) => {
  return isNaN(value) ? min : value < min ? min : value > max ? max : value;
};
const round = (val) => {
  return Math.round(val);
};
const { barSize, crossSize } = config;
const safeBounds = (e) => {
  const client = e.target.parentNode.getBoundingClientRect();
  const className = e.target.className;
  const adjuster = className === "c-resize ps-rl" ? 15 : 0;
  return {
    offsetLeft: (client == null ? void 0 : client.x) + adjuster,
    offsetTop: client == null ? void 0 : client.y,
    clientWidth: client == null ? void 0 : client.width,
    clientHeight: client == null ? void 0 : client.height
  };
};
function getHandleValue(e) {
  const { offsetLeft, clientWidth } = safeBounds(e);
  const pos = e.clientX - offsetLeft - barSize / 2;
  const adjuster = clientWidth - 18;
  const bounded = formatInputValues(pos, 0, adjuster);
  return Math.round(bounded / (adjuster / 100));
}
function computeSquareXY(s, v, squareWidth, squareHeight) {
  const x = s * squareWidth - crossSize / 2;
  const y = (100 - v) / 100 * squareHeight - crossSize / 2;
  return [x, y];
}
const getClientXY = (e) => {
  if (e.clientX) {
    return { clientX: e.clientX, clientY: e.clientY };
  } else {
    const touch = e.touches[0] || {};
    return { clientX: touch.clientX, clientY: touch.clientY };
  }
};
function computePickerPosition(e) {
  const { offsetLeft, offsetTop, clientWidth, clientHeight } = safeBounds(e);
  const { clientX, clientY } = getClientXY(e);
  const getX = () => {
    const xPos = clientX - offsetLeft - crossSize / 2;
    return formatInputValues(xPos, -9, clientWidth - 10);
  };
  const getY = () => {
    const yPos = clientY - offsetTop - crossSize / 2;
    return formatInputValues(yPos, -9, clientHeight - 10);
  };
  return [getX(), getY()];
}
const isUpperCase = (str) => {
  var _a;
  return (str == null ? void 0 : str[0]) === ((_a = str == null ? void 0 : str[0]) == null ? void 0 : _a.toUpperCase());
};
const convertShortHandDeg = (dir) => {
  if (dir === "to top") {
    return 0;
  } else if (dir === "to bottom") {
    return 180;
  } else if (dir === "to left") {
    return 270;
  } else if (dir === "to right") {
    return 90;
  } else if (dir === "to top right") {
    return 45;
  } else if (dir === "to bottom right") {
    return 135;
  } else if (dir === "to bottom left") {
    return 225;
  } else if (dir === "to top left") {
    return 315;
  } else {
    const safeDir = dir || 0;
    return parseInt(safeDir);
  }
};
const getDegrees = (value) => {
  var _a;
  const s1 = value == null ? void 0 : value.split(",")[0];
  const s2 = (_a = s1 == null ? void 0 : s1.split("(")[1]) == null ? void 0 : _a.replace("deg", "");
  return convertShortHandDeg(s2);
};
const getIsGradient = (value) => value == null ? void 0 : value.includes("gradient");
const getDetails = (value) => {
  const gradientType2 = value == null ? void 0 : value.split("(")[0];
  const degrees = getDegrees(value);
  const degreeStr = gradientType2 === "linear-gradient" ? `${degrees}deg` : "circle";
  return {
    degrees,
    degreeStr,
    gradientType: gradientType2
  };
};
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
var Uint8Array2 = root$1.Uint8Array;
const Uint8Array$1 = Uint8Array2;
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array$1(result).set(new Uint8Array$1(arrayBuffer));
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
const colorState = reactive({
  width: 300,
  height: 300,
  showAdvancedSliders: false,
  mode: Modes.solid,
  degrees: 90,
  degreesStr: "",
  gradientColor: "",
  gradientColors: [],
  gradientColorsIdx: 0
});
const gradientType = ref(GradientType.linear);
const tinycolor = ref(null);
let onChange = null;
function useColor() {
  const isGradient = computed(() => colorState.mode === Modes.gradient);
  const setHcH = (h2) => {
    var _a;
    if ((_a = colorState.hc) == null ? void 0 : _a.h) {
      colorState.hc.h = h2;
    }
  };
  const setValue = (color) => {
    var _a, _b;
    const _color = color || colorState.value;
    const colors = getColors(_color);
    const { degreeStr } = getDetails(_color);
    if (unref(isGradient)) {
      colorState.degreesStr = degreeStr;
      colorState.gradientColors = colors;
      colorState.gradientColor = createGradientStr(colors);
      tinycolor.value = tinycolor$1(
        colorState.gradientColors[colorState.gradientColorsIdx].value
      );
    } else {
      colorState.value = (_a = colors[0].value) == null ? void 0 : _a.replace(/\s+/g, "");
      tinycolor.value = tinycolor$1(colors[0].value);
    }
    const rgba = tinycolor.value.toRgb();
    const hsv = tinycolor.value.toHsv();
    colorState.hc = __spreadValues(__spreadValues({}, rgba), hsv);
    if (onChange) {
      if (unref(isGradient)) {
        onChange({
          color: colorState.gradientColor,
          mode: colorState.mode,
          degrees: colorState.degrees,
          gradientType: unref(gradientType),
          gradientColors: cloneDeep(
            (_b = colorState.gradientColors) == null ? void 0 : _b.map((i) => {
              var _a2;
              return {
                color: (_a2 = i.value) == null ? void 0 : _a2.toLowerCase(),
                left: i.left
              };
            })
          )
        });
      } else {
        onChange({
          color: colorState.value,
          mode: colorState.mode
        });
      }
    }
  };
  const setMode = (mode) => {
    if (mode === Modes.solid) {
      colorState.degrees = 90;
      colorState.gradientColors = [];
      colorState.gradientColorsIdx = 0;
    }
    colorState.mode = mode;
  };
  const setInputType = (type) => {
    colorState.inputType = type;
  };
  const setShowAdvance = (bol) => {
    colorState.showAdvancedSliders = bol;
  };
  function createGradientStr(newColors) {
    const sorted = newColors.sort(
      (a, b) => a.left - b.left
    );
    const colorString = sorted == null ? void 0 : sorted.map((cc) => `${cc == null ? void 0 : cc.value} ${cc.left}%`);
    const newGrade = `${unref(
      gradientType
    )}-gradient(${`${colorState.degreesStr}`}, ${colorString.join(", ")})`;
    return newGrade;
  }
  const handleGradient = (newColor, left) => {
    const colors = colorState.gradientColors || [];
    const colorValue = colors[colorState.gradientColorsIdx];
    if (!colorValue)
      return;
    colorValue.left = left != null ? left : colorValue.left;
    colorValue.value = newColor;
    const newGradStr = createGradientStr(colors);
    setValue(newGradStr);
  };
  const setDegrees = (val) => {
    var _a;
    if (gradientType.value !== GradientType.linear)
      return console.log(
        "Warning: you are updating degrees when the gradient type is not linear. This will change the gradients type which may be undesired"
      );
    const remaining = (_a = colorState.gradientColor) == null ? void 0 : _a.split(/,(.+)/)[1];
    if (!remaining)
      return;
    colorState.degrees = val;
    setValue(
      `linear-gradient(${formatInputValues(val, 0, 360)}deg, ${remaining}`
    );
  };
  const setSelectColorIdx = (idx) => {
    colorState.gradientColorsIdx = idx;
    tinycolor.value = tinycolor$1(
      colorState.gradientColors[colorState.gradientColorsIdx].value
    );
    const rgba = tinycolor.value.toRgb();
    const hsv = tinycolor.value.toHsv();
    colorState.hc = __spreadValues(__spreadValues({}, rgba), hsv);
  };
  const handleChange = (newColor) => {
    if (unref(isGradient)) {
      handleGradient(newColor);
    } else {
      setValue(newColor);
    }
  };
  const setLinear = () => {
    var _a;
    const value = (_a = colorState.gradientColor) == null ? void 0 : _a.split(/,(.+)/)[1];
    value && setValue(`linear-gradient(90deg, ${value}`);
    gradientType.value = GradientType.linear;
  };
  const setRadial = () => {
    var _a;
    const value = (_a = colorState.gradientColor) == null ? void 0 : _a.split(/,(.+)/)[1];
    value && setValue(`radial-gradient(circle, ${value}`);
    gradientType.value = GradientType.radial;
  };
  const init = (data, cb) => {
    Object.assign(colorState, data);
    onChange = cb;
    if (colorState.value) {
      const isGradient2 = getIsGradient(colorState.value);
      colorState.inputType = InputType.rgb;
      setMode(isGradient2 ? Modes.gradient : Modes.solid);
      setValue(colorState.value);
    }
  };
  const setR = (newR) => {
    const newVal = formatInputValues(newR, 0, 255);
    const hc = colorState.hc;
    handleChange(`rgba(${newVal}, ${hc.g}, ${hc.b}, ${hc.a})`);
  };
  const setG = (newG) => {
    const newVal = formatInputValues(newG, 0, 255);
    const hc = colorState.hc;
    handleChange(`rgba(${hc.r}, ${newVal}, ${hc.b}, ${hc.a})`);
  };
  const setB = (newB) => {
    const newVal = formatInputValues(newB, 0, 255);
    const hc = colorState.hc;
    handleChange(`rgba(${hc.r}, ${hc.g}, ${newVal}, ${hc.a})`);
  };
  const setA = (newA) => {
    const newVal = formatInputValues(newA, 0, 100);
    const hc = colorState.hc;
    handleChange(`rgba(${hc.r}, ${hc.g}, ${hc.b}, ${newVal / 100})`);
  };
  const setHue = (newHue) => {
    const newVal = formatInputValues(newHue, 0, 360);
    const hc = colorState.hc;
    const tinyNew = tinycolor$1({ h: newVal, s: hc.s, l: hc.l });
    const { r, g, b } = tinyNew.toRgb();
    handleChange(`rgba(${r}, ${g}, ${b}, ${hc.a})`);
  };
  const setSaturation = (newSat) => {
    const newVal = formatInputValues(newSat, 0, 100);
    const hc = colorState.hc;
    const tinyNew = tinycolor$1({ h, s: newVal / 100, l: hc.l });
    const { r, g, b } = tinyNew.toRgb();
    handleChange(`rgba(${r}, ${g}, ${b}, ${hc.a})`);
  };
  const setLightness = (newLight) => {
    const newVal = formatInputValues(newLight, 0, 100);
    const hc = colorState.hc;
    const tinyNew = tinycolor$1({ h, s: hc.s, l: newVal / 100 });
    if (tinyNew == null ? void 0 : tinyNew.isValid()) {
      const { r, g, b } = tinyNew.toRgb();
      handleChange(`rgba(${r}, ${g}, ${b}, ${hc.a})`);
    } else {
      console.log(
        "The new color was invalid, perhaps the lightness you passed in was a decimal? Please pass the new value between 0 - 100"
      );
    }
  };
  const setSelectedPoint = (index2) => {
    colorState.gradientColorsIdx = index2;
  };
  const updateSelectColor = (value) => {
    const colors = colorState.gradientColors || [];
    const colorValue = colors[colorState.gradientColorsIdx];
    if (!colorValue)
      return;
    colorValue.value = value;
    const newGradStr = createGradientStr(colors);
    setValue(newGradStr);
  };
  const addPoint = (left) => {
    var _a;
    if (!left && left !== 0) {
      console.log(
        "You did not pass a stop value (left amount) for the new color point so it defaulted to 50"
      );
    }
    const colors = cloneDeep(colorState.gradientColors);
    const curColorValue = colors[colorState.gradientColorsIdx];
    const newColors = (_a = [
      ...colors == null ? void 0 : colors.map((c) => __spreadProps(__spreadValues({}, c), {
        value: low(c)
      })),
      { value: curColorValue.value, left }
    ]) == null ? void 0 : _a.sort((a, b) => a.left - b.left);
    colorState.gradientColorsIdx = newColors.findIndex((i) => i.left === left);
    const color = createGradientStr(newColors);
    setValue(color);
  };
  const deletePoint = (index2) => {
    const colors = colorState.gradientColors;
    if (colors && (colors == null ? void 0 : colors.length) > 2) {
      const pointToDelete = index2 != null ? index2 : colorState.gradientColorsIdx;
      const remaining = colors == null ? void 0 : colors.filter(
        (rc, i) => i !== pointToDelete
      );
      colorState.gradientColors = cloneDeep(remaining);
      const newGradientColor = createGradientStr(remaining);
      setValue(newGradientColor);
    } else {
      console.log(
        "A gradient must have atleast two colors, disable your delete button when necessary"
      );
    }
  };
  return {
    colorState,
    tinycolor,
    gradientType,
    isGradient,
    init,
    setHcH,
    setShowAdvance,
    setValue,
    setInputType,
    handleChange,
    setMode,
    setLinear,
    setRadial,
    createGradientStr,
    setDegrees,
    setSelectColorIdx,
    setR,
    setG,
    setB,
    setA,
    setHue,
    setSaturation,
    setLightness,
    addPoint,
    setSelectedPoint,
    handleGradient,
    updateSelectColor,
    deletePoint
  };
}
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  __name: "Opacity",
  setup(__props) {
    const { colorState: colorState2, handleChange } = useColor();
    const dragging = ref(false);
    const left = ref(colorState2.width - 18);
    const bg = computed(() => {
      if (colorState2.hc) {
        const { r, g, b } = colorState2.hc;
        return `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(${r},${g},${b},.5) 100%)`;
      }
      return "";
    });
    const stopDragging = () => {
      dragging.value = false;
    };
    const handleDown = () => {
      dragging.value = true;
    };
    const handleOpacity = (e) => {
      if (!colorState2.hc)
        return;
      const { r, g, b } = colorState2.hc;
      const newO = getHandleValue(e) / 100;
      const newColor = `rgba(${r}, ${g}, ${b}, ${newO})`;
      handleChange(newColor);
    };
    const handleMove = (e) => {
      if (unref(dragging)) {
        handleOpacity(e);
      }
    };
    const handleClick = (e) => {
      if (!unref(dragging)) {
        handleOpacity(e);
      }
    };
    onMounted(() => {
      window.addEventListener("mouseup", stopDragging);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("mouseup", stopDragging);
    });
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock("section", {
        class: "cpg-opacity-wrap",
        onMousedown: handleDown,
        onMousemove: handleMove
      }, [
        _cache[0] || (_cache[0] = createElementVNode("div", { class: "cpg-opacity-bar" }, null, -1)),
        createElementVNode("div", {
          class: "cpg-pointer",
          style: normalizeStyle({ left: unref(left) * ((_a = unref(colorState2).hc) == null ? void 0 : _a.a) + "px" })
        }, null, 4),
        createElementVNode("div", {
          class: "cpg-opacity-color",
          style: normalizeStyle({ background: unref(bg) }),
          onClick: handleClick
        }, null, 4)
      ], 32);
    };
  }
});
const _hoisted_1$b = { class: "relative" };
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  __name: "PickerArea",
  setup(__props) {
    const { colorState: colorState2, isGradient, setValue, updateSelectColor } = useColor();
    const { crossSize: crossSize2 } = config;
    const canvasRef = ref(null);
    const dragging = ref(false);
    const setDragging = (val) => dragging.value = val;
    const stopDragging = () => {
      setDragging(false);
    };
    const dragPos = reactive({
      x: 0,
      y: 0
    });
    const handleColor = throttle(function(e) {
      var _a, _b;
      const [x, y] = computePickerPosition(e);
      if (x && y) {
        const width = colorState2.width;
        const height = colorState2.height;
        const x1 = Math.min(x + crossSize2 / 2, width - 1);
        const y1 = Math.min(y + crossSize2 / 2, height - 1);
        const newS = x1 / width * 100;
        const newY = 100 - y1 / height * 100;
        dragPos.x = newY === 0 ? dragPos.x : x;
        dragPos.y = y;
        const updated = tinycolor$1(
          `hsva(${(_a = colorState2.hc) == null ? void 0 : _a.h}, ${newS}%, ${newY}%, ${(_b = colorState2.hc) == null ? void 0 : _b.a})`
        );
        const color = updated.toRgbString();
        unref(isGradient) ? updateSelectColor(color) : setValue(color);
      }
    }, 200);
    const handleMove = throttle(function(e) {
      if (unref(dragging)) {
        handleColor(e);
      }
    }, 180);
    const handleCanvasDown = (e) => {
      setDragging(true);
      handleColor(e);
    };
    const handleMouseDown = () => {
      setDragging(true);
    };
    const handleUp = () => {
      stopDragging();
    };
    onMounted(() => {
      window.addEventListener("mouseup", handleUp);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("mouseup", handleUp);
    });
    watchEffect(() => {
      var _a, _b;
      if (colorState2.hc) {
        const [x, y] = computeSquareXY(
          (_a = colorState2.hc) == null ? void 0 : _a.s,
          ((_b = colorState2.hc) == null ? void 0 : _b.v) * 100,
          colorState2.width,
          colorState2.height
        );
        dragPos.x = x;
        dragPos.y = y;
      }
    });
    watchEffect(() => {
      var _a;
      const canvas = unref(canvasRef);
      if (canvas) {
        const width = colorState2.width;
        const height = colorState2.height;
        const hue = (_a = colorState2.hc) == null ? void 0 : _a.h;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (ctx) {
          ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
          ctx.fillRect(0, 0, colorState2.width, height);
          const gradientWhite = ctx.createLinearGradient(0, 0, width, 0);
          gradientWhite.addColorStop(0, `rgba(255, 255, 255, 1)`);
          gradientWhite.addColorStop(1, `rgba(255, 255, 255, 0)`);
          ctx.fillStyle = gradientWhite;
          ctx.fillRect(0, 0, width, height);
          const gradientBlack = ctx.createLinearGradient(0, 0, 0, height);
          gradientBlack.addColorStop(0, `rgba(0, 0, 0, 0)`);
          gradientBlack.addColorStop(1, `rgba(0, 0, 0, 1)`);
          ctx.fillStyle = gradientBlack;
          ctx.fillRect(0, 0, width, height);
        }
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1$b, [
        createElementVNode("div", {
          class: "cpg-picker-wrap",
          style: normalizeStyle({
            width: `${unref(colorState2).width}px`
          }),
          onMouseup: stopDragging,
          onTouchend: stopDragging,
          onMousedown: handleCanvasDown,
          onTouchstart: handleCanvasDown,
          onMousemove: _cache[0] || (_cache[0] = //@ts-ignore
          (...args) => unref(handleMove) && unref(handleMove)(...args))
        }, [
          createElementVNode("span", {
            class: "cpg-pointer",
            style: normalizeStyle({
              left: `${unref(dragPos).x}px`,
              top: `${unref(dragPos).y}px`
            }),
            onMousedown: handleMouseDown
          }, null, 36),
          createElementVNode("canvas", {
            ref_key: "canvasRef",
            ref: canvasRef,
            class: "cpg-picker-area",
            style: normalizeStyle({
              width: `${unref(colorState2).width}px`,
              height: `${unref(colorState2).height}px`
            })
          }, null, 4)
        ], 36)
      ]);
    };
  }
});
const _hoisted_1$a = { class: "cpg-controls-wrapper" };
const _hoisted_2$3 = { class: "cpg-controls-item" };
const _hoisted_3$1 = { class: "cpg-controls-item" };
const _hoisted_4$1 = ["onClick"];
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  __name: "Operation",
  setup(__props) {
    const { defaultColor: defaultColor2, defaultGradient: defaultGradient2 } = config;
    const { colorState: colorState2, isGradient, setInputType, setMode, setValue } = useColor();
    const showInputTypes = ref(false);
    const toggleShowInputType = debounce(function() {
      showInputTypes.value = !showInputTypes.value;
    }, 250);
    const handleSetInputType = debounce(function(type) {
      setInputType(type);
      toggleShowInputType();
    }, 250);
    const handleSetIsGradient = debounce(function(mode) {
      if (colorState2.mode === mode)
        return;
      setMode(mode);
      setValue(mode === Modes.gradient ? defaultGradient2 : defaultColor2);
    }, 250);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1$a, [
        createElementVNode("div", _hoisted_2$3, [
          createElementVNode("div", {
            class: normalizeClass(["cpg-controls-item-btn", { "cpg-control-active": !unref(isGradient) }]),
            role: "button",
            onClick: _cache[0] || (_cache[0] = ($event) => unref(handleSetIsGradient)(unref(Modes).solid))
          }, " Solid ", 2),
          !unref(colorState2).hideGradient ? (openBlock(), createElementBlock("div", {
            key: 0,
            class: normalizeClass(["cpg-controls-item-btn", { "cpg-control-active": unref(isGradient) }]),
            role: "button",
            onClick: _cache[1] || (_cache[1] = ($event) => unref(handleSetIsGradient)(unref(Modes).gradient))
          }, " Gradient ", 2)) : createCommentVNode("", true)
        ]),
        createElementVNode("div", _hoisted_3$1, [
          createElementVNode("div", {
            class: normalizeClass(["cpg-controls-item-btn", { "cpg-control-active": unref(showInputTypes) }]),
            role: "button"
          }, [
            createElementVNode("span", {
              class: normalizeClass(
                unref(showInputTypes) ? "text-14px iconfont cpg-exchage text-#568cf5" : "iconfont cpg-exchage text-14px"
              ),
              icon: "",
              onClick: _cache[2] || (_cache[2] = //@ts-ignore
              (...args) => unref(toggleShowInputType) && unref(toggleShowInputType)(...args))
            }, null, 2),
            createElementVNode("div", {
              class: normalizeClass(["cpg-controls-inputType", { "cpg-controls-hideInputType": !unref(showInputTypes) }])
            }, [
              (openBlock(true), createElementBlock(Fragment, null, renderList(unref(inputTypes), (type) => {
                return openBlock(), createElementBlock("div", {
                  key: type,
                  class: normalizeClass(["cpg-control-inputType-item", {
                    "cpg-control-inputType-item-active": unref(colorState2).inputType === type
                  }]),
                  onClick: ($event) => unref(handleSetInputType)(type)
                }, toDisplayString(type), 11, _hoisted_4$1);
              }), 128))
            ], 2)
          ], 2)
        ])
      ]);
    };
  }
});
const _hoisted_1$9 = { class: "cpg-gradient-controls-wrapper" };
const _hoisted_2$2 = { class: "flex justify-start items-center" };
const _hoisted_3 = { class: "flex justify-end items-center" };
const _hoisted_4 = {
  key: 0,
  class: "cpg-gradient-btn relative"
};
const _hoisted_5 = ["value"];
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  __name: "OperationGradient",
  setup(__props) {
    const {
      colorState: colorState2,
      gradientType: gradientType2,
      setLinear,
      setRadial,
      setDegrees,
      createGradientStr,
      setValue,
      deletePoint
    } = useColor();
    const disabledDelete = computed(
      () => !colorState2.gradientColors || colorState2.gradientColors.length <= 2
    );
    const handleChangeType = debounce(function(type) {
      if (type === unref(gradientType2))
        return;
      type === GradientType.linear && setLinear();
      type === GradientType.radial && setRadial();
      colorState2.gradientColors && setValue(createGradientStr(colorState2.gradientColors));
    }, 250);
    const onSetDegrees = (e) => {
      const val = e.target.value;
      setDegrees(val);
    };
    const handleDeletePoint = debounce(function() {
      if (unref(disabledDelete))
        return;
      deletePoint();
    }, 250);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("section", _hoisted_1$9, [
        createElementVNode("div", _hoisted_2$2, [
          createElementVNode("div", {
            class: normalizeClass(["cpg-gradient-btn", {
              "cpg-gradient-btn-active": unref(gradientType2) === unref(GradientType).linear
            }]),
            onClick: _cache[0] || (_cache[0] = ($event) => unref(handleChangeType)(unref(GradientType).linear))
          }, _cache[3] || (_cache[3] = [
            createElementVNode("i", { class: "text-14px iconfont cpg-linear" }, null, -1)
          ]), 2),
          createElementVNode("div", {
            class: normalizeClass(["cpg-gradient-btn", {
              "cpg-gradient-btn-active": unref(gradientType2) === unref(GradientType).radial
            }]),
            onClick: _cache[1] || (_cache[1] = ($event) => unref(handleChangeType)(unref(GradientType).radial))
          }, _cache[4] || (_cache[4] = [
            createElementVNode("i", { class: "text-14px iconfont cpg-radial" }, null, -1)
          ]), 2)
        ]),
        createElementVNode("div", _hoisted_3, [
          unref(gradientType2) === unref(GradientType).linear ? (openBlock(), createElementBlock("div", _hoisted_4, [
            _cache[5] || (_cache[5] = createElementVNode("i", { class: "text-14px iconfont cpg-deg" }, null, -1)),
            createElementVNode("input", {
              class: "cpg-deg-input text-right",
              value: unref(colorState2).degrees,
              onChange: onSetDegrees
            }, null, 40, _hoisted_5),
            _cache[6] || (_cache[6] = createElementVNode("div", { class: "absolute top-4px right-0 font-400 text-12px" }, "°", -1))
          ])) : createCommentVNode("", true),
          createElementVNode("div", {
            class: "cpg-gradient-btn",
            onClick: _cache[2] || (_cache[2] = //@ts-ignore
            (...args) => unref(handleDeletePoint) && unref(handleDeletePoint)(...args))
          }, [
            createElementVNode("i", {
              class: normalizeClass(["text-14px iconfont cpg-delete", { "text-#ccc cursor-not-allowed": unref(disabledDelete) }])
            }, null, 2)
          ])
        ])
      ]);
    };
  }
});
const _hoisted_1$8 = { class: "cpg-preview-wrap" };
const _hoisted_2$1 = ["data-color"];
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "Preview",
  setup(__props) {
    const { colorState: colorState2, isGradient, handleChange, setValue, updateSelectColor } = useColor();
    const colorValue = computed(() => {
      var _a, _b;
      if (unref(isGradient)) {
        return (_a = colorState2.gradientColor) != null ? _a : "";
      } else {
        return (_b = colorState2.value) != null ? _b : "";
      }
    });
    const handleUpdateValue = debounce(function(e) {
      const color = e.target.dataset.color;
      if (!color)
        return;
      if (unref(isGradient)) {
        handleChange(color);
      } else {
        setValue(color);
      }
    }, 250);
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock("div", _hoisted_1$8, [
        createElementVNode("div", {
          class: "cpg-preview-color",
          style: normalizeStyle({
            background: unref(colorValue),
            border: unref(colorValue) === "rgba(255,255,255,1)" && ((_a = unref(colorState2).hc) == null ? void 0 : _a.a) === 1 ? "1px solid #96959c" : ""
          })
        }, null, 4),
        createElementVNode("div", {
          class: "cpg-preview-presetColor",
          onClick: _cache[0] || (_cache[0] = //@ts-ignore
          (...args) => unref(handleUpdateValue) && unref(handleUpdateValue)(...args))
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(fakePresets), (color, idx) => {
            return openBlock(), createElementBlock("span", {
              key: color + idx,
              class: "cpg-preview-presetItem",
              style: normalizeStyle({
                background: color,
                border: color === "rgba(255,255,255, 1)" ? "1px solid #96959c" : ""
              }),
              "data-color": color
            }, null, 12, _hoisted_2$1);
          }), 128))
        ])
      ]);
    };
  }
});
const _hoisted_1$7 = { class: "cpg-input-label" };
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "InputItem",
  props: {
    inputVal: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    label: {
      type: String,
      default: ""
    },
    callback: {
      type: Function
    }
  },
  emits: ["update:inputVal"],
  setup(__props, { emit: __emit }) {
    const { colorState: colorState2 } = useColor();
    const width = computed(() => colorState2.hideOpacity ? "22%" : "18%");
    const emits = __emit;
    const props = __props;
    const inputVal = ref(0);
    const onChange2 = (e) => {
      const newVal = formatInputValues(parseFloat(e.target.value), 0, props.max);
      inputVal.value = newVal;
      emits("update:inputVal", newVal);
      props.callback && typeof props.callback === "function" && props.callback(newVal);
    };
    watchEffect(() => {
      if (props.inputVal || props.inputVal === 0) {
        inputVal.value = ~~props.inputVal;
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "cpg-inputItem-wrap",
        style: normalizeStyle({ width: unref(width) })
      }, [
        withDirectives(createElementVNode("input", {
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(inputVal) ? inputVal.value = $event : null),
          class: "cpg-input",
          onChange: onChange2
        }, null, 544), [
          [vModelText, unref(inputVal)]
        ]),
        createElementVNode("div", _hoisted_1$7, toDisplayString(props.label), 1)
      ], 4);
    };
  }
});
const _hoisted_1$6 = {
  class: "cpg-inputItem-wrap",
  style: { "width": "23%" }
};
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "InputHex",
  setup(__props) {
    const { colorState: colorState2, setValue } = useColor();
    const hexVal = ref("");
    const onChange2 = (e) => {
      var _a, _b;
      const tinyHex = tinycolor$1(e.target.value);
      if (tinyHex.isValid()) {
        const { r, g, b } = tinyHex.toRgb();
        const newColor = `rgba(${r}, ${g}, ${b}, ${(_a = colorState2.hc) == null ? void 0 : _a.a})`;
        setValue(newColor);
      } else {
        hexVal.value = (_b = tinycolor$1(colorState2.value)) == null ? void 0 : _b.toHex();
      }
    };
    watchEffect(() => {
      var _a;
      if (colorState2.value) {
        hexVal.value = (_a = tinycolor$1(colorState2.value)) == null ? void 0 : _a.toHex();
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$6, [
        withDirectives(createElementVNode("input", {
          "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(hexVal) ? hexVal.value = $event : null),
          class: "cpg-input",
          onChange: onChange2
        }, null, 544), [
          [vModelText, unref(hexVal)]
        ]),
        _cache[1] || (_cache[1] = createElementVNode("div", { class: "cpg-input-label" }, "HEX", -1))
      ]);
    };
  }
});
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "HSLInputs",
  setup(__props) {
    const sVal = ref(0);
    const lVal = ref(0);
    const { colorState: colorState2, handleChange, tinycolor: tinycolor2 } = useColor();
    const handleSl = (value) => {
      var _a;
      const { r, g, b } = tinycolor$1(value).toRgb();
      handleChange(`rgba(${r}, ${g}, ${b}, ${(_a = colorState2.hc) == null ? void 0 : _a.a})`);
    };
    const handleH = (h2, s, l) => {
      var _a;
      const { r, g, b } = tinycolor$1({ h: h2, s, l }).toRgb();
      handleChange(`rgba(${r}, ${g}, ${b}, ${(_a = colorState2.hc) == null ? void 0 : _a.a})`);
    };
    watchEffect(() => {
      if (colorState2.inputType === InputType.hsl && colorState2.hc) {
        const { s, l } = tinycolor2.value.toHsl(colorState2.value);
        sVal.value = s;
        lVal.value = l;
      }
    });
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_sfc_main$d, {
          "input-val": unref(round)((_a = unref(colorState2).hc) == null ? void 0 : _a.h),
          label: "H",
          max: 360,
          callback: (val) => handleH(val, unref(sVal), unref(lVal))
        }, null, 8, ["input-val", "callback"]),
        createVNode(_sfc_main$d, {
          "input-val": unref(round)(unref(sVal) * 100),
          label: "S",
          max: 100,
          callback: (val) => {
            var _a2;
            return handleSl({ h: (_a2 = unref(colorState2).hc) == null ? void 0 : _a2.h, s: val, l: unref(lVal) });
          }
        }, null, 8, ["input-val", "callback"]),
        createVNode(_sfc_main$d, {
          "input-val": unref(round)(unref(lVal) * 100),
          label: "L",
          max: 100,
          callback: (val) => {
            var _a2;
            return handleSl({ h: (_a2 = unref(colorState2).hc) == null ? void 0 : _a2.h, s: unref(sVal), l: val });
          }
        }, null, 8, ["input-val", "callback"])
      ], 64);
    };
  }
});
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "RGBInputs",
  setup(__props) {
    var _a, _b, _c;
    const { colorState: colorState2, handleChange } = useColor();
    const red = ref((_a = colorState2.hc) == null ? void 0 : _a.r);
    const green = ref((_b = colorState2.hc) == null ? void 0 : _b.g);
    const blue = ref((_c = colorState2.hc) == null ? void 0 : _c.n);
    const handleRgb = ({ r, g, b }) => {
      var _a2;
      handleChange(`rgba(${r}, ${g}, ${b}, ${(_a2 = colorState2.hc) == null ? void 0 : _a2.a})`);
    };
    watch(
      () => colorState2.hc,
      (val) => {
        if (colorState2.inputType === InputType.rgb) {
          const { r, g, b } = val;
          red.value = r;
          green.value = g;
          blue.value = b;
        }
      }
    );
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_sfc_main$d, {
          "input-val": unref(red),
          label: "R",
          max: 255,
          callback: (val) => handleRgb({ r: val, g: unref(colorState2).hc.g, b: unref(colorState2).hc.b })
        }, null, 8, ["input-val", "callback"]),
        createVNode(_sfc_main$d, {
          "input-val": unref(green),
          label: "G",
          max: 255,
          callback: (val) => handleRgb({ r: unref(colorState2).hc.r, g: val, b: unref(colorState2).hc.b })
        }, null, 8, ["input-val", "callback"]),
        createVNode(_sfc_main$d, {
          "input-val": unref(blue),
          label: "B",
          max: 255,
          callback: (val) => {
            var _a2;
            return handleRgb({ r: unref(colorState2).hc.r, g: (_a2 = unref(colorState2).hc) == null ? void 0 : _a2.g, b: val });
          }
        }, null, 8, ["input-val", "callback"])
      ], 64);
    };
  }
});
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "HSVInputs",
  setup(__props) {
    const sVal = ref(0);
    const vVal = ref(0);
    const { colorState: colorState2, handleChange, tinycolor: tinycolor2 } = useColor();
    const handleSV = (value) => {
      var _a;
      const { r, g, b } = tinycolor$1(value).toRgb();
      handleChange(`rgba(${r}, ${g}, ${b}, ${(_a = colorState2.hc) == null ? void 0 : _a.a})`);
    };
    const handleH = (h2, s, v) => {
      var _a;
      const { r, g, b } = tinycolor$1({ h: h2, s, v }).toRgb();
      handleChange(`rgba(${r}, ${g}, ${b}, ${(_a = colorState2.hc) == null ? void 0 : _a.a})`);
    };
    watchEffect(() => {
      if (colorState2.inputType === InputType.hsv && colorState2.hc) {
        sVal.value = colorState2.hc.s;
        vVal.value = colorState2.hc.v;
      }
    });
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_sfc_main$d, {
          "input-val": unref(round)((_a = unref(colorState2).hc) == null ? void 0 : _a.h),
          label: "H",
          max: 360,
          callback: (val) => handleH(val, unref(sVal), unref(vVal))
        }, null, 8, ["input-val", "callback"]),
        createVNode(_sfc_main$d, {
          "input-val": unref(round)(unref(sVal) * 100),
          label: "S",
          max: 100,
          callback: (val) => {
            var _a2;
            return handleSV({ h: (_a2 = unref(colorState2).hc) == null ? void 0 : _a2.h, s: val, v: unref(vVal) });
          }
        }, null, 8, ["input-val", "callback"]),
        createVNode(_sfc_main$d, {
          "input-val": unref(round)(unref(vVal) * 100),
          label: "V",
          max: 100,
          callback: (val) => {
            var _a2;
            return handleSV({ h: (_a2 = unref(colorState2).hc) == null ? void 0 : _a2.h, s: unref(sVal), v: val });
          }
        }, null, 8, ["input-val", "callback"])
      ], 64);
    };
  }
});
function rgb2cmyk(r, g, b) {
  let computedC = 0;
  let computedM = 0;
  let computedY = 0;
  let computedK = 0;
  if (r === null || g === null || b === null || isNaN(r) || isNaN(g) || isNaN(b)) {
    console.log("Please enter numeric RGB values!");
    return { c: 0, m: 0, k: 0, y: 1 };
  }
  if (r < 0 || g < 0 || b < 0 || r > 255 || g > 255 || b > 255) {
    console.log("RGB values must be in the range 0 to 255.");
    return { c: 0, m: 0, k: 0, y: 1 };
  }
  if (r === 0 && g === 0 && b === 0) {
    computedK = 1;
    return { c: 0, m: 0, k: 0, y: 1 };
  }
  computedC = 1 - r / 255;
  computedM = 1 - g / 255;
  computedY = 1 - b / 255;
  const minCMY = Math.min(computedC, Math.min(computedM, computedY));
  computedC = (computedC - minCMY) / (1 - minCMY);
  computedM = (computedM - minCMY) / (1 - minCMY);
  computedY = (computedY - minCMY) / (1 - minCMY);
  computedK = minCMY;
  return { c: computedC, m: computedM, y: computedY, k: computedK };
}
const cmykToRgb = ({
  c,
  m,
  y,
  k
}) => {
  const r = 255 * (1 - c) * (1 - k);
  const g = 255 * (1 - m) * (1 - k);
  const b = 255 * (1 - y) * (1 - k);
  return { r, g, b };
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "CMYKInputs",
  setup(__props) {
    const { colorState: colorState2, handleChange } = useColor();
    const handleCmyk = (value) => {
      var _a;
      const { r, g, b } = cmykToRgb(value);
      handleChange(`rgba(${r}, ${g}, ${b}, ${(_a = colorState2.hc) == null ? void 0 : _a.a})`);
    };
    const cmykState = reactive({
      c: 0,
      m: 0,
      y: 0,
      k: 0
    });
    watchEffect(() => {
      var _a, _b, _c;
      if (colorState2.inputType === InputType.cmyk && colorState2.hc) {
        const { c, m, y, k } = rgb2cmyk(
          (_a = colorState2.hc) == null ? void 0 : _a.r,
          (_b = colorState2.hc) == null ? void 0 : _b.g,
          (_c = colorState2.hc) == null ? void 0 : _c.b
        );
        Object.assign(cmykState, {
          c: round(c * 100),
          m: round(m * 100),
          y: round(y * 100),
          k: round(k * 100)
        });
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_sfc_main$d, {
          "input-val": unref(cmykState).c,
          "onUpdate:inputVal": _cache[0] || (_cache[0] = ($event) => unref(cmykState).c = $event),
          label: "C",
          max: 100,
          callback: (val) => handleCmyk({ c: val / 100, m: unref(cmykState).m, y: unref(cmykState).y, k: unref(cmykState).k })
        }, null, 8, ["input-val", "callback"]),
        createVNode(_sfc_main$d, {
          "input-val": unref(cmykState).m,
          "onUpdate:inputVal": _cache[1] || (_cache[1] = ($event) => unref(cmykState).m = $event),
          label: "M",
          max: 100,
          callback: (val) => handleCmyk({ c: unref(cmykState).c, m: val / 100, y: unref(cmykState).y, k: unref(cmykState).k })
        }, null, 8, ["input-val", "callback"]),
        createVNode(_sfc_main$d, {
          "input-val": unref(cmykState).y,
          "onUpdate:inputVal": _cache[2] || (_cache[2] = ($event) => unref(cmykState).y = $event),
          label: "Y",
          max: 100,
          callback: (val) => handleCmyk({ c: unref(cmykState).c, m: unref(cmykState).m, y: val / 100, k: unref(cmykState).k })
        }, null, 8, ["input-val", "callback"]),
        createVNode(_sfc_main$d, {
          "input-val": unref(cmykState).k,
          "onUpdate:inputVal": _cache[3] || (_cache[3] = ($event) => unref(cmykState).k = $event),
          label: "K",
          max: 100,
          callback: (val) => handleCmyk({ c: unref(cmykState).c, m: unref(cmykState).m, y: unref(cmykState).y, k: val / 100 })
        }, null, 8, ["input-val", "callback"])
      ], 64);
    };
  }
});
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(__props) {
    const { colorState: colorState2, handleChange } = useColor();
    return (_ctx, _cache) => {
      var _a, _b;
      return openBlock(), createElementBlock("div", {
        class: "cpg-inputs-wrap",
        style: normalizeStyle({ width: `${unref(colorState2).width}px` })
      }, [
        unref(colorState2).inputType !== unref(InputType).cmyk ? (openBlock(), createBlock(unref(_sfc_main$c), { key: 0 })) : createCommentVNode("", true),
        unref(colorState2).inputType === unref(InputType).hsl ? (openBlock(), createBlock(unref(_sfc_main$b), { key: 1 })) : createCommentVNode("", true),
        unref(colorState2).inputType === unref(InputType).rgb ? (openBlock(), createBlock(unref(_sfc_main$a), { key: 2 })) : createCommentVNode("", true),
        unref(colorState2).inputType === unref(InputType).hsv ? (openBlock(), createBlock(unref(_sfc_main$9), { key: 3 })) : createCommentVNode("", true),
        unref(colorState2).inputType === unref(InputType).cmyk ? (openBlock(), createBlock(unref(_sfc_main$8), { key: 4 })) : createCommentVNode("", true),
        !unref(colorState2).hideOpacity ? (openBlock(), createBlock(unref(_sfc_main$d), {
          key: 5,
          "input-val": ((_b = (_a = unref(colorState2).hc) == null ? void 0 : _a.a) != null ? _b : 0) * 100,
          label: "A",
          callback: (val) => {
            var _a2, _b2, _c;
            return unref(handleChange)(`rgba(${(_a2 = unref(colorState2).hc) == null ? void 0 : _a2.r}, ${(_b2 = unref(colorState2).hc) == null ? void 0 : _b2.g}, ${(_c = unref(colorState2).hc) == null ? void 0 : _c.b}, ${val / 100})`);
          }
        }, null, 8, ["input-val", "callback"])) : createCommentVNode("", true)
      ], 4);
    };
  }
});
const _hoisted_1$5 = { class: "cpg-gradientBar-warp" };
const _hoisted_2 = ["onMousedown"];
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "GradientBar",
  setup(__props) {
    const { colorState: colorState2, handleGradient, addPoint, setSelectColorIdx } = useColor();
    const leftMultiplyer = (colorState2.width - 18) / 100;
    const backgroundImage = computed(() => {
      return colorState2.gradientColor ? force90degLinear(colorState2.gradientColor) : "";
    });
    const dragging = ref(false);
    const stopDragging = () => {
      dragging.value = false;
    };
    const handleMove = (e) => {
      if (unref(dragging)) {
        const { gradientColors, gradientColorsIdx } = colorState2;
        const color = gradientColors[gradientColorsIdx].value;
        handleGradient(color, getHandleValue(e));
      }
    };
    const handlePoinDown = (e, idx) => {
      e.stopPropagation();
      setSelectColorIdx(idx);
      dragging.value = true;
    };
    const handleBarDown = (e) => {
      if (unref(dragging))
        return;
      const left = getHandleValue(e);
      addPoint(left);
      dragging.value = true;
    };
    onMounted(() => {
      window.addEventListener("mouseup", stopDragging);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("mouseup", stopDragging);
    });
    function force90degLinear(color) {
      return color.replace(
        /(radial|linear)-gradient\([^,]+,/,
        "linear-gradient(90deg,"
      );
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$5, [
        createElementVNode("div", {
          class: "cpg-gradientBar",
          style: normalizeStyle({ width: unref(colorState2).width + "px", backgroundImage: unref(backgroundImage) }),
          onMousedown: handleBarDown,
          onMousemove: handleMove
        }, null, 36),
        (openBlock(true), createElementBlock(Fragment, null, renderList(unref(colorState2).gradientColors, (point, idx) => {
          return openBlock(), createElementBlock("div", {
            key: point.value + idx,
            class: normalizeClass(["cpg-pointer", {
              "cpg-pointer-centerPoint": unref(colorState2).gradientColorsIdx === idx
            }]),
            style: normalizeStyle({ left: point.left * leftMultiplyer + "px" }),
            onMousedown: ($event) => handlePoinDown($event, idx)
          }, null, 46, _hoisted_2);
        }), 128))
      ]);
    };
  }
});
const _hoisted_1$4 = ["width"];
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "Hue",
  setup(__props) {
    const { colorState: colorState2, isGradient, handleChange, setHcH, updateSelectColor } = useColor();
    const canvasRef = ref(null);
    const dragging = ref(false);
    const stopDragging = () => {
      dragging.value = false;
    };
    const handleDown = () => {
      dragging.value = true;
    };
    const handleHue = (e) => {
      var _a, _b;
      const newHue = getHandleValue(e) * 3.6;
      const tinyHsv = tinycolor$1({
        h: newHue,
        s: (_a = colorState2.hc) == null ? void 0 : _a.s,
        v: (_b = colorState2.hc) == null ? void 0 : _b.v
      });
      const { r, g, b } = tinyHsv.toRgb();
      setHcH(newHue);
      const rgbaColor = `rgba(${r}, ${g}, ${b}, ${colorState2.hc.a})`;
      unref(isGradient) ? updateSelectColor(rgbaColor) : handleChange(rgbaColor);
    };
    const handleMove = (e) => {
      if (unref(dragging)) {
        handleHue(e);
      }
    };
    const handleClick = debounce(function(e) {
      if (!unref(dragging)) {
        handleHue(e);
      }
    }, 250);
    onMounted(() => {
      const canvas = unref(canvasRef);
      if (canvas) {
        const ctx = canvas == null ? void 0 : canvas.getContext("2d", { willReadFrequently: true });
        if (ctx) {
          ctx.rect(0, 0, colorState2.width, 14);
          const gradient = ctx.createLinearGradient(0, 0, colorState2.width, 0);
          for (let i = 0; i <= 360; i += 30) {
            gradient.addColorStop(i / 360, `hsl(${i}, 100%, 50%)`);
          }
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }
      window.addEventListener("mouseup", stopDragging);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("mouseup", stopDragging);
    });
    return (_ctx, _cache) => {
      var _a;
      return openBlock(), createElementBlock("div", {
        class: "cpg-hue-wrap",
        onMousedown: handleDown,
        onMousemove: handleMove
      }, [
        createElementVNode("div", {
          class: "cpg-pointer",
          style: normalizeStyle({ left: ((_a = unref(colorState2).hc) == null ? void 0 : _a.h) * ((unref(colorState2).width - 18) / 360) + "px" })
        }, null, 4),
        createElementVNode("canvas", {
          ref_key: "canvasRef",
          ref: canvasRef,
          width: unref(colorState2).width,
          height: "14",
          class: "cpg-hue-colors",
          onClick: _cache[0] || (_cache[0] = //@ts-ignore
          (...args) => unref(handleClick) && unref(handleClick)(...args))
        }, null, 8, _hoisted_1$4)
      ], 32);
    };
  }
});
const _hoisted_1$3 = { class: "cpg-advance-item" };
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "AdvBrightnessBar",
  setup(__props) {
    const { colorState: colorState2, tinycolor: tinycolor2 } = useColor();
    const canvasRef = ref(null);
    watchEffect(() => {
      const canvas = unref(canvasRef);
      if (canvas) {
        const { s } = tinycolor2.value.toHsl();
        const ctx = canvas == null ? void 0 : canvas.getContext("2d", { willReadFrequently: true });
        if (ctx) {
          ctx.rect(0, 0, colorState2.width, 14);
          const gradient = ctx.createLinearGradient(0, 0, colorState2.width, 0);
          for (let i = 0; i <= 100; i += 10) {
            const hsl = tinycolor$1({ h: colorState2.hc.h, s: s * 100, v: i });
            gradient.addColorStop(i / 100, hsl.toHslString());
          }
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$3, [
        _cache[0] || (_cache[0] = createElementVNode("div", { class: "cpg-pointer !top-1px" }, null, -1)),
        _cache[1] || (_cache[1] = createElementVNode("div", { class: "cpg-advance-text" }, "Brightness", -1)),
        createElementVNode("canvas", {
          ref_key: "canvasRef",
          ref: canvasRef,
          class: "cpg-advance-canvas",
          height: "14"
        }, null, 512)
      ]);
    };
  }
});
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "AdvLightnessBar",
  setup(__props) {
    const { colorState: colorState2, tinycolor: tinycolor2, handleChange } = useColor();
    const canvasRef = ref(null);
    const setLight = (value) => {
      var _a, _b;
      const { s } = tinycolor2.value.toHsl();
      const { r, g, b } = tinycolor$1({
        h: (_a = colorState2.hc) == null ? void 0 : _a.h,
        s,
        l: value / 100
      }).toRgb();
      handleChange(`rgba(${r},${g},${b},${(_b = colorState2.hc) == null ? void 0 : _b.a})`);
    };
    const left = ref(0);
    const dragging = ref(false);
    const stopDragging = () => {
      dragging.value = false;
    };
    const handleDown = () => {
      dragging.value = true;
    };
    const handleMove = (e) => {
      if (unref(dragging)) {
        setLight(getHandleValue(e));
      }
    };
    const handleClick = debounce(function(e) {
      if (!unref(dragging)) {
        setLight(getHandleValue(e));
      }
    }, 250);
    watchEffect(() => {
      const canvas = unref(canvasRef);
      if (canvas) {
        const { s } = tinycolor2.value.toHsl();
        const ctx = canvas == null ? void 0 : canvas.getContext("2d", { willReadFrequently: true });
        if (ctx) {
          ctx.rect(0, 0, colorState2.width, 14);
          const gradient = ctx.createLinearGradient(0, 0, colorState2.width, 0);
          for (let i = 0; i <= 100; i += 10) {
            gradient.addColorStop(
              i / 100,
              `hsl(${colorState2.hc.h}, ${s * 100}%, ${i}%)`
            );
          }
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }
    });
    watch(
      () => colorState2.hc,
      () => {
        left.value = colorState2.hc.l * (colorState2.width - 18);
      }
    );
    onMounted(() => {
      window.addEventListener("mouseup", stopDragging);
    });
    onBeforeUnmount(() => {
      window.removeEventListener("mouseup", stopDragging);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: "cpg-advance-item",
        onMousemove: handleMove
      }, [
        createElementVNode("div", {
          class: "cpg-pointer !top-1px",
          style: normalizeStyle({ left: unref(left) + "px" }),
          onMousedown: handleDown
        }, null, 36),
        _cache[1] || (_cache[1] = createElementVNode("div", { class: "cpg-advance-text" }, "Lightness", -1)),
        createElementVNode("canvas", {
          ref_key: "canvasRef",
          ref: canvasRef,
          class: "cpg-advance-canvas",
          height: "14",
          onClick: _cache[0] || (_cache[0] = //@ts-ignore
          (...args) => unref(handleClick) && unref(handleClick)(...args))
        }, null, 512)
      ], 32);
    };
  }
});
const _hoisted_1$2 = { class: "cpg-advance-item" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AdvSaturationBar",
  setup(__props) {
    const { colorState: colorState2, tinycolor: tinycolor2 } = useColor();
    const canvasRef = ref(null);
    watchEffect(() => {
      const canvas = unref(canvasRef);
      if (canvas) {
        const { l } = tinycolor2.value.toHsl();
        const ctx = canvas == null ? void 0 : canvas.getContext("2d", { willReadFrequently: true });
        if (ctx) {
          ctx.rect(0, 0, colorState2.width, 14);
          const gradient = ctx.createLinearGradient(0, 0, colorState2.width, 0);
          for (let i = 0; i <= 100; i += 10) {
            gradient.addColorStop(
              i / 100,
              `hsl(${colorState2.hc.h}, ${i}%, ${l * 100}%)`
            );
          }
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      }
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$2, [
        _cache[0] || (_cache[0] = createElementVNode("div", { class: "cpg-pointer !top-1px" }, null, -1)),
        _cache[1] || (_cache[1] = createElementVNode("div", { class: "cpg-advance-text" }, "Saturation", -1)),
        createElementVNode("canvas", {
          ref_key: "canvasRef",
          ref: canvasRef,
          class: "cpg-advance-canvas",
          height: "14"
        }, null, 512)
      ]);
    };
  }
});
const _hoisted_1$1 = { class: "cpg-advance-wrap" };
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "index",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1$1, [
        createVNode(unref(_sfc_main$2)),
        createVNode(unref(_sfc_main$3)),
        createVNode(unref(_sfc_main$4))
      ]);
    };
  }
});
const _hoisted_1 = { class: "cpg-box" };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  props: {
    value: {
      type: String,
      default: "rgba(175, 51, 242, 1)"
    },
    hideInputs: {
      type: Boolean,
      default: false
    },
    hideOpacity: {
      type: Boolean,
      default: false
    },
    hidePresets: {
      type: Boolean,
      default: false
    },
    hideColorGuide: {
      type: Boolean,
      default: false
    },
    hideGradient: {
      type: Boolean,
      default: false
    },
    width: {
      type: Number,
      default: 300
    },
    height: {
      type: Number,
      default: 300
    },
    disableDarkMode: {
      type: Boolean,
      default: false
    },
    disableLightMode: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:value", "change"],
  setup(__props, { emit: __emit }) {
    const emits = __emit;
    const { init, colorState: colorState2, isGradient } = useColor();
    const props = __props;
    const onChange2 = (val) => {
      emits("update:value", val.color);
      emits("change", __spreadValues({}, val));
    };
    init(props, onChange2);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createVNode(unref(_sfc_main$h)),
        createVNode(unref(_sfc_main$g)),
        unref(colorState2).showAdvancedSliders ? (openBlock(), createBlock(unref(_sfc_main$1), { key: 0 })) : createCommentVNode("", true),
        !unref(colorState2).hideGradient && unref(isGradient) ? (openBlock(), createBlock(unref(_sfc_main$f), { key: 1 })) : createCommentVNode("", true),
        !unref(colorState2).hideGradient && unref(isGradient) ? (openBlock(), createBlock(unref(_sfc_main$6), { key: 2 })) : createCommentVNode("", true),
        createVNode(unref(_sfc_main$5)),
        !props.hideOpacity ? (openBlock(), createBlock(unref(_sfc_main$i), { key: 3 })) : createCommentVNode("", true),
        !props.hideInputs ? (openBlock(), createBlock(unref(_sfc_main$7), { key: 4 })) : createCommentVNode("", true),
        createVNode(unref(_sfc_main$e))
      ]);
    };
  }
});
const index = "";
const __uno = "";
export {
  _sfc_main as ColorPicker
};
