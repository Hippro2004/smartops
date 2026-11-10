import { AssetRequest } from "@/src/types/assets/asset";
import { LoginInput, RegisterInput } from "@/src/types/auth";
import { UpdateProfileRequest } from "@/src/types/users/user";

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
  if (username.length === 0) return "Username is required.";
  if (/\s/.test(username)) return "Username must not contain spaces.";
  if (username.length < 8 || username.length > 50)
    return "Username must be 8–50 characters long.";

  // First and last name
  if (firstname.length === 0) return "First name is required.";
  if (firstname.length > 50) return "First name must not exceed 50 characters.";
  if (surname.length === 0) return "Last name is required.";
  if (surname.length > 50) return "Last name must not exceed 50 characters.";

  // Email
  if (email.length === 0) return "Email is required.";
  if (!EMAIL_PATTERN.test(email)) return "Enter a valid email address.";

  // Gender
  if (!gender) {
    return "Select a gender.";
  }

  // Phone number
  if (contact.length === 0) return "Phone number is required.";
  if (!PHONE_PATTERN.test(contact))
    return "Phone number must be 10 digits and start with 0.";

  // Do not trim passwords.
  if (form.password.length === 0) return "Password is required.";
  if (form.password.length < 8 || form.password.length > 50)
    return "Password must be 8–50 characters long.";
  if (form.password !== confirm) return "Passwords do not match.";

  return null;
}

export function validateUpdate(
  form: UpdateProfileRequest,
  confirmNewPassword: string,
): string | null {
  const firstname = form.firstname.trim();
  const surname = form.surname.trim();
  const gender = form.gender;
  const contact = form.contact.trim();

  if (firstname.length === 0) return "First name is required.";
  if (firstname.length > 50) return "First name must not exceed 50 characters.";
  if (surname.length === 0) return "Last name is required.";
  if (surname.length > 50) return "Last name must not exceed 50 characters.";

  if (!gender) {
    return "Select a gender.";
  }

  if (contact.length === 0) return "Phone number is required.";
  if (!PHONE_PATTERN.test(contact))
    return "Phone number must be 10 digits and start with 0.";

  if (form.currentPassword.length === 0) return "Current password is required.";
  if (form.currentPassword.length < 8 || form.currentPassword.length > 32)
    return "Current password must be 8–32 characters long.";
  if (form.newPassword.length === 0) return "New password is required.";
  if (form.newPassword.length < 8 || form.newPassword.length > 32)
    return "New password must be 8–32 characters long.";
  if (form.newPassword !== confirmNewPassword)
    return "New passwords do not match.";

  return null;
}

export function vaildateLogin(form: LoginInput): string | null {
  const username = form.username.trim();
  const password = form.password.trim();

  if (username.length === 0) return "Username is required.";
  if (username.length < 8 || username.length > 32)
    return "Username must be 8–32 characters long.";

  if (password.length === 0) return "Password is required.";
  if (password.length < 8 || password.length > 32)
    return "Password must be 8–32 characters long.";

  return null;
}

export function validateAsset(asset: AssetRequest): string | null {
  const name = asset.name.trim();
  const serial = asset.serialNumber.trim();
  const description = asset.description.trim();
  const category = asset.category;

  if (name.length === 0) return "Asset name is required.";
  if (name.length > 100) return "Asset name must not exceed 100 characters.";
  if (serial.length === 0) return "Serial number is required.";
  if (/\s/.test(serial)) return "Serial number must not contain spaces.";
  if (!category) return "Select a category.";
  if (description.length === 0) return "Asset description is required.";

  return null;
}
