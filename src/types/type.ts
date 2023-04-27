export type SignUpType = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dob: Date;
  email: string;
  password: string;
};

export type SignInType = {
  phoneNumber: string;
  password: string;
};

export type AgentSignUpType = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dob: Date;
  email: string;
  kebeleID: string;
  password: string;
};
export type TempAgentSignUpType = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dob: Date;
  email: string;
  kebeleID: string;
  password: string;
  isVerified: boolean;
};
export type AgentSignInType = {
  phoneNumber: string;
  password: string;
};
export type OwnerSignUpType = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dob: Date;
  email: string;
  tradeLiscence: string;
  password: string;
};
export type TempOwnerSignUpType = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  dob: Date;
  email: string;
  tradeLiscence: string;
  password: string;
  isVerified: boolean;
};
export type OwnerSignInType = {
  phoneNumber: string;
  password: string;
};

export class VerifyPhoneType {
  code: string;
}
