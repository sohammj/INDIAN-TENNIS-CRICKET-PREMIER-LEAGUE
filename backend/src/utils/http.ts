export function getParam(value: string | string[] | undefined, name: string) {
  if (!value || Array.isArray(value)) {
    throw new Error(`${name} is required`);
  }

  return value;
}

export function getErrorMessage(error: unknown, fallback: string) {
  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
}