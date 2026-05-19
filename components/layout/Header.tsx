import Link from "next/link";
import Navbar from "./Navbar";

export default function Header() {
  return (
    <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
      <span className="font-bold text-xl">CarSharing</span>
      <Link href="/">Lunar CarSharing</Link>
      <Navbar />
    </header>
  );
}
