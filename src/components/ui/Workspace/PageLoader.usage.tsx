"use client";

import { useState } from "react";
import PageLoader from "./Pageloader";

/**
 * Example: Use PageLoader in your root layout or a page component.
 *
 * Option A — Root Layout (app/layout.tsx)
 * Wrap the children with the loader so it plays once on first load.
 *
 * Option B — Individual page (shown below)
 * Gate the page content behind the loader's onComplete callback.
 */
export default function PortfolioPage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Loader renders on top; calls onComplete when its exit animation finishes */}
      {!loaded && (
        <PageLoader
          duration={1800}        // total ms including exit: tweak between 1500–2200
          onComplete={() => setLoaded(true)}
        />
      )}

      {/* Your page content — hidden but mounted so fonts/images preload */}
      <main
        style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 500ms ease 100ms, transform 500ms ease 100ms",
        }}
      >
        <h1>Portfolio</h1>
        {/* ... rest of page */}
      </main>
    </>
  );
}

/*
────────────────────────────────────────────────
CSS VARIABLES — add these to your global stylesheet
(already present if you have the theme system in place)
────────────────────────────────────────────────

:root {
  --bg-base:              #0a0a0f;
  --text-primary:         #e8e8ff;
  --accent-primary:       #7b5cfa;
  --accent-secondary:     #22d3ee;
  --accent-primary-glow:  rgba(123, 92, 250, 0.6);
  --font-display:         'Your Display Font', serif;
}

[data-theme="retro"] {
  --bg-base:              #0d1200;
  --text-primary:         #33ff44;
  --accent-primary:       #33ff44;
  --accent-secondary:     #ffaa00;
  --accent-primary-glow:  rgba(51, 255, 68, 0.55);
  --font-display:         'Courier New', monospace;
}
*/