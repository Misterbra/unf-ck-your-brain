"use client";

import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-4">
      <nav className="container mx-auto flex justify-between">
        <Link href="/">Home</Link>
        <Link href="/quest">Your Quest</Link>
        <Link href="/profile">Profile</Link>
        <Link href="/history">History</Link>
      </nav>
    </header>
  );
}
