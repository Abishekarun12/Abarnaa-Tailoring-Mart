/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * Recolors the Studio chrome (nav bar, buttons, focus rings) to match the
 * site's gold/maroon brand palette from `src/app/globals.css`. Only the
 * brand-facing keys are overridden — status colors (info/success/warning/
 * danger) are left at their defaults so error/warning states stay legible.
 */

import { buildLegacyTheme } from 'sanity';

export const studioTheme = buildLegacyTheme({
  '--font-family-base': "'Inter', sans-serif",
  '--font-family-monospace': "'Space Grotesk', monospace",

  '--black': '#2a0c12', // maroon-950
  '--white': '#fdfbf7', // gold-50

  '--brand-primary': '#9c5f25', // gold-700

  '--component-bg': '#ffffff',
  '--component-text-color': '#40121b', // maroon-900

  '--main-navigation-color': '#40121b', // maroon-900
  '--main-navigation-color--inverted': '#fdfbf7', // gold-50

  '--focus-color': '#d49842', // gold-500

  '--default-button-color': '#40121b', // maroon-900
  '--default-button-primary-color': '#9c5f25', // gold-700
  '--default-button-success-color': '#2f855a',
  '--default-button-warning-color': '#bc7c31', // gold-600
  '--default-button-danger-color': '#c53030',

  '--state-info-color': '#3182ce',
  '--state-success-color': '#2f855a',
  '--state-warning-color': '#bc7c31', // gold-600
  '--state-danger-color': '#c53030',

  '--gray-base': '#78716c', // stone-500
  '--gray': '#78716c',
});
