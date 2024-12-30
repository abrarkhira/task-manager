export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
}
export interface AuthResponse {
  data: any;
  status: number;
}
