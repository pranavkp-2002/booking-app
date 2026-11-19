"use client";

import { Suspense, use } from "react";
import { browser } from "react-dom";

function Inner({ children }) {
  // Suspends during server prerender, so `children` only ever runs in the browser.
  use(browser("Depends on the visitor's current date and time."));
  return children();
}

/**
 * Renders `children()` only in the browser, showing `fallback` in the prerendered HTML.
 * Use for UI that depends on the current date/time (it would otherwise be frozen at build time).
 */
export default function BrowserOnly({ fallback = null, children }) {
  return (
    <Suspense fallback={fallback}>
      <Inner>{children}</Inner>
    </Suspense>
  );
}
