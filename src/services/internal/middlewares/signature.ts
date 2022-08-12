import { Request, Response, NextFunction } from 'express';
import { webcrypto } from 'crypto';

import { SIGNATURE_TIMEOUT } from '@services/internal/constants/requests';

async function buf2hex(buffer: ArrayBuffer): Promise<string> {
  return Array.prototype.map.call(new Uint8Array(buffer), (x: number) => `00${x.toString(16)}`.slice(-2)).join('');
}

export const checkSignature = async (req: Request, res: Response, next: NextFunction) => {
  const { signature, fingerprint, timestamp } = req.headers;
  const version = process.env.API_VERSION;
  const secret = process.env.CRYPTO_SECRET;

  if (!signature || !fingerprint || !timestamp) {
    return res.status(401).json({ status: 401, message: 'Unauthorized: missing headers' });
  }

  if (parseInt(timestamp as string, 10) < Date.now() - SIGNATURE_TIMEOUT) {
    res.status(401).json({ status: 401, message: 'Unauthorized: signature expired' });
  }

  const encoder = new TextEncoder();
  const cryptoKey = await webcrypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    {
      name: 'HMAC',
      hash: 'SHA-256',
    },
    false,
    ['sign'],
  );

  const buffer = encoder.encode(`${version}:${req.method}:${req.path}:${timestamp}:${fingerprint}`);
  const keyBuffer = await webcrypto.subtle.sign('HMAC', cryptoKey, buffer);
  const signVerify = await buf2hex(keyBuffer);

  if (signVerify !== signature) {
    return res.status(401).json({ status: 401, message: 'Unauthorized: invalid signature' });
  }

  return next();
};
