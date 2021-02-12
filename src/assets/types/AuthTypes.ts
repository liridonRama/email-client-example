export type SigninCredentials = {
  username: string;
  password: string;
};

export type SigninResponse = {
  username: string;
};

export type AuthenticatedResponse = {
  authenticated: boolean;
  username: string;
};

export type SignupCredentials = SigninCredentials;

export type UsernameAvailableResponse = {
  username?: string;
  available?: string;
};

export type SignupResponse = SigninResponse;

export type CreateEmailResponse = {};
