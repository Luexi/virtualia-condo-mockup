import { useEffect, useRef, useState } from "react";

// Respeta la preferencia del sistema de reducir movimiento.
export function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * Observa un elemento y avisa cuando entra al viewport.
 * Con `once` (default) deja de observar tras la primera aparicion.
 * Si el usuario pidio reducir movimiento, reporta visible de inmediato.
 */
export function useInView({ rootMargin = "0px 0px -12% 0px", threshold = 0.15, once = true } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if (inView) return; // ya visible (p. ej. reduced-motion) — no hace falta observar
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [inView, rootMargin, threshold, once]);

  return [ref, inView];
}

/**
 * Helper para scroll-reveal: devuelve [ref, className].
 * El movimiento (translateY + opacity, con stagger) vive en landing.css.
 */
export function useReveal(options) {
  const [ref, inView] = useInView(options);
  const className = "reveal" + (inView ? " is-visible" : "");
  return [ref, className];
}

/**
 * Anima un número de 0 -> target con requestAnimationFrame cuando `active` es true.
 * Respeta reduced-motion (entrega el valor final sin animar).
 */
export function useCountUp(target, active, { duration = 1200 } = {}) {
  const [value, setValue] = useState(() => (prefersReducedMotion() ? target : 0));
  const startedRef = useRef(false);

  useEffect(() => {
    if (!active || startedRef.current) return;
    startedRef.current = true;

    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }

    let raf = 0;
    let start = 0;
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      if (!start) start = now;
      const progress = Math.min(1, (now - start) / duration);
      setValue(target * easeOut(progress));
      if (progress < 1) raf = requestAnimationFrame(tick);
      else setValue(target);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}
