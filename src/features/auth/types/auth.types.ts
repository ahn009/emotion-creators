export interface User {
  id: string;
  email: string;
  name: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}