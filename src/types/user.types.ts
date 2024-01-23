export interface IUser {
  id?: string;
  firstName: string | null;
  lastName: string | null;
  fullName?: string | null;
  email: string;
  password?: string;
  isActive: number;
  isBlocked: number;
  isDeleted?: number;
  abilityRules: string[];
}

export interface IUserExternalAPI {
  id?: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

export interface User {
  id: number;
  email: string;
  password: string;
  abilityRules: string[];
}
