import './globals.css';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Link from 'next/link';
import ConsentBanner from './ConsentBanner';
import ThemeToggle from './ThemeToggle';
import Navbar from './components/Navbar';

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
            <Navbar />
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
        <SpeedInsights />
      </body>
    </html>
  );
}
