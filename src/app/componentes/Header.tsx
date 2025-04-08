import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
        <h1>Hola Next</h1>
        <nav>
            <ul>
                <li>
                    <Link href="/">Home</Link>
                </li>
                <li>
                <Link href="/about">About</Link>
                </li>
            </ul>
        </nav>
    </header>
  );
}