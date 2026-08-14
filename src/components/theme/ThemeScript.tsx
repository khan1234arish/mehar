import React from 'react';

/**
 * Injected into <head> to immediately resolve the theme from localStorage
 * or window.matchMedia before the browser paints, preventing any theme flash.
 */
export function ThemeScript() {
  const themeInitCode = `
(function() {
  try {
    var key = 'mehar-theme';
    var stored = localStorage.getItem(key);
    var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    var isDark = stored === 'dark' || ((!stored || stored === 'system') && prefersDark);
    var root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
  } catch (e) {}
})();
  `;

  return (
    <script
      id="mehar-theme-init"
      dangerouslySetInnerHTML={{ __html: themeInitCode }}
    />
  );
}
