import { Request, Response, NextFunction } from 'express';
import { webcrypto } from 'crypto';

import ERROR_CODES from '@services/internal/constants/error-codes';
import { SIGNATURE_TIMEOUT } from '@services/internal/constants/requests';
import api from '@services/internal/infrastructure/api';

async function buf2hex(buffer: ArrayBuffer): Promise<string> {
  return Array.prototype.map.call(new Uint8Array(buffer), (x: number) => `00${x.toString(16)}`.slice(-2)).join('');
}

export const checkSignature = async (req: Request, res: Response, next: NextFunction) => {
  const { signature, fingerprint, timestamp } = req.headers;
  const version = process.env.API_VERSION;
  const secret = process.env.CRYPTO_SECRET;

  if (!signature || !fingerprint || !timestamp) {
    api.error(res, 401)({ message: ERROR_CODES.AUTH.MISSING_HEADERS });
    return;
  }

  if (parseInt(timestamp as string, 10) < Date.now() - SIGNATURE_TIMEOUT) {
    api.error(res, 401)({ message: ERROR_CODES.AUTH.EXPIRED_SIGNATURE });
    return;
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

  const path = req.path.replace(/^\//, '').replace(/\/$/, '');
  const buffer = encoder.encode(`${version}:${req.method}:${path}:${timestamp}:${fingerprint}`);
  const keyBuffer = await webcrypto.subtle.sign('HMAC', cryptoKey, buffer);
  const signVerify = await buf2hex(keyBuffer);

  if (signVerify !== signature) {
    api.error(res, 418)({ message: ERROR_CODES.AUTH.INVALID_SIGNATURE });
    return;
  }

  req.fingerprint = fingerprint as string;
  req.signature = signVerify;

  next();
};
