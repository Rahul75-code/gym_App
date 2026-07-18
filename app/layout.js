import './globals.css';
import Link from 'next/link';
import ConsentBanner from './ConsentBanner';
import ThemeToggle from './ThemeToggle';

export const metadata = {
  title: 'FitForge Gym',
  description: 'A modern fitness website with calculators, exercise guides, nutrition, blog, and progress tracking.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <ConsentBanner />
        <header className="topbar">
          <Link className="brand" href="/">
            FitForge
          </Link>
          <div className="topbar-actions">
            <nav className="nav-links">
              <Link href="/">Home</Link>
              <Link href="/BMI">BMI</Link>
              <Link href="/exercises">Exercises</Link>
              <Link href="/tracker">Tracker</Link>
              <Link href="/nutrition">Nutrition</Link>
              <Link href="/blog">Blog</Link>
            </nav>
            <ThemeToggle />
          </div>
        </header>
        {children}
        <footer>
          <p>© {new Date().getFullYear()} FitForge. Built for stronger routines and better habits.</p>
          <nav className="footer-links">
            <Link href="/privacy-policy">Privacy Policy</Link>
          </nav>
        </footer>
      </body>
    </html>
  );
}
