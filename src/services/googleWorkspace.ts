/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { DriveFileItem, BookingDetails } from '../types';

/**
 * ----------------------------------------------------
 * GOOGLE DRIVE SERVICE
 * ----------------------------------------------------
 */

const MAIN_FOLDER_NAME = 'Abarnaa Tailoring Mart - Blouses';

// Helper to handle general fetch errors
async function handleResponse(res: Response, errorSource: string) {
  if (!res.ok) {
    let errorDetails = '';
    try {
      const errJson = await res.json();
      errorDetails = JSON.stringify(errJson);
    } catch {
      errorDetails = await res.text();
    }
    throw new Error(`Google Workspace ${errorSource} error (${res.status}): ${errorDetails}`);
  }
}

/**
 * Searches for the primary tailoring shop folder in Drive.
 * If not found, creates it.
 */
export async function getOrCreateGalleryFolder(accessToken: string): Promise<string> {
  const query = `name = '${MAIN_FOLDER_NAME}' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name)`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  await handleResponse(res, 'Drive search');
  const data = await res.json();

  if (data.files && data.files.length > 0) {
    return data.files[0].id;
  }

  // Folder doesn't exist, create it
  const createUrl = 'https://www.googleapis.com/drive/v3/files';
  const folderMetadata = {
    name: MAIN_FOLDER_NAME,
    mimeType: 'application/vnd.google-apps.folder',
  };

  const createRes = await fetch(createUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(folderMetadata),
  });
  await handleResponse(createRes, 'Drive folder creation');
  const folder = await createRes.json();
  return folder.id;
}

/**
 * Lists all blouse files inside our dedicated boutique folder.
 */
export async function listGalleryImages(accessToken: string, folderId: string): Promise<DriveFileItem[]> {
  const query = `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`;
  const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(query)}&fields=files(id,name,mimeType,thumbnailLink,webContentLink,webViewLink)&pageSize=30`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  await handleResponse(res, 'Drive list files');
  const data = await res.json();
  return data.files || [];
}

/**
 * Uploads a blouse image file directly to our Google Drive folder.
 */
export async function uploadGalleryImage(
  accessToken: string,
  folderId: string,
  file: File
): Promise<DriveFileItem> {
  const metadata = {
    name: `${Date.now()}-${file.name}`,
    parents: [folderId],
  };

  // Construct multipart body for file and meta
  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  // Reader to encode file block as Base64
  const fileBase64 = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });

  const multipartBody = [
    delimiter,
    'Content-Type: application/json; charset=UTF-8\r\n\r\n',
    JSON.stringify(metadata),
    delimiter,
    `Content-Type: ${file.type}\r\n`,
    'Content-Transfer-Encoding: base64\r\n\r\n',
    fileBase64,
    closeDelimiter,
  ].join('');

  const uploadUrl = 'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,thumbnailLink,webContentLink,webViewLink';

  const res = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': `multipart/related; boundary=${boundary}`,
    },
    body: multipartBody,
  });
  await handleResponse(res, 'Drive file upload');
  return await res.json();
}


/**
 * ----------------------------------------------------
 * GOOGLE CALENDAR SERVICE
 * ----------------------------------------------------
 */

export async function createFittingAppointment(
  accessToken: string,
  booking: BookingDetails
): Promise<any> {
  const calendarUrl = 'https://www.googleapis.com/calendar/v3/calendars/primary/events';

  // Appointment duration is approximately 45 minutes
  const startDateTime = `${booking.date}T${booking.time}:00`;
  const startDate = new Date(startDateTime);
  const endDate = new Date(startDate.getTime() + 45 * 60 * 1000);
  
  // Convert standard date object to local ISO offset or string
  // Indian timezone offset is UTC+5:30. Let's send localized string format.
  const formatISOWithTZ = (d: Date) => {
    const pad = (n: number) => String(n).padStart(2, '0');
    const year = d.getFullYear();
    const month = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    const hours = pad(d.getHours());
    const minutes = pad(d.getMinutes());
    const seconds = pad(d.getSeconds());
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}+05:30`;
  };

  const startFormatted = formatISOWithTZ(startDate);
  const endFormatted = formatISOWithTZ(endDate);

  const eventBody = {
    summary: `Fitting Session: ${booking.name} (${booking.fittingType})`,
    description: `Fittings scheduler request from Abarnaa Tailoring Mart web app.\n\nCustomer Phone: ${booking.phone}\nFitting Service Type: ${booking.fittingType}\nSpecial Request/Note: ${booking.notes || 'None'}`,
    start: {
      dateTime: startFormatted,
      timeZone: 'Asia/Kolkata',
    },
    end: {
      dateTime: endFormatted,
      timeZone: 'Asia/Kolkata',
    },
    attendees: [
      { email: booking.email, responseStatus: 'accepted' },
      { email: 'abiakpro7708@gmail.com' }
    ],
    reminders: {
      useDefault: true,
    }
  };

  const res = await fetch(calendarUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventBody),
  });
  await handleResponse(res, 'Calendar booking');
  return await res.json();
}


