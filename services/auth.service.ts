const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface UserResponse {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  avatarUrl: string | null;
  createdAt: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: UserResponse;
}

async function request<T>(path: string, body: unknown, token?: string): Promise<T> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data?.message ?? `Request failed: ${res.status}`);
  }

  return res.json() as Promise<T>;
}

export const authService = {
  login: (email: string, password: string) =>
    request<AuthResponse>('/auth/login', { email, password }),

  register: (email: string, password: string) =>
    request<AuthResponse>('/auth/register', { email, password }),

  refresh: (refreshToken: string) =>
    request<AuthResponse>('/auth/refresh', { refreshToken }),
  logout: (accessToken: string, refreshToken: string) =>
    request<{ message: string }>('/auth/logout', { refreshToken }, accessToken),
};
