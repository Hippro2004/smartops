import { LoginInput, RegisterInput } from "../types/auth";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^0\d{9}$/;

export function validateRegister(
  form: RegisterInput,
  confirm: string,
): string | null {
  const username = form.username.trim();
  const firstname = form.firstname.trim();
  const surname = form.surname.trim();
  const email = form.email.trim();
  const gender = form.gender;
  const contact = form.contact.trim();

  // username
  if (username.length === 0) return "กรุณากรอกชื่อผู้ใช้";
  if (/\s/.test(username)) return "ชื่อผู้ใช้ห้ามมีช่องว่าง";
  if (username.length < 8 || username.length > 50)
    return "ชื่อผู้ใช้ต้องมี 8 - 50 ตัวอักษร";

  // ชื่อจริง / นามสกุล
  if (firstname.length === 0) return "กรุณากรอกชื่อจริง";
  if (firstname.length > 50) return "ชื่อจริงต้องไม่เกิน 50 ตัวอักษร";
  if (surname.length === 0) return "กรุณากรอกนามสกุล";
  if (surname.length > 50) return "นามสกุลต้องไม่เกิน 50 ตัวอักษร";

  // อีเมล
  if (email.length === 0) return "กรุณากรอกอีเมล";
  if (!EMAIL_PATTERN.test(email)) return "รูปแบบอีเมลไม่ถูกต้อง";

  // เพศ
  if (!gender) {
    return "กรุณาเลือกเพศ";
  }

  // เบอร์โทร
  if (contact.length === 0) return "กรุณากรอกเบอร์โทรศัพท์";
  if (!PHONE_PATTERN.test(contact))
    return "เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก ขึ้นต้นด้วย 0";

  // รหัสผ่าน (ไม่ trim)
  if (form.password.length === 0) return "กรุณากรอกรหัสผ่าน";
  if (form.password.length < 8 || form.password.length > 50)
    return "รหัสผ่านต้องมี 8 - 50 ตัวอักษร";
  if (form.password !== confirm) return "รหัสผ่านไม่ตรงกัน โปรดลองใหม่อีกครั้ง";

  return null;
}

export function vaildateLogin(form: LoginInput): string | null {
  const username = form.username.trim();
  const password = form.password.trim();

  if (username.length === 0) return "กรุณากรอกชื่อผู้ใช้";

  if (password.length === 0) return "กรุณากรอกรหัสผ่าน";

  return null;
}
