export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="prose dark:prose-invert">
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p>
            At Clean Convert, we take your privacy seriously. This Privacy Policy explains how we collect,
            use, and protect your personal information when you use our image conversion service.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>Account information (email, name) when you register</li>
            <li>Usage data related to image conversions</li>
            <li>Technical information about your device and browser</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>To provide and maintain our service</li>
            <li>To process your image conversions</li>
            <li>To manage your account and credits</li>
            <li>To improve our service</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information.
            Your uploaded images are processed securely and are not stored permanently on our servers.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>
            If you have any questions about our Privacy Policy, please contact us at{' '}
            <a href="mailto:privacy@cleanconvert.com" className="text-primary hover:underline">
              privacy@cleanconvert.com
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
