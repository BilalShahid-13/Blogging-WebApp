export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  avatarUrl: string | null;
  token?: string
}

export interface Avatar {
  buffer: string;
  token: string;
}

export interface CreateUserResponse {
  message: string;
  user: User;
}

export interface CreateAvatarResponse {
  message: string;
  avatarUrl?: string
}
