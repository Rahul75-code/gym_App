import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <main className="page-content">
      <section className="section">
        <div className="section-title">
          <p className="eyebrow">Privacy Policy</p>
          <h1>Privacy Policy for FitForge Gym</h1>
        </div>
        <div className="content-block">
          <p>
            FitForge Gym is committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, and protect personal information when you use our website.
          </p>

          <h2>Information We Collect</h2>
          <p>
            We may collect basic information like browser type, device details, and usage
            behavior to improve our service. We do not collect personally identifiable
            information unless you voluntarily provide it.
          </p>

          <h2>Use of Cookies and Advertising</h2>
          <p>
            We use cookies and similar technologies to enhance your experience and deliver
            relevant content. We also display ads from third-party providers such as
            Google AdSense. These providers may use cookies to serve ads based on your
            prior visits to our website and other sites.
          </p>

          <h2>Google AdSense</h2>
          <p>
            This site uses Google AdSense to serve advertisements. Google may use the
            information collected to personalize ads, provide analytics, and measure
            ad performance. You can review Google&apos;s privacy policy at{' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
              policies.google.com/privacy
            </a>.
          </p>

          <h2>Third-Party Links</h2>
          <p>
            Our site may contain links to third-party websites. We are not responsible for
            the privacy practices of those websites and encourage you to review their
            privacy policies separately.
          </p>

          <h2>Updates to this Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be
            posted on this page, so please check back periodically.
          </p>

          <p>
            <Link href="/">Return to Home</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
