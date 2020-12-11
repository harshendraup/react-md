import {
  applyRef,
  getPercentage,
  useDir,
  useIsomorphicLayoutEffect,
} from "@react-md/utils";
import {
  KeyboardEventHandler,
  MouseEventHandler,
  Ref,
  RefCallback,
  TouchEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { DEFAULT_SLIDER_ANIMATION_TIME } from "./constants";
import {
  DefinedSliderValueOptions,
  SimpleSliderControls,
  SliderDragEvent,
  SliderDraggingBy,
  SliderEventHandlers,
  SliderPresentation,
  SliderThumbIndex,
  ThumbIndex,
} from "./types";
import {
  CombinedSliderControls,
  getDragValue,
  isMouseEvent,
  isRangeSlider,
  isTouchEvent,
  SliderDragValues,
} from "./utils";

export type SliderControlsOptions = CombinedSliderControls &
  SliderPresentation &
  SliderEventHandlers &
  DefinedSliderValueOptions & {
    ref?: Ref<HTMLSpanElement | null>;
    thumb1Ref?: Ref<HTMLSpanElement | null>;
    thumb2Ref?: Ref<HTMLSpanElement | null>;
    animationDuration?: number;
  };

const VALID_KEYS = [
  "ArrowDown",
  "ArrowUp",
  "ArrowLeft",
  "ArrowRight",
  "Home",
  "End",
  // "PageUp",
  // "PageDown"
];

export interface SliderControls {
  thumb1Ref: RefCallback<HTMLSpanElement | null>;
  thumb1Value: number;
  thumb1Percentage: string;
  thumb2Ref: RefCallback<HTMLSpanElement | null>;
  thumb2Value?: number;
  thumb2Percentage?: string;
  dragging: boolean;
  draggingIndex: SliderThumbIndex;
  ref: RefCallback<HTMLSpanElement | null>;
  onKeyDown: KeyboardEventHandler<HTMLSpanElement>;
  onMouseDown: MouseEventHandler<HTMLSpanElement>;
  onTouchStart: TouchEventHandler<HTMLSpanElement>;
}

export function useSliderControls({
  ref,
  thumb1Ref: propThumb1Ref,
  thumb2Ref: propThumb2Ref,
  min,
  max,
  step,
  disabled = false,
  vertical = false,
  onKeyDown,
  onMouseDown,
  onTouchStart,
  animationDuration = DEFAULT_SLIDER_ANIMATION_TIME,
  ...controls
}: SliderControlsOptions): SliderControls {
  const trackRef = useRef<HTMLSpanElement | null>(null);
  const thumb1Ref = useRef<HTMLSpanElement | null>(null);
  const thumb2Ref = useRef<HTMLSpanElement | null>(null);
  const [dragging, setDragging] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState<SliderThumbIndex>(null);
  const [draggingBy, setDraggingBy] = useState<SliderDraggingBy>(null);
  const controlsRef = useRef(controls);
  useIsomorphicLayoutEffect(() => {
    controlsRef.current = controls;
  });

  const { dir } = useDir();
  const isRtl = dir === "rtl";
  const drag = useCallback(
    (event: SliderDragEvent) => {
      const track = trackRef.current;
      const slider1 = thumb1Ref.current;
      const slider2 = thumb2Ref.current;
      const { altKey, ctrlKey, metaKey, shiftKey } = event;
      if (
        altKey ||
        ctrlKey ||
        metaKey ||
        shiftKey ||
        disabled ||
        !track ||
        !slider1 ||
        (isMouseEvent(event) && event.button !== 0) ||
        (!isMouseEvent(event) && !isTouchEvent(event))
      ) {
        return;
      }

      // prevent text from being highlighted while dragging the slider
      // can't do it on touch events due to being passive events in later
      // versions of React
      if (!isTouchEvent(event)) {
        event.preventDefault();
      }
      event.stopPropagation();
      let clientX: number;
      let clientY: number;
      if (isMouseEvent(event)) {
        ({ clientX, clientY } = event);
      } else {
        const touch = event.changedTouches[0];
        ({ clientX, clientY } = touch);
      }

      let index: ThumbIndex = 0;
      let slider: HTMLSpanElement = slider1;
      if (slider2) {
        if (draggingIndex === null) {
          const x1 = slider1.getBoundingClientRect().x;
          const x2 = slider2.getBoundingClientRect().x;
          const y1 = slider1.getBoundingClientRect().y;
          const y2 = slider2.getBoundingClientRect().y;
          if (vertical) {
            index = Math.abs(clientY - y1) < Math.abs(clientY - y2) ? 0 : 1;
          } else {
            index = Math.abs(clientX - x1) < Math.abs(clientX - x2) ? 0 : 1;
          }
        } else {
          index = draggingIndex;
        }

        slider = index === 0 ? slider1 : slider2;
      }

      if (draggingIndex !== index) {
        slider.focus();
        setDraggingIndex(index);
      }

      setDraggingBy(isMouseEvent(event) ? "mouse" : "touch");

      const { left, top, height, width } = track.getBoundingClientRect();
      const options: SliderDragValues = {
        min,
        max,
        step,
        vertical,
        clientX,
        clientY,
        left,
        top,
        height,
        width,
        isRtl,
        minValue: min,
        maxValue: max,
      };

      const controls = controlsRef.current;
      if (isRangeSlider(controls)) {
        controls.setValue(([thumb1Value, thumb2Value]) => {
          const value = getDragValue({
            ...options,
            minValue: index === 0 ? min : thumb1Value,
            maxValue: index === 1 ? max : thumb2Value,
          });

          return index === 0 ? [value, thumb2Value] : [thumb1Value, value];
        });
      } else {
        controls.setValue(getDragValue(options));
      }
    },
    [disabled, isRtl, draggingIndex, max, min, step, vertical]
  );
  const stop = useCallback(() => {
    setDragging(false);
    setDraggingIndex(null);
    setDraggingBy(null);
  }, []);

  useEffect(() => {
    if (draggingBy === null) {
      return;
    }

    if (draggingBy === "mouse") {
      window.addEventListener("mousemove", drag);
      window.addEventListener("mouseup", stop);
    } else {
      window.addEventListener("touchmove", drag);
      window.addEventListener("touchend", stop);
    }

    return () => {
      if (draggingBy === "mouse") {
        window.removeEventListener("mousemove", drag);
        window.removeEventListener("mouseup", stop);
      } else {
        window.removeEventListener("touchmove", drag);
        window.removeEventListener("touchend", stop);
      }
    };
  }, [draggingBy, drag, stop]);

  useEffect(() => {
    if (draggingIndex === null && draggingBy === null) {
      return;
    }

    if (draggingIndex === null) {
      setDragging(false);
      return;
    }

    const timeout = window.setTimeout(() => {
      setDragging(true);
    }, animationDuration);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [draggingIndex, draggingBy, animationDuration]);

  const handleMouseDown = useCallback<MouseEventHandler<HTMLSpanElement>>(
    (event) => {
      if (onMouseDown) {
        onMouseDown(event);
      }

      if (draggingBy === null) {
        drag(event);
      }
    },
    [drag, draggingBy, onMouseDown]
  );

  const handleTouchStart = useCallback<TouchEventHandler<HTMLSpanElement>>(
    (event) => {
      if (onTouchStart) {
        onTouchStart(event);
      }

      if (draggingBy === null) {
        drag(event);
      }
    },
    [drag, draggingBy, onTouchStart]
  );

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLSpanElement>>(
    (event) => {
      if (onKeyDown) {
        onKeyDown(event);
      }

      const { key, altKey, ctrlKey, metaKey, shiftKey } = event;
      if (
        altKey ||
        ctrlKey ||
        metaKey ||
        shiftKey ||
        disabled ||
        !VALID_KEYS.includes(key)
      ) {
        return;
      }

      let controls: Omit<SimpleSliderControls, "setValue" | "value">;
      if (isRangeSlider(controlsRef.current)) {
        const { increment, decrement, minimum, maximum } = controlsRef.current;
        const slider = (event.target as HTMLSpanElement).closest(
          '[role="slider"]'
        );

        const index = slider === thumb2Ref.current ? 1 : 0;
        controls = {
          increment: increment.bind(null, index),
          decrement: decrement.bind(null, index),
          minimum: minimum.bind(null, index),
          maximum: maximum.bind(null, index),
        };
      } else {
        controls = controlsRef.current;
      }

      const { increment, decrement, minimum, maximum } = controls;
      event.preventDefault();
      event.stopPropagation();
      switch (key) {
        case "ArrowUp":
        case "ArrowRight":
          increment();
          break;
        case "ArrowDown":
        case "ArrowLeft":
          decrement();
          break;
        case "Home":
          minimum();
          break;
        case "End":
          maximum();
          break;
      }
    },
    [onKeyDown, disabled]
  );

  let thumb1Value: number;
  let thumb1Percentage: string;
  let thumb2Value: number | undefined;
  let thumb2Percentage: string | undefined;
  if (isRangeSlider(controls)) {
    [thumb1Value, thumb2Value] = controls.value;
    thumb1Percentage = `${getPercentage(min, max, thumb1Value) * 100}%`;
    thumb2Percentage = `${getPercentage(min, max, thumb2Value) * 100}%`;
  } else {
    thumb1Value = controls.value;
    thumb1Percentage = `${getPercentage(min, max, thumb1Value) * 100}%`;
  }

  const trackRefHandler = useCallback(
    (instance: HTMLSpanElement | null) => {
      applyRef(instance, ref);
      trackRef.current = instance;
    },
    [ref]
  );

  const thumb1RefHandler = useCallback(
    (instance: HTMLSpanElement | null) => {
      applyRef(instance, propThumb1Ref);
      thumb1Ref.current = instance;
    },
    [propThumb1Ref]
  );

  const thumb2RefHandler = useCallback(
    (instance: HTMLSpanElement | null) => {
      applyRef(instance, propThumb2Ref);
      thumb2Ref.current = instance;
    },
    [propThumb2Ref]
  );

  return {
    thumb1Ref: thumb1RefHandler,
    thumb1Value,
    thumb1Percentage,
    thumb2Ref: thumb2RefHandler,
    thumb2Value,
    thumb2Percentage,
    dragging,
    draggingIndex,
    ref: trackRefHandler,
    onKeyDown: handleKeyDown,
    onMouseDown: handleMouseDown,
    onTouchStart: handleTouchStart,
  };
}
