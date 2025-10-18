export interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  username: string;
  email: string;
  password: string;
  avatarUrl: string | null;
  token?: string
}

export interface CreateUserResponse {
  message: string;
  user: User;
}


export interface Avatar {
  name: string;
  url: string;
  lastModified: Date;
  id: string;
  email: string;
  fileSize: number;
  fileType: string;
  fileName: string;
  buffer: string;
}