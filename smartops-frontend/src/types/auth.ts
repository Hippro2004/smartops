export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  username: string;
  role: string;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}
export type Gender = "MALE" | "FEMALE" | "UNSPECIFIED";

export type LoginInput = LoginRequest;

export interface RegisterInput {
  username: string;
  password: string;
  email: string;
  gender: Gender | null;
  firstname: string;
  surname: string;
  contact: string;
}
