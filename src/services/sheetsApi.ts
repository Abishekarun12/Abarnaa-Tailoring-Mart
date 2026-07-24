/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ----------------------------------------------------
 * GOOGLE SHEETS SERVICE (via Apps Script Web App)
 * ----------------------------------------------------
 * Submits form data to a Google Apps Script Web App bound to a Google Sheet.
 * See GOOGLE_SHEETS_SETUP.md for how to create and deploy the script.
 */

const SHEETS_WEBAPP_URL = import.meta.env.VITE_SHEETS_WEBAPP_URL as string | undefined;

export type SheetFormType = 'Contact Inquiry' | 'Fitting Booking';

export async function submitToSheet(
  fields: Record<string, string>,
  formType: SheetFormType
): Promise<void> {
  if (!SHEETS_WEBAPP_URL) {
    throw new Error(
      'Google Sheet connection is not configured yet. Set VITE_SHEETS_WEBAPP_URL in your .env file (see GOOGLE_SHEETS_SETUP.md).'
    );
  }

  // Apps Script Web Apps do not return CORS headers on their response, so we
  // use `no-cors` and treat a completed fetch (no thrown network error) as success.
  // The Apps Script side is responsible for actually appending the row.
  await fetch(SHEETS_WEBAPP_URL, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({
      formType,
      timestamp: new Date().toISOString(),
      ...fields,
    }),
  });
}
