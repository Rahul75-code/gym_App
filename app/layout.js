import './globals.css';
import Link from 'next/link';
import Script from 'next/script';
import ThemeToggle from './ThemeToggle';

export const metadata = {
  title: 'FitForge Gym',
  description: 'A modern fitness website with calculators, exercise guides, nutrition, blog, and progress tracking.'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2583537765669212"
          crossOrigin="anonymous"
        />
      </head>
      <body>
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
