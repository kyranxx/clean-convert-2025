export default function CookiesPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Cookie Policy</h1>
      
      <div className="prose dark:prose-invert">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Essential Cookies</h2>
          <p>
            Clean Convert uses essential cookies to ensure the proper functioning of our service.
            These cookies are necessary for:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Authentication and session management</li>
            <li>Security features</li>
            <li>Basic website functionality</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Session Cookies</h2>
          <p>
            We use session cookies to maintain your login state and preferences while using
            Clean Convert. These cookies are temporary and are deleted when you close your browser.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Cookie Usage</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Authentication tokens for secure login</li>
            <li>Session management</li>
            <li>User preferences (e.g., dark mode settings)</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Third-Party Cookies</h2>
          <p>
            Clean Convert does not use any third-party cookies or tracking services.
            We prioritize your privacy and only use essential cookies required for
            the service to function.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
          <p>
            You can control and/or delete cookies as you wish. You can delete all cookies
            that are already on your computer and you can set most browsers to prevent
            them from being placed. However, if you do this, you may have to manually
            adjust some preferences every time you visit Clean Convert, and some services
            may not function properly.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Updates to This Policy</h2>
          <p>
            We may update this Cookie Policy from time to time. Any changes will be
            posted on this page with an updated revision date.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            If you have any questions about our Cookie Policy, please contact us at{' '}
            <a href="mailto:privacy@cleanconvert.com" className="text-primary hover:underline">
              privacy@cleanconvert.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
