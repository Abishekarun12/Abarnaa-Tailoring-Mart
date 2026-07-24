# Connecting the Contact & Fitting Forms to a Google Sheet

The site's Contact form and Fitting Scheduler form both submit to a Google Sheet
through a free **Google Apps Script Web App** — no backend server or Google
login required for your visitors. This is a one-time, ~5 minute setup you do
in your own Google account.

## 1. Create the Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new blank spreadsheet.
   Name it something like **"Abarnaa Tailoring Mart — Inquiries"**.
2. In row 1, add these column headers exactly:

   | A | B | C | D | E | F | G | H | I |
   |---|---|---|---|---|---|---|---|---|
   | Timestamp | Form Type | Name | Email | Phone | Fitting Type | Date | Time | Notes/Message |

## 2. Add the Apps Script

1. In the Sheet, go to **Extensions → Apps Script**.
2. Delete any starter code in `Code.gs` and paste the following:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);

  sheet.appendRow([
    data.timestamp || new Date().toISOString(),
    data.formType || '',
    data.name || '',
    data.email || '',
    data.phone || '',
    data.fittingType || '',
    data.date || '',
    data.time || '',
    data.notes || data.message || ''
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ status: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Click **Save** (name the project anything, e.g. "Abarnaa Inquiry Handler").

## 3. Deploy as a Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon next to "Select type" and choose **Web app**.
3. Set:
   - **Execute as:** Me (your Google account)
   - **Who has access:** Anyone
4. Click **Deploy**, then **Authorize access** and approve the permissions
   (it only touches this one spreadsheet).
5. Copy the **Web app URL** shown — it looks like:
   `https://script.google.com/macros/s/AKfycb.../exec`

## 4. Wire it into the site

1. Open `.env` in the project root.
2. Set:
   ```
   VITE_SHEETS_WEBAPP_URL="https://script.google.com/macros/s/AKfycb.../exec"
   ```
3. Restart `npm run dev` (env vars are only read at server start).

## Notes & limitations

- The site sends form data with `fetch(..., { mode: 'no-cors' })` because Apps
  Script Web Apps don't return CORS headers. This means the browser can't read
  the actual response — a successful `fetch()` call (no thrown network error)
  is treated as success. If the Apps Script itself errors (e.g. a bad header
  name), the row simply won't appear, with no error shown on the site. If rows
  aren't showing up, first check the Apps Script **Executions** log
  (in the Apps Script editor sidebar) for errors.
- If you ever edit the header row or the script, redeploy via
  **Deploy → Manage deployments → Edit → New version** — editing the code
  alone does not update the live Web App URL's behavior until redeployed.
- Every deployed Web App URL only works with the exact `doPost` code active at
  deploy time, and always writes into the **active sheet** — if you add more
  tabs, keep the Contact/Fitting data on the first sheet tab, or update the
  script to target a specific tab via `getSheetByName('SheetName')`.
