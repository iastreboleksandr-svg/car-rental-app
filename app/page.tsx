import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function RootPage() {
  const cookieStore = await cookies();
  const raw = cookieStore.get('auth')?.value;

  let isAuthenticated = false;
  if (raw) {
    try {
      const parsed = JSON.parse(raw);
      isAuthenticated = !!parsed?.state?.token;
    } catch {
      isAuthenticated = false;
    }
  }

  redirect(isAuthenticated ? '/search' : '/login');
}
