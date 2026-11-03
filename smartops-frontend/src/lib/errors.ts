import axios from "axios";
import { ApiError } from "../types/error";

const ERROR_MESSAGES: Record<string, string> = {
  // --- user ---
  USERNAME_TAKEN: "ชื่อผู้ใช้นี้ถูกใช้แล้ว",
  EMAIL_TAKEN: "อีเมลนี้ถูกใช้แล้ว",
  CONTACT_TAKEN: "เบอร์โทรนี้ถูกใช้แล้ว",

  INVALID_CREDENTIALS: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",

  ASSET_NOT_FOUND: "ไม่พบอุปกรณ์นี้",
};

const FALLBACK = "เกิดข้อผิดพลาด ลองใหม่อีกครั้ง";

export function getErrorCode(error: unknown): string | null {
  if (axios.isAxiosError<ApiError>(error)) {
    return error.response?.data?.code ?? null;
  }
  return null;
}

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError<ApiError>(error)) {
    // ไม่มี response = เชื่อมต่อ backend ไม่ได้ (เซิร์ฟเวอร์ดับ, เน็ตหลุด)
    if (!error.response) {
      return "เชื่อมต่อเซิร์ฟเวอร์ไม่ได้";
    }
    const code = error.response.data?.code;
    if (code && ERROR_MESSAGES[code]) {
      return ERROR_MESSAGES[code];
    }
  }
  return FALLBACK;
}
