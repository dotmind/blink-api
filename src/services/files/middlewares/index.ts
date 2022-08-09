import { Request, Response, NextFunction } from "express";
import Hashids from "hashids";

import { logger } from "@services/internal/infrastructure/logger";
import { File } from "@services/files/models";

export const parseHeader = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const signature = req.headers["signature"];
  const fingerprint = req.headers["fingerprint"];
  const timestamp = req.headers["timestamp"];

  if (!signature || !fingerprint || !timestamp) {
    console.log("❌ Missing header");
    throw new Error("Missing header");
  }

  req.signature = signature as string;
  req.fingerprint = fingerprint as string;
  req.timestamp = timestamp as string;

  next();
};

export const registerFile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { signature, fingerprint } = req;
    const hasids = new Hashids(signature);

    console.log("📄 data: ", req.body);

    const file = new File({
      fingerprint,
      signature,
      file: req.body,
    });

    const path = hasids.encodeHex(file._id.toString());
    file.path = path;

    file.save();
    req._path = path;

    next();
  } catch (error) {
    logger.error(error);
    throw error;
  }
};

export const getFile = async (req: Request, res: Response, next: NextFunction) => {
  // @TODO: Get file from database and return it
  logger.info("Get file");
};

// @TODO: remove debug middleware
export const getAll = async (req: Request, res: Response) => {
  const files = await File.find();

  return res.json(files);
}