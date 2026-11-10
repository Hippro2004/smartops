import { Gender } from "../auth";

export interface ProfileResponse {
  username: string;
  email: string;
  gender: Gender;
  firstname: string;
  surname: string;
  contact: string;
  roles: string[];
}

export interface UpdateProfileRequest {
  gender: Gender;
  firstname: string;
  surname: string;
  contact: string;
  currentPassword: string;
  newPassword: string;
}
