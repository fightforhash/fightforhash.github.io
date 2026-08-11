import React, { useEffect, useRef, useState } from 'react';
import { DitheringShader } from './dithering-shader';
import { usePrefersReducedMotion, useGridEnabled } from './GridOverlay';

const BASE_SPEED = 0.35;
const PULSE_SPEED = 1.6;

interface ShaderFieldProps {
  /** Ref to the element whose visibility gates the render loop. */
  containerRef: React.RefObject<HTMLElement | null>;
  /** Set to a timestamp-ish value to surge the field briefly. */
  pulseUntil?: number;
}

/**
 * The dithering shader, demoted from centrepiece to background energy
 * field: slow, low opacity, cyan, with the console sitting on top.
 *
 * The shader file itself is untouched — everything here is gating. It
 * runs a permanent rAF loop, so it is unmounted whenever it cannot be
 * seen (offscreen, hidden tab), when motion is reduced, or when the
 * visitor turns the grid off.
 */
export const ShaderField: React.FC<ShaderFieldProps> = ({ containerRef, pulseUntil }) => {
  const reducedMotion = usePrefersReducedMotion();
  const gridEnabled = useGridEnabled();

  const [size, setSize] = useState({ width: 0, height: 0 });
  const [visible, setVisible] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);
  const [speed, setSpeed] = useState(BASE_SPEED);
  const pulseTimer = useRef<number | null>(null);

  // Track viewport size
  useEffect(() => {
    const onResize = () => setSize({ width: window.innerWidth, height: window.innerHeight });
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Stop the loop when the hero scrolls away
  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);

  // Stop the loop when the tab is backgrounded
  useEffect(() => {
    const onVisibility = () => setPageVisible(!document.hidden);
    onVisibility();
    document.addEventListener('visibilitychange', onVisibility);
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // Console pulse (`ping` energises the field)
  useEffect(() => {
    if (!pulseUntil) return;
    setSpeed(PULSE_SPEED);
    if (pulseTimer.current) window.clearTimeout(pulseTimer.current);
    pulseTimer.current = window.setTimeout(() => setSpeed(BASE_SPEED), pulseUntil - Date.now());
    return () => {
      if (pulseTimer.current) window.clearTimeout(pulseTimer.current);
    };
  }, [pulseUntil]);

  const shouldRender =
    !reducedMotion && gridEnabled && visible && pageVisible && size.width > 0;

  if (!shouldRender) return null;

  return (
    <div className="absolute inset-0 opacity-[0.15]" aria-hidden="true">
      <DitheringShader
        width={size.width}
        height={size.height}
        colorBack="#04060a"
        colorFront="#00f0ff"
        shape="wave"
        type="8x8"
        pxSize={3}
        speed={speed}
      />
    </div>
  );
};
