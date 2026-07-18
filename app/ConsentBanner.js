'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'fitforge-consent';

export default function ConsentBanner() {
  const [consent, setConsent] = useState(null);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setConsent(saved);
      if (saved === 'accepted') {
        loadAdsense();
      }
    } else {
      setConsent('unknown');
    }
  }, []);

  function loadAdsense() {
    if (typeof window === 'undefined') return;
    if (window.adsbygoogle) return;

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2583537765669212';
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);
  }

  function saveConsent(value) {
    window.localStorage.setItem(STORAGE_KEY, value);
    setConsent(value);
    if (value === 'accepted') {
      loadAdsense();
    }
  }

  if (consent !== 'unknown') {
    return null;
  }

  return (
    <div className="consent-banner">
      <div className="consent-banner-content">
        <div>
          <strong>We use cookies and ads</strong>
          <p>
            To deliver ads and improve your experience, we use cookies. You can accept or reject advertising cookies.
          </p>
        </div>
        <div className="consent-actions">
          <button className="btn btn-secondary" onClick={() => saveConsent('rejected')}>
            Reject
          </button>
          <button className="btn btn-primary" onClick={() => saveConsent('accepted')}>
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
