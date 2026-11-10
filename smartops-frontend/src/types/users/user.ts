import { Gender } from "../auth";

export interface ProfileResponse {
  username: string;
  password: string;
  gender: Gender;
  firstname: string;
  surname: string;
  contact: string;
}
