import { c as createLucideIcon, f as frame, a as cancelFrame, i as interpolate, s as supportsViewTimeline, b as supportsScrollTimeline, p as progress, v as velocityPerSecond, d as isHTMLElement, e as defaultOffset$1, g as clamp, n as noop, r as resize, h as frameData, u as useConstant, j as reactExports, k as useIsomorphicLayoutEffect, l as invariant, m as motionValue, M as MotionConfigContext, o as collectMotionValues, q as jsxRuntimeExports, t as motion, B as Badge, L as Link, w as Button, C as ChevronDown, S as SkeletonCard } from "./index-CgQGP8Uk.js";
import { P as ProductCard, S as Star } from "./ProductCard-Bb_nBoTz.js";
import { u as useFeaturedProducts } from "./useProducts-D_mZPzat.js";
import { u as useFrame, _ as _extends, M as MeshPhysicalMaterial, a as useEmblaCarousel, C as Canvas, E as Environment, O as OrbitControls } from "./embla-carousel-react.esm-C3cl_Q9T.js";
import gsapWithCSS from "./index-CXnjwV9g.js";
import { ScrollTrigger } from "./ScrollTrigger-Dl-ZDUJi.js";
import "./useMutation-CVK8QqpV.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "m12 5 7 7-7 7", key: "xquz4c" }]
];
const ArrowRight = createLucideIcon("arrow-right", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z",
      key: "4pj2yx"
    }
  ],
  ["path", { d: "M20 3v4", key: "1olli1" }],
  ["path", { d: "M22 5h-4", key: "1gvqau" }],
  ["path", { d: "M4 17v2", key: "vumght" }],
  ["path", { d: "M5 18H3", key: "zchphs" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
function observeTimeline(update, timeline) {
  let prevProgress;
  const onFrame = () => {
    const { currentTime } = timeline;
    const percentage = currentTime === null ? 0 : currentTime.value;
    const progress2 = percentage / 100;
    if (prevProgress !== progress2) {
      update(progress2);
    }
    prevProgress = progress2;
  };
  frame.preUpdate(onFrame, true);
  return () => cancelFrame(onFrame);
}
function transform(...args) {
  const useImmediate = !Array.isArray(args[0]);
  const argOffset = useImmediate ? 0 : -1;
  const inputValue = args[0 + argOffset];
  const inputRange = args[1 + argOffset];
  const outputRange = args[2 + argOffset];
  const options = args[3 + argOffset];
  const interpolator = interpolate(inputRange, outputRange, options);
  return useImmediate ? interpolator(inputValue) : interpolator;
}
function canUseNativeTimeline(target) {
  if (typeof window === "undefined")
    return false;
  return target ? supportsViewTimeline() : supportsScrollTimeline();
}
const maxElapsed = 50;
const createAxisInfo = () => ({
  current: 0,
  offset: [],
  progress: 0,
  scrollLength: 0,
  targetOffset: 0,
  targetLength: 0,
  containerLength: 0,
  velocity: 0
});
const createScrollInfo = () => ({
  time: 0,
  x: createAxisInfo(),
  y: createAxisInfo()
});
const keys = {
  x: {
    length: "Width",
    position: "Left"
  },
  y: {
    length: "Height",
    position: "Top"
  }
};
function updateAxisInfo(element, axisName, info, time) {
  const axis = info[axisName];
  const { length, position } = keys[axisName];
  const prev = axis.current;
  const prevTime = info.time;
  axis.current = Math.abs(element[`scroll${position}`]);
  axis.scrollLength = element[`scroll${length}`] - element[`client${length}`];
  axis.offset.length = 0;
  axis.offset[0] = 0;
  axis.offset[1] = axis.scrollLength;
  axis.progress = progress(0, axis.scrollLength, axis.current);
  const elapsed = time - prevTime;
  axis.velocity = elapsed > maxElapsed ? 0 : velocityPerSecond(axis.current - prev, elapsed);
}
function updateScrollInfo(element, info, time) {
  updateAxisInfo(element, "x", info, time);
  updateAxisInfo(element, "y", info, time);
  info.time = time;
}
function calcInset(element, container) {
  const inset = { x: 0, y: 0 };
  let current = element;
  while (current && current !== container) {
    if (isHTMLElement(current)) {
      inset.x += current.offsetLeft;
      inset.y += current.offsetTop;
      current = current.offsetParent;
    } else if (current.tagName === "svg") {
      const svgBoundingBox = current.getBoundingClientRect();
      current = current.parentElement;
      const parentBoundingBox = current.getBoundingClientRect();
      inset.x += svgBoundingBox.left - parentBoundingBox.left;
      inset.y += svgBoundingBox.top - parentBoundingBox.top;
    } else if (current instanceof SVGGraphicsElement) {
      const { x, y } = current.getBBox();
      inset.x += x;
      inset.y += y;
      let svg = null;
      let parent = current.parentNode;
      while (!svg) {
        if (parent.tagName === "svg") {
          svg = parent;
        }
        parent = current.parentNode;
      }
      current = svg;
    } else {
      break;
    }
  }
  return inset;
}
const namedEdges = {
  start: 0,
  center: 0.5,
  end: 1
};
function resolveEdge(edge, length, inset = 0) {
  let delta = 0;
  if (edge in namedEdges) {
    edge = namedEdges[edge];
  }
  if (typeof edge === "string") {
    const asNumber = parseFloat(edge);
    if (edge.endsWith("px")) {
      delta = asNumber;
    } else if (edge.endsWith("%")) {
      edge = asNumber / 100;
    } else if (edge.endsWith("vw")) {
      delta = asNumber / 100 * document.documentElement.clientWidth;
    } else if (edge.endsWith("vh")) {
      delta = asNumber / 100 * document.documentElement.clientHeight;
    } else {
      edge = asNumber;
    }
  }
  if (typeof edge === "number") {
    delta = length * edge;
  }
  return inset + delta;
}
const defaultOffset = [0, 0];
function resolveOffset(offset, containerLength, targetLength, targetInset) {
  let offsetDefinition = Array.isArray(offset) ? offset : defaultOffset;
  let targetPoint = 0;
  let containerPoint = 0;
  if (typeof offset === "number") {
    offsetDefinition = [offset, offset];
  } else if (typeof offset === "string") {
    offset = offset.trim();
    if (offset.includes(" ")) {
      offsetDefinition = offset.split(" ");
    } else {
      offsetDefinition = [offset, namedEdges[offset] ? offset : `0`];
    }
  }
  targetPoint = resolveEdge(offsetDefinition[0], targetLength, targetInset);
  containerPoint = resolveEdge(offsetDefinition[1], containerLength);
  return targetPoint - containerPoint;
}
const ScrollOffset = {
  Enter: [
    [0, 1],
    [1, 1]
  ],
  Exit: [
    [0, 0],
    [1, 0]
  ],
  Any: [
    [1, 0],
    [0, 1]
  ],
  All: [
    [0, 0],
    [1, 1]
  ]
};
const point = { x: 0, y: 0 };
function getTargetSize(target) {
  return "getBBox" in target && target.tagName !== "svg" ? target.getBBox() : { width: target.clientWidth, height: target.clientHeight };
}
function resolveOffsets(container, info, options) {
  const { offset: offsetDefinition = ScrollOffset.All } = options;
  const { target = container, axis = "y" } = options;
  const lengthLabel = axis === "y" ? "height" : "width";
  const inset = target !== container ? calcInset(target, container) : point;
  const targetSize = target === container ? { width: container.scrollWidth, height: container.scrollHeight } : getTargetSize(target);
  const containerSize = {
    width: container.clientWidth,
    height: container.clientHeight
  };
  info[axis].offset.length = 0;
  let hasChanged = !info[axis].interpolate;
  const numOffsets = offsetDefinition.length;
  for (let i = 0; i < numOffsets; i++) {
    const offset = resolveOffset(offsetDefinition[i], containerSize[lengthLabel], targetSize[lengthLabel], inset[axis]);
    if (!hasChanged && offset !== info[axis].interpolatorOffsets[i]) {
      hasChanged = true;
    }
    info[axis].offset[i] = offset;
  }
  if (hasChanged) {
    info[axis].interpolate = interpolate(info[axis].offset, defaultOffset$1(offsetDefinition), { clamp: false });
    info[axis].interpolatorOffsets = [...info[axis].offset];
  }
  info[axis].progress = clamp(0, 1, info[axis].interpolate(info[axis].current));
}
function measure(container, target = container, info) {
  info.x.targetOffset = 0;
  info.y.targetOffset = 0;
  if (target !== container) {
    let node = target;
    while (node && node !== container) {
      info.x.targetOffset += node.offsetLeft;
      info.y.targetOffset += node.offsetTop;
      node = node.offsetParent;
    }
  }
  info.x.targetLength = target === container ? target.scrollWidth : target.clientWidth;
  info.y.targetLength = target === container ? target.scrollHeight : target.clientHeight;
  info.x.containerLength = container.clientWidth;
  info.y.containerLength = container.clientHeight;
}
function createOnScrollHandler(element, onScroll, info, options = {}) {
  return {
    measure: (time) => {
      measure(element, options.target, info);
      updateScrollInfo(element, info, time);
      if (options.offset || options.target) {
        resolveOffsets(element, info, options);
      }
    },
    notify: () => onScroll(info)
  };
}
const scrollListeners = /* @__PURE__ */ new WeakMap();
const resizeListeners = /* @__PURE__ */ new WeakMap();
const onScrollHandlers = /* @__PURE__ */ new WeakMap();
const scrollSize = /* @__PURE__ */ new WeakMap();
const dimensionCheckProcesses = /* @__PURE__ */ new WeakMap();
const getEventTarget = (element) => element === document.scrollingElement ? window : element;
function scrollInfo(onScroll, { container = document.scrollingElement, trackContentSize = false, ...options } = {}) {
  if (!container)
    return noop;
  let containerHandlers = onScrollHandlers.get(container);
  if (!containerHandlers) {
    containerHandlers = /* @__PURE__ */ new Set();
    onScrollHandlers.set(container, containerHandlers);
  }
  const info = createScrollInfo();
  const containerHandler = createOnScrollHandler(container, onScroll, info, options);
  containerHandlers.add(containerHandler);
  if (!scrollListeners.has(container)) {
    const measureAll = () => {
      for (const handler of containerHandlers) {
        handler.measure(frameData.timestamp);
      }
      frame.preUpdate(notifyAll);
    };
    const notifyAll = () => {
      for (const handler of containerHandlers) {
        handler.notify();
      }
    };
    const listener2 = () => frame.read(measureAll);
    scrollListeners.set(container, listener2);
    const target = getEventTarget(container);
    window.addEventListener("resize", listener2);
    if (container !== document.documentElement) {
      resizeListeners.set(container, resize(container, listener2));
    }
    target.addEventListener("scroll", listener2);
    listener2();
  }
  if (trackContentSize && !dimensionCheckProcesses.has(container)) {
    const listener2 = scrollListeners.get(container);
    const size = {
      width: container.scrollWidth,
      height: container.scrollHeight
    };
    scrollSize.set(container, size);
    const checkScrollDimensions = () => {
      const newWidth = container.scrollWidth;
      const newHeight = container.scrollHeight;
      if (size.width !== newWidth || size.height !== newHeight) {
        listener2();
        size.width = newWidth;
        size.height = newHeight;
      }
    };
    const dimensionCheckProcess = frame.read(checkScrollDimensions, true);
    dimensionCheckProcesses.set(container, dimensionCheckProcess);
  }
  const listener = scrollListeners.get(container);
  frame.read(listener, false, true);
  return () => {
    var _a;
    cancelFrame(listener);
    const currentHandlers = onScrollHandlers.get(container);
    if (!currentHandlers)
      return;
    currentHandlers.delete(containerHandler);
    if (currentHandlers.size)
      return;
    const scrollListener = scrollListeners.get(container);
    scrollListeners.delete(container);
    if (scrollListener) {
      getEventTarget(container).removeEventListener("scroll", scrollListener);
      (_a = resizeListeners.get(container)) == null ? void 0 : _a();
      window.removeEventListener("resize", scrollListener);
    }
    const dimensionCheckProcess = dimensionCheckProcesses.get(container);
    if (dimensionCheckProcess) {
      cancelFrame(dimensionCheckProcess);
      dimensionCheckProcesses.delete(container);
    }
    scrollSize.delete(container);
  };
}
const presets = [
  [ScrollOffset.Enter, "entry"],
  [ScrollOffset.Exit, "exit"],
  [ScrollOffset.Any, "cover"],
  [ScrollOffset.All, "contain"]
];
const stringToProgress = {
  start: 0,
  end: 1
};
function parseStringOffset(s) {
  const parts = s.trim().split(/\s+/);
  if (parts.length !== 2)
    return void 0;
  const a = stringToProgress[parts[0]];
  const b = stringToProgress[parts[1]];
  if (a === void 0 || b === void 0)
    return void 0;
  return [a, b];
}
function normaliseOffset(offset) {
  if (offset.length !== 2)
    return void 0;
  const result = [];
  for (const item of offset) {
    if (Array.isArray(item)) {
      result.push(item);
    } else if (typeof item === "string") {
      const parsed = parseStringOffset(item);
      if (!parsed)
        return void 0;
      result.push(parsed);
    } else {
      return void 0;
    }
  }
  return result;
}
function matchesPreset(offset, preset) {
  const normalised = normaliseOffset(offset);
  if (!normalised)
    return false;
  for (let i = 0; i < 2; i++) {
    const o = normalised[i];
    const p = preset[i];
    if (o[0] !== p[0] || o[1] !== p[1])
      return false;
  }
  return true;
}
function offsetToViewTimelineRange(offset) {
  if (!offset) {
    return { rangeStart: "contain 0%", rangeEnd: "contain 100%" };
  }
  for (const [preset, name] of presets) {
    if (matchesPreset(offset, preset)) {
      return { rangeStart: `${name} 0%`, rangeEnd: `${name} 100%` };
    }
  }
  return void 0;
}
const timelineCache = /* @__PURE__ */ new Map();
function scrollTimelineFallback(options) {
  const currentTime = { value: 0 };
  const cancel = scrollInfo((info) => {
    currentTime.value = info[options.axis].progress * 100;
  }, options);
  return { currentTime, cancel };
}
function getTimeline({ source, container, ...options }) {
  const { axis } = options;
  if (source)
    container = source;
  let containerCache = timelineCache.get(container);
  if (!containerCache) {
    containerCache = /* @__PURE__ */ new Map();
    timelineCache.set(container, containerCache);
  }
  const targetKey = options.target ?? "self";
  let targetCache = containerCache.get(targetKey);
  if (!targetCache) {
    targetCache = {};
    containerCache.set(targetKey, targetCache);
  }
  const axisKey = axis + (options.offset ?? []).join(",");
  if (!targetCache[axisKey]) {
    if (options.target && canUseNativeTimeline(options.target)) {
      const range = offsetToViewTimelineRange(options.offset);
      if (range) {
        targetCache[axisKey] = new ViewTimeline({
          subject: options.target,
          axis
        });
      } else {
        targetCache[axisKey] = scrollTimelineFallback({
          container,
          ...options
        });
      }
    } else if (canUseNativeTimeline()) {
      targetCache[axisKey] = new ScrollTimeline({
        source: container,
        axis
      });
    } else {
      targetCache[axisKey] = scrollTimelineFallback({
        container,
        ...options
      });
    }
  }
  return targetCache[axisKey];
}
function attachToAnimation(animation, options) {
  const timeline = getTimeline(options);
  const range = options.target ? offsetToViewTimelineRange(options.offset) : void 0;
  const useNative = options.target ? canUseNativeTimeline(options.target) && !!range : canUseNativeTimeline();
  return animation.attachTimeline({
    timeline: useNative ? timeline : void 0,
    ...range && useNative && {
      rangeStart: range.rangeStart,
      rangeEnd: range.rangeEnd
    },
    observe: (valueAnimation) => {
      valueAnimation.pause();
      return observeTimeline((progress2) => {
        valueAnimation.time = valueAnimation.iterationDuration * progress2;
      }, timeline);
    }
  });
}
function isOnScrollWithInfo(onScroll) {
  return onScroll.length === 2;
}
function attachToFunction(onScroll, options) {
  if (isOnScrollWithInfo(onScroll)) {
    return scrollInfo((info) => {
      onScroll(info[options.axis].progress, info);
    }, options);
  } else {
    return observeTimeline(onScroll, getTimeline(options));
  }
}
function scroll(onScroll, { axis = "y", container = document.scrollingElement, ...options } = {}) {
  if (!container)
    return noop;
  const optionsWithDefaults = { axis, container, ...options };
  return typeof onScroll === "function" ? attachToFunction(onScroll, optionsWithDefaults) : attachToAnimation(onScroll, optionsWithDefaults);
}
const createScrollMotionValues = () => ({
  scrollX: motionValue(0),
  scrollY: motionValue(0),
  scrollXProgress: motionValue(0),
  scrollYProgress: motionValue(0)
});
const isRefPending = (ref) => {
  if (!ref)
    return false;
  return !ref.current;
};
function makeAccelerateConfig(axis, options, container, target) {
  return {
    factory: (animation) => scroll(animation, {
      ...options,
      axis,
      container: (container == null ? void 0 : container.current) || void 0,
      target: (target == null ? void 0 : target.current) || void 0
    }),
    times: [0, 1],
    keyframes: [0, 1],
    ease: (v) => v,
    duration: 1
  };
}
function canAccelerateScroll(target, offset) {
  if (typeof window === "undefined")
    return false;
  return target ? supportsViewTimeline() && !!offsetToViewTimelineRange(offset) : supportsScrollTimeline();
}
function useScroll({ container, target, ...options } = {}) {
  const values = useConstant(createScrollMotionValues);
  if (canAccelerateScroll(target, options.offset)) {
    values.scrollXProgress.accelerate = makeAccelerateConfig("x", options, container, target);
    values.scrollYProgress.accelerate = makeAccelerateConfig("y", options, container, target);
  }
  const scrollAnimation = reactExports.useRef(null);
  const needsStart = reactExports.useRef(false);
  const start = reactExports.useCallback(() => {
    scrollAnimation.current = scroll((_progress, { x, y }) => {
      values.scrollX.set(x.current);
      values.scrollXProgress.set(x.progress);
      values.scrollY.set(y.current);
      values.scrollYProgress.set(y.progress);
    }, {
      ...options,
      container: (container == null ? void 0 : container.current) || void 0,
      target: (target == null ? void 0 : target.current) || void 0
    });
    return () => {
      var _a;
      (_a = scrollAnimation.current) == null ? void 0 : _a.call(scrollAnimation);
    };
  }, [container, target, JSON.stringify(options.offset)]);
  useIsomorphicLayoutEffect(() => {
    needsStart.current = false;
    if (isRefPending(container) || isRefPending(target)) {
      needsStart.current = true;
      return;
    } else {
      return start();
    }
  }, [start]);
  reactExports.useEffect(() => {
    if (needsStart.current) {
      invariant(!isRefPending(container));
      invariant(!isRefPending(target));
      return start();
    } else {
      return;
    }
  }, [start]);
  return values;
}
function useMotionValue(initial) {
  const value = useConstant(() => motionValue(initial));
  const { isStatic } = reactExports.useContext(MotionConfigContext);
  if (isStatic) {
    const [, setLatest] = reactExports.useState(initial);
    reactExports.useEffect(() => value.on("change", setLatest), []);
  }
  return value;
}
function useCombineMotionValues(values, combineValues) {
  const value = useMotionValue(combineValues());
  const updateValue = () => value.set(combineValues());
  updateValue();
  useIsomorphicLayoutEffect(() => {
    const scheduleUpdate = () => frame.preRender(updateValue, false, true);
    const subscriptions = values.map((v) => v.on("change", scheduleUpdate));
    return () => {
      subscriptions.forEach((unsubscribe) => unsubscribe());
      cancelFrame(updateValue);
    };
  });
  return value;
}
function useComputed(compute) {
  collectMotionValues.current = [];
  compute();
  const value = useCombineMotionValues(collectMotionValues.current, compute);
  collectMotionValues.current = void 0;
  return value;
}
function useTransform(input, inputRangeOrTransformer, outputRangeOrMap, options) {
  if (typeof input === "function") {
    return useComputed(input);
  }
  const isOutputMap = outputRangeOrMap !== void 0 && !Array.isArray(outputRangeOrMap) && typeof inputRangeOrTransformer !== "function";
  if (isOutputMap) {
    return useMapTransform(input, inputRangeOrTransformer, outputRangeOrMap, options);
  }
  const outputRange = outputRangeOrMap;
  const transformer = typeof inputRangeOrTransformer === "function" ? inputRangeOrTransformer : transform(inputRangeOrTransformer, outputRange, options);
  const result = Array.isArray(input) ? useListTransform(input, transformer) : useListTransform([input], ([latest]) => transformer(latest));
  const inputAccelerate = !Array.isArray(input) ? input.accelerate : void 0;
  if (inputAccelerate && !inputAccelerate.isTransformed && typeof inputRangeOrTransformer !== "function" && Array.isArray(outputRangeOrMap) && (options == null ? void 0 : options.clamp) !== false) {
    result.accelerate = {
      ...inputAccelerate,
      times: inputRangeOrTransformer,
      keyframes: outputRangeOrMap,
      isTransformed: true,
      ...{}
    };
  }
  return result;
}
function useListTransform(values, transformer) {
  const latest = useConstant(() => []);
  return useCombineMotionValues(values, () => {
    latest.length = 0;
    const numValues = values.length;
    for (let i = 0; i < numValues; i++) {
      latest[i] = values[i].get();
    }
    return transformer(latest);
  });
}
function useMapTransform(inputValue, inputRange, outputMap, options) {
  const keys2 = useConstant(() => Object.keys(outputMap));
  const output = useConstant(() => ({}));
  for (const key of keys2) {
    output[key] = useTransform(inputValue, inputRange, outputMap[key], options);
  }
  return output;
}
var distort = "#define GLSLIFY 1\nvec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}float snoise(vec3 v){const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;i=mod289(i);vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));}";
class DistortMaterialImpl extends MeshPhysicalMaterial {
  constructor(parameters = {}) {
    super(parameters);
    this.setValues(parameters);
    this._time = {
      value: 0
    };
    this._distort = {
      value: 0.4
    };
    this._radius = {
      value: 1
    };
  }
  // FIXME Use `THREE.WebGLProgramParametersWithUniforms` type when able to target @types/three@0.160.0
  onBeforeCompile(shader) {
    shader.uniforms.time = this._time;
    shader.uniforms.radius = this._radius;
    shader.uniforms.distort = this._distort;
    shader.vertexShader = `
      uniform float time;
      uniform float radius;
      uniform float distort;
      ${distort}
      ${shader.vertexShader}
    `;
    shader.vertexShader = shader.vertexShader.replace("#include <begin_vertex>", `
        float updateTime = time / 50.0;
        float noise = snoise(vec3(position / 2.0 + updateTime * 5.0));
        vec3 transformed = vec3(position * (noise * pow(distort, 2.0) + radius));
        `);
  }
  get time() {
    return this._time.value;
  }
  set time(v) {
    this._time.value = v;
  }
  get distort() {
    return this._distort.value;
  }
  set distort(v) {
    this._distort.value = v;
  }
  get radius() {
    return this._radius.value;
  }
  set radius(v) {
    this._radius.value = v;
  }
}
const MeshDistortMaterial = /* @__PURE__ */ reactExports.forwardRef(({
  speed = 1,
  ...props
}, ref) => {
  const [material] = reactExports.useState(() => new DistortMaterialImpl());
  useFrame((state) => material && (material.time = state.clock.elapsedTime * speed));
  return /* @__PURE__ */ reactExports.createElement("primitive", _extends({
    object: material,
    ref,
    attach: "material"
  }, props));
});
gsapWithCSS.registerPlugin(ScrollTrigger);
const REVIEWS = [
  {
    id: "r1",
    productId: "p1",
    userId: "u1",
    userName: "Alexandra Voss",
    rating: 5,
    title: "Absolutely exquisite craftsmanship",
    body: "The Obsidian Watch arrived in a stunning presentation box. Every detail speaks to decades of horological expertise. I've received more compliments wearing this than anything else in my collection.",
    createdAt: Date.now() - 864e5 * 7,
    verified: true
  },
  {
    id: "r2",
    productId: "p5",
    userId: "u2",
    userName: "Marcus Chen",
    rating: 5,
    title: "Worth every penny",
    body: "The leather attaché is the finest bag I've ever owned. The full-grain leather develops a gorgeous patina and the solid brass hardware feels indestructible. A true investment piece.",
    createdAt: Date.now() - 864e5 * 14,
    verified: true
  },
  {
    id: "r3",
    productId: "p2",
    userId: "u3",
    userName: "Isabelle Fontaine",
    rating: 5,
    title: "A scent that stops time",
    body: "Lumière is unlike anything I've experienced. The bergamot opens fresh and bright, then settles into the most intimate sandalwood base. The hand-blown flacon is a work of art in itself.",
    createdAt: Date.now() - 864e5 * 21,
    verified: true
  },
  {
    id: "r4",
    productId: "p3",
    userId: "u4",
    userName: "James Whitfield",
    rating: 4,
    title: "Minimalist perfection",
    body: "The carbon fiber wallet eliminated all the bulk from my pocket. RFID blocking works great, the carbon weave is stunning up close, and 12 cards fit perfectly. Highly recommended.",
    createdAt: Date.now() - 864e5 * 30,
    verified: true
  },
  {
    id: "r5",
    productId: "p4",
    userId: "u5",
    userName: "Naomi Reyes",
    rating: 5,
    title: "Luxuriously soft and timeless",
    body: "The Merino Crewneck is incredibly soft against skin — no itching whatsoever. It's become my go-to for everything from board meetings to weekend getaways. Machine washable is a bonus.",
    createdAt: Date.now() - 864e5 * 45,
    verified: true
  }
];
const CATEGORIES = [
  { label: "Electronics", icon: "⚡", color: "oklch(0.55 0.18 240 / 0.15)" },
  { label: "Fashion", icon: "✦", color: "oklch(0.55 0.16 330 / 0.15)" },
  { label: "Accessories", icon: "◈", color: "oklch(0.55 0.18 95 / 0.15)" },
  { label: "Home", icon: "◇", color: "oklch(0.55 0.15 160 / 0.15)" },
  { label: "Beauty", icon: "✿", color: "oklch(0.55 0.18 0 / 0.15)" }
];
const BRAND_VALUES = [
  {
    icon: ShieldCheck,
    title: "Craftsmanship",
    description: "Every item is handpicked from ateliers with generational expertise. We refuse to compromise on the details that matter.",
    year: "2018"
  },
  {
    icon: Award,
    title: "Quality",
    description: "Materials tested to outlast trends. Full-grain leather, sapphire crystal, merino wool — the best ingredients for lasting elegance.",
    year: "2020"
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Timeless aesthetics meet modern engineering. Carbon fiber wallets, precision movements, and sustainable luxury for a new era.",
    year: "2022"
  },
  {
    icon: Sparkles,
    title: "Curation",
    description: "Our edit is intentional. Every product earns its place through rigorous testing, blind comparisons, and artisan certification.",
    year: "2024"
  }
];
function ProductOrb() {
  const meshRef = reactExports.useRef(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("mesh", { ref: meshRef, castShadow: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("icosahedronGeometry", { args: [1.6, 4] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      MeshDistortMaterial,
      {
        color: "#1a9e72",
        roughness: 0.05,
        metalness: 0.95,
        distort: 0.3,
        speed: 1.5,
        envMapIntensity: 2
      }
    )
  ] });
}
function ProductShowcase3D() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Canvas,
    {
      camera: { position: [0, 0, 4.5], fov: 45 },
      style: { width: "100%", height: "100%" },
      gl: { antialias: true, alpha: true },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.4 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [4, 4, 4], intensity: 2, color: "#a0ffda" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("pointLight", { position: [-4, -2, 2], intensity: 1.5, color: "#7c5cfc" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: null, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProductOrb, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Environment, { preset: "night" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          OrbitControls,
          {
            enableZoom: false,
            autoRotate: true,
            autoRotateSpeed: 1.4,
            enableDamping: true,
            dampingFactor: 0.05
          }
        )
      ]
    }
  );
}
function ParticleCanvas() {
  const canvasRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let w = canvas.width;
    let h = canvas.height;
    let raf;
    const colors = [
      "oklch(0.65 0.2 95)",
      "oklch(0.55 0.18 180)",
      "oklch(0.6 0.15 240)"
    ];
    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 2.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.6 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    }
    draw();
    const onResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      w = canvas.width;
      h = canvas.height;
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return (
    // biome-ignore lint/a11y/noAriaHiddenOnFocusable: decorative canvas element
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "canvas",
      {
        ref: canvasRef,
        className: "absolute inset-0 w-full h-full pointer-events-none select-none",
        "aria-hidden": "true",
        tabIndex: -1
      }
    )
  );
}
function HeroSection() {
  const heroRef = reactExports.useRef(null);
  const bgRef = reactExports.useRef(null);
  const headlineRef = reactExports.useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  reactExports.useEffect(() => {
    const el = headlineRef.current;
    if (!el) return;
    const words = el.querySelectorAll(".hero-word");
    gsapWithCSS.fromTo(
      words,
      { opacity: 0, y: 40, rotateX: -30 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.3
      }
    );
  }, []);
  const scrollToFeatured = () => {
    var _a;
    (_a = document.getElementById("featured")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      ref: heroRef,
      className: "relative min-h-screen flex flex-col items-center justify-center overflow-hidden",
      style: { perspective: "1000px" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            ref: bgRef,
            className: "absolute inset-0 z-0",
            style: { y: bgY },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: "/assets/generated/hero-luxury-bg.dim_1920x1080.jpg",
                  alt: "",
                  "aria-hidden": "true",
                  className: "w-full h-full object-cover"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ParticleCanvas, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "relative z-10 text-center px-6 max-w-5xl mx-auto",
            style: { opacity },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0, y: -16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.6 },
                  className: "mb-8",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: "outline",
                      className: "glass border-primary/40 text-primary px-4 py-1 text-xs tracking-widest uppercase",
                      children: "✦ Curated Luxury"
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  ref: headlineRef,
                  className: "mb-6",
                  style: { transformStyle: "preserve-3d" },
                  children: ["Discover", "Luxury", "Redefined"].map((word) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: "hero-word inline-block opacity-0 font-display font-black text-[clamp(3.5rem,10vw,8rem)] leading-none tracking-tight",
                      style: { marginRight: word !== "Redefined" ? "0.3em" : 0 },
                      children: word === "Luxury" ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: word }) : word
                    },
                    word
                  ))
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.p,
                {
                  initial: { opacity: 0, y: 20 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.8, delay: 0.8 },
                  className: "text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed",
                  children: "Meticulously sourced. Endlessly refined. Objects designed to outlast every trend and earn their place in your story."
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, y: 16 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 0.7, delay: 1 },
                  className: "flex flex-col sm:flex-row gap-4 items-center justify-center",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        size: "lg",
                        className: "glass border border-primary/40 bg-primary/10 text-foreground hover:bg-primary hover:text-primary-foreground px-8 py-4 text-sm tracking-wide font-semibold transition-smooth shadow-elevated group",
                        "data-ocid": "hero-shop-cta",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Sparkles,
                            {
                              size: 16,
                              className: "mr-2 group-hover:rotate-12 transition-smooth"
                            }
                          ),
                          "Shop the Collection"
                        ]
                      }
                    ) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: scrollToFeatured,
                        className: "text-muted-foreground hover:text-foreground text-sm tracking-wide transition-smooth flex items-center gap-2",
                        "data-ocid": "hero-explore-btn",
                        children: [
                          "Explore below",
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
                        ]
                      }
                    )
                  ]
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.button,
          {
            type: "button",
            onClick: scrollToFeatured,
            className: "absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-muted-foreground hover:text-primary transition-smooth",
            animate: { y: [0, 8, 0] },
            transition: {
              duration: 1.8,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut"
            },
            "aria-label": "Scroll down",
            "data-ocid": "hero-scroll-chevron",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 28, strokeWidth: 1.5 })
          }
        )
      ]
    }
  );
}
function FeaturedSection() {
  const { data: products, isLoading } = useFeaturedProducts();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      id: "featured",
      className: "py-24 px-6 max-w-7xl mx-auto",
      "data-ocid": "featured-section",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 32 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.7 },
            className: "mb-14 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "glass border-primary/30 text-primary mb-4 text-xs tracking-widest uppercase px-3 py-1",
                  children: "Handpicked"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-[clamp(2.2rem,5vw,4rem)] leading-tight mb-4", children: "Featured Products" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-md mx-auto text-base leading-relaxed", children: "Each piece curated for those who recognise the difference between ownership and possession." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-7", children: isLoading ? ["s-watch", "s-frag", "s-wallet", "s-bag"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, k)) : (products ?? []).map((product, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ProductCard, { product, index: i }, product.id)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            whileInView: { opacity: 1 },
            viewport: { once: true },
            transition: { duration: 0.6, delay: 0.3 },
            className: "mt-12 text-center",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                className: "glass border-border/60 px-8 gap-2 group",
                "data-ocid": "featured-view-all",
                children: [
                  "View All Products",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ArrowRight,
                    {
                      size: 15,
                      className: "group-hover:translate-x-1 transition-smooth"
                    }
                  )
                ]
              }
            ) })
          }
        )
      ]
    }
  );
}
function ShowcaseSection() {
  const sectionRef = reactExports.useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  const textX = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      ref: sectionRef,
      className: "relative py-24 overflow-hidden",
      style: { background: "oklch(0.14 0.01 40)" },
      "data-ocid": "showcase-section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { style: { x: textX }, className: "relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -40 },
            whileInView: { opacity: 1, x: 0 },
            viewport: { once: true },
            transition: { duration: 0.8 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "glass border-primary/30 text-primary mb-4 text-xs tracking-widest uppercase px-3 py-1",
                  children: "Interactive"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-black text-[clamp(2rem,4.5vw,3.8rem)] leading-tight mb-6", children: [
                "Explore in",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "Three Dimensions" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed mb-8 max-w-sm", children: "Drag to rotate. Discover every facet of our craftsmanship before it arrives at your door. Luxury deserves to be seen from every angle." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  size: "lg",
                  className: "glass border-primary/40 bg-primary/10 hover:bg-primary hover:text-primary-foreground gap-2 group transition-smooth",
                  "data-ocid": "showcase-cta",
                  children: [
                    "Shop Now",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ArrowRight,
                      {
                        size: 15,
                        className: "group-hover:translate-x-1 transition-smooth"
                      }
                    )
                  ]
                }
              ) })
            ]
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.85 },
            whileInView: { opacity: 1, scale: 1 },
            viewport: { once: true },
            transition: { duration: 1, ease: "easeOut" },
            className: "relative h-[400px] md:h-[520px] rounded-2xl overflow-hidden",
            style: { background: "oklch(0.11 0.02 240 / 0.5)" },
            "data-ocid": "showcase-3d-viewer",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ProductShowcase3D, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-muted-foreground glass px-3 py-1.5 rounded-full pointer-events-none", children: "✦ Drag to rotate" })
            ]
          }
        )
      ] })
    }
  );
}
function CategoriesSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 px-6", "data-ocid": "categories-section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 32 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.7 },
        className: "mb-12 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-[clamp(2rem,4.5vw,3.5rem)] leading-tight mb-3", children: "Shop by Category" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Explore our curated departments" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-5 md:overflow-visible scrollbar-hide", children: CATEGORIES.map((cat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, delay: i * 0.08 },
        className: "shrink-0 w-36 md:w-auto",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", search: { category: cat.label }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass-card flex flex-col items-center gap-3 cursor-pointer hover:-translate-y-2 transition-smooth hover:shadow-elevated text-center group",
            style: { background: cat.color },
            "data-ocid": `category-${cat.label.toLowerCase()}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl group-hover:scale-110 transition-smooth inline-block", children: cat.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm", children: cat.label })
            ]
          }
        ) })
      },
      cat.label
    )) })
  ] }) });
}
function StarRating({ rating }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-0.5", children: [1, 2, 3, 4, 5].map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Star,
    {
      size: 14,
      className: s <= rating ? "fill-primary text-primary" : "text-muted-foreground"
    },
    s
  )) });
}
function ReviewsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4e3);
    return () => {
      emblaApi.off("select", onSelect);
      clearInterval(interval);
    };
  }, [emblaApi]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-24 px-6 relative overflow-hidden",
      style: { background: "oklch(0.13 0.02 50)" },
      "data-ocid": "reviews-section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 32 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.7 },
            className: "mb-12 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "glass border-primary/30 text-primary mb-4 text-xs tracking-widest uppercase px-3 py-1",
                  children: "5-Star Stories"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-[clamp(2rem,4.5vw,3.5rem)] leading-tight", children: "What our clients say" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            whileInView: { opacity: 1 },
            viewport: { once: true },
            transition: { duration: 0.8, delay: 0.2 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-hidden", ref: emblaRef, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-5", children: REVIEWS.map((review) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "glass-card min-w-[min(360px,85vw)] flex flex-col gap-4",
                  "data-ocid": "review-card",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(StarRating, { rating: review.rating }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-display font-bold text-lg leading-snug", children: [
                      '"',
                      review.title,
                      '"'
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed flex-1", children: review.body }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-2 border-t border-border/20", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0",
                          style: {
                            background: "oklch(0.5 0.18 95 / 0.2)",
                            color: "oklch(0.65 0.2 95)"
                          },
                          children: review.userName[0]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-semibold", children: review.userName }),
                        review.verified && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-primary flex items-center gap-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 10 }),
                          " Verified Purchase"
                        ] })
                      ] })
                    ] })
                  ]
                },
                review.id
              )) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex justify-center gap-2 mt-8",
                  role: "tablist",
                  "aria-label": "Review slides",
                  children: REVIEWS.map((review, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      role: "tab",
                      "aria-selected": i === selectedIndex,
                      "aria-label": `Go to review ${i + 1}`,
                      onClick: () => emblaApi == null ? void 0 : emblaApi.scrollTo(i),
                      className: "transition-smooth",
                      "data-ocid": `review-dot-${i}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "block rounded-full transition-all duration-300",
                          style: {
                            width: i === selectedIndex ? "24px" : "8px",
                            height: "8px",
                            background: i === selectedIndex ? "oklch(0.65 0.2 95)" : "oklch(0.4 0 0)"
                          }
                        }
                      )
                    },
                    review.id
                  ))
                }
              )
            ]
          }
        )
      ] })
    }
  );
}
function BrandStorySection() {
  const sectionRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const ctx = gsapWithCSS.context(() => {
      gsapWithCSS.fromTo(
        ".brand-line",
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 60%",
            scrub: true
          }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      ref: sectionRef,
      className: "py-24 px-6 bg-background",
      "data-ocid": "brand-story-section",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 32 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.7 },
            className: "mb-16 text-center",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Badge,
                {
                  variant: "outline",
                  className: "glass border-primary/30 text-primary mb-4 text-xs tracking-widest uppercase px-3 py-1",
                  children: "Our Philosophy"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-black text-[clamp(2rem,4.5vw,3.5rem)] leading-tight", children: [
                "Built on principles,",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gradient", children: "not trends" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute left-6 md:left-1/2 top-0 bottom-0 w-px -ml-px hidden sm:block",
              style: { background: "oklch(0.3 0.02 50)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "brand-line absolute inset-0 w-full",
                  style: {
                    background: "oklch(0.65 0.2 95)",
                    transformOrigin: "top"
                  }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-10", children: BRAND_VALUES.map((value, i) => {
            const Icon = value.icon;
            const isLeft = i % 2 === 0;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, x: isLeft ? -40 : 40 },
                whileInView: { opacity: 1, x: 0 },
                viewport: { once: true },
                transition: { duration: 0.6, delay: 0.1 },
                className: `relative flex flex-col sm:flex-row items-start gap-6 sm:gap-10 ${!isLeft ? "sm:flex-row-reverse" : ""}`,
                "data-ocid": `brand-value-${value.title.toLowerCase()}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "absolute left-6 md:left-1/2 -ml-3 mt-1 hidden sm:flex w-6 h-6 rounded-full items-center justify-center z-10",
                      style: {
                        background: "oklch(0.65 0.2 95 / 0.2)",
                        border: "2px solid oklch(0.65 0.2 95)"
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: `glass-card flex gap-4 items-start w-full sm:w-[calc(50%-2rem)] ${!isLeft ? "sm:ml-auto" : "sm:mr-auto"}`,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "div",
                          {
                            className: "shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
                            style: { background: "oklch(0.65 0.2 95 / 0.15)" },
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 18, style: { color: "oklch(0.65 0.2 95)" } })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg", children: value.title }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Badge,
                              {
                                variant: "outline",
                                className: "text-[10px] border-border/40 text-muted-foreground",
                                children: value.year
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: value.description })
                        ] })
                      ]
                    }
                  )
                ]
              },
              value.title
            );
          }) })
        ] })
      ] })
    }
  );
}
function CtaBanner() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      className: "py-20 px-6 relative overflow-hidden",
      "data-ocid": "cta-banner",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "max-w-3xl mx-auto glass-card text-center",
          style: { background: "oklch(0.16 0.04 95 / 0.5)" },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, scale: 0.95 },
              whileInView: { opacity: 1, scale: 1 },
              viewport: { once: true },
              transition: { duration: 0.7 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-4xl mb-4", children: "✦" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-black text-[clamp(1.8rem,4vw,3rem)] leading-tight mb-4", children: "Begin your collection" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-8 max-w-sm mx-auto", children: "Free shipping on orders over $500. Returns accepted within 30 days. Lifetime warranty on select pieces." }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/products", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    size: "lg",
                    className: "bg-primary text-primary-foreground hover:bg-primary/90 px-10 gap-2 shadow-elevated group",
                    "data-ocid": "cta-banner-btn",
                    children: [
                      "Shop Now",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        ArrowRight,
                        {
                          size: 16,
                          className: "group-hover:translate-x-1 transition-smooth"
                        }
                      )
                    ]
                  }
                ) })
              ]
            }
          )
        }
      )
    }
  );
}
function HomePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FeaturedSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ShowcaseSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CategoriesSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ReviewsSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BrandStorySection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CtaBanner, {})
  ] });
}
export {
  HomePage
};
