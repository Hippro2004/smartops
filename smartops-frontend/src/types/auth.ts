export interface LoginInput {
  username: string;
  password: string;
}

export interface LoginResponse {
  username: string;
}
export type Gender = "MALE" | "FEMALE";

export interface RegisterInput {
  username: string;
  password: string;
  email: string;
  gender: Gender;
  firstname: string;
  surname: string;
  contact: string;
}