/**
 * ----------------------------------------------------
 * GMAIL SERVICE
 * ----------------------------------------------------
 */

export async function sendBoutiqueInquiryEmail(
  accessToken: string,
  formData: {
    name: string;
    email: string;
    phone: string;
    message: string;
  }
): Promise<any> {
  const gmailUrl = 'https://gmail.googleapis.com/v1/users/me/messages/send';

  // Construct standard MIME transaction block
  const emailContent = [
    `To: abiakpro7708@gmail.com`,
    `Subject: Abarnaa Tailoring Mart: Inquiry from ${formData.name}`,
    `Content-Type: text/html; charset=utf-8`,
    `MIME-Version: 1.0`,
    ``,
    `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #f5e6c4; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);">`,
    `  <div style="background-color: #9c5f25; padding: 24px; color: #fff; text-align: center;">`,
    `    <h1 style="margin: 0; font-family: Georgia, serif; font-size: 24px;">Abarnaa Tailoring Mart</h1>`,
    `    <p style="margin: 4px 0 0 0; font-size: 14px; opacity: 0.9;">New Customer Inquiry Alert</p>`,
    `  </div>`,
    `  <div style="padding: 24px; background-color: #fdfbf7; color: #333; line-height: 1.6;">`,
    `    <h3 style="color: #663a1b; margin-top: 0; border-bottom: 2px solid #ecd29b; padding-bottom: 8px;">Inquiry Details</h3>`,
    `    <table style="width: 100%; border-collapse: collapse;">`,
    `      <tr>`,
    `        <td style="padding: 6px 0; font-weight: bold; width: 120px;">Customer Name:</td>`,
    `        <td style="padding: 6px 0;">${formData.name}</td>`,
    `      </tr>`,
    `      <tr>`,
    `        <td style="padding: 6px 0; font-weight: bold;">Email Address:</td>`,
    `        <td style="padding: 6px 0;"><a href="mailto:${formData.email}" style="color: #bc7c31;">${formData.email}</a></td>`,
    `      </tr>`,
    `      <tr>`,
    `        <td style="padding: 6px 0; font-weight: bold;">Phone Number:</td>`,
    `        <td style="padding: 6px 0;"><a href="tel:${formData.phone}" style="color: #bc7c31;">${formData.phone}</a></td>`,
    `      </tr>`,
    `    </table>`,
    `    <div style="margin-top: 20px; background-color: #fff; border: 1px solid #f5e6c4; border-radius: 6px; padding: 16px;">`,
    `      <p style="margin: 0 0 8px 0; font-weight: bold; color: #663a1b;">Customer Message:</p>`,
    `      <p style="margin: 0; white-space: pre-wrap; font-style: italic; color: #555;">"${formData.message}"</p>`,
    `    </div>`,
    `  </div>`,
    `  <div style="background-color: #f5e6c4; text-align: center; padding: 12px; font-size: 12px; color: #663a1b;">`,
    `    This message was sent securely from <a href="https://abarnaa-tailoring-mart.run.app" style="color: #bc7c31; text-decoration: none; font-weight: bold;">Abarnaa Tailoring Mart Portal</a>.`,
    `  </div>`,
    `</div>`
  ].join('\r\n');

  // Base64URL encoding function for correct MIME parsing
  const base64UrlEncode = (str: string) => {
    return btoa(unescape(encodeURIComponent(str)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  };

  const rawMessage = base64UrlEncode(emailContent);

  const res = await fetch(gmailUrl, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ raw: rawMessage }),
  });
  await handleResponse(res, 'Gmail sending');
  return await res.json();
}
