import { ApiError } from "@/src/types/error";
import axios from "axios";

const ERROR_MESSAGES: Record<string, string> = {
  // --- user ---
  USERNAME_TAKEN: "This username is already in use.",
  EMAIL_TAKEN: "This email address is already in use.",
  CONTACT_TAKEN: "This phone number is already in use.",

  INVALID_CREDENTIALS: "The username or password is incorrect.",
  INVALID_CURRENT_PASSWORD: "The current password is incorrect.",
  VALIDATION_FAILED: "Please review the highlighted fields and try again.",

  // --- asset ---
  ASSET_NOT_FOUND: "Asset not found.",
  ASSET_NAME_TAKEN: "This asset name is already in use.",
  ASSET_SERIAL_TAKEN: "This serial number is already in use.",

  // --- upload image ---
  FILE_EMPTY: "No file was selected.",
  FILE_TYPE_NOT_ALLOWED: "Only JPG, PNG, and WEBP files are supported.",
  FILE_TOO_LARGE: "File size must not exceed 5 MB.",
  FILE_NOT_FOUND: "Image file not found.",
};

const FALLBACK = "Something went wrong. Please try again.";

export function getErrorCode(error: unknown): string | null {
  if (axios.isAxiosError<ApiError>(error)) {
    return error.response?.data?.code ?? null;
  }
  return null;
}

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiError>(error)) {
    // No response means the backend could not be reached.
    if (!error.response) {
      return "Unable to connect to the server.";
    }
    const code = error.response.data?.code;
    if (code && ERROR_MESSAGES[code]) {
      return ERROR_MESSAGES[code];
    }
  }
  return FALLBACK;
}
