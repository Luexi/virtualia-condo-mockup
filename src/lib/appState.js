import { useCallback, useEffect, useState } from "react";
import { normalizeRoute, toHash } from "./routes.js";

function readHashRoute() {
  return normalizeRoute(window.location.hash.slice(1));
}

export function useHashRoute() {
  const [route, setRouteState] = useState(() => readHashRoute());

  useEffect(() => {
    if (!window.location.hash && route !== "landing") {
      window.history.replaceState(null, "", toHash(route));
    }

    const onHashChange = () => setRouteState(readHashRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, [route]);

  const navigate = useCallback((nextRoute) => {
    const normalized = normalizeRoute(nextRoute);
    if (window.location.hash !== toHash(normalized)) {
      window.location.hash = `/${normalized}`;
    }
    setRouteState(normalized);
  }, []);

  return [route, navigate];
}

export function useToast() {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message) => {
    setToast(message);
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setToast(null), 2400);
  }, []);

  return [showToast, toast, () => setToast(null)];
}
