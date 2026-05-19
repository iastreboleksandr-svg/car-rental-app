import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h1>404 — Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link href="/search">Back to search</Link>
    </div>
  );
}
