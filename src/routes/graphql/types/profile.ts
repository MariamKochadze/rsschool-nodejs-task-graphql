import { MemberTypeId } from "../../member-types/schemas.js";


export type Profile = {
  id: string;
  isMale: boolean;
  yearOfBirth: number;
  userId: string;
  memberTypeId: MemberTypeId | string;
};

export type CreateProfile = {
  dto: Omit<Profile, 'id'>;
};