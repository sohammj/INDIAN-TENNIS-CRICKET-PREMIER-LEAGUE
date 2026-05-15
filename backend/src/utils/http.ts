import { Response } from "express";
import { ZodError, ZodSchema } from "zod";
import { Prisma } from "@prisma/client";

export class ApiError extends Error {
  statusCode: number;
  details?: unknown;

  constructor(statusCode: number, message: string, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

export function getParam(value: string | string[] | undefined, name: string) {
  if (!value || Array.isArray(value)) {
    throw new ApiError(400, `${name} is required`);
  }

  return value;
}

export function validateBody<T>(schema: ZodSchema<T>, body: unknown): T {
  const parsed = schema.safeParse(body);

  if (!parsed.success) {
    throw new ApiError(400, "Invalid request data", parsed.error.flatten());
  }

  return parsed.data;
}

export function sanitizeString(value: string) {
  return value.trim().replace(/[<>]/g, "");
}

export function sanitizeOptionalString(value?: string) {
  if (!value) return undefined;

  const sanitized = sanitizeString(value);
  return sanitized.length > 0 ? sanitized : undefined;
}

export function handleControllerError(
  res: Response,
  error: unknown,
  fallback = "Something went wrong"
) {
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      message: error.message,
      ...(error.details ? { errors: error.details } : {}),
    });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      message: "Invalid request data",
      errors: error.flatten(),
    });
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return res.status(mapPrismaStatus(error)).json({
      message: mapPrismaMessage(error),
    });
  }

  console.error(error);

  return res.status(500).json({
    message: fallback,
  });
}

function mapPrismaStatus(error: Prisma.PrismaClientKnownRequestError) {
  switch (error.code) {
    case "P2002":
      return 409;
    case "P2003":
      return 400;
    case "P2025":
      return 404;
    default:
      return 500;
  }
}

function mapPrismaMessage(error: Prisma.PrismaClientKnownRequestError) {
  switch (error.code) {
    case "P2002":
      return "This record already exists.";
    case "P2003":
      return "This action cannot be completed because related records exist or are missing.";
    case "P2025":
      return "Record not found.";
    default:
      return "Database operation failed.";
  }
}