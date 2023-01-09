import { GoogleSpreadsheet, GoogleSpreadsheetWorksheet } from 'google-spreadsheet';

import config from '@core/config';

const { spreadsheet } = config;

let docInitialized: GoogleSpreadsheet;

// eslint-disable-next-line no-shadow
export enum Actions {
  UPLOAD = 'upload',
  PREVIEW = 'preview',
}

const SHEET_HEADERS = {
  CREATED_AT: 'created at',
  FINGERPRINT: 'fingerprint',
  PATH: 'path',
  ACTION: 'action',
};

const getDoc = async () => {
  if (docInitialized) {
    return docInitialized;
  }

  const doc = new GoogleSpreadsheet(spreadsheet.id);
  await doc.useServiceAccountAuth({
    client_email: spreadsheet.clientEmail,
    private_key: spreadsheet.privateKey,
  });

  await doc.loadInfo();
  docInitialized = doc;
  return doc;
};

const createSheet = async (title: string) => {
  const doc = await getDoc();
  return doc.addSheet({ title, headerValues: Object.values(SHEET_HEADERS) });
};

export const collect = async (fingerprint: string, path: string, action: Actions) => {
  try {
    const date = new Date();
    const currentMonth = date.toLocaleString('fr-FR', { month: 'long' });
    const title = `${currentMonth} ${date.getFullYear()}`;

    let sheet: GoogleSpreadsheetWorksheet;
    const doc = await getDoc();

    if (!doc.sheetsByTitle[title]) {
      sheet = await createSheet(title);
    } else {
      sheet = doc.sheetsByTitle[title];
    }

    await sheet.addRow({
      [SHEET_HEADERS.CREATED_AT]: date.toLocaleString('fr-FR'),
      [SHEET_HEADERS.FINGERPRINT]: fingerprint,
      [SHEET_HEADERS.PATH]: path,
      [SHEET_HEADERS.ACTION]: action,
    });
  } catch {
    // @xxx silent error
  }
};
