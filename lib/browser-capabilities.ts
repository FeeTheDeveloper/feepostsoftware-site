type BrowserWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: typeof AudioContext;
  };

type TouchNavigator = Navigator & {
  msMaxTouchPoints?: number;
};

export function getNavigatorUserAgent() {
  if (typeof navigator === "undefined") {
    return "";
  }

  return navigator.userAgent || "";
}

export function isTouchDevice() {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }

  const touchNavigator = navigator as TouchNavigator;
  const coarsePointer =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: coarse)").matches;

  return (
    coarsePointer ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    (touchNavigator.msMaxTouchPoints ?? 0) > 0
  );
}

export function isIOS() {
  if (typeof navigator === "undefined") {
    return false;
  }

  const platform = navigator.platform || "";
  const userAgent = getNavigatorUserAgent();

  return (
    /iPad|iPhone|iPod/.test(userAgent) ||
    /iPad|iPhone|iPod/.test(platform) ||
    (platform === "MacIntel" && navigator.maxTouchPoints > 1)
  );
}

export function isMobileSafari() {
  const userAgent = getNavigatorUserAgent();

  if (!userAgent) {
    return false;
  }

  const isSafari = /Safari/.test(userAgent);
  const isOtherIOSBrowser = /CriOS|FxiOS|EdgiOS|OPiOS|DuckDuckGo/.test(userAgent);
  const mobileApple = isIOS() || /Mobile\/.*Safari/.test(userAgent);

  return isSafari && !isOtherIOSBrowser && mobileApple;
}

export function supportsWebGL() {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }

  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export function supportsAudioContext() {
  if (typeof window === "undefined") {
    return false;
  }

  const browserWindow = window as BrowserWindow;
  return Boolean(browserWindow.AudioContext || browserWindow.webkitAudioContext);
}

export function supportsMatchMediaChangeEvent() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }

  try {
    const mediaQuery = window.matchMedia("(pointer: fine)");
    return typeof mediaQuery.addEventListener === "function";
  } catch {
    return false;
  }
}

export function getAudioContextConstructor() {
  if (!supportsAudioContext()) {
    return null;
  }

  const browserWindow = window as BrowserWindow;
  return browserWindow.AudioContext || browserWindow.webkitAudioContext || null;
}
