/* eslint-disable */
namespace Express {
  interface Request {
    signature?: string;
    timestamp?: string;
    fingerprint?: string;
    filename?: string;
    version?: string;
    _path?: string;
    file?: IFile;
    files?: IFile[];
  }
}
/* eslint-enable */
