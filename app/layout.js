import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'FitForge Gym',
  description: 'A modern fitness website with calculators, exercise guides, nutrition, blog, and progress tracking.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="topbar">
          <Link className="brand" href="/">
            FitForge
          </Link>
          <nav className="nav-links">
            <Link href="/">Home</Link>
            <Link href="/calculator">Calculator</Link>
            <Link href="/exercises">Exercises</Link>
            <Link href="/tracker">Tracker</Link>
            <Link href="/nutrition">Nutrition</Link>
            <Link href="/blog">Blog</Link>
          </nav>
        </header>
        {children}
        <footer>
          <p>© {new Date().getFullYear()} FitForge. Built for stronger routines and better habits.</p>
        </footer>
      </body>
    </html>
  );
}
