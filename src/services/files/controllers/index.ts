import { Response, Request } from "express";

import api from "@services/internal/infrastructure/api";

export const upload = async (req: Request, res: Response) => {
  const { _path } = req;
  return api.success(res)({ id: _path });
};

export const download = async (req: Request, res: Response) => {
  const { file } = req;

  return api.success(res)({ file: file });
};

// @TODO: remove debug controller
export const debug = async (req: Request, res: Response) => {
  const { files } = req;

  return api.success(res)({ files: files });
};
